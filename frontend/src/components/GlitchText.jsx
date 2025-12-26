import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function GlitchText({ children, className = '', glitchIntensity = 'medium' }) {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const intensity = {
    low: { x: 2, duration: 0.1 },
    medium: { x: 5, duration: 0.15 },
    high: { x: 10, duration: 0.2 }
  }[glitchIntensity];

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Main text */}
      <motion.div
        className="relative z-10"
        animate={isGlitching ? {
          x: [0, -intensity.x, intensity.x, -intensity.x, 0],
          y: [0, intensity.x, -intensity.x, 0],
        } : {}}
        transition={{ duration: intensity.duration }}
      >
        {children}
      </motion.div>

      {/* Glitch layers */}
      {isGlitching && (
        <>
          <motion.div
            className="absolute inset-0 text-cyan-400 opacity-70"
            style={{ mixBlendMode: 'screen' }}
            animate={{
              x: [0, -intensity.x * 2, intensity.x, 0],
              opacity: [0.7, 0.9, 0.5, 0.7],
            }}
            transition={{ duration: intensity.duration, repeat: 2 }}
          >
            {children}
          </motion.div>

          <motion.div
            className="absolute inset-0 text-pink-500 opacity-70"
            style={{ mixBlendMode: 'screen' }}
            animate={{
              x: [0, intensity.x * 2, -intensity.x, 0],
              opacity: [0.7, 0.5, 0.9, 0.7],
            }}
            transition={{ duration: intensity.duration, repeat: 2 }}
          >
            {children}
          </motion.div>
        </>
      )}

      {/* Scan lines */}
      {isGlitching && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 255, 255, 0.03) 2px, rgba(255, 255, 255, 0.03) 4px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.1, repeat: 3 }}
        />
      )}
    </div>
  );
}
