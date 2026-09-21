import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { IslamicPattern } from './IslamicPattern';

export const ParallaxMenuBackground: React.FC = () => {
  // Normalized mouse coordinates from -1 to 1
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics springs for organic parallax response
  const springConfig = { damping: 28, stiffness: 100, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Depth layer transforms
  // Deep layer (Geometric Pattern): Subtle shift
  const patternX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const patternY = useTransform(smoothY, [-1, 1], [-10, 10]);

  // Mid-deep layer (Ambient glowing lights)
  const orb1X = useTransform(smoothX, [-1, 1], [-28, 28]);
  const orb1Y = useTransform(smoothY, [-1, 1], [-24, 24]);

  const orb2X = useTransform(smoothX, [-1, 1], [32, -32]);
  const orb2Y = useTransform(smoothY, [-1, 1], [26, -26]);

  const orb3X = useTransform(smoothX, [-1, 1], [-18, 18]);
  const orb3Y = useTransform(smoothY, [-1, 1], [22, -22]);

  // Foreground particles & celestial star motifs: Higher parallax displacement
  const starsX = useTransform(smoothX, [-1, 1], [-45, 45]);
  const starsY = useTransform(smoothY, [-1, 1], [-35, 35]);

  const starsReverseX = useTransform(smoothX, [-1, 1], [35, -35]);
  const starsReverseY = useTransform(smoothY, [-1, 1], [40, -40]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // Clamp tilt values for mobile gyroscope parallax
        const x = Math.max(-1, Math.min(1, e.gamma / 25));
        const y = Math.max(-1, Math.min(1, (e.beta - 45) / 25));
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
    };
  }, [mouseX, mouseY]);

  return (
    <div 
      id="parallax-menu-background" 
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {/* Deep Canvas Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

      {/* Layer 1: Geometric Islamic Pattern with Parallax & Slow Ambient Drift */}
      <motion.div 
        style={{ x: patternX, y: patternY }}
        animate={{
          scale: [1, 1.025, 1],
          opacity: [0.06, 0.08, 0.06]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -inset-8"
      >
        <IslamicPattern opacity={0.07} />
      </motion.div>

      {/* Layer 2: Ambient Glowing Nebula Orbs (Layered emerald and amber lights) */}
      {/* Emerald Top-Right Glow */}
      <motion.div
        style={{ x: orb1X, y: orb1Y }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.18, 0.28, 0.18]
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -top-24 -right-16 w-80 h-80 rounded-full bg-emerald-500/25 blur-3xl"
      />

      {/* Amber/Gold Bottom-Left Glow */}
      <motion.div
        style={{ x: orb2X, y: orb2Y }}
        animate={{
          scale: [1.1, 0.95, 1.1],
          opacity: [0.15, 0.24, 0.15]
        }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute -bottom-28 -left-20 w-88 h-88 rounded-full bg-amber-500/20 blur-3xl"
      />

      {/* Teal Subtle Center-Left Glow */}
      <motion.div
        style={{ x: orb3X, y: orb3Y }}
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{
          duration: 13,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
        className="absolute top-1/3 -left-12 w-64 h-64 rounded-full bg-teal-600/15 blur-3xl"
      />

      {/* Layer 3: Floating Celestial Motifs (Khatim Stars & Crescent Highlights) */}
      <motion.div
        style={{ x: starsX, y: starsY }}
        className="absolute inset-0"
      >
        {/* Floating Star 1 - Top Left */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 45, 90],
            opacity: [0.35, 0.65, 0.35]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-12 left-8 text-amber-300/40 text-sm filter drop-shadow-[0_0_6px_rgba(245,158,11,0.5)]"
        >
          ✦
        </motion.div>

        {/* Floating Star 2 - Mid Right */}
        <motion.div
          animate={{
            y: [0, 12, 0],
            rotate: [90, 45, 0],
            opacity: [0.25, 0.55, 0.25]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5
          }}
          className="absolute top-1/3 right-6 text-emerald-300/35 text-base filter drop-shadow-[0_0_6px_rgba(16,185,129,0.5)]"
        >
          ✧
        </motion.div>

        {/* Floating Star 3 - Bottom Right */}
        <motion.div
          animate={{
            y: [0, -8, 0],
            rotate: [0, 90, 180],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3
          }}
          className="absolute bottom-24 right-10 text-amber-200/40 text-xs filter drop-shadow-[0_0_5px_rgba(251,191,36,0.5)]"
        >
          ✦
        </motion.div>
      </motion.div>

      {/* Layer 4: Reverse Parallax Subtle Particles */}
      <motion.div
        style={{ x: starsReverseX, y: starsReverseY }}
        className="absolute inset-0"
      >
        {/* Subtle Crescent Glow Icon */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            rotate: [-4, 4, -4],
            opacity: [0.18, 0.3, 0.18]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-20 right-12 text-amber-400/25 text-xl filter drop-shadow-[0_0_10px_rgba(245,158,11,0.4)]"
        >
          🌙
        </motion.div>

        {/* Floating Star 4 - Bottom Left */}
        <motion.div
          animate={{
            y: [0, 10, 0],
            rotate: [0, -45, -90],
            opacity: [0.25, 0.5, 0.25]
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2
          }}
          className="absolute bottom-36 left-12 text-teal-300/35 text-xs filter drop-shadow-[0_0_5px_rgba(20,184,166,0.5)]"
        >
          ✧
        </motion.div>

        {/* Star 5 - Center Top */}
        <motion.div
          animate={{
            scale: [0.9, 1.2, 0.9],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.8
          }}
          className="absolute top-6 left-1/2 -translate-x-1/2 text-amber-300/30 text-[10px]"
        >
          ✦
        </motion.div>
      </motion.div>

      {/* Subtle vignette border to frame the screen */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-slate-950/70" />
    </div>
  );
};
