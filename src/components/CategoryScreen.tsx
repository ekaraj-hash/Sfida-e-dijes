import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, HeartHandshake, Scale, ScrollText, Landmark, Play, Sparkles, ShieldCheck, Users } from 'lucide-react';
import { CATEGORIES } from '../data/questions';
import { CategoryId } from '../types';
import { useGame } from '../context/GameContext';
import { IslamicPattern } from './IslamicPattern';
import { sound } from '../utils/audio';

interface CategoryScreenProps {
  onSelectCategory: (catId: CategoryId) => void;
}

export const CategoryScreen: React.FC<CategoryScreenProps> = ({ onSelectCategory }) => {
  const { profile } = useGame();

  const getCategoryIcon = (id: CategoryId) => {
    switch (id) {
      case 'kurani':
        return <BookOpen className="w-6 h-6 text-emerald-400" />;
      case 'profeti':
        return <HeartHandshake className="w-6 h-6 text-sky-400" />;
      case 'fikhu':
        return <Scale className="w-6 h-6 text-amber-400" />;
      case 'hadithi':
        return <ScrollText className="w-6 h-6 text-violet-400" />;
      case 'historia':
        return <Landmark className="w-6 h-6 text-rose-400" />;
      case 'akaidi':
        return <ShieldCheck className="w-6 h-6 text-teal-400" />;
      case 'profetet':
        return <Users className="w-6 h-6 text-amber-500" />;
      default:
        return <BookOpen className="w-6 h-6 text-emerald-400" />;
    }
  };

  const handleSelect = (catId: CategoryId) => {
    sound.playClick();
    onSelectCategory(catId);
  };

  return (
    <div className="relative min-h-[580px] h-full p-4 bg-slate-950 text-slate-100 overflow-y-auto">
      <IslamicPattern opacity={0.05} />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Kategoritë Kryesore
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Zgjidh fushën ku dëshiron të thellosh njohuritë e tua
            </p>
          </div>
        </div>

        {/* 5 Large Category Cards */}
        <div className="space-y-3">
          {CATEGORIES.map((cat, idx) => {
            const completedCount = profile.completedCategories[cat.id] || 0;
            const progressPercent = Math.min(100, Math.round((completedCount / cat.totalQuestions) * 100));

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08 }}
                onClick={() => handleSelect(cat.id)}
                id={`card-category-${cat.id}`}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800/80 border-b-[4px] border-b-slate-950 shadow-[0_4px_0_#090d16] hover:border-emerald-700/60 hover:brightness-105 active:translate-y-1 active:shadow-none active:border-b transition-all p-4"
              >
                {/* Subtle side glow */}
                <div 
                  className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full blur-2xl opacity-15 pointer-events-none" 
                  style={{ backgroundColor: cat.color }} 
                />

                <div className="flex items-start justify-between gap-3 relative z-10">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 border-b-[3px] border-b-black flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                      {getCategoryIcon(cat.id)}
                    </div>
                    <div>
                      <h3 className="text-base font-extrabold text-white tracking-wide group-hover:text-emerald-300 transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1 max-w-[210px]">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="w-9 h-9 rounded-xl bg-gradient-to-b from-emerald-800 to-emerald-950 border border-emerald-500/50 border-b-[3px] border-b-emerald-950 shadow-[0_2px_0_#022c22] flex items-center justify-center text-emerald-300 group-hover:brightness-110 transition-all">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-emerald-200" />
                  </div>
                </div>

                {/* Progress bar and details */}
                <div className="mt-3.5 pt-3 border-t border-slate-800/80 flex flex-col gap-1.5 relative z-10">
                  <div className="flex items-center justify-between text-[11px] font-semibold">
                    <span className="text-slate-400">
                      Të përfunduara: <strong className="text-slate-200">{completedCount}</strong> / {cat.totalQuestions}
                    </span>
                    <span className="text-emerald-400 font-bold">{progressPercent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
