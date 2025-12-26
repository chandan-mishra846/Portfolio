import { motion } from 'framer-motion';
import ImageRotator from '../components/ImageRotator';
import { useEffect, useState } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import FloatingBlob from '../components/FloatingBlob';
import TextReveal from '../components/TextReveal';
import MouseTracker from '../components/MouseTracker';
import Floating3DShape from '../components/Floating3DShape';
import GlitchText from '../components/GlitchText';
import LiquidButton from '../components/LiquidButton';

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
        className="section min-h-screen flex items-center relative overflow-hidden" 
        id="hero"
      >
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-black/20" />

        <div className="w-full flex items-center justify-start relative z-10 min-h-screen pl-6 md:pl-12 lg:pl-16">
          {/* Left Text Content */}
          <motion.div 
            className="w-full max-w-md"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="mb-6"
            >
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-white mb-2"
                animate={{ x: [0, -1, 1, -2, 2, 0], rotate: [0, 0.4, -0.4, 0.2, -0.2, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
              >
                Hi, I'm
              </motion.h1>
              <motion.h2
                className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500"
                animate={{ x: [0, 1, -1, 2, -2, 0], rotate: [0, -0.4, 0.4, -0.2, 0.2, 0] }}
                transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
              >
                Chandan Mishra
              </motion.h2>
            </motion.div>

            {/* Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6"
            >
              <motion.p
                className="text-sm md:text-base text-gray-300 leading-relaxed max-w-xl font-light"
                animate={{
                  color: ['#e5e7eb', '#67e8f9', '#93c5fd', '#c084fc', '#e5e7eb'],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              >
                Full Stack Developer crafting beautiful, scalable web experiences with modern tech. I transform ideas into pixel-perfect digital solutions.
              </motion.p>
            </motion.div>

            {/* Tech Stack Badges - Inline with icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap gap-2 mb-6 items-center"
            >
              {[
                { label: 'React.js', icon: '⚛️' },
                { label: 'Node.js', icon: '🟢' },
                { label: 'Express.js', icon: '⚡' },
                { label: 'MongoDB', icon: '🍃' }
              ].map((tech, idx) => (
                <motion.div
                  key={tech.label}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-gray-800/30 border border-cyan-500/30 text-gray-200 text-xs font-medium"
                  whileHover={{ scale: 1.05, borderColor: 'rgba(34, 211, 238, 0.5)' }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <span className="text-xs">{tech.icon}</span>
                  <span>{tech.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-3 mb-6 flex-wrap"
            >
              <LiquidButton href="#contact" data-mascot-trigger="hire" className="!px-5 !py-2 text-sm">
                ✨ Hire Me
              </LiquidButton>
              <LiquidButton 
                href="#projects"
                data-mascot-trigger="viewwork"
                className="!from-cyan-500 !to-cyan-400 !px-5 !py-2 text-sm"
              >
                🚀 View Work
              </LiquidButton>
            </motion.div>

            {/* Profile Links Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              <motion.a
                href="https://leetcode.com/u/chandan_mishra846/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-gradient-to-r from-yellow-600/40 to-yellow-700/40 border border-yellow-500/50 text-yellow-300 rounded-lg text-xs font-semibold hover:border-yellow-400/70 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                data-mascot-trigger="leetcode"
              >
                <span>🏆</span> LeetCode (1750+)
              </motion.a>
              <motion.a
                href="https://www.codechef.com/users/many_door_65"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-gradient-to-r from-amber-700/40 to-orange-700/40 border border-amber-600/50 text-amber-300 rounded-lg text-xs font-semibold hover:border-amber-400/70 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                data-mascot-trigger="codechef"
              >
                <span>⭐</span> CodeChef (3★)
              </motion.a>
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-gray-700/40 border border-gray-600/50 text-gray-300 rounded-lg text-xs font-semibold hover:border-gray-500/70 transition-all flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                data-mascot-trigger="github"
              >
                <span>💻</span> GitHub
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg
            className="w-6 h-6 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </section>
    </>
  );
}
