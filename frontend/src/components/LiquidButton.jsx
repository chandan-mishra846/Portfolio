import { motion } from 'framer-motion';

export default function LiquidButton({ children, href, className = '', ...props }) {
  return (
    <motion.a
      href={href}
      className={`relative inline-block px-8 py-4 font-bold text-white overflow-hidden rounded-full ${className}`}
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {/* Liquid background layers */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-brand to-cyan-400"
        variants={{
          hover: {
            scale: 1.05,
            transition: { duration: 0.3 }
          },
          tap: {
            scale: 0.95
          }
        }}
      />
      
      {/* Morphing blob effect */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.3), transparent 70%)',
        }}
        variants={{
          hover: {
            scale: [1, 1.5, 1.2],
            x: [0, 10, -10, 0],
            y: [0, -10, 10, 0],
          }
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />

      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-white opacity-0"
        variants={{
          hover: {
            scale: [1, 1.5],
            opacity: [0.6, 0],
          }
        }}
        transition={{
          duration: 1,
          repeat: Infinity
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
        variants={{
          hover: {
            x: ['-100%', '200%'],
            opacity: [0, 0.3, 0],
          }
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </motion.a>
  );
}
