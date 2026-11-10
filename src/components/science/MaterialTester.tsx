import React, { useState } from 'react';
import { Gauge, Sliders, Layers } from 'lucide-react';
import { scienceCalculations } from '../../utils/calculations';

export const MaterialTester: React.FC = () => {
  const [loadKn, setLoadKn] = useState<number>(35); // Kilonewtons
  const [areaMm2, setAreaMm2] = useState<number>(100);
  const [alloy, setAlloy] = useState<'Ti-6Al-4V' | 'Nickel-Inconel' | '316L-Steel'>('Ti-6Al-4V');

  const alloyProps = {
    'Ti-6Al-4V': { youngsModGpa: 114, yieldStressMpa: 880, color: '#00F5FF' },
    'Nickel-Inconel': { youngsModGpa: 205, yieldStressMpa: 1030, color: '#A855F7' },
    '316L-Steel': { youngsModGpa: 193, yieldStressMpa: 290, color: '#39FF14' },
  };

  const forceN = loadKn * 1000;
  const stressMpa = scienceCalculations.materials.calculateStress(forceN, areaMm2);
  const currentAlloy = alloyProps[alloy];
  const strain = scienceCalculations.materials.calculateStrain(stressMpa, currentAlloy.youngsModGpa);
  const isYielded = stressMpa >= currentAlloy.yieldStressMpa;

  return (
    <div className="p-4 bg-[#070B1E] border border-purple-900/40 rounded-xl space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#A855F7]" />
          <h4 className="font-semibold text-sm text-slate-200">Hydraulic Tensile Stage Simulator</h4>
        </div>
        <select
          value={alloy}
          onChange={(e) => setAlloy(e.target.value as any)}
          className="bg-[#0B1026] text-xs font-mono text-cyan-300 border border-slate-700 rounded px-2 py-1"
        >
          <option value="Ti-6Al-4V">Ti-6Al-4V Titanium</option>
          <option value="Nickel-Inconel">Inconel 718 Superalloy</option>
          <option value="316L-Steel">316L Stainless Steel</option>
        </select>
      </div>

      {/* Sliders */}
      <div className="space-y-2 text-xs">
        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>Applied Tensile Force:</span>
            <span className="font-mono text-cyan-400 font-bold">{loadKn} kN</span>
          </div>
          <input
            type="range"
            min="5"
            max="120"
            value={loadKn}
            onChange={(e) => setLoadKn(Number(e.target.value))}
            className="w-full accent-[#00F5FF] cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-slate-400 mb-1">
            <span>Coupon Gauge Area:</span>
            <span className="font-mono text-purple-400 font-bold">{areaMm2} mm²</span>
          </div>
          <input
            type="range"
            min="50"
            max="200"
            step="10"
            value={areaMm2}
            onChange={(e) => setAreaMm2(Number(e.target.value))}
            className="w-full accent-[#A855F7] cursor-pointer"
          />
        </div>
      </div>

      {/* Readout clusters */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-xs font-mono">
        <div className="bg-[#050816] p-2 rounded">
          <span className="text-slate-500 block text-[10px]">Stress (σ):</span>
          <span className={`text-base font-bold tabular-nums ${isYielded ? 'text-rose-400' : 'text-[#00F5FF]'}`}>
            {stressMpa} MPa
          </span>
        </div>
        <div className="bg-[#050816] p-2 rounded">
          <span className="text-slate-500 block text-[10px]">Strain (ε):</span>
          <span className="text-base font-bold text-[#A855F7] tabular-nums">
            {strain}
          </span>
        </div>
        <div className="bg-[#050816] p-2 rounded">
          <span className="text-slate-500 block text-[10px]">State:</span>
          <span className={`text-xs font-bold ${isYielded ? 'text-rose-400' : 'text-[#39FF14]'}`}>
            {isYielded ? 'PLASTIC YIELD' : 'ELASTIC OK'}
          </span>
        </div>
      </div>
    </div>
  );
};
