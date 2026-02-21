import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CatBase from './components/CatBase';
import CatEyes from './components/CatEyes';
import ExitPopup from './components/ExitPopup';
import QuestionCard from './components/QuestionCard';
import ThinkingScreen from './components/ThinkingScreen';
import ResultCard from './components/ResultCard';
import { quizQuestions } from './data/questions';
import { personalities } from './data/personalities';

function App() {
  const [screen, setScreen] = useState('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({
    chaos: 0, princess: 0, sleep: 0, zoomie: 0, intellectual: 0, drama: 0, social: 0
  });
  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);
  const [isCatAngry, setIsCatAngry] = useState(false);

  const meowAudio = React.useRef(new Audio('./sounds/meow.mp3'));
  const hissAudio = React.useRef(new Audio('./sounds/hiss.mp3'));

  const playMeow = () => {
    meowAudio.current.currentTime = 0;
    meowAudio.current.volume = 0.4;
    meowAudio.current.play().catch(() => { });
  };

  const playHiss = () => {
    hissAudio.current.currentTime = 0;
    hissAudio.current.volume = 0.4;
    hissAudio.current.play().catch(() => { });
  };

  const stopAudio = () => {
    meowAudio.current.pause();
    meowAudio.current.currentTime = 0;
    hissAudio.current.pause();
    hissAudio.current.currentTime = 0;
  };

  const handleStartQuiz = () => setScreen('quiz');

  const handleAnswer = (option) => {
    setScores(prev => ({ ...prev, [option.trait]: prev[option.trait] + option.points }));
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setScreen('thinking');
      setTimeout(() => setScreen('result'), 3000);
    }
  };

  const calculateResult = () => {
    let maxTrait = 'chaos', maxScore = -1;
    for (const [trait, score] of Object.entries(scores)) {
      if (score > maxScore) { maxScore = score; maxTrait = trait; }
    }
    return { ...personalities[maxTrait], trait: maxTrait };
  };

  const handleRestart = () => {
    setScreen('intro');
    setCurrentQuestionIndex(0);
    setScores({ chaos: 0, princess: 0, sleep: 0, zoomie: 0, intellectual: 0, drama: 0, social: 0 });
  };

  return (
    <div className="min-h-screen paw-bg text-slate-900 selection:bg-emerald-200">
      <AnimatePresence mode="wait">

        {/* ─── INTRO SCREEN ────────────────────────────────────────────── */}
        {screen === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center min-h-screen p-6 relative overflow-hidden"
          >
            {/* Decorative blobs */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-200/40 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-300/30 rounded-full blur-3xl pointer-events-none" />

            {/* Title */}
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="text-center mb-10"
            >
              <p className="text-emerald-600 font-bold text-lg tracking-[0.3em] uppercase mb-2">The Council of Cats presents</p>
              <h1 className="text-6xl md:text-8xl font-black text-emerald-900 tracking-tighter leading-none">
                CAT QUIZ
              </h1>
              <p className="text-xl font-semibold text-emerald-700 italic mt-3 opacity-80">
                "Hmm… interesting personality."
              </p>
            </motion.div>

            {/* Cat */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.15 }}
              className="relative mb-12"
            >
              <div
                onMouseEnter={playMeow}
                onMouseLeave={stopAudio}
                className="cursor-pointer float-up"
              >
                {/* Subtle shadow under cat */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-48 h-8 bg-black/10 rounded-full blur-xl" />
                <CatBase isAngry={isCatAngry}>
                  <CatEyes isAngry={isCatAngry} />
                </CatBase>
              </div>

              {/* Speech bubble for angry state */}
              <AnimatePresence>
                {isCatAngry && (
                  <motion.div
                    key="speech"
                    initial={{ opacity: 0, scale: 0.6, y: 8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.6, y: 8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                    className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white px-5 py-2.5 rounded-2xl shadow-xl border-2 border-red-400 font-bold text-red-600 whitespace-nowrap z-30 text-sm"
                  >
                    "I wouldn't do that if I were you."
                    <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-2 border-b-2 border-red-400 rotate-45" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 160, damping: 20, delay: 0.28 }}
              className="flex flex-col sm:flex-row gap-4 w-full max-w-sm"
            >
              <button
                onClick={handleStartQuiz}
                className="btn-start flex-1 px-8 py-5 text-white rounded-2xl font-black text-xl tracking-wide uppercase"
              >
                Start Quiz ›
              </button>

              <motion.button
                onHoverStart={() => { setIsCatAngry(true); playHiss(); }}
                onHoverEnd={() => { setIsCatAngry(false); stopAudio(); }}
                onClick={() => { setIsExitPopupOpen(true); playHiss(); }}
                className="px-7 py-5 bg-white/80 backdrop-blur-sm text-slate-400 rounded-2xl font-bold text-xl border-2 border-slate-200 hover:text-red-500 hover:border-red-300 hover:bg-red-50/80 transition-all duration-200"
              >
                Exit
              </motion.button>
            </motion.div>

            <ExitPopup
              isOpen={isExitPopupOpen}
              onClose={() => { setIsExitPopupOpen(false); setIsCatAngry(false); }}
            />
          </motion.div>
        )}

        {/* ─── QUIZ SCREEN ─────────────────────────────────────────────── */}
        {screen === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.35 }}
            className="flex items-center justify-center min-h-screen paw-bg p-6"
          >
            <QuestionCard
              question={quizQuestions[currentQuestionIndex]}
              currentNumber={currentQuestionIndex + 1}
              totalQuestions={quizQuestions.length}
              onAnswer={handleAnswer}
            />
          </motion.div>
        )}

        {/* ─── THINKING SCREEN ─────────────────────────────────────────── */}
        {screen === 'thinking' && (
          <motion.div
            key="thinking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center min-h-screen paw-bg p-6"
          >
            <ThinkingScreen />
          </motion.div>
        )}

        {/* ─── RESULT SCREEN ───────────────────────────────────────────── */}
        {screen === 'result' && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center min-h-screen paw-bg p-4 sm:p-6"
          >
            <ResultCard result={calculateResult()} onRestart={handleRestart} />
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

export default App;