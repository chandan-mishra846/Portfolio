import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import SkeletonLoader from '../components/SkeletonLoader.jsx';

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
      <h2 className="title">Projects</h2>
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
          {projects.map(p => (
            <motion.div key={p._id} className="card group overflow-hidden hover:shadow-xl transition-shadow"
              variants={itemVariants}
              whileHover={{ y: -12, transition: { duration: 0.3 } }}>
              <div className="relative overflow-hidden rounded-lg h-40 bg-gray-100 dark:bg-gray-800">
                <motion.img src={p.image || 'https://picsum.photos/400/240'} alt={p.title} className="w-full h-full object-cover"
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.4 }} />
                <motion.div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white text-sm font-medium">{p.description.substring(0, 50)}...</p>
                </motion.div>
              </div>
              <h3 className="mt-4 text-xl font-semibold group-hover:text-brand transition-colors">{p.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{p.description}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {p.techStack?.map(t => (
                  <motion.span key={t} className="px-2 py-1 bg-gradient-to-r from-brand/10 to-brand-dark/10 border border-brand/30 rounded-md text-xs font-medium text-brand dark:text-brand-dark"
                    whileHover={{ scale: 1.1, boxShadow: '0 0 8px rgba(79, 70, 229, 0.4)' }}
                    transition={{ duration: 0.2 }}>
                    {t}
                  </motion.span>
                ))}
              </div>
              <motion.div className="mt-4 flex gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}>
                {p.liveLink && <a className="link hover:scale-110 transition-transform" href={p.liveLink} target="_blank" rel="noreferrer">Live</a>}
                {p.githubLink && <a className="link hover:scale-110 transition-transform" href={p.githubLink} target="_blank" rel="noreferrer">GitHub</a>}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
