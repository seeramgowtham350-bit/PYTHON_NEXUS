import React from 'react';
import { CheckCircle2, XCircle, Circle, Play, HelpCircle } from 'lucide-react';
import { TestCase } from '../../types/Mission';
import { TestCaseResult } from '../../engine/missionValidator';

interface TestCasesListProps {
  testCases: TestCase[];
  results?: TestCaseResult[];
  isRunning?: boolean;
}

export const TestCasesList: React.FC<TestCasesListProps> = ({
  testCases,
  results = [],
  isRunning = false,
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-400 font-medium pb-1 border-b border-slate-800">
        <span>Validation Test Suites ({testCases.length})</span>
        {results.length > 0 && (
          <span className="font-mono text-[11px] text-[#00F5FF]">
            {results.filter(r => r.passed).length} / {testCases.length} Passed
          </span>
        )}
      </div>

      <div className="space-y-2">
        {testCases.map((tc, index) => {
          const res = results.find(r => r.testCaseId === tc.id);
          const hasRun = !!res;
          const passed = res?.passed;

          return (
            <div
              key={tc.id}
              className={`p-2.5 rounded border text-xs transition-all ${
                hasRun
                  ? passed
                    ? 'bg-emerald-950/20 border-emerald-800/60 text-emerald-200'
                    : 'bg-rose-950/20 border-rose-800/60 text-rose-200'
                  : 'bg-[#090E26] border-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {hasRun ? (
                    passed ? (
                      <CheckCircle2 className="w-4 h-4 text-[#39FF14] shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )
                  ) : (
                    <Circle className="w-4 h-4 text-slate-600 shrink-0" />
                  )}
                  <span className="font-medium text-slate-200">
                    Test {index + 1}: {tc.description}
                  </span>
                </div>

                <div className="font-mono text-[11px]">
                  {hasRun ? (
                    passed ? (
                      <span className="text-[#39FF14] font-semibold">PASSED</span>
                    ) : (
                      <span className="text-rose-400 font-semibold">FAILED</span>
                    )
                  ) : (
                    <span className="text-slate-500">READY</span>
                  )}
                </div>
              </div>

              {/* Input details if present */}
              {tc.input && (
                <div className="mt-2 text-[11px] font-mono text-slate-400 bg-[#050816]/70 p-1.5 rounded">
                  <span className="text-cyan-400 font-semibold">Input:</span> {tc.input.replace(/\n/g, ', ')}
                </div>
              )}

              {/* Expected vs Actual Output on failure */}
              {hasRun && !passed && (
                <div className="mt-2 space-y-1 font-mono text-[11px] bg-[#050816]/90 p-2 rounded border border-rose-900/50">
                  <div className="text-slate-400">
                    <span className="text-amber-400 font-semibold">Expected:</span>{' '}
                    <span className="text-emerald-300">{tc.expectedOutput}</span>
                  </div>
                  <div className="text-slate-400">
                    <span className="text-rose-400 font-semibold">Received:</span>{' '}
                    <span className="text-rose-300">{res.actualOutput || '(no output)'}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
