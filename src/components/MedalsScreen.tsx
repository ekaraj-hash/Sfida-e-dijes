import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Lock, CheckCircle2, Award, Sparkles } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { IslamicPattern } from './IslamicPattern';

export const MedalsScreen: React.FC = () => {
  const { medals, showMedalPopup } = useGame();
  const [filterType, setFilterType] = useState<'all' | 'level' | 'special' | 'category' | 'online'>('all');

  const filteredMedals = medals.filter((m) => {
    if (filterType === 'all') return true;
    if (filterType === 'level') return m.type === 'level';
    if (filterType === 'special') return m.type === 'special' || m.type === 'streak';
    if (filterType === 'category') return m.type === 'category';
    if (filterType === 'online') return m.type === 'online';
    return true;
  });

  const unlockedCount = medals.filter((m) => m.unlocked).length;

  return (
    <div className="relative min-h-[580px] h-full p-4 bg-slate-950 text-slate-100 overflow-y-auto">
      <IslamicPattern opacity={0.05} />

      <div className="relative z-10 space-y-4">
        {/* Header summary */}
        <div className="bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-800/40 rounded-2xl p-4 flex items-center justify-between shadow-lg">
          <div>
            <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              Medaljet e Mia
              <Award className="w-5 h-5 text-amber-400" />
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Koleksioni yt i arritjeve dhe trofeve
            </p>
          </div>
          <div className="text-right">
            <span className="text-lg font-black text-amber-400">
              {unlockedCount}/{medals.length}
            </span>
            <span className="text-[10px] text-slate-400 block font-semibold">Të zhbllokuara</span>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-1.5 text-xs font-bold overflow-x-auto pb-1 no-scrollbar">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-colors ${
              filterType === 'all'
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Të Gjitha ({medals.length})
          </button>
          <button
            onClick={() => setFilterType('level')}
            className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-colors ${
              filterType === 'level'
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Nivelet
          </button>
          <button
            onClick={() => setFilterType('special')}
            className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-colors ${
              filterType === 'special'
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Sfida Speciale
          </button>
          <button
            onClick={() => setFilterType('category')}
            className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-colors ${
              filterType === 'category'
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Kategoritë
          </button>
          <button
            onClick={() => setFilterType('online')}
            className={`px-3 py-1.5 rounded-xl border whitespace-nowrap transition-colors ${
              filterType === 'online'
                ? 'bg-emerald-600 border-emerald-500 text-white'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Sfida Online
          </button>
        </div>

        {/* Medals List Cards */}
        <div className="space-y-2.5">
          {filteredMedals.map((medal, idx) => (
            <motion.div
              key={medal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => {
                if (medal.unlocked) {
                  showMedalPopup(medal);
                }
              }}
              className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 transition-all ${
                medal.unlocked
                  ? 'bg-slate-900/95 border-emerald-800/50 hover:border-amber-400/60 hover:shadow-lg hover:shadow-amber-500/10 cursor-pointer shadow-md shadow-emerald-950/20 active:scale-[0.99]'
                  : 'bg-slate-950/50 border-slate-850 opacity-60 cursor-default'
              }`}
            >
              <div className="flex items-center gap-3.5">
                {/* Medal Icon Bubble */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl border ${
                    medal.unlocked
                      ? 'bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 border-amber-500/40 shadow-inner'
                      : 'bg-slate-900 border-slate-800 grayscale'
                  }`}
                >
                  {medal.unlocked ? medal.icon : <Lock className="w-5 h-5 text-slate-600" />}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-sm font-extrabold ${
                        medal.unlocked ? 'text-white' : 'text-slate-400'
                      }`}
                    >
                      {medal.name}
                    </h3>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-800 text-slate-300 font-semibold">
                      {medal.levelName}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium">
                    Kërkesa: {medal.requirement}
                  </p>

                  {medal.unlocked && medal.dateEarned && (
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Fitua më: {medal.dateEarned}
                    </span>
                  )}
                </div>
              </div>

              {/* Status Badge */}
              <div className="shrink-0">
                {medal.unlocked ? (
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-700/50 px-2.5 py-1 rounded-full">
                    E fituar
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    E kyçur
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
