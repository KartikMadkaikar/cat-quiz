import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
    "Analyzing your vibes...",
    "Consulting the Council of Cats...",
    "Recalculating judgmental index...",
    "Checking 3 AM zoomie potential...",
    "Measuring treat-begging intensity...",
    "Translating meows to personality traits...",
];

const ThinkingScreen = () => {
    const [currentMessage, setCurrentMessage] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentMessage((prev) => (prev + 1) % messages.length);
        }, 900);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-6">
            {/* Big animated cat paw emoji */}
            <motion.div
                animate={{ rotate: [0, -15, 15, -10, 10, 0], scale: [1, 1.15, 1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
                className="text-8xl mb-8 select-none"
            >
                🐾
            </motion.div>

            {/* Bouncing dots */}
            <div className="flex gap-3 mb-10">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        animate={{ y: [0, -14, 0], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
                        className="w-4 h-4 rounded-full bg-emerald-500 shadow-md shadow-emerald-200"
                    />
                ))}
            </div>

            {/* Cycling message */}
            <div className="h-10 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={currentMessage}
                        initial={{ y: 16, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -16, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-xl md:text-2xl font-bold text-emerald-800 italic"
                    >
                        {messages[currentMessage]}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ThinkingScreen;
