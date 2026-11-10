import React from 'react';
import { Award, CheckCircle2, Lock, Sparkles, Flame, Dna, Layers, Zap, ShieldAlert, Trophy } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { ALL_ACHIEVEMENTS } from '../data/achievements';
import { RANK_THRESHOLDS } from '../engine/xpManager';

export const Achievements: React.FC = () => {
  const { player } = useGame();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Dna': return <Dna className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      default: return <Award className="w-5 h-5" />;
    }
  };

  const unlockedCount = player.achievements.filter(a => !!a.unlockedAt).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#A855F7]">
            Scientific Accreditations
          </span>
          <h1 className="text-3xl font-extrabold font-display text-white mt-1">
            Badges & Research Trophies
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Demonstrate laboratory rigor across genetic sequencing, metallurgy benchmarks, coding streaks, and reactor restoration.
          </p>
        </div>

        <div className="p-3 bg-[#070B1E] border border-purple-900/40 rounded-xl flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[10px]">Accreditations</span>
            <span className="text-lg font-bold text-[#39FF14] tabular-nums">
              {unlockedCount} / {player.achievements.length}
            </span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div>
            <span className="text-slate-500 block text-[10px]">Rank Level</span>
            <span className="text-lg font-bold text-[#00F5FF]">
              {player.level} ({player.rank})
            </span>
          </div>
        </div>
      </div>

      {/* Ranks Ladder */}
      <div className="p-6 bg-[#070B1E] border border-slate-800 rounded-2xl space-y-4">
        <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#00F5FF]" />
          <span>Scientist Rank Progression Ladder</span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {RANK_THRESHOLDS.map((r) => {
            const isAttained = player.xp >= r.minXp;
            const isCurrent = player.rank === r.rank;

            return (
              <div
                key={r.level}
                className={`p-3 rounded-xl border text-xs transition-all ${
                  isCurrent
                    ? 'bg-[#090E26] border-[#00F5FF] shadow-[0_0_15px_rgba(0,245,255,0.25)]'
                    : isAttained
                    ? 'bg-[#050816] border-emerald-900/40 text-slate-300'
                    : 'bg-[#050816] border-slate-800/80 opacity-50 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-mono text-[10px] text-cyan-400 font-bold">L{r.level}</span>
                  <span className="font-mono text-[10px] text-slate-400">{r.minXp} XP</span>
                </div>
                <h4 className={`font-bold font-display text-xs ${isCurrent ? 'text-[#00F5FF]' : 'text-white'}`}>
                  {r.rank}
                </h4>
                {isCurrent && (
                  <span className="text-[10px] font-mono text-[#39FF14] font-bold mt-1 block">
                    ● CURRENT RANK
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {player.achievements.map((ach) => {
          const isUnlocked = !!ach.unlockedAt;
          const progress = ach.progress || 0;
          const maxProg = ach.maxProgress || 1;
          const pct = Math.min(100, Math.round((progress / maxProg) * 100));

          return (
            <div
              key={ach.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all ${
                isUnlocked
                  ? 'bg-[#070B1E] border-purple-700/60 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                  : 'bg-[#050816] border-slate-800/80'
              }`}
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                      isUnlocked
                        ? 'bg-purple-950/40 border-purple-500/60 text-purple-300'
                        : 'bg-slate-900 border-slate-800 text-slate-600'
                    }`}
                  >
                    {isUnlocked ? getIcon(ach.icon) : <Lock className="w-5 h-5" />}
                  </div>

                  <span className="font-mono text-cyan-400 font-bold text-xs">
                    +{ach.xpReward} XP
                  </span>
                </div>

                <h3 className="font-bold font-display text-white text-base mb-1">
                  {ach.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {ach.description}
                </p>
              </div>

              <div>
                {/* Progress bar */}
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full ${isUnlocked ? 'bg-[#39FF14]' : 'bg-[#00F5FF]'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500">
                  <span>Progress: {progress} / {maxProg}</span>
                  <span className={isUnlocked ? 'text-[#39FF14] font-bold' : 'text-slate-400'}>
                    {isUnlocked ? 'COMPLETED' : `${pct}%`}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
