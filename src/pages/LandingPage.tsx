import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Dna, Layers, Zap, ArrowRight, ShieldCheck, Play, Award, Sparkles } from 'lucide-react';
import { soundEngine } from '../engine/soundEngine';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col justify-between overflow-hidden">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-40" />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 w-full text-center">
        {/* Story Kicker */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F5FF]/10 border border-[#00F5FF]/30 text-xs font-mono text-[#00F5FF] mb-6 shadow-[0_0_15px_rgba(0,245,255,0.2)]">
          <span className="w-2 h-2 rounded-full bg-[#00F5FF] animate-ping" />
          <span>Research Facility Online · In-Browser Python 3.12 Engine</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display text-white max-w-4xl mx-auto leading-none mb-6">
          PYTHON <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F5FF] via-[#A855F7] to-[#FF00E5]">NEXUS</span>
        </h1>

        <p className="text-base sm:text-xl font-medium text-slate-300 max-w-2xl mx-auto mb-4 tracking-wide font-sans">
          Code. Discover. Experiment. Evolve.
        </p>

        <p className="text-sm text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          The scientific research universe has experienced a massive systems failure. Master Python from scratch to reactivate DNA synthesizers, calibrate alloy furnaces, and reboot the central core reactor.
        </p>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/dashboard"
            onClick={() => soundEngine.playClick()}
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#00F5FF] to-[#A855F7] hover:from-cyan-400 hover:to-purple-500 text-[#050816] font-bold text-sm rounded-lg shadow-[0_0_25px_rgba(0,245,255,0.4)] transition-all flex items-center justify-center gap-2"
          >
            <Terminal className="w-4 h-4" />
            <span>Enter Research Station</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/playground"
            onClick={() => soundEngine.playClick()}
            className="w-full sm:w-auto px-6 py-3.5 bg-[#070B1E] hover:bg-[#0d1436] text-white border border-slate-700 hover:border-[#00F5FF]/50 font-semibold text-sm rounded-lg transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-[#39FF14]" />
            <span>Open Python Playground</span>
          </Link>
        </div>

        {/* Dual Scientific Universes Preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">
          {/* Biotech Universe */}
          <div className="p-6 bg-[#070B1E]/90 border border-[#00F5FF]/30 rounded-2xl relative overflow-hidden group hover:border-[#00F5FF] transition-all shadow-[0_0_30px_rgba(0,245,255,0.1)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#00F5FF]/10 border border-[#00F5FF]/40 flex items-center justify-center text-[#00F5FF]">
                <Dna className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-white">Biotechnology Universe</h3>
                <span className="text-xs font-mono text-cyan-400">Genomics · Microbiology · Bioinformatics</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Decipher DNA sequences, compute Wallace melting temperatures, simulate exponential bacterial binary fission, and identify restriction enzyme cleavage sites.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="text-[#39FF14]">●</span>
              <span>18 Interactive Biotech Laboratory Challenges</span>
            </div>
          </div>

          {/* Materials Science Universe */}
          <div className="p-6 bg-[#070B1E]/90 border border-[#A855F7]/30 rounded-2xl relative overflow-hidden group hover:border-[#A855F7] transition-all shadow-[0_0_30px_rgba(168,85,247,0.1)]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#A855F7]/10 border border-[#A855F7]/40 flex items-center justify-center text-[#A855F7]">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-display text-white">Materials Science Universe</h3>
                <span className="text-xs font-mono text-purple-400">Alloys · Crystallography · Stress Mechanics</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Calculate titanium alloy densities, evaluate tensile stress-strain curves using Hooke's Law, model cubic crystal lattices, and filter multiaxial stress tensors.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
              <span className="text-[#00F5FF]">●</span>
              <span>18 Materials & Mechanics Missions</span>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-5xl mx-auto mt-12 text-center text-xs font-mono">
          <div className="p-3 bg-[#070B1E] border border-slate-800 rounded-xl">
            <span className="text-xl font-bold text-[#00F5FF] block mb-1">100%</span>
            <span className="text-slate-400">Zero Terminal Setup (Pyodide Wasm)</span>
          </div>
          <div className="p-3 bg-[#070B1E] border border-slate-800 rounded-xl">
            <span className="text-xl font-bold text-[#39FF14] block mb-1">36+</span>
            <span className="text-slate-400">Science Missions & Test Suites</span>
          </div>
          <div className="p-3 bg-[#070B1E] border border-slate-800 rounded-xl">
            <span className="text-xl font-bold text-[#A855F7] block mb-1">7 Levels</span>
            <span className="text-slate-400">Beginner to Scientific Computing</span>
          </div>
          <div className="p-3 bg-[#070B1E] border border-slate-800 rounded-xl">
            <span className="text-xl font-bold text-[#FF00E5] block mb-1">Boss Fight</span>
            <span className="text-slate-400">The Nexus Core Recovery</span>
          </div>
        </div>
      </section>
    </div>
  );
};
