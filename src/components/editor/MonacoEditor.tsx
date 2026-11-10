import React, { useRef } from 'react';
import Editor, { OnMount } from '@monaco-editor/react';
import { Copy, RotateCcw, Check, Sparkles } from 'lucide-react';
import { soundEngine } from '../../engine/soundEngine';

interface MonacoEditorProps {
  code: string;
  onChange: (value: string) => void;
  onReset?: () => void;
  fontSize?: number;
  readOnly?: boolean;
}

export const MonacoPythonEditor: React.FC<MonacoEditorProps> = ({
  code,
  onChange,
  onReset,
  fontSize = 14,
  readOnly = false,
}) => {
  const [copied, setCopied] = React.useState(false);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;

    // Define bespoke Cyberpunk Neon theme for Python Nexus
    monaco.editor.defineTheme('nexus-cyber-neon', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
        { token: 'keyword', foreground: '00F5FF', fontStyle: 'bold' },
        { token: 'string', foreground: '39FF14' },
        { token: 'number', foreground: 'FF00E5' },
        { token: 'identifier', foreground: 'e2e8f0' },
        { token: 'type', foreground: 'A855F7' },
        { token: 'delimiter', foreground: '94a3b8' },
      ],
      colors: {
        'editor.background': '#070B1E',
        'editor.foreground': '#E2E8F0',
        'editorCursor.foreground': '#00F5FF',
        'editor.lineHighlightBackground': '#0f1738',
        'editorLineNumber.foreground': '#475569',
        'editorLineNumber.activeForeground': '#00F5FF',
        'editor.selectionBackground': '#00F5FF33',
        'editor.inactiveSelectionBackground': '#00F5FF1A',
      },
    });

    monaco.editor.setTheme('nexus-cyber-neon');
  };

  const handleCopy = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    soundEngine.playClick();
    if (onReset) onReset();
  };

  return (
    <div className="relative flex flex-col h-full w-full bg-[#070B1E] border border-slate-800 rounded-lg overflow-hidden group">
      {/* Editor Top Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 bg-[#090E26] border-b border-slate-800/80 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="text-[#00F5FF] font-mono font-medium flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#00F5FF] inline-block shadow-[0_0_8px_#00F5FF]" />
            main.py
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-500 font-mono">Python 3.12 (Pyodide Wasm)</span>
        </div>

        <div className="flex items-center gap-1.5">
          {onReset && (
            <button
              onClick={handleReset}
              title="Reset to default code"
              className="flex items-center gap-1 px-2.5 py-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={handleCopy}
            title="Copy code"
            className="flex items-center gap-1 px-2.5 py-1 text-slate-400 hover:text-[#00F5FF] hover:bg-slate-800/60 rounded transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-[#39FF14]" />
                <span className="text-[#39FF14]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editor Main Canvas */}
      <div className="flex-1 min-h-[280px] w-full">
        <Editor
          height="100%"
          language="python"
          value={code}
          theme="vs-dark"
          onChange={(value) => onChange(value || '')}
          onMount={handleEditorDidMount}
          options={{
            fontSize,
            fontFamily: "'JetBrains Mono', monospace",
            lineNumbers: 'on',
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 4,
            insertSpaces: true,
            formatOnType: true,
            formatOnPaste: true,
            readOnly,
            suggestOnTriggerCharacters: true,
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            padding: { top: 12, bottom: 12 },
          }}
        />
      </div>
    </div>
  );
};
