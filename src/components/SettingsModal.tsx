import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  X, 
  LogOut, 
  Coins, 
  Gem, 
  ArrowRight, 
  Check, 
  ShoppingBag,
  Sparkles,
  Mail,
  Send
} from 'lucide-react';
import { useGame, PURCHASABLE_ORIGINAL_ICONS } from '../context/GameContext';
import { sound } from '../utils/audio';

interface SettingsModalProps {
  onClose: () => void;
  onLogout?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ onClose, onLogout }) => {
  const { 
    profile, 
    toggleSound, 
    toggleBgMusic, 
    resetProgress, 
    logout, 
    convertCoinsToGems, 
    buyAvatar 
  } = useGame();

  const [coinsToConvert, setCoinsToConvert] = useState<number>(100);
  const [convertSuccess, setConvertSuccess] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'options' | 'economy' | 'shop'>('options');

  const handleReset = () => {
    const confirmed = window.confirm('A jeni të sigurt që dëshironi të rifilloni të gjithë progresin dhe pikët?');
    if (confirmed) {
      resetProgress();
      onClose();
    }
  };

  const handleLogout = () => {
    sound.playClick();
    logout();
    onClose();
    if (onLogout) onLogout();
  };

  const handleConvert = () => {
    if (profile.coins < coinsToConvert) {
      alert(`Nuk keni mjaftueshëm monedha. Ju duhen ${coinsToConvert} monedha.`);
      return;
    }
    const success = convertCoinsToGems(coinsToConvert);
    if (success) {
      const gemsGained = Math.floor(coinsToConvert / 100);
      setConvertSuccess(`U këmbyen me sukses ${coinsToConvert} monedha në ${gemsGained} gems!`);
      setTimeout(() => setConvertSuccess(null), 3500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        className="bg-slate-900 border border-slate-700/80 rounded-3xl p-5 max-w-md w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <div>
              <h3 className="text-base font-extrabold text-white tracking-tight">
                Opsionet & Dyqani
              </h3>
              <p className="text-[11px] text-slate-400">Cilësimet dhe pasuria juaj në lojë</p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            id="btn-close-settings"
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Currency summary strip */}
        <div className="grid grid-cols-2 gap-2 bg-slate-950 p-2.5 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 px-2">
            <div className="w-7 h-7 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-sm">
              💎
            </div>
            <div>
              <span className="text-[10px] text-cyan-300/80 uppercase font-bold block">Gems</span>
              <span className="text-sm font-black text-cyan-200">{profile.gems}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 px-2 border-l border-slate-800">
            <div className="w-7 h-7 rounded-lg bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-sm">
              🪙
            </div>
            <div>
              <span className="text-[10px] text-amber-300/80 uppercase font-bold block">Coins</span>
              <span className="text-sm font-black text-amber-200">{profile.coins}</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800">
          <button
            id="tab-settings-options"
            onClick={() => {
              sound.playClick();
              setActiveTab('options');
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'options' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Tingulli
          </button>
          <button
            id="tab-settings-economy"
            onClick={() => {
              sound.playClick();
              setActiveTab('economy');
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              activeTab === 'economy' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coins className="w-3.5 h-3.5 text-amber-400" />
            Këmbimi
          </button>
          <button
            id="tab-settings-shop"
            onClick={() => {
              sound.playClick();
              setActiveTab('shop');
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 ${
              activeTab === 'shop' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5 text-emerald-400" />
            Ikonat (1000🪙)
          </button>
        </div>

        {/* TAB 1: Sound Options (No vibration) */}
        {activeTab === 'options' && (
          <div className="space-y-2.5">
            {/* Background Islamic Melody Toggle */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2.5">
                <Volume2 className={`w-5 h-5 ${profile.bgMusicEnabled ? 'text-emerald-400' : 'text-slate-500'}`} />
                <div>
                  <span className="text-xs font-bold text-white block">Melodi e Lehtë Islame</span>
                  <span className="text-[10px] text-slate-400">Luhet në sfond përveçse gjatë testit</span>
                </div>
              </div>
              <button
                onClick={() => {
                  sound.playClick();
                  toggleBgMusic();
                }}
                id="toggle-bgmusic-settings"
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  profile.bgMusicEnabled ? 'bg-emerald-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    profile.bgMusicEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* General SFX Sound Toggle */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-2.5">
                {profile.soundEnabled ? (
                  <Volume2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <VolumeX className="w-5 h-5 text-slate-500" />
                )}
                <div>
                  <span className="text-xs font-bold text-white block">Efektet e Zërit</span>
                  <span className="text-[10px] text-slate-400">Tingujt e butë të përgjigjeve</span>
                </div>
              </div>
              <button
                onClick={toggleSound}
                id="toggle-sound-settings"
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  profile.soundEnabled ? 'bg-emerald-600' : 'bg-slate-800'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    profile.soundEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* User Session Info */}
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-400 text-[11px]">Llogaria aktive:</span>
                <span className="font-bold text-emerald-300">{profile.name}</span>
              </div>
              {profile.linkedEmail && (
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Email i lidhur:</span>
                  <span className="text-white font-mono">{profile.linkedEmail}</span>
                </div>
              )}
            </div>

            {/* Komunikim me Email (3D Button) */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-b from-slate-950 to-slate-900 border border-slate-800 space-y-2.5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-emerald-600/30 to-emerald-950/60 border border-emerald-500/50 flex items-center justify-center text-emerald-300 shadow-inner">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-black text-white block">Komunikim & Sugjerime</span>
                  <span className="text-[10px] text-slate-400">Dërgoni pyetje, ide ose vërejtje me email</span>
                </div>
              </div>

              <a
                href="mailto:sfidaedijes@gmail.com?subject=Komunikim%20dhe%20Sugjerime%20-%20Sfida%20e%20Dijes"
                id="btn-contact-email"
                onClick={() => sound.playClick()}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-b from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 border-t border-emerald-300/40 text-white text-xs font-black flex items-center justify-center gap-2 shadow-[0_4px_0_#064e3b,0_6px_12px_rgba(0,0,0,0.4)] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Komuniko me Zhvilluesin</span>
              </a>
            </div>
          </div>
        )}

        {/* TAB 2: Economy Converter (100 coins -> 1 gem) */}
        {activeTab === 'economy' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">Kursi Zyrtar i Këmbimit</span>
                <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                  100 🪙 = 1 💎
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Mund të konvertoni monedhat (coins) e fituara në gurë të çmuar (gems) për të blerë jetë ose për të kapërcyer nivele të vështira.
              </p>
            </div>

            {convertSuccess && (
              <div className="p-2.5 rounded-xl bg-emerald-950/90 border border-emerald-500 text-xs text-emerald-200 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{convertSuccess}</span>
              </div>
            )}

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
              <label className="block text-xs font-bold text-slate-300">
                Zgjidhni sasinë për t'u këmbyer:
              </label>

              <div className="grid grid-cols-3 gap-2">
                {[100, 500, 1000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setCoinsToConvert(amt);
                    }}
                    className={`py-2 px-1.5 rounded-xl border text-xs font-bold transition-all ${
                      coinsToConvert === amt
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 scale-105'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {amt} 🪙 ➔ {Math.floor(amt / 100)} 💎
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-850">
                <div className="flex items-center gap-1.5 font-bold text-sm text-amber-300">
                  <Coins className="w-4 h-4 text-amber-400" />
                  <span>{coinsToConvert} Coins</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
                <div className="flex items-center gap-1.5 font-bold text-sm text-cyan-300">
                  <Gem className="w-4 h-4 text-cyan-400" />
                  <span>+{Math.floor(coinsToConvert / 100)} Gems</span>
                </div>
              </div>

              <button
                id="btn-convert-coins"
                type="button"
                onClick={handleConvert}
                disabled={profile.coins < coinsToConvert}
                className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  profile.coins >= coinsToConvert
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-500 hover:to-teal-500 shadow-md shadow-emerald-950/60'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                Këmbe Monedhat Tani
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: Original Icons Store (1000 coins per icon) */}
        {activeTab === 'shop' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Çmimi për çdo ikonë origjinale:</span>
              <span className="font-extrabold text-amber-400">1,000 🪙</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
              {PURCHASABLE_ORIGINAL_ICONS.map((item) => {
                const isOwned = profile.unlockedAvatars.includes(item.icon);
                const isEquipped = profile.avatar === item.icon;

                return (
                  <div
                    key={item.icon}
                    className={`p-3 rounded-2xl border flex flex-col justify-between transition-all ${
                      isEquipped
                        ? 'bg-emerald-950/60 border-emerald-500 shadow-md shadow-emerald-950/40'
                        : isOwned
                        ? 'bg-slate-950/80 border-slate-800'
                        : 'bg-slate-950 border-slate-850'
                    }`}
                  >
                    <div>
                      <div className="text-3xl mb-1 text-center">{item.icon}</div>
                      <h4 className="text-xs font-bold text-white text-center">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 text-center line-clamp-2 mt-0.5">{item.desc}</p>
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-850">
                      {isEquipped ? (
                        <span className="w-full py-1 rounded-lg bg-emerald-600/30 text-emerald-300 font-bold text-[10px] flex items-center justify-center gap-1">
                          <Check className="w-3 h-3" /> E vendosur
                        </span>
                      ) : isOwned ? (
                        <button
                          type="button"
                          onClick={() => buyAvatar(item.icon)}
                          className="w-full py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-[10px] transition-colors"
                        >
                          Përdor këtë ikonë
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={profile.coins < 1000}
                          onClick={() => buyAvatar(item.icon, 1000)}
                          className={`w-full py-1 rounded-lg font-bold text-[10px] flex items-center justify-center gap-1 transition-all ${
                            profile.coins >= 1000
                              ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-sm'
                              : 'bg-slate-800/80 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          <Coins className="w-3 h-3 text-amber-300" /> Bli (1000 🪙)
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer Actions: Logout / Dil button and Reset */}
        <div className="pt-2 border-t border-slate-800 flex flex-col gap-2.5">
          {/* Logout / Dil (3D Button) */}
          <button
            id="btn-logout-settings"
            onClick={handleLogout}
            className="w-full py-2.5 rounded-xl bg-gradient-to-b from-rose-950 to-slate-950 border border-rose-900/60 border-t-rose-800/40 text-rose-200 hover:text-white text-xs font-black flex items-center justify-center gap-2 shadow-[0_4px_0_#4c0519] active:translate-y-1 active:shadow-none transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-400" />
            <span>Dil nga llogaria (Kthehu te Faqja e Parë)</span>
          </button>

          {/* Reset progress */}
          <button
            id="btn-reset-progress"
            onClick={handleReset}
            className="w-full py-1.5 text-slate-500 hover:text-rose-400 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Rifillo progresin e përgjithshëm</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

