import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import SkeletonLoader from '../components/SkeletonLoader.jsx';

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
      <h2 className="title">Skills</h2>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <motion.div className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}>
          {skills.map(s => (
            <motion.div key={s._id} className="card group hover:shadow-lg transition-shadow cursor-pointer"
              variants={itemVariants}
              whileHover={{ x: 5 }}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-lg">{s.name}</span>
                <motion.span className="text-sm font-bold bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}>
                  {s.proficiency}%
                </motion.span>
              </div>
              <div className="relative w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden shadow-inner">
                <motion.div className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand via-brand-dark to-brand rounded-full shadow-lg"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.proficiency}%` }}
                  transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
                  viewport={{ once: true }} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
