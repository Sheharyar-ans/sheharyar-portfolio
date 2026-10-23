import React, { useState, useEffect, useRef } from 'react';
import { 
  GameMode, 
  LanguageType, 
  DifficultyLevel, 
  PuzzleChallenge, 
  FighterChallenge, 
  getPuzzleChallenge, 
  getFighterChallenge 
} from '../../data/arcadeChallenges';
import { PuzzleGridCanvas } from './PuzzleGridCanvas';
import { FighterArenaCanvas } from './FighterArenaCanvas';
import { arcadeAudio } from '../../utils/arcadeAudio';
import { 
  Gamepad2, 
  Swords, 
  Terminal, 
  Play, 
  RotateCcw, 
  Lightbulb, 
  ChevronDown, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Flame, 
  Cpu, 
  Volume2, 
  VolumeX, 
  Shuffle, 
  Layers 
} from 'lucide-react';

interface InteractiveGameArenaProps {
  onXpGained?: (xp: number) => void;
}

const LANGUAGES: Array<{ id: LanguageType; name: string; icon: string; badge: string }> = [
  { id: 'javascript', name: 'JavaScript', icon: '⚡', badge: 'ES6+ Logic' },
  { id: 'python', name: 'Python 3', icon: '🐍', badge: 'Data & Alg' },
  { id: 'react', name: 'React / JSX', icon: '⚛️', badge: 'State & UI' },
  { id: 'html_css', name: 'HTML & CSS', icon: '🎨', badge: 'DOM & Layout' },
  { id: 'api_json', name: 'JSON & APIs', icon: '🌐', badge: 'Payloads & Auth' }
];

const DIFFICULTIES: Array<{ id: DifficultyLevel; name: string; color: string }> = [
  { id: 'easy', name: 'Easy', color: 'text-emerald-400 border-emerald-500/30' },
  { id: 'medium', name: 'Medium', color: 'text-amber-400 border-amber-500/30' },
  { id: 'hard', name: 'Hard', color: 'text-rose-400 border-rose-500/30' }
];

