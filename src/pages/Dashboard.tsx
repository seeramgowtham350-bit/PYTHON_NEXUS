import React from 'react';
import { Link } from 'react-router-dom';
import {
  Terminal,
  Award,
  Flame,
  Heart,
  Play,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Sparkles,
  Zap,
  Dna,
  Layers,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { soundEngine } from '../engine/soundEngine';
import { MISSIONS } from '../data/missions';
import { LEVEL_MODULES } from '../data/lessons';
import { DnaVisualizer } from '../components/science/DnaVisualizer';
import { MaterialTester } from '../components/science/MaterialTester';

export const Dashboard: React.FC = () => {
  const { player } = useGame();

  // Find next uncompleted mission
  const nextMission = MISSIONS.find(m => !player.completedMissionIds.includes(m.id)) || MISSIONS[0];
  const completionPercentage = Math.round((player.completedMissionIds.length / MISSIONS.length) * 100);

  // Daily challenge: select based on day
  const dailyMission = MISSIONS[new Date().getDate() % MISSIONS.length];
  const isDailyCompleted = player.completedMissionIds.includes(dailyMission.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Welcome Banner */}
      <div className="relative p-6 sm:p-8 bg-[#070B1E] border border-cyan-900/40 rounded-2xl overflow-hidden shadow-[0_0_35px_rgba(0,245,255,0.1)]">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#00F5FF] via-[#A855F7] to-[#FF00E5] p-1 flex items-center justify-center shadow-[0_0_20px_rgba(0,245,255,0.4)]">
              <div className="w-full h-full bg-[#050816] rounded-xl flex items-center justify-center">
                <Dna className="w-8 h-8 text-[#00F5FF]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  Welcome, {player.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                  {player.rank}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Central Laboratory Status: <span className="text-[#39FF14] font-medium">Reconstruction In Progress</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <Link
              to={`/mission/${nextMission.id}`}
              onClick={() => soundEngine.playClick()}
              className="flex-1 md:flex-none px-5 py-2.5 bg-gradient-to-r from-[#00F5FF] to-[#A855F7] hover:from-cyan-400 hover:to-purple-500 text-[#050816] font-bold text-xs rounded-lg shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Continue Learning</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/playground"
              onClick={() => soundEngine.playClick()}
              className="px-4 py-2.5 bg-[#0B1026] hover:bg-[#12193b] text-slate-200 border border-slate-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-[#39FF14]" />
              <span>Playground</span>
            </Link>
          </div>
        </div>

        {/* Level XP Progress Bar */}
        <div className="mt-6 pt-4 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-xs font-mono mb-2">
            <span className="text-slate-400">
              Level {player.level} Researcher Progress
            </span>
            <span className="text-cyan-400 font-bold tabular-nums">
              {player.xp} XP Total
            </span>
          </div>
          <div className="w-full h-3 bg-[#0B1026] rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-[#00F5FF] via-[#A855F7] to-[#39FF14] rounded-full transition-all duration-500 shadow-[0_0_12px_rgba(0,245,255,0.6)]"
              style={{ width: `${Math.min(100, (player.xp % 500) / 5)}%` }}
            />
          </div>
        </div>
      </div>

      {/* KPI Stat Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-[#070B1E] border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Research Rank</span>
            <Award className="w-4 h-4 text-[#00F5FF]" />
          </div>
          <div className="text-lg font-bold font-display text-white">
            {player.rank}
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Rank Level {player.level} of 8</span>
        </div>

        <div className="p-4 bg-[#070B1E] border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Missions Restored</span>
            <CheckCircle2 className="w-4 h-4 text-[#39FF14]" />
          </div>
          <div className="text-2xl font-bold font-mono text-[#39FF14] tabular-nums">
            {player.completedMissionIds.length} <span className="text-xs text-slate-500 font-normal">/ {MISSIONS.length}</span>
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
            <div className="bg-[#39FF14] h-full" style={{ width: `${completionPercentage}%` }} />
          </div>
        </div>

        <div className="p-4 bg-[#070B1E] border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Daily Streak</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-amber-300 tabular-nums">
            {player.streakDays} <span className="text-xs text-slate-500 font-normal">Days Active</span>
          </div>
          <span className="text-[11px] text-amber-400/80 font-mono">Keep streak alive today!</span>
        </div>

        <div className="p-4 bg-[#070B1E] border border-slate-800 rounded-xl">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>Bio-Shield Lives</span>
            <Heart className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-bold font-mono text-rose-400 tabular-nums">
            {player.lives} <span className="text-xs text-slate-500 font-normal">/ {player.maxLives}</span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">Recharges on command</span>
        </div>
      </div>

      {/* Daily Mission Highlight + Science Laboratory Map Jump */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Mission Card */}
        <div className="lg:col-span-1 p-5 bg-[#070B1E] border border-amber-900/40 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2">
              <span className="flex items-center gap-1.5 font-bold">
                <Flame className="w-3.5 h-3.5" />
                DAILY RESEARCH PROTOCOL
              </span>
              <span className="text-slate-400">+{dailyMission.xpReward} XP</span>
            </div>

            <h3 className="text-base font-bold font-display text-white mb-1">
              {dailyMission.title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed line-clamp-3 mb-4">
              {dailyMission.storyline}
            </p>

            <div className="p-2.5 bg-[#050816] rounded-lg border border-slate-800 text-[11px] font-mono text-slate-300 mb-4">
              <span className="text-cyan-400 block font-semibold mb-0.5">Scientific Topic:</span>
              {dailyMission.pythonTopic}
            </div>
          </div>

          <Link
            to={`/mission/${dailyMission.id}`}
            onClick={() => soundEngine.playClick()}
            className={`w-full py-2 px-3 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              isDailyCompleted
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
            }`}
          >
            {isDailyCompleted ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Protocol Completed (Replay)</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Initialize Daily Protocol</span>
              </>
            )}
          </Link>
        </div>

        {/* Science Laboratory Map Preview Banner */}
        <div className="lg:col-span-2 p-6 bg-gradient-to-r from-[#070B1E] via-[#090F2C] to-[#070B1E] border border-cyan-800/40 rounded-2xl relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2">
              <MapPin className="w-4 h-4" />
              <span>INTERACTIVE SCIENCE MAP</span>
            </div>

            <h3 className="text-xl font-bold font-display text-white mb-2">
              Explore the Research Universe
            </h3>
            <p className="text-xs text-slate-300 max-w-xl leading-relaxed mb-6">
              Traverse 8 state-of-the-art facilities across Biotechnology, Materials Science, and the Nexus Core Reactor. Unlock restricted laboratories as your XP and Python mastery grow.
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>{player.unlockedLocationIds.length} / 8 Labs Online</span>
              <span>·</span>
              <span className="text-[#39FF14]">{completionPercentage}% Universe Restored</span>
            </div>

            <Link
              to="/map"
              onClick={() => soundEngine.playClick()}
              className="px-4 py-2 bg-[#00F5FF]/10 hover:bg-[#00F5FF]/20 text-[#00F5FF] border border-[#00F5FF]/40 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5"
            >
              <span>Launch Lab Map</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Interactive Science Sandbox Demos */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#00F5FF]" />
            <span>Interactive Scientific Instrumentation</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Live In-Browser Simulation Modules</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DnaVisualizer initialSequence="ATGCGATCGATCGCTAGCTAGCTA" />
          <MaterialTester />
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="p-6 bg-[#070B1E] border border-slate-800 rounded-2xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold font-display text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-[#A855F7]" />
            <span>Research Accreditations & Badges</span>
          </h3>
          <Link
            to="/achievements"
            onClick={() => soundEngine.playClick()}
            className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
          >
            View All Achievements →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {player.achievements.slice(0, 3).map((ach) => {
            const isUnlocked = !!ach.unlockedAt;
            return (
              <div
                key={ach.id}
                className={`p-3 rounded-xl border text-xs transition-all ${
                  isUnlocked
                    ? 'bg-[#090E26] border-purple-800/60 text-slate-200'
                    : 'bg-[#050816] border-slate-800/80 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-bold font-display ${isUnlocked ? 'text-[#39FF14]' : 'text-slate-400'}`}>
                    {ach.title}
                  </span>
                  <span className="text-[10px] font-mono text-[#00F5FF]">+{ach.xpReward} XP</span>
                </div>
                <p className="text-[11px] leading-relaxed mb-2">{ach.description}</p>
                <div className="text-[10px] font-mono text-slate-400">
                  {isUnlocked ? 'UNLOCKED' : `Progress: ${ach.progress || 0}/${ach.maxProgress || 1}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
