import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { 
  Swords, 
  Clock, 
  Users, 
  Key, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  Trophy, 
  RotateCcw, 
  Home, 
  Copy, 
  Check, 
  UserPlus,
  Flame,
  ArrowRight
} from 'lucide-react';
import { MOCK_ONLINE_PLAYERS, CATEGORIES } from '../data/questions';
import { Question, OnlineCategoryId, Friend } from '../types';
import { useGame } from '../context/GameContext';
import { getLive1v1Questions } from '../data/questionBank';
import { sound } from '../utils/audio';
import { IslamicPattern } from './IslamicPattern';

const ONLINE_CATEGORIES: Array<{ id: OnlineCategoryId; name: string; shortName: string; icon: string }> = [
  { id: 'e_pergjithshme', name: 'E përgjithshme (Të gjitha)', shortName: 'E përgjithshme', icon: '🌐' },
  ...CATEGORIES.map((c) => ({ id: c.id as OnlineCategoryId, name: c.name, shortName: c.shortName, icon: c.icon }))
];

type OnlineSubView = 
  | 'lobby'          // Select 1v1, Live, Friend code, or Online players list
  | 'matchmaking'    // "Duke kërkuar kundërshtar..."
  | 'match_found'    // "⚔️ KUNDËRSHTARI U GJET!" + Countdown 3, 2, 1
  | 'gameplay'       // Real-time questions with 10s timer
  | 'round_ranking'  // Live scoreboard after each question
  | 'final_results'; // Final victory screen with medals and stats

interface OnlineMultiplayerScreenProps {
  onQuit: () => void;
  preselectedFriend?: Friend;
}

