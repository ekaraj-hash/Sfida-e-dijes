export type CategoryId = 'kurani' | 'profeti' | 'fikhu' | 'hadithi' | 'historia' | 'akaidi' | 'profetet';
export type OnlineCategoryId = CategoryId | 'e_pergjithshme';

export interface Category {
  id: CategoryId;
  name: string;
  shortName: string;
  description: string;
  icon: string;
  totalQuestions: number;
  color: string;
  gradient: string;
}

export interface Question {
  id: string;
  category: CategoryId;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  difficulty: 'fillestar' | 'mesatar' | 'avancuar';
  hint: string;
  explanation: string; // "📚 Mëso më shumë"
}

export interface LevelInfo {
  level: number;
  name: string;
  minPoints: number;
  maxPoints: number;
  medalName: string;
  medalIcon: string;
  description: string;
  badgeColor: string;
}

export interface Medal {
  id: string;
  name: string;
  icon: string;
  levelName: string;
  requirement: string;
  type: 'level' | 'online' | 'streak' | 'special' | 'category';
  dateEarned?: string;
  unlocked: boolean;
}

export type GeographicRegion = 'shqiperi' | 'kosove' | 'maqedoni' | 'ballkan' | 'europe' | 'global';

export interface CustomLeague {
  id: string;
  name: string;
  code: string;
  icon: string;
  creatorName: string;
  memberCount: number;
  totalPoints: number;
  rank: number;
}

export interface UserProfile {
  name: string;
  userPin?: string;
  avatar: string;
  unlockedAvatars: string[];
  totalPoints: number;
  currentLevel: number; // 1 to 1200 (12,000 pyetje gjithsej)
  currentStreak: number;
  highestStreak: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalAnswered: number;
  accuracyPercentage: number;
  completedCategories: Record<CategoryId, number>;
  medals: string[]; // IDs of earned medals
  medalsDateEarned: Record<string, string>; // medalId -> date string
  
  // Economy: Gems & Coins
  gems: number;
  coins: number;
  lastDailyGemsClaimDate?: string;

  // Account & Social linking
  authProvider?: 'google' | 'facebook' | 'instagram' | 'none';
  linkedEmail?: string;
  linkedSocialHandle?: string;
  isLoggedIn: boolean;

  // Geographic Region & League
  geographicRegion: GeographicRegion;
  customLeague?: {
    id: string;
    name: string;
    code: string;
    icon: string;
    role: 'creator' | 'member';
  };

  // Online / Multiplayer Stats
  onlineGames: number;
  onlineWins: number;
  onlineLosses: number;
  winPercentage: number;
  totalOnlinePoints: number;
  fastestAnswerTime: number; // in seconds
  averageAnswerSpeed: number; // in seconds
  onlineWinStreak: number;
  highestOnlineWinStreak: number;

  // Daily Challenge status
  lastDailyChallengeDate?: string;
  dailyChallengeCompleted: boolean;

  // Lives & Energy
  totalLives: number; // Max 10 total lives, free 5 lives per quiz level
  
  // Settings & Music (No vibration)
  soundEnabled: boolean;
  bgMusicEnabled: boolean;

  // Secondary Structured Tracks Progress ("Islami nëpërmjet pyetjeve")
  structuredProgress: Record<string, number>; // trackId_phase_level -> score/completed
}

export type GameMode = 
  | 'classic'      // 10 questions with 5 lives per level (1 to 1200 nivele, 12,000 pyetje)
  | 'speed'        // 60 seconds rapid-fire
  | 'category'     // 10 questions from selected category
  | 'daily'        // 5 special questions
  | 'recovery'     // 3 simple questions to gain +1 life
  | 'structured'   // "Islami nëpërmjet pyetjeve" chronological tracks (11 or 33 questions)
  | 'online_1v1'   // 1 vs 1 matchmaking or opponent select
  | 'online_live'  // Live room with multiple players
  | 'online_code'; // Private room challenge code

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  userCode: string;
  isOnline: boolean;
  points: number;
  levelName: string;
  winStreak: number;
  winPercentage: number;
  statusMessage?: string;
}

export type ScreenType = 
  | 'auth'
  | 'splash'
  | 'welcome'
  | 'main_menu'
  | 'categories'
  | 'islami_nepermjet_pyetjeve'
  | 'question'
  | 'result'
  | 'medals'
  | 'profile'
  | 'leaderboard'
  | 'online'
  | 'friends';

export type StructuredTrackId = 
  | 'historia_kuranit'
  | 'hadithi_syneti'
  | 'fikhu_ibadetet'
  | 'sira_kronologjike'
  | 'akaidi'
  | 'jeta_profeteve'
  | 'personalitetet_shqiptare'
  | 'kmsh_shqiperi'
  | 'kultura_qyteterimi'
  | 'perberja_kuranit'
  | 'dyzet_hadithet';

export interface StructuredLevel {
  level: number; // 1, 2, 3
  title: string;
  difficulty: 'fillestar' | 'mesatar' | 'avancuar';
  questionCount: number; // 11
  questions: Question[];
}

export interface StructuredPhase {
  phase: number; // 1, 2, 3
  title: string;
  description: string;
  totalQuestions: number; // 33
  levels: StructuredLevel[]; // 3 levels with 11 questions each
}

export interface StructuredTrack {
  id: StructuredTrackId;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  badge: string;
  totalQuestions: number; // 99 (in 3 phases of 33) / 300 topic pool
  phases: StructuredPhase[];
}


export interface OnlinePlayer {
  id: string;
  name: string;
  avatar: string;
  isOnline: boolean;
  points: number;
  rank: number;
  levelName: string;
  winStreak: number;
}

export interface LiveRoundResult {
  questionIndex: number;
  playerAnswer: 'A' | 'B' | 'C' | 'D' | null;
  playerCorrect: boolean;
  playerScoreEarned: number;
  playerTimeSeconds: number;
  opponentAnswer: 'A' | 'B' | 'C' | 'D' | null;
  opponentCorrect: boolean;
  opponentScoreEarned: number;
  opponentTimeSeconds: number;
}
