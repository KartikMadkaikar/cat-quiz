import React, { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CatEyes = ({ isAngry = false }) => {
    const [isBlinking, setIsBlinking] = useState(false);
    const containerRef = useRef(null);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 22, stiffness: 160 };
    const pupilX = useSpring(mouseX, springConfig);
    const pupilY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const dx = (e.clientX - centerX) / (window.innerWidth / 2);
            const dy = (e.clientY - centerY) / (window.innerHeight / 2);
            mouseX.set(dx * 8);
            mouseY.set(dy * 6);
        };

        window.addEventListener('mousemove', handleMouseMove);

        const blinkInterval = setInterval(() => {
            if (Math.random() > 0.7) {
                setIsBlinking(true);
                setTimeout(() => setIsBlinking(false), 150);
            }
        }, 3000);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            clearInterval(blinkInterval);
        };
    }, [mouseX, mouseY]);

    return (
        <div ref={containerRef} className="flex gap-10 mt-[-20px]">
            <Eye pupilX={pupilX} pupilY={pupilY} isBlinking={isBlinking} isAngry={isAngry} side="left" />
            <Eye pupilX={pupilX} pupilY={pupilY} isBlinking={isBlinking} isAngry={isAngry} side="right" />
        </div>
    );
};

const Eye = ({ pupilX, pupilY, isBlinking, isAngry, side }) => {
    // The key insight: use clip-path on the eyelid shape rather than
    // trying to rotate overlapping rectangles (which caused the 'X' shape).
    // The eyelid is a trapezoid that slides DOWN from above, covering the top portion.
    const lidClipPath = isAngry
        ? side === 'left'
            ? 'polygon(0% 0%, 100% 0%, 100% 55%, 0% 25%)' // Left eye: drops more on inner (right) side
            : 'polygon(0% 0%, 100% 0%, 100% 25%, 0% 55%)' // Right eye: drops more on inner (left) side
        : 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)'; // Hidden above eye

    return (
        <div
            className="relative rounded-[50%] overflow-hidden shadow-inner flex items-center justify-center"
            style={{
                width: '64px',
                height: '48px',
                backgroundColor: '#4ade80', // green-400
                border: '2px solid rgba(0,0,0,0.12)',
            }}
        >
            {/* ── Pupil ── */}
            <motion.div
                style={{ x: pupilX, y: pupilY }}
                animate={{
                    width: isAngry ? '5px' : '16px',
                    height: isAngry ? '40px' : '28px',
                    borderRadius: isAngry ? '2px' : '9999px',
                    backgroundColor: '#0a0a0a',
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 22 }}
            />

            {/* ── Blink eyelid (slides from top, covers all) ── */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: isBlinking ? '100%' : '0%' }}
                transition={{ duration: 0.1 }}
                className="absolute top-0 left-0 w-full bg-[#1c1c1c] z-20 rounded-t-[50%]"
            />

            {/* ── Angry upper eyelid (clip-path trapezoid) ── Each eye gets its own directional droop ── */}
            <motion.div
                animate={{ clipPath: lidClipPath }}
                transition={{ type: 'spring', stiffness: 180, damping: 22 }}
                className="absolute top-0 left-0 w-full h-full bg-[#1c1c1c] z-10"
            />
        </div>
    );
};

export default CatEyes;
