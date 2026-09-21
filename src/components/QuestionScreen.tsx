import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Flame, 
  Sparkles, 
  Clock, 
  HelpCircle, 
  EyeOff, 
  FastForward, 
  ChevronRight, 
  RotateCcw, 
  Home, 
  CheckCircle2, 
  XCircle, 
  Lightbulb,
  PlusCircle,
  LogOut,
  Play,
  Zap
} from 'lucide-react';
import { CategoryId, GameMode, Question } from '../types';
import { CATEGORIES } from '../data/questions';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/audio';
import { IslamicPattern } from './IslamicPattern';
import { RecoveryQuizModal } from './RecoveryQuizModal';

interface QuestionScreenProps {
  mode: GameMode;
  category?: CategoryId;
  questions: Question[];
  onFinish: (results: {
    totalScore: number;
    correctAnswers: number;
    totalAnswered: number;
    accuracy: number;
  }) => void;
  onQuit: () => void;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  mode,
  questions,
  onFinish,
  onQuit
}) => {
  const { profile, recordAnswer, loseLife, addLife, rescueLivesWithGems, spendGems } = useGame();

  const [currentIndex, setCurrentIndex] = useState(0);
  // 5 free lives per level session
  const [levelLives, setLevelLives] = useState(5);
  const [sessionScore, setSessionScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);

  // Recovery modal and gems rescue state
  const [showRecoveryModal, setShowRecoveryModal] = useState(false);
  const [gemRescueNotice, setGemRescueNotice] = useState<string | null>(null);

  // Mode flags
  const isClassicMode = mode === 'classic';
  const isSpeedMode = mode === 'speed';

  // Double Score state (Only for 'classic' mode, costs 50 gems per single question)
  const [isDoubleScoreActive, setIsDoubleScoreActive] = useState(false);
  const [doubleScoreNotice, setDoubleScoreNotice] = useState<string | null>(null);

  // Reward animation for gems and coins earned during classic mode
  const [rewardAnim, setRewardAnim] = useState<{ id: number; gems: number; coins: number } | null>(null);

  const handleActivateDoubleScore = () => {
    if (isAnswered || isGameOver) return;
    if (isDoubleScoreActive) {
      sound.playClick();
      setDoubleScoreNotice("⚡ Double Score është tashmë aktiv për këtë pyetje!");
      setTimeout(() => setDoubleScoreNotice(null), 3000);
      return;
    }

    if (profile.gems < 50) {
      sound.playWrong();
      setDoubleScoreNotice(`Ju duhen 50 gems për Double Score! Aktualisht keni ${profile.gems} gems.`);
      setTimeout(() => setDoubleScoreNotice(null), 3500);
      return;
    }

    const success = spendGems(50);
    if (success) {
      sound.playReward();
      setIsDoubleScoreActive(true);
      setDoubleScoreNotice("⚡ Double Score u aktivizua me 50 gems! Pikët e kësaj pyetjeje do të dyfishohen (2x).");
      setTimeout(() => setDoubleScoreNotice(null), 3500);
    }
  };

  // Answering states
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [pointsGainedThisQuestion, setPointsGainedThisQuestion] = useState(0);
  const [streakBonusThisQuestion, setStreakBonusThisQuestion] = useState(0);

  // Lifelines (Helps)
  const [helps5050, setHelps5050] = useState(1);
  const [helpsHint, setHelpsHint] = useState(1);
  const [helpsSkip, setHelpsSkip] = useState(1);
  const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);
  const [showHintModal, setShowHintModal] = useState(false);

  // Timer for Speed Mode (60 seconds total) or Normal
  const [speedTimer, setSpeedTimer] = useState(60);

  // Game over state
  const [isGameOver, setIsGameOver] = useState(false);
  // Exit options modal state (Vazhdo, Rinis, Dil)
  const [showExitDialog, setShowExitDialog] = useState(false);

  // Stop background music during test, resume on exit
  useEffect(() => {
    sound.stopBgMusic();
    return () => {
      if (profile.bgMusicEnabled) {
        sound.startBgMusic();
      }
    };
  }, [profile.bgMusicEnabled]);

  const currentQuestion = questions[currentIndex];
  const categoryInfo = CATEGORIES.find((c) => c.id === currentQuestion?.category) || CATEGORIES[0];

  // Speed Mode global countdown
  useEffect(() => {
    if (!isSpeedMode || isGameOver) return;
    const interval = setInterval(() => {
      setSpeedTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // End speed challenge
          const totalQ = correctCount + incorrectCount;
          const accuracy = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
          onFinish({
            totalScore: sessionScore,
            correctAnswers: correctCount,
            totalAnswered: totalQ,
            accuracy
          });
          return 0;
        }
        if (prev <= 5) sound.playTimerTick();
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSpeedMode, isGameOver, correctCount, incorrectCount, sessionScore, onFinish]);

  if (!currentQuestion) {
    return null;
  }

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered || isGameOver) return;

    sound.playClick();
    setSelectedOption(key);
    setIsAnswered(true);

    const isCorrect = key === currentQuestion.correctAnswer;

    if (isCorrect) {
      sound.playCorrect();
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);

      const scoreMultiplier = (isClassicMode && isDoubleScoreActive) ? 2 : 1;
      const result = recordAnswer(true, currentQuestion.category, undefined, mode, scoreMultiplier);
      const questionPoints = result.pointsEarned + result.streakBonus;
      setPointsGainedThisQuestion(result.pointsEarned);
      setStreakBonusThisQuestion(result.streakBonus);
      setSessionScore((prev) => prev + questionPoints);
      setCorrectCount((prev) => prev + 1);

      // Trigger reward animation if gems or coins earned (Classic mode)
      if (isClassicMode && (result.gemsEarned > 0 || result.coinsEarned > 0)) {
        const animId = Date.now();
        setRewardAnim({
          id: animId,
          gems: result.gemsEarned,
          coins: result.coinsEarned
        });
        setTimeout(() => {
          setRewardAnim((prev) => (prev?.id === animId ? null : prev));
        }, 2600);
      }
    } else {
      sound.playWrong();
      setCurrentStreak(0);
      setPointsGainedThisQuestion(0);
      setStreakBonusThisQuestion(0);
      setIncorrectCount((prev) => prev + 1);
      recordAnswer(false, currentQuestion.category, undefined, mode);

      // In non-speed modes, lose 1 life from current level (5 -> 4 -> 3 -> 2 -> 1 -> 0)
      // and simultaneously decrease total lives (out of 10) by 1.
      // Only when 5 mistakes are reached (nextLevelLives <= 0), show recovery window.
      if (!isSpeedMode) {
        const nextLevelLives = levelLives - 1;
        setLevelLives(nextLevelLives);
        loseLife();
        if (nextLevelLives <= 0) {
          setIsGameOver(true);
        }
      }
    }

    // In Speed Mode, auto advance quickly to maximize answers within 60s
    if (isSpeedMode) {
      setTimeout(() => {
        handleNextQuestion();
      }, 500);
    }
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setHiddenOptions([]);
      setShowHintModal(false);
      setPointsGainedThisQuestion(0);
      setStreakBonusThisQuestion(0);
      setIsDoubleScoreActive(false);
      setDoubleScoreNotice(null);
    } else {
      // Challenge finished! Calculate accuracy based on TOTAL questions in this quiz
      const totalQ = questions.length;
      const acc = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
      onFinish({
        totalScore: sessionScore,
        correctAnswers: correctCount,
        totalAnswered: totalQ,
        accuracy: acc
      });
    }
  };

  // Helper 50/50
  const use5050 = () => {
    if (helps5050 <= 0 || isAnswered || hiddenOptions.length > 0) return;
    sound.playClick();
    const wrongKeys = (['A', 'B', 'C', 'D'] as const).filter((k) => k !== currentQuestion.correctAnswer);
    // Shuffle and pick 2
    const shuffledWrong = [...wrongKeys].sort(() => 0.5 - Math.random());
    setHiddenOptions(shuffledWrong.slice(0, 2));
    setHelps5050((prev) => prev - 1);
  };

  // Helper Hint
  const useHint = () => {
    if (helpsHint <= 0) return;
    sound.playClick();
    setShowHintModal(true);
    setHelpsHint((prev) => prev - 1);
  };

  // Helper Skip
  const useSkip = () => {
    if (helpsSkip <= 0 || isAnswered) return;
    sound.playClick();
    setHelpsSkip((prev) => prev - 1);
    setIsDoubleScoreActive(false);
    setDoubleScoreNotice(null);
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setHiddenOptions([]);
      setShowHintModal(false);
    } else {
      const totalQ = questions.length;
      const acc = totalQ > 0 ? Math.round((correctCount / totalQ) * 100) : 0;
      onFinish({
        totalScore: sessionScore,
        correctAnswers: correctCount,
        totalAnswered: totalQ,
        accuracy: acc
      });
    }
  };

  const handleRetry = () => {
    sound.playClick();
    setCurrentIndex(0);
    setLevelLives(5);
    setSessionScore(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setCurrentStreak(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setHiddenOptions([]);
    setIsDoubleScoreActive(false);
    setDoubleScoreNotice(null);
    setIsGameOver(false);
  };

  return (
    <div className="relative min-h-[580px] h-full flex flex-col justify-between p-4 bg-slate-950 text-slate-100 overflow-y-auto select-none">
      <IslamicPattern opacity={0.06} />

      {/* Top Status Bar: Question Counter, Category, Lives/Timer, Score */}
      <div className="relative z-10 space-y-2.5">
        {isSpeedMode ? (
          /* Dedicated Sfida e Shpejtë HUD */
          <div className="bg-slate-900/95 border border-amber-500/40 rounded-2xl p-2.5 shadow-lg backdrop-blur-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Clock className={`w-3.5 h-3.5 ${speedTimer <= 10 ? 'text-rose-500 animate-pulse' : 'text-amber-400'}`} />
                  Sfida e Shpejtë (60s)
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                  #{currentIndex + 1}
                </span>
              </div>

              {/* Kronometër me kohë pas koke */}
              <div
                id="speed-countdown-timer"
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-black text-xs sm:text-sm transition-all ${
                  speedTimer <= 10
                    ? 'bg-rose-950 border border-rose-500 text-rose-300 animate-pulse scale-105'
                    : 'bg-amber-950/80 border border-amber-500/50 text-amber-300'
                }`}
              >
                <span>⏱️ {speedTimer}s</span>
              </div>
            </div>

            {/* Time progress bar */}
            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden border border-slate-800">
              <div
                className={`h-full transition-all duration-1000 ${
                  speedTimer <= 10 ? 'bg-rose-500' : speedTimer <= 25 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${(speedTimer / 60) * 100}%` }}
              />
            </div>

            {/* Required HUD metrics: Rezultati aktual | Numri i sakta | Seri aktuale */}
            <div className="grid grid-cols-3 gap-1.5 pt-0.5">
              <div id="stat-current-score" className="bg-slate-950/90 border border-slate-800/80 rounded-xl px-2 py-1 text-center">
                <div className="text-[9px] text-slate-400 font-medium">Rezultati</div>
                <div className="text-xs font-black text-amber-400 flex items-center justify-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{sessionScore}</span>
                </div>
              </div>

              <div id="stat-correct-count" className="bg-slate-950/90 border border-slate-800/80 rounded-xl px-2 py-1 text-center">
                <div className="text-[9px] text-slate-400 font-medium">Të Sakta</div>
                <div className="text-xs font-black text-emerald-400 flex items-center justify-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{correctCount}</span>
                </div>
              </div>

              <div id="stat-current-streak" className="bg-slate-950/90 border border-slate-800/80 rounded-xl px-2 py-1 text-center">
                <div className="text-[9px] text-slate-400 font-medium">Seri Aktuale</div>
                <div className="text-xs font-black text-orange-400 flex items-center justify-center gap-1">
                  <Flame className="w-3 h-3 text-orange-400" />
                  <span>{currentStreak} {currentStreak >= 3 ? '🔥' : ''}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Standard Status Bar for Classic, Category, and Daily */
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setShowExitDialog(true);
                }}
                id="btn-quiz-exit-header"
                title="Dil nga loja"
                className="p-1 px-2 rounded-lg bg-slate-900 hover:bg-rose-950/50 border border-slate-800 hover:border-rose-800/60 text-slate-400 hover:text-rose-300 flex items-center gap-1 text-[11px] font-bold transition-all"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-400" />
                <span>Dil</span>
              </button>
              <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-emerald-400">
                Pyetja {currentIndex + 1}/{questions.length}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-950/60 border border-emerald-800/40 text-emerald-300">
                {categoryInfo.shortName}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* 5 free lives per level */}
              <div className="flex items-center gap-1 bg-slate-900/90 px-2 py-1 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold mr-1">Niveli:</span>
                {[1, 2, 3, 4, 5].map((heartIndex) => (
                  <Heart
                    key={heartIndex}
                    className={`w-3.5 h-3.5 transition-all duration-300 ${
                      heartIndex <= levelLives
                        ? 'fill-rose-500 text-rose-500 scale-100'
                        : 'fill-slate-800 text-slate-700 scale-75 opacity-30'
                    }`}
                  />
                ))}
              </div>

              {/* Total 10 Lives bank indicator */}
              <div 
                onClick={() => setShowRecoveryModal(true)}
                title="Kliko për të fituar jetë shtesë (+1 Jetë)"
                className="cursor-pointer flex items-center gap-1 bg-rose-950/40 hover:bg-rose-900/50 px-2 py-1 rounded-xl border border-rose-800/40 transition-colors"
              >
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-400" />
                <span className="text-xs font-bold text-rose-300">
                  {profile.totalLives ?? 10}/10
                </span>
                <PlusCircle className="w-3 h-3 text-emerald-400 ml-0.5" />
              </div>

              {/* Score in this session */}
              <div className="flex items-center gap-1 text-xs font-extrabold text-amber-400 bg-slate-900/80 px-2 py-1 rounded-xl border border-slate-800">
                <Sparkles className="w-3 h-3" />
                <span>{sessionScore}</span>
              </div>

              {/* Player Gems in Session */}
              <motion.div 
                animate={rewardAnim ? { scale: [1, 1.25, 1], borderColor: ['#1e293b', '#10b981', '#1e293b'] } : {}}
                transition={{ duration: 0.6 }}
                className="relative flex items-center gap-1 text-xs font-extrabold text-emerald-300 bg-slate-900/80 px-2 py-1 rounded-xl border border-slate-800"
                title="Gems tuaja"
              >
                <span className={rewardAnim ? 'animate-bounce' : ''}>💎</span>
                <span>{profile.gems}</span>
                {rewardAnim && (
                  <motion.span
                    initial={{ opacity: 0, y: 4, scale: 0.6 }}
                    animate={{ opacity: [0, 1, 1, 0], y: [4, -14, -18, -22], scale: [0.6, 1.1, 1, 0.8] }}
                    transition={{ duration: 1.8 }}
                    className="absolute -top-1 -right-2 text-[10px] font-black text-emerald-300 bg-emerald-950/95 px-1 rounded-full border border-emerald-500/70 shadow-md"
                  >
                    +{rewardAnim.gems}
                  </motion.span>
                )}
              </motion.div>

              {/* Player Coins in Session (Classic mode) */}
              {isClassicMode && (
                <motion.div 
                  animate={rewardAnim ? { scale: [1, 1.25, 1], borderColor: ['#1e293b', '#f59e0b', '#1e293b'] } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="relative flex items-center gap-1 text-xs font-extrabold text-amber-300 bg-slate-900/80 px-2 py-1 rounded-xl border border-slate-800"
                  title="Monedhat tuaja"
                >
                  <span className={rewardAnim ? 'animate-bounce' : ''}>🪙</span>
                  <span>{profile.coins}</span>
                  {rewardAnim && (
                    <motion.span
                      initial={{ opacity: 0, y: 4, scale: 0.6 }}
                      animate={{ opacity: [0, 1, 1, 0], y: [4, -14, -18, -22], scale: [0.6, 1.1, 1, 0.8] }}
                      transition={{ duration: 1.8, delay: 0.1 }}
                      className="absolute -top-1 -right-2 text-[10px] font-black text-amber-300 bg-amber-950/95 px-1 rounded-full border border-amber-500/70 shadow-md"
                    >
                      +{rewardAnim.coins}
                    </motion.span>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* Streak Alert Bar for non-speed mode */}
        {!isSpeedMode && (
          <AnimatePresence>
            {currentStreak >= 3 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center justify-center gap-1.5 py-1 px-3 rounded-xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-sm"
              >
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-bounce" />
                <span>
                  {currentStreak >= 5 ? '🔥🔥🔥' : '🔥'} {currentStreak} përgjigje të sakta rresht!
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Main Question Card Area */}
      <div className="relative z-10 my-auto py-2">
        {/* Help Lifelines & Double Score Buttons Row */}
        {!isAnswered && !isGameOver && (
          <div className="flex items-center justify-between gap-2 mb-3">
            {/* Double Score Option - Only for Classic Mode */}
            {isClassicMode ? (
              <button
                onClick={handleActivateDoubleScore}
                disabled={isDoubleScoreActive}
                id="btn-double-score"
                title="Double Score - Dyfisho pikët e fituara për këtë pyetje duke përdorur 50 gems"
                className={`flex items-center gap-1.5 text-[11px] font-black px-2.5 sm:px-3 py-1.5 rounded-xl transition-all shadow-md active:scale-95 ${
                  isDoubleScoreActive
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 ring-2 ring-amber-300 shadow-amber-500/30'
                    : profile.gems >= 50
                    ? 'bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-600/20 border border-amber-500/70 text-amber-300 hover:border-amber-400 hover:text-amber-200'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 opacity-60'
                }`}
              >
                <Zap className={`w-3.5 h-3.5 ${isDoubleScoreActive ? 'text-slate-950 fill-slate-950 animate-pulse' : 'text-amber-400 fill-amber-400'}`} />
                <span>{isDoubleScoreActive ? 'Double Score (2x Aktiv)' : 'Double Score'}</span>
                <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                  isDoubleScoreActive ? 'bg-black/25 text-slate-950' : 'bg-slate-950/90 text-amber-300 border border-amber-500/40'
                }`}>
                  💎 50
                </span>
              </button>
            ) : <div />}

            <div className="flex items-center gap-1.5 sm:gap-2">
              {/* 50/50 */}
              <button
                onClick={use5050}
                disabled={helps5050 <= 0 || hiddenOptions.length > 0}
                id="btn-help-5050"
                title="50/50 - Heq 2 alternativa të pasakta"
                className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <EyeOff className="w-3 h-3 text-emerald-400" />
                <span>50/50 ({helps5050})</span>
              </button>

              {/* Hint */}
              <button
                onClick={useHint}
                disabled={helpsHint <= 0}
                id="btn-help-hint"
                title="Këshillë për pyetjen"
                className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <HelpCircle className="w-3 h-3 text-amber-400" />
                <span>Këshillë ({helpsHint})</span>
              </button>

              {/* Skip */}
              <button
                onClick={useSkip}
                disabled={helpsSkip <= 0}
                id="btn-help-skip"
                title="Kalo këtë pyetje"
                className="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-sky-400 disabled:opacity-40 disabled:pointer-events-none transition-colors"
              >
                <FastForward className="w-3 h-3 text-sky-400" />
                <span>Kalo ({helpsSkip})</span>
              </button>
            </div>
          </div>
        )}

        {/* Active Double Score Badge if activated */}
        {isClassicMode && isDoubleScoreActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-gradient-to-r from-amber-500/25 via-yellow-500/25 to-amber-500/25 border border-amber-400/70 text-amber-300 text-xs font-black shadow-sm mb-3"
          >
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>⚡ DOUBLE SCORE AKTIV (2x): Pikët e kësaj pyetjeje do të dyfishohen!</span>
          </motion.div>
        )}

        {/* Double Score Alert Notice */}
        <AnimatePresence>
          {doubleScoreNotice && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`p-2.5 rounded-xl border text-xs font-bold text-center mb-3 shadow-md flex items-center justify-center gap-2 ${
                doubleScoreNotice.includes('u aktivizua') || doubleScoreNotice.includes('tashmë aktiv')
                  ? 'bg-amber-950/80 border-amber-500/60 text-amber-300'
                  : 'bg-rose-950/80 border-rose-500/60 text-rose-300'
              }`}
            >
              <span>{doubleScoreNotice}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Short Floating Animation for Gems & Coins Rewards in Classic Mode */}
        <AnimatePresence>
          {rewardAnim && (
            <motion.div
              key={rewardAnim.id}
              initial={{ opacity: 0, y: 18, scale: 0.75 }}
              animate={{ 
                opacity: [0, 1, 1, 1, 0],
                y: [18, 0, -12, -22, -34],
                scale: [0.75, 1.14, 1.05, 1, 0.9]
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 2.3, times: [0, 0.15, 0.45, 0.8, 1], ease: 'easeOut' }}
              className="pointer-events-none absolute -top-3 left-1/2 -translate-x-1/2 z-40 flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-900/95 border-2 border-amber-400/80 shadow-[0_8px_30px_rgba(245,158,11,0.4)] backdrop-blur-md"
            >
              <div className="flex items-center gap-1.5 text-emerald-300 font-black text-xs sm:text-sm drop-shadow">
                <motion.span 
                  animate={{ scale: [1, 1.35, 1], rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 0.5, repeat: 1 }}
                  className="text-base"
                >
                  💎
                </motion.span>
                <span>+{rewardAnim.gems} Gem</span>
              </div>

              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />

              <div className="flex items-center gap-1.5 text-amber-300 font-black text-xs sm:text-sm drop-shadow">
                <motion.span 
                  animate={{ scale: [1, 1.35, 1], rotate: [0, 360] }}
                  transition={{ duration: 0.6 }}
                  className="text-base"
                >
                  🪙
                </motion.span>
                <span>+{rewardAnim.coins} Monedha</span>
              </div>

              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Question Text Box */}
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/95 border border-emerald-800/40 rounded-2xl p-4 shadow-xl backdrop-blur-sm mb-4"
        >
          <h3 className="text-base sm:text-lg font-bold text-white text-center leading-relaxed">
            {currentQuestion.question}
          </h3>
        </motion.div>

        {/* Four Large Answer Buttons: A, B, C, D */}
        <div className="grid grid-cols-1 gap-2.5">
          {(['A', 'B', 'C', 'D'] as const).map((key) => {
            const isHidden = hiddenOptions.includes(key);
            const isChosen = selectedOption === key;
            const isCorrectAnswer = currentQuestion.correctAnswer === key;

            let buttonStyles = 'bg-slate-900/90 border-slate-800 text-slate-200 hover:bg-slate-850 hover:border-emerald-700/50';

            if (isAnswered) {
              if (isCorrectAnswer) {
                buttonStyles = 'bg-emerald-600/30 border-emerald-500 text-white font-bold ring-1 ring-emerald-400';
              } else if (isChosen && !isCorrectAnswer) {
                buttonStyles = 'bg-rose-950/70 border-rose-600 text-rose-200 font-semibold ring-1 ring-rose-500';
              } else {
                buttonStyles = 'bg-slate-950/60 border-slate-850 text-slate-500 opacity-60';
              }
            }

            if (isHidden) {
              return (
                <div
                  key={key}
                  className="h-13 rounded-2xl border border-dashed border-slate-800/50 flex items-center justify-center opacity-30"
                >
                  <span className="text-xs text-slate-600">Opsioni u hoq</span>
                </div>
              );
            }

            return (
              <motion.button
                key={key}
                whileTap={!isAnswered ? { scale: 0.98 } : undefined}
                onClick={() => handleSelectOption(key)}
                disabled={isAnswered}
                id={`btn-option-${key}`}
                className={`w-full text-left p-3.5 rounded-2xl border flex items-center gap-3 transition-all duration-200 ${buttonStyles}`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition-colors ${
                    isAnswered && isCorrectAnswer
                      ? 'bg-emerald-500 text-white'
                      : isAnswered && isChosen && !isCorrectAnswer
                        ? 'bg-rose-600 text-white'
                        : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {key}
                </div>
                <span className="text-sm font-medium flex-1 text-left leading-snug">
                  {currentQuestion.options[key]}
                </span>

                {isAnswered && isCorrectAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isAnswered && isChosen && !isCorrectAnswer && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Feedback Bar & Educational "Mëso më shumë" Section */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 space-y-3"
            >
              {/* Correct / Incorrect Header Alert */}
              <div
                className={`p-3 rounded-2xl border flex items-center justify-between ${
                  selectedOption === currentQuestion.correctAnswer
                    ? 'bg-emerald-950/80 border-emerald-600/60 text-emerald-200'
                    : 'bg-rose-950/80 border-rose-600/60 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  {selectedOption === currentQuestion.correctAnswer ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <div>
                        <span className="text-sm font-bold block">✅ Përgjigje e saktë!</span>
                        <div className="text-xs text-emerald-300 font-semibold flex items-center gap-1.5 flex-wrap mt-0.5">
                          <span className="text-white font-black">+{pointsGainedThisQuestion} pikë</span>
                          {isClassicMode && isDoubleScoreActive && (
                            <span className="px-1.5 py-0.5 rounded bg-amber-500/25 text-amber-300 font-black text-[10px] border border-amber-500/50">
                              ⚡ Double Score 2x
                            </span>
                          )}
                          <span>•</span>
                          <motion.span 
                            animate={{ scale: [1, 1.18, 1] }}
                            transition={{ duration: 0.5, repeat: 2 }}
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 font-extrabold text-[11px] shadow-sm"
                          >
                            <span>💎</span> +1 gem
                          </motion.span>
                          <span>•</span>
                          <motion.span 
                            animate={{ scale: [1, 1.18, 1] }}
                            transition={{ duration: 0.5, repeat: 2, delay: 0.1 }}
                            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-500/20 border border-amber-400/50 text-amber-300 font-extrabold text-[11px] shadow-sm"
                          >
                            <span>🪙</span> +10 monedha
                          </motion.span>
                          {streakBonusThisQuestion > 0 && <span className="text-amber-300 font-bold">(+{streakBonusThisQuestion} bonus 🔥)</span>}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      <div>
                        <span className="text-sm font-bold block">❌ Përgjigje e gabuar!</span>
                        <span className="text-xs text-rose-300">
                          E sakta: <strong>{currentQuestion.options[currentQuestion.correctAnswer]}</strong>
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* 📚 MËSO MË SHUMË (Educational Explanation) */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-emerald-950/50 to-slate-900 border border-emerald-800/40 text-slate-200 text-xs shadow-md">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold uppercase tracking-wider text-[11px] mb-1">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                  📚 Mëso më shumë
                </div>
                <p className="leading-relaxed text-slate-300">
                  {currentQuestion.explanation}
                </p>
              </div>

              {/* Next Question Button */}
              <button
                onClick={handleNextQuestion}
                id="btn-next-question"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-900/40 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
              >
                <span>{currentIndex + 1 < questions.length ? 'Pyetja tjetër' : 'Përfundo Sfidën'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hint Modal / Bottom Sheet */}
      {showHintModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-amber-500/40 rounded-2xl p-5 max-w-sm w-full shadow-2xl"
          >
            <div className="flex items-center gap-2 text-amber-400 font-bold mb-2">
              <HelpCircle className="w-5 h-5" />
              <h4 className="text-sm font-extrabold uppercase tracking-wide">Këshillë ndihmëse</h4>
            </div>
            <p className="text-sm text-slate-200 leading-relaxed my-3 bg-amber-950/40 p-3 rounded-xl border border-amber-500/20">
              💡 {currentQuestion.hint}
            </p>
            <button
              onClick={() => setShowHintModal(false)}
              id="btn-close-hint"
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider"
            >
              Kuptova
            </button>
          </motion.div>
        </div>
      )}

      {/* Recovery Window (when 5 lives in level or total lives are depleted) */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-rose-500/50 rounded-3xl p-4 sm:p-6 max-w-md w-full text-center shadow-2xl space-y-4"
          >
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-rose-950/90 border border-rose-500/60 mx-auto flex items-center justify-center text-3xl shadow-lg shadow-rose-950/60">
              💔
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {levelLives <= 0 ? 'Keni bërë 5 gabime!' : 'Mbaruan Jetët!'}
              </h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Keni djegur 5 jetët e këtij niveli. Zgjidhni njërin nga opsionet për të vazhduar:
              </p>
            </div>

            {gemRescueNotice && (
              <div className="p-2.5 rounded-xl bg-amber-950/80 border border-amber-500/50 text-amber-200 text-xs font-bold">
                {gemRescueNotice}
              </div>
            )}

            {/* Jetë & Gems status summary */}
            <div className="grid grid-cols-2 gap-2 bg-slate-950/80 p-2.5 rounded-2xl border border-slate-800 text-xs">
              <div className="text-left px-2">
                <span className="text-[10px] text-slate-400 font-semibold block">Jetë Totale</span>
                <span className="font-extrabold text-rose-400">
                  {profile.totalLives ?? 10} / 10 të mbetura
                </span>
              </div>
              <div className="text-right px-2">
                <span className="text-[10px] text-slate-400 font-semibold block">Gems në Dispozicion</span>
                <span className="font-extrabold text-sky-400">
                  💎 {profile.gems} Gems
                </span>
              </div>
            </div>

            {/* 5 Recovery Options */}
            <div className="space-y-2 text-left">
              {/* 1. Mbush 5 jetët me 15 gems */}
              <button
                onClick={() => {
                  const res = rescueLivesWithGems('full');
                  if (res.success) {
                    setLevelLives(5);
                    setIsGameOver(false);
                    setGemRescueNotice(null);
                  } else {
                    setGemRescueNotice(res.message);
                  }
                }}
                id="btn-rescue-all-lives-gems"
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 border border-sky-400/40 text-white font-extrabold text-xs sm:text-sm flex items-center justify-between shadow-md active:scale-[0.99] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-950/80 border border-sky-400/50 flex items-center justify-center text-sky-300">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span>Mbush 5 jetët me 15 gems</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-lg bg-sky-950/80 border border-sky-300/40 text-sky-200 font-mono">
                  💎 15
                </span>
              </button>

              {/* 2. 1 jetë me 5 gems */}
              <button
                onClick={() => {
                  const res = rescueLivesWithGems('single');
                  if (res.success) {
                    setLevelLives(prev => Math.max(1, prev + 1));
                    setIsGameOver(false);
                    setGemRescueNotice(null);
                  } else {
                    setGemRescueNotice(res.message);
                  }
                }}
                id="btn-rescue-one-life-gems"
                className="w-full p-3 rounded-2xl bg-slate-800/95 hover:bg-slate-750 border border-sky-500/40 text-sky-200 font-extrabold text-xs sm:text-sm flex items-center justify-between shadow-sm active:scale-[0.99] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-950/80 border border-sky-500/30 flex items-center justify-center text-sky-400">
                    <Heart className="w-4 h-4 fill-sky-400" />
                  </div>
                  <span>1 jetë me 5 gems</span>
                </div>
                <span className="text-xs px-2 py-0.5 rounded-lg bg-slate-900 border border-sky-400/30 text-sky-300 font-mono">
                  💎 5
                </span>
              </button>

              {/* 3. Përgjigju 3 pyetjeve të thjeshta */}
              <button
                onClick={() => {
                  setShowRecoveryModal(true);
                  setGemRescueNotice(null);
                }}
                id="btn-rescue-quiz-modal"
                className="w-full p-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 border border-emerald-400/50 text-white font-extrabold text-xs sm:text-sm flex items-center justify-between shadow-md active:scale-[0.99] transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                    <PlusCircle className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs sm:text-sm font-black">Përgjigju 3 pyetjeve të thjeshta</span>
                    <span className="block text-[10px] text-emerald-100 font-normal">Fito +1 jetë falas pa gems</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-emerald-200" />
              </button>

              {/* 4. Rifillo & 5. Menu kryesore */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {/* 4. Rifillo */}
                <button
                  onClick={() => {
                    handleRetry();
                    setGemRescueNotice(null);
                  }}
                  id="btn-game-over-retry"
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-amber-300 hover:text-amber-200 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>Rifillo</span>
                </button>

                {/* 5. Menu kryesore */}
                <button
                  onClick={onQuit}
                  id="btn-game-over-home"
                  className="py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all"
                >
                  <Home className="w-3.5 h-3.5 text-slate-400" />
                  <span>Menu kryesore</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Recovery 3-question modal */}
      <RecoveryQuizModal
        isOpen={showRecoveryModal}
        onClose={() => setShowRecoveryModal(false)}
        onAddLife={() => {
          addLife(1);
          setLevelLives(prev => Math.min(5, prev + 1));
          setIsGameOver(false);
          setShowRecoveryModal(false);
        }}
      />

      {/* Exit Dialog with 3 Options: Vazhdo, Rinis, Dil */}
      {showExitDialog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-slate-900 border border-slate-700/80 rounded-3xl p-6 max-w-sm w-full shadow-2xl text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 mx-auto flex items-center justify-center text-2xl mb-3 shadow-md">
              ⏸️
            </div>
            <h3 className="text-lg font-extrabold text-white mb-1">
              Dëshironi të dilni nga loja?
            </h3>
            <p className="text-xs text-slate-300 mb-5 leading-relaxed">
              Zgjidhni njërën nga mundësitë për të vazhduar me testin aktual, për ta rifilluar atë, ose për t'u kthyer në menu kryesore:
            </p>

            <div className="flex flex-col gap-2.5">
              {/* Option 1: Vazhdo */}
              <button
                onClick={() => {
                  sound.playClick();
                  setShowExitDialog(false);
                }}
                id="btn-exit-continue"
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-950 transition-all active:scale-[0.98]"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Vazhdo</span>
              </button>

              {/* Option 2: Rinis */}
              <button
                onClick={() => {
                  sound.playClick();
                  setShowExitDialog(false);
                  handleRetry();
                }}
                id="btn-exit-restart"
                className="w-full py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-750 border border-amber-500/40 text-amber-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98]"
              >
                <RotateCcw className="w-4 h-4 text-amber-400" />
                <span>Rinis (Rifillo Nivelin)</span>
              </button>

              {/* Option 3: Dil */}
              <button
                onClick={() => {
                  sound.playClick();
                  setShowExitDialog(false);
                  onQuit();
                }}
                id="btn-exit-quit"
                className="w-full py-3 px-4 rounded-xl bg-rose-950/50 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <LogOut className="w-4 h-4 text-rose-400" />
                <span>Dil në Faqen Fillestare</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};
