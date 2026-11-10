import React from 'react';
import { Award, Sparkles, ChevronRight } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundEngine } from '../../engine/soundEngine';

export const LevelUpModal: React.FC = () => {
  const { levelUpModal, closeLevelUpModal } = useGame();

  if (!levelUpModal || !levelUpModal.open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 bg-[#070B1E] border-2 border-[#00F5FF] rounded-2xl shadow-[0_0_50px_rgba(0,245,255,0.4)] text-center">
        {/* Glow halo */}
        <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-[#00F5FF] via-[#A855F7] to-[#FF00E5] p-1 flex items-center justify-center shadow-[0_0_30px_rgba(0,245,255,0.6)]">
          <div className="w-full h-full bg-[#050816] rounded-xl flex items-center justify-center">
            <Award className="w-10 h-10 text-[#00F5FF] animate-bounce" />
          </div>
        </div>

        <span className="text-xs uppercase font-mono tracking-widest text-[#00F5FF] font-semibold">
          Quantum Rank Elevation
        </span>

        <h3 className="text-2xl font-bold font-display text-white mt-1 mb-2">
          Level {levelUpModal.newLevel} Unlocked!
        </h3>

        <div className="p-3 bg-[#0B1026] border border-slate-800 rounded-xl my-4">
          <span className="text-xs text-slate-400 block mb-1">New Scientist Designation:</span>
          <span className="text-lg font-bold text-[#39FF14] font-display">
            {levelUpModal.rankTitle}
          </span>
        </div>

        <p className="text-xs text-slate-300 mb-6">
          Advanced laboratory divisions and quantum simulation tools have been unlocked in your research console.
        </p>

        <button
          onClick={() => {
            soundEngine.playClick();
            closeLevelUpModal();
          }}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-[#00F5FF] to-[#A855F7] hover:from-cyan-400 hover:to-purple-500 text-[#050816] font-bold rounded-lg shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all flex items-center justify-center gap-2"
        >
          <span>Continue Research</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
