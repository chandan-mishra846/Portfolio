import { motion } from 'framer-motion';
import { useState } from 'react';

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.button className="md:hidden fixed right-4 top-4 z-40 p-2 rounded-lg bg-brand text-white"
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.9 }}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </motion.button>

      <motion.div className="md:hidden fixed inset-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-30"
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: open ? 1 : 0, x: open ? 0 : 300 }}
        transition={{ duration: 0.3 }}
        pointerEvents={open ? 'auto' : 'none'}>
        <div className="pt-20 flex flex-col gap-4 px-6">
          {['About', 'Skills', 'Projects', 'Experience', 'Testimonials', 'Contact'].map((link, i) => (
            <motion.a key={link} href={`#${link.toLowerCase()}`} className="text-xl font-semibold hover:text-brand transition-colors"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: open ? 1 : 0, x: open ? 0 : 20 }}
              transition={{ delay: open ? i * 0.05 : 0 }}
              onClick={() => setOpen(false)}>
              {link}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
}
