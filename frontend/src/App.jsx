import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Preloader from './components/Preloader.jsx';
import MobileMenu from './components/MobileMenu.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import BackToTop from './components/BackToTop.jsx';
import ThemeToggle from './components/ThemeToggle.jsx';
import MascotAssistant from './components/MascotAssistant.jsx';
import Nav3D from './components/Nav3D.jsx';
import Cursor3D from './components/Cursor3D.jsx';
import ParticleSystem from './components/ParticleSystem.jsx';
import AnimatedMeshGradient from './components/AnimatedMeshGradient.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Experience from './sections/Experience.jsx';
import Certifications from './sections/Certifications.jsx';
//import Testimonials from './sections/Testimonials.jsx';
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
      <MascotAssistant />
      <Cursor3D />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 0.5 }}>
        <nav className="sticky top-0 backdrop-blur bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 z-30 shadow-lg">
          <div className="container py-4 flex items-center justify-between" style={{ perspective: '1000px' }}>
            <motion.a 
              href="#hero" 
              className="font-bold text-xl bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent"
              style={{ transformStyle: 'preserve-3d' }}
              whileHover={{ scale: 1.05, rotateY: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              Chandan Mishra
            </motion.a>
            <Nav3D />
          </div>
        </nav>

        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        {/* <Testimonials /> */} 
        <Contact />
        <Footer />
      </motion.div>
    </>
  );
}