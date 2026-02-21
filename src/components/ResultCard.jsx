import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PersonalityIcon } from './PersonalityIcons';

const personalityColors = {
    chaos: { from: '#f97316', to: '#ef4444', text: 'white' },
    princess: { from: '#e879f9', to: '#a855f7', text: 'white' },
    sleep: { from: '#6366f1', to: '#8b5cf6', text: 'white' },
    zoomie: { from: '#eab308', to: '#f97316', text: 'white' },
    intellectual: { from: '#0ea5e9', to: '#6366f1', text: 'white' },
    drama: { from: '#f43f5e', to: '#e11d48', text: 'white' },
    social: { from: '#10b981', to: '#059669', text: 'white' },
};

const ResultCard = ({ result, onRestart }) => {
    const colors = personalityColors[result.trait] || personalityColors.chaos;
    const matchPercent = useRef(Math.floor(Math.random() * 15 + 83)).current;
    const [imageError, setImageError] = useState(false);

    return (
        <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 160, damping: 22 }}
            className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_30px_80px_rgba(0,0,0,0.18)] overflow-hidden"
            style={{ border: `6px solid ${colors.from}33` }}
        >
            {/* ── HERO SECTION ─────────────────────────────────── */}
            <div
                className="relative overflow-hidden text-center"
                style={{ background: `linear-gradient(145deg, ${colors.from}, ${colors.to})` }}
            >
                {/* Decorative radial shine */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,255,255,0.2) 0%, transparent 65%)' }} />

                {/* Personality Image — full-bleed, naturally merged, no card border */}
                <motion.div
                    initial={{ y: 30, opacity: 0, scale: 1.05 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25, type: 'spring', stiffness: 140, damping: 20 }}
                    className="relative mx-auto mt-10 mb-4"
                    style={{ width: '280px', height: '280px' }}
                >
                    {result.image && !imageError ? (
                        <div className="relative w-full h-full flex items-center justify-center">
                            {/* White circle backing — checkered bg merges into white */}
                            <div className="absolute inset-2 rounded-3xl bg-white shadow-xl" />
                            {/* Soft outer glow */}
                            <div
                                className="absolute inset-[-12px] rounded-full blur-2xl opacity-25"
                                style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }}
                            />
                            {/* The image — no blend mode, fully visible */}
                            <img
                                src={result.image}
                                alt={result.name}
                                onError={() => setImageError(true)}
                                className="w-full h-full object-contain relative z-10 p-1"
                                style={{
                                    filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.2))',
                                }}
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-white/20 rounded-full">
                            <div className="w-32 h-32">
                                <PersonalityIcon type={result.trait} />
                            </div>
                        </div>
                    )}
                </motion.div>

                {/* Label, Name, Match */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="px-8 pb-10 text-white"
                >
                    <p className="text-xs font-black uppercase tracking-[0.25em] opacity-75 mb-1">You are a:</p>
                    <h2 className="text-3xl md:text-4xl font-black leading-tight mb-3">
                        {result.name}
                    </h2>
                    <div
                        className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-bold"
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)' }}
                    >
                        <span className="text-yellow-200">✦</span>
                        {matchPercent}% Match Accuracy
                    </div>
                </motion.div>

                {/* Wavy bottom divider */}
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none" style={{ height: '32px' }}>
                    <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-full" fill="white">
                        <path d="M0,40 C300,90 900,-10 1200,40 L1200,80 L0,80 Z" />
                    </svg>
                </div>
            </div>

            {/* ── BODY SECTION ─────────────────────────────────── */}
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="px-8 pb-8 pt-2 text-center"
            >
                <p className="text-lg text-slate-700 font-medium leading-relaxed mb-6">
                    "{result.description}"
                </p>

                {/* Catchphrase pill */}
                <div
                    className="rounded-2xl p-5 mb-8 text-left"
                    style={{ background: `${colors.from}12`, borderLeft: `4px solid ${colors.from}` }}
                >
                    <span className="block text-[11px] font-black uppercase tracking-widest mb-1.5" style={{ color: colors.from }}>
                        Signature Catchphrase
                    </span>
                    <p className="text-lg font-bold text-slate-800 italic">"{result.catchphrase}"</p>
                </div>

                {/* Vibe badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-slate-600 font-semibold text-sm mb-8">
                    <span>🐾</span> Vibe: {result.vibe}
                </div>

                {/* Action buttons */}
                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={onRestart}
                        className="w-full sm:w-64 py-4 rounded-2xl font-black text-lg text-white shadow-lg transition-all"
                        style={{ background: `linear-gradient(135deg, ${colors.from}, ${colors.to})`, boxShadow: `0 8px 24px ${colors.from}55` }}
                    >
                        Try Again
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ResultCard;
