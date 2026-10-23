import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { Play, Shield, Zap, Sparkles, CheckCircle2, AlertTriangle } from 'lucide-react';

interface Arcade3DViewportProps {
  levelTitle: string;
  difficulty: string;
  targetNodes: number;
  clearedNodes: number;
  isExecuting: boolean;
  isSuccess: boolean;
  hasError: boolean;
  actionName: string;
}

// 3D Cyber-Bot Mascot
const CyberBot: React.FC<{ isExecuting: boolean; isSuccess: boolean; hasError: boolean }> = ({
  isExecuting,
  isSuccess,
  hasError
}) => {
  const botRef = useRef<THREE.Group>(null);
  const eyeRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!botRef.current) return;
    const t = state.clock.getElapsedTime();

    // Natural levitation hover
    botRef.current.position.y = Math.sin(t * 2) * 0.12;

    // React to states
    if (isExecuting) {
      botRef.current.rotation.y += delta * 4;
      botRef.current.position.z = Math.sin(t * 12) * 0.05;
    } else {
      // Idle gentle sway
      botRef.current.rotation.y = Math.sin(t * 0.8) * 0.25;
      botRef.current.rotation.z = Math.sin(t * 1.2) * 0.05;
    }

    if (coreRef.current) {
      const coreMat = coreRef.current.material as THREE.MeshStandardMaterial;
      if (hasError) {
        coreMat.emissive.set('#EF4444');
      } else if (isSuccess) {
        coreMat.emissive.set('#B7FF3C');
      } else {
        coreMat.emissive.set(isExecuting ? '#00F0FF' : '#B7FF3C');
      }
      coreMat.emissiveIntensity = 1.5 + Math.sin(t * 5) * 0.8;
    }
  });

  return (
    <group ref={botRef} position={[0, 0, 0]}>
      {/* Head */}
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial
          color="#18181B"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Visor Display */}
      <mesh ref={eyeRef} position={[0, 0.78, 0.36]}>
        <boxGeometry args={[0.48, 0.2, 0.1]} />
        <meshStandardMaterial
          color="#050505"
          emissive={hasError ? '#EF4444' : isSuccess ? '#B7FF3C' : '#00F0FF'}
          emissiveIntensity={isExecuting ? 3.5 : 2.2}
          roughness={0.1}
        />
      </mesh>

      {/* Antennas */}
      <mesh position={[-0.32, 1.15, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4]} />
        <meshStandardMaterial color="#B7FF3C" emissive="#B7FF3C" emissiveIntensity={1} />
      </mesh>
      <mesh position={[0.32, 1.15, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4]} />
        <meshStandardMaterial color="#B7FF3C" emissive="#B7FF3C" emissiveIntensity={1} />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.35, 0.25, 0.65, 16]} />
        <meshStandardMaterial
          color="#09090B"
          metalness={0.95}
          roughness={0.25}
        />
      </mesh>

      {/* Arc Reactor Core */}
      <mesh ref={coreRef} position={[0, 0.18, 0.3]}>
        <sphereGeometry args={[0.13, 16, 16]} />
        <meshStandardMaterial
          color="#000000"
          emissive="#B7FF3C"
          emissiveIntensity={2.0}
        />
      </mesh>

      {/* Floating Cyber Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.28, 0]}>
        <torusGeometry args={[0.45, 0.025, 16, 64]} />
        <meshStandardMaterial
          color="#B7FF3C"
          emissive="#B7FF3C"
          emissiveIntensity={isSuccess ? 3 : 1}
        />
      </mesh>

      {/* Thruster exhaust glow */}
      <mesh position={[0, -0.45, 0]}>
        <coneGeometry args={[0.15, 0.35, 16]} />
        <meshBasicMaterial
          color={isExecuting ? '#00F0FF' : '#B7FF3C'}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
};

