import { motion } from 'framer-motion';

export default function TextReveal({ children, staggerDelay = 0.03 }) {
  const textArray = typeof children === 'string' ? children.split('') : [children];

  return (
    <motion.span>
      {textArray.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * staggerDelay, duration: 0.5 }}
          viewport={{ once: true }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
