import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <motion.div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-[9999]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}>
      <div className="flex flex-col items-center gap-4">
        <motion.div className="w-12 h-12 border-4 border-brand border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} />
        <motion.p className="text-sm text-gray-600 dark:text-gray-300"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}>
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
}
