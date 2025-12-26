import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function HolographicCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const rotateX = useTransform(y, [0, 1], [10, -10]);
  const rotateY = useTransform(x, [0, 1], [-10, 10]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`relative overflow-hidden ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Holographic shine effect */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.8), transparent 40%)`,
          mixBlendMode: 'overlay',
        }}
        animate={{
          opacity: [0, 0.6, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Rainbow gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-30 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Sparkle effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            initial={{
              x: Math.random() * 100 + '%',
              y: Math.random() * 100 + '%',
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.7,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content with depth */}
      <div style={{ transform: 'translateZ(50px)' }} className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
