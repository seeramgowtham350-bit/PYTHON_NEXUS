import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Volume2, VolumeX, Heart, Flame, Shield, Dna, Play } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundEngine } from '../../engine/soundEngine';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { player, isMuted, toggleMute, refillLives } = useGame();

  const navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/missions', label: 'Missions' },
    { path: '/map', label: 'Lab Map' },
    { path: '/playground', label: 'Python Playground' },
    { path: '/achievements', label: 'Achievements' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050816]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          onClick={() => soundEngine.playClick()}
          className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2 whitespace-nowrap shrink-0 group"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#00F5FF] via-[#A855F7] to-[#FF00E5] flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(0,245,255,0.4)]">
            <span className="w-full h-full bg-[#070B1E] rounded-[6px] flex items-center justify-center">
              <Terminal className="w-4 h-4 text-[#00F5FF] group-hover:scale-110 transition-transform" />
            </span>
          </span>
          <span className="font-display">
            PYTHON <span className="text-[#00F5FF]">NEXUS</span>
          </span>
        </Link>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path || (link.path === '/missions' && location.pathname.startsWith('/mission/'));
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => soundEngine.playClick()}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                  isActive
                    ? 'text-[#00F5FF] font-semibold border-b-2 border-[#00F5FF]'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action & Status Cluster */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Streak indicator */}
          <div
            title={`Current Daily Research Streak: ${player.streakDays} day(s)`}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 rounded text-xs text-amber-300 font-mono"
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="tabular-nums font-bold">{player.streakDays}d</span>
          </div>

          {/* Lives display */}
          <div
            onClick={refillLives}
            title="Click to recharge laboratory bio-shields (Refill Lives)"
            className="cursor-pointer flex items-center gap-1 px-2.5 py-1 bg-rose-500/10 border border-rose-500/30 rounded text-xs text-rose-300 font-mono hover:bg-rose-500/20 transition-colors"
          >
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/80" />
            <span className="tabular-nums font-bold">{player.lives}</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleMute}
            title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
            className="p-1.5 text-slate-400 hover:text-[#00F5FF] bg-slate-800/40 hover:bg-slate-800 rounded transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00F5FF]" />}
          </button>

          {/* Quick Play CTA */}
          <Link
            to="/playground"
            onClick={() => soundEngine.playClick()}
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-[#050816] bg-[#00F5FF] hover:bg-cyan-300 rounded shadow-[0_0_15px_rgba(0,245,255,0.4)] transition-all whitespace-nowrap shrink-0"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Playground</span>
          </Link>
        </div>
      </div>
    </header>
  );
};
