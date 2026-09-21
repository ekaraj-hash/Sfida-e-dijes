import React, { useState } from 'react';
import { 
  ArrowLeft, 
  BookOpen, 
  Layers, 
  HeartHandshake, 
  ScrollText, 
  Landmark, 
  Users, 
  ChevronRight, 
  Play, 
  Award,
  Sparkles,
  Compass
} from 'lucide-react';
import { STRUCTURED_TRACKS } from '../data/structuredTracksData';
import { StructuredTrack, Question } from '../types';
import { sound } from '../utils/audio';

interface IslamiNepermjetPyetjeveScreenProps {
  onBack: () => void;
  onStartTrackLevel: (questions: Question[], trackTitle: string) => void;
}

export const IslamiNepermjetPyetjeveScreen: React.FC<IslamiNepermjetPyetjeveScreenProps> = ({
  onBack,
  onStartTrackLevel
}) => {
  const [selectedTrack, setSelectedTrack] = useState<StructuredTrack | null>(null);
  const [selectedPhaseNum, setSelectedPhaseNum] = useState<number>(1);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-6 h-6" />;
      case 'Layers': return <Layers className="w-6 h-6" />;
      case 'HeartHandshake': return <HeartHandshake className="w-6 h-6" />;
      case 'ScrollText': return <ScrollText className="w-6 h-6" />;
      case 'Landmark': return <Landmark className="w-6 h-6" />;
      case 'Users': return <Users className="w-6 h-6" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6" />;
      case 'Award': return <Award className="w-6 h-6" />;
      case 'Compass': return <Compass className="w-6 h-6" />;
      default: return <Compass className="w-6 h-6" />;
    }
  };

  return (
    <div className="h-full overflow-y-auto overscroll-contain bg-slate-950 text-white p-4 sm:p-6 pb-44">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              sound.playClick();
              if (selectedTrack) {
                setSelectedTrack(null);
              } else {
                onBack();
              }
            }}
            className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 border-b-[3px] border-b-slate-950 text-sm font-bold text-slate-200 hover:text-white transition-all shadow-md active:translate-y-0.5 active:border-b"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{selectedTrack ? 'Kthehu te Temat' : 'Kreu'}</span>
          </button>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/50 text-xs font-bold text-emerald-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sesion Edukativ Kronologjik</span>
          </div>
        </div>

        {/* Hero Title (3D Bevel & Shadow) */}
        <div className="bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-950 rounded-3xl p-6 sm:p-8 text-white shadow-[0_8px_20px_rgba(0,0,0,0.6)] border border-emerald-500/40 border-b-[5px] border-b-emerald-950 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-2 max-w-2xl">
            <span className="text-[11px] font-black uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40 shadow-inner">
              Moduli i Thelluar
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight drop-shadow-md">
              Islami me pyetje
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Mëso hap pas hapi historinë e Kuranit Fisnik, jetën e bekuar të Profetit Muhamed (s.a.s.), 40 Hadithet e Neveviut, historinë e Komunitetit Mysliman në Shqipëri dhe rilindësit tanë dijetarë.
            </p>
          </div>
        </div>

        {/* View 1: Tracks List */}
        {!selectedTrack ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {STRUCTURED_TRACKS.map(track => {
              return (
                <div
                  key={track.id}
                  onClick={() => {
                    sound.playClick();
                    setSelectedTrack(track);
                    setSelectedPhaseNum(1);
                  }}
                  className="group cursor-pointer bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-5 border border-slate-800 border-b-[4px] border-b-slate-950 hover:border-emerald-500/80 hover:border-b-emerald-900 transition-all duration-200 shadow-[0_6px_14px_rgba(0,0,0,0.5)] active:translate-y-1 active:border-b-2 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg border-t border-white/20"
                        style={{ backgroundColor: track.color }}
                      >
                        {getIconComponent(track.icon)}
                      </div>
                      <span className="text-xs font-black px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 shadow-inner">
                        {track.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-black text-white group-hover:text-emerald-400 transition-colors">
                        {track.title}
                      </h3>
                      <p className="text-xs font-bold text-emerald-400 mb-1">
                        {track.subtitle}
                      </p>
                      <p className="text-xs text-slate-400 line-clamp-2">
                        {track.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold">3 Faza • 99 Pyetje (11 për nivel)</span>
                    <span className="flex items-center space-x-1 text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                      <span>Eksploro</span>
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* View 2: Track Details with 3 Phases and 3 Levels of 11 questions */
          <div className="space-y-6 animate-fade-in">
            {/* Track Header Card */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-5 border border-slate-800 border-b-[4px] border-b-slate-950 shadow-[0_6px_14px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg border-t border-white/20"
                  style={{ backgroundColor: selectedTrack.color }}
                >
                  {getIconComponent(selectedTrack.icon)}
                </div>
                <div>
                  <h2 className="text-xl font-black text-white">
                    {selectedTrack.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    {selectedTrack.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Phases Tabs (3D Buttons) */}
            <div className="flex space-x-2 border-b border-slate-800 pb-3 overflow-x-auto no-scrollbar">
              {selectedTrack.phases.map(p => {
                const isActive = p.phase === selectedPhaseNum;
                return (
                  <button
                    key={p.phase}
                    onClick={() => {
                      sound.playClick();
                      setSelectedPhaseNum(p.phase);
                    }}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all whitespace-nowrap flex items-center space-x-2 ${
                      isActive
                        ? 'bg-gradient-to-b from-emerald-500 to-teal-700 text-white shadow-[0_3px_0_#064e3b] border-t border-emerald-300/40'
                        : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    <span>Faza {p.phase}</span>
                    <span className="text-xs opacity-80">({p.totalQuestions} pyetje)</span>
                  </button>
                );
              })}
            </div>

            {/* Current Phase Details & Levels */}
            {(() => {
              const currentPhase = selectedTrack.phases.find(p => p.phase === selectedPhaseNum) || selectedTrack.phases[0];
              return (
                <div className="space-y-4">
                  <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/30 border-b-[3px] border-b-slate-950 p-4 rounded-2xl">
                    <h3 className="font-black text-base text-emerald-300">
                      Faza {currentPhase.phase}: {currentPhase.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      {currentPhase.description}
                    </p>
                  </div>

                  {/* 3 Levels of 11 questions each */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {currentPhase.levels.map(level => {
                      const diffBadge = 
                        level.difficulty === 'fillestar' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60' :
                        level.difficulty === 'mesatar' ? 'bg-amber-950/80 text-amber-300 border-amber-700/60' :
                        'bg-purple-950/80 text-purple-300 border-purple-700/60';

                      return (
                        <div
                          key={level.level}
                          className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-5 border border-slate-800 border-b-[4px] border-b-slate-950 shadow-[0_6px_14px_rgba(0,0,0,0.5)] flex flex-col justify-between space-y-4 hover:border-emerald-500/60 transition-colors"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-3">
                              <span className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center font-black text-xs text-slate-200">
                                Lvl {level.level}
                              </span>
                              <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${diffBadge}`}>
                                {level.difficulty.toUpperCase()}
                              </span>
                            </div>
                            <h4 className="font-bold text-sm text-white mb-1">
                              {level.title}
                            </h4>
                            <p className="text-xs text-slate-400">
                              {level.questionCount} pyetje të përzgjedhura me vlerësim njohurish.
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              sound.playClick();
                              onStartTrackLevel(
                                level.questions,
                                `${selectedTrack.title} - Faza ${currentPhase.phase}, Niveli ${level.level}`
                              );
                            }}
                            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-b from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 border-t border-emerald-300/40 text-white font-black text-xs flex items-center justify-center space-x-2 shadow-[0_4px_0_#064e3b] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                          >
                            <Play className="w-3.5 h-3.5 fill-current" />
                            <span>Fillo Nivelin (11 Pyetje)</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  {/* Play entire phase button (33 questions) */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        sound.playClick();
                        const allPhaseQuestions = currentPhase.levels.flatMap(l => l.questions);
                        onStartTrackLevel(
                          allPhaseQuestions,
                          `${selectedTrack.title} - Faza ${currentPhase.phase} e Plotë (33 Pyetje)`
                        );
                      }}
                      className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-b from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 border-t border-amber-300/40 text-white font-black text-sm flex items-center justify-center space-x-2 shadow-[0_4px_0_#78350f] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
                    >
                      <Award className="w-4 h-4 text-amber-200" />
                      <span>Luaj të Gjithë Fazën {currentPhase.phase} (33 Pyetje Radhazi)</span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

      </div>
    </div>
  );
};
