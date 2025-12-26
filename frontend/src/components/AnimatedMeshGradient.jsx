import { motion } from 'framer-motion';

export default function AnimatedMeshGradient() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Main animated gradient */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at 20% 50%, rgba(79, 70, 229, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
        }}
        animate={{
          background: [
            'radial-gradient(circle at 20% 50%, rgba(79, 70, 229, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 50%, rgba(79, 70, 229, 0.15) 0%, transparent 50%), radial-gradient(circle at 20% 20%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 60% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(79, 70, 229, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 30%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 50%, rgba(79, 70, 229, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(34, 211, 238, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Animated blobs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full blur-3xl opacity-30"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
        animate={{
          x: ['0%', '100%', '0%'],
          y: ['0%', '50%', '0%'],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full blur-3xl opacity-20"
        style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          right: 0,
          bottom: 0,
        }}
        animate={{
          x: ['0%', '-80%', '0%'],
          y: ['0%', '-60%', '0%'],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
}
