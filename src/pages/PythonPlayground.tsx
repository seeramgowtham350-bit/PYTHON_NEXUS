import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Save,
  Download,
  Upload,
  Trash2,
  Sparkles,
  FileCode,
  ZoomIn,
  ZoomOut,
  FolderOpen,
} from 'lucide-react';
import { MonacoPythonEditor } from '../components/editor/MonacoEditor';
import { ConsoleOutput } from '../components/editor/ConsoleOutput';
import { usePython } from '../hooks/usePython';
import { useGame } from '../context/GameContext';
import { soundEngine } from '../engine/soundEngine';

const DEFAULT_PLAYGROUND_CODE = `# Welcome to Python Nexus Playground!
print("Welcome to Python Nexus!")

for i in range(1, 6):
    print("Level", i)
`;

export const PythonPlayground: React.FC = () => {
  const { player, savePlaygroundCode, deletePlaygroundCode } = useGame();
  const [code, setCode] = useState<string>(DEFAULT_PLAYGROUND_CODE);
  const [title, setTitle] = useState<string>('My Science Script');
  const [fontSize, setFontSize] = useState<number>(14);
  const [inputQueue, setInputQueue] = useState<string>('');
  const [saveToast, setSaveToast] = useState<boolean>(false);

  const {
    output,
    error,
    executionTime,
    plotImage,
    isRunning,
    statusMessage,
    runCode,
    clearConsole,
  } = usePython();

  const handleRun = async () => {
    const inputs = inputQueue ? inputQueue.split('\n').filter(Boolean) : [];
    await runCode(code, inputs);
  };

  const handleSave = () => {
    soundEngine.playClick();
    savePlaygroundCode(title, code);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  const handleDownload = () => {
    soundEngine.playClick();
    const element = document.createElement('a');
    const file = new Blob([code], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title.toLowerCase().replace(/\s+/g, '_')}.py`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setCode(content);
        setTitle(file.name.replace(/\.py$/, ''));
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-65px)] bg-[#050816] overflow-hidden">
      {/* Playground Header Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[#070B1E] border-b border-slate-800 text-xs shrink-0">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-[#00F5FF]" />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#0B1026] text-white font-display font-bold border border-slate-700 rounded px-2.5 py-1 text-xs focus:outline-none focus:border-[#00F5FF]"
          />
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Templates dropdown */}
          <select
            onChange={(e) => {
              const selected = player.savedPlaygroundCodes.find(p => p.id === e.target.value);
              if (selected) {
                setCode(selected.code);
                setTitle(selected.title);
              }
            }}
            defaultValue=""
            className="bg-[#0B1026] text-slate-300 font-mono border border-slate-700 rounded px-2.5 py-1 text-xs focus:outline-none"
          >
            <option value="" disabled>Load Saved Script...</option>
            {player.savedPlaygroundCodes.map((item) => (
              <option key={item.id} value={item.id}>
                {item.title}
              </option>
            ))}
          </select>

          {/* Import .py file */}
          <label className="cursor-pointer px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded flex items-center gap-1 transition-colors">
            <Upload className="w-3.5 h-3.5" />
            <span>Open .py</span>
            <input type="file" accept=".py" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Download .py file */}
          <button
            onClick={handleDownload}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded flex items-center gap-1 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .py</span>
          </button>

          {/* Save to local */}
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-[#A855F7]/20 hover:bg-[#A855F7]/30 text-[#A855F7] border border-[#A855F7]/50 rounded font-semibold flex items-center gap-1 transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>

          {/* Run Code */}
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-4 py-1.5 bg-gradient-to-r from-[#00F5FF] to-[#39FF14] text-[#050816] font-bold rounded shadow-[0_0_15px_rgba(0,245,255,0.4)] flex items-center gap-1.5 transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isRunning ? 'Running...' : 'Run Code'}</span>
          </button>
        </div>
      </div>

      {/* Editor & Console Split Workspace */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left: Code Editor (7 cols) */}
        <div className="lg:col-span-7 h-full flex flex-col border-r border-slate-800">
          <div className="flex items-center justify-between px-3 py-1.5 bg-[#090E26] border-b border-slate-800 text-xs">
            <span className="font-mono text-slate-400">Python Editor</span>
            <div className="flex items-center gap-1 font-mono text-slate-400">
              <button
                onClick={() => setFontSize(prev => Math.max(11, prev - 1))}
                className="p-1 hover:bg-slate-800 rounded"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span>{fontSize}px</span>
              <button
                onClick={() => setFontSize(prev => Math.min(22, prev + 1))}
                className="p-1 hover:bg-slate-800 rounded"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex-1 w-full">
            <MonacoPythonEditor
              code={code}
              onChange={setCode}
              onReset={() => setCode(DEFAULT_PLAYGROUND_CODE)}
              fontSize={fontSize}
            />
          </div>
        </div>

        {/* Right: Console Output & Stdin (5 cols) */}
        <div className="lg:col-span-5 h-full flex flex-col bg-[#070B1E]">
          {/* Stdin Panel */}
          <div className="p-3 bg-[#090E26] border-b border-slate-800 text-xs">
            <label className="block text-slate-400 font-mono text-[11px] mb-1">
              Interactive input() feed (one line per prompt):
            </label>
            <textarea
              rows={2}
              value={inputQueue}
              onChange={(e) => setInputQueue(e.target.value)}
              placeholder="Provide user inputs here for input() calls..."
              className="w-full bg-[#050816] border border-slate-800 rounded p-2 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500 resize-none"
            />
          </div>

          {/* Output console */}
          <div className="flex-1">
            <ConsoleOutput
              output={output}
              error={error}
              executionTime={executionTime}
              plotImage={plotImage}
              isRunning={isRunning}
              statusMessage={statusMessage}
              onClear={clearConsole}
            />
          </div>
        </div>
      </div>

      {saveToast && (
        <div className="fixed bottom-6 right-6 z-40 px-4 py-2 bg-[#070B1E] border border-[#39FF14] text-[#39FF14] rounded-lg shadow-lg text-xs font-mono">
          ✓ Saved to local quantum drive
        </div>
      )}
    </div>
  );
};