export const OnlineMultiplayerScreen: React.FC<OnlineMultiplayerScreenProps> = ({ onQuit, preselectedFriend }) => {
  const { profile, friends, recordOnlineGame } = useGame();

  const [subView, setSubView] = useState<OnlineSubView>('lobby');
  const [multiplayerType, setMultiplayerType] = useState<'1v1' | 'live' | 'friend'>('1v1');

  // Category Selection for Online Duel (Default: 'e_pergjithshme'; 33 questions ordered from easiest to hardest)
  const [selectedCategory, setSelectedCategory] = useState<OnlineCategoryId>('e_pergjithshme');

  // Opponent info
  const [opponent, setOpponent] = useState({
    name: 'Arben',
    avatar: '👳',
    score: 0,
    hasAnswered: false,
    answerCorrect: false
  });

  // Additional live participants for 'live' mode
  const [livePlayers, setLivePlayers] = useState<Array<{ id: string; name: string; avatar: string; score: number }>>([]);

  // Friend challenge code
  const [myRoomCode, setMyRoomCode] = useState('458721');
  const [enteredFriendCode, setEnteredFriendCode] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);

  // Match countdown (3.. 2.. 1..)
  const [startCountdown, setStartCountdown] = useState(3);

  // Questions and Game session (11 questions, progressive difficulty simple -> difficult)
  const [matchQuestions, setMatchQuestions] = useState<Question[]>([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);

  // Timer per question (10s)
  const [questionTimer, setQuestionTimer] = useState(10);
  const questionStartTimeRef = useRef<number>(Date.now());

  // Player round answer state
  const [playerAnswer, setPlayerAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [playerHasAnswered, setPlayerHasAnswered] = useState(false);
  const [playerRoundScore, setPlayerRoundScore] = useState(0);
  const [playerRoundSpeed, setPlayerRoundSpeed] = useState(0);

  // Match cumulative stats
  const [playerTotalScore, setPlayerTotalScore] = useState(0);
  const [opponentTotalScore, setOpponentTotalScore] = useState(0);
  const [playerCorrectTotal, setPlayerCorrectTotal] = useState(0);
  const [playerIncorrectTotal, setPlayerIncorrectTotal] = useState(0);
  const [fastestAnswer, setFastestAnswer] = useState(999);
  const [speedsList, setSpeedsList] = useState<number[]>([]);

  // Round reveal state
  const [isRoundRevealed, setIsRoundRevealed] = useState(false);

  // Timer reference
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-start with preselected friend if passed
  useEffect(() => {
    if (preselectedFriend) {
      setMultiplayerType('friend');
      startMatchmaking(preselectedFriend.name, preselectedFriend.avatar);
    }
  }, [preselectedFriend]);

  // Start matchmaking sequence (33 questions ordered from simplest to most difficult)
  const startMatchmaking = (targetOpponentName?: string, targetAvatar?: string, catOverride?: OnlineCategoryId) => {
    sound.playClick();
    setSubView('matchmaking');
    const cat = catOverride || selectedCategory;
    // 33 questions with progressive difficulty (fillestar -> mesatar -> avancuar)
    const questions = getLive1v1Questions(cat);
    setMatchQuestions(questions);

    // Pick opponent
    const chosenOpponent = targetOpponentName 
      ? { name: targetOpponentName, avatar: targetAvatar || '👳' }
      : MOCK_ONLINE_PLAYERS[Math.floor(Math.random() * MOCK_ONLINE_PLAYERS.length)];

    // Simulate search delay then "KUNDËRSHTARI U GJET!"
    setTimeout(() => {
      setOpponent({
        name: chosenOpponent.name,
        avatar: chosenOpponent.avatar,
        score: 0,
        hasAnswered: false,
        answerCorrect: false
      });

      // If Live mode, populate 3 extra simulated live opponents
      if (multiplayerType === 'live') {
        setLivePlayers([
          { id: 'lp1', name: 'Sara', avatar: '🧕', score: 0 },
          { id: 'lp2', name: 'Elton', avatar: '🕌', score: 0 },
          { id: 'lp3', name: 'Besnik', avatar: '⭐', score: 0 }
        ]);
      }

      setSubView('match_found');
      setStartCountdown(3);

      // Countdown 3.. 2.. 1..
      let count = 3;
      const countInterval = setInterval(() => {
        count--;
        if (count > 0) {
          setStartCountdown(count);
          sound.playTimerTick();
        } else {
          clearInterval(countInterval);
          startRound(0);
        }
      }, 1000);
    }, 1800);
  };

  // Start a specific question round
  const startRound = (qIdx: number) => {
    setCurrentQIndex(qIdx);
    setPlayerAnswer(null);
    setPlayerHasAnswered(false);
    setPlayerRoundScore(0);
    setPlayerRoundSpeed(0);
    setIsRoundRevealed(false);
    setSubView('gameplay');

    setOpponent((prev) => ({
      ...prev,
      hasAnswered: false,
      answerCorrect: false
    }));

    setQuestionTimer(10);
    questionStartTimeRef.current = Date.now();

    // Clear any previous interval
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    // Simulate opponent response time between 1.8s and 7.5s
    const opponentReactionTimeMs = 1800 + Math.random() * 5700;
    const opponentWillBeCorrect = Math.random() > 0.28; // 72% chance of correct

    setTimeout(() => {
      setOpponent((prev) => {
        let oppScoreAdd = 0;
        if (opponentWillBeCorrect) {
          const oppSec = opponentReactionTimeMs / 1000;
          if (oppSec <= 2) oppScoreAdd = 100;
          else if (oppSec <= 4) oppScoreAdd = 80;
          else if (oppSec <= 6) oppScoreAdd = 60;
          else if (oppSec <= 8) oppScoreAdd = 40;
          else oppScoreAdd = 20;
        }
        return {
          ...prev,
          hasAnswered: true,
          answerCorrect: opponentWillBeCorrect,
          score: prev.score + oppScoreAdd
        };
      });

      // Also update other live players if live mode
      if (multiplayerType === 'live') {
        setLivePlayers((prev) =>
          prev.map((lp) => {
            const isCorr = Math.random() > 0.35;
            const pts = isCorr ? [100, 80, 60, 40][Math.floor(Math.random() * 4)] : 0;
            return { ...lp, score: lp.score + pts };
          })
        );
      }
    }, opponentReactionTimeMs);

    // Start 10s countdown
    timerIntervalRef.current = setInterval(() => {
      setQuestionTimer((prev) => {
        if (prev <= 1) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          revealRoundResults();
          return 0;
        }
        if (prev <= 4) sound.playTimerTick();
        return prev - 1;
      });
    }, 1000);
  };

  // Player answers
  const handlePlayerSubmit = (optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (playerHasAnswered || isRoundRevealed) return;

    sound.playClick();
    const elapsedSec = Math.max(0.1, Number(((Date.now() - questionStartTimeRef.current) / 1000).toFixed(1)));
    const currentQ = matchQuestions[currentQIndex];
    const isCorrect = optionKey === currentQ.correctAnswer;

    // Time-based scoring:
    // 0–2s: +100
    // 2–4s: +80
    // 4–6s: +60
    // 6–8s: +40
    // 8–10s: +20
    // Incorrect: 0
    let earned = 0;
    if (isCorrect) {
      if (elapsedSec <= 2.0) earned = 100;
      else if (elapsedSec <= 4.0) earned = 80;
      else if (elapsedSec <= 6.0) earned = 60;
      else if (elapsedSec <= 8.0) earned = 40;
      else earned = 20;

      sound.playCorrect();
      setPlayerCorrectTotal((prev) => prev + 1);
      setFastestAnswer((prev) => Math.min(prev, elapsedSec));
    } else {
      sound.playWrong();
      setPlayerIncorrectTotal((prev) => prev + 1);
    }

    setPlayerAnswer(optionKey);
    setPlayerHasAnswered(true);
    setPlayerRoundScore(earned);
    setPlayerRoundSpeed(elapsedSec);
    setPlayerTotalScore((prev) => prev + earned);
    setSpeedsList((prev) => [...prev, elapsedSec]);

    // If opponent already answered or within brief delay, reveal quickly
    setTimeout(() => {
      revealRoundResults();
    }, 1200);
  };

  // Reveal round results
  const revealRoundResults = () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    setIsRoundRevealed(true);

    // After 2.2s, transition to live ranking scoreboard
    setTimeout(() => {
      setSubView('round_ranking');
    }, 2200);
  };

  // Continue to next question or final
  const handleNextFromScoreboard = () => {
    sound.playClick();
    if (currentQIndex + 1 < matchQuestions.length) {
      startRound(currentQIndex + 1);
    } else {
      // Finalize match
      finishMatch();
    }
  };

  const finishMatch = () => {
    setSubView('final_results');
    const isWin = playerTotalScore > opponent.score;
    const finalFastest = fastestAnswer === 999 ? 0 : fastestAnswer;
    const avgSpd = speedsList.length > 0 
      ? Number((speedsList.reduce((a, b) => a + b, 0) / speedsList.length).toFixed(1)) 
      : 0;

    recordOnlineGame(isWin, playerTotalScore, finalFastest, avgSpd);

    if (isWin) {
      sound.playVictory();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch {
        // Ignore
      }
    }
  };

  const copyCodeToClipboard = () => {
    sound.playClick();
    navigator.clipboard?.writeText(myRoomCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const currentQ = matchQuestions[currentQIndex];

  // ====================== 1. LOBBY VIEW ======================
  if (subView === 'lobby') {
    return (
      <div className="relative min-h-[580px] h-full p-4 bg-slate-950 text-slate-100 overflow-y-auto">
        <IslamicPattern opacity={0.06} />

        <div className="relative z-10 space-y-4">
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border border-indigo-700/50 rounded-3xl p-4 shadow-xl text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-900/60 border border-indigo-500/50 text-indigo-300 mb-2">
              <Swords className="w-6 h-6 text-indigo-400" />
            </div>
            <h2 className="text-xl font-black text-white tracking-tight">
              Sfida Online në Kohë Reale
            </h2>
            <p className="text-xs text-indigo-300/90 mt-0.5 font-medium">
              Garoni me lojtarë të tjerë: Dijeni + Shpejtësi = Fitore!
            </p>
          </div>

          {/* Category Selector for Online Duel (No level selection; 33 questions ordered from easiest to hardest) */}
          <div className="bg-slate-900/95 border border-indigo-500/40 rounded-3xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Përzgjedhja e Kategorisë
                </h3>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  33 pyetje të renditura me vështirësi rritëse (nga më e thjeshta te më e vështira)
                </p>
              </div>
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-indigo-950 border border-indigo-700/60 text-indigo-300 shrink-0">
                33 Pyetje / Raund
              </span>
            </div>

            {/* Category Selector Chips */}
            <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {ONLINE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sound.playClick();
                      setSelectedCategory(cat.id);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-600 to-teal-600 text-white shadow-md border border-indigo-400/50 scale-105'
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.shortName}</span>
                  </button>
                );
              })}
            </div>

            {/* Explanatory description for selected category */}
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center gap-2 text-[11px] text-slate-300">
              <span className="text-amber-400 font-bold shrink-0">ℹ️ Rregulli:</span>
              <span>
                {selectedCategory === 'e_pergjithshme'
                  ? "Kategoria 'E përgjithshme' përmban 33 pyetje të përziera nga: Kur'ani, Profeti Muhamed (s.a.s), Fikhu, Hadithi, Historia, Akaidi dhe Profetët, duke nisur nga më e thjeshta drejt më të vështirës."
                  : `33 pyetje nga kategoria "${ONLINE_CATEGORIES.find((c) => c.id === selectedCategory)?.name}", të renditura nga më e thjeshta drejt më të vështirës.`}
              </span>
            </div>
          </div>

          {/* 3 Multiplayer Modes Selection */}
          <div className="space-y-2.5">
            {/* 1. Sfido një Lojtar (1 vs 1) */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setMultiplayerType('1v1');
                startMatchmaking();
              }}
              id="btn-online-1v1"
              className="w-full text-left p-4 rounded-2xl bg-slate-900 border border-indigo-700/40 hover:border-indigo-500 hover:bg-slate-850 transition-all flex items-center justify-between group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-indigo-950 border border-indigo-600/40 flex items-center justify-center text-indigo-400">
                  <Swords className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white group-hover:text-indigo-300 transition-colors">
                    1. Sfido një Lojtar (1 vs 1)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    33 pyetje me vështirësi rritëse (nga më e thjeshta drejt më të vështirës).
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-indigo-400 bg-indigo-950/80 px-2.5 py-1 rounded-xl border border-indigo-700/50">
                Gjej
              </span>
            </motion.button>

            {/* 2. Sfida Live (Multiplayer Room) */}
            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setMultiplayerType('live');
                startMatchmaking('Sara', '🧕');
              }}
              id="btn-online-live"
              className="w-full text-left p-4 rounded-2xl bg-slate-900 border border-emerald-700/40 hover:border-emerald-500 hover:bg-slate-850 transition-all flex items-center justify-between group shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-950 border border-emerald-600/40 flex items-center justify-center text-emerald-400">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                      2. Sfida Live
                    </h3>
                    <span className="text-[9px] font-bold bg-emerald-900 text-emerald-300 px-1.5 py-0.2 rounded-sm">
                      Dhomë Live
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Shumë lojtarë njëkohësisht me renditje live pas çdo pyetjeje.
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-xl border border-emerald-700/50">
                Bashkohu
              </span>
            </motion.button>

            {/* 3. Luaj me Miqtë nga Lista */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-teal-700/40 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-teal-950 border border-teal-600/40 flex items-center justify-center text-teal-400">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-white">
                      3. Zgjidh Mik nga Lista
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Sfido miqtë e tu të regjistruar drejtpërdrejt në Live 1 vs 1.
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-teal-300 bg-teal-950 px-2 py-0.5 rounded-md border border-teal-800">
                  {friends.length} Miq
                </span>
              </div>

              {/* Friends list scrollable */}
              {friends.length > 0 ? (
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {friends.map((friend) => (
                    <div
                      key={friend.id}
                      className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{friend.avatar}</span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${friend.isOnline ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                            <span className="text-xs font-bold text-white">{friend.name}</span>
                          </div>
                          <span className="text-[10px] text-slate-400">
                            {friend.levelName} • {friend.points} pikë
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setMultiplayerType('friend');
                          startMatchmaking(friend.name, friend.avatar);
                        }}
                        id={`btn-challenge-friend-${friend.id}`}
                        className="px-3 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-slate-950 font-black text-xs flex items-center gap-1 transition-all active:scale-95 shadow"
                      >
                        <Swords className="w-3.5 h-3.5" />
                        <span>Sfido</span>
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
                  Nuk keni shtuar miq ende. Shtoni miq nga menuja kryesore "Miqtë" ose përdorni kodin e sfidës më poshtë.
                </div>
              )}
            </div>

            {/* 4. Sfido një Mik (Private Code) */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-amber-700/40 shadow-md space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-950 border border-amber-600/40 flex items-center justify-center text-amber-400">
                  <Key className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">
                    4. Sfido me Kod Privat
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Krijo ose fut kodin e sfidës private për të luajtur bashkë.
                  </p>
                </div>
              </div>

              {/* My Challenge Code Box */}
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                    KODI YT I SFIDËS:
                  </span>
                  <span className="text-base font-black text-amber-400 tracking-widest">
                    {myRoomCode}
                  </span>
                </div>
                <button
                  onClick={copyCodeToClipboard}
                  id="btn-copy-code"
                  className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'U kopjua!' : 'Kopjo'}</span>
                </button>
              </div>

              {/* Enter Friend Code input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  maxLength={6}
                  value={enteredFriendCode}
                  onChange={(e) => setEnteredFriendCode(e.target.value.toUpperCase())}
                  placeholder="Shkruaj kodin e mikut..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 font-mono tracking-wider focus:outline-hidden focus:border-amber-500"
                />
                <button
                  onClick={() => {
                    setMultiplayerType('friend');
                    startMatchmaking('Miku yt', '🤝');
                  }}
                  id="btn-join-friend"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider transition-colors"
                >
                  Luaj
                </button>
              </div>
            </div>
          </div>

          {/* LOJTARË ONLINE (Direct Challenge List) */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                LOJTARË ONLINE
              </h3>
              <span className="text-[10px] text-slate-400 font-semibold">Të gatshëm për sfidë</span>
            </div>

            <div className="space-y-2">
              {MOCK_ONLINE_PLAYERS.filter((p) => p.isOnline).map((player) => (
                <div
                  key={player.id}
                  className="p-2.5 rounded-2xl bg-slate-950/80 border border-slate-850 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{player.avatar}</span>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-xs font-bold text-white">{player.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {player.levelName} • {player.points} pikë
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setMultiplayerType('1v1');
                      startMatchmaking(player.name, player.avatar);
                    }}
                    id={`btn-challenge-${player.name}`}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-950 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-300 hover:text-white text-xs font-bold transition-all active:scale-95"
                  >
                    <Swords className="w-3.5 h-3.5" />
                    <span>SFIDO</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ====================== 2. MATCHMAKING VIEW ======================
  if (subView === 'matchmaking') {
    return (
      <div className="relative min-h-[580px] h-full flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-100 text-center select-none">
        <IslamicPattern opacity={0.08} />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          className="w-20 h-20 rounded-full border-4 border-indigo-600/30 border-t-indigo-400 flex items-center justify-center mb-6 shadow-xl shadow-indigo-950"
        >
          <Swords className="w-8 h-8 text-indigo-400" />
        </motion.div>

        <h3 className="text-xl font-black text-white tracking-tight mb-2">
          Duke kërkuar kundërshtar...
        </h3>
        <p className="text-xs text-indigo-300 max-w-xs leading-relaxed">
          Po sinkronizojmë pyetjet me një lojtar tjetër online në Shqipëri, Kosovë dhe diasporë...
        </p>

        <div className="mt-8 flex items-center gap-2 text-xs font-bold text-slate-500">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Serveri aktiv • 10 pyetje sinkron</span>
        </div>
      </div>
    );
  }

  // ====================== 3. MATCH FOUND & COUNTDOWN ======================
  if (subView === 'match_found') {
    return (
      <div className="relative min-h-[580px] h-full flex flex-col items-center justify-center p-6 bg-slate-950 text-slate-100 text-center select-none">
        <IslamicPattern opacity={0.08} />

        <div className="relative z-10 space-y-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-600/50 text-emerald-300 text-xs font-extrabold uppercase tracking-widest">
            ⚔️ KUNDËRSHTARI U GJET!
          </div>

          {/* Versus Header Cards */}
          <div className="flex items-center justify-center gap-4 my-4">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center text-3xl shadow-lg">
                {profile.avatar}
              </div>
              <span className="text-xs font-bold text-white mt-1.5">{profile.name} (Ti)</span>
            </div>

            <div className="text-xl font-black text-amber-400 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              VS
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-950 border-2 border-indigo-500 flex items-center justify-center text-3xl shadow-lg">
                {opponent.avatar}
              </div>
              <span className="text-xs font-bold text-white mt-1.5">{opponent.name}</span>
            </div>
          </div>

          {/* 3.. 2.. 1.. Countdown Display */}
          <div className="py-4">
            <motion.div
              key={startCountdown}
              initial={{ scale: 1.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="text-6xl font-black text-amber-400 tracking-tight"
            >
              {startCountdown}
            </motion.div>
            <span className="text-xs font-extrabold text-slate-400 tracking-widest uppercase block mt-2">
              FILLON SFIDA!
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ====================== 4. REAL-TIME GAMEPLAY ======================
  if (subView === 'gameplay' && currentQ) {
    return (
      <div className="relative min-h-[580px] h-full flex flex-col justify-between p-4 bg-slate-950 text-slate-100 overflow-y-auto select-none">
        <IslamicPattern opacity={0.06} />

        {/* Top Battle Header: Opponent vs Player Live Scores */}
        <div className="relative z-10 space-y-2">
          <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-3 shadow-lg flex items-center justify-between">
            {/* Player Side */}
            <div className="flex items-center gap-2">
              <span className="text-2xl">{profile.avatar}</span>
              <div>
                <span className="text-xs font-black text-emerald-400 block truncate max-w-[85px]">
                  {profile.name}
                </span>
                <span className="text-xs font-black text-white">{playerTotalScore} pikë</span>
              </div>
            </div>

            {/* Center 10s Timer */}
            <div className="flex flex-col items-center">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 font-black text-lg transition-colors ${
                  questionTimer <= 3
                    ? 'border-rose-500 bg-rose-950/80 text-rose-400 animate-pulse'
                    : 'border-amber-400 bg-amber-950/60 text-amber-300'
                }`}
              >
                ⏱️ {questionTimer}
              </div>
              <span className="text-[9px] font-bold text-slate-400 mt-0.5">
                PYETJA {currentQIndex + 1}/{matchQuestions.length || 33}
              </span>
            </div>

            {/* Opponent Side */}
            <div className="flex items-center gap-2 text-right">
              <div>
                <span className="text-xs font-black text-indigo-400 block truncate max-w-[85px]">
                  {opponent.name}
                </span>
                <span className="text-xs font-black text-white">{opponent.score} pikë</span>
              </div>
              <span className="text-2xl">{opponent.avatar}</span>
            </div>
          </div>

          {/* Opponent Live Status Bar */}
          <div className="flex items-center justify-between text-[11px] px-2 text-slate-400 font-semibold">
            <span>
              {playerHasAnswered ? (
                <span className="text-emerald-400 font-bold">✓ Përgjigjja jote u regjistrua ({playerRoundSpeed}s)</span>
              ) : (
                <span>Zgjidh përgjigjen shpejt!</span>
              )}
            </span>
            <span>
              {opponent.hasAnswered ? (
                <span className="text-indigo-400 font-bold">✓ {opponent.name} u përgjigj!</span>
              ) : (
                <span className="italic">{opponent.name} po mendon...</span>
              )}
            </span>
          </div>
        </div>

        {/* Question Text Box */}
        <div className="relative z-10 my-auto py-2">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-900/95 border border-indigo-900/50 rounded-2xl p-4 shadow-xl mb-4 text-center"
          >
            <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
              {currentQ.question}
            </h3>
          </motion.div>

          {/* Four Answer Choices */}
          <div className="grid grid-cols-1 gap-2.5">
            {(['A', 'B', 'C', 'D'] as const).map((key) => {
              const isChosen = playerAnswer === key;
              const isCorrectAnswer = currentQ.correctAnswer === key;

              let btnClass = 'bg-slate-900/90 border-slate-800 text-slate-200 hover:bg-slate-850';

              if (playerHasAnswered) {
                if (isChosen) {
                  btnClass = 'bg-indigo-950 border-indigo-500 text-white font-bold ring-2 ring-indigo-400';
                } else {
                  btnClass = 'bg-slate-950/70 border-slate-850 text-slate-500 opacity-60';
                }
              }

              if (isRoundRevealed) {
                if (isCorrectAnswer) {
                  btnClass = 'bg-emerald-600/30 border-emerald-500 text-white font-bold ring-2 ring-emerald-400';
                } else if (isChosen && !isCorrectAnswer) {
                  btnClass = 'bg-rose-950/80 border-rose-600 text-rose-200 ring-1 ring-rose-500';
                }
              }

              return (
                <button
                  key={key}
                  disabled={playerHasAnswered || isRoundRevealed}
                  onClick={() => handlePlayerSubmit(key)}
                  id={`btn-online-option-${key}`}
                  className={`w-full text-left p-3.5 rounded-2xl border flex items-center gap-3 transition-all duration-150 ${btnClass}`}
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300">
                    {key}
                  </div>
                  <span className="text-sm font-medium flex-1">
                    {currentQ.options[key]}
                  </span>

                  {isRoundRevealed && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  )}
                  {isRoundRevealed && isChosen && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Feedback bottom message */}
          {playerHasAnswered && !isRoundRevealed && (
            <div className="mt-4 p-3 rounded-xl bg-indigo-950/80 border border-indigo-600/50 text-indigo-200 text-center text-xs font-bold">
              ✓ Përgjigjja u regjistrua! Po presim kundërshtarin ose skadimin e kohës...
            </div>
          )}

          {isRoundRevealed && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-200 text-center text-xs font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>
                Përgjigjja e saktë: {currentQ.options[currentQ.correctAnswer]} (+{playerRoundScore} pikë)
              </span>
            </div>
          )}
        </div>

        {/* Speed bonus indicator helper */}
        <div className="relative z-10 text-center text-[10px] text-slate-500">
          Shpejtësia: 0-2s (+100) • 2-4s (+80) • 4-6s (+60) • 6-8s (+40) • 8-10s (+20)
        </div>
      </div>
    );
  }

  // ====================== 5. LIVE ROUND SCOREBOARD ======================
  if (subView === 'round_ranking') {
    // Rank all current round players
    const matchRoster = [
      { name: `${profile.name} (Ti)`, avatar: profile.avatar, score: playerTotalScore, isUser: true },
      { name: opponent.name, avatar: opponent.avatar, score: opponent.score, isUser: false },
      ...(multiplayerType === 'live' ? livePlayers.map((lp) => ({ ...lp, isUser: false })) : [])
    ].sort((a, b) => b.score - a.score);

    return (
      <div className="relative min-h-[580px] h-full flex flex-col justify-between p-5 bg-slate-950 text-slate-100 select-none">
        <IslamicPattern opacity={0.06} />

        <div className="relative z-10 space-y-4">
          <div className="text-center pt-2">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
              Pas pyetjes {currentQIndex + 1}/{matchQuestions.length || 33}
            </span>
            <h3 className="text-xl font-black text-white tracking-tight flex items-center justify-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              RENDITJA LIVE
            </h3>
          </div>

          {/* Live Leaderboard List */}
          <div className="space-y-2.5 my-3">
            {matchRoster.map((player, idx) => {
              const medalsIcons = ['🥇', '🥈', '🥉'];
              return (
                <motion.div
                  key={player.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                    player.isUser
                      ? 'bg-emerald-950/80 border-emerald-500 shadow-md ring-1 ring-emerald-400'
                      : 'bg-slate-900/90 border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg w-6 text-center">
                      {medalsIcons[idx] || `#${idx + 1}`}
                    </span>
                    <span className="text-2xl">{player.avatar}</span>
                    <div>
                      <h4 className={`text-xs font-bold ${player.isUser ? 'text-emerald-300' : 'text-white'}`}>
                        {player.name}
                      </h4>
                      <span className="text-[10px] text-slate-400">
                        {idx === 0 ? 'Kryeson sfidën' : `Diferenca: ${matchRoster[0].score - player.score} pikë`}
                      </span>
                    </div>
                  </div>

                  <span className="text-sm font-black text-amber-400">
                    {player.score} pikë
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative z-10 pb-2">
          <button
            onClick={handleNextFromScoreboard}
            id="btn-online-next-round"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-lg shadow-emerald-950 flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
          >
            <span>{currentQIndex + 1 < matchQuestions.length ? 'Pyetja e Radhës' : 'Shiko Rezultatet Finale'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // ====================== 6. FINAL RESULTS ======================
  const isWinner = playerTotalScore > opponent.score;
  const isDraw = playerTotalScore === opponent.score;
  const winnerName = isWinner ? `${profile.name} (Ti)` : opponent.name;
  const totalQuestionsDone = matchQuestions.length;
  const accuracyPct = totalQuestionsDone > 0 ? Math.round((playerCorrectTotal / totalQuestionsDone) * 100) : 0;
  const avgSpeed = speedsList.length > 0 
    ? Number((speedsList.reduce((a, b) => a + b, 0) / speedsList.length).toFixed(1)) 
    : 0;

  return (
    <div className="relative min-h-[580px] h-full flex flex-col justify-between p-5 bg-gradient-to-b from-slate-950 via-indigo-950/60 to-slate-950 text-slate-100 overflow-y-auto select-none">
      <IslamicPattern opacity={0.08} />

      <div className="relative z-10 text-center pt-2">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-600 p-[2px] shadow-2xl shadow-amber-500/30 mb-2">
          <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-4xl">
            {isWinner ? '🏆' : isDraw ? '🤝' : '🥈'}
          </div>
        </div>

        <span className="text-xs font-black text-amber-400 tracking-widest uppercase block mb-1">
          SFIDA PËRFUNDOI!
        </span>

        <h2 className="text-2xl font-black text-white tracking-tight">
          {isWinner ? 'FITUESI: ' + profile.name : isDraw ? 'BARAZIM!' : 'FITUESI: ' + opponent.name}
        </h2>
      </div>

      {/* Winner Reward Box */}
      {isWinner && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-10 bg-amber-500/15 border border-amber-500/40 rounded-2xl p-3 text-center my-2"
        >
          <span className="text-xs font-black text-amber-300 flex items-center justify-center gap-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            +500 PIKË BONUS FITOREJE!
          </span>
          <span className="text-[11px] text-amber-200/80 mt-0.5 block font-medium">
            ⚔️ Arritje e re: Kampioni i Sfidës
          </span>
        </motion.div>
      )}

      {/* Final Scores Comparison */}
      <div className="relative z-10 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 shadow-xl space-y-3 my-2">
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className={`p-3 rounded-2xl border ${isWinner ? 'bg-emerald-950/60 border-emerald-500' : 'bg-slate-950 border-slate-850'}`}>
            <span className="text-xs font-bold text-slate-400 block">{profile.name} (Ti)</span>
            <span className="text-2xl font-black text-amber-400">{playerTotalScore} pikë</span>
            <span className="text-[10px] text-slate-400 block mt-1">{playerCorrectTotal}/{matchQuestions.length || 33} të sakta</span>
          </div>

          <div className={`p-3 rounded-2xl border ${!isWinner && !isDraw ? 'bg-emerald-950/60 border-emerald-500' : 'bg-slate-950 border-slate-850'}`}>
            <span className="text-xs font-bold text-slate-400 block">{opponent.name}</span>
            <span className="text-2xl font-black text-slate-200">{opponent.score} pikë</span>
            <span className="text-[10px] text-slate-400 block mt-1">Kundërshtari</span>
          </div>
        </div>

        {/* Detailed Stats Bento */}
        <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-slate-800">
          <div className="bg-slate-950/80 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Saktësia</span>
            <span className="text-xs font-extrabold text-white">{accuracyPct}%</span>
          </div>
          <div className="bg-slate-950/80 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Më e shpejta</span>
            <span className="text-xs font-extrabold text-amber-400">
              {fastestAnswer === 999 ? '-' : `${fastestAnswer}s`}
            </span>
          </div>
          <div className="bg-slate-950/80 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block">Mesatarja</span>
            <span className="text-xs font-extrabold text-sky-400">{avgSpeed}s</span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="relative z-10 space-y-2 pb-1">
        <button
          onClick={() => {
            sound.playClick();
            setSubView('lobby');
          }}
          id="btn-online-play-again"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-emerald-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 active:scale-[0.98]"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Luaj një Sfidë Tjetër</span>
        </button>

        <button
          onClick={onQuit}
          id="btn-online-quit-home"
          className="w-full py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white font-bold text-xs flex items-center justify-center gap-2"
        >
          <Home className="w-4 h-4" />
          <span>Kthehu në Menu</span>
        </button>
      </div>
    </div>
  );
};
