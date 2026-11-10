import React, { useState } from 'react';
import { Bot, Sparkles, X, ChevronRight } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundEngine } from '../../engine/soundEngine';

export const NovaAssistant: React.FC = () => {
  const { novaMessage } = useGame();
  const [minimized, setMinimized] = useState<boolean>(false);

  return (
    <div className="fixed bottom-4 right-4 z-30 max-w-sm w-full px-2">
      {minimized ? (
        <button
          onClick={() => {
            soundEngine.playClick();
            setMinimized(false);
          }}
          className="ml-auto flex items-center gap-2 px-3 py-2 bg-[#090E26]/95 border border-[#00F5FF]/50 rounded-full shadow-[0_0_20px_rgba(0,245,255,0.3)] text-xs text-[#00F5FF] hover:bg-[#0d1538] transition-all"
        >
          <div className="w-2 h-2 rounded-full bg-[#00F5FF] animate-ping" />
          <Bot className="w-4 h-4 text-[#00F5FF]" />
          <span className="font-semibold font-display">NOVA Hologram</span>
        </button>
      ) : (
        <div className="relative p-3.5 bg-[#070B1E]/95 border border-[#00F5FF]/40 rounded-xl shadow-[0_0_25px_rgba(0,245,255,0.25)] backdrop-blur-md">
          {/* Top banner */}
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#00F5FF]/20 border border-[#00F5FF]/60 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-[#00F5FF]" />
              </div>
              <div>
                <span className="text-xs font-bold text-white font-display block leading-none">
                  NOVA
                </span>
                <span className="text-[10px] text-cyan-400 font-mono">
                  Laboratory Neural Intelligence
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick();
                setMinimized(true);
              }}
              className="text-slate-500 hover:text-slate-300 p-1"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Holographic speech box */}
          <p className="text-xs text-slate-200 leading-relaxed font-sans">
            "{novaMessage}"
          </p>
        </div>
      )}
    </div>
  );
};
