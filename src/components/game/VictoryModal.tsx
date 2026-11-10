import React, { useRef } from 'react';
import { Trophy, Download, CheckCircle2, ShieldAlert, Sparkles, X } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundEngine } from '../../engine/soundEngine';

export const VictoryModal: React.FC = () => {
  const { victoryModalOpen, setVictoryModalOpen, player } = useGame();
  const certRef = useRef<HTMLDivElement>(null);

  if (!victoryModalOpen) return null;

  const handlePrintCertificate = () => {
    soundEngine.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl p-6 sm:p-8 bg-[#070B1E] border-2 border-[#FF00E5] rounded-2xl shadow-[0_0_60px_rgba(255,0,229,0.5)] my-8">
        <button
          onClick={() => {
            soundEngine.playClick();
            setVictoryModalOpen(false);
          }}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Render Block */}
        <div
          ref={certRef}
          className="p-6 sm:p-8 bg-[#050816] border-2 border-[#00F5FF]/60 rounded-xl relative overflow-hidden"
        >
          {/* Cyber watermarks */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00F5FF]/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#FF00E5]/10 to-transparent rounded-tr-full pointer-events-none" />

          <div className="text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#00F5FF] via-[#A855F7] to-[#FF00E5] p-1 flex items-center justify-center shadow-[0_0_25px_rgba(0,245,255,0.7)]">
              <div className="w-full h-full bg-[#070B1E] rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-[#00F5FF]" />
              </div>
            </div>

            <div className="font-mono text-xs tracking-widest uppercase text-[#00F5FF]">
              Central Nexus Scientific Directorate
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white tracking-wide">
              CERTIFICATE OF RESEARCH MASTERY
            </h2>

            <p className="text-xs text-slate-400 max-w-md mx-auto">
              This grand credential officially certifies that
            </p>

            <div className="text-xl sm:text-2xl font-bold font-display text-[#39FF14] border-b border-slate-700 pb-2 inline-block px-8">
              {player.name}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-lg mx-auto">
              has successfully overcome the <span className="text-[#FF00E5] font-semibold">Nexus Core Failure</span>,
              stabilized the Biotechnology and Materials Science laboratories, and mastered Python programming from fundamental syntax to scientific computing.
            </p>

            {/* Performance metrics */}
            <div className="grid grid-cols-3 gap-2 py-4 my-2 border-y border-slate-800 font-mono text-xs">
              <div className="p-2 bg-[#090E26] rounded">
                <span className="text-slate-500 block text-[10px]">Attained Rank</span>
                <span className="font-bold text-[#00F5FF]">Nexus Master</span>
              </div>
              <div className="p-2 bg-[#090E26] rounded">
                <span className="text-slate-500 block text-[10px]">Total XP</span>
                <span className="font-bold text-[#39FF14] tabular-nums">{player.xp} XP</span>
              </div>
              <div className="p-2 bg-[#090E26] rounded">
                <span className="text-slate-500 block text-[10px]">Missions Cleared</span>
                <span className="font-bold text-[#A855F7] tabular-nums">{player.completedMissionIds.length}</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 pt-2">
              <span>Date: {new Date().toISOString().split('T')[0]}</span>
              <span>Authorization: NOVA AI-9800</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handlePrintCertificate}
            className="flex-1 py-2.5 px-4 bg-[#00F5FF] hover:bg-cyan-300 text-[#050816] font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.4)]"
          >
            <Download className="w-4 h-4" />
            <span>Print / Save Certificate</span>
          </button>
          <button
            onClick={() => setVictoryModalOpen(false)}
            className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
