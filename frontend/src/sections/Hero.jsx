import { motion } from 'framer-motion';
import ImageRotator from '../components/ImageRotator';
import { useEffect, useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import FloatingBlob from '../components/FloatingBlob';
import TextReveal from '../components/TextReveal';
import MouseTracker from '../components/MouseTracker';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Hero() {
  const photos = [
    '/temp/my photo1.jpg',
    '/temp/my photo2.jpg',
    '/temp/my photo3.jpg',
    '/temp/my photo4.jpg',
    '/temp/my photo5.jpg',
    '/temp/my photo6.jpg',
  ];
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <MouseTracker />
      <section 
        className="section container min-h-screen flex items-center relative overflow-hidden" 
        id="hero"
        style={{ backgroundPosition: `0 ${scrollY * 0.5}px` }}
      >
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <FloatingBlob />
          <motion.div
            className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/10 to-blue-500/10 rounded-full blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ right: '-10%', top: '20%' }}
          />
        </div>

        <div className="w-full flex items-center justify-between gap-8 relative z-10">
          <motion.div variants={container} initial="hidden" animate="show" className="flex-1">
            <motion.div variants={item}>
              <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
                Hi, I'm{' '}
                <span className="glow-text">Chandan Mishra</span>
              </h1>
            </motion.div>

            <motion.div variants={item} className="mt-6">
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed blur-in">
                Full Stack Developer crafting beautiful, scalable web experiences with modern tech. I transform ideas into pixel-perfect digital solutions. <br /><br />
                <span className="inline-block animate-bounce">⚛️</span> React.js · <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>🟢</span> Node.js · <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>🚀</span> Express.js · <span className="inline-block animate-bounce" style={{ animationDelay: '0.6s' }}>🍃</span> MongoDB · <span className="inline-block animate-bounce" style={{ animationDelay: '0.8s' }}>🎨</span> Tailwind CSS
              </p>
            </motion.div>

            <motion.div className="mt-8 flex gap-4 flex-wrap"
              variants={item}>
              <motion.a 
                className="btn hover:scale-105 transition-transform card-hover" 
                href="#contact"
                data-mascot-trigger="hire"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ✨ Hire Me
              </motion.a>
              <motion.a 
                className="btn bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 hover:scale-105 transition-transform card-hover" 
                href="#projects"
                data-mascot-trigger="viewwork"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🚀 View Work
              </motion.a>
            </motion.div>

            {/* Profile Links */}
            <motion.div className="mt-6 flex gap-3 flex-wrap" variants={item}>
              <motion.a 
                href="https://leetcode.com/u/chandan_mishra846/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                data-mascot-trigger="leetcode"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>🏆</span> LeetCode (1750+)
              </motion.a>
              <motion.a 
                href="https://www.codechef.com/users/many_door_65" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-amber-700 to-amber-900 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                data-mascot-trigger="codechef"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>⭐</span> CodeChef (3★)
              </motion.a>
              <motion.a 
                href="https://github.com/yourusername" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                data-mascot-trigger="github"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>💻</span> GitHub
              </motion.a>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="mt-12"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">Scroll to explore</p>
              <motion.svg 
                className="w-6 h-6 text-brand mx-auto"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </motion.div>
          </motion.div>

          <motion.div 
            className="hidden lg:flex flex-1 justify-center relative"
            initial={{ scale: 0.8, opacity: 0, x: 50 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          >
            <motion.div 
              className="relative w-72 h-72 rounded-full overflow-hidden shadow-2xl ring-4 ring-brand/20"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(79, 70, 229, 0.3)',
                  '0 0 40px rgba(79, 70, 229, 0.6)',
                  '0 0 20px rgba(79, 70, 229, 0.3)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <ImageRotator 
                images={photos}
                interval={3000}
                imgClassName="w-full h-full object-cover"
                alt="Chandan Mishra"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
