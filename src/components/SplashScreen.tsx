import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, BookOpen } from 'lucide-react';
import { IslamicPattern } from './IslamicPattern';
import { sound } from '../utils/audio';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    // Play spiritual opening chime
    sound.playSpiritualOpening();

    const timer = setTimeout(() => {
      onFinish();
    }, 2500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="relative min-h-[580px] h-full flex flex-col items-center justify-center bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-950 text-slate-100 px-6 overflow-hidden select-none">
      <IslamicPattern opacity={0.12} />

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center text-center"
      >
        {/* Mbi ikonën dhe emrin: MËSO DUKE LUAJTUR */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-amber-400/20 via-amber-300/30 to-emerald-400/20 border border-amber-300/60 shadow-lg shadow-amber-500/10 mb-4 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span className="text-xs font-black tracking-widest text-amber-200 uppercase font-sans">
            MËSO DUKE LUAJTUR
          </span>
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
        </motion.div>

        {/* Emblem with Spiritual Light Glow */}
        <div className="relative mb-5">
          {/* Subtle pulsating glow halo */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className="absolute inset-0 bg-emerald-400/30 rounded-full blur-xl pointer-events-none"
          />

          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-700 via-teal-500 to-amber-400 p-[2px] shadow-2xl shadow-emerald-600/30 flex items-center justify-center relative z-10">
            <div className="w-full h-full bg-slate-950/90 rounded-[22px] flex items-center justify-center relative overflow-hidden">
              <BookOpen className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 to-transparent pointer-events-none" />
            </div>
          </div>
          <div className="absolute -top-1 -right-1 z-20">
            <Sparkles className="w-6 h-6 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
        </div>

        {/* App Title */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-3xl font-extrabold tracking-tight text-white mb-2 font-serif"
        >
          Sfida e jetes
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-sm font-medium text-emerald-300 max-w-xs leading-relaxed"
        >
          Luaj, mëso dhe sfido dijen tënde!
        </motion.p>
      </motion.div>

      {/* Loading indicator bar */}
      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: '140px' }}
        transition={{ delay: 0.7, duration: 1.2 }}
        className="relative z-10 mt-12 h-1.5 bg-slate-800 rounded-full overflow-hidden"
      >
        <motion.div
          animate={{ x: ['-100%', '100%'] }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
          className="h-full w-1/2 bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"
        />
      </motion.div>
    </div>
  );
};
