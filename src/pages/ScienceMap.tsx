import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Lock,
  Play,
  CheckCircle2,
  Dna,
  Layers,
  Terminal,
  Cpu,
  Zap,
  Activity,
  Flame,
  X,
  ChevronRight,
} from 'lucide-react';
import { NEXUS_LOCATIONS, MISSIONS } from '../data/missions';
import { useGame } from '../context/GameContext';
import { soundEngine } from '../engine/soundEngine';
import { Location } from '../types/Mission';

export const ScienceMap: React.FC = () => {
  const { player } = useGame();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const getLocationIcon = (iconName: string) => {
    switch (iconName) {
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Dna': return <Dna className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      default: return <MapPin className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] bg-[#050816] flex flex-col p-4 sm:p-6 overflow-hidden">
      {/* Background Cyber Map Grid */}
      <div className="absolute inset-0 cyber-grid-dense opacity-20 pointer-events-none" />

      {/* Map Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#00F5FF]">
            Spatial Sector Telemetry
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-1">
            Research Universe Laboratory Map
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Navigate between active and offline research facilities across the Biotechnology and Materials Science divisions.
          </p>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00F5FF]" />
            <span className="text-slate-300">Online Lab</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <span className="text-slate-500">Locked / Offline</span>
          </div>
        </div>
      </div>

      {/* Interactive Map Visual Stage */}
      <div className="relative flex-1 min-h-[520px] my-6 rounded-2xl bg-[#070B1E] border border-cyan-900/40 p-6 overflow-hidden shadow-[0_0_50px_rgba(0,245,255,0.08)]">
        {/* Constellation connection lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-cyan-500/20 stroke-1 stroke-dasharray-4">
          <line x1="18%" y1="30%" x2="34%" y2="62%" stroke="rgba(0,245,255,0.3)" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="34%" y1="62%" x2="50%" y2="50%" stroke="rgba(168,85,247,0.3)" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="50%" y1="22%" x2="50%" y2="50%" stroke="rgba(57,255,20,0.3)" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="50%" y1="50%" x2="68%" y2="58%" stroke="rgba(0,245,255,0.3)" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="50%" y1="50%" x2="42%" y2="82%" stroke="rgba(255,0,229,0.3)" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="68%" y1="58%" x2="86%" y2="72%" stroke="rgba(57,255,20,0.3)" strokeWidth="2" strokeDasharray="4 4" />
          <line x1="50%" y1="22%" x2="78%" y2="28%" stroke="rgba(168,85,247,0.3)" strokeWidth="2" strokeDasharray="4 4" />
        </svg>

        {/* Nodes */}
        {NEXUS_LOCATIONS.map((loc) => {
          const isUnlocked = player.unlockedLocationIds.includes(loc.id);
          const isBoss = loc.id === 'nexus_core';
          const locMissions = MISSIONS.filter(m => loc.missionIds.includes(m.id));
          const completedCount = locMissions.filter(m => player.completedMissionIds.includes(m.id)).length;

          return (
            <div
              key={loc.id}
              style={{ left: `${loc.coordinates.x}%`, top: `${loc.coordinates.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              onClick={() => {
                soundEngine.playClick();
                setSelectedLocation(loc);
              }}
            >
              {/* Node Button Orb */}
              <div
                className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-300 ${
                  isUnlocked
                    ? isBoss
                      ? 'bg-[#180826] border-[#FF00E5] shadow-[0_0_25px_rgba(255,0,229,0.8)] animate-pulse'
                      : 'bg-[#090E26] border-[#00F5FF] shadow-[0_0_20px_rgba(0,245,255,0.4)] group-hover:scale-110'
                    : 'bg-[#050816] border-slate-700 opacity-60'
                }`}
              >
                {isUnlocked ? (
                  <span style={{ color: loc.color }}>
                    {getLocationIcon(loc.icon)}
                  </span>
                ) : (
                  <Lock className="w-5 h-5 text-slate-500" />
                )}

                {/* Completion badge */}
                {isUnlocked && completedCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#39FF14] text-slate-950 font-mono text-[10px] font-bold flex items-center justify-center">
                    {completedCount}
                  </span>
                )}
              </div>

              {/* Tooltip Label */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2.5 py-1 bg-[#070B1E]/95 border border-slate-700 rounded-lg text-center whitespace-nowrap pointer-events-none group-hover:border-[#00F5FF] transition-colors shadow-lg">
                <span className="text-[11px] font-display font-bold text-white block">
                  {loc.name}
                </span>
                <span className="text-[9px] font-mono text-slate-400">
                  {loc.division}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Location Drawer Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-lg p-6 bg-[#070B1E] border border-cyan-700 rounded-2xl shadow-[0_0_40px_rgba(0,245,255,0.3)]">
            <button
              onClick={() => setSelectedLocation(null)}
              className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-[#090E26] border border-cyan-500/40 flex items-center justify-center" style={{ color: selectedLocation.color }}>
                {getLocationIcon(selectedLocation.icon)}
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase font-bold">
                  {selectedLocation.division}
                </span>
                <h3 className="text-lg font-bold font-display text-white">
                  {selectedLocation.name}
                </h3>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {selectedLocation.description}
            </p>

            <div className="space-y-2 mb-6">
              <span className="text-xs font-mono font-bold text-slate-400 block mb-1">
                Facility Missions ({selectedLocation.missionIds.length}):
              </span>
              {MISSIONS.filter(m => selectedLocation.missionIds.includes(m.id)).map((m) => {
                const isCleared = player.completedMissionIds.includes(m.id);
                return (
                  <Link
                    key={m.id}
                    to={`/mission/${m.id}`}
                    onClick={() => soundEngine.playClick()}
                    className="flex items-center justify-between p-2.5 bg-[#090E26] hover:bg-[#0e163b] border border-slate-800 rounded-lg text-xs transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {isCleared ? (
                        <CheckCircle2 className="w-4 h-4 text-[#39FF14]" />
                      ) : (
                        <Play className="w-3.5 h-3.5 text-cyan-400" />
                      )}
                      <span className="font-medium text-white">{m.title}</span>
                    </div>
                    <span className="font-mono text-cyan-400 text-[11px]">+{m.xpReward} XP</span>
                  </Link>
                );
              })}
            </div>

            <button
              onClick={() => setSelectedLocation(null)}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg text-xs transition-colors"
            >
              Close Telemetry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
