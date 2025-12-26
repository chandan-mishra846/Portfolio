import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export default function Cursor3D() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed w-8 h-8 pointer-events-none z-50 hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.div
          className="w-full h-full rounded-full border-2 border-brand/50 bg-brand/10 backdrop-blur-sm"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      </motion.div>

      {/* Trailing cursor */}
      <motion.div
        className="fixed w-12 h-12 pointer-events-none z-40 hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.div
          className="w-full h-full rounded-full bg-gradient-to-r from-brand/20 to-cyan-400/20 blur-xl"
          animate={{
            scale: [0.8, 1, 0.8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{ transform: 'translateZ(-20px)' }}
        />
      </motion.div>
    </>
  );
}