// Interactive Data Nodes on Cyber Grid
const DataNodes: React.FC<{
  targetNodes: number;
  clearedNodes: number;
  isExecuting: boolean;
  isSuccess: boolean;
}> = ({ targetNodes, clearedNodes, isExecuting, isSuccess }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.4;
  });

  const nodePositions = useMemo(() => {
    const coords: [number, number, number][] = [];
    const radius = 2.4;
    for (let i = 0; i < targetNodes; i++) {
      const angle = (i / targetNodes) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = Math.sin(i * 1.5) * 0.4;
      coords.push([x, y, z]);
    }
    return coords;
  }, [targetNodes]);

  return (
    <group ref={groupRef}>
      {nodePositions.map((pos, idx) => {
        const isUnlocked = isSuccess || idx < clearedNodes;
        return (
          <Float key={idx} speed={2} rotationIntensity={1.5} floatIntensity={1}>
            <mesh position={pos}>
              <octahedronGeometry args={[0.24, 0]} />
              <meshStandardMaterial
                color={isUnlocked ? '#B7FF3C' : isExecuting ? '#00F0FF' : '#27272A'}
                emissive={isUnlocked ? '#B7FF3C' : isExecuting ? '#00F0FF' : '#18181B'}
                emissiveIntensity={isUnlocked ? 3.0 : isExecuting ? 2.0 : 0.2}
                wireframe={!isUnlocked}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
};

// Laser Burst when executing code
const LaserBeam: React.FC<{ active: boolean }> = ({ active }) => {
  const beamRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!beamRef.current) return;
    const t = state.clock.getElapsedTime();
    beamRef.current.rotation.z = t * 10;
  });

  if (!active) return null;

  return (
    <group position={[0, 0.18, 0]}>
      <mesh ref={beamRef} rotation={[0, 0, Math.PI / 4]}>
        <cylinderGeometry args={[0.04, 0.04, 4.8, 16]} />
        <meshBasicMaterial color="#00F0FF" transparent opacity={0.85} />
      </mesh>
      <pointLight color="#00F0FF" intensity={3} distance={5} />
    </group>
  );
};

// Celebration Confetti Particles on Success
const VictoryParticles: React.FC<{ active: boolean }> = ({ active }) => {
  const count = 120;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const lime = new THREE.Color('#B7FF3C');
    const cyan = new THREE.Color('#00F0FF');
    const gold = new THREE.Color('#FACC15');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 4;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;

      const choice = Math.random();
      const c = choice > 0.6 ? lime : choice > 0.3 ? cyan : gold;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (!pointsRef.current || !active) return;
    pointsRef.current.rotation.y += delta * 1.5;
    pointsRef.current.rotation.x += delta * 0.8;
  });

  if (!active) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export const Arcade3DViewport: React.FC<Arcade3DViewportProps> = ({
  levelTitle,
  difficulty,
  targetNodes,
  clearedNodes,
  isExecuting,
  isSuccess,
  hasError,
  actionName
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      data-lenis-prevent="true"
      className="relative w-full h-[380px] sm:h-[440px] lg:h-full min-h-[380px] bg-gradient-to-b from-[#0A0D14] via-[#05070B] to-[#020305] rounded-2xl border border-brand-border/80 overflow-hidden flex flex-col justify-between shadow-2xl overscroll-contain"
    >
      {/* Cyber Grid background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent pointer-events-none" />

      {/* Top HUD Overlay */}
      <div className="relative z-10 p-3.5 bg-surface-2/80 backdrop-blur-md border-b border-brand-border/60 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white">
            SIMULATION VIEWPORT
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-accent/15 text-accent border border-accent/30">
            {difficulty}
          </span>
        </div>

        <div className="flex items-center gap-3 text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-brand-muted">
            <Shield size={12} className="text-cyan-400" />
            <span>NODES:</span>
            <span className="text-accent font-bold">
              {isSuccess ? targetNodes : clearedNodes} / {targetNodes}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-brand-muted">
            <Zap size={12} className="text-amber-400" />
            <span>CORE:</span>
            <span className="text-emerald-400 font-bold">100% NOMINAL</span>
          </div>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div className="relative flex-1 w-full h-full flex items-center justify-center">
        {mounted ? (
          <Canvas
            camera={{ position: [0, 0.4, 4.6], fov: 46 }}
            gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
            dpr={[1, 2]}
            className="w-full h-full cursor-grab active:cursor-grabbing"
          >
            <ambientLight intensity={0.7} />
            <pointLight position={[5, 6, 5]} intensity={1.5} color="#00F0FF" />
            <pointLight position={[-5, -4, -3]} intensity={1.2} color="#B7FF3C" />
            <directionalLight position={[0, 8, 2]} intensity={1.0} />

            {/* Ground grid lines */}
            <gridHelper args={[20, 20, '#00F0FF', '#18181B']} position={[0, -1.8, 0]} />

            <CyberBot
              isExecuting={isExecuting}
              isSuccess={isSuccess}
              hasError={hasError}
            />

            <DataNodes
              targetNodes={targetNodes}
              clearedNodes={clearedNodes}
              isExecuting={isExecuting}
              isSuccess={isSuccess}
            />

            <LaserBeam active={isExecuting} />
            <VictoryParticles active={isSuccess} />
          </Canvas>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-accent/40 border-t-accent animate-spin" />
          </div>
        )}

        {/* Real-time State Banner over canvas */}
        {isSuccess && (
          <div className="absolute inset-x-6 top-6 mx-auto max-w-sm p-3 rounded-xl bg-accent text-black font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(183,255,60,0.6)] animate-bounce z-20">
            <CheckCircle2 size={16} />
            <span>LEVEL SOLVED: ALL DATA NODES OVERRIDDEN!</span>
          </div>
        )}

        {hasError && (
          <div className="absolute inset-x-6 top-6 mx-auto max-w-sm p-3 rounded-xl bg-red-500/90 text-white font-mono font-bold text-xs flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(239,68,68,0.5)] z-20 animate-shake">
            <AlertTriangle size={16} />
            <span>COMPILATION FAILED • REVISE LOGIC</span>
          </div>
        )}
      </div>

      {/* Bottom Objective Status Bar */}
      <div className="relative z-10 p-3 bg-surface-2/90 border-t border-brand-border/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2 text-brand-secondary">
          <Sparkles size={13} className="text-accent" />
          <span className="text-white font-bold">{actionName}</span>
        </div>

        <div className="text-[11px] text-brand-muted flex items-center gap-2">
          <span>STATUS:</span>
          <span
            className={`font-bold ${
              isSuccess
                ? 'text-accent'
                : hasError
                ? 'text-red-400'
                : isExecuting
                ? 'text-cyan-400 animate-pulse'
                : 'text-brand-secondary'
            }`}
          >
            {isSuccess
              ? 'SECTOR CLEARED (+XP HARVESTED)'
              : hasError
              ? 'SYNTAX FAULT DETECTED'
              : isExecuting
              ? 'FIRING DECRYPTION ARRAY...'
              : 'WAITING FOR SCRIPT INJECTION'}
          </span>
        </div>
      </div>
    </div>
  );
};
