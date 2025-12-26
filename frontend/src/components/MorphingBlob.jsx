import { motion } from 'framer-motion';

export default function MorphingBlob({ size = 'lg', color = 'brand', position = {}, delay = 0 }) {
  const sizes = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-96 h-96',
  };

  const colors = {
    brand: 'from-brand/20 to-brand-dark/20',
    cyan: 'from-cyan-400/20 to-cyan-600/20',
    purple: 'from-purple-400/20 to-purple-600/20',
    pink: 'from-pink-400/20 to-pink-600/20',
    gradient: 'from-brand/20 via-purple-400/20 to-cyan-400/20',
  };

  return (
    <motion.div
      className={`absolute ${sizes[size]} rounded-full blur-3xl pointer-events-none bg-gradient-to-br ${colors[color]}`}
      style={{
        ...position,
      }}
      animate={{
        scale: [1, 1.3, 0.9, 1.2, 1],
        rotate: [0, 90, 180, 270, 360],
        borderRadius: ['60% 40% 30% 70%/60% 30% 70% 40%', '30% 60% 70% 40%/50% 60% 30% 60%', '40% 60% 60% 40%/60% 40% 60% 40%', '60% 40% 30% 70%/60% 30% 70% 40%'],
        x: [0, 30, -30, 20, 0],
        y: [0, -20, 20, -30, 0],
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  );
}
