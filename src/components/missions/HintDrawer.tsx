import React, { useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { soundEngine } from '../../engine/soundEngine';

interface HintDrawerProps {
  hints: string[];
  solutionCode?: string;
}

export const HintDrawer: React.FC<HintDrawerProps> = ({ hints, solutionCode }) => {
  const [revealedCount, setRevealedCount] = useState<number>(0);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const revealNextHint = () => {
    soundEngine.playClick();
    setRevealedCount(prev => Math.min(hints.length, prev + 1));
  };

  return (
    <div className="bg-[#090E26] border border-slate-800 rounded-lg overflow-hidden text-xs">
      <button
        onClick={() => {
          soundEngine.playClick();
          setIsOpen(!isOpen);
        }}
        className="w-full flex items-center justify-between p-3 text-left hover:bg-slate-800/40 transition-colors"
      >
        <div className="flex items-center gap-2 text-amber-400 font-medium">
          <Lightbulb className="w-4 h-4" />
          <span>Scientific Hints & Guidance ({hints.length})</span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
      </button>

      {isOpen && (
        <div className="p-3 border-t border-slate-800/80 space-y-3 bg-[#070B1E]">
          {hints.slice(0, revealedCount).map((hint, idx) => (
            <div key={idx} className="p-2.5 bg-amber-950/20 border border-amber-900/40 rounded text-amber-200">
              <span className="font-semibold text-amber-400 font-mono">Hint {idx + 1}:</span> {hint}
            </div>
          ))}

          {revealedCount < hints.length ? (
            <button
              onClick={revealNextHint}
              className="w-full py-1.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded font-medium transition-colors"
            >
              Reveal Hint {revealedCount + 1}
            </button>
          ) : (
            solutionCode && (
              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setShowSolution(!showSolution);
                  }}
                  className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showSolution ? 'Hide Reference Solution' : 'View Reference Solution'}</span>
                </button>

                {showSolution && (
                  <pre className="mt-2 p-2.5 bg-[#050816] border border-slate-800 rounded font-mono text-[11px] text-cyan-300 overflow-x-auto">
                    {solutionCode}
                  </pre>
                )}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
