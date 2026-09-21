import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Swords, Globe, MapPin } from 'lucide-react';
import { LEADERBOARD_INITIAL_DATA } from '../data/questions';
import { useGame } from '../context/GameContext';
import { IslamicPattern } from './IslamicPattern';
import { GeographicRegion } from '../types';

interface RegionalLeader {
  name: string;
  avatar: string;
  points: number;
  levelNum: number;
  levelName: string;
  wins: number;
  winRate: number;
  city: string;
}

const REGIONAL_PLAYERS: Record<GeographicRegion, RegionalLeader[]> = {
  shqiperi: [
    { name: 'Besnik T.', avatar: '🇦🇱', points: 9850, levelNum: 420, levelName: 'Alim', wins: 62, winRate: 88, city: 'Tiranë' },
    { name: 'Sara K.', avatar: '🧕', points: 8450, levelNum: 310, levelName: 'Fakih', wins: 48, winRate: 85, city: 'Shkodër' },
    { name: 'Arben M.', avatar: '👳', points: 7420, levelNum: 250, levelName: 'Studiuesi', wins: 39, winRate: 78, city: 'Durrës' },
    { name: 'Drita H.', avatar: '🌸', points: 6180, levelNum: 190, levelName: 'Nxënësi', wins: 31, winRate: 74, city: 'Vlorë' },
    { name: 'Fatmir S.', avatar: '🌟', points: 5120, levelNum: 140, levelName: 'Nxënësi', wins: 24, winRate: 69, city: 'Elbasan' },
    { name: 'Ilir Z.', avatar: '🌙', points: 4250, levelNum: 110, levelName: 'Nxënësi', wins: 18, winRate: 65, city: 'Korçë' }
  ],
  kosove: [
    { name: 'Drilon P.', avatar: '🇽🇰', points: 9450, levelNum: 390, levelName: 'Alim', wins: 59, winRate: 86, city: 'Prishtinë' },
    { name: 'Gentian B.', avatar: '🕌', points: 8120, levelNum: 290, levelName: 'Fakih', wins: 44, winRate: 82, city: 'Prizren' },
    { name: 'Albana R.', avatar: '🧕', points: 7150, levelNum: 230, levelName: 'Studiuesi', wins: 35, winRate: 76, city: 'Gjilan' },
    { name: 'Lirim K.', avatar: '⭐', points: 5890, levelNum: 175, levelName: 'Nxënësi', wins: 28, winRate: 71, city: 'Pejë' },
    { name: 'Vlora M.', avatar: '🌸', points: 4890, levelNum: 130, levelName: 'Nxënësi', wins: 22, winRate: 67, city: 'Mitrovicë' }
  ],
  maqedoni: [
    { name: 'Furkan E.', avatar: '🇲🇰', points: 8900, levelNum: 350, levelName: 'Fakih', wins: 53, winRate: 84, city: 'Shkup' },
    { name: 'Zejd A.', avatar: '👳', points: 7650, levelNum: 260, levelName: 'Studiuesi', wins: 41, winRate: 80, city: 'Tetovë' },
    { name: 'Medina S.', avatar: '🧕', points: 6420, levelNum: 205, levelName: 'Nxënësi', wins: 32, winRate: 75, city: 'Gostivar' },
    { name: 'Berat N.', avatar: '🌙', points: 5120, levelNum: 145, levelName: 'Nxënësi', wins: 25, winRate: 70, city: 'Kumanovë' }
  ],
  ballkan: [
    { name: 'Emir H.', avatar: '🦅', points: 10450, levelNum: 490, levelName: 'Allame', wins: 71, winRate: 89, city: 'Sarajevë' },
    { name: 'Besnik T.', avatar: '🇦🇱', points: 9850, levelNum: 420, levelName: 'Alim', wins: 62, winRate: 88, city: 'Tiranë' },
    { name: 'Drilon P.', avatar: '🇽🇰', points: 9450, levelNum: 390, levelName: 'Alim', wins: 59, winRate: 86, city: 'Prishtinë' },
    { name: 'Furkan E.', avatar: '🇲🇰', points: 8900, levelNum: 350, levelName: 'Fakih', wins: 53, winRate: 84, city: 'Shkup' },
    { name: 'Harun V.', avatar: '🕌', points: 8200, levelNum: 300, levelName: 'Fakih', wins: 46, winRate: 81, city: 'Ulqin' }
  ],
  europe: [
    { name: 'Tarik B.', avatar: '🇪🇺', points: 11200, levelNum: 560, levelName: 'Allame', wins: 82, winRate: 91, city: 'Zyrih' },
    { name: 'Jasmin M.', avatar: '⭐', points: 10100, levelNum: 460, levelName: 'Allame', wins: 68, winRate: 87, city: 'Frankfurt' },
    { name: 'Adem L.', avatar: '👳', points: 8750, levelNum: 340, levelName: 'Fakih', wins: 51, winRate: 83, city: 'Vjenë' },
    { name: 'Enisa D.', avatar: '🧕', points: 7600, levelNum: 255, levelName: 'Studiuesi', wins: 38, winRate: 78, city: 'Londër' }
  ],
  global: [
    { name: 'Tarik B.', avatar: '🌍', points: 11200, levelNum: 560, levelName: 'Allame', wins: 82, winRate: 91, city: 'Zvicër' },
    { name: 'Emir H.', avatar: '🦅', points: 10450, levelNum: 490, levelName: 'Allame', wins: 71, winRate: 89, city: 'Ballkan' },
    { name: 'Jasmin M.', avatar: '⭐', points: 10100, levelNum: 460, levelName: 'Allame', wins: 68, winRate: 87, city: 'Gjermani' },
    { name: 'Besnik T.', avatar: '🇦🇱', points: 9850, levelNum: 420, levelName: 'Alim', wins: 62, winRate: 88, city: 'Shqipëri' },
    { name: 'Drilon P.', avatar: '🇽🇰', points: 9450, levelNum: 390, levelName: 'Alim', wins: 59, winRate: 86, city: 'Kosovë' },
    { name: 'Furkan E.', avatar: '🇲🇰', points: 8900, levelNum: 350, levelName: 'Fakih', wins: 53, winRate: 84, city: 'Maqedoni e V.' }
  ]
};

