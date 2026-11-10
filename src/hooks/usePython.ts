import { useState, useEffect, useCallback } from 'react';
import { pythonEngine, PythonExecutionResult } from '../engine/pythonRuntime';
import { soundEngine } from '../engine/soundEngine';

export function usePython() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'running' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [plotImage, setPlotImage] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = pythonEngine.onStatusChange((newStatus, message) => {
      setStatus(newStatus);
      if (message) setStatusMessage(message);
    });

    // Warm up pyodide in the background after brief mount delay
    const timer = setTimeout(() => {
      pythonEngine.initialize().catch(() => {});
    }, 600);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  const runCode = useCallback(async (
    code: string,
    inputsQueue: string[] = []
  ): Promise<PythonExecutionResult> => {
    setIsRunning(true);
    setError(null);
    setPlotImage(null);
    soundEngine.playRun();

    try {
      const result = await pythonEngine.execute(code, inputsQueue);
      setOutput(result.stdout);
      setError(result.error || null);
      setExecutionTime(result.executionTimeMs);
      if (result.plotImage) {
        setPlotImage(result.plotImage);
      }

      if (result.error) {
        soundEngine.playError();
      }

      setIsRunning(false);
      return result;
    } catch (err: any) {
      const errMsg = err?.message || 'Execution error';
      setError(errMsg);
      soundEngine.playError();
      setIsRunning(false);
      return {
        stdout: '',
        stderr: errMsg,
        error: errMsg,
        executionTimeMs: 0,
      };
    }
  }, []);

  const clearConsole = useCallback(() => {
    setOutput('');
    setError(null);
    setExecutionTime(null);
    setPlotImage(null);
  }, []);

  return {
    status,
    statusMessage,
    output,
    error,
    executionTime,
    plotImage,
    isRunning,
    runCode,
    clearConsole,
  };
}
