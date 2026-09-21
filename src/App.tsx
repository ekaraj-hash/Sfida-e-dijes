import React, { useEffect, useState } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { ScreenType, GameMode, CategoryId, Question, Friend } from './types';
import { SplashScreen } from './components/SplashScreen';
import { WelcomeScreen } from './components/WelcomeScreen';
import { AuthScreen } from './components/AuthScreen';
import { MainMenu } from './components/MainMenu';
import { CategoryScreen } from './components/CategoryScreen';
import { IslamiNepermjetPyetjeveScreen } from './components/IslamiNepermjetPyetjeveScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ResultScreen } from './components/ResultScreen';
import { MedalsScreen } from './components/MedalsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { LeaderboardScreen } from './components/LeaderboardScreen';
import { AnimatePresence } from 'motion/react';
import { FriendsScreen } from './components/FriendsScreen';
import { OnlineMultiplayerScreen } from './components/OnlineMultiplayerScreen';
import { LevelUpModal } from './components/LevelUpModal';
import { MedalUnlockModal } from './components/MedalUnlockModal';
import { SettingsModal } from './components/SettingsModal';
import { HeaderNav } from './components/HeaderNav';
import { sound } from './utils/audio';

const GameContainer: React.FC = () => {
  const {
    profile,
    getRandomQuestions,
    getQuestionsByCategory,
    getClassicQuestionsForLevel,
    pendingLevelUp,
    dismissLevelUp,
    unlockedMedalPopup,
    dismissMedalPopup,
    logout
  } = useGame();

  const [currentScreen, setCurrentScreen] = useState<ScreenType>('splash');
  const [activeGameMode, setActiveGameMode] = useState<GameMode>('classic');
  const [activeCategory, setActiveCategory] = useState<CategoryId | undefined>(undefined);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [selectedFriendFor1v1, setSelectedFriendFor1v1] = useState<Friend | undefined>(undefined);

  // Background music management across screens (playing everywhere except during test)
  useEffect(() => {
    if (['main_menu', 'welcome', 'categories', 'islami_nepermjet_pyetjeve', 'medals', 'profile', 'leaderboard', 'friends'].includes(currentScreen)) {
      if (profile.bgMusicEnabled) {
        sound.startBgMusic();
      }
    } else if (currentScreen === 'question' || currentScreen === 'auth') {
      sound.stopBgMusic();
    }
  }, [currentScreen, profile.bgMusicEnabled]);

  // Result state
  const [lastGameResult, setLastGameResult] = useState<{
    totalScore: number;
    correctAnswers: number;
    totalAnswered: number;
    accuracy: number;
  }>({
    totalScore: 0,
    correctAnswers: 0,
    totalAnswered: 0,
    accuracy: 0
  });

  // Settings modal
  const [showSettings, setShowSettings] = useState(false);

  // Start a game session
  const startGameSession = (mode: GameMode, categoryId?: CategoryId) => {
    setActiveGameMode(mode);
    setActiveCategory(categoryId);

    let questions: Question[] = [];
    if (mode === 'category' && categoryId) {
      questions = getQuestionsByCategory(categoryId, 10);
    } else if (mode === 'daily') {
      questions = getRandomQuestions(5);
    } else if (mode === 'speed') {
      questions = getRandomQuestions(60);
    } else {
      // Classic: 10 questions per level, 1200 levels / 12,000 questions
      questions = getClassicQuestionsForLevel(profile.currentLevel || 1);
    }

    setActiveQuestions(questions);
    setCurrentScreen('question');
  };

  const handleStartTrackLevel = (questions: Question[], _trackTitle: string) => {
    setActiveGameMode('structured');
    setActiveQuestions(questions);
    setCurrentScreen('question');
  };

  const handleFinishQuiz = (results: {
    totalScore: number;
    correctAnswers: number;
    totalAnswered: number;
    accuracy: number;
  }) => {
    setLastGameResult(results);
    setCurrentScreen('result');
  };

  const handleReplay = () => {
    sound.playClick();
    if (activeGameMode === 'structured') {
      // Replay active structured track questions
      setCurrentScreen('question');
    } else {
      startGameSession(activeGameMode, activeCategory);
    }
  };

  const handleGoHome = () => {
    sound.playClick();
    setSelectedFriendFor1v1(undefined);
    setCurrentScreen('main_menu');
  };

  // Header Title Determination
  const getHeaderTitle = (): string => {
    switch (currentScreen) {
      case 'categories':
        return 'Kategoritë';
      case 'islami_nepermjet_pyetjeve':
        return 'Islami me pyetje';
      case 'medals':
        return 'Medaljet e Mia';
      case 'profile':
        return 'Profili Im';
      case 'leaderboard':
        return 'Renditja';
      case 'friends':
        return 'Miqtë';
      case 'online':
        return '⚔️ Sfida Online';
      case 'result':
        return 'Rezultati';
      default:
        return 'Sfida e Dijes';
    }
  };

  const showHeader = !['splash', 'auth', 'welcome', 'question'].includes(currentScreen);
  const showBackBtn = !['main_menu', 'splash', 'auth', 'welcome'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-0 sm:p-4 text-slate-100 font-sans">
      {/* Mobile Device Mockup Frame */}
      <div className="w-full max-w-md h-screen sm:h-[844px] bg-slate-950 sm:border sm:border-slate-800 sm:rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative">
        
        {/* Persistent Top Navigation Bar */}
        {showHeader && (
          <HeaderNav
            title={getHeaderTitle()}
            showBack={showBackBtn}
            onBack={handleGoHome}
            onOpenProfile={() => setCurrentScreen('profile')}
            onOpenSettings={() => setShowSettings(true)}
          />
        )}

        {/* Screen Content State Machine */}
        <div className="flex-1 overflow-hidden relative">
          {currentScreen === 'splash' && (
            <SplashScreen onFinish={() => {
              if (profile.isLoggedIn) {
                setCurrentScreen('main_menu');
              } else {
                setCurrentScreen('auth');
              }
            }} />
          )}

          {currentScreen === 'auth' && (
            <AuthScreen onLoginSuccess={() => setCurrentScreen('main_menu')} />
          )}

          {currentScreen === 'welcome' && (
            <WelcomeScreen
              onStartGame={() => startGameSession('classic')}
              onOpenCategories={() => setCurrentScreen('categories')}
              onOpenOnline={() => setCurrentScreen('online')}
              onOpenSettings={() => setShowSettings(true)}
            />
          )}

          {currentScreen === 'main_menu' && (
            <MainMenu
              onStartGame={() => startGameSession('classic')}
              onStartSpeedChallenge={() => startGameSession('speed')}
              onStartDailyChallenge={() => startGameSession('daily')}
              onOpenCategories={() => setCurrentScreen('categories')}
              onOpenStructured={() => setCurrentScreen('islami_nepermjet_pyetjeve')}
              onOpenOnline={() => setCurrentScreen('online')}
              onOpenFriends={() => setCurrentScreen('friends')}
              onOpenMedals={() => setCurrentScreen('medals')}
              onOpenProfile={() => setCurrentScreen('profile')}
              onOpenLeaderboard={() => setCurrentScreen('leaderboard')}
              onOpenSettings={() => setShowSettings(true)}
              onLogout={() => {
                logout();
                setCurrentScreen('auth');
              }}
              onNewAccount={() => {
                logout();
                setCurrentScreen('auth');
              }}
            />
          )}

          {currentScreen === 'categories' && (
            <CategoryScreen
              onSelectCategory={(catId) => startGameSession('category', catId)}
            />
          )}

          {currentScreen === 'islami_nepermjet_pyetjeve' && (
            <IslamiNepermjetPyetjeveScreen
              onBack={handleGoHome}
              onStartTrackLevel={handleStartTrackLevel}
            />
          )}

          {currentScreen === 'question' && (
            <QuestionScreen
              mode={activeGameMode}
              category={activeCategory}
              questions={activeQuestions}
              onFinish={handleFinishQuiz}
              onQuit={handleGoHome}
            />
          )}

          {currentScreen === 'result' && (
            <ResultScreen
              mode={activeGameMode}
              scoreEarned={lastGameResult.totalScore}
              correctAnswers={lastGameResult.correctAnswers}
              totalQuestions={lastGameResult.totalAnswered}
              accuracy={lastGameResult.accuracy}
              onPlayAgain={handleReplay}
              onContinue={() => {
                if (activeGameMode === 'classic') {
                  startGameSession('classic');
                } else {
                  handleGoHome();
                }
              }}
              onHome={handleGoHome}
            />
          )}

          {currentScreen === 'medals' && <MedalsScreen />}

          {currentScreen === 'profile' && <ProfileScreen />}

          {currentScreen === 'leaderboard' && <LeaderboardScreen />}

          {currentScreen === 'friends' && (
            <FriendsScreen
              onBack={handleGoHome}
              onChallengeFriend={(friend) => {
                setSelectedFriendFor1v1(friend);
                setCurrentScreen('online');
              }}
            />
          )}

          {currentScreen === 'online' && (
            <OnlineMultiplayerScreen 
              onQuit={() => {
                setSelectedFriendFor1v1(undefined);
                handleGoHome();
              }} 
              preselectedFriend={selectedFriendFor1v1}
            />
          )}
        </div>

        {/* Level Up Celebration Modal */}
        {pendingLevelUp && (
          <LevelUpModal
            levelInfo={pendingLevelUp.levelInfo}
            bonusPoints={pendingLevelUp.bonusPoints}
            onDismiss={dismissLevelUp}
          />
        )}

        {/* Badge / Medal Unlock Celebration Modal */}
        <AnimatePresence>
          {!pendingLevelUp && unlockedMedalPopup && (
            <MedalUnlockModal
              medal={unlockedMedalPopup}
              onDismiss={dismissMedalPopup}
            />
          )}
        </AnimatePresence>

        {/* Settings Dialog Modal */}
        {showSettings && (
          <SettingsModal onClose={() => setShowSettings(false)} />
        )}
      </div>
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <GameContainer />
    </GameProvider>
  );
}