const REGIONS: { id: GeographicRegion; label: string; flag: string }[] = [
  { id: 'shqiperi', label: 'Shqipëri', flag: '🇦🇱' },
  { id: 'kosove', label: 'Kosovë', flag: '🇽🇰' },
  { id: 'maqedoni', label: 'Maqedoni e V.', flag: '🇲🇰' },
  { id: 'ballkan', label: 'Ballkan', flag: '🦅' },
  { id: 'europe', label: 'Evropë', flag: '🇪🇺' },
  { id: 'global', label: 'Globale', flag: '🌍' }
];

export const LeaderboardScreen: React.FC = () => {
  const { profile } = useGame();
  // Only display the region where the user is registered
  const userRegion: GeographicRegion = profile.geographicRegion || 'shqiperi';
  const registeredRegionObj = REGIONS.find((r) => r.id === userRegion) || REGIONS[0];
  const [tab, setTab] = useState<'general' | 'online'>('general');

  const regionalBase = REGIONAL_PLAYERS[userRegion] || REGIONAL_PLAYERS.shqiperi;

  // Build combined leaderboard including current user for their registered region
  const generalList = [
    ...regionalBase.map((p) => ({
      name: p.name,
      avatar: p.avatar,
      points: p.points,
      level: `Niveli ${Math.min(1200, Math.round(p.levelNum / 10))} / 1,200 • ${p.levelName}`,
      wins: p.wins,
      winRate: p.winRate,
      city: p.city,
      isUser: false
    })),
    {
      name: `${profile.name} (Ti)`,
      avatar: profile.avatar,
      points: profile.totalPoints,
      level: `Niveli ${profile.currentLevel} / 1,200`,
      wins: profile.onlineWins,
      winRate: profile.winPercentage,
      city: registeredRegionObj.label,
      isUser: true
    }
  ]
    .sort((a, b) => b.points - a.points)
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  const onlineList = [
    ...regionalBase.map((p) => ({
      name: p.name,
      avatar: p.avatar,
      points: p.points,
      level: `Niveli ${Math.min(1200, Math.round(p.levelNum / 10))} / 1,200 • ${p.levelName}`,
      wins: p.wins,
      winRate: p.winRate,
      city: p.city,
      isUser: false
    })),
    {
      name: `${profile.name} (Ti)`,
      avatar: profile.avatar,
      points: profile.totalOnlinePoints,
      level: `Niveli ${profile.currentLevel} / 1,200`,
      wins: profile.onlineWins,
      winRate: profile.winPercentage,
      city: registeredRegionObj.label,
      isUser: true
    }
  ]
    .sort((a, b) => (b.wins !== a.wins ? b.wins - a.wins : b.points - a.points))
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  const currentList = tab === 'general' ? generalList : onlineList;
  const top3 = currentList.slice(0, 3);
  const remaining = currentList.slice(3);

  return (
    <div className="relative min-h-[580px] h-full p-4 bg-slate-950 text-slate-100 overflow-y-auto pb-28">
      <IslamicPattern opacity={0.06} />

      <div className="relative z-10 space-y-4">
        {/* Title Header */}
        <div className="text-center">
          <h2 className="text-xl font-black text-white tracking-tight flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400 drop-shadow-[0_2px_4px_rgba(251,191,36,0.5)]" />
            {tab === 'general' ? 'Klasifikimi i Përgjithshëm' : '⚔️ Klasifikimi i Sfidave'}
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            1,200 nivele dijeje (10 pyetje për nivel • 12,000 pyetje)
          </p>
        </div>

        {/* Registered Geographic Region Banner (Only user's registered region) */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-emerald-500/40 border-b-[4px] border-b-emerald-950 shadow-[0_6px_14px_rgba(0,0,0,0.5)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-b from-emerald-500/20 to-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-2xl shadow-inner">
              {registeredRegionObj.flag}
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 block">
                Rajoni juaj i regjistruar
              </span>
              <h3 className="text-base font-black text-white">
                Klasifikimi: {registeredRegionObj.label} {registeredRegionObj.flag}
              </h3>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-300 bg-slate-800/90 px-2.5 py-1 rounded-full border border-slate-700 shadow-sm">
            Zyrtar
          </span>
        </div>

        {/* Tab Switcher: Pikët Totale vs Sfida Online (3D Buttons) */}
        <div className="grid grid-cols-2 p-1.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-inner">
          <button
            onClick={() => setTab('general')}
            id="tab-leaderboard-general"
            className={`py-2 rounded-xl text-xs font-black transition-all ${
              tab === 'general'
                ? 'bg-gradient-to-b from-emerald-500 to-teal-700 text-white shadow-[0_3px_0_#064e3b] border-t border-emerald-300/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Pikët Totale (Klasike)
          </button>
          <button
            onClick={() => setTab('online')}
            id="tab-leaderboard-online"
            className={`py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              tab === 'online'
                ? 'bg-gradient-to-b from-indigo-500 to-indigo-800 text-white shadow-[0_3px_0_#1e1b4b] border-t border-indigo-300/40'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Swords className="w-3.5 h-3.5" />
            Sfida Online (1 vs 1)
          </button>
        </div>

        {/* Podium Top 3 (3D Tactile Pedestals) */}
        {top3.length >= 3 && (
          <div className="flex items-end justify-center gap-2 pt-2 pb-2">
            {/* 2nd Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center w-24"
            >
              <div className="relative mb-1">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-slate-700 to-slate-900 border-2 border-slate-300 flex items-center justify-center text-2xl shadow-md">
                  {top3[1].avatar}
                </div>
                <span className="absolute -top-2 -right-1 text-sm drop-shadow">🥈</span>
              </div>
              <span className="text-[11px] font-bold text-slate-200 truncate max-w-full text-center">
                {top3[1].name}
              </span>
              <span className="text-[10px] font-extrabold text-slate-400">
                {tab === 'general' ? `${top3[1].points} pikë` : `${top3[1].wins} fitore`}
              </span>
              <div className="w-full h-16 bg-gradient-to-b from-slate-700 to-slate-900 rounded-t-xl mt-2 flex items-center justify-center border-t-2 border-slate-300 shadow-[0_4px_0_#1e293b]">
                <span className="text-base font-black text-slate-200 drop-shadow">2</span>
              </div>
            </motion.div>

            {/* 1st Place (Center & Highest) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center w-28"
            >
              <div className="relative mb-1">
                <div className="w-15 h-15 rounded-2xl bg-gradient-to-b from-amber-400 via-yellow-300 to-amber-600 p-[2px] shadow-[0_6px_16px_rgba(245,158,11,0.4)]">
                  <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-3xl">
                    {top3[0].avatar}
                  </div>
                </div>
                <span className="absolute -top-2.5 -right-1 text-base animate-bounce drop-shadow">🥇</span>
              </div>
              <span className="text-xs font-black text-amber-300 truncate max-w-full text-center">
                {top3[0].name}
              </span>
              <span className="text-[11px] font-extrabold text-amber-400">
                {tab === 'general' ? `${top3[0].points} pikë` : `${top3[0].wins} fitore`}
              </span>
              <div className="w-full h-22 bg-gradient-to-b from-amber-500 via-amber-600 to-amber-900 rounded-t-2xl mt-2 flex items-center justify-center border-t-2 border-yellow-200 shadow-[0_6px_0_#78350f]">
                <span className="text-xl font-black text-slate-950 drop-shadow">1</span>
              </div>
            </motion.div>

            {/* 3rd Place */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center w-24"
            >
              <div className="relative mb-1">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-b from-amber-900 to-slate-900 border-2 border-amber-600 flex items-center justify-center text-2xl shadow-md">
                  {top3[2].avatar}
                </div>
                <span className="absolute -top-2 -right-1 text-sm drop-shadow">🥉</span>
              </div>
              <span className="text-[11px] font-bold text-slate-200 truncate max-w-full text-center">
                {top3[2].name}
              </span>
              <span className="text-[10px] font-extrabold text-amber-600">
                {tab === 'general' ? `${top3[2].points} pikë` : `${top3[2].wins} fitore`}
              </span>
              <div className="w-full h-12 bg-gradient-to-b from-amber-800 to-slate-950 rounded-t-xl mt-2 flex items-center justify-center border-t-2 border-amber-500 shadow-[0_4px_0_#451a03]">
                <span className="text-base font-black text-amber-200 drop-shadow">3</span>
              </div>
            </motion.div>
          </div>
        )}

        {/* List of remaining players with 3D tactile borders */}
        <div className="space-y-2">
          {remaining.map((item) => (
            <div
              key={`${item.rank}-${item.name}`}
              className={`p-3.5 rounded-2xl border flex items-center justify-between transition-all ${
                item.isUser
                  ? 'bg-gradient-to-b from-emerald-950/90 to-slate-900 border-emerald-500 border-b-[3px] border-b-emerald-800 shadow-md ring-1 ring-emerald-400'
                  : 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-800 border-b-[3px] border-b-slate-950'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-5 text-center text-xs font-black text-slate-400">
                  {item.rank}
                </span>
                <span className="text-xl">{item.avatar}</span>
                <div>
                  <h4 className={`text-xs font-bold flex items-center gap-1.5 ${item.isUser ? 'text-emerald-300 font-black' : 'text-slate-200'}`}>
                    {item.name}
                    {item.city && (
                      <span className="text-[9px] font-normal text-slate-400 bg-slate-800 px-1.5 py-0.2 rounded border border-slate-700">
                        {item.city}
                      </span>
                    )}
                  </h4>
                  <span className="text-[10px] text-slate-400 block">{item.level}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-amber-400 block">
                  {tab === 'general' ? `${item.points.toLocaleString('sq-AL')} pikë` : `${item.wins} Fitore`}
                </span>
                {tab === 'online' && item.winRate !== undefined && (
                  <span className="text-[10px] text-slate-400">
                    {item.winRate}% saktësi
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
