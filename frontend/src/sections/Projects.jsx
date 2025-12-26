import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import SkeletonLoader from '../components/SkeletonLoader.jsx';
import ScrollReveal from '../components/ScrollReveal';
import Card3D from '../components/Card3D';
import ParallaxLayer from '../components/ParallaxLayer';
import HolographicCard from '../components/HolographicCard';
import GlitchText from '../components/GlitchText';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    axios.get(`${api}/api/projects`).then(res => {
      setProjects(res.data);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <section className="section container" id="projects">
      <ScrollReveal>
        <h2 className="text-4xl md:text-5xl font-black mb-8 text-center text-white">
          <GlitchText glitchIntensity="low">Projects</GlitchText>
        </h2>
      </ScrollReveal>
      {loading ? (
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <motion.div key={i} className="card h-64"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }} />
          ))}
        </div>
      ) : (
        <motion.div className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}>
          {projects.map((p, idx) => (
            <ParallaxLayer key={p._id} offset={30}>
              <Card3D intensity={12}>
                <HolographicCard className="group">
                  <motion.div className="card card-hover overflow-hidden relative h-full"
                    variants={itemVariants}
                    data-project-title={p.title}
                    data-project-desc={p.description}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                  
                  {/* Card glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/0 to-cyan-400/0 group-hover:from-brand/10 group-hover:to-cyan-400/10 transition-all duration-300 rounded-xl" />

                  <div className="relative overflow-hidden rounded-lg h-40 bg-gray-100 dark:bg-gray-800" style={{ transform: 'translateZ(30px)' }}>
                    <motion.img 
                      src={p.image || 'https://picsum.photos/400/240'} 
                      alt={p.title} 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.2, rotate: 2 }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 backdrop-blur-sm">
                      <p className="text-white text-sm font-medium leading-relaxed">{p.description.substring(0, 60)}...</p>
                    </motion.div>
                  </div>

                  <div className="relative z-10">
                    <motion.h3 
                      className="mt-4 text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-brand group-hover:to-cyan-400 transition-all"
                    >
                      {p.title}
                    </motion.h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{p.description}</p>

                  <div className="mt-4 flex gap-2 flex-wrap">
                    {p.techStack?.map((t, tidx) => (
                      <motion.span 
                        key={t} 
                        className="px-3 py-1.5 bg-gradient-to-r from-brand/10 to-cyan-400/10 border border-brand/40 dark:border-brand/60 rounded-lg text-xs font-semibold text-brand dark:text-cyan-400 backdrop-blur-sm"
                        whileHover={{ 
                          scale: 1.15, 
                          boxShadow: '0 0 12px rgba(79, 70, 229, 0.5)',
                          background: 'linear-gradient(to right, rgba(79, 70, 229, 0.2), rgba(34, 211, 238, 0.2))'
                        }}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: tidx * 0.05 }}
                        viewport={{ once: true }}
                      >
                        {t}
                      </motion.span>
                    ))}
                  </div>

                  <motion.div className="mt-5 flex gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}>
                    {p.liveLink && (
                      <motion.a 
                        className="px-4 py-2 bg-gradient-to-r from-brand to-cyan-400 text-white font-semibold rounded-lg text-sm hover:shadow-lg transition-all" 
                        href={p.liveLink} 
                        target="_blank" 
                        rel="noreferrer"
                        data-mascot-trigger="live"
                        whileHover={{ scale: 1.08, boxShadow: '0 8px 16px rgba(79, 70, 229, 0.4)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        🌐 Live
                      </motion.a>
                    )}
                    {p.githubLink && (
                      <motion.a 
                        className="px-4 py-2 bg-gray-800 dark:bg-gray-700 text-white font-semibold rounded-lg text-sm hover:shadow-lg transition-all" 
                        href={p.githubLink} 
                        target="_blank" 
                        rel="noreferrer"
                        data-mascot-trigger="projectgithub"
                        whileHover={{ scale: 1.08, boxShadow: '0 8px 16px rgba(79, 70, 229, 0.3)' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ⭐ GitHub
                      </motion.a>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            </HolographicCard>
            </Card3D>
            </ParallaxLayer>
          ))}
        </motion.div>
      )}
    </section>
  );
}
