import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { RotateCcw, Home, ArrowRight, CheckCircle2, XCircle, Target, Zap, Star, Award, Gem, Coins } from 'lucide-react';
import { LEVELS } from '../data/questions';
import { useGame } from '../context/GameContext';
import { GameMode } from '../types';
import { sound } from '../utils/audio';
import { IslamicPattern } from './IslamicPattern';

interface ResultScreenProps {
  mode?: GameMode;
  scoreEarned: number;
  correctAnswers: number;
  totalQuestions: number;
  accuracy: number;
  onPlayAgain: () => void;
  onContinue: () => void;
  onHome: () => void;
}

export const ResultScreen: React.FC<ResultScreenProps> = ({
  mode = 'classic',
  scoreEarned,
  correctAnswers,
  totalQuestions,
  accuracy,
  onPlayAgain,
  onContinue,
  onHome
}) => {
  const { profile, completeDailyChallenge, recordSpeedChallengeCompleted, recordClassicLevelCompleted } = useGame();
  const currentLevelObj = LEVELS.find((l) => l.level === profile.currentLevel) || LEVELS[0];
  const hasTriggeredRewards = useRef(false);

  const isClassic = mode === 'classic';
  const isDaily = mode === 'daily';
  const isSpeed = mode === 'speed';
  const isPerfect = isClassic && totalQuestions === 10 && correctAnswers === 10;
  const incorrectAnswers = Math.max(0, totalQuestions - correctAnswers);

  // Calculate final score with perfect 10/10 bonus (+100) if in classic mode
  const finalScore = isClassic && isPerfect ? scoreEarned + 100 : scoreEarned;

  useEffect(() => {
    sound.playVictory();
    try {
      confetti({
        particleCount: isPerfect ? 120 : 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {
      // Ignore if canvas unavailable
    }

    if (!hasTriggeredRewards.current) {
      hasTriggeredRewards.current = true;
      if (isClassic) {
        recordClassicLevelCompleted(isPerfect);
      } else if (mode === 'daily') {
        completeDailyChallenge();
      } else if (mode === 'speed') {
        recordSpeedChallengeCompleted(scoreEarned, correctAnswers);
      }
    }
  }, [mode, isClassic, isPerfect, scoreEarned, correctAnswers, completeDailyChallenge, recordSpeedChallengeCompleted, recordClassicLevelCompleted]);

  return (
    <div className="relative min-h-[580px] h-full flex flex-col justify-between p-5 bg-gradient-to-b from-slate-950 via-emerald-950/70 to-slate-950 text-slate-100 overflow-y-auto select-none">
      <IslamicPattern opacity={0.08} />

      {/* Top Graphic Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center pt-2"
      >
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-[2px] shadow-2xl shadow-amber-500/30 mb-3">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-4xl">
            {isPerfect ? '👑' : isSpeed ? '⚡' : isDaily ? '⭐' : '🎉'}
          </div>
        </div>

        <h2 className="text-2xl font-black text-white tracking-tight">
          {isPerfect ? 'PERFEKT! 10 NGA 10!' : isSpeed ? 'SFIDA E SHPEJTË' : isDaily ? 'SFIDA DITORE U KRYE!' : 'URIME!'}
        </h2>
        <p className="text-xs text-emerald-300 font-semibold mt-0.5">
          {isPerfect 
            ? 'Shkëlqyer! Fitove të gjitha pikët dhe bonusin maksimal!'
            : isSpeed 
            ? 'Përmbledhja e rezultatit tënd në 60 sekonda!' 
            : isDaily 
            ? 'Përfundove me sukses të 5 pyetjet e ditës!' 
            : `Përfundove me sukses Nivelin ${profile.currentLevel}!`}
        </p>
      </motion.div>

      {/* Stats Summary Bento Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 bg-slate-900/90 border border-emerald-800/40 rounded-3xl p-5 shadow-xl backdrop-blur-sm my-3 space-y-3"
      >
        {/* Special 10/10 Perfect Bonus Achievement Banner */}
        {isPerfect && (
          <div className="bg-gradient-to-r from-amber-950/90 via-yellow-950/60 to-amber-950/90 border border-amber-500/60 rounded-2xl p-3 text-center space-y-2 shadow-lg animate-pulse">
            <div className="flex items-center justify-center gap-1.5 text-amber-300 font-black text-xs">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Arritje Speciale: Nivel i Përsosur 10/10!</span>
            </div>
            <p className="text-[11px] text-amber-200">
              Fitove bonusin e plotë të nivelit klasik:
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap pt-0.5">
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/20 border border-amber-400/60 text-amber-300 text-xs font-black shadow-sm"
              >
                ✨ +100 Pikë
              </motion.span>
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 15, delay: 0.1 }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-500/25 border border-emerald-400/60 text-emerald-300 text-xs font-black shadow-sm"
              >
                💎 +10 Gems
              </motion.span>
              <motion.span
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 15, delay: 0.2 }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-500/25 border border-amber-400/60 text-amber-300 text-xs font-black shadow-sm"
              >
                🪙 +100 Monedha
              </motion.span>
            </div>
          </div>
        )}

        {/* Special Daily Badge Award Banner */}
        {isDaily && (
          <div className="bg-gradient-to-r from-amber-950/80 via-yellow-950/50 to-amber-950/80 border border-amber-500/50 rounded-2xl p-3 text-center space-y-1 shadow-md">
            <div className="flex items-center justify-center gap-1.5 text-amber-300 font-black text-xs">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Medalje Speciale: Ylli Ditor!</span>
            </div>
            <p className="text-[11px] text-amber-200/90">
              Fitove <strong className="text-white font-black">+500 pikë bonus</strong> dhe medaljen e ditës!
            </p>
          </div>
        )}

        {/* Special Speed Badge Banner */}
        {isSpeed && (
          <div className="bg-gradient-to-r from-amber-950/80 via-orange-950/50 to-amber-950/80 border border-amber-500/50 rounded-2xl p-3 text-center space-y-1 shadow-md">
            <div className="flex items-center justify-center gap-1.5 text-amber-300 font-black text-xs">
              <Zap className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>Sfida me Kohë pas Koke përfundoi!</span>
            </div>
            <p className="text-[11px] text-amber-200/90">
              U përgjigje brenda 60 sekondave me sukses!
            </p>
          </div>
        )}

        {/* 1. Total Score Box */}
        <div className="text-center bg-slate-950/90 p-3.5 rounded-2xl border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
            {isSpeed ? 'Rezultati Total i Sfidës' : 'Pikët Totale të Fituara'}
          </span>
          <span className="text-3xl font-black text-amber-400 tracking-tight block mt-0.5">
            +{finalScore.toLocaleString('sq-AL')} pikë
          </span>
          <div className="flex items-center justify-center gap-3 mt-1.5 text-xs">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
              <Gem className="w-3.5 h-3.5 text-emerald-400" />
              +{isPerfect ? '20' : correctAnswers} gems
            </span>
            <span className="text-slate-600">•</span>
            <span className="inline-flex items-center gap-1 text-amber-400 font-bold">
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              +{isPerfect ? '200' : correctAnswers * 10} monedha
            </span>
          </div>
        </div>

        {/* 2. Three Key Stats: Të sakta, Të gabuara, Saktësia */}
        <div className="grid grid-cols-3 gap-2">
          {/* Correct Answers */}
          <div className="bg-slate-950/80 p-2.5 rounded-2xl border border-slate-800 flex flex-col items-center">
            <div className="flex items-center gap-1 text-emerald-400 text-[11px] font-semibold mb-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Të sakta</span>
            </div>
            <span className="text-base font-black text-white">
              {correctAnswers}
            </span>
          </div>

          {/* Incorrect Answers */}
          <div className="bg-slate-950/80 p-2.5 rounded-2xl border border-slate-800 flex flex-col items-center">
            <div className="flex items-center gap-1 text-rose-400 text-[11px] font-semibold mb-0.5">
              <XCircle className="w-3.5 h-3.5" />
              <span>Të gabuara</span>
            </div>
            <span className="text-base font-black text-white">
              {incorrectAnswers}
            </span>
          </div>

          {/* Accuracy Percentage */}
          <div className="bg-slate-950/80 p-2.5 rounded-2xl border border-slate-800 flex flex-col items-center">
            <div className="flex items-center gap-1 text-sky-400 text-[11px] font-semibold mb-0.5">
              <Target className="w-3.5 h-3.5" />
              <span>Saktësia</span>
            </div>
            <span className="text-base font-black text-white">
              {totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : accuracy}%
            </span>
          </div>
        </div>

        {/* 3. Medal or Achievement Earned */}
        <div className="bg-gradient-to-r from-slate-950 to-slate-900 p-3 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl">{currentLevelObj.medalIcon}</span>
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Medalja & Niveli Aktual
              </span>
              <span className="text-xs font-bold text-slate-200">
                {currentLevelObj.medalName}
              </span>
            </div>
          </div>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${currentLevelObj.badgeColor}`}>
            Niveli {profile.currentLevel} / 1200
          </span>
        </div>
      </motion.div>

      {/* Action Buttons: ▶ Vazhdoni, 🔄 Luaj përsëri, 🏠 Menu kryesore */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="relative z-10 space-y-2 pb-1"
      >
        <button
          onClick={onContinue}
          id="btn-result-continue"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
        >
          <span>Vazhdoni</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={onPlayAgain}
            id="btn-result-replay"
            className="py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-emerald-400" />
            <span>Luaj përsëri</span>
          </button>

          <button
            onClick={onHome}
            id="btn-result-home"
            className="py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-sky-400" />
            <span>Menu kryesore</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
