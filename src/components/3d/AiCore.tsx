import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';

interface NodeData {
  text: string;
  radius: number;
  speed: number;
  initialAngle: number;
  yOffset: number;
}

const NODES: NodeData[] = [
  { text: 'WEBSITE', radius: 2.0, speed: 0.35, initialAngle: 0, yOffset: 0.15 },
  { text: 'AI AGENT', radius: 2.0, speed: 0.35, initialAngle: (Math.PI * 1) / 3, yOffset: -0.25 },
  { text: 'VOICE AI', radius: 2.0, speed: 0.35, initialAngle: (Math.PI * 2) / 3, yOffset: 0.3 },
  { text: 'AUTOMATION', radius: 2.0, speed: 0.35, initialAngle: Math.PI, yOffset: -0.2 },
  { text: 'SEO & GEO', radius: 2.0, speed: 0.35, initialAngle: (Math.PI * 4) / 3, yOffset: 0.25 },
  { text: 'CONTENT', radius: 2.0, speed: 0.35, initialAngle: (Math.PI * 5) / 3, yOffset: -0.3 },
];

export const AiCore: React.FC = () => {
  const { viewport } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const centralMeshRef = useRef<THREE.Mesh>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const nodesGroupRef = useRef<THREE.Group>(null);

  // Dynamic scale ensuring system is never clipped on narrow aspect ratios
  const baseScale = Math.min(1.05, Math.max(0.65, viewport.width / 5.2));

  // Generate particle cloud
  const particleCount = 180;
  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const accentColor = new THREE.Color('#B7FF3C');
    const whiteColor = new THREE.Color('#ffffff');

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 0.9 + Math.random() * 1.8;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const mixed = Math.random() > 0.4 ? accentColor : whiteColor;
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Mouse parallax tracking
    if (groupRef.current) {
      const targetRotationX = (state.pointer.y * Math.PI) / 8;
      const targetRotationY = (state.pointer.x * Math.PI) / 8;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
    }

    // Rotate core elements
    if (centralMeshRef.current) {
      centralMeshRef.current.rotation.x += delta * 0.25;
      centralMeshRef.current.rotation.y += delta * 0.35;
    }

    if (innerSphereRef.current) {
      const scale = 1 + Math.sin(time * 2.5) * 0.06;
      innerSphereRef.current.scale.set(scale, scale, scale);
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z += delta * 0.2;
      ring1Ref.current.rotation.x += delta * 0.1;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y -= delta * 0.25;
      ring2Ref.current.rotation.z -= delta * 0.15;
    }

    // Orbit nodes
    if (nodesGroupRef.current) {
      nodesGroupRef.current.children.forEach((child, index) => {
        const node = NODES[index];
        if (node) {
          const currentAngle = node.initialAngle + time * (node.speed * 0.3);
          const x = Math.cos(currentAngle) * node.radius;
          const z = Math.sin(currentAngle) * node.radius;
          const y = node.yOffset + Math.sin(time * 1.5 + index) * 0.2;
          child.position.set(x, y, z);
        }
      });
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={[baseScale, baseScale, baseScale]}>
        {/* Central Wireframe Icosahedron */}
        <mesh ref={centralMeshRef}>
          <icosahedronGeometry args={[0.85, 2]} />
          <meshStandardMaterial
            color="#B7FF3C"
            wireframe
            emissive="#B7FF3C"
            emissiveIntensity={0.6}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Inner Solid Pulsing Core */}
        <mesh ref={innerSphereRef}>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#B7FF3C"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Orbital Ring 1 */}
        <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.35, 0.012, 16, 100]} />
          <meshBasicMaterial color="#B7FF3C" transparent opacity={0.45} />
        </mesh>

        {/* Orbital Ring 2 */}
        <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
          <torusGeometry args={[1.85, 0.01, 16, 100]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
        </mesh>

        {/* Particle Cloud */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={particleCount}
              array={positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={particleCount}
              array={colors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.04}
            vertexColors
            transparent
            opacity={0.7}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* Orbiting System Nodes */}
        <group ref={nodesGroupRef}>
          {NODES.map((node) => (
            <group key={node.text}>
              {/* Glowing anchor point */}
              <mesh>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshBasicMaterial color="#B7FF3C" />
              </mesh>
              {/* HTML Badge */}
              <Html distanceFactor={8} position={[0, 0.25, 0]} center>
                <div className="select-none pointer-events-none whitespace-nowrap px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-surface-1/90 text-accent border border-accent/40 shadow-[0_0_12px_rgba(183,255,60,0.3)] backdrop-blur-md">
                  {node.text}
                </div>
              </Html>
            </group>
          ))}
        </group>
      </group>
    </Float>
  );
};
