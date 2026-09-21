import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Award, ArrowRight, X, CheckCircle2 } from 'lucide-react';
import { Medal } from '../types';
import { sound } from '../utils/audio';

interface MedalUnlockModalProps {
  medal: Medal;
  onDismiss: () => void;
}

export const MedalUnlockModal: React.FC<MedalUnlockModalProps> = ({
  medal,
  onDismiss
}) => {
  useEffect(() => {
    sound.playVictory();
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.55 },
        colors: ['#f59e0b', '#fbbf24', '#10b981', '#38bdf8', '#fb7185']
      });
    } catch {
      // Ignore
    }
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          sound.playClick();
          onDismiss();
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.65, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', damping: 22, stiffness: 280 }}
        className="relative bg-gradient-to-b from-slate-900 via-amber-950/35 to-slate-950 border-2 border-amber-400/80 rounded-3xl p-6 sm:p-7 max-w-sm w-full text-center shadow-2xl shadow-amber-500/20 overflow-hidden"
      >
        {/* Top-right close button */}
        <button
          onClick={() => {
            sound.playClick();
            onDismiss();
          }}
          id="btn-close-medal-popup"
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-20"
          title="Mbyll"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Ambient golden glow behind medal */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/25 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10">
          {/* Animated Medal Icon */}
          <motion.div
            animate={{ 
              scale: [1, 1.12, 1],
              rotate: [0, 4, -4, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 3.2, 
              ease: 'easeInOut' 
            }}
            className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 p-[2px] mx-auto mb-3.5 shadow-xl shadow-amber-500/30 flex items-center justify-center"
          >
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-5xl">
              {medal.icon}
            </div>
          </motion.div>

          {/* Badge Eyebrow */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/50 text-amber-300 text-[11px] font-black tracking-wider uppercase mb-2 shadow-xs">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Medalje e Re e Zhbllokuar!
          </span>

          {/* Medal Title */}
          <h3 className="text-2xl font-black text-white tracking-tight mb-1 drop-shadow-sm">
            {medal.name}
          </h3>

          {/* Level / Category Name */}
          <p className="text-xs font-extrabold text-amber-400 mb-3.5">
            {medal.levelName}
          </p>

          {/* Achievement Requirement Box */}
          <div className="bg-slate-950/85 border border-amber-500/30 rounded-2xl p-3.5 mb-5 space-y-2.5 text-left">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-200 font-medium leading-relaxed">
                {medal.requirement}
              </p>
            </div>
            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Koleksioni:</span>
              <span className="font-extrabold text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                U shtua në profilin tënd!
              </span>
            </div>
          </div>

          {/* Continue / Claim Button */}
          <button
            onClick={() => {
              sound.playClick();
              onDismiss();
            }}
            id="btn-medal-unlock-continue"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
          >
            <span>Shkëlqyeshëm!</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
