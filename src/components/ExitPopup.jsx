import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExitPopup = ({ isOpen, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="exit-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(100,0,0,0.97) 0%, rgba(20,0,0,0.99) 100%)',
                        backdropFilter: 'blur(4px)',
                    }}
                >
                    {/* Ambient shaking red particles (pure CSS) */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        {[...Array(12)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full bg-red-500/40"
                                initial={{
                                    x: `${(i * 83) % 100}vw`,
                                    y: `${(i * 67) % 100}vh`,
                                    scale: Math.random() * 1.5 + 0.5,
                                }}
                                animate={{
                                    y: [`${(i * 67) % 100}vh`, `${((i * 67) + 20) % 100}vh`],
                                    opacity: [0.2, 0.7, 0.2],
                                }}
                                transition={{ duration: 2 + (i % 3), repeat: Infinity, repeatType: 'reverse', delay: i * 0.2 }}
                            />
                        ))}
                    </div>

                    {/* Main popup card */}
                    <motion.div
                        initial={{ scale: 0.6, y: 80, rotate: -6 }}
                        animate={{ scale: 1, y: 0, rotate: 0 }}
                        exit={{ scale: 0.5, y: 100, opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                        className="relative w-full max-w-md text-center"
                    >
                        {/* Wanted Poster — styled as a physical, textured poster */}
                        <div
                            className="rounded-[2rem] overflow-hidden"
                            style={{
                                background: 'linear-gradient(160deg, #1a0000, #3b0000)',
                                boxShadow: '0 0 0 3px #7f1d1d, 0 0 0 6px #450a0a, 0 40px 80px rgba(0,0,0,0.8)',
                            }}
                        >
                            {/* Poster header strip */}
                            <div
                                className="py-3 px-6 flex items-center justify-center gap-3"
                                style={{ background: 'linear-gradient(90deg, #7f1d1d, #b91c1c, #7f1d1d)' }}
                            >
                                <span className="text-yellow-400 text-2xl">⚠️</span>
                                <span className="text-yellow-300 font-black text-lg uppercase tracking-[0.2em]">Escape Attempt Detected</span>
                                <span className="text-yellow-400 text-2xl">⚠️</span>
                            </div>

                            {/* Cat image — Wanted Poster style */}
                            <div className="relative flex justify-center pt-8 pb-2 px-8">
                                {/* Faded "WANTED" text watermark behind the image */}
                                <div
                                    className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
                                    style={{ fontSize: '96px', fontWeight: 900, color: 'rgba(255,255,255,0.04)', letterSpacing: '0.1em' }}
                                >
                                    WANTED
                                </div>

                                <motion.div
                                    initial={{ rotate: -8, scale: 0.8 }}
                                    animate={{ rotate: -2, scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 180, damping: 18, delay: 0.2 }}
                                    className="relative"
                                    style={{
                                        background: '#fff8f0',
                                        padding: '8px 8px 36px 8px',
                                        boxShadow: '0 8px 32px rgba(0,0,0,0.7), inset 0 0 0 1px rgba(0,0,0,0.1)',
                                    }}
                                >
                                    <img
                                        src="/images/personalities/AngryCatty.png"
                                        alt="Angry Cat"
                                        className="w-48 h-auto object-contain"
                                        style={{ mixBlendMode: 'multiply' }}
                                    />
                                    {/* Polaroid caption */}
                                    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center h-9">
                                        <span className="font-black text-slate-800 text-sm uppercase tracking-widest">Public Menace #001</span>
                                    </div>
                                    {/* Tape strip */}
                                    <div
                                        className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-7 rotate-1"
                                        style={{ background: 'rgba(255,240,180,0.5)', borderLeft: '1px solid rgba(255,200,0,0.2)', borderRight: '1px solid rgba(255,200,0,0.2)' }}
                                    />
                                </motion.div>
                            </div>

                            {/* Stamp overlay */}
                            <motion.div
                                initial={{ scale: 3, opacity: 0, rotate: -20 }}
                                animate={{ scale: 1, opacity: 1, rotate: -15 }}
                                transition={{ delay: 0.55, type: 'spring', stiffness: 300, damping: 20 }}
                                className="inline-block mb-2 border-4 border-red-500 px-4 py-1 rounded-lg"
                                style={{ color: '#ef4444', fontWeight: 900, fontSize: '20px', letterSpacing: '0.12em', textTransform: 'uppercase', textShadow: '0 0 8px rgba(239,68,68,0.5)' }}
                            >
                                DO NOT RELEASE
                            </motion.div>

                            {/* Headline */}
                            <motion.h2
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-3xl font-black text-white px-8 pb-2 leading-tight"
                                style={{ textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
                            >
                                You can't escape your inner cat.
                            </motion.h2>
                            <p className="text-red-300/90 text-base font-semibold px-10 pb-6 leading-snug">
                                The Council has logged this attempt. Your paws are already on the keyboard.
                            </p>

                            {/* Action buttons */}
                            <div className="flex justify-center px-8 pb-8">
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: '0 0 24px rgba(239,68,68,0.6)' }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onClose}
                                    className="w-full sm:w-64 py-4 rounded-2xl font-black text-lg text-white uppercase tracking-wider"
                                    style={{
                                        background: 'linear-gradient(135deg, #dc2626, #991b1b)',
                                        boxShadow: '0 8px 0 #7f1d1d, 0 0 20px rgba(220,38,38,0.4)',
                                    }}
                                >
                                    😾 Fine, I'll Stay
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ExitPopup;
