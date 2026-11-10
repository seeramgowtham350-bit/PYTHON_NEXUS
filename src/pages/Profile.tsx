import React, { useState } from 'react';
import {
  User,
  Award,
  Terminal,
  Download,
  RotateCcw,
  Check,
  ShieldCheck,
  Dna,
  Layers,
  Heart,
  Flame,
  FileArchive,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { soundEngine } from '../engine/soundEngine';
import { generateProjectZip } from '../utils/projectExporter';

export const Profile: React.FC = () => {
  const { player, updatePlayerName, updateAvatar, resetProgress } = useGame();
  const [nameInput, setNameInput] = useState<string>(player.name);
  const [savedName, setSavedName] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const avatars = [
    { id: 'dna_quantum', label: 'Genome Bio-Core', icon: Dna, color: '#39FF14' },
    { id: 'alloy_titan', label: 'Titanium Forge', icon: Layers, color: '#00F5FF' },
    { id: 'quantum_ai', label: 'Neural Intelligence', icon: Terminal, color: '#A855F7' },
  ];

  const handleNameSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;
    soundEngine.playClick();
    updatePlayerName(nameInput.trim());
    setSavedName(true);
    setTimeout(() => setSavedName(false), 2000);
  };

  const handleExportZip = async () => {
    try {
      soundEngine.playClick();
      setIsExporting(true);
      const zipBlob = await generateProjectZip();
      const url = URL.createObjectURL(zipBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'python-nexus-master.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      console.error('Failed to export ZIP:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <span className="text-xs uppercase font-mono tracking-widest text-[#00F5FF]">
          Researcher Dossier
        </span>
        <h1 className="text-3xl font-extrabold font-display text-white mt-1">
          Scientist Identity & Configuration
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your laboratory credentials, export the full codebase archive for GitHub, or recalibrate progress.
        </p>
      </div>

      {/* Profile Card */}
      <div className="p-6 bg-[#070B1E] border border-cyan-900/40 rounded-2xl space-y-6">
        <form onSubmit={handleNameSave} className="space-y-4">
          <label className="block text-xs font-mono text-slate-400">
            Scientist Callsign / Name:
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className="flex-1 bg-[#050816] border border-slate-700 rounded-lg px-3 py-2 text-sm text-white font-display focus:outline-none focus:border-[#00F5FF]"
              placeholder="e.g. Dr. Alex Vance"
            />
            <button
              type="submit"
              className="px-5 py-2 bg-[#00F5FF] hover:bg-cyan-300 text-[#050816] font-bold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(0,245,255,0.3)]"
            >
              {savedName ? <Check className="w-4 h-4" /> : null}
              <span>{savedName ? 'Saved' : 'Update Callsign'}</span>
            </button>
          </div>
        </form>

        {/* Avatar selector */}
        <div className="space-y-2">
          <label className="block text-xs font-mono text-slate-400">
            Laboratory Crest / Insignia:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {avatars.map((av) => {
              const IconComp = av.icon;
              const isSelected = player.avatar === av.id;
              return (
                <button
                  key={av.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    updateAvatar(av.id);
                  }}
                  className={`p-3 rounded-xl border text-xs text-left flex items-center gap-3 transition-all ${
                    isSelected
                      ? 'bg-[#090E26] border-[#00F5FF] shadow-[0_0_15px_rgba(0,245,255,0.2)]'
                      : 'bg-[#050816] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center border border-slate-700"
                    style={{ color: av.color }}
                  >
                    <IconComp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold font-display text-white block">
                      {av.label}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {isSelected ? 'Active Crest' : 'Select'}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* GitHub Repository Export Card (Requirement 13 & 14) */}
      <div className="p-6 bg-gradient-to-r from-[#070B1E] via-[#0b1236] to-[#070B1E] border border-cyan-700/50 rounded-2xl space-y-4 shadow-[0_0_25px_rgba(0,245,255,0.15)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/50 flex items-center justify-center text-[#00F5FF]">
            <FileArchive className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold font-display text-white">
              Export Full Project ZIP (GitHub-Ready)
            </h3>
            <p className="text-xs text-slate-400">
              Download complete modular source files, Vite setup, GitHub Actions deploy workflow, README, and MIT license.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono text-slate-400">
            Structure: <span className="text-cyan-300">python-nexus/</span> (src, public, .github, package.json, tests)
          </div>

          <button
            onClick={handleExportZip}
            disabled={isExporting}
            className="w-full sm:w-auto px-5 py-2.5 bg-gradient-to-r from-[#00F5FF] to-[#A855F7] text-[#050816] font-bold text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.4)] disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? 'Generating ZIP...' : 'Download Project ZIP'}</span>
          </button>
        </div>
      </div>

      {/* Data Management */}
      <div className="p-6 bg-[#070B1E] border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold font-display text-white">
            Reset Progress
          </h4>
          <p className="text-xs text-slate-500 mt-0.5">
            Clear local player progress, reset XP and missions back to level 1.
          </p>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Are you sure you want to recalibrate all research progress to zero?')) {
              resetProgress();
            }
          }}
          className="px-4 py-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/60 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Laboratory State</span>
        </button>
      </div>
    </div>
  );
};
