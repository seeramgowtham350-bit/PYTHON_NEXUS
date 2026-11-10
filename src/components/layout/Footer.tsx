import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Github, Code, Sparkles, BookOpen } from 'lucide-react';
import { soundEngine } from '../../engine/soundEngine';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#03050E] border-t border-slate-900 text-slate-500 py-8 px-4 sm:px-6 mt-16 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center gap-2 text-slate-300 font-semibold font-display">
            <span className="w-2 h-2 rounded-full bg-[#00F5FF]" />
            Python Nexus
          </div>
          <span className="hidden sm:inline text-slate-700">·</span>
          <span className="text-slate-400">
            In-Browser Python Educational Gaming Platform
          </span>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/missions"
            onClick={() => soundEngine.playClick()}
            className="hover:text-cyan-400 transition-colors"
          >
            All Missions
          </Link>
          <Link
            to="/map"
            onClick={() => soundEngine.playClick()}
            className="hover:text-purple-400 transition-colors"
          >
            Research Map
          </Link>
          <Link
            to="/playground"
            onClick={() => soundEngine.playClick()}
            className="hover:text-emerald-400 transition-colors"
          >
            Python Playground
          </Link>
          <Link
            to="/profile"
            onClick={() => soundEngine.playClick()}
            className="hover:text-pink-400 transition-colors"
          >
            Scientist Dossier
          </Link>
        </div>

        <div className="text-slate-500 font-mono text-[11px]">
          Engineered with Pyodide Wasm, Monaco & React 19
        </div>
      </div>
    </footer>
  );
};
