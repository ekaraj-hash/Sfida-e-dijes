import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  BookOpen, 
  Zap, 
  Star, 
  Swords, 
  Trophy, 
  Medal as MedalIcon, 
  User, 
  Settings, 
  ChevronRight,
  Flame,
  Award,
  Volume2,
  VolumeX,
  Heart,
  PlusCircle,
  GraduationCap,
  LogOut,
  UserPlus,
  Users
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { LEVELS } from '../data/questions';
import { IslamicPattern } from './IslamicPattern';
import { ParallaxMenuBackground } from './ParallaxMenuBackground';
import { sound } from '../utils/audio';
import { RecoveryQuizModal } from './RecoveryQuizModal';
import { GameCountdownModal } from './GameCountdownModal';

interface MainMenuProps {
  onNavigate?: (screen: string) => void;
  onStartGame?: () => void;
  onStartSpeedChallenge?: () => void;
  onStartDailyChallenge?: () => void;
  onOpenCategories?: () => void;
  onOpenOnline?: () => void;
  onOpenMedals?: () => void;
  onOpenProfile?: () => void;
  onOpenLeaderboard?: () => void;
  onOpenFriends?: () => void;
  onOpenSettings?: () => void;
  onOpenStructured?: () => void;
  onLogout?: () => void;
  onNewAccount?: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ 
  onNavigate,
  onStartGame,
  onStartSpeedChallenge,
  onStartDailyChallenge,
  onOpenCategories,
  onOpenOnline,
  onOpenMedals,
  onOpenProfile,
  onOpenLeaderboard,
  onOpenFriends,
  onOpenSettings,
  onOpenStructured,
  onLogout,
  onNewAccount
}) => {
  const { profile, toggleBgMusic, addLife, logout } = useGame();
  const [showDailyDoneDialog, setShowDailyDoneDialog] = useState(false);
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [countdownMode, setCountdownMode] = useState<'classic' | 'online' | 'structured' | null>(null);
  const currentLevelObj = LEVELS.find((l) => l.level === profile.currentLevel) || LEVELS[0];
  const nextLevelObj = LEVELS.find((l) => l.level === profile.currentLevel + 1);

  // Calculate points progress to next level
  const currentLevelMin = currentLevelObj.minPoints;
  const nextLevelMin = nextLevelObj ? nextLevelObj.minPoints : currentLevelObj.maxPoints;
  const progressPercent = nextLevelObj
    ? Math.min(100, Math.max(0, Math.round(((profile.totalPoints - currentLevelMin) / (nextLevelMin - currentLevelMin)) * 100)))
    : 100;

  const todayStr = new Date().toISOString().split('T')[0];
  const isDailyDoneToday = profile.dailyChallengeCompleted && profile.lastDailyChallengeDate === todayStr;

  const handleLogout = () => {
    sound.playClick();
    logout();
    if (onLogout) onLogout();
  };

  const handleNewAccount = () => {
    sound.playClick();
    logout();
    if (onNewAccount) onNewAccount();
  };

  const handleCountdownStart = () => {
    const modeToStart = countdownMode;
    setCountdownMode(null);
    if (!modeToStart) return;

    if (modeToStart === 'classic') {
      if (onStartGame) onStartGame();
      else onNavigate?.('classic');
    } else if (modeToStart === 'online') {
      if (onOpenOnline) onOpenOnline();
      else onNavigate?.('online');
    } else if (modeToStart === 'structured') {
      if (onOpenStructured) onOpenStructured();
      else onNavigate?.('structured');
    }
  };

  const handleAction = (screenName: string) => {
    sound.playClick();
    switch (screenName) {
      case 'classic':
        setCountdownMode('classic');
        break;
      case 'online':
        if (onOpenOnline) onOpenOnline();
        else onNavigate?.('online');
        break;
      case 'structured':
        if (onOpenStructured) onOpenStructured();
        else onNavigate?.('structured');
        break;
      case 'speed':
        if (onStartSpeedChallenge) onStartSpeedChallenge();
        else onNavigate?.('speed');
        break;
      case 'daily':
        if (isDailyDoneToday) {
          setShowDailyDoneDialog(true);
        } else {
          if (onStartDailyChallenge) onStartDailyChallenge();
          else onNavigate?.('daily');
        }
        break;
      case 'categories':
        if (onOpenCategories) onOpenCategories();
        else onNavigate?.('categories');
        break;
      case 'online':
        if (onOpenOnline) onOpenOnline();
        else onNavigate?.('online');
        break;
      case 'medals':
        if (onOpenMedals) onOpenMedals();
        else onNavigate?.('medals');
        break;
      case 'profile':
        if (onOpenProfile) onOpenProfile();
        else onNavigate?.('profile');
        break;
      case 'leaderboard':
        if (onOpenLeaderboard) onOpenLeaderboard();
        else onNavigate?.('leaderboard');
        break;
      case 'friends':
        if (onOpenFriends) onOpenFriends();
        else onNavigate?.('friends');
        break;
      case 'settings':
        if (onOpenSettings) onOpenSettings();
        else onNavigate?.('settings');
        break;
      default:
        onNavigate?.(screenName);
    }
  };

  return (
    <div className="relative h-full flex flex-col justify-between p-3 sm:p-5 bg-slate-950 text-slate-100 overflow-y-auto">
      <ParallaxMenuBackground />

      <div className="relative z-10 space-y-3 sm:space-y-3.5 flex-1 flex flex-col justify-between">
        {/* Top Header Row: User Info, Total Lives & Dil */}
        <div className="flex items-center justify-between gap-2 px-0.5">
          {/* Total Lives & Add Life button (3D tactile pill) */}
          <div 
            onClick={() => setShowRecoveryModal(true)}
            className="cursor-pointer group flex items-center gap-2 bg-slate-900 px-3.5 py-1.5 rounded-full border border-rose-900/60 border-b-[3px] border-b-rose-950 text-xs shadow-md shadow-rose-950/40 hover:brightness-110 active:translate-y-0.5 active:border-b transition-all"
            title="Kliko për të fituar jetë me pyetje të thjeshta"
          >
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500 group-hover:scale-110 transition-transform drop-shadow-[0_2px_4px_rgba(244,63,94,0.5)]" />
            <span className="font-extrabold text-rose-200 tracking-wide text-xs">
              {profile.totalLives ?? 10} / 10 Jetë
            </span>
            <span className="flex items-center gap-1 text-[10px] font-black text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-700/60 shadow-inner">
              <PlusCircle className="w-3 h-3 text-emerald-400" /> +1
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Dil (Logout) button (3D button) */}
            <button
              onClick={handleLogout}
              id="btn-menu-logout"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-gradient-to-b from-rose-950/80 to-rose-950 border border-rose-800/80 border-b-[3px] border-b-rose-950 text-rose-200 hover:brightness-110 active:translate-y-0.5 active:border-b shadow-md shadow-rose-950/40 transition-all"
              title="Dil nga llogaria (Çkyçu)"
            >
              <LogOut className="w-3.5 h-3.5 text-rose-400" />
              <span>Dil</span>
            </button>
          </div>
        </div>

        {/* User Status Hero Card (Compact 3D Embossed Card) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-emerald-700/40 border-b-[4px] border-b-emerald-950 rounded-2xl p-3 sm:p-3.5 shadow-[0_6px_18px_rgba(0,0,0,0.5)]"
        >
          {/* 3D Top Highlight Sheen */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent rounded-t-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-2 sm:mb-2.5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-b from-emerald-500 to-teal-700 p-0.5 shadow-[0_3px_10px_rgba(16,185,129,0.35)] border-b-2 border-emerald-900">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center text-2xl shadow-inner">
                  {profile.avatar}
                </div>
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                  {profile.name}
                  {profile.linkedSocialHandle && (
                    <span className="text-[10px] bg-slate-800 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-700/40 font-normal">
                      @{profile.linkedSocialHandle}
                    </span>
                  )}
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border shadow-sm ${currentLevelObj.badgeColor}`}>
                    Niveli {profile.currentLevel} • {currentLevelObj.name}
                  </span>
                  {profile.currentStreak > 0 && (
                    <span className="text-[11px] font-black text-amber-300 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                      <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-400 animate-bounce" />
                      {profile.currentStreak}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Profile quick button (3D tactile) */}
            <button
              onClick={() => handleAction('profile')}
              id="btn-quick-profile"
              aria-label="Hap Profilin"
              className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 border-b-[3px] border-b-slate-950 hover:bg-slate-750 text-slate-200 hover:text-emerald-300 active:translate-y-0.5 active:border-b shadow-sm transition-all"
            >
              <User className="w-4 h-4" />
            </button>
          </div>

          {/* Level Progress Bar (1 to 1,200 nivele, 12,000 pyetje) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[11px] sm:text-xs font-bold">
              <span className="text-slate-300 flex items-center gap-1">
                Niveli {profile.currentLevel} / 1,200
              </span>
              <span className="text-emerald-400 font-extrabold">{profile.totalPoints.toLocaleString('sq-AL')} pikë</span>
            </div>
            <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden p-[1px] border border-slate-800 shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"
              />
            </div>
          </div>
        </motion.div>

        {/* Korniza e Modaliteteve Kryesore të Lojës */}
        <div 
          id="frame-game-modes"
          className="relative bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-950/90 border border-emerald-500/30 border-b-[3px] border-b-slate-900 rounded-3xl p-3 sm:p-3.5 shadow-lg shadow-black/40 space-y-2.5"
        >
          {/* Titulli Sipër Modaliteteve */}
          <div className="flex items-center justify-between px-1 pt-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              <h3 className="text-xs sm:text-sm font-black text-slate-100 tracking-wide">
                Zgjidh modalitetin e lojës
              </h3>
            </div>
            <span className="text-[10px] font-extrabold text-emerald-300 bg-emerald-950/70 border border-emerald-700/50 px-2 py-0.5 rounded-full">
              3 Mënyra
            </span>
          </div>

          <div className="space-y-2 sm:space-y-2.5">
            {/* 1. Klasike (ME TE DALLUESHEM: Super Prominent 3D Golden-Emerald Hero Button) */}
            <motion.button
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05 }}
              onClick={() => handleAction('classic')}
              id="btn-mode-classic"
              className="w-full text-left group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-teal-600 p-3.5 sm:p-4 shadow-[0_6px_0_#064e3b,0_12px_24px_rgba(16,185,129,0.35)] active:translate-y-1 active:shadow-[0_1px_0_#064e3b] transition-all border-2 border-amber-300/80 ring-1 ring-amber-400/40"
            >
              {/* Top Sheen reflection */}
              <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-3 sm:gap-3.5">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-gradient-to-b from-amber-300 to-amber-500 p-0.5 shadow-[0_4px_10px_rgba(245,158,11,0.4)] border-b-2 border-amber-700 shrink-0">
                    <div className="w-full h-full bg-emerald-950 rounded-[14px] flex items-center justify-center text-amber-300 shadow-inner">
                      <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-amber-300 text-amber-300 ml-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg sm:text-xl font-black text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                        Klasike
                      </h3>
                      <span className="text-[10px] font-black bg-gradient-to-r from-amber-300 to-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-md border border-amber-200 flex items-center gap-1">
                        <Star className="w-2.5 h-2.5 fill-slate-950" />
                        Kryesorja
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-100 mt-0.5 font-extrabold drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                      10 pyetje • 5 jetë për nivel • 1,200 nivele
                    </p>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/40 group-hover:translate-x-1 transition-transform shadow-inner">
                  <ChevronRight className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.button>

            {/* 2. Live 1 vs 1 (Horizontal Parallel Bar) */}
            <motion.button
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              onClick={() => handleAction('online')}
              id="btn-mode-live-1v1"
              className="w-full text-left group relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-900/90 via-indigo-950 to-slate-950 border border-indigo-700/50 border-b-[3px] border-b-indigo-950 p-2.5 sm:p-3 shadow-[0_3px_0_#1e1b4b] active:translate-y-0.5 active:border-b active:shadow-none transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-b from-indigo-500/30 to-indigo-900/60 flex items-center justify-center border border-indigo-400/40 text-indigo-300 shadow-inner shrink-0">
                  <Swords className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-300 drop-shadow" />
                </div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-sm sm:text-base font-black text-white tracking-wide group-hover:text-indigo-200 transition-colors">
                    Live 1 vs 1
                  </h3>
                  <span className="flex items-center gap-1 text-[10px] font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Live Duel
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400 group-hover:translate-x-1 transition-transform mr-1" />
            </motion.button>

            {/* 3. Islami me pyetje (Horizontal Parallel Bar) */}
            <motion.button
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              onClick={() => handleAction('structured')}
              id="btn-mode-structured"
              className="w-full text-left group relative overflow-hidden rounded-2xl bg-gradient-to-r from-teal-900/90 via-teal-950 to-slate-950 border border-teal-700/50 border-b-[3px] border-b-teal-950 p-2.5 sm:p-3 shadow-[0_3px_0_#064e3b] active:translate-y-0.5 active:border-b active:shadow-none transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-b from-teal-500/30 to-emerald-900/60 flex items-center justify-center border border-teal-400/40 text-teal-300 shadow-inner shrink-0">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-teal-300 drop-shadow" />
                </div>
                <div className="flex items-center gap-2.5">
                  <h3 className="text-sm sm:text-base font-black text-white tracking-wide group-hover:text-teal-200 transition-colors">
                    Islami me pyetje
                  </h3>
                  <span className="text-[10px] font-black bg-teal-500/20 text-teal-300 border border-teal-500/40 px-2 py-0.5 rounded-full">
                    Tematike
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 group-hover:translate-x-1 transition-transform mr-1" />
            </motion.button>
          </div>
        </div>

        {/* 4. Klasifikimi, 5. Miqtë & 6. Opsionet (Three 3D cards in 3-column grid with icon on top and text below) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5">
          {/* 4. Klasifikimi */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onClick={() => handleAction('leaderboard')}
            id="btn-mode-leaderboard"
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-t border-amber-500/30 shadow-[0_4px_0_#451a03] active:translate-y-0.5 active:shadow-none transition-all text-center group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-b from-amber-500/20 to-amber-950/60 border border-amber-500/50 flex items-center justify-center text-amber-300 shadow-inner shrink-0 mb-1.5">
              <Trophy className="w-4 h-4 drop-shadow" />
            </div>
            <div className="w-full text-center">
              <span className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors block leading-tight whitespace-nowrap">
                Klasifikimi
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 block mt-0.5 leading-tight whitespace-nowrap">
                Renditja
              </span>
            </div>
          </motion.button>

          {/* 5. Miqtë */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.23 }}
            onClick={() => handleAction('friends')}
            id="btn-mode-friends"
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-t border-indigo-500/40 shadow-[0_4px_0_#1e1b4b] active:translate-y-0.5 active:shadow-none transition-all text-center group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-b from-indigo-500/20 to-indigo-950/60 border border-indigo-500/50 flex items-center justify-center text-indigo-300 shadow-inner shrink-0 mb-1.5">
              <Users className="w-4 h-4 drop-shadow" />
            </div>
            <div className="w-full text-center">
              <span className="text-xs sm:text-sm font-black text-white group-hover:text-indigo-300 transition-colors block leading-tight whitespace-nowrap">
                Miqtë
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 block mt-0.5 leading-tight whitespace-nowrap">
                Lista & Sfida
              </span>
            </div>
          </motion.button>

          {/* 6. Opsionet */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26 }}
            onClick={() => handleAction('settings')}
            id="btn-mode-settings"
            className="flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border-t border-slate-600/30 shadow-[0_4px_0_#1e293b] active:translate-y-0.5 active:shadow-none transition-all text-center group"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-600/50 flex items-center justify-center text-slate-300 shadow-inner shrink-0 mb-1.5">
              <Settings className="w-4 h-4 drop-shadow" />
            </div>
            <div className="w-full text-center">
              <span className="text-xs sm:text-sm font-black text-white group-hover:text-slate-200 transition-colors block leading-tight whitespace-nowrap">
                Opsionet
              </span>
              <span className="text-[9px] sm:text-[10px] font-semibold text-slate-400 block mt-0.5 leading-tight whitespace-nowrap">
                Cilësimet
              </span>
            </div>
          </motion.button>
        </div>

        {/* Modalitete shtesë të shpejta me Butona 3D */}
        <div className="grid grid-cols-4 gap-2 sm:gap-2.5 pt-1.5 sm:pt-2 border-t border-slate-900/80">
          <button
            onClick={() => handleAction('categories')}
            id="btn-quick-categories"
            className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl bg-slate-900 border-t border-emerald-600/30 shadow-[0_3px_0_#064e3b] active:translate-y-0.5 active:shadow-none transition-all text-center group"
          >
            <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-300">Kategoritë</span>
          </button>

          <button
            onClick={() => handleAction('speed')}
            id="btn-quick-speed"
            className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl bg-slate-900 border-t border-amber-600/30 shadow-[0_3px_0_#78350f] active:translate-y-0.5 active:shadow-none transition-all text-center group"
          >
            <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 fill-amber-400 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-300">60 Sekonda</span>
          </button>

          <button
            onClick={() => handleAction('daily')}
            id="btn-quick-daily"
            className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl bg-slate-900 border-t border-yellow-600/30 shadow-[0_3px_0_#713f12] active:translate-y-0.5 active:shadow-none transition-all text-center relative group"
          >
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-300">Ditore</span>
          </button>

          <button
            onClick={() => handleAction('medals')}
            id="btn-quick-medals"
            className="flex flex-col items-center justify-center p-2 sm:p-2.5 rounded-xl bg-slate-900 border-t border-teal-600/30 shadow-[0_3px_0_#134e4a] active:translate-y-0.5 active:shadow-none transition-all text-center group"
          >
            <MedalIcon className="w-4 h-4 sm:w-5 sm:h-5 text-teal-400 mb-1 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-300">Medaljet</span>
          </button>
        </div>
      </div>

      {/* Footer Subtle Inspiration */}
      <div className="relative z-10 pt-2 text-center">
        <p className="text-[10px] sm:text-[11px] text-slate-500 italic flex items-center justify-center gap-1">
          <Award className="w-3 h-3 text-emerald-600" />
          "Kush ndjek një rrugë në kërkim të dijes, Allahu ia lehtëson rrugën për në Xhenet."
        </p>
      </div>

      {/* Daily Challenge Already Completed Modal */}
      <AnimatePresence>
        {showDailyDoneDialog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm bg-slate-900 border border-yellow-500/50 rounded-3xl p-5 shadow-2xl space-y-4 text-center relative overflow-hidden"
            >
              <div className="w-16 h-16 rounded-2xl bg-yellow-950/90 border border-yellow-500/50 mx-auto flex items-center justify-center text-3xl">
                ⭐
              </div>

              <div>
                <h3 className="text-lg font-black text-white">
                  Sfida Ditore u Përfundua!
                </h3>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  Për ditën e sotme e ke kryer me sukses sfidën ditore dhe ke arkëtuar <strong className="text-amber-400">+500 pikë bonus</strong> dhe medaljen speciale.
                </p>
                <p className="text-[11px] text-emerald-400 mt-2 font-semibold">
                  Rikthehu nesër për 5 pyetje të reja unike!
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setShowDailyDoneDialog(false);
                    if (onStartDailyChallenge) onStartDailyChallenge();
                    else onNavigate?.('daily');
                  }}
                  id="btn-daily-practice-again"
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-bold text-slate-200 transition-colors"
                >
                  Luaj Përsëri për Ushtrim
                </button>
                <button
                  onClick={() => setShowDailyDoneDialog(false)}
                  id="btn-daily-dialog-close"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-xs font-black text-white shadow-md active:scale-98 transition-all"
                >
                  Në Rregull
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Recovery Quiz Modal for +1 Life */}
      <RecoveryQuizModal
        isOpen={showRecoveryModal}
        onClose={() => setShowRecoveryModal(false)}
        onAddLife={() => {
          addLife(1);
          setShowRecoveryModal(false);
        }}
      />

      {/* Countdown Before Starting Chosen Game Mode (Klasike, Live 1v1, Islami me pyetje) */}
      <AnimatePresence>
        {countdownMode && (
          <GameCountdownModal
            isOpen={!!countdownMode}
            mode={countdownMode}
            onStart={handleCountdownStart}
            onCancel={() => setCountdownMode(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
