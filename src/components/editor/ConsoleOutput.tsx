import React from 'react';
import { Terminal, Trash2, Clock, CheckCircle2, AlertTriangle, Image as ImageIcon } from 'lucide-react';
import { soundEngine } from '../../engine/soundEngine';

interface ConsoleOutputProps {
  output: string;
  error?: string | null;
  executionTime?: number | null;
  plotImage?: string | null;
  isRunning?: boolean;
  statusMessage?: string;
  onClear: () => void;
}

export const ConsoleOutput: React.FC<ConsoleOutputProps> = ({
  output,
  error,
  executionTime,
  plotImage,
  isRunning,
  statusMessage,
  onClear,
}) => {
  const handleClear = () => {
    soundEngine.playClick();
    onClear();
  };

  return (
    <div className="flex flex-col h-full bg-[#070B1E] border border-slate-800 rounded-lg overflow-hidden">
      {/* Console Header Ribbon */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#090E26] border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#00F5FF]" />
          <span className="font-semibold text-slate-200">Execution Console</span>
          {isRunning && (
            <span className="text-[#00F5FF] animate-pulse flex items-center gap-1 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F5FF]" />
              Running in WebAssembly...
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {executionTime !== null && executionTime !== undefined && (
            <span className="text-slate-400 font-mono text-[11px] flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-500" />
              <span className="tabular-nums">{executionTime}</span>ms
            </span>
          )}

          <button
            onClick={handleClear}
            title="Clear console output"
            className="flex items-center gap-1 px-2 py-0.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded transition-colors text-[11px]"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>

      {/* Output Stream Canvas */}
      <div className="flex-1 p-3 overflow-y-auto font-mono text-xs text-slate-200 leading-relaxed bg-[#050816] min-h-[160px]">
        {/* Loading status message */}
        {statusMessage && !output && !error && (
          <div className="text-slate-500 italic pb-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            {statusMessage}
          </div>
        )}

        {/* Empty state */}
        {!output && !error && !plotImage && !isRunning && (
          <div className="text-slate-600 flex flex-col items-center justify-center py-8 text-center select-none">
            <Terminal className="w-6 h-6 mb-2 text-slate-700" />
            <p>Click "Run Code" to compile and execute Python in Pyodide WebAssembly.</p>
            <p className="text-[11px] text-slate-700 mt-1">Standard output (stdout) and errors will stream here.</p>
          </div>
        )}

        {/* Stdout display */}
        {output && (
          <pre className="text-emerald-300 whitespace-pre-wrap break-all font-mono">
            {output}
          </pre>
        )}

        {/* Stderr / Traceback Error display */}
        {error && (
          <div className="mt-2 p-2.5 bg-rose-950/40 border border-rose-800/60 rounded text-rose-300">
            <div className="flex items-center gap-1.5 font-semibold text-rose-400 mb-1 text-[11px]">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Traceback (Python Exception):</span>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-[11px] text-rose-200">
              {error}
            </pre>
          </div>
        )}

        {/* Matplotlib plot display */}
        {plotImage && (
          <div className="mt-3 p-3 bg-[#0B1026] border border-cyan-900/50 rounded-lg">
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-2">
              <ImageIcon className="w-4 h-4" />
              <span>Matplotlib Plot Output</span>
            </div>
            <img
              src={plotImage}
              alt="Python scientific plot"
              className="max-h-[320px] rounded border border-slate-800 object-contain mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
};
