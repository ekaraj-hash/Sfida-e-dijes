import React from 'react';
import { ChevronLeft, Flame, Sparkles, Volume2, VolumeX, Shield, Home } from 'lucide-react';
import { useGame } from '../context/GameContext';
import { LEVELS } from '../data/questions';

interface HeaderNavProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  onHome?: () => void;
  rightAction?: React.ReactNode;
  onOpenProfile?: () => void;
  onOpenSettings?: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  title,
  showBack = false,
  onBack,
  onHome,
  rightAction,
  onOpenSettings
}) => {
  const { profile, toggleSound } = useGame();
  const currentLevelObj = LEVELS.find((l) => l.level === profile.currentLevel) || LEVELS[0];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-emerald-900/30 px-3 py-2.5 transition-all">
      {/* Top micro-bar: Level, Streak, Points, Gems, Home & Sound */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {showBack && (
            <button
              onClick={onBack}
              id="btn-nav-back"
              aria-label="Kthehu prapa"
              className="p-1.5 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 border-b-[3px] border-b-slate-950 text-slate-200 hover:text-emerald-400 shadow-[0_2px_0_#0f172a] active:translate-y-0.5 active:border-b active:shadow-none transition-all"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}

          {onHome && (
            <button
              onClick={onHome}
              id="btn-nav-home"
              title="Faqja fillestare (Kryesore)"
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 hover:from-emerald-900/60 hover:to-slate-900 border border-slate-700/80 hover:border-emerald-500/50 border-b-[3px] border-b-slate-950 text-emerald-300 text-xs font-bold shadow-[0_3px_0_#0f172a] hover:brightness-110 active:translate-y-0.5 active:border-b active:shadow-none transition-all"
            >
              <Home className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Faqja fillestare</span>
            </button>
          )}

          {title ? (
            <h1 className="text-sm sm:text-base font-bold text-slate-100 tracking-tight flex items-center gap-1.5 truncate max-w-[150px] sm:max-w-[200px]">
              {title}
            </h1>
          ) : (
            <div className="flex items-center gap-1.5">
              <span className="text-xl leading-none">{profile.avatar}</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-200 leading-tight truncate max-w-[90px]">
                  {profile.name}
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-0.5">
                  <Shield className="w-2.5 h-2.5 text-emerald-400" />
                  {currentLevelObj.name}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right side stats pills: Gems, Coins, Points, Sound, Settings */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {/* Gems counter */}
          <div 
            title="Gems të çmuar"
            className="flex items-center gap-1 bg-cyan-950/70 border border-cyan-500/30 px-2 py-0.5 rounded-full text-cyan-300 text-xs font-bold"
          >
            <span>💎</span>
            <span>{profile.gems}</span>
          </div>

          {/* Coins counter */}
          <div 
            title="Monedha (Coins)"
            className="flex items-center gap-1 bg-amber-950/70 border border-amber-500/30 px-2 py-0.5 rounded-full text-amber-300 text-xs font-bold hidden xs:flex"
          >
            <span>🪙</span>
            <span>{profile.coins}</span>
          </div>

          {profile.currentStreak > 0 && (
            <div 
              title={`${profile.currentStreak} përgjigje rresht`}
              className="flex items-center gap-0.5 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded-full text-amber-300 text-xs font-bold shadow-sm"
            >
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-pulse" />
              <span>{profile.currentStreak}</span>
            </div>
          )}

          <div 
            title="Pikët e akumuluara"
            className="flex items-center gap-1 bg-emerald-950/60 border border-emerald-600/40 px-2.5 py-0.5 rounded-full text-emerald-300 text-xs font-extrabold shadow-inner"
          >
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>{profile.totalPoints.toLocaleString('sq-AL')}</span>
          </div>

          <button
            onClick={toggleSound}
            id="btn-toggle-sound"
            aria-label={profile.soundEnabled ? 'Çaktivizo zërin' : 'Aktivizo zërin'}
            className="p-1.5 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 border-b-[2px] border-b-slate-950 text-slate-400 hover:text-emerald-400 shadow-[0_2px_0_#0f172a] active:translate-y-0.5 active:border-b active:shadow-none transition-all"
          >
            {profile.soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </button>

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              id="btn-header-settings"
              aria-label="Cilësimet"
              className="p-1.5 rounded-xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 border-b-[2px] border-b-slate-950 text-slate-400 hover:text-slate-200 shadow-[0_2px_0_#0f172a] active:translate-y-0.5 active:border-b active:shadow-none transition-all"
            >
              <span className="text-xs">⚙</span>
            </button>
          )}

          {rightAction}
        </div>
      </div>
    </header>
  );
};
