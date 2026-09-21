import React, { useState } from 'react';
import { Heart, CheckCircle2, XCircle, ArrowRight, Sparkles, RefreshCw, X } from 'lucide-react';
import { RECOVERY_QUESTIONS } from '../data/recoveryQuestions';
import { sound } from '../utils/audio';

interface RecoveryQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddLife: () => void;
}

export const RecoveryQuizModal: React.FC<RecoveryQuizModalProps> = ({
  isOpen,
  onClose,
  onAddLife
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Pick 3 questions for this recovery round
  const recoveryQuestions = React.useMemo(() => {
    const shuffled = [...RECOVERY_QUESTIONS].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  }, [isOpen]);

  if (!isOpen) return null;

  const currentQ = recoveryQuestions[currentIdx];

  const handleSelect = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered) return;
    setSelectedOption(key);
    setIsAnswered(true);

    const isCorrect = key === currentQ.correctAnswer;
    if (isCorrect) {
      sound.playCorrect();
      setCorrectCount(prev => prev + 1);
    } else {
      sound.playWrong();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIdx < recoveryQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      if (correctCount + (selectedOption === currentQ.correctAnswer ? 1 : 0) >= 3) {
        sound.playVictory();
        onAddLife();
      }
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setCorrectCount(0);
    setIsCompleted(false);
  };

  const totalScore = correctCount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-emerald-100 dark:border-slate-800 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 p-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-rose-300">
              <Heart className="w-6 h-6 fill-current animate-pulse" />
            </div>
            <div>
              <h3 className="font-bold text-lg">Fito +1 Jetë të Re</h3>
              <p className="text-xs text-emerald-100">Përgjigju saktë në 3 pyetje të thjeshta fetare</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isCompleted ? (
            <div>
              {/* Progress bar */}
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                <span>Pyetja {currentIdx + 1} nga 3</span>
                <span>{correctCount} / 3 të sakta</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 mb-5">
                <div
                  className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / 3) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h4 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white mb-4">
                {currentQ.question}
              </h4>

              {/* Options */}
              <div className="space-y-2.5 mb-5">
                {(['A', 'B', 'C', 'D'] as const).map(key => {
                  const optText = currentQ.options[key];
                  const isSelected = selectedOption === key;
                  const isCorrect = key === currentQ.correctAnswer;

                  let btnClasses = "w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ";
                  if (!isAnswered) {
                    btnClasses += "border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-slate-800/80 text-slate-800 dark:text-slate-200";
                  } else if (isCorrect) {
                    btnClasses += "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold";
                  } else if (isSelected && !isCorrect) {
                    btnClasses += "border-rose-400 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300";
                  } else {
                    btnClasses += "border-slate-200 dark:border-slate-800 opacity-50 text-slate-600 dark:text-slate-400";
                  }

                  return (
                    <button
                      key={key}
                      onClick={() => handleSelect(key)}
                      disabled={isAnswered}
                      className={btnClasses}
                    >
                      <span className="flex items-center space-x-2.5">
                        <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-300">
                          {key}
                        </span>
                        <span>{optText}</span>
                      </span>
                      {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {isAnswered && (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl border border-emerald-200 dark:border-emerald-800/40 text-xs text-emerald-900 dark:text-emerald-200">
                    <p className="font-semibold mb-0.5">📚 Mëso më shumë:</p>
                    <p>{currentQ.explanation}</p>
                  </div>
                  <button
                    onClick={handleNext}
                    className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center space-x-2 transition-colors shadow-md"
                  >
                    <span>{currentIdx < 2 ? 'Pyetja Tjetër' : 'Përfundo Testin e Jetës'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4 space-y-4">
              {totalScore >= 3 ? (
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 shadow-inner">
                    <Heart className="w-9 h-9 fill-current animate-bounce" />
                  </div>
                  <div className="flex items-center justify-center space-x-1 text-amber-500">
                    <Sparkles className="w-5 h-5" />
                    <span className="font-bold text-lg text-slate-800 dark:text-white">Urime! Fitove +1 Jetë!</span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs mx-auto">
                    U përgjigje saktë në të 3 pyetjet themelore. Jeta jote u shtua me sukses në profil.
                  </p>
                  <button
                    onClick={onClose}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-md"
                  >
                    Vazhdo Lojën
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                    <RefreshCw className="w-8 h-8" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white">Provo përsëri!</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xs mx-auto">
                    Për të fituar një jetë të re duhet t'i përgjigjesh saktë të tre pyetjeve ({totalScore}/3).
                  </p>
                  <div className="flex space-x-3 pt-2">
                    <button
                      onClick={handleReset}
                      className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-colors shadow-md flex items-center justify-center space-x-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Provo Përsëri</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      Mbyll
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
