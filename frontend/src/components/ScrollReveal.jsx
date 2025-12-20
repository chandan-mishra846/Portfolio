import { motion } from 'framer-motion';

export default function ScrollReveal({ children, direction = 'up', delay = 0 }) {

  const directionVariants = {
    up: { y: 50, opacity: 0 },
    down: { y: -50, opacity: 0 },
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 },
  };

  return (
    <motion.div
      initial={directionVariants[direction]}
      whileInView={{ x: 0, y: 0, opacity: 1 }}
      // Allow re-trigger when content changes or filters toggle
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
