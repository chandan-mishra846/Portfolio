import { motion } from 'framer-motion';

export default function SkeletonLoader() {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {[1, 2].map(i => (
        <motion.div key={i} className="card"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}>
          <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
        </motion.div>
      ))}
    </div>
  );
}
