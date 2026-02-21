import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LETTER_OPTIONS = ['A', 'B', 'C', 'D', 'E'];

const QuestionCard = ({ question, onAnswer, currentNumber, totalQuestions }) => {
    const progress = (currentNumber / totalQuestions) * 100;

    return (
        <motion.div
            key={currentNumber}
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="w-full max-w-2xl bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-emerald-100"
        >
            {/* Progress Bar */}
            <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                    <span className="px-3 py-1 bg-emerald-500 text-white rounded-full text-xs font-black uppercase tracking-widest">
                        {currentNumber} / {totalQuestions}
                    </span>
                    <span className="text-sm text-slate-400 font-semibold">{Math.round(progress)}% complete</span>
                </div>
                <div className="h-2 w-full bg-emerald-100 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: `${((currentNumber - 1) / totalQuestions) * 100}%` }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: 'linear-gradient(90deg, #059669, #34d399)' }}
                    />
                </div>
            </div>

            {/* Question */}
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-10 leading-snug">
                {question.question}
            </h2>

            {/* Answer Options */}
            <div className="space-y-3">
                {question.options.map((option, index) => (
                    <motion.button
                        key={index}
                        whileHover={{ x: 6, scale: 1.015 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => onAnswer(option)}
                        className="w-full text-left p-5 rounded-2xl border-2 border-slate-100 hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 bg-white group shadow-sm hover:shadow-md"
                    >
                        <div className="flex items-center gap-4">
                            <span className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 font-black text-sm group-hover:bg-emerald-500 group-hover:text-white transition-all duration-200">
                                {LETTER_OPTIONS[index]}
                            </span>
                            <span className="text-base md:text-lg font-bold text-slate-700 group-hover:text-emerald-900 transition-colors">
                                {option.text}
                            </span>
                        </div>
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

export default QuestionCard;
