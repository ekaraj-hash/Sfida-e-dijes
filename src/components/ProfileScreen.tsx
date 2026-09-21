import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  User, 
  Sparkles, 
  Flame, 
  CheckCircle2, 
  Target, 
  Trophy, 
  Award,
  Swords, 
  Zap, 
  Clock, 
  Edit2, 
  Save,
  Shield,
  BookOpen
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { CATEGORIES, LEVELS } from '../data/questions';
import { IslamicPattern } from './IslamicPattern';
import { sound } from '../utils/audio';

const AVATARS = ['🕌', '👳', '🧕', '⭐', '🌟', '🌙', '📖', '🕊️'];

export const ProfileScreen: React.FC = () => {
  const { profile, updateProfile, medals, showMedalPopup } = useGame();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [avatar, setAvatar] = useState(profile.avatar);

  const currentLevelObj = LEVELS.find((l) => l.level === profile.currentLevel) || LEVELS[0];
  const unlockedMedalsCount = medals.filter((m) => m.unlocked).length;

  const handleSave = () => {
    sound.playClick();
    updateProfile({
      name: name.trim() || 'Besimtari',
      avatar
    });
    setIsEditing(false);
  };

  return (
    <div className="relative min-h-[580px] h-full p-4 bg-slate-950 text-slate-100 overflow-y-auto">
      <IslamicPattern opacity={0.06} />

      <div className="relative z-10 space-y-4">
        {/* Profile Card Header */}
        <div className="bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-800/40 rounded-3xl p-5 shadow-xl backdrop-blur-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3.5">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-amber-400 p-[2px] shadow-lg shadow-emerald-700/30">
                <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-3xl">
                  {avatar}
                </div>
              </div>

              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    maxLength={20}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-slate-950 border border-emerald-500 rounded-lg px-2 py-1 text-sm font-bold text-white focus:outline-hidden"
                  />
                ) : (
                  <h2 className="text-lg font-black text-white tracking-tight">
                    {profile.name}
                  </h2>
                )}
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${currentLevelObj.badgeColor}`}>
                    {currentLevelObj.medalIcon} {currentLevelObj.name}
                  </span>
                  <span className="text-xs font-bold text-amber-400">
                    {profile.totalPoints.toLocaleString('sq-AL')} pikë
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                if (isEditing) handleSave();
                else {
                  sound.playClick();
                  setIsEditing(true);
                }
              }}
              id="btn-profile-edit-save"
              className="p-2 rounded-xl bg-slate-800 hover:bg-emerald-900/50 border border-slate-700 text-slate-300 hover:text-emerald-300 transition-colors"
            >
              {isEditing ? <Save className="w-4 h-4 text-emerald-400" /> : <Edit2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Avatar selector while editing */}
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="pt-3 border-t border-slate-800 mb-2"
            >
              <span className="text-[11px] text-slate-400 font-semibold block mb-2">
                Zgjidh avatarin e ri:
              </span>
              <div className="grid grid-cols-8 gap-1">
                {AVATARS.map((av) => (
                  <button
                    key={av}
                    onClick={() => setAvatar(av)}
                    className={`h-9 rounded-lg flex items-center justify-center text-lg ${
                      avatar === av ? 'bg-emerald-600 border border-emerald-400' : 'bg-slate-800'
                    }`}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-center">
            <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-850">
              <span className="text-[10px] text-slate-400 font-medium block">Saktësia</span>
              <span className="text-sm font-extrabold text-emerald-400">{profile.accuracyPercentage}%</span>
            </div>
            <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-850">
              <span className="text-[10px] text-slate-400 font-medium block">Rekord Rresht</span>
              <span className="text-sm font-extrabold text-amber-400 flex items-center justify-center gap-0.5">
                <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                {profile.highestStreak}
              </span>
            </div>
            <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-850">
              <span className="text-[10px] text-slate-400 font-medium block">Medalje</span>
              <span className="text-sm font-extrabold text-white">{unlockedMedalsCount}</span>
            </div>
          </div>
        </div>

        {/* Solo Quiz Statistics Section */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-md space-y-3">
          <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-emerald-400" />
            Statistikat e Dijes
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Pyetje të përgjigjura</span>
              <span className="text-base font-extrabold text-white mt-0.5 block">{profile.totalAnswered}</span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Përgjigje të sakta</span>
              <span className="text-base font-extrabold text-emerald-400 mt-0.5 block">{profile.correctAnswers}</span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Përgjigje të gabuara</span>
              <span className="text-base font-extrabold text-rose-400 mt-0.5 block">{profile.incorrectAnswers}</span>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Streak aktual</span>
              <span className="text-base font-extrabold text-amber-400 mt-0.5 flex items-center gap-1">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500" />
                {profile.currentStreak}
              </span>
            </div>
          </div>
        </div>

        {/* Online Multiplayer Stats Section */}
        <div className="bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-900/50 rounded-3xl p-4 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Swords className="w-4 h-4 text-indigo-400" />
              Statistikat e Sfidave Online
            </h3>
            <span className="text-[10px] font-bold bg-indigo-900/80 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-700/50">
              1v1 Live
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Sfida Total</span>
              <span className="text-sm font-extrabold text-white mt-0.5 block">{profile.onlineGames}</span>
            </div>
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">Fitore</span>
              <span className="text-sm font-extrabold text-emerald-400 mt-0.5 block">{profile.onlineWins}</span>
            </div>
            <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-400 block">% e Fitoreve</span>
              <span className="text-sm font-extrabold text-amber-400 mt-0.5 block">{profile.winPercentage}%</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-850 flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                Më e shpejta:
              </span>
              <span className="font-bold text-white">
                {profile.fastestAnswerTime > 0 ? `${profile.fastestAnswerTime}s` : '-'}
              </span>
            </div>
            <div className="bg-slate-950/70 p-2.5 rounded-xl border border-slate-850 flex items-center justify-between">
              <span className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                Mesatarja:
              </span>
              <span className="font-bold text-white">
                {profile.averageAnswerSpeed > 0 ? `${profile.averageAnswerSpeed}s` : '-'}
              </span>
            </div>
          </div>
        </div>

        {/* Completed Categories Breakdown */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-md space-y-2.5">
          <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            Përparimi sipas Kategorive
          </h3>

          <div className="space-y-2">
            {CATEGORIES.map((cat) => {
              const count = profile.completedCategories[cat.id] || 0;
              const pct = Math.min(100, Math.round((count / cat.totalQuestions) * 100));
              return (
                <div key={cat.id} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">{cat.name}</span>
                    <span className="text-emerald-400">{count} / {cat.totalQuestions}</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dedicated Seksioni: Medaljet e Mia */}
        <div id="section-my-medals" className="bg-gradient-to-br from-amber-950/30 via-slate-900 to-slate-900 border border-amber-500/40 rounded-3xl p-4 shadow-xl space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-black text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                Medaljet e Mia
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Trofetë dhe arritjet e fituara në kuiz
              </p>
            </div>
            <span className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/50 text-amber-300">
              {unlockedMedalsCount} / {medals.length}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2 pt-1">
            {medals.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  if (m.unlocked) {
                    showMedalPopup(m);
                  }
                }}
                className={`p-2.5 rounded-2xl border transition-all flex items-center gap-3 ${
                  m.unlocked
                    ? 'bg-slate-950/90 border-amber-500/30 hover:border-amber-400/60 hover:shadow-md hover:shadow-amber-500/10 cursor-pointer shadow-xs active:scale-[0.99]'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-60 cursor-default'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 border ${
                    m.unlocked
                      ? 'bg-gradient-to-tr from-amber-500/20 to-emerald-500/20 border-amber-500/50'
                      : 'bg-slate-900 border-slate-800 grayscale'
                  }`}
                >
                  {m.icon}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <h4 className="text-xs font-bold text-white truncate">{m.name}</h4>
                    <span
                      className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md shrink-0 ${
                        m.unlocked
                          ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/60'
                          : 'bg-slate-900 text-slate-500 border border-slate-800'
                      }`}
                    >
                      {m.unlocked ? '✓ Fituar' : 'E kyçur'}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 leading-tight mt-0.5 line-clamp-2">
                    {m.requirement}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
