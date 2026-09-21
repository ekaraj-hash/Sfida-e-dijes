import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles, User, Play } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { IslamicPattern } from './IslamicPattern';
import { sound } from '../utils/audio';

const AVATARS = ['🕌', '👳', '🧕', '⭐', '🌟', '🌙', '📖', '🕊️'];

interface WelcomeScreenProps {
  onStart?: () => void;
  onStartGame?: () => void;
  onOpenCategories?: () => void;
  onOpenOnline?: () => void;
  onOpenSettings?: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ 
  onStart, 
  onStartGame,
  onOpenCategories,
  onOpenOnline,
  onOpenSettings
}) => {
  const { profile, updateProfile } = useGame();
  const [name, setName] = useState(profile.name || 'Besimtari');
  const [selectedAvatar, setSelectedAvatar] = useState(profile.avatar || '🕌');

  const handleStart = () => {
    sound.playClick();
    updateProfile({
      name: name.trim() || 'Besimtari',
      avatar: selectedAvatar
    });
    if (onStartGame) onStartGame();
    else if (onStart) onStart();
  };

  return (
    <div className="relative min-h-[580px] h-full flex flex-col justify-between bg-gradient-to-b from-slate-950 via-emerald-950/80 to-slate-950 text-slate-100 p-6 overflow-hidden">
      <IslamicPattern opacity={0.08} />

      {/* Top Graphic Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 text-center pt-4"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 mb-3 shadow-lg shadow-emerald-950">
          <BookOpen className="w-8 h-8 text-emerald-400" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          Mirë se vjen në Sfida e Dijes!
        </h1>
        <p className="text-sm text-emerald-300/90 font-medium mt-1">
          Luaj, mëso dhe sfido dijen tënde!
        </p>
      </motion.div>

      {/* Profile Setup Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 bg-slate-900/90 border border-emerald-900/50 rounded-2xl p-5 shadow-xl backdrop-blur-sm my-4"
      >
        <div className="mb-4">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-emerald-400" />
            Emri yt i lojtarit
          </label>
          <input
            type="text"
            id="input-player-name"
            value={name}
            maxLength={20}
            onChange={(e) => setName(e.target.value)}
            placeholder="Shkruaj emrin tënd..."
            className="w-full bg-slate-950 border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Zgjidh ikonën tënde
          </label>
          <div className="grid grid-cols-4 gap-2">
            {AVATARS.map((av) => (
              <button
                key={av}
                type="button"
                id={`avatar-choice-${av}`}
                onClick={() => {
                  sound.playClick();
                  setSelectedAvatar(av);
                }}
                className={`h-11 rounded-xl flex items-center justify-center text-xl transition-all ${
                  selectedAvatar === av
                    ? 'bg-emerald-600 border-2 border-emerald-300 scale-105 shadow-md shadow-emerald-700/50'
                    : 'bg-slate-800/80 border border-slate-700/60 hover:bg-slate-700/80 text-slate-200'
                }`}
              >
                {av}
              </button>
            ))}
          </div>
        </div>

        {/* Feature quick badges */}
        <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-around text-center">
          <div className="flex flex-col items-center">
            <span className="text-base font-bold text-amber-400">500+</span>
            <span className="text-[10px] text-slate-400 font-medium">Pyetje Islame</span>
          </div>
          <div className="w-[1px] h-6 bg-slate-800" />
          <div className="flex flex-col items-center">
            <span className="text-base font-bold text-emerald-400">5 Nivele</span>
            <span className="text-[10px] text-slate-400 font-medium">Me Medalje</span>
          </div>
          <div className="w-[1px] h-6 bg-slate-800" />
          <div className="flex flex-col items-center">
            <span className="text-base font-bold text-sky-400">Live 1v1</span>
            <span className="text-[10px] text-slate-400 font-medium">Sfida Online</span>
          </div>
        </div>
      </motion.div>

      {/* Start Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 pb-2"
      >
        <button
          onClick={handleStart}
          id="btn-start-game"
          className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 p-[1px] shadow-lg shadow-emerald-700/40 active:scale-[0.98] transition-transform"
        >
          <div className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 py-3.5 px-6 rounded-2xl font-bold text-base text-white tracking-wide">
            <Play className="w-5 h-5 fill-white" />
            <span>Fillo Lojën</span>
            <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
          </div>
        </button>
      </motion.div>
    </div>
  );
};