export const InteractiveGameArena: React.FC<InteractiveGameArenaProps> = ({ onXpGained }) => {
  // Top Bar Controls State
  const [gameMode, setGameMode] = useState<GameMode>('puzzle');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageType>('javascript');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('easy');
  const [roundNumber, setRoundNumber] = useState<number>(0);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  // Active Challenge Data
  const [puzzleChallenge, setPuzzleChallenge] = useState<PuzzleChallenge>(() => 
    getPuzzleChallenge('javascript', 'easy', 0)
  );
  const [fighterChallenge, setFighterChallenge] = useState<FighterChallenge>(() => 
    getFighterChallenge('javascript', 'easy', 0)
  );

  // Code Editor State - STRICTLY BLANK / STARTER COMMENT ONLY!
  const [userCode, setUserCode] = useState<string>(() => puzzleChallenge.starterComment);
  const [showHint, setShowHint] = useState<boolean>(false);

  // Execution & Evaluation State
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [consoleLogs, setConsoleLogs] = useState<Array<{ type: 'info' | 'success' | 'error'; text: string }>>([]);
  const [puzzleCommandsQueue, setPuzzleCommandsQueue] = useState<string[]>([]);
  const [fighterAttackState, setFighterAttackState] = useState<{
    isAttacking: boolean;
    success: boolean | null;
    damage: number;
  }>({
    isAttacking: false,
    success: null,
    damage: 45
  });

  // Endless streaks
  const [streakCount, setStreakCount] = useState<number>(0);

  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Sync mute state on mount
  useEffect(() => {
    setIsMuted(arcadeAudio.getIsMuted());
  }, []);

  // Whenever gameMode, selectedLanguage, selectedDifficulty, or roundNumber changes, load new challenge & reset editor
  useEffect(() => {
    if (gameMode === 'puzzle') {
      const challenge = getPuzzleChallenge(selectedLanguage, selectedDifficulty, roundNumber);
      setPuzzleChallenge(challenge);
      // STRICT REQUIREMENT: BLANK CODE EDITOR
      setUserCode(challenge.starterComment);
    } else {
      const challenge = getFighterChallenge(selectedLanguage, selectedDifficulty, roundNumber);
      setFighterChallenge(challenge);
      // STRICT REQUIREMENT: BLANK CODE EDITOR
      setUserCode(challenge.starterComment);
    }
    setShowHint(false);
    setConsoleLogs([
      { type: 'info', text: `Loaded challenge in ${selectedLanguage.toUpperCase()} (${selectedDifficulty.toUpperCase()}). Write your code below to solve.` }
    ]);
    setPuzzleCommandsQueue([]);
    setFighterAttackState({ isAttacking: false, success: null, damage: 45 });
  }, [gameMode, selectedLanguage, selectedDifficulty, roundNumber]);

  // Handle Mode Toggle
  const handleModeChange = (mode: GameMode) => {
    arcadeAudio.playClick();
    setGameMode(mode);
    setRoundNumber(0);
  };

  // Handle Language Change
  const handleLanguageChange = (lang: LanguageType) => {
    arcadeAudio.playClick();
    setSelectedLanguage(lang);
    setIsLangDropdownOpen(false);
    setRoundNumber(0);
  };

  // Handle Difficulty Change
  const handleDifficultyChange = (diff: DifficultyLevel) => {
    arcadeAudio.playClick();
    setSelectedDifficulty(diff);
    setRoundNumber(0);
  };

  // Endless Mode: Load Next Challenge
  const handleNextChallenge = () => {
    arcadeAudio.playClick();
    setRoundNumber((prev) => prev + 1);
  };

  // Mute Audio Toggle
  const handleToggleMute = () => {
    const muted = arcadeAudio.toggleMute();
    setIsMuted(muted);
  };

  // Reset Editor to Blank
  const handleResetEditor = () => {
    arcadeAudio.playClick();
    const comment = gameMode === 'puzzle' ? puzzleChallenge.starterComment : fighterChallenge.starterComment;
    setUserCode(comment);
    setConsoleLogs([{ type: 'info', text: 'Code editor reset to blank state.' }]);
  };

  // -------------------------------------------------------------
  // STRICT CODE EVALUATION ENGINE
  // -------------------------------------------------------------
  const handleRunCode = () => {
    arcadeAudio.playClick();
    setIsEvaluating(true);
    setConsoleLogs([{ type: 'info', text: 'Compiling and analyzing syntax...' }]);

    // 1. Strict Validation: Disallow empty code or comment-only code
    const cleanCode = userCode
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0 && !line.startsWith('//') && !line.startsWith('#') && !line.startsWith('/*'))
      .join('\n');

    if (!cleanCode || cleanCode.trim().length === 0) {
      setTimeout(() => {
        arcadeAudio.playError();
        setIsEvaluating(false);
        setConsoleLogs([
          { type: 'error', text: 'Syntax Error: Code editor is empty!' },
          { type: 'error', text: 'You must type your own solution code before running.' }
        ]);
        if (gameMode === 'fighter') {
          // Trigger boss counter attack on empty code!
          setFighterAttackState({ isAttacking: true, success: false, damage: 25 });
        }
      }, 250);
      return;
    }

    if (gameMode === 'puzzle') {
      evaluatePuzzleCode(cleanCode);
    } else {
      evaluateFighterCode(cleanCode);
    }
  };

  // Evaluate Puzzle Navigation Code
  const evaluatePuzzleCode = (code: string) => {
    try {
      const generatedCommands: string[] = [];

      // Create a virtual bot interface
      const mockBot = {
        right: (steps = 1) => {
          for (let i = 0; i < (Number(steps) || 1); i++) generatedCommands.push('right');
        },
        left: (steps = 1) => {
          for (let i = 0; i < (Number(steps) || 1); i++) generatedCommands.push('left');
        },
        up: (steps = 1) => {
          for (let i = 0; i < (Number(steps) || 1); i++) generatedCommands.push('up');
        },
        down: (steps = 1) => {
          for (let i = 0; i < (Number(steps) || 1); i++) generatedCommands.push('down');
        },
        collectKey: () => generatedCommands.push('collect'),
        collect_key: () => generatedCommands.push('collect')
      };

      // Support Python-style syntax conversion to JS executable block
      let executable = code;
      if (selectedLanguage === 'python') {
        // Simple transpile for python loops like "for _ in range(x):"
        executable = executable
          .replace(/for\s+(\w+)\s+in\s+range\((\d+)\):/g, 'for (let $1 = 0; $1 < $2; $1++) {')
          .replace(/while\s+(.*?):/g, 'while ($1) {')
          .replace(/bot\.collect_key\(\)/g, 'bot.collectKey()')
          .replace(/bot\.move_right\((\d*)\)/g, 'bot.right($1)')
          .replace(/bot\.move_left\((\d*)\)/g, 'bot.left($1)')
          .replace(/bot\.move_up\((\d*)\)/g, 'bot.up($1)')
          .replace(/bot\.move_down\((\d*)\)/g, 'bot.down($1)');
      }

      // Safe JS Function Evaluation
      const runner = new Function('bot', `
        "use strict";
        try {
          ${executable}
        } catch (err) {
          throw err;
        }
      `);

      runner(mockBot);

      if (generatedCommands.length === 0) {
        throw new Error('Code executed successfully but emitted 0 bot movement commands. Make sure you call bot.right(), bot.down(), etc.');
      }

      setConsoleLogs([
        { type: 'info', text: `Compiled successfully. Generated ${generatedCommands.length} navigation steps.` },
        { type: 'info', text: `Command Sequence: [${generatedCommands.join(' -> ')}]` }
      ]);

      // Feed to PuzzleGridCanvas
      setPuzzleCommandsQueue(generatedCommands);
      setIsEvaluating(false);

    } catch (err: any) {
      arcadeAudio.playError();
      setIsEvaluating(false);
      setConsoleLogs([
        { type: 'error', text: `Execution Exception: ${err.message || 'Syntax Error'}` },
        { type: 'error', text: 'Bot execution aborted. Check syntax guide above.' }
      ]);
    }
  };

  // Evaluate Fighter Combat Code against Test Cases
  const evaluateFighterCode = (code: string) => {
    try {
      const challenge = fighterChallenge;
      let userFn: any;

      if (selectedLanguage === 'python') {
        // Check if user defined def <fn_name>
        const defMatch = code.match(/def\s+(\w+)\s*\((.*?)\):/);
        if (!defMatch) {
          throw new Error(`Python Syntax Error: Expected function definition 'def ${challenge.targetFunction}(...):'`);
        }
        // Transpile basic Python math/return to JS function
        const bodyLines = code.split('\n').filter(l => !l.startsWith('def '));
        const body = bodyLines.join('\n')
          .replace(/elif /g, 'else if ')
          .replace(/True/g, 'true')
          .replace(/False/g, 'false')
          .replace(/None/g, 'null');

        const params = defMatch[2];
        userFn = new Function(params, `"use strict"; ${body}`);
      } else {
        // JavaScript / React / API
        const fnName = challenge.targetFunction;
        // Wrap user code and return the function
        const runner = new Function(`
          "use strict";
          ${code};
          if (typeof ${fnName} !== 'undefined') return ${fnName};
          if (typeof solution !== 'undefined') return solution;
          throw new Error("Target function '${fnName}' was not defined. Make sure you write 'function ${fnName}(...)'");
        `);
        userFn = runner();
      }

      // Run each test case strictly
      let allPassed = true;
      const logs: Array<{ type: 'info' | 'success' | 'error'; text: string }> = [];

      for (let i = 0; i < challenge.testCases.length; i++) {
        const tc = challenge.testCases[i];
        let actual: any;

        try {
          if (Array.isArray(tc.input)) {
            actual = userFn(...tc.input);
          } else {
            actual = userFn(tc.input);
          }
        } catch (execErr: any) {
          throw new Error(`Runtime Exception on Test Case ${i + 1}: ${execErr.message}`);
        }

        const isMatch = JSON.stringify(actual) === JSON.stringify(tc.expected);

        if (isMatch) {
          logs.push({
            type: 'success',
            text: `✓ Test ${i + 1} Passed: input ${tc.displayInput} -> ${tc.displayExpected}`
          });
        } else {
          allPassed = false;
          logs.push({
            type: 'error',
            text: `✗ Test ${i + 1} Failed: input ${tc.displayInput} expected ${tc.displayExpected}, but received ${JSON.stringify(actual)}`
          });
          break; // Stop on first failure
        }
      }

      setIsEvaluating(false);

      if (allPassed) {
        logs.push({
          type: 'success',
          text: `CRITICAL HIT! All ${challenge.testCases.length} test cases passed. Attack executed!`
        });
        setConsoleLogs(logs);
        // Trigger Player Strike
        setFighterAttackState({
          isAttacking: true,
          success: true,
          damage: challenge.damage
        });
      } else {
        logs.push({
          type: 'error',
          text: 'ATTACK MISSED! Boss counter-attack triggered!'
        });
        setConsoleLogs(logs);
        // Trigger Boss Counter Strike
        setFighterAttackState({
          isAttacking: true,
          success: false,
          damage: 25
        });
      }

    } catch (err: any) {
      arcadeAudio.playError();
      setIsEvaluating(false);
      setConsoleLogs([
        { type: 'error', text: `Evaluation Error: ${err.message}` },
        { type: 'error', text: 'Fighter attack misfired! Boss counters for 25 HP!' }
      ]);
      setFighterAttackState({
        isAttacking: true,
        success: false,
        damage: 25
      });
    }
  };

  // Callback from PuzzleGridCanvas
  const handlePuzzleComplete = (success: boolean, message: string) => {
    if (success) {
      setStreakCount((prev) => prev + 1);
      const earnedXp = selectedDifficulty === 'easy' ? 100 : selectedDifficulty === 'medium' ? 250 : 500;
      onXpGained?.(earnedXp);
      setConsoleLogs((prev) => [
        ...prev,
        { type: 'success', text: `★ VICTORY! ${message} (+${earnedXp} XP)` },
        { type: 'info', text: 'Click "Next Challenge" to load a new endless procedural matrix.' }
      ]);
    } else {
      setStreakCount(0);
      setConsoleLogs((prev) => [
        ...prev,
        { type: 'error', text: `✗ FAILURE: ${message}` }
      ]);
    }
  };

  // Callback from FighterArenaCanvas
  const handleFightResult = (victory: boolean) => {
    if (victory) {
      setStreakCount((prev) => prev + 1);
      const earnedXp = selectedDifficulty === 'easy' ? 150 : selectedDifficulty === 'medium' ? 300 : 600;
      onXpGained?.(earnedXp);
      setConsoleLogs((prev) => [
        ...prev,
        { type: 'success', text: `🏆 BOSS DEFEATED! Victory claimed! (+${earnedXp} XP)` },
        { type: 'info', text: 'Challenger neutralized. Spawn next opponent below!' }
      ]);
    } else {
      setStreakCount(0);
      setConsoleLogs((prev) => [
        ...prev,
        { type: 'error', text: 'DEFEAT: Your cyber-fighter sustained lethal damage. Review code and retry.' }
      ]);
    }
  };

  const currentChallengeTitle = gameMode === 'puzzle' ? puzzleChallenge.title : fighterChallenge.title;
  const currentInstructions = gameMode === 'puzzle' ? puzzleChallenge.instructions : fighterChallenge.story;
  const currentSyntax = gameMode === 'puzzle' ? puzzleChallenge.syntaxGuide : `Task: ${fighterChallenge.task}`;
  const currentHint = gameMode === 'puzzle' ? puzzleChallenge.hint : fighterChallenge.hint;

  return (
    <div className="w-full space-y-6">
      {/* ================= TOP CONTROL BAR ================= */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-1 border border-brand-border/80 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left: Mode Switcher & Endless Next Button */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          {/* Game Mode Switcher */}
          <div className="flex p-1 rounded-xl bg-surface-2 border border-brand-border/70 font-mono text-xs">
            <button
              onClick={() => handleModeChange('puzzle')}
              className={`px-3 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${
                gameMode === 'puzzle'
                  ? 'bg-accent text-black shadow-[0_0_12px_rgba(183,255,60,0.4)]'
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              <Gamepad2 size={15} />
              <span>Puzzle Solver</span>
            </button>
            <button
              onClick={() => handleModeChange('fighter')}
              className={`px-3 py-2 rounded-lg font-bold flex items-center gap-2 transition-all ${
                gameMode === 'fighter'
                  ? 'bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.5)]'
                  : 'text-brand-muted hover:text-white'
              }`}
            >
              <Swords size={15} />
              <span>1v1 Fighter</span>
            </button>
          </div>

          {/* Endless "Next Challenge" Button */}
          <button
            onClick={handleNextChallenge}
            className="px-3.5 py-2 rounded-xl bg-surface-2 hover:bg-surface-3 border border-brand-border hover:border-accent text-white font-mono text-xs font-bold flex items-center gap-2 transition-all shadow-md group"
            title="Generate Endless Randomized Challenge"
          >
            <Shuffle size={14} className="text-accent group-hover:rotate-180 transition-transform duration-500" />
            <span>Next Challenge</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-brand-muted">
              #{roundNumber + 1}
            </span>
          </button>
        </div>

        {/* Right: Language Dropdown, Difficulty Selector & Audio Toggle */}
        <div className="flex flex-wrap items-center justify-end gap-3 w-full lg:w-auto">
          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="px-3.5 py-2 rounded-xl bg-surface-2 border border-brand-border/80 hover:border-accent text-white font-mono text-xs font-bold flex items-center gap-2.5 transition-colors shadow-md min-w-[170px] justify-between"
            >
              <div className="flex items-center gap-2">
                <span>{LANGUAGES.find(l => l.id === selectedLanguage)?.icon}</span>
                <span>{LANGUAGES.find(l => l.id === selectedLanguage)?.name}</span>
              </div>
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 text-brand-muted ${
                  isLangDropdownOpen ? 'rotate-180 text-accent' : ''
                }`}
              />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 rounded-xl bg-surface-2/95 border border-brand-border shadow-2xl backdrop-blur-xl z-30 p-1.5 space-y-1 font-mono text-xs animate-fade-in">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.id}
                    onClick={() => handleLanguageChange(lang.id)}
                    className={`w-full p-2.5 rounded-lg flex items-center justify-between transition-colors ${
                      selectedLanguage === lang.id
                        ? 'bg-accent text-black font-bold'
                        : 'hover:bg-surface-3 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{lang.icon}</span>
                      <span>{lang.name}</span>
                    </div>
                    <span className="text-[9px] opacity-75">{lang.badge}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Difficulty Selector */}
          <div className="flex p-1 rounded-xl bg-surface-2 border border-brand-border/70 font-mono text-xs">
            {DIFFICULTIES.map((diff) => (
              <button
                key={diff.id}
                onClick={() => handleDifficultyChange(diff.id)}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedDifficulty === diff.id
                    ? 'bg-white/10 text-white shadow-sm'
                    : 'text-brand-muted hover:text-white'
                }`}
              >
                <span className={selectedDifficulty === diff.id ? diff.color.split(' ')[0] : ''}>
                  {diff.name}
                </span>
              </button>
            ))}
          </div>

          {/* Mute Button */}
          <button
            onClick={handleToggleMute}
            className={`p-2 rounded-xl border transition-colors ${
              isMuted 
                ? 'bg-rose-950/40 border-rose-500/50 text-rose-400' 
                : 'bg-surface-2 border-brand-border text-brand-muted hover:text-white'
            }`}
            title={isMuted ? 'Unmute Game Audio' : 'Mute Game Audio'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>
        </div>
      </div>

      {/* ================= MAIN SPLIT ARENA ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* LEFT PANEL: Task Instructions + Blank Code Editor + Verification Terminal (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col min-h-[580px] bg-surface-1 rounded-2xl border border-brand-border/80 shadow-2xl overflow-hidden font-mono">
          {/* Top Panel: Task Description & Mission Instructions */}
          <div className="p-4 sm:p-5 border-b border-brand-border/70 bg-surface-2/40">
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2 truncate">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                  selectedDifficulty === 'easy' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' 
                    : selectedDifficulty === 'medium'
                    ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    : 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                }`}>
                  {selectedDifficulty}
                </span>
                <h3 className="text-white text-sm sm:text-base font-bold truncate">
                  {currentChallengeTitle}
                </h3>
              </div>

              {/* Hint Toggle */}
              <button
                onClick={() => {
                  arcadeAudio.playClick();
                  setShowHint(!showHint);
                }}
                className={`text-xs px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-colors ${
                  showHint 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                    : 'bg-surface-3 text-brand-muted hover:text-white border-brand-border'
                }`}
              >
                <Lightbulb size={13} className={showHint ? 'text-amber-400 fill-amber-400' : ''} />
                <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
              </button>
            </div>

            {/* Mission Task */}
            <p className="text-xs text-brand-secondary leading-relaxed mb-2.5">
              {currentInstructions}
            </p>

            {/* Syntax Guidance */}
            <div className="p-2.5 rounded-xl bg-black/40 border border-brand-border/60 text-[11px] text-cyan-300">
              <span className="font-bold text-zinc-400 uppercase tracking-wider block text-[9px] mb-1">
                SYNTAX SPECIFICATION:
              </span>
              <code>{currentSyntax}</code>
            </div>

            {/* Tactical Hint Dropdown */}
            {showHint && (
              <div className="mt-2.5 p-3 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-amber-200 animate-fade-in flex items-start gap-2">
                <Lightbulb size={14} className="text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  <span className="font-bold uppercase text-[10px] block mb-0.5">TACTICAL HINT:</span>
                  {currentHint}
                </div>
              </div>
            )}
          </div>

          {/* Code Editor Window Header */}
          <div className="px-4 py-2.5 bg-black/60 border-b border-brand-border/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/60" />
              </div>
              <span className="text-brand-muted text-[11px]">
                {selectedLanguage}.{selectedLanguage === 'python' ? 'py' : selectedLanguage === 'html_css' ? 'css' : 'js'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] text-brand-muted uppercase">
                {userCode.split('\n').length} LINES
              </span>
              <button
                onClick={handleResetEditor}
                className="p-1 rounded bg-surface-2 hover:bg-surface-3 text-brand-muted hover:text-white transition-colors"
                title="Reset to Blank"
              >
                <RotateCcw size={12} />
              </button>
            </div>
          </div>

          {/* Interactive Code Editor (STRICTLY BLANK BY DEFAULT) */}
          <div className="relative flex-1 flex bg-[#0c0d12]">
            {/* Line numbers gutter */}
            <div className="w-10 py-3 bg-[#08090d] border-r border-brand-border/40 text-right pr-2 text-zinc-600 text-xs select-none font-mono">
              {userCode.split('\n').map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Editable code area */}
            <textarea
              ref={editorRef}
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              placeholder="// Write your code logic from scratch here..."
              spellCheck={false}
              autoCapitalize="off"
              autoComplete="off"
              data-lenis-prevent="true"
              onWheel={(e) => e.stopPropagation()}
              className="flex-1 p-3 bg-transparent text-emerald-400 font-mono text-xs sm:text-sm leading-6 resize-none focus:outline-none selection:bg-accent/20 selection:text-white overflow-y-auto"
            />
          </div>

          {/* Test Case Verification & Console Output */}
          <div className="border-t border-brand-border/70 bg-black/90 p-3 max-h-40 overflow-y-auto font-mono text-xs">
            <div className="flex items-center justify-between text-[10px] text-brand-muted uppercase mb-1.5 pb-1 border-b border-brand-border/40">
              <span className="flex items-center gap-1.5">
                <Terminal size={12} className="text-cyan-400" />
                EXECUTION TERMINAL & ASSERTIONS
              </span>
              <span>{consoleLogs.length} LOGS</span>
            </div>

            <div className="space-y-1">
              {consoleLogs.map((log, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-start gap-1.5 text-[11px] leading-relaxed ${
                    log.type === 'error' 
                      ? 'text-red-400' 
                      : log.type === 'success' 
                      ? 'text-emerald-400 font-bold' 
                      : 'text-zinc-400'
                  }`}
                >
                  <span className="opacity-50 select-none">&gt;</span>
                  <span>{log.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Bar: Run / Execute Attack Button */}
          <div className="p-3 bg-surface-1 border-t border-brand-border/70 flex items-center justify-between">
            <div className="text-[11px] text-brand-muted flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Sandbox ready</span>
              {streakCount > 0 && (
                <span className="text-accent font-bold ml-2">
                  🔥 {streakCount} Win Streak!
                </span>
              )}
            </div>

            <button
              onClick={handleRunCode}
              disabled={isEvaluating}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg ${
                gameMode === 'puzzle'
                  ? 'bg-accent text-black hover:scale-105 shadow-[0_0_20px_rgba(183,255,60,0.4)]'
                  : 'bg-rose-500 text-white hover:scale-105 shadow-[0_0_20px_rgba(244,63,94,0.5)]'
              }`}
            >
              {isEvaluating ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Evaluating...</span>
                </>
              ) : gameMode === 'puzzle' ? (
                <>
                  <Play size={14} className="fill-current" />
                  <span>Run Code</span>
                </>
              ) : (
                <>
                  <Swords size={14} />
                  <span>Execute Attack</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: Interactive Canvas (Puzzle Grid OR 1v1 Fighter Arena) (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col min-h-[580px] shadow-2xl">
          {gameMode === 'puzzle' ? (
            <PuzzleGridCanvas
              layout={puzzleChallenge.layout}
              isExecuting={puzzleCommandsQueue.length > 0}
              commandsQueue={puzzleCommandsQueue}
              onExecutionComplete={handlePuzzleComplete}
              onReset={() => setPuzzleCommandsQueue([])}
            />
          ) : (
            <FighterArenaCanvas
              challenge={fighterChallenge}
              isAttacking={fighterAttackState.isAttacking}
              attackSuccess={fighterAttackState.success}
              attackDamage={fighterAttackState.damage}
              onFightResult={handleFightResult}
              onNextBoss={handleNextChallenge}
            />
          )}
        </div>
      </div>
    </div>
  );
};
