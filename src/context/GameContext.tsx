import React, { createContext, useContext, useEffect, useState } from 'react';
import { INITIAL_MEDALS, LEVELS, QUESTIONS_DATABASE, INITIAL_FRIENDS } from '../data/questions';
import { NEGATIVE_QUESTIONS } from '../data/negativeQuestions';
import { CategoryId, CustomLeague, GeographicRegion, LevelInfo, Medal, Question, UserProfile, Friend, GameMode } from '../types';
import { sound } from '../utils/audio';
import { getClassicLevelQuestions, getLive1v1Questions } from '../data/questionBank';

const STORAGE_KEY = 'sfida_e_dijes_user_profile';
const ACCOUNTS_STORAGE_KEY = 'sfida_e_dijes_accounts';
const ACTIVE_USER_KEY = 'sfida_e_dijes_active_user';
const LEAGUES_STORAGE_KEY = 'sfida_e_dijes_custom_leagues';
const FRIENDS_STORAGE_KEY = 'sfida_e_dijes_friends';

export const INITIAL_ORIGINAL_AVATARS = [
  '🕌', '👳', '🧕', '⭐', '🌟', '🌙', '📖', '🕊️'
];

export const PURCHASABLE_ORIGINAL_ICONS = [
  { icon: '🕋', name: 'Qabja e Shenjtë', desc: 'Simboli i Teuhidit dhe Kibla e besimtarëve', price: 1000 },
  { icon: '👑', name: 'Kurora e Dijes', desc: 'Për kampionët e përkushtuar', price: 1000 },
  { icon: '🛡️', name: 'Mburoja e Besimit', desc: 'Qëndresa e patundur', price: 1000 },
  { icon: '📿', name: 'Tespihet e Dritës', desc: 'Përkujtimi i përhershëm i Zotit', price: 1000 },
  { icon: '🌴', name: 'Hurma e Medinës', desc: 'Begatia dhe bujaria e qytetit profetik', price: 1000 },
  { icon: '🧭', name: 'Busulla e Kiblës', desc: 'Orientimi i sigurt i jetës', price: 1000 },
  { icon: '🏮', name: 'Feneri Ndriçues', desc: 'Drita e diturisë që shndrit rrugën', price: 1000 },
  { icon: '💎', name: 'Rubini i Diturisë', desc: 'Vlera e thellë e dijes fetare', price: 1000 },
  { icon: '🦅', name: 'Shqiponja Krenare', desc: 'Simboli kombëtar dhe forca shpirtërore', price: 1000 },
  { icon: '🌷', name: 'Trëndafili Islam', desc: 'Bukuria dhe pastërtia e virtytit', price: 1000 }
];

const DEFAULT_PROFILE: UserProfile = {
  name: 'Besimtari',
  userPin: '1234',
  avatar: '🕌',
  unlockedAvatars: ['🕌', '👳', '🧕', '⭐', '🌟', '🌙', '📖', '🕊️'],
  totalPoints: 200,
  currentLevel: 1,
  currentStreak: 0,
  highestStreak: 2,
  correctAnswers: 2,
  incorrectAnswers: 0,
  totalAnswered: 2,
  accuracyPercentage: 100,
  completedCategories: {
    kurani: 1,
    profeti: 1,
    fikhu: 0,
    hadithi: 0,
    historia: 0,
    akaidi: 0,
    profetet: 0
  },
  medals: ['level_1'],
  medalsDateEarned: {
    level_1: 'Sot'
  },
  gems: 60, // Starting gifts + daily
  coins: 500, // Starting wallet
  lastDailyGemsClaimDate: '',
  isLoggedIn: true,
  authProvider: 'none',
  geographicRegion: 'shqiperi',
  onlineGames: 0,
  onlineWins: 0,
  onlineLosses: 0,
  winPercentage: 0,
  totalOnlinePoints: 0,
  fastestAnswerTime: 0,
  averageAnswerSpeed: 0,
  onlineWinStreak: 0,
  highestOnlineWinStreak: 0,
  lastDailyChallengeDate: '',
  dailyChallengeCompleted: false,
  totalLives: 10,
  soundEnabled: true,
  bgMusicEnabled: true,
  structuredProgress: {}
};

interface LevelUpEvent {
  levelInfo: LevelInfo;
  bonusPoints: number;
}

interface GameContextType {
  profile: UserProfile;
  medals: Medal[];
  newLevelUp: LevelUpEvent | null;
  pendingLevelUp: LevelUpEvent | null;
  unlockedMedalPopup: Medal | null;
  dismissMedalPopup: () => void;
  showMedalPopup: (medal: Medal) => void;
  dailyGemsClaimedNotice: boolean;
  dismissDailyNotice: () => void;
  dismissLevelUp: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;
  loseLife: () => boolean;
  addLife: (amount?: number) => void;
  recordAnswer: (isCorrect: boolean, category: CategoryId, responseTimeSec?: number, mode?: GameMode, scoreMultiplier?: number) => { pointsEarned: number; streakBonus: number; isStreak: boolean; gemsEarned: number; coinsEarned: number };
  recordChallengeCompleted: (points: number, isPerfect?: boolean) => void;
  recordClassicLevelCompleted: (isPerfect: boolean) => void;
  recordSpeedChallengeCompleted: (score: number, correctCount: number) => void;
  recordOnlineGame: (isWin: boolean, earnedPoints: number, fastestTime: number, avgSpeed: number) => void;
  completeDailyChallenge: () => void;
  getRandomQuestions: (count: number, category?: CategoryId) => Question[];
  getQuestionsByCategory: (category: CategoryId, count?: number) => Question[];
  toggleSound: () => void;
  toggleBgMusic: () => void;
  resetProgress: () => void;

