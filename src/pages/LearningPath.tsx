import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Lock,
  Play,
  Dna,
  Layers,
  Terminal,
  Flame,
  Award,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { LEVEL_MODULES } from '../data/lessons';
import { useGame } from '../context/GameContext';
import { soundEngine } from '../engine/soundEngine';
import { TrackType } from '../types/Mission';

export const LearningPath: React.FC = () => {
  const { player } = useGame();
  const [filterTrack, setFilterTrack] = useState<'all' | TrackType>('all');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-[#00F5FF]">
            Curriculum Matrix
          </span>
          <h1 className="text-3xl font-extrabold font-display text-white mt-1">
            Python Learning Path
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            From absolute beginner fundamentals to scientific computing and full-scale laboratory simulation. Complete missions to earn XP and unlock subsequent levels.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-[#070B1E] border border-slate-800 rounded-lg text-xs">
          <button
            onClick={() => setFilterTrack('all')}
            className={`px-3 py-1.5 rounded font-medium transition-colors ${
              filterTrack === 'all'
                ? 'bg-[#00F5FF] text-[#050816] font-bold shadow-[0_0_10px_rgba(0,245,255,0.4)]'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Tracks
          </button>
          <button
            onClick={() => setFilterTrack('biotechnology')}
            className={`px-3 py-1.5 rounded font-medium transition-colors flex items-center gap-1 ${
              filterTrack === 'biotechnology'
                ? 'bg-[#39FF14] text-[#050816] font-bold shadow-[0_0_10px_rgba(57,255,20,0.4)]'
                : 'text-slate-400 hover:text-[#39FF14]'
            }`}
          >
            <Dna className="w-3.5 h-3.5" />
            <span>Biotechnology</span>
          </button>
          <button
            onClick={() => setFilterTrack('materials_science')}
            className={`px-3 py-1.5 rounded font-medium transition-colors flex items-center gap-1 ${
              filterTrack === 'materials_science'
                ? 'bg-[#A855F7] text-[#050816] font-bold shadow-[0_0_10px_rgba(168,85,247,0.4)]'
                : 'text-slate-400 hover:text-[#A855F7]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Materials Science</span>
          </button>
        </div>
      </div>

      {/* Levels list */}
      <div className="space-y-8">
        {LEVEL_MODULES.map((module) => {
          const isUnlocked = player.unlockedLevelIds.includes(module.levelId);
          const filteredMissions = module.missions.filter(
            m => filterTrack === 'all' || m.track === filterTrack || m.track === 'boss'
          );

          if (filteredMissions.length === 0 && filterTrack !== 'all') {
            return null;
          }

          const completedCount = module.missions.filter(m =>
            player.completedMissionIds.includes(m.id)
          ).length;

          const isBossLevel = module.levelId === 8;

          return (
            <div
              key={module.levelId}
              className={`p-6 rounded-2xl border transition-all ${
                isBossLevel
                  ? 'bg-gradient-to-b from-[#180826] to-[#070B1E] border-[#FF00E5]/60 shadow-[0_0_35px_rgba(255,0,229,0.2)]'
                  : isUnlocked
                  ? 'bg-[#070B1E] border-slate-800 hover:border-slate-700'
                  : 'bg-[#050816] border-slate-900 opacity-60'
              }`}
            >
              {/* Module Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80 mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-[#00F5FF]">
                      {module.division.toUpperCase()}
                    </span>
                    <span className="text-slate-600">·</span>
                    <span className="text-xs font-mono text-slate-400">
                      Requires {module.xpRequired} XP
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                    {module.title}
                    {!isUnlocked && <Lock className="w-4 h-4 text-slate-500" />}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                    {module.description}
                  </p>
                </div>

                {/* Progress / Status */}
                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="text-right">
                    <span className="text-slate-500 block text-[11px]">Cleared</span>
                    <span className="text-[#39FF14] font-bold">
                      {completedCount} / {module.missions.length}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#090E26] border border-slate-700 flex items-center justify-center font-display font-bold text-slate-200">
                    L{module.levelId}
                  </div>
                </div>
              </div>

              {/* Topics Pills */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs text-slate-500 font-mono">Topics:</span>
                {module.topics.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] font-mono px-2 py-0.5 bg-[#090E26] border border-slate-800 rounded text-slate-300"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Mission Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMissions.map((mission) => {
                  const isCompleted = player.completedMissionIds.includes(mission.id);

                  return (
                    <Link
                      key={mission.id}
                      to={isUnlocked ? `/mission/${mission.id}` : '#'}
                      onClick={() => {
                        if (isUnlocked) soundEngine.playClick();
                        else soundEngine.playError();
                      }}
                      className={`p-4 rounded-xl border text-xs flex flex-col justify-between transition-all group ${
                        !isUnlocked
                          ? 'bg-[#050816] border-slate-900 cursor-not-allowed opacity-50'
                          : isCompleted
                          ? 'bg-[#090E26] border-emerald-900/50 hover:border-emerald-500'
                          : 'bg-[#0B1026] border-slate-800 hover:border-[#00F5FF]/60 hover:shadow-[0_0_15px_rgba(0,245,255,0.15)]'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase font-semibold ${
                              mission.track === 'biotechnology'
                                ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40'
                                : mission.track === 'materials_science'
                                ? 'bg-purple-950/40 text-purple-300 border border-purple-800/40'
                                : mission.track === 'boss'
                                ? 'bg-pink-950/50 text-pink-300 border border-pink-800/60'
                                : 'bg-cyan-950/40 text-cyan-300 border border-cyan-800/40'
                            }`}
                          >
                            {mission.track.replace('_', ' ')}
                          </span>

                          <span className="font-mono text-cyan-400 font-bold text-[11px]">
                            +{mission.xpReward} XP
                          </span>
                        </div>

                        <h4 className="font-bold font-display text-white text-sm mb-1 group-hover:text-[#00F5FF] transition-colors">
                          {mission.title}
                        </h4>
                        <p className="text-slate-400 text-[11px] line-clamp-2 leading-relaxed mb-3">
                          {mission.storyline}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                        <span className="text-slate-500">{mission.pythonTopic}</span>

                        <div className="flex items-center gap-1 font-semibold">
                          {isCompleted ? (
                            <span className="text-[#39FF14] flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>CLEARED</span>
                            </span>
                          ) : isUnlocked ? (
                            <span className="text-[#00F5FF] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                              <span>START</span>
                              <ChevronRight className="w-3 h-3" />
                            </span>
                          ) : (
                            <span className="text-slate-600 flex items-center gap-1">
                              <Lock className="w-3 h-3" />
                              <span>LOCKED</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
