/**
 * Web Audio API synthesizer for Sfida e Dijes
 * Provides soft, warm sound effects and a gentle Islamic ambient background melody.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private sfxEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private isMusicPlaying: boolean = false;
  private musicTimer: number | null = null;
  private musicGainNode: GainNode | null = null;
  private melodyIndex: number = 0;

  // Classical, noble acoustic progression (Dm -> Gm -> C -> F -> Bb -> Gm/E -> A7 -> Dm)
  // Each note is rendered with a classical nylon string / acoustic harp decay with natural polyphony
  private readonly CLASSICAL_SEQUENCE: { freq: number; dur: number; delay: number }[] = [
    // Measure 1: D minor
    { freq: 146.83, dur: 2.2, delay: 0.55 }, // D3
    { freq: 220.00, dur: 2.0, delay: 0.50 }, // A3
    { freq: 293.66, dur: 2.0, delay: 0.50 }, // D4
    { freq: 349.23, dur: 2.4, delay: 0.70 }, // F4

    // Measure 2: G minor
    { freq: 98.00,  dur: 2.2, delay: 0.55 }, // G2
    { freq: 146.83, dur: 2.0, delay: 0.50 }, // D3
    { freq: 233.08, dur: 2.0, delay: 0.50 }, // Bb3
    { freq: 293.66, dur: 2.4, delay: 0.70 }, // D4

    // Measure 3: C major
    { freq: 130.81, dur: 2.2, delay: 0.55 }, // C3
    { freq: 196.00, dur: 2.0, delay: 0.50 }, // G3
    { freq: 329.63, dur: 2.0, delay: 0.50 }, // E4
    { freq: 392.00, dur: 2.4, delay: 0.70 }, // G4

    // Measure 4: F major
    { freq: 87.31,  dur: 2.2, delay: 0.55 }, // F2
    { freq: 130.81, dur: 2.0, delay: 0.50 }, // C3
    { freq: 220.00, dur: 2.0, delay: 0.50 }, // A3
    { freq: 261.63, dur: 2.4, delay: 0.70 }, // C4

    // Measure 5: Bb major
    { freq: 116.54, dur: 2.2, delay: 0.55 }, // Bb2
    { freq: 174.61, dur: 2.0, delay: 0.50 }, // F3
    { freq: 293.66, dur: 2.0, delay: 0.50 }, // D4
    { freq: 349.23, dur: 2.4, delay: 0.70 }, // F4

    // Measure 6: E dim / Gm
    { freq: 82.41,  dur: 2.2, delay: 0.55 }, // E2
    { freq: 196.00, dur: 2.0, delay: 0.50 }, // G3
    { freq: 233.08, dur: 2.0, delay: 0.50 }, // Bb3
    { freq: 329.63, dur: 2.4, delay: 0.70 }, // E4

    // Measure 7: A7 classical cadence
    { freq: 110.00, dur: 2.2, delay: 0.55 }, // A2
    { freq: 164.81, dur: 2.0, delay: 0.50 }, // E3
    { freq: 196.00, dur: 2.0, delay: 0.50 }, // G3
    { freq: 277.18, dur: 2.4, delay: 0.70 }, // C#4

    // Measure 8: D minor resolution
    { freq: 146.83, dur: 2.2, delay: 0.55 }, // D3
    { freq: 220.00, dur: 2.0, delay: 0.50 }, // A3
    { freq: 349.23, dur: 2.4, delay: 0.60 }, // F4
    { freq: 293.66, dur: 3.2, delay: 1.20 }  // D4 (peaceful pause)
  ];

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setEnabled(val: boolean) {
    this.sfxEnabled = val;
  }

  public setBgMusicEnabled(val: boolean) {
    this.musicEnabled = val;
    if (!val) {
      this.stopBgMusic();
    } else {
      this.startBgMusic();
    }
  }

  public isBgMusicEnabled(): boolean {
    return this.musicEnabled;
  }

  public playClick() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // Ignore
    }
  }

  /**
   * Soft, warm, soothing harp/chime tone for correct answers
   */
  public playCorrect() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Gentle warm triad: C5 (523Hz), E5 (659Hz), G5 (784Hz)
      const notes = [523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.001, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.07, now + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0005, now + idx * 0.08 + 0.28);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } catch {
      // Ignore
    }
  }

  /**
   * Soft, mellow low wooden chime for wrong answers (no harsh buzz/sawtooth)
   */
  public playWrong() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const subOsc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(196, now); // G3
      osc.frequency.exponentialRampToValueAtTime(146.83, now + 0.22); // D3

      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(98, now); // G2
      subOsc.frequency.exponentialRampToValueAtTime(73.4, now + 0.22);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.07, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.24);

      osc.connect(filter);
      subOsc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + 0.25);
      subOsc.stop(now + 0.25);
    } catch {
      // Ignore
    }
  }

  public playStreak() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [440, 554.37, 659.25, 880];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.001, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.26);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.28);
      });
    } catch {
      // Ignore
    }
  }

  public playTimerTick() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {
      // Ignore
    }
  }

  public playVictory() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);

        gain.gain.setValueAtTime(0.001, now + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.09, now + idx * 0.09 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.48);
      });
    } catch {
      // Ignore
    }
  }

  public playReward() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      // Cheerful sparkling crystal chime: E5, G#5, B5, E6
      const notes = [659.25, 830.61, 987.77, 1318.51];
      notes.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.001, now + idx * 0.07);
        gain.gain.linearRampToValueAtTime(0.08, now + idx * 0.07 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0008, now + idx * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.38);
      });
    } catch {
      // Ignore
    }
  }

  public playLevelUp() {
    this.playVictory();
  }

  /**
   * Soothing, spiritual opening chime for the game entrance.
   * Features a serene oriental arpeggio with warm resonant harmonics.
   */
  public playSpiritualOpening() {
    if (!this.sfxEnabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Soft warm base drone (D3)
      const droneOsc = this.ctx.createOscillator();
      const droneGain = this.ctx.createGain();
      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(600, now);

      droneOsc.type = 'sine';
      droneOsc.frequency.setValueAtTime(146.83, now); // D3

      droneGain.gain.setValueAtTime(0.0001, now);
      droneGain.gain.linearRampToValueAtTime(0.035, now + 0.4);
      droneGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      droneOsc.connect(droneFilter);
      droneFilter.connect(droneGain);
      droneGain.connect(this.ctx.destination);

      droneOsc.start(now);
      droneOsc.stop(now + 2.9);

      // Harmonious spiritual chimes (Nahawand serene notes: A3, D4, F4, A4, D5)
      const notes = [
        { freq: 220.00, delay: 0.08, dur: 2.2 }, // A3
        { freq: 293.66, delay: 0.38, dur: 2.4 }, // D4
        { freq: 349.23, delay: 0.70, dur: 2.3 }, // F4
        { freq: 440.00, delay: 1.02, dur: 2.5 }, // A4
        { freq: 587.33, delay: 1.35, dur: 2.9 }  // D5
      ];

      notes.forEach(({ freq, delay, dur }) => {
        if (!this.ctx) return;
        const noteOsc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();
        const noteFilter = this.ctx.createBiquadFilter();

        noteFilter.type = 'lowpass';
        noteFilter.frequency.setValueAtTime(1200, now + delay);

        noteOsc.type = 'sine';
        noteOsc.frequency.setValueAtTime(freq, now + delay);

        noteGain.gain.setValueAtTime(0.0001, now + delay);
        noteGain.gain.linearRampToValueAtTime(0.04, now + delay + 0.06);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + delay + dur);

        noteOsc.connect(noteFilter);
        noteFilter.connect(noteGain);
        noteGain.connect(this.ctx.destination);

        noteOsc.start(now + delay);
        noteOsc.stop(now + delay + dur + 0.1);
      });
    } catch {
      // AudioContext policy fallback
    }
  }

  /**
   * Starts playing the gentle classical acoustic ambient background melody.
   * Plays during menu/results/screens, stops during active tests.
   */
  public startBgMusic() {
    if (!this.musicEnabled || this.isMusicPlaying) return;
    this.initCtx();
    if (!this.ctx) return;

    this.isMusicPlaying = true;
    this.playNextMelodyNote();
  }

  private playNextMelodyNote() {
    if (!this.isMusicPlaying || !this.musicEnabled || !this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const note = this.CLASSICAL_SEQUENCE[this.melodyIndex];
      this.melodyIndex = (this.melodyIndex + 1) % this.CLASSICAL_SEQUENCE.length;

      // Acoustic Classical String / Warm Harp Synth
      // Dual oscillator: Warm fundamental sine + gentle soft triangle overtone
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      const gain2 = this.ctx.createGain();
      const masterGain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      // Lowpass acoustic filter with natural pluck decay
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1100, now);
      filter.frequency.exponentialRampToValueAtTime(320, now + note.dur);

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(note.freq, now);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(note.freq * 2, now); // Soft octave harmonic

      // Soft mix: 88% fundamental, 12% octave harmonic
      gain1.gain.setValueAtTime(0.88, now);
      gain2.gain.setValueAtTime(0.12, now);

      // Delicate, soothing volume with natural pluck attack and smooth decay
      const peakVol = 0.018;
      masterGain.gain.setValueAtTime(0.0001, now);
      masterGain.gain.linearRampToValueAtTime(peakVol, now + 0.025);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + note.dur);

      osc1.connect(gain1);
      osc2.connect(gain2);
      gain1.connect(filter);
      gain2.connect(filter);
      filter.connect(masterGain);
      masterGain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + note.dur + 0.1);
      osc2.stop(now + note.dur + 0.1);

      // Schedule next note with polyphonic overlap
      const nextDelayMs = note.delay * 1000;
      this.musicTimer = window.setTimeout(() => {
        this.playNextMelodyNote();
      }, nextDelayMs);
    } catch {
      // Ignore
    }
  }

  /**
   * Stops the background ambient music
   */
  public stopBgMusic() {
    this.isMusicPlaying = false;
    if (this.musicTimer !== null) {
      clearTimeout(this.musicTimer);
      this.musicTimer = null;
    }
  }
}

export const sound = new SoundEngine();