  // Economy methods
  convertCoinsToGems: (coinsAmount: number) => boolean;
  buyLifeWithGems: () => boolean;
  rescueMistakeWithGems: () => boolean;
  skipLevelWithGems: () => { success: boolean; message: string };
  buyAvatar: (avatarEmoji: string, price?: number) => boolean;
  claimDailyGems: () => boolean;
  spendGems: (amount: number) => boolean;

  // Auth & Account methods
  login: (username: string, pin: string) => { success: boolean; message?: string };
  register: (username: string, pin: string, provider?: 'google' | 'facebook' | 'instagram' | 'none', emailOrHandle?: string, avatar?: string) => { success: boolean; message?: string };
  linkSocial: (provider: 'google' | 'facebook' | 'instagram', emailOrHandle: string) => void;
  logout: () => void;

  // Region & Custom League methods
  setGeographicRegion: (region: GeographicRegion) => void;
  createCustomLeague: (name: string, icon: string) => CustomLeague;
  joinCustomLeague: (code: string) => { success: boolean; league?: CustomLeague; message?: string };
  leaveCustomLeague: () => void;
  getCustomLeagues: () => CustomLeague[];

  // Friends methods
  friends: Friend[];
  addFriend: (nameOrCode: string) => { success: boolean; message: string; friend?: Friend };
  removeFriend: (friendId: string) => void;

  // Additional Economy / Rescue methods
  rescueLivesWithGems: (type: 'single' | 'full') => { success: boolean; message: string };

