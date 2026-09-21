import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  UserPlus, 
  Swords, 
  Search, 
  Copy, 
  Check, 
  Sparkles, 
  Trophy, 
  Flame, 
  Trash2, 
  MessageSquare,
  ShieldCheck,
  Circle
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { Friend } from '../types';

interface FriendsScreenProps {
  onBack: () => void;
  onChallengeFriend: (friend: Friend) => void;
}

export const FriendsScreen: React.FC<FriendsScreenProps> = ({
  onBack,
  onChallengeFriend
}) => {
  const { friends, addFriend, removeFriend, profile } = useGame();
  const [searchTerm, setSearchTerm] = useState('');
  const [newFriendInput, setNewFriendInput] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'online' | 'suggestions'>('all');
  const [notification, setNotification] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // My personal player code derived from name
  const myPlayerCode = `BES-${Math.abs(profile.name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 100) % 900 + 100)}`;

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(myPlayerCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAddFriend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!newFriendInput.trim()) return;

    const res = addFriend(newFriendInput);
    if (res.success) {
      setNotification({ text: res.message, type: 'success' });
      setNewFriendInput('');
    } else {
      setNotification({ text: res.message, type: 'error' });
    }
    setTimeout(() => setNotification(null), 3500);
  };

  const onlineCount = friends.filter((f) => f.isOnline).length;

  const filteredFriends = friends.filter((f) => {
    const matchesSearch = 
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.userCode.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'online') {
      return matchesSearch && f.isOnline;
    }
    return matchesSearch;
  });

  // Suggested community players
  const suggestedPlayers: Friend[] = [
    {
      id: 'sug_1',
      name: 'Naim F.',
      avatar: '🕌',
      userCode: 'NAI-32',
      isOnline: true,
      points: 2100,
      levelName: 'Nxënësi',
      winStreak: 3,
      winPercentage: 74,
      statusMessage: 'Dua të forcoj njohuritë mbi Fikhun.'
    },
    {
      id: 'sug_2',
      name: 'Bleona S.',
      avatar: '🧕',
      userCode: 'BLE-81',
      isOnline: true,
      points: 2750,
      levelName: 'Studiuesi',
      winStreak: 2,
      winPercentage: 79,
      statusMessage: 'Aktiv në sfidat ditore!'
    },
    {
      id: 'sug_3',
      name: 'Gentian B.',
      avatar: '⭐',
      userCode: 'GEN-49',
      isOnline: false,
      points: 1420,
      levelName: 'Fillestari',
      winStreak: 1,
      winPercentage: 62,
      statusMessage: 'Udhëtimi drejt dijes sapo ka filluar.'
    }
  ].filter((sug) => !friends.some((f) => f.userCode === sug.userCode));

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-6 space-y-4 sm:space-y-6">
      {/* Top Banner: My Code & Stats */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-indigo-950/80 via-slate-900/90 to-emerald-950/70 border border-indigo-700/40 p-4 sm:p-6 shadow-xl backdrop-blur-md">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-indigo-900/60 border border-indigo-500/40 text-indigo-300">
                <Users className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-100 tracking-tight">
                Miqtë e Mi
              </h1>
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Sfido miqtë e tu në duele të drejtpërdrejta <strong className="text-emerald-300">Live 1 vs 1</strong> dhe ndiq ecurinë e tyre.
            </p>
          </div>

          {/* Player Code Card */}
          <div className="flex items-center gap-2.5 bg-slate-900/80 border border-indigo-500/30 rounded-2xl p-2.5 sm:p-3 shadow-inner">
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Kodi Yt i Miqësisë
              </span>
              <span className="text-sm sm:text-base font-extrabold text-indigo-300 tracking-wider font-mono">
                #{myPlayerCode}
              </span>
            </div>
            <button
              onClick={handleCopyCode}
              id="btn-copy-friend-code"
              title="Kopjo kodin tënd"
              className="p-2 rounded-xl bg-indigo-600/80 hover:bg-indigo-600 text-white font-semibold transition-all border border-indigo-400/40 active:scale-95 flex items-center gap-1 text-xs"
            >
              {copiedCode ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
                  <span className="text-[11px] text-emerald-200">Kopjuar</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="text-[11px] hidden sm:inline">Kopjo</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats Pill Row */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2 sm:gap-4 text-xs font-semibold text-slate-300">
          <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-700/50">
            <Users className="w-3.5 h-3.5 text-indigo-400" />
            <span>Totali: <strong className="text-white">{friends.length}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-700/50">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Online tani: <strong className="text-emerald-400">{onlineCount}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded-full border border-slate-700/50">
            <Swords className="w-3.5 h-3.5 text-amber-400" />
            <span>Duele Live 1 vs 1 me miqtë</span>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-3 rounded-xl text-xs sm:text-sm font-semibold border flex items-center gap-2 shadow-lg ${
              notification.type === 'success'
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
                : 'bg-rose-950/80 border-rose-500/50 text-rose-200'
            }`}
          >
            {notification.type === 'success' ? (
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <ShieldCheck className="w-4 h-4 text-rose-400 shrink-0" />
            )}
            <span>{notification.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add Friend + Search Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Shto Mik Input */}
        <form onSubmit={handleAddFriend} className="md:col-span-7 flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              id="input-add-friend"
              value={newFriendInput}
              onChange={(e) => setNewFriendInput(e.target.value)}
              placeholder="Shkruaj emrin ose kodin (p.sh. ARB-77)..."
              className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-indigo-500 text-slate-100 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            id="btn-submit-add-friend"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 border border-indigo-400/40 border-b-[3px] border-b-indigo-950 text-white font-bold text-xs sm:text-sm shadow-md active:translate-y-0.5 active:border-b transition-all shrink-0"
          >
            <UserPlus className="w-4 h-4" />
            <span>Shto Mik</span>
          </button>
        </form>

        {/* Search Input */}
        <div className="md:col-span-5 relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            id="input-search-friends"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filtro nga miqtë ekzistues..."
            className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-emerald-500 text-slate-100 rounded-xl pl-9 pr-3.5 py-2.5 text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('all')}
          id="tab-friends-all"
          className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Të gjithë ({friends.length})
        </button>
        <button
          onClick={() => setActiveTab('online')}
          id="tab-friends-online"
          className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'online'
              ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          Online tani ({onlineCount})
        </button>
        <button
          onClick={() => setActiveTab('suggestions')}
          id="tab-friends-suggestions"
          className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'suggestions'
              ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Sugjerime ({suggestedPlayers.length})
        </button>
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'suggestions' ? (
        <div className="space-y-3">
          <p className="text-xs text-slate-400">
            Lojtarë aktivë nga komuniteti që mund t'i shtoni me një klikim:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {suggestedPlayers.map((sug) => (
              <div
                key={sug.id}
                className="bg-slate-900/80 border border-slate-800 rounded-2xl p-3.5 flex flex-col justify-between gap-3 shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl p-1 bg-slate-800 rounded-xl border border-slate-700">
                      {sug.avatar}
                    </span>
                    <div>
                      <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1">
                        {sug.name}
                        {sug.isOnline && <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-mono">#{sug.userCode}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-950 border border-indigo-500/30 text-indigo-300">
                    {sug.levelName}
                  </span>
                </div>

                <div className="text-[11px] text-slate-400 italic">
                  "{sug.statusMessage}"
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-amber-300">
                    ⭐ {sug.points} pikë
                  </span>
                  <button
                    onClick={() => {
                      addFriend(sug.name);
                      setNotification({ text: `Miku "${sug.name}" u shtua!`, type: 'success' });
                      setTimeout(() => setNotification(null), 3000);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all active:scale-95"
                  >
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Shto</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Friends List */
        <div className="space-y-3">
          {filteredFriends.length === 0 ? (
            <div className="text-center py-12 px-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
              <Users className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-300">Nuk u gjet asnjë mik</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                {searchTerm
                  ? 'Nuk ka miq që përputhen me kërkimin tuaj. Provoni me një emër ose kod tjetër.'
                  : 'Nuk keni ende miq në këtë kategori. Përdorni formën më sipër për të shtuar miq me kodin e tyre!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredFriends.map((friend) => (
                <motion.div
                  key={friend.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-indigo-500/40 rounded-2xl p-3.5 flex flex-col justify-between gap-3 shadow-md transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <span className="text-2xl p-1 bg-slate-800/80 rounded-xl border border-slate-700/80 block">
                          {friend.avatar}
                        </span>
                        <span
                          title={friend.isOnline ? 'Online' : 'Offline'}
                          className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-slate-950 ${
                            friend.isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-600'
                          }`}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-sm font-bold text-slate-100">{friend.name}</h3>
                          {friend.winStreak >= 2 && (
                            <span 
                              title={`${friend.winStreak} fitore rresht`}
                              className="text-[10px] font-extrabold text-amber-400 bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.2 rounded-full flex items-center gap-0.5"
                            >
                              <Flame className="w-2.5 h-2.5 fill-amber-400" />
                              {friend.winStreak}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400 font-mono">#{friend.userCode}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700 text-slate-300">
                        {friend.levelName}
                      </span>
                      <button
                        onClick={() => removeFriend(friend.id)}
                        id={`btn-remove-friend-${friend.id}`}
                        title="Hiq mikun"
                        className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 transition-all"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {friend.statusMessage && (
                    <div className="text-[11px] text-slate-400 italic bg-slate-950/60 p-2 rounded-xl border border-slate-800/50">
                      "{friend.statusMessage}"
                    </div>
                  )}

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="font-bold text-amber-300">
                        {friend.points.toLocaleString('sq-AL')} pikë
                      </span>
                      <span className="text-slate-400 text-[11px]">
                        Fitore: <strong className="text-emerald-400">{friend.winPercentage}%</strong>
                      </span>
                    </div>

                    {/* Prominent Challenge Button */}
                    <button
                      onClick={() => onChallengeFriend(friend)}
                      id={`btn-challenge-${friend.id}`}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 border border-emerald-400/40 border-b-[2px] border-b-emerald-950 text-white font-bold text-xs shadow-md active:translate-y-0.5 active:border-b transition-all"
                    >
                      <Swords className="w-3.5 h-3.5 text-amber-300" />
                      <span>Sfido 1v1</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
