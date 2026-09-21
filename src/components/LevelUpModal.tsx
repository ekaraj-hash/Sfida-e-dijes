import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { LevelInfo } from '../types';
import { sound } from '../utils/audio';

interface LevelUpModalProps {
  levelInfo: LevelInfo;
  bonusPoints: number;
  onDismiss: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  levelInfo,
  bonusPoints,
  onDismiss
}) => {
  useEffect(() => {
    sound.playVictory();
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {
      // Ignore
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <motion.div
        initial={{ scale: 0.7, opacity: 0, rotate: -3 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 260 }}
        className="relative bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-950 border-2 border-amber-400/70 rounded-3xl p-6 max-w-sm w-full text-center shadow-2xl shadow-emerald-900/50 overflow-hidden"
      >
        {/* Glow ambient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10">
          <motion.div
            animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 p-[2px] mx-auto mb-4 shadow-xl shadow-amber-500/40 flex items-center justify-center"
          >
            <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-5xl">
              {levelInfo.medalIcon}
            </div>
          </motion.div>

          <span className="text-xs font-black text-amber-400 tracking-widest uppercase block mb-1">
            🎉 NIVEL I RI!
          </span>

          <h3 className="text-2xl font-black text-white tracking-tight mb-1">
            {levelInfo.name.toUpperCase()}
          </h3>

          <p className="text-xs text-slate-300 mb-4">
            {levelInfo.description}
          </p>

          {/* Reward Badge Card */}
          <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-3 mb-5 space-y-1.5">
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-300">
              <span>Fitove medaljen:</span>
              <strong className="text-amber-300 font-bold">{levelInfo.medalName}</strong>
            </div>
            <div className="text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3" />
              <span>+{bonusPoints} pikë bonus niveli!</span>
            </div>
          </div>

          <button
            onClick={() => {
              sound.playClick();
              onDismiss();
            }}
            id="btn-level-up-continue"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 hover:brightness-110 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
          >
            <span>Vazhdo</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