  // Specialized Question Getters for 12,000 Classic and 99-question Live 1v1
  getClassicQuestionsForLevel: (levelNum: number) => Question[];
  getLive1v1QuestionsForCategory: (category: CategoryId, levelNum?: number) => Question[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    if (typeof window === 'undefined') return DEFAULT_PROFILE;
    try {
      const activeUser = localStorage.getItem(ACTIVE_USER_KEY);
      const accountsJson = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
      if (activeUser && accountsJson) {
        const accounts = JSON.parse(accountsJson);
        if (accounts[activeUser]) {
          return {
            ...DEFAULT_PROFILE,
            ...accounts[activeUser],
            isLoggedIn: true
          };
        }
      }

      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_PROFILE,
          ...parsed,
          unlockedAvatars: parsed.unlockedAvatars || DEFAULT_PROFILE.unlockedAvatars,
          gems: parsed.gems ?? DEFAULT_PROFILE.gems,
          coins: parsed.coins ?? DEFAULT_PROFILE.coins,
          currentLevel: parsed.currentLevel || 1,
          geographicRegion: parsed.geographicRegion || 'shqiperi',
          isLoggedIn: parsed.isLoggedIn !== false
        };
      }
    } catch {
      // Ignore
    }
    return DEFAULT_PROFILE;
  });

  const [medals, setMedals] = useState<Medal[]>(() => {
    return INITIAL_MEDALS.map((m) => {
      const isUnlocked = profile.medals.includes(m.id);
      return {
        ...m,
        unlocked: isUnlocked,
        dateEarned: profile.medalsDateEarned[m.id] || (isUnlocked ? 'E zhbllokuar' : undefined)
      };
    });
  });

  const [newLevelUp, setNewLevelUp] = useState<LevelUpEvent | null>(null);
  const [dailyGemsClaimedNotice, setDailyGemsClaimedNotice] = useState(false);
  const [unlockedMedalsQueue, setUnlockedMedalsQueue] = useState<Medal[]>([]);

  const unlockedMedalPopup = unlockedMedalsQueue[0] || null;

  const dismissMedalPopup = () => {
    setUnlockedMedalsQueue((prev) => prev.slice(1));
  };

  const showMedalPopup = (medal: Medal) => {
    setUnlockedMedalsQueue((prev) => {
      const exists = prev.some((m) => m.id === medal.id);
      return exists ? prev : [...prev, medal];
    });
  };

  const triggerMedalUnlock = (newMedalIds: string[], datesMap?: Record<string, string>) => {
    if (!newMedalIds || newMedalIds.length === 0) return;
    const medalObjects: Medal[] = newMedalIds.map((id) => {
      const found = INITIAL_MEDALS.find((m) => m.id === id);
      if (found) {
        return {
          ...found,
          unlocked: true,
          dateEarned: (datesMap && datesMap[id]) || 'Sapo u fitua'
        };
      }
      if (id.startsWith('level_')) {
        const lvl = id.replace('level_', '');
        return {
          id,
          name: `Medalja e Nivelit ${lvl}`,
          icon: '🌟',
          levelName: `Niveli ${lvl}`,
          requirement: `Arri me sukses nivelin ${lvl} në Sfidën e Dijes`,
          type: 'level',
          unlocked: true,
          dateEarned: (datesMap && datesMap[id]) || 'Sapo u fitua'
        };
      }
      return {
        id,
        name: 'Medalje Nderi',
        icon: '🎖️',
        levelName: 'Arritje e Veçantë',
        requirement: 'Plotëso sfidën me sukses',
        type: 'special',
        unlocked: true,
        dateEarned: (datesMap && datesMap[id]) || 'Sapo u fitua'
      };
    });

    setUnlockedMedalsQueue((prev) => {
      const existing = new Set(prev.map((m) => m.id));
      const filtered = medalObjects.filter((m) => !existing.has(m.id));
      return [...prev, ...filtered];
    });
  };

  const [friends, setFriends] = useState<Friend[]>(() => {
    if (typeof window === 'undefined') return INITIAL_FRIENDS;
    try {
      const saved = localStorage.getItem(FRIENDS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_FRIENDS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(FRIENDS_STORAGE_KEY, JSON.stringify(friends));
    } catch {
      // ignore
    }
  }, [friends]);

  // Synchronize audio state
  useEffect(() => {
    sound.setEnabled(profile.soundEnabled);
  }, [profile.soundEnabled]);

  // Persist profile and accounts
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
      if (profile.name) {
        const accountsJson = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
        const accounts = accountsJson ? JSON.parse(accountsJson) : {};
        accounts[profile.name.toLowerCase()] = profile;
        localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
        if (profile.isLoggedIn) {
          localStorage.setItem(ACTIVE_USER_KEY, profile.name.toLowerCase());
        }
      }
    } catch {
      // Ignore
    }
  }, [profile]);

  // Daily Free 10 Gems check on load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (profile.lastDailyGemsClaimDate !== today) {
      setProfile((prev) => ({
        ...prev,
        gems: prev.gems + 10,
        lastDailyGemsClaimDate: today
      }));
      setDailyGemsClaimedNotice(true);
    }
  }, []);

  // Check and unlock medals & level progression (1,200 levels = 12,000 questions)
  const checkProgression = (
    currentPoints: number, 
    updatedProfile: UserProfile, 
    previousMedals: string[] = profile.medals
  ): UserProfile => {
    // Current level is preserved and directly advances upon level completion (up to 1200 levels)
    const targetLevelNum = Math.max(1, Math.min(1200, updatedProfile.currentLevel));

    const newlyEarnedMedalIds: string[] = [];
    const datesMap = { ...updatedProfile.medalsDateEarned };
    const todayStr = new Date().toLocaleDateString('sq-AL', { day: '2-digit', month: '2-digit', year: 'numeric' });

    // Level medals (first 5 predefined, or dynamic milestones)
    for (let lvl = 1; lvl <= Math.min(5, targetLevelNum); lvl++) {
      const medalId = `level_${lvl}`;
      if (!updatedProfile.medals.includes(medalId)) {
        newlyEarnedMedalIds.push(medalId);
        datesMap[medalId] = todayStr;
      }
    }

    // Streak medals
    if (updatedProfile.highestStreak >= 5 && !updatedProfile.medals.includes('streak_5')) {
      newlyEarnedMedalIds.push('streak_5');
      datesMap['streak_5'] = todayStr;
    }
    if (updatedProfile.highestStreak >= 10 && !updatedProfile.medals.includes('streak_10')) {
      newlyEarnedMedalIds.push('streak_10');
      datesMap['streak_10'] = todayStr;
    }

    // Category mastery medals
    if ((updatedProfile.completedCategories['kurani'] || 0) >= 5 && !updatedProfile.medals.includes('cat_quran')) {
      newlyEarnedMedalIds.push('cat_quran');
      datesMap['cat_quran'] = todayStr;
    }
    if ((updatedProfile.completedCategories['profeti'] || 0) >= 5 && !updatedProfile.medals.includes('cat_prophet')) {
      newlyEarnedMedalIds.push('cat_prophet');
      datesMap['cat_prophet'] = todayStr;
    }
    if ((updatedProfile.completedCategories['fikhu'] || 0) >= 5 && !updatedProfile.medals.includes('cat_fiqh')) {
      newlyEarnedMedalIds.push('cat_fiqh');
      datesMap['cat_fiqh'] = todayStr;
    }
    if ((updatedProfile.completedCategories['hadithi'] || 0) >= 5 && !updatedProfile.medals.includes('cat_hadith')) {
      newlyEarnedMedalIds.push('cat_hadith');
      datesMap['cat_hadith'] = todayStr;
    }
    if ((updatedProfile.completedCategories['historia'] || 0) >= 5 && !updatedProfile.medals.includes('cat_history')) {
      newlyEarnedMedalIds.push('cat_history');
      datesMap['cat_history'] = todayStr;
    }
    if ((updatedProfile.completedCategories['akaidi'] || 0) >= 5 && !updatedProfile.medals.includes('cat_akaid')) {
      newlyEarnedMedalIds.push('cat_akaid');
      datesMap['cat_akaid'] = todayStr;
    }
    if ((updatedProfile.completedCategories['profetet'] || 0) >= 5 && !updatedProfile.medals.includes('cat_prophets')) {
      newlyEarnedMedalIds.push('cat_prophets');
      datesMap['cat_prophets'] = todayStr;
    }

    // Online medals
    if (updatedProfile.onlineWins >= 1 && !updatedProfile.medals.includes('online_duelisti')) {
      newlyEarnedMedalIds.push('online_duelisti');
      datesMap['online_duelisti'] = todayStr;
    }
    if (updatedProfile.onlineWins >= 5 && !updatedProfile.medals.includes('online_konkurrenti')) {
      newlyEarnedMedalIds.push('online_konkurrenti');
      datesMap['online_konkurrenti'] = todayStr;
    }
    if (updatedProfile.onlineWins >= 10 && !updatedProfile.medals.includes('online_kampioni')) {
      newlyEarnedMedalIds.push('online_kampioni');
      datesMap['online_kampioni'] = todayStr;
    }
    if (updatedProfile.onlineWins >= 25 && !updatedProfile.medals.includes('online_mjeshtri')) {
      newlyEarnedMedalIds.push('online_mjeshtri');
      datesMap['online_mjeshtri'] = todayStr;
    }
    if (updatedProfile.highestOnlineWinStreak >= 5 && !updatedProfile.medals.includes('online_pamposhtur')) {
      newlyEarnedMedalIds.push('online_pamposhtur');
      datesMap['online_pamposhtur'] = todayStr;
    }

    const allMedals = Array.from(new Set([...updatedProfile.medals, ...newlyEarnedMedalIds]));

    // Detect newly earned medals to trigger rewarding pop-up
    const freshlyEarnedIds = allMedals.filter((mId) => !previousMedals.includes(mId));
    if (freshlyEarnedIds.length > 0) {
      triggerMedalUnlock(freshlyEarnedIds, datesMap);
    }

    // Check if level increased
    if (targetLevelNum > updatedProfile.currentLevel) {
      const levelObj = LEVELS.find((l) => l.level === Math.min(5, targetLevelNum)) || {
        level: targetLevelNum,
        name: `Mjeshtër i Nivelit ${targetLevelNum}`,
        minPoints: (targetLevelNum - 1) * 400,
        maxPoints: targetLevelNum * 400,
        medalName: `Medalja e Nivelit ${targetLevelNum}`,
        medalIcon: '🌟',
        description: `Ke arritur me sukses nivelin ${targetLevelNum} në Sfidën e Dijes!`,
        badgeColor: '#10b981'
      };

      setNewLevelUp({
        levelInfo: levelObj,
        bonusPoints: 500
      });
      sound.playVictory();
      return {
        ...updatedProfile,
        currentLevel: targetLevelNum,
        totalPoints: updatedProfile.totalPoints + 500,
        medals: allMedals,
        medalsDateEarned: datesMap
      };
    }

    return {
      ...updatedProfile,
      medals: allMedals,
      medalsDateEarned: datesMap
    };
  };

  /**
   * Shpërblimet për çdo pyetje:
   * Kategoria Klasike:
   * - 10 pikë për çdo përgjigje të saktë
   * - 1 gem për çdo përgjigje të saktë
   * - 10 coins për çdo përgjigje të saktë
   */
  const recordAnswer = (
    isCorrect: boolean,
    category: CategoryId,
    _responseTimeSec?: number,
    mode: GameMode = 'classic',
    scoreMultiplier: number = 1
  ) => {
    let pointsEarned = 0;
    let streakBonus = 0;
    let isStreak = false;
    let gemsEarned = 0;
    let coinsEarned = 0;

    const mult = scoreMultiplier && scoreMultiplier > 1 ? scoreMultiplier : 1;

    setProfile((prev) => {
      const isClassicMode = mode === 'classic';

      if (isClassicMode) {
        // Rregullat strikte të Sfidës Klasike:
        // Lojtari fiton 10 pikë (ose 10 * mult me Double Score), 1 gem dhe 10 coins për çdo përgjigje të saktë
        pointsEarned = (isCorrect ? 10 : 0) * mult;
        gemsEarned = isCorrect ? 1 : 0;
        coinsEarned = isCorrect ? 10 : 0;
        streakBonus = 0;
        isStreak = false;
      } else {
        const levelMult = Math.max(1, prev.currentLevel);
        gemsEarned = isCorrect ? 1 * levelMult : 0;
        coinsEarned = isCorrect ? 10 : 0;

        if (isCorrect) {
          pointsEarned = 100 * mult;
          const newStreak = prev.currentStreak + 1;
          if (newStreak === 3) {
            streakBonus = 50;
            isStreak = true;
            sound.playStreak();
          } else if (newStreak === 5 || (newStreak > 5 && newStreak % 5 === 0)) {
            streakBonus = 100;
            isStreak = true;
            sound.playStreak();
          }
        }
      }

      const newTotalAnswered = prev.totalAnswered + 1;
      const newCorrect = isCorrect ? prev.correctAnswers + 1 : prev.correctAnswers;
      const newIncorrect = !isCorrect ? prev.incorrectAnswers + 1 : prev.incorrectAnswers;
      const newStreak = isCorrect ? prev.currentStreak + 1 : 0;
      const newHighestStreak = Math.max(prev.highestStreak, newStreak);
      const newAccuracy = Math.round((newCorrect / newTotalAnswered) * 100);

      const totalGain = pointsEarned + streakBonus;
      const newTotalPoints = prev.totalPoints + totalGain;

      const newCategories = {
        ...prev.completedCategories,
        [category]: (prev.completedCategories[category] || 0) + (isCorrect ? 1 : 0)
      };

      const intermediate: UserProfile = {
        ...prev,
        totalPoints: newTotalPoints,
        currentStreak: newStreak,
        highestStreak: newHighestStreak,
        correctAnswers: newCorrect,
        incorrectAnswers: newIncorrect,
        totalAnswered: newTotalAnswered,
        accuracyPercentage: newAccuracy,
        completedCategories: newCategories,
        gems: prev.gems + gemsEarned,
        coins: prev.coins + coinsEarned
      };

      return checkProgression(newTotalPoints, intermediate, prev.medals);
    });

    return { pointsEarned, streakBonus, isStreak, gemsEarned, coinsEarned };
  };

  /**
   * SFIDA KLASIKE - Përfundimi i Nivelit:
   * - Lojtari fiton 100 pikë bonus nëse i përgjigjet saktë të 10 pyetjeve të nivelit (10/10).
   * - Lojtari fiton 10 gems bonus nëse i përgjigjet saktë të 10 pyetjeve të nivelit (10/10).
   * - Lojtari fiton 100 coins bonus nëse i përgjigjet saktë të 10 pyetjeve të nivelit (10/10).
   * - Kalon automatikisht në nivelin pasardhës (nga 1 deri në 1200).
   */
  const recordClassicLevelCompleted = (isPerfect: boolean) => {
    setProfile((prev) => {
      const bonusPoints = isPerfect ? 100 : 0;
      const bonusGems = isPerfect ? 10 : 0;
      const bonusCoins = isPerfect ? 100 : 0;

      const newPoints = prev.totalPoints + bonusPoints;
      const nextLevel = Math.min(1200, prev.currentLevel + 1);

      return checkProgression(newPoints, {
        ...prev,
        totalPoints: newPoints,
        currentLevel: nextLevel,
        gems: prev.gems + bonusGems,
        coins: prev.coins + bonusCoins
      }, prev.medals);
    });
  };

  /**
   * Challenge completion:
   * Bonus for other modes / generic completion
   */
  const recordChallengeCompleted = (bonusPoints: number, isPerfect = false) => {
    setProfile((prev) => {
      const levelMult = Math.max(1, prev.currentLevel);
      const bonusGems = isPerfect ? 10 * levelMult : 0;
      const bonusCoins = isPerfect ? 100 : 0;

      const newPoints = prev.totalPoints + bonusPoints + (isPerfect ? 200 : 100);
      const nextLevel = Math.min(1200, prev.currentLevel + 1);

      return checkProgression(newPoints, {
        ...prev,
        totalPoints: newPoints,
        currentLevel: nextLevel,
        gems: prev.gems + bonusGems,
        coins: prev.coins + bonusCoins
      }, prev.medals);
    });
  };

  const recordOnlineGame = (isWin: boolean, earnedPoints: number, fastestTime: number, avgSpeed: number) => {
    setProfile((prev) => {
      const newGames = prev.onlineGames + 1;
      const newWins = isWin ? prev.onlineWins + 1 : prev.onlineWins;
      const newLosses = !isWin ? prev.onlineLosses + 1 : prev.onlineLosses;
      const newWinRate = Math.round((newWins / newGames) * 100);
      const newOnlineWinStreak = isWin ? prev.onlineWinStreak + 1 : 0;
      const newHighestWinStreak = Math.max(prev.highestOnlineWinStreak, newOnlineWinStreak);
      const winReward = isWin ? 500 : 0;
      const totalPointsGain = earnedPoints + winReward;
      const newTotalPoints = prev.totalPoints + totalPointsGain;
      const newOnlinePoints = prev.totalOnlinePoints + totalPointsGain;

      // Online rewards: +5 gems and +50 coins for win
      const onlineGems = isWin ? 5 : 1;
      const onlineCoins = isWin ? 50 : 10;

      const updatedFastest = prev.fastestAnswerTime === 0 
        ? fastestTime 
        : fastestTime > 0 
          ? Math.min(prev.fastestAnswerTime, fastestTime) 
          : prev.fastestAnswerTime;

      const updatedAvgSpeed = prev.averageAnswerSpeed === 0 
        ? avgSpeed 
        : Number(((prev.averageAnswerSpeed * prev.onlineGames + avgSpeed) / newGames).toFixed(1));

      const intermediate: UserProfile = {
        ...prev,
        totalPoints: newTotalPoints,
        totalOnlinePoints: newOnlinePoints,
        onlineGames: newGames,
        onlineWins: newWins,
        onlineLosses: newLosses,
        winPercentage: newWinRate,
        onlineWinStreak: newOnlineWinStreak,
        highestOnlineWinStreak: newHighestWinStreak,
        fastestAnswerTime: updatedFastest,
        averageAnswerSpeed: updatedAvgSpeed,
        gems: prev.gems + onlineGems,
        coins: prev.coins + onlineCoins
      };

      return checkProgression(newTotalPoints, intermediate, prev.medals);
    });
  };

  const completeDailyChallenge = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayStr = new Date().toLocaleDateString('sq-AL');
    setProfile((prev) => {
      const bonus = 500;
      const newPoints = prev.totalPoints + bonus;
      const newMedals = prev.medals.includes('daily_badge') ? prev.medals : [...prev.medals, 'daily_badge'];
      const datesMap = { ...prev.medalsDateEarned, daily_badge: todayStr };

      return checkProgression(newPoints, {
        ...prev,
        totalPoints: newPoints,
        medals: newMedals,
        medalsDateEarned: datesMap,
        lastDailyChallengeDate: today,
        dailyChallengeCompleted: true,
        gems: prev.gems + 15,
        coins: prev.coins + 150
      }, prev.medals);
    });
  };

  const recordSpeedChallengeCompleted = (score: number, correctCount: number) => {
    const todayStr = new Date().toLocaleDateString('sq-AL');
    setProfile((prev) => {
      const newMedals = [...prev.medals];
      const datesMap = { ...prev.medalsDateEarned };

      if (!newMedals.includes('speed_champion')) {
        newMedals.push('speed_champion');
        datesMap['speed_champion'] = todayStr;
      }
      if (correctCount >= 15 && !newMedals.includes('speed_expert')) {
        newMedals.push('speed_expert');
        datesMap['speed_expert'] = todayStr;
      }

      return checkProgression(prev.totalPoints, {
        ...prev,
        medals: newMedals,
        medalsDateEarned: datesMap,
        gems: prev.gems + Math.floor(correctCount / 2),
        coins: prev.coins + correctCount * 10
      }, prev.medals);
    });
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const toggleSound = () => {
    setProfile((prev) => {
      const next = !prev.soundEnabled;
      sound.setEnabled(next);
      return { ...prev, soundEnabled: next };
    });
  };

  const toggleBgMusic = () => {
    setProfile((prev) => {
      const next = !prev.bgMusicEnabled;
      sound.setBgMusicEnabled(next);
      return { ...prev, bgMusicEnabled: next };
    });
  };

  const dismissLevelUp = () => {
    setNewLevelUp(null);
  };

  const dismissDailyNotice = () => {
    setDailyGemsClaimedNotice(false);
  };

  const resetProgress = () => {
    setProfile(DEFAULT_PROFILE);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(ACTIVE_USER_KEY);
  };

  const loseLife = (): boolean => {
    let remaining = 0;
    setProfile((prev) => {
      remaining = Math.max(0, (prev.totalLives ?? 10) - 1);
      return {
        ...prev,
        totalLives: remaining
      };
    });
    return remaining > 0;
  };

  const addLife = (amount = 1) => {
    setProfile((prev) => {
      const nextLives = Math.min(10, (prev.totalLives ?? 10) + amount);
      return {
        ...prev,
        totalLives: nextLives
      };
    });
  };

  // --- Economy Actions ---
  // 1. Convert coins to gems (100 coins = 1 gem)
  const convertCoinsToGems = (coinsAmount: number): boolean => {
    if (coinsAmount < 100 || profile.coins < coinsAmount) return false;
    const gemsToGain = Math.floor(coinsAmount / 100);
    const coinsToSpend = gemsToGain * 100;
    setProfile((prev) => ({
      ...prev,
      coins: prev.coins - coinsToSpend,
      gems: prev.gems + gemsToGain
    }));
    sound.playReward();
    return true;
  };

  // 2. Buy life with gems (10 gems = 1 life, max 10)
  const buyLifeWithGems = (): boolean => {
    if (profile.gems < 10 || profile.totalLives >= 10) return false;
    setProfile((prev) => ({
      ...prev,
      gems: prev.gems - 10,
      totalLives: Math.min(10, prev.totalLives + 1)
    }));
    sound.playReward();
    return true;
  };

  // 3. Rescue from mistake when reaching 5th mistake (5 gems)
  const rescueMistakeWithGems = (): boolean => {
    if (profile.gems < 5) return false;
    setProfile((prev) => ({
      ...prev,
      gems: prev.gems - 5,
      totalLives: Math.min(10, prev.totalLives + 1)
    }));
    sound.playReward();
    return true;
  };

  // 4. Skip level with gems (500 gems for lvl 1-5; 1000 gems for lvl > 5)
  const skipLevelWithGems = (): { success: boolean; message: string } => {
    const cost = profile.currentLevel <= 5 ? 500 : 1000;
    if (profile.gems < cost) {
      return {
        success: false,
        message: `Ju duhen ${cost} gems për të kaluar këtë nivel. Aktualisht keni ${profile.gems} gems.`
      };
    }
    const nextLevel = Math.min(1200, profile.currentLevel + 1);
    setProfile((prev) => ({
      ...prev,
      gems: prev.gems - cost,
      currentLevel: nextLevel,
      totalPoints: prev.totalPoints + 400
    }));
    sound.playVictory();
    return {
      success: true,
      message: `Urime! Kaluat me sukses në Nivelin ${nextLevel}.`
    };
  };

  // 5. Buy original icon with coins (1000 coins)
  const buyAvatar = (avatarEmoji: string, price = 1000): boolean => {
    if (profile.unlockedAvatars.includes(avatarEmoji)) {
      // Already unlocked, just equip it
      setProfile((prev) => ({ ...prev, avatar: avatarEmoji }));
      sound.playClick();
      return true;
    }
    if (profile.coins < price) return false;
    setProfile((prev) => ({
      ...prev,
      coins: prev.coins - price,
      unlockedAvatars: [...prev.unlockedAvatars, avatarEmoji],
      avatar: avatarEmoji
    }));
    sound.playReward();
    return true;
  };

  // 6. Manual claim of daily 10 gems if not yet claimed
  const claimDailyGems = (): boolean => {
    const today = new Date().toISOString().split('T')[0];
    if (profile.lastDailyGemsClaimDate === today) return false;
    setProfile((prev) => ({
      ...prev,
      gems: prev.gems + 10,
      lastDailyGemsClaimDate: today
    }));
    sound.playReward();
    return true;
  };

  // 7. Generic spend gems method (e.g. for Double Score)
  const spendGems = (amount: number): boolean => {
    if (profile.gems < amount) return false;
    setProfile((prev) => ({
      ...prev,
      gems: Math.max(0, prev.gems - amount)
    }));
    return true;
  };

  // --- Friends System ---
  const addFriend = (nameOrCode: string): { success: boolean; message: string; friend?: Friend } => {
    const query = nameOrCode.trim();
    if (!query) {
      return { success: false, message: 'Ju lutem shkruani një emër ose kod lojtari!' };
    }

    const cleanCode = query.toUpperCase().replace(/^#/, '');
    const alreadyExists = friends.some(
      (f) => f.userCode.toUpperCase() === cleanCode || f.name.toLowerCase() === query.toLowerCase()
    );

    if (alreadyExists) {
      return { success: false, message: 'Ky lojtar tashmë gjendet në listën tuaj të miqve!' };
    }

    const avatars = ['👳', '🧕', '⭐', '🌟', '🌙', '🕌', '🦅', '🕊️'];
    const newFriend: Friend = {
      id: `fr_${Date.now()}`,
      name: query.length <= 15 ? query : query.slice(0, 15),
      avatar: avatars[Math.floor(Math.random() * avatars.length)],
      userCode: cleanCode.length >= 4 ? cleanCode : `MIK-${Math.floor(10 + Math.random() * 90)}`,
      isOnline: true,
      points: Math.floor(800 + Math.random() * 2500),
      levelName: 'Nxënësi',
      winStreak: Math.floor(Math.random() * 4),
      winPercentage: Math.floor(55 + Math.random() * 35),
      statusMessage: 'Gati për duele në Live 1 vs 1!'
    };

    setFriends((prev) => [newFriend, ...prev]);
    sound.playReward();
    return {
      success: true,
      message: `Miku "${newFriend.name}" u shtua me sukses në listë!`,
      friend: newFriend
    };
  };

  const removeFriend = (friendId: string) => {
    setFriends((prev) => prev.filter((f) => f.id !== friendId));
    sound.playClick();
  };

  // --- Life Recovery with Gems ---
  const rescueLivesWithGems = (type: 'single' | 'full'): { success: boolean; message: string } => {
    const cost = type === 'single' ? 5 : 15;
    const livesToAdd = type === 'single' ? 1 : 5;

    if (profile.gems < cost) {
      return {
        success: false,
        message: `Ju duhen ${cost} gems për këtë rikuperim. Aktualisht keni vetëm ${profile.gems} gems.`
      };
    }

    setProfile((prev) => ({
      ...prev,
      gems: prev.gems - cost,
      totalLives: Math.min(10, (prev.totalLives ?? 10) + livesToAdd)
    }));

    sound.playVictory();
    return {
      success: true,
      message: type === 'single' 
        ? 'Rikuperuat me sukses +1 jetë!' 
        : 'Mbushët me sukses 5 jetët e nivelit me gems!'
    };
  };

  const getClassicQuestionsForLevel = (levelNum: number): Question[] => {
    return getClassicLevelQuestions(levelNum, QUESTIONS_DATABASE);
  };

  const getLive1v1QuestionsForCategory = (category: CategoryId, levelNum = 1): Question[] => {
    return getLive1v1Questions(category, levelNum);
  };

  // --- Authentication System ---
  const login = (username: string, pin: string): { success: boolean; message?: string } => {
    const cleanName = username.trim();
    if (!cleanName) return { success: false, message: 'Ju lutem shkruani emrin tuaj.' };
    const accountsJson = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    const accounts = accountsJson ? JSON.parse(accountsJson) : {};
    const key = cleanName.toLowerCase();

    if (accounts[key]) {
      const stored = accounts[key];
      if (stored.userPin && stored.userPin !== pin) {
        return { success: false, message: 'Kodi i vendosur nuk është i saktë!' };
      }
      setProfile({
        ...DEFAULT_PROFILE,
        ...stored,
        isLoggedIn: true
      });
      localStorage.setItem(ACTIVE_USER_KEY, key);
      sound.playClick();
      return { success: true };
    }

    // Auto-create if not exists
    const newProf: UserProfile = {
      ...DEFAULT_PROFILE,
      name: cleanName,
      userPin: pin || '1234',
      isLoggedIn: true
    };
    accounts[key] = newProf;
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
    localStorage.setItem(ACTIVE_USER_KEY, key);
    setProfile(newProf);
    sound.playClick();
    return { success: true };
  };

  const register = (
    username: string,
    pin: string,
    provider: 'google' | 'facebook' | 'instagram' | 'none' = 'none',
    emailOrHandle = '',
    avatar = '🕌'
  ): { success: boolean; message?: string } => {
    const cleanName = username.trim();
    if (!cleanName) return { success: false, message: 'Ju lutem shkruani një emër për llogarinë.' };
    if (!pin || pin.length < 3) return { success: false, message: 'Kodi duhet të ketë të paktën 3 karaktere.' };

    const accountsJson = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    const accounts = accountsJson ? JSON.parse(accountsJson) : {};
    const key = cleanName.toLowerCase();

    const newProf: UserProfile = {
      ...DEFAULT_PROFILE,
      name: cleanName,
      userPin: pin,
      avatar,
      authProvider: provider,
      linkedEmail: provider === 'google' ? emailOrHandle : undefined,
      linkedSocialHandle: provider !== 'google' && provider !== 'none' ? emailOrHandle : undefined,
      isLoggedIn: true
    };

    accounts[key] = newProf;
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
    localStorage.setItem(ACTIVE_USER_KEY, key);
    setProfile(newProf);
    sound.playReward();
    return { success: true };
  };

  const linkSocial = (provider: 'google' | 'facebook' | 'instagram', emailOrHandle: string) => {
    setProfile((prev) => {
      const updated: UserProfile = {
        ...prev,
        authProvider: provider,
        linkedEmail: provider === 'google' ? emailOrHandle : prev.linkedEmail,
        linkedSocialHandle: provider !== 'google' ? emailOrHandle : prev.linkedSocialHandle
      };
      return updated;
    });
    sound.playReward();
  };

  const logout = () => {
    sound.playClick();
    localStorage.removeItem(ACTIVE_USER_KEY);
    setProfile((prev) => ({
      ...prev,
      isLoggedIn: false
    }));
  };

  // --- Geographic Region & Custom Leagues ---
  const setGeographicRegion = (region: GeographicRegion) => {
    sound.playClick();
    setProfile((prev) => ({ ...prev, geographicRegion: region }));
  };

  const getCustomLeagues = (): CustomLeague[] => {
    try {
      const saved = localStorage.getItem(LEAGUES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return [
      { id: 'l1', name: 'Drita e Dijes', code: 'DRITA-77', icon: '🌟', creatorName: 'Hafiz Ilir', memberCount: 18, totalPoints: 24500, rank: 1 },
      { id: 'l2', name: 'Besimtarët e Bashkuar', code: 'BASHKIM-99', icon: '🕌', creatorName: 'Ermal K.', memberCount: 14, totalPoints: 19800, rank: 2 },
      { id: 'l3', name: 'Kampionët e Kur\'anit', code: 'KURAN-11', icon: '📖', creatorName: 'Amina B.', memberCount: 22, totalPoints: 31200, rank: 3 }
    ];
  };

  const createCustomLeague = (name: string, icon: string): CustomLeague => {
    const code = `${name.slice(0, 5).toUpperCase().replace(/[^A-Z]/g, 'X')}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLeague: CustomLeague = {
      id: `league_${Date.now()}`,
      name: name.trim() || 'Liga Ime',
      code,
      icon,
      creatorName: profile.name,
      memberCount: 1,
      totalPoints: profile.totalPoints,
      rank: 1
    };

    const currentLeagues = getCustomLeagues();
    const updatedLeagues = [newLeague, ...currentLeagues];
    localStorage.setItem(LEAGUES_STORAGE_KEY, JSON.stringify(updatedLeagues));

    setProfile((prev) => ({
      ...prev,
      customLeague: {
        id: newLeague.id,
        name: newLeague.name,
        code: newLeague.code,
        icon: newLeague.icon,
        role: 'creator'
      }
    }));

    sound.playVictory();
    return newLeague;
  };

  const joinCustomLeague = (code: string): { success: boolean; league?: CustomLeague; message?: string } => {
    const cleanCode = code.trim().toUpperCase();
    const leagues = getCustomLeagues();
    const found = leagues.find((l) => l.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Kodi i Ligës nuk u gjet. Kontrolloni shkronjat dhe numrat.' };
    }

    // Update league member count
    found.memberCount += 1;
    found.totalPoints += profile.totalPoints;
    localStorage.setItem(LEAGUES_STORAGE_KEY, JSON.stringify(leagues));

    setProfile((prev) => ({
      ...prev,
      customLeague: {
        id: found.id,
        name: found.name,
        code: found.code,
        icon: found.icon,
        role: 'member'
      }
    }));

    sound.playVictory();
    return { success: true, league: found };
  };

  const leaveCustomLeague = () => {
    sound.playClick();
    setProfile((prev) => ({ ...prev, customLeague: undefined }));
  };

  const getRandomQuestions = (count: number, category?: CategoryId): Question[] => {
    let pool = [...QUESTIONS_DATABASE, ...NEGATIVE_QUESTIONS];
    if (category) {
      pool = pool.filter((q) => q.category === category);
    }
    const shuffled = [...pool];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selected: Question[] = [];
    const seenTexts = new Set<string>();
    for (const q of shuffled) {
      const normalized = q.question.trim().toLowerCase();
      if (!seenTexts.has(normalized)) {
        seenTexts.add(normalized);
        selected.push(q);
        if (selected.length >= count) break;
      }
    }
    return selected;
  };

  const getQuestionsByCategory = (category: CategoryId, count = 10): Question[] => {
    return getRandomQuestions(count, category);
  };

  useEffect(() => {
    setMedals((prevMedals) =>
      prevMedals.map((m) => ({
        ...m,
        unlocked: profile.medals.includes(m.id),
        dateEarned: profile.medalsDateEarned[m.id] || (profile.medals.includes(m.id) ? 'E fituar' : undefined)
      }))
    );
  }, [profile.medals, profile.medalsDateEarned]);

  return (
    <GameContext.Provider
      value={{
        profile,
        medals,
        newLevelUp,
        pendingLevelUp: newLevelUp,
        unlockedMedalPopup,
        dismissMedalPopup,
        showMedalPopup,
        dailyGemsClaimedNotice,
        dismissDailyNotice,
        dismissLevelUp,
        updateProfile,
        loseLife,
        addLife,
        recordAnswer,
        recordChallengeCompleted,
        recordClassicLevelCompleted,
        recordSpeedChallengeCompleted,
        recordOnlineGame,
        completeDailyChallenge,
        getRandomQuestions,
        getQuestionsByCategory,
        toggleSound,
        toggleBgMusic,
        resetProgress,
        convertCoinsToGems,
        buyLifeWithGems,
        rescueMistakeWithGems,
        skipLevelWithGems,
        buyAvatar,
        claimDailyGems,
        spendGems,
        login,
        register,
        linkSocial,
        logout,
        setGeographicRegion,
        createCustomLeague,
        joinCustomLeague,
        leaveCustomLeague,
        getCustomLeagues,
        friends,
        addFriend,
        removeFriend,
        rescueLivesWithGems,
        getClassicQuestionsForLevel,
        getLive1v1QuestionsForCategory
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
