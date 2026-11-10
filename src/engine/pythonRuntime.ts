/**
 * Pyodide In-Browser Python Execution Engine
 * Python Nexus runtime engine
 */

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL?: string }) => Promise<any>;
    pyodideInstance?: any;
  }
}

export interface PythonExecutionResult {
  stdout: string;
  stderr: string;
  error?: string;
  executionTimeMs: number;
  returnValue?: any;
  plotImage?: string; // Base64 data URL if matplotlib produced a plot
}

export type InputPromptHandler = (promptText: string) => Promise<string>;

class PythonEngine {
  private pyodide: any = null;
  private isInitializing = false;
  private initPromise: Promise<any> | null = null;
  private status: 'idle' | 'loading' | 'ready' | 'running' | 'error' = 'idle';
  private statusListeners: ((status: 'idle' | 'loading' | 'ready' | 'running' | 'error', message?: string) => void)[] = [];
  private inputHandler: InputPromptHandler | null = null;

  public setInputHandler(handler: InputPromptHandler | null) {
    this.inputHandler = handler;
  }

  public onStatusChange(callback: (status: 'idle' | 'loading' | 'ready' | 'running' | 'error', message?: string) => void) {
    this.statusListeners.push(callback);
    callback(this.status);
    return () => {
      this.statusListeners = this.statusListeners.filter(cb => cb !== callback);
    };
  }

  private setStatus(newStatus: 'idle' | 'loading' | 'ready' | 'running' | 'error', message?: string) {
    this.status = newStatus;
    this.statusListeners.forEach(cb => cb(newStatus, message));
  }

  public getStatus() {
    return this.status;
  }

  public async initialize(): Promise<any> {
    if (this.pyodide) {
      return this.pyodide;
    }
    if (this.initPromise) {
      return this.initPromise;
    }

    this.setStatus('loading', 'Initializing Quantum Python Engine (Pyodide WebAssembly)...');
    this.isInitializing = true;

    this.initPromise = (async () => {
      try {
        // Ensure script is loaded if not already present
        if (!window.loadPyodide) {
          await new Promise<void>((resolve, reject) => {
            const existingScript = document.querySelector('script[src*="pyodide.js"]');
            if (existingScript) {
              existingScript.addEventListener('load', () => resolve());
              existingScript.addEventListener('error', (e) => reject(new Error('Failed to load Pyodide script from CDN')));
            } else {
              const script = document.createElement('script');
              script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
              script.async = true;
              script.onload = () => resolve();
              script.onerror = () => reject(new Error('Failed to load Pyodide script'));
              document.head.appendChild(script);
            }
          });
        }

        if (typeof window.loadPyodide !== 'function') {
          throw new Error('Pyodide loader unavailable in window context');
        }

        this.pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/',
        });

        window.pyodideInstance = this.pyodide;

        // Bridge JS input function to Python sys.stdin or custom input
        await this.pyodide.runPythonAsync(`
import sys
import io

class OutputCatcher(io.StringIO):
    def __init__(self):
        super().__init__()

# Setup default buffer
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);

        this.setStatus('ready', 'Python Quantum Engine Ready');
        this.isInitializing = false;
        return this.pyodide;
      } catch (err: any) {
        console.error('Pyodide initialization failed:', err);
        this.setStatus('error', err?.message || 'Failed to initialize Python runtime');
        this.isInitializing = false;
        throw err;
      }
    })();

    return this.initPromise;
  }

  /**
   * Run python code with timeout protection, stdout/stderr capture, and input handling
   */
  public async execute(
    code: string,
    inputsQueue: string[] = [],
    timeoutMs: number = 10000
  ): Promise<PythonExecutionResult> {
    const py = await this.initialize();
    this.setStatus('running', 'Executing code in Pyodide WebAssembly...');
    const startTime = performance.now();

    // Setup input queue and stdout redirection
    const inputsJson = JSON.stringify(inputsQueue);

    const runnerWrapper = `
import sys
import io
import json

__output_stream = io.StringIO()
__error_stream = io.StringIO()
sys.stdout = __output_stream
sys.stderr = __error_stream

__input_queue = ${inputsJson}
__input_idx = 0

def custom_input(prompt_text=""):
    global __input_idx
    if prompt_text:
        __output_stream.write(str(prompt_text))
    if __input_idx < len(__input_queue):
        val = __input_queue[__input_idx]
        __input_idx += 1
        __output_stream.write(str(val) + "\\n")
        return str(val)
    # If no queued input, fallback or return empty
    return ""

import builtins
builtins.input = custom_input

# Check if matplotlib is used
__has_matplotlib = False
try:
    import matplotlib
    matplotlib.use("Agg")
    import matplotlib.pyplot as plt
    __has_matplotlib = True
except ImportError:
    pass

__execution_error = None
__result = None

try:
    # Execute user code in isolated global scope
    __user_globals = {
        '__name__': '__main__',
        'input': custom_input,
    }
    exec(${JSON.stringify(code)}, __user_globals)
except Exception as e:
    import traceback
    __execution_error = traceback.format_exc()
finally:
    # Check if a plot was created
    __plot_base64 = None
    if __has_matplotlib:
        try:
            if plt.get_fignums():
                img_buf = io.BytesIO()
                plt.savefig(img_buf, format='png', bbox_inches='tight', facecolor='#0B1026', edgecolor='none')
                img_buf.seek(0)
                import base64
                __plot_base64 = "data:image/png;base64," + base64.b64encode(img_buf.read()).decode('utf-8')
                plt.close('all')
        except Exception:
            pass

__final_stdout = __output_stream.getvalue()
__final_stderr = __error_stream.getvalue()
`;

    // Timeout guard
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => {
        reject(new Error(`Execution timed out after ${timeoutMs / 1000}s. Check for potential infinite loops (e.g. while True without break).`));
      }, timeoutMs);
    });

    try {
      await Promise.race([
        py.runPythonAsync(runnerWrapper),
        timeoutPromise,
      ]);

      const stdout = py.globals.get('__final_stdout')?.toString() || '';
      const stderr = py.globals.get('__final_stderr')?.toString() || '';
      const execError = py.globals.get('__execution_error')?.toString();
      const plotBase64 = py.globals.get('__plot_base64')?.toString();

      const duration = performance.now() - startTime;
      this.setStatus('ready');

      return {
        stdout,
        stderr,
        error: execError || undefined,
        executionTimeMs: Math.round(duration),
        plotImage: plotBase64 || undefined,
      };
    } catch (err: any) {
      const duration = performance.now() - startTime;
      this.setStatus('ready');
      return {
        stdout: '',
        stderr: err?.message || 'Execution error',
        error: err?.message || 'Execution error',
        executionTimeMs: Math.round(duration),
      };
    }
  }

  /**
   * Pre-load scientific packages like numpy/pandas if requested
   */
  public async loadPackage(packageName: string): Promise<void> {
    const py = await this.initialize();
    this.setStatus('loading', `Loading Python package '${packageName}'...`);
    try {
      await py.loadPackage(packageName);
      this.setStatus('ready');
    } catch (e: any) {
      this.setStatus('ready');
      console.warn(`Could not load package ${packageName}:`, e);
    }
  }
}

export const pythonEngine = new PythonEngine();
