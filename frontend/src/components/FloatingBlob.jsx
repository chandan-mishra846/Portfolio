import { motion } from 'framer-motion';

export default function FloatingBlob() {
  const blobVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      scale: [1, 1.05, 1],
    },
  };

  return (
    <motion.div
      className="absolute w-80 h-80 bg-gradient-to-r from-brand/20 to-cyan-400/20 rounded-full blur-3xl"
      variants={blobVariants}
      animate="animate"
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
  );
}
