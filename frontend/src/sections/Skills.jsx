import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import SkeletonLoader from '../components/SkeletonLoader.jsx';
import ScrollReveal from '../components/ScrollReveal';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    axios.get(`${api}/api/skills`).then(res => {
      setSkills(res.data);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <section className="section container" id="skills">
      <ScrollReveal>
        <h2 className="title">Skills</h2>
      </ScrollReveal>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <motion.div className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}>
          {skills.map((s, idx) => (
            <ScrollReveal key={s._id} delay={idx * 0.1}>
              <motion.div className="card card-hover group cursor-pointer relative overflow-hidden"
                variants={itemVariants}
                whileHover={{ x: 8, y: -4 }}>
                {/* Glow background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <motion.span 
                      className="font-bold text-lg bg-gradient-to-r from-brand to-cyan-400 bg-clip-text text-transparent"
                      animate={{ opacity: [1, 0.7, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {s.name}
                    </motion.span>
                    <motion.span className="text-sm font-bold bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent"
                      animate={{ scale: [1, 1.15, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}>
                      {s.proficiency}%
                    </motion.span>
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div className="relative w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand via-cyan-400 to-brand-dark rounded-full shadow-lg"
                      initial={{ width: 0, opacity: 0 }}
                      whileInView={{ width: `${s.proficiency}%`, opacity: 1 }}
                      transition={{ duration: 1.2, delay: 0.2, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    />
                    
                    {/* Shimmer effect on progress bar */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}

          ))}
        </motion.div>
      )}
    </section>
  );
}
