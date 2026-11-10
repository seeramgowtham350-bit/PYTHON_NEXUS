import React, { useState, useEffect } from 'react';
import { Dna, RefreshCw } from 'lucide-react';
import { scienceCalculations } from '../../utils/calculations';

interface DnaVisualizerProps {
  initialSequence?: string;
}

export const DnaVisualizer: React.FC<DnaVisualizerProps> = ({
  initialSequence = 'ATGCGATCGATCGCTAGCTAGCTA',
}) => {
  const [sequence, setSequence] = useState<string>(initialSequence);
  const [gcPercent, setGcPercent] = useState<number>(0);

  useEffect(() => {
    setGcPercent(scienceCalculations.biotech.calculateGcContent(sequence));
  }, [sequence]);

  const randomizeSequence = () => {
    const bases = ['A', 'C', 'G', 'T'];
    let newSeq = '';
    for (let i = 0; i < 24; i++) {
      newSeq += bases[Math.floor(Math.random() * bases.length)];
    }
    setSequence(newSeq);
  };

  const getBaseColor = (base: string) => {
    switch (base) {
      case 'A': return 'text-[#00F5FF] border-[#00F5FF]/40 bg-[#00F5FF]/10'; // Adenine - Cyan
      case 'T': return 'text-[#FF00E5] border-[#FF00E5]/40 bg-[#FF00E5]/10'; // Thymine - Pink
      case 'G': return 'text-[#39FF14] border-[#39FF14]/40 bg-[#39FF14]/10'; // Guanine - Neon Green
      case 'C': return 'text-[#A855F7] border-[#A855F7]/40 bg-[#A855F7]/10'; // Cytosine - Purple
      default: return 'text-slate-400 border-slate-700 bg-slate-800';
    }
  };

  const getComplement = (base: string) => {
    switch (base) {
      case 'A': return 'T';
      case 'T': return 'A';
      case 'G': return 'C';
      case 'C': return 'G';
      default: return 'N';
    }
  };

  return (
    <div className="p-4 bg-[#070B1E] border border-cyan-900/40 rounded-xl space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dna className="w-4 h-4 text-[#00F5FF]" />
          <h4 className="font-semibold text-sm text-slate-200">DNA Double Helix Synthesizer</h4>
        </div>
        <button
          onClick={randomizeSequence}
          className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Mutate</span>
        </button>
      </div>

      {/* DNA Helix strand representation */}
      <div className="overflow-x-auto py-2">
        <div className="flex items-center gap-1.5 min-w-max">
          {sequence.split('').map((base, idx) => {
            const comp = getComplement(base);
            return (
              <div key={idx} className="flex flex-col items-center gap-1">
                {/* 5' Strand */}
                <span className={`w-6 h-6 rounded flex items-center justify-center font-mono font-bold text-xs border ${getBaseColor(base)}`}>
                  {base}
                </span>

                {/* Hydrogen Bonds */}
                <div className="h-4 w-0.5 border-l border-dashed border-slate-600 my-0.5" />

                {/* 3' Complementary Strand */}
                <span className={`w-6 h-6 rounded flex items-center justify-center font-mono font-bold text-xs border ${getBaseColor(comp)}`}>
                  {comp}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time telemetry */}
      <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800/80 font-mono">
        <div className="bg-[#050816] p-2 rounded">
          <span className="text-slate-400 block text-[11px]">GC Content:</span>
          <span className="text-lg font-bold text-[#39FF14] tabular-nums">{gcPercent}%</span>
        </div>
        <div className="bg-[#050816] p-2 rounded">
          <span className="text-slate-400 block text-[11px]">Length:</span>
          <span className="text-lg font-bold text-[#00F5FF] tabular-nums">{sequence.length} bp</span>
        </div>
      </div>
    </div>
  );
};
