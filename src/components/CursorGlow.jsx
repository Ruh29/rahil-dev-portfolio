import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorGlow = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs for cursor movement
    const springConfig = { damping: 25, stiffness: 200 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden"
            style={{
                background: `radial-gradient(circle var(--cursor-size, 300px) at ${smoothX}px ${smoothY}px, var(--accent-glow, rgba(79, 70, 229, 0.15)), transparent 80%)`,
            }}
        />
    );
};

export default CursorGlow;
