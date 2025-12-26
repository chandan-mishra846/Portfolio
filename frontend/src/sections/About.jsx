import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter.jsx';
import ScrollReveal from '../components/ScrollReveal';
import Card3D from '../components/Card3D';
import Floating3DShape from '../components/Floating3DShape';
import GlitchText from '../components/GlitchText';
import MorphingBlob from '../components/MorphingBlob';
import HolographicCard from '../components/HolographicCard';

const highlightPills = [
  'Full-stack problem solver',
  '3D/animation enthusiast',
  'MERN + TypeScript',
  'Competitive programming',
  'System design curious',
  'Always shipping',
];

const focusAreas = [
  {
    title: 'Product-minded engineering',
    detail: 'I bridge UX ambition with reliable APIs, keeping accessibility and performance in the loop.',
  },
  {
    title: 'Learning in public',
    detail: 'I share breakdowns of LeetCode grinds, DS/Algo notes, and ship logs to stay accountable.',
  },
  {
    title: 'Motion-first interfaces',
    detail: 'I love adding tasteful motion - parallax, micro-interactions, and 3D touches that still serve clarity.',
  },
];

const stats = [
  { label: 'Projects shipped', value: '6+' },
  { label: 'DSA problems', value: '234+' },
  { label: 'Hackathons', value: '3' },
];

export default function About() {
  return (
    <section
      className="section min-h-screen flex items-center justify-start relative overflow-hidden pl-6 md:pl-12 lg:pl-16"
      id="about"
      data-about-section="true"
      style={{
        backgroundImage: 'url(/temp/about.jpg)',
        backgroundSize: '105%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/25" />
      <MorphingBlob size="xl" color="gradient" position={{ top: '-15%', left: '-8%' }} />
      <MorphingBlob size="lg" color="cyan" position={{ bottom: '-10%', right: '-5%' }} delay={3} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Floating3DShape type="cube" delay={0.6} position={{ top: '15%', right: '12%' }} />
        <Floating3DShape type="pyramid" delay={1.2} position={{ bottom: '18%', left: '8%' }} />
      </div>

      <div className="w-full relative z-10 min-h-screen flex items-center">
        <div className="w-full max-w-md">
          <ScrollReveal>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="mb-6"
              >
                <motion.h1
                  className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight"
                  animate={{ x: [0, -1, 1, -2, 2, 0], rotate: [0, 0.4, -0.4, 0.2, -0.2, 0] }}
                  transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
                >
                  <span className="text-white">About </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500">Me</span>
                </motion.h1>
              </motion.div>

              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-7 space-y-4"
              >
                <motion.p
                  className="text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed max-w-3xl font-medium"
                  animate={{
                    color: ['#e5e7eb', '#67e8f9', '#93c5fd', '#c084fc', '#e5e7eb'],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  I'm a Full Stack MERN Developer with hands-on experience building 6+ end-to-end web applications, handling both frontend and backend development.
                </motion.p>
                <motion.p
                  className="text-base md:text-lg text-gray-250 leading-relaxed max-w-3xl"
                >
                  I enjoy turning ideas into scalable products and have worked extensively with React, Node.js, Express, MongoDB, and modern UI frameworks.
                </motion.p>
                <motion.p
                  className="text-base md:text-lg text-gray-250 leading-relaxed max-w-3xl"
                >
                  Alongside development, I have a strong foundation in Data Structures and Algorithms, having solved 250+ problems on LeetCode (1750+ rating) and earning a 3⭐ rating on CodeChef.
                </motion.p>
                <motion.p
                  className="text-base md:text-lg text-gray-250 leading-relaxed max-w-3xl"
                >
                  I'm passionate about writing clean, efficient code, learning new technologies, and building real-world solutions that create impact.
                </motion.p>
              </motion.div>

              {/* Key Facts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-wrap gap-3 mb-7"
              >
                {[
                  { label: 'Projects', value: '6+' },
                  { label: 'DSA Problems Solved', value: '450+' },
                ].map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 border border-cyan-500/50 text-gray-100"
                    whileHover={{ scale: 1.05, borderColor: 'rgba(34, 211, 238, 0.8)' }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <span className="text-xl font-extrabold text-cyan-300">{stat.value}</span>
                    <span className="text-xs md:text-sm font-semibold uppercase tracking-[0.12em]">{stat.label}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex gap-3 flex-wrap"
              >
                <a
                  href="#projects"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-300 text-gray-950 font-semibold shadow-lg shadow-cyan-500/40 hover:shadow-cyan-500/60 hover:translate-y-[-2px] transition text-sm md:text-base"
                >
                  View My Work
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-full border border-cyan-400/60 text-cyan-100 font-semibold hover:border-cyan-200 hover:bg-cyan-950/30 transition text-sm md:text-base"
                >
                  Let's Connect
                </a>
              </motion.div>
            </motion.div>
          </ScrollReveal>
        </div>
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
  );
}
