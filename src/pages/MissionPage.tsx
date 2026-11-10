import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Play,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  HelpCircle,
  Dna,
  Layers,
  Send,
  Terminal,
  ZoomIn,
  ZoomOut,
  Award,
} from 'lucide-react';
import { MISSIONS } from '../data/missions';
import { MonacoPythonEditor } from '../components/editor/MonacoEditor';
import { ConsoleOutput } from '../components/editor/ConsoleOutput';
import { TestCasesList } from '../components/missions/TestCasesList';
import { HintDrawer } from '../components/missions/HintDrawer';
import { usePython } from '../hooks/usePython';
import { useGame } from '../context/GameContext';
import { validateMissionCode, TestCaseResult } from '../engine/missionValidator';
import { soundEngine } from '../engine/soundEngine';

export const MissionPage: React.FC = () => {
  const { missionId } = useParams<{ missionId: string }>();
  const navigate = useNavigate();
  const { player, completeMission, loseLife } = useGame();

  const mission = MISSIONS.find(m => m.id === missionId) || MISSIONS[0];
  const missionIndex = MISSIONS.findIndex(m => m.id === mission.id);
  const prevMission = missionIndex > 0 ? MISSIONS[missionIndex - 1] : null;
  const nextMission = missionIndex < MISSIONS.length - 1 ? MISSIONS[missionIndex + 1] : null;

  const [code, setCode] = useState<string>(mission.starterCode);
  const [fontSize, setFontSize] = useState<number>(14);
  const [activeTab, setActiveTab] = useState<'instructions' | 'tests' | 'hints'>('instructions');
  const [testResults, setTestResults] = useState<TestCaseResult[]>([]);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [customInputQueue, setCustomInputQueue] = useState<string>('');
  const [isSuccessToast, setIsSuccessToast] = useState<boolean>(false);

  const {
    output,
    error,
    executionTime,
    plotImage,
    isRunning,
    statusMessage,
    runCode,
    clearConsole,
  } = usePython();

  // Reset code when mission changes
  useEffect(() => {
    setCode(mission.starterCode);
    setTestResults([]);
    clearConsole();
    setIsSuccessToast(false);
  }, [mission.id]);

  const handleRunCode = async () => {
    const inputLines = customInputQueue ? customInputQueue.split('\n').filter(Boolean) : [];
    await runCode(code, inputLines);
  };

  const handleValidateSubmission = async () => {
    setIsValidating(true);
    soundEngine.playRun();

    try {
      const summary = await validateMissionCode(mission, code);
      setTestResults(summary.results);

      if (summary.lastResult) {
        // Output from the last test execution
      }

      if (summary.allPassed) {
        completeMission(mission);
        setIsSuccessToast(true);
      } else {
        loseLife();
      }
    } catch (err) {
      console.error('Validation error:', err);
    } finally {
      setIsValidating(false);
    }
  };

  const isCompleted = player.completedMissionIds.includes(mission.id);

  return (
    <div className="flex flex-col h-[calc(100vh-65px)] bg-[#050816] overflow-hidden">
      {/* Mission Sub-Header Ribbon */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#070B1E] border-b border-slate-800 text-xs shrink-0">
        <div className="flex items-center gap-3">
          <Link
            to="/missions"
            onClick={() => soundEngine.playClick()}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline font-mono">Curriculum</span>
          </Link>

          <span className="text-slate-700">/</span>

          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase ${
                mission.track === 'biotechnology'
                  ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40'
                  : mission.track === 'materials_science'
                  ? 'bg-purple-950/40 text-purple-300 border border-purple-800/40'
                  : 'bg-cyan-950/40 text-cyan-300 border border-cyan-800/40'
              }`}
            >
              {mission.track.replace('_', ' ')}
            </span>
            <h2 className="font-bold text-white font-display text-sm truncate max-w-[200px] sm:max-w-md">
              {mission.title}
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1 font-mono text-[11px] text-cyan-400">
            <Award className="w-3.5 h-3.5" />
            <span>+{mission.xpReward} XP</span>
          </div>

          {/* Navigation between missions */}
          <div className="flex items-center gap-1 border-l border-slate-800 pl-3">
            {prevMission && (
              <button
                onClick={() => {
                  soundEngine.playClick();
                  navigate(`/mission/${prevMission.id}`);
                }}
                title="Previous mission"
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            {nextMission && (
              <button
                onClick={() => {
                  soundEngine.playClick();
                  navigate(`/mission/${nextMission.id}`);
                }}
                title="Next mission"
                className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Split-Screen Workspace (Responsive 3-Column / Tabbed Grid) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* LEFT PANEL: Concept Explanation & Instructions (4 cols) */}
        <div className="lg:col-span-4 h-full border-r border-slate-800 bg-[#070B1E] flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex items-center border-b border-slate-800 text-xs font-mono bg-[#090E26]">
            <button
              onClick={() => setActiveTab('instructions')}
              className={`flex-1 py-2.5 px-3 font-semibold text-center transition-colors border-b-2 ${
                activeTab === 'instructions'
                  ? 'border-[#00F5FF] text-[#00F5FF] bg-[#070B1E]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Task & Theory
            </button>
            <button
              onClick={() => setActiveTab('tests')}
              className={`flex-1 py-2.5 px-3 font-semibold text-center transition-colors border-b-2 ${
                activeTab === 'tests'
                  ? 'border-[#00F5FF] text-[#00F5FF] bg-[#070B1E]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Tests ({mission.testCases.length})
            </button>
            <button
              onClick={() => setActiveTab('hints')}
              className={`flex-1 py-2.5 px-3 font-semibold text-center transition-colors border-b-2 ${
                activeTab === 'hints'
                  ? 'border-[#00F5FF] text-[#00F5FF] bg-[#070B1E]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Hints
            </button>
          </div>

          {/* Panel Content Scroll Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs leading-relaxed text-slate-300">
            {activeTab === 'instructions' && (
              <>
                {/* Storyline Callout */}
                <div className="p-3 bg-[#0B1026] border border-cyan-900/40 rounded-xl space-y-1.5">
                  <div className="text-[11px] font-mono text-[#00F5FF] uppercase font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Laboratory Storyline
                  </div>
                  <p className="text-slate-300 italic">{mission.storyline}</p>
                </div>

                {/* Scientific Context */}
                <div className="p-3 bg-[#050816] border border-slate-800 rounded-xl space-y-2">
                  <div className="text-[11px] font-mono text-purple-400 uppercase font-bold flex items-center gap-1.5">
                    {mission.track === 'biotechnology' ? (
                      <Dna className="w-3.5 h-3.5 text-[#39FF14]" />
                    ) : (
                      <Layers className="w-3.5 h-3.5 text-[#A855F7]" />
                    )}
                    <span>{mission.scientificContext.domain} Context</span>
                  </div>
                  <div className="text-slate-400">
                    <span className="font-semibold text-slate-200">Instrument:</span>{' '}
                    {mission.scientificContext.instrument}
                  </div>
                  <p className="text-slate-300">{mission.scientificContext.description}</p>
                  {mission.scientificContext.realWorldFormula && (
                    <div className="p-2 bg-[#070B1E] rounded border border-slate-700 font-mono text-cyan-300 text-center font-bold">
                      {mission.scientificContext.realWorldFormula}
                    </div>
                  )}
                </div>

                {/* Python Concept Explanation */}
                <div className="space-y-2">
                  <h4 className="text-xs uppercase font-mono font-bold text-white flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Python Concept: {mission.pythonTopic}</span>
                  </h4>
                  <p className="text-slate-300 leading-relaxed">
                    {mission.conceptExplanation}
                  </p>
                  <div className="p-2.5 bg-[#050816] border border-slate-800 rounded font-mono text-[11px] text-cyan-300">
                    <pre className="whitespace-pre-wrap">{mission.exampleCode}</pre>
                  </div>
                </div>

                {/* Mission Objective Checklist */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <h4 className="text-xs uppercase font-mono font-bold text-amber-400">
                    Laboratory Objectives:
                  </h4>
                  <ul className="space-y-1.5 list-disc list-inside text-slate-200">
                    {mission.challengeInstructions.map((inst, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {inst}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {activeTab === 'tests' && (
              <TestCasesList
                testCases={mission.testCases}
                results={testResults}
                isRunning={isValidating}
              />
            )}

            {activeTab === 'hints' && (
              <HintDrawer hints={mission.hints} solutionCode={mission.solutionCode} />
            )}
          </div>
        </div>

        {/* CENTER & RIGHT: Monaco Editor & Console (8 cols) */}
        <div className="lg:col-span-8 h-full flex flex-col overflow-hidden bg-[#050816]">
          {/* Code Editor Container (Top half) */}
          <div className="flex-1 relative flex flex-col min-h-[300px]">
            {/* Editor Action Controls Ribbon */}
            <div className="flex items-center justify-between px-3 py-1.5 bg-[#090E26] border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono text-slate-400">Font:</span>
                <button
                  onClick={() => setFontSize(prev => Math.max(11, prev - 1))}
                  className="p-1 hover:bg-slate-800 text-slate-400 rounded"
                  title="Decrease font size"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-slate-300">{fontSize}px</span>
                <button
                  onClick={() => setFontSize(prev => Math.min(22, prev + 1))}
                  className="p-1 hover:bg-slate-800 text-slate-400 rounded"
                  title="Increase font size"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Action Execution Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning || isValidating}
                  className="px-3.5 py-1.5 bg-[#070B1E] hover:bg-slate-800 text-cyan-300 border border-cyan-800/50 rounded font-semibold text-xs flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Code</span>
                </button>

                <button
                  onClick={handleValidateSubmission}
                  disabled={isRunning || isValidating}
                  className="px-4 py-1.5 bg-gradient-to-r from-[#00F5FF] to-[#39FF14] hover:from-cyan-400 hover:to-green-400 text-[#050816] font-bold rounded shadow-[0_0_15px_rgba(0,245,255,0.4)] text-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{isValidating ? 'Validating...' : 'Validate & Submit'}</span>
                </button>
              </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 w-full">
              <MonacoPythonEditor
                code={code}
                onChange={setCode}
                onReset={() => setCode(mission.starterCode)}
                fontSize={fontSize}
              />
            </div>
          </div>

          {/* Stdin input bar if needed */}
          <div className="px-3 py-1.5 bg-[#070B1E] border-t border-slate-800 flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono text-[11px] whitespace-nowrap">
              Simulated input() Stream:
            </span>
            <input
              type="text"
              placeholder="e.g. 5.4 or Dr. Sarah (line-separated for multiple inputs)"
              value={customInputQueue}
              onChange={(e) => setCustomInputQueue(e.target.value)}
              className="flex-1 bg-[#050816] border border-slate-800 rounded px-2.5 py-1 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Console Output (Bottom half) */}
          <div className="h-[220px] shrink-0 border-t border-slate-800">
            <ConsoleOutput
              output={output}
              error={error}
              executionTime={executionTime}
              plotImage={plotImage}
              isRunning={isRunning}
              statusMessage={statusMessage}
              onClear={clearConsole}
            />
          </div>
        </div>
      </div>

      {/* Success Celebratory Banner */}
      {isSuccessToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 p-4 bg-[#070B1E] border-2 border-[#39FF14] rounded-2xl shadow-[0_0_35px_rgba(57,255,20,0.5)] flex items-center gap-4 animate-bounce">
          <CheckCircle2 className="w-6 h-6 text-[#39FF14]" />
          <div>
            <h4 className="font-bold text-white text-sm font-display">
              Mission Calibrated Successfully!
            </h4>
            <span className="text-xs text-[#39FF14] font-mono">
              +{mission.xpReward} XP awarded to your research dossier.
            </span>
          </div>
          {nextMission && (
            <button
              onClick={() => {
                soundEngine.playClick();
                setIsSuccessToast(false);
                navigate(`/mission/${nextMission.id}`);
              }}
              className="ml-2 px-3 py-1.5 bg-[#39FF14] text-slate-950 font-bold rounded text-xs flex items-center gap-1 shadow-md hover:bg-green-400"
            >
              <span>Next Mission</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
