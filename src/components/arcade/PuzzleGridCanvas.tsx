import React, { useState, useEffect, useRef } from 'react';
import { 
  PuzzleLayout, 
  GridPosition 
} from '../../data/arcadeChallenges';
import { arcadeAudio } from '../../utils/arcadeAudio';
import { 
  Zap, 
  Key, 
  ShieldAlert, 
  Compass, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export interface BotCommand {
  type: 'up' | 'down' | 'left' | 'right' | 'collect';
  steps?: number;
}

interface PuzzleGridCanvasProps {
  layout: PuzzleLayout;
  isExecuting: boolean;
  commandsQueue: string[]; // e.g. ['right', 'down', 'collect', ...]
  onExecutionComplete: (success: boolean, message: string) => void;
  onReset: () => void;
}

export const PuzzleGridCanvas: React.FC<PuzzleGridCanvasProps> = ({
  layout,
  isExecuting,
  commandsQueue,
  onExecutionComplete,
  onReset
}) => {
  const [botPos, setBotPos] = useState<GridPosition>(layout.start);
  const [visitedTiles, setVisitedTiles] = useState<GridPosition[]>([layout.start]);
  const [hasKey, setHasKey] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);
  const [statusMessage, setStatusMessage] = useState<string>('Ready for commands');
  const [isCrashed, setIsCrashed] = useState<boolean>(false);
  const [isWarping, setIsWarping] = useState<boolean>(false);

  const executionTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset internal state when layout changes or user manually resets
  useEffect(() => {
    setBotPos(layout.start);
    setVisitedTiles([layout.start]);
    setHasKey(false);
    setCurrentStepIndex(-1);
    setStatusMessage('Unit positioned at (' + layout.start.x + ', ' + layout.start.y + ')');
    setIsCrashed(false);
    setIsWarping(false);
    if (executionTimerRef.current) {
      clearTimeout(executionTimerRef.current);
    }
  }, [layout]);

  // Execute commands sequentially step-by-step
  useEffect(() => {
    if (!isExecuting || commandsQueue.length === 0) return;

    setIsCrashed(false);
    setIsWarping(false);
    setBotPos(layout.start);
    setVisitedTiles([layout.start]);
    setHasKey(false);
    setCurrentStepIndex(0);
    setStatusMessage('Executing sequence: ' + commandsQueue.length + ' steps...');

    let step = 0;
    let currentX = layout.start.x;
    let currentY = layout.start.y;
    let keyCollected = false;
    const history: GridPosition[] = [{ x: currentX, y: currentY }];

    const runNextStep = () => {
      if (step >= commandsQueue.length) {
        // Sequence finished. Check if at goal tile!
        if (currentX === layout.goal.x && currentY === layout.goal.y) {
          if (layout.key && !keyCollected) {
            arcadeAudio.playError();
            setStatusMessage('Access Denied: Exit portal requires the Cyber-Key!');
            onExecutionComplete(false, 'Exit portal is locked. You must collect the key first!');
          } else {
            arcadeAudio.playSuccess();
            setIsWarping(true);
            setStatusMessage('Portal Activated! Extraction vector confirmed.');
            onExecutionComplete(true, 'Challenge Solved! Vector coordinates verified.');
          }
        } else {
          arcadeAudio.playError();
          setStatusMessage(`Halted: Bot reached (${currentX}, ${currentY}), but goal is at (${layout.goal.x}, ${layout.goal.y}).`);
          onExecutionComplete(false, `Execution halted at (${currentX}, ${currentY}). Target was (${layout.goal.x}, ${layout.goal.y}).`);
        }
        return;
      }

      const cmd = commandsQueue[step];
      setCurrentStepIndex(step);

      let nextX = currentX;
      let nextY = currentY;

      if (cmd === 'right') nextX += 1;
      else if (cmd === 'left') nextX -= 1;
      else if (cmd === 'up') nextY -= 1;
      else if (cmd === 'down') nextY += 1;
      else if (cmd === 'collect') {
        if (layout.key && currentX === layout.key.x && currentY === layout.key.y) {
          keyCollected = true;
          setHasKey(true);
          arcadeAudio.playPunch();
          setStatusMessage(`[Step ${step + 1}] Cyber-Key decrypted!`);
        } else {
          arcadeAudio.playError();
          setStatusMessage(`[Step ${step + 1}] No key at (${currentX}, ${currentY}) to collect.`);
        }
      }

      // Check bounds
      if (nextX < 0 || nextX >= layout.gridSize || nextY < 0 || nextY >= layout.gridSize) {
        arcadeAudio.playError();
        setIsCrashed(true);
        setStatusMessage(`CRASH: Boundary breach at (${nextX}, ${nextY})! Drone went out of bounds.`);
        onExecutionComplete(false, `Drone breached grid boundary at coordinates (${nextX}, ${nextY})!`);
        return;
      }

      // Check walls
      const isWall = layout.walls.some(w => w.x === nextX && w.y === nextY);
      if (isWall) {
        arcadeAudio.playError();
        setIsCrashed(true);
        setStatusMessage(`COLLISION: Firewall barrier impacted at (${nextX}, ${nextY})!`);
        onExecutionComplete(false, `Drone collided with firewall barrier at (${nextX}, ${nextY})!`);
        return;
      }

      // Check lasers
      const isLaser = layout.lasers?.some(l => l.x === nextX && l.y === nextY);
      if (isLaser) {
        arcadeAudio.playLaser();
        setIsCrashed(true);
        setStatusMessage(`VAPORIZED: Lethal laser beam intersected at (${nextX}, ${nextY})!`);
        onExecutionComplete(false, `Drone intersected laser defense grid at (${nextX}, ${nextY})!`);
        return;
      }

      // Auto collect key if stepping onto it
      if (layout.key && nextX === layout.key.x && nextY === layout.key.y && !keyCollected) {
        keyCollected = true;
        setHasKey(true);
        arcadeAudio.playPunch();
      }

      // Move bot
      currentX = nextX;
      currentY = nextY;
      setBotPos({ x: currentX, y: currentY });
      history.push({ x: currentX, y: currentY });
      setVisitedTiles([...history]);
      arcadeAudio.playClick();

      step++;
      executionTimerRef.current = setTimeout(runNextStep, 380);
    };

    executionTimerRef.current = setTimeout(runNextStep, 200);

    return () => {
      if (executionTimerRef.current) {
        clearTimeout(executionTimerRef.current);
      }
    };
  }, [isExecuting, commandsQueue]);

  const handleManualReset = () => {
    arcadeAudio.playClick();
    if (executionTimerRef.current) clearTimeout(executionTimerRef.current);
    setBotPos(layout.start);
    setVisitedTiles([layout.start]);
    setHasKey(false);
    setCurrentStepIndex(-1);
    setIsCrashed(false);
    setIsWarping(false);
    setStatusMessage('Reset to start position.');
    onReset();
  };

  const gridSize = layout.gridSize || 5;

  return (
    <div 
      className="relative flex flex-col h-full w-full bg-surface-1/90 rounded-2xl border border-brand-border/80 p-4 overflow-hidden"
      data-lenis-prevent="true"
      onWheel={(e) => e.stopPropagation()}
    >
      {/* Canvas Top Bar */}
      <div className="flex items-center justify-between pb-3 border-b border-brand-border/60 text-xs font-mono">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <span className="text-white font-bold uppercase tracking-wider">
            Sector Matrix {gridSize}x{gridSize}
          </span>
          {layout.key && (
            <span className={`text-[10px] px-2 py-0.5 rounded-full border transition-all ${
              hasKey 
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-[0_0_8px_rgba(245,158,11,0.3)]' 
                : 'bg-zinc-800 text-zinc-400 border-zinc-700'
            }`}>
              {hasKey ? '✓ KEY ACQUIRED' : '🔒 KEY REQUIRED'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-brand-muted text-[11px]">
            Drone: <span className="text-cyan-400 font-bold">({botPos.x}, {botPos.y})</span>
          </span>
          <button
            onClick={handleManualReset}
            className="p-1.5 rounded-lg bg-surface-2 hover:bg-surface-3 text-brand-muted hover:text-white transition-colors"
            title="Reset Drone Position"
          >
            <RotateCcw size={13} />
          </button>
        </div>
      </div>

      {/* Main Grid Viewport */}
      <div className="relative flex-1 flex items-center justify-center py-4 my-auto">
        <div 
          className="grid gap-2 w-full max-w-[420px] aspect-square p-3 rounded-2xl bg-black/60 border border-brand-border shadow-2xl relative"
          style={{
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${gridSize}, minmax(0, 1fr))`
          }}
        >
          {Array.from({ length: gridSize * gridSize }).map((_, index) => {
            const x = index % gridSize;
            const y = Math.floor(index / gridSize);

            const isStart = layout.start.x === x && layout.start.y === y;
            const isGoal = layout.goal.x === x && layout.goal.y === y;
            const isWall = layout.walls.some(w => w.x === x && w.y === y);
            const isLaser = layout.lasers?.some(l => l.x === x && l.y === y);
            const isKeyTile = layout.key?.x === x && layout.key?.y === y;
            const isBotHere = botPos.x === x && botPos.y === y;
            const isVisited = visitedTiles.some(t => t.x === x && t.y === y);

            return (
              <div
                key={`${x}-${y}`}
                className={`relative rounded-xl flex items-center justify-center transition-all duration-300 font-mono text-[9px] select-none ${
                  isWall 
                    ? 'bg-zinc-900 border-2 border-red-500/40 shadow-inner'
                    : isLaser
                    ? 'bg-red-950/40 border border-red-500/60 shadow-[inset_0_0_12px_rgba(239,68,68,0.3)]'
                    : isGoal
                    ? 'bg-emerald-950/40 border-2 border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.3)] animate-pulse'
                    : isVisited && !isBotHere
                    ? 'bg-cyan-950/30 border border-cyan-500/30 shadow-[inset_0_0_8px_rgba(6,182,212,0.2)]'
                    : 'bg-surface-2/60 border border-brand-border/40 hover:border-brand-border'
                }`}
              >
                {/* Coordinate label watermark */}
                <span className="absolute bottom-1 right-1 text-[8px] text-zinc-600 font-mono">
                  {x},{y}
                </span>

                {/* Wall Hazard Pattern */}
                {isWall && (
                  <div className="absolute inset-0 rounded-lg flex items-center justify-center opacity-70">
                    <ShieldAlert size={18} className="text-red-400" />
                  </div>
                )}

                {/* Laser Hazard */}
                {isLaser && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1.5 h-full bg-red-500 shadow-[0_0_10px_#ef4444] animate-pulse" />
                  </div>
                )}

                {/* Key Item */}
                {isKeyTile && !hasKey && (
                  <div className="relative z-10 flex flex-col items-center justify-center animate-bounce">
                    <Key size={18} className="text-amber-400 drop-shadow-[0_0_8px_#f59e0b]" />
                  </div>
                )}

                {/* Exit Portal */}
                {isGoal && (
                  <div className="relative z-10 flex flex-col items-center justify-center">
                    <div className={`w-7 h-7 rounded-full border-2 border-dashed flex items-center justify-center transition-all ${
                      isWarping 
                        ? 'border-emerald-300 scale-125 rotate-180 bg-emerald-400 text-black shadow-[0_0_20px_#34d399]' 
                        : 'border-emerald-400 animate-spin text-emerald-400'
                    }`}>
                      <Zap size={14} className={isWarping ? 'text-black fill-black' : ''} />
                    </div>
                  </div>
                )}

                {/* Cyber-Drone Character */}
                {isBotHere && (
                  <div 
                    className={`relative z-20 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 transform scale-110 shadow-2xl ${
                      isCrashed 
                        ? 'bg-red-600 text-white animate-shake shadow-[0_0_25px_#dc2626]' 
                        : isWarping
                        ? 'bg-emerald-400 text-black scale-125 shadow-[0_0_30px_#34d399]'
                        : 'bg-gradient-to-br from-cyan-400 to-blue-600 text-black shadow-[0_0_18px_rgba(6,182,212,0.8)]'
                    }`}
                  >
                    <Compass size={20} className={isCrashed ? 'rotate-45' : 'animate-spin-slow'} />
                    {/* Propulsion thruster particle */}
                    <div className="absolute -bottom-1 w-2.5 h-1 bg-cyan-300 rounded-full blur-[1px] animate-pulse" />
                  </div>
                )}

                {/* Start Marker Label */}
                {isStart && !isBotHere && (
                  <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">
                    START
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Execution Step & Telemetry Footer */}
      <div className="mt-auto pt-3 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 truncate">
          {isCrashed ? (
            <AlertTriangle size={14} className="text-red-400 flex-shrink-0 animate-bounce" />
          ) : isWarping ? (
            <CheckCircle2 size={14} className="text-emerald-400 flex-shrink-0" />
          ) : (
            <Zap size={14} className="text-cyan-400 flex-shrink-0" />
          )}
          <span className={`truncate text-[11px] ${
            isCrashed 
              ? 'text-red-400 font-bold' 
              : isWarping 
              ? 'text-emerald-400 font-bold' 
              : 'text-zinc-300'
          }`}>
            {statusMessage}
          </span>
        </div>

        {currentStepIndex >= 0 && (
          <div className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-950/60 text-cyan-300 border border-cyan-800">
            Step {currentStepIndex + 1} / {commandsQueue.length}
          </div>
        )}
      </div>
    </div>
  );
};
