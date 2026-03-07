import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const BackgroundCanvas = () => {
  return (
    <div className="fixed inset-0 z-[-1] bg-[#030014] overflow-hidden">
      {/* Dynamic Nebula Layer */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% -20%, var(--accent-glow) 0%, transparent 70%), radial-gradient(circle at 100% 100%, var(--accent-glow) 0%, transparent 60%)',
        }}
      ></div>

      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      </Canvas>
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay pointer-events-none"></div>
    </div>
  );
};

export default BackgroundCanvas;
