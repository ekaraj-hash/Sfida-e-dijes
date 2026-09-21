import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Swords, GraduationCap, X, Zap } from 'lucide-react';
import { sound } from '../utils/audio';

interface GameCountdownModalProps {
  isOpen: boolean;
  mode: 'classic' | 'online' | 'structured' | null;
  onStart: () => void;
  onCancel: () => void;
}

type CountdownStep = 3 | 2 | 1 | 'go';

export const GameCountdownModal: React.FC<GameCountdownModalProps> = ({
  isOpen,
  mode,
  onStart,
  onCancel
}) => {
  const [step, setStep] = useState<CountdownStep>(3);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    // Clear any existing timers
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    if (!isOpen) {
      setStep(3);
      return;
    }

    // Step 3 starts immediately
    setStep(3);
    sound.playTimerTick();

    // Step 2 at exactly 1000ms
    const t2 = setTimeout(() => {
      setStep(2);
      sound.playTimerTick();
    }, 1000);

    // Step 1 at exactly 2000ms (will stay for a full 1000ms until 3000ms)
    const t1 = setTimeout(() => {
      setStep(1);
      sound.playTimerTick();
    }, 2000);

    // Step 'go' at exactly 3000ms
    const tGo = setTimeout(() => {
      setStep('go');
      sound.playClick();
    }, 3000);

    // Trigger game launch after 'go' is clearly shown (at 3800ms)
    const tStart = setTimeout(() => {
      onStart();
    }, 3800);

    timeoutsRef.current = [t2, t1, tGo, tStart];

    return () => {
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
    };
  }, [isOpen, onStart]);

  if (!isOpen || !mode) return null;

  const modeInfo = {
    classic: {
      title: 'Klasike',
      desc: '10 pyetje • 5 jetë për nivel',
      border: 'border-emerald-500/50',
      badgeBg: 'bg-emerald-950/90 text-emerald-300 border-emerald-600/50',
      icon: <Play className="w-4 h-4 text-amber-300 fill-amber-300" />
    },
    online: {
      title: 'Live 1 vs 1',
      desc: 'Duel në kohë reale kundër lojtarëve të tjerë',
      border: 'border-indigo-500/50',
      badgeBg: 'bg-indigo-950/90 text-indigo-300 border-indigo-600/50',
      icon: <Swords className="w-4 h-4 text-indigo-300" />
    },
    structured: {
      title: 'Islami me pyetje',
      desc: 'Pyetje tematike të strukturuara',
      border: 'border-teal-500/50',
      badgeBg: 'bg-teal-950/90 text-teal-300 border-teal-600/50',
      icon: <GraduationCap className="w-4 h-4 text-teal-300" />
    }
  }[mode];

  return (
    <div 
      id="modal-game-countdown"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onCancel();
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={`relative w-full max-w-sm bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 ${modeInfo.border} rounded-3xl p-6 sm:p-7 text-center shadow-2xl shadow-black/80 overflow-hidden`}
      >
        {/* Top-right Cancel Button */}
        <button
          onClick={() => {
            sound.playClick();
            onCancel();
          }}
          id="btn-cancel-countdown"
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-20 cursor-pointer"
          title="Anulo"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient Glow */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 w-48 h-48 bg-emerald-500/20 blur-3xl rounded-full pointer-events-none" />

        {/* Selected Mode Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-black uppercase tracking-wider mb-3 shadow-sm z-10 relative">
          <span className={`px-2.5 py-0.5 rounded-full border ${modeInfo.badgeBg} flex items-center gap-1.5`}>
            {modeInfo.icon}
            {modeInfo.title}
          </span>
        </div>

        {/* Main Prompts Requested by User */}
        <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-1">
          Gati?
        </h2>

        <p className="text-sm font-bold text-slate-300 mb-4">
          Loja nis për
        </p>

        {/* Step Progress Indicators */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {[3, 2, 1].map((n) => (
            <div
              key={n}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === n
                  ? 'w-8 bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                  : (typeof step === 'number' && step < n) || step === 'go'
                    ? 'w-3.5 bg-emerald-500/70'
                    : 'w-3.5 bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Crisp Countdown Display Container (Fixed size, stable) */}
        <div className="relative h-32 flex items-center justify-center mb-6">
          <AnimatePresence mode="popLayout">
            {step !== 'go' ? (
              <motion.div
                key={step}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.15, opacity: 0 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="relative flex items-center justify-center"
              >
                {/* Visual Circle Frame */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-b from-amber-400 to-amber-600 p-1 shadow-[0_0_25px_rgba(245,158,11,0.4)] flex items-center justify-center">
                  <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center border-2 border-amber-300/30">
                    <span className="text-6xl font-black text-amber-300 drop-shadow-[0_2px_8px_rgba(245,158,11,0.7)] leading-none select-none">
                      {step}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="go"
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.1, opacity: 0 }}
                transition={{ type: 'spring', damping: 18, stiffness: 300 }}
                className="flex flex-col items-center justify-center gap-2"
              >
                <div className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 text-white font-black text-2xl tracking-wide shadow-[0_0_30px_rgba(16,185,129,0.7)] border border-emerald-300/40 flex items-center gap-2">
                  <Zap className="w-6 h-6 fill-amber-300 text-amber-300 animate-bounce" />
                  <span>Fillo!</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom Cancel Button */}
        <button
          onClick={() => {
            sound.playClick();
            onCancel();
          }}
          id="btn-cancel-countdown-bottom"
          className="w-full py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-xs font-extrabold text-slate-300 hover:text-white transition-all cursor-pointer"
        >
          Anulo
        </button>
      </motion.div>
    </div>
  );
};
