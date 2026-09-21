import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  LogIn, 
  UserPlus, 
  ShieldCheck, 
  Globe2, 
  KeyRound, 
  CheckCircle2,
  Mail,
  AlertCircle,
  Volume2
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { sound } from '../utils/audio';
import { IslamicPattern } from './IslamicPattern';

interface AuthScreenProps {
  onLoginSuccess: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess }) => {
  const { login, register, linkSocial, profile } = useGame();
  
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState(profile.name || '');
  const [pin, setPin] = useState(profile.userPin || '');
  const [avatar, setAvatar] = useState(profile.avatar || '🕌');
  const [selectedSocial, setSelectedSocial] = useState<'none' | 'google' | 'facebook' | 'instagram'>('none');
  const [socialValue, setSocialValue] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [socialModalOpen, setSocialModalOpen] = useState<'google' | 'facebook' | 'instagram' | null>(null);

  useEffect(() => {
    // Play the soft, spiritual opening tone for the game entrance
    const timer = setTimeout(() => {
      sound.playSpiritualOpening();
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  const AVAILABLE_START_AVATARS = ['🕌', '👳', '🧕', '⭐', '🌟', '🌙', '📖', '🕊️'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim()) {
      setErrorMsg('Ju lutem shkruani emrin tuaj.');
      return;
    }

    if (!pin.trim()) {
      setErrorMsg('Ju lutem shkruani kodin tuaj të sigurisë.');
      return;
    }

    if (isRegisterMode) {
      const res = register(username, pin, selectedSocial, socialValue, avatar);
      if (res.success) {
        sound.playVictory();
        onLoginSuccess();
      } else {
        setErrorMsg(res.message || 'Ndodhi një gabim gjatë regjistrimit.');
      }
    } else {
      const res = login(username, pin);
      if (res.success) {
        sound.playClick();
        onLoginSuccess();
      } else {
        setErrorMsg(res.message || 'Kodi nuk përputhet me këtë emër llogarie.');
      }
    }
  };

  const handleLinkSocialAccount = (provider: 'google' | 'facebook' | 'instagram', val: string) => {
    setSelectedSocial(provider);
    setSocialValue(val);
    linkSocial(provider, val);
    setSocialModalOpen(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-emerald-950 via-teal-950 to-slate-950 text-white overflow-hidden select-none">
      {/* Traditional Islamic Geometric Sfond */}
      <IslamicPattern opacity={0.08} />

      {/* Subtle Geometric Ambient Lights */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Header Branding */}
        <div className="text-center mb-5 flex flex-col items-center">
          {/* MBI IKONËN DHE EMRIN: 'MËSO DUKE LUAJTUR' (Shkrim argëtues por jo i ekzagjeruar) */}
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400/20 via-amber-300/30 to-emerald-400/20 border border-amber-300/60 shadow-[0_2px_12px_rgba(245,158,11,0.2)] mb-3.5 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
            <span className="text-xs sm:text-sm font-black tracking-widest text-amber-200 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] uppercase font-sans">
              MËSO DUKE LUAJTUR
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          </motion.div>

          {/* Animacioni i Butë me Dritë Shpirtërore për Hapjen e Lojës */}
          <div className="relative inline-flex items-center justify-center mb-3">
            {/* Rrezatim i butë i dritës (Aura shpirtërore pulsuese) */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.25, 0.55, 0.25]
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute w-28 h-28 rounded-full bg-gradient-to-tr from-emerald-400/30 via-amber-300/30 to-teal-400/30 blur-xl pointer-events-none"
            />

            {/* Rrethi i hollë i yllit gjeometrik me rrotullim të qetë */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              className="absolute w-24 h-24 border border-emerald-400/25 rounded-full border-dashed pointer-events-none"
            />

            {/* Ikona qendrore e xhamisë */}
            <motion.div 
              initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 15, stiffness: 220 }}
              className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 via-teal-500 to-emerald-700 p-0.5 shadow-xl shadow-emerald-950/80 border border-amber-300/50"
            >
              <div className="w-full h-full bg-slate-950/90 rounded-[14px] flex items-center justify-center text-4xl shadow-inner">
                🕌
              </div>
            </motion.div>
          </div>

          {/* Emri i Lojës: Sfida e jetes */}
          <div className="flex items-center justify-center gap-2">
            <motion.h1 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5 }}
              className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md font-serif"
            >
              Sfida e jetes
            </motion.h1>

            {/* Buton i vogël për të dëgjuar sërish melodinë e butë shpirtërore të hapjes */}
            <button
              type="button"
              onClick={() => sound.playSpiritualOpening()}
              id="btn-play-opening-tone"
              className="p-1.5 rounded-full bg-emerald-900/60 hover:bg-emerald-800 text-amber-300 hover:text-amber-200 border border-emerald-600/40 transition-colors shadow-sm"
              title="Dëgjo melodinë shpirtërore të hapjes"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-emerald-200/90 text-xs sm:text-sm mt-1 font-medium"
          >
            Udhëtimi në njohuritë e bekuara islame
          </motion.p>
        </div>

        {/* Main Auth Card */}
        <motion.div 
          layout
          className="bg-slate-900/80 backdrop-blur-xl border border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl shadow-black/80"
        >
          {/* Mode Switcher Tabs */}
          <div className="flex bg-slate-800/80 p-1 rounded-2xl mb-6 border border-emerald-500/20">
            <button
              id="tab-login-btn"
              type="button"
              onClick={() => {
                setIsRegisterMode(false);
                setErrorMsg('');
                sound.playClick();
              }}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                !isRegisterMode
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LogIn className="w-4 h-4" />
              Hyrje
            </button>
            <button
              id="tab-register-btn"
              type="button"
              onClick={() => {
                setIsRegisterMode(true);
                setErrorMsg('');
                sound.playClick();
              }}
              className={`flex-1 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                isRegisterMode
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              Llogari e re
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-xs text-rose-200 flex items-center gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {/* Avatar Selection in Register Mode */}
            {isRegisterMode && (
              <div>
                <label className="block text-xs font-semibold text-emerald-200/90 mb-2">
                  Zgjidhni figurën e profilit:
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVAILABLE_START_AVATARS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => {
                        setAvatar(av);
                        sound.playClick();
                      }}
                      className={`p-2.5 rounded-xl text-2xl border transition-all flex items-center justify-center ${
                        avatar === av
                          ? 'bg-emerald-500/30 border-emerald-400 scale-105 shadow-md shadow-emerald-500/30'
                          : 'bg-slate-800/50 border-slate-700/60 hover:border-slate-500'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Username Input */}
            <div>
              <label className="block text-xs font-semibold text-emerald-200/90 mb-1.5">
                Emri i përdoruesit
              </label>
              <div className="relative">
                <input
                  id="auth-username-input"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="psh. Besimtari, Ahmed..."
                  className="w-full bg-slate-800/90 border border-slate-700 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* PIN/Code Input */}
            <div>
              <label className="block text-xs font-semibold text-emerald-200/90 mb-1.5 flex items-center justify-between">
                <span>Kodi i llogarisë (PIN / Fjalëkalim)</span>
                <span className="text-slate-400 text-[10px]">Zgjidhni një kod tuajin</span>
              </label>
              <div className="relative">
                <input
                  id="auth-pin-input"
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Kodi juaj sekret (psh. 1234)"
                  className="w-full bg-slate-800/90 border border-slate-700 focus:border-emerald-400 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none transition-all font-mono tracking-wider"
                  required
                />
                <KeyRound className="w-4 h-4 absolute right-3.5 top-3.5 text-slate-500" />
              </div>
            </div>

            {/* Social Account Linking Section */}
            <div className="pt-2 border-t border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-300 font-medium">Lidh llogarinë me:</span>
                {(selectedSocial !== 'none' || profile.authProvider !== 'none') && (
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> E lidhur
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2">
                {/* Google */}
                <button
                  id="link-google-btn"
                  type="button"
                  onClick={() => setSocialModalOpen('google')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                    selectedSocial === 'google' || profile.authProvider === 'google'
                      ? 'bg-red-500/20 border-red-500/50 text-red-300'
                      : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-700/60'
                  }`}
                >
                  <Mail className="w-3.5 h-3.5 text-red-400" />
                  Google
                </button>

                {/* Facebook */}
                <button
                  id="link-facebook-btn"
                  type="button"
                  onClick={() => setSocialModalOpen('facebook')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                    selectedSocial === 'facebook' || profile.authProvider === 'facebook'
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                      : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-700/60'
                  }`}
                >
                  <Globe2 className="w-3.5 h-3.5 text-blue-400" />
                  Facebook
                </button>

                {/* Instagram */}
                <button
                  id="link-instagram-btn"
                  type="button"
                  onClick={() => setSocialModalOpen('instagram')}
                  className={`py-2 px-2.5 rounded-xl border text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                    selectedSocial === 'instagram' || profile.authProvider === 'instagram'
                      ? 'bg-fuchsia-500/20 border-fuchsia-500/50 text-fuchsia-300'
                      : 'bg-slate-800/70 border-slate-700 text-slate-300 hover:bg-slate-700/60'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  Instagram
                </button>
              </div>

              {(socialValue || profile.linkedEmail || profile.linkedSocialHandle) && (
                <p className="text-[11px] text-emerald-400/90 mt-1.5 text-center truncate">
                  Lidhur me: {socialValue || profile.linkedEmail || profile.linkedSocialHandle}
                </p>
              )}
            </div>

            {/* Submit Action Button */}
            <button
              id="auth-submit-btn"
              type="submit"
              className="w-full mt-3 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 active:scale-[0.99] transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-base"
            >
              {isRegisterMode ? (
                <>
                  <UserPlus className="w-5 h-5" />
                  Krijo Llogarinë & Fillo
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Hyr në Llogari
                </>
              )}
            </button>
          </form>

          {/* Feature Badge info */}
          <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Ruajtje automatike
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> 1,200 Nivele (12,000 Pyetje)
            </span>
          </div>
        </motion.div>
      </div>

      {/* Social Account Linking Modal */}
      <AnimatePresence>
        {socialModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-sm w-full text-white shadow-2xl"
            >
              <h3 className="font-bold text-base mb-1 capitalize">
                Lidh me {socialModalOpen}
              </h3>
              <p className="text-xs text-slate-400 mb-4">
                {socialModalOpen === 'google' 
                  ? 'Vendosni adresën tuaj të emailit nga Google:' 
                  : `Vendosni profilin tuaj në ${socialModalOpen}:`}
              </p>

              <input
                id="social-modal-input"
                type="text"
                placeholder={socialModalOpen === 'google' ? 'shembull@gmail.com' : '@emri_juaj'}
                defaultValue={socialValue || (socialModalOpen === 'google' ? 'besimtari@gmail.com' : '@besimtari')}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white mb-4 focus:outline-none focus:border-emerald-400"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleLinkSocialAccount(socialModalOpen, (e.target as HTMLInputElement).value);
                  }
                }}
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSocialModalOpen(null)}
                  className="flex-1 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Anulo
                </button>
                <button
                  id="confirm-social-link-btn"
                  type="button"
                  onClick={() => {
                    const inputEl = document.getElementById('social-modal-input') as HTMLInputElement;
                    handleLinkSocialAccount(socialModalOpen, inputEl?.value || 'besimtari');
                  }}
                  className="flex-1 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500"
                >
                  Konfirmo
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
