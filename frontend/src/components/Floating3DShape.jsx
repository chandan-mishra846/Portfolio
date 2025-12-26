import { motion } from 'framer-motion';

export default function Floating3DShape({ type = 'cube', color = 'brand', delay = 0, position = {} }) {
  const shapes = {
    cube: (
      <div className="relative w-24 h-24" style={{ transformStyle: 'preserve-3d' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-brand-dark/20 backdrop-blur-sm border border-brand/30"
          style={{ transform: 'translateZ(12px)' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-brand-dark/10 backdrop-blur-sm border border-brand/20"
          style={{ transform: 'rotateY(90deg) translateZ(12px)' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-brand/15 to-brand-dark/15 backdrop-blur-sm border border-brand/25"
          style={{ transform: 'rotateX(90deg) translateZ(12px)' }} />
      </div>
    ),
    sphere: (
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-500/20 backdrop-blur-sm border border-purple-400/30 shadow-xl" />
    ),
    pyramid: (
      <div className="relative w-0 h-0 border-l-[40px] border-l-transparent border-r-[40px] border-r-transparent border-b-[70px] border-b-cyan-400/30"
        style={{ filter: 'drop-shadow(0 10px 20px rgba(34, 211, 238, 0.3))' }} />
    ),
    ring: (
      <div className="relative w-24 h-24">
        <div className="absolute inset-0 rounded-full border-4 border-yellow-400/30" 
          style={{ transform: 'rotateX(60deg)' }} />
        <div className="absolute inset-2 rounded-full border-4 border-yellow-500/40" 
          style={{ transform: 'rotateX(60deg)' }} />
      </div>
    )
  };

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        transformStyle: 'preserve-3d',
        ...position
      }}
      animate={{
        y: [0, -30, 0],
        rotateX: [0, 360],
        rotateY: [0, 360],
      }}
      transition={{
        duration: 20,
        delay,
        repeat: Infinity,
        ease: 'linear'
      }}
    >
      {shapes[type] || shapes.cube}
    </motion.div>
  );
}
