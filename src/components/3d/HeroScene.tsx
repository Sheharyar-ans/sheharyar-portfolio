import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { AiCore } from './AiCore';

export const HeroScene: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative w-full h-[420px] sm:h-[480px] md:h-[540px] lg:h-[580px] flex items-center justify-center overflow-visible">
      {/* Background radial glow */}
      <div 
        className="absolute inset-0 pointer-events-none rounded-full blur-3xl opacity-30"
        style={{
          background: 'radial-gradient(circle, rgba(183,255,60,0.2) 0%, rgba(8,8,8,0) 70%)'
        }}
      />

      {mounted ? (
        <Canvas
          camera={{ position: [0, 0, 7.8], fov: 42 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 2]}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#B7FF3C" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff" />
          
          <Suspense fallback={null}>
            <AiCore />
          </Suspense>
        </Canvas>
      ) : (
        <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
          <div className="w-48 h-48 rounded-full border border-accent/20 animate-pulse bg-accent/5" />
        </div>
      )}
    </div>
  );
};
