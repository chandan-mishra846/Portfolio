import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Preloader from './components/Preloader.jsx';
import MobileMenu from './components/MobileMenu.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import BackToTop from './components/BackToTop.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Experience from './sections/Experience.jsx';
import Testimonials from './sections/Testimonials.jsx';
import Contact from './sections/Contact.jsx';
import Footer from './sections/Footer.jsx';

export default function App() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>Chandan Mishra</title>
        <meta name="description" content="Modern, clean, and responsive developer portfolio with animations and dynamic content." />
        <meta name="theme-color" content="#4f46e5" />
      </Helmet>

      <Preloader />
      <ScrollProgress />
      <BackToTop />
      <ThemeToggle />
      <MobileMenu />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.5 }}>
        <nav className="sticky top-0 backdrop-blur bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 z-30">
          <div className="container py-4 flex items-center justify-between">
            <motion.a href="#hero" className="font-bold text-xl bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}>
              Chandan Mishra
            </motion.a>
            <div className="hidden md:flex gap-1 text-sm">
              {['About', 'Skills', 'Projects', 'Experience', 'Testimonials', 'Contact'].map(link => (
                <motion.a key={link} href={`#${link.toLowerCase()}`} className="px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  whileHover={{ scale: 1.05 }}>
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </nav>

        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <Contact />
        <Footer />
      </motion.div>
    </>
  );
}
