import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } }
};

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    const api = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    axios.get(`${api}/api/skills`).then(res => {
      setSkills(res.data);
    }).finally(() => setLoading(false));
  }, []);

  // Lightweight category inference based on skill name
  const inferCategory = (name) => {
    const n = (name || '').toLowerCase();
    if (/(react|next|vite|tailwind|html|css|javascript|typescript)/.test(n)) return 'Frontend';
    if (/(node|express|mongo|mongoose|api|server)/.test(n)) return 'Backend';
    if (/(dsa|algorithm|algorithms|data\s*structure|structures|leetcode|codechef)/.test(n)) return 'DSA';
    if (/(git|docker|vercel|netlify|postman)/.test(n)) return 'Tools';
    return 'Other';
  };

  const displaySkills = useMemo(() => {
    return skills
      .map(s => ({ ...s, _category: inferCategory(s.name) }))
      .filter(s => (category === 'All' ? true : s._category === category))
      .filter(s => s.name.toLowerCase().includes(query.toLowerCase()));
  }, [skills, query, category]);

  const levelFor = (p) => (p >= 75 ? 'Advanced' : p >= 50 ? 'Intermediate' : 'Beginner');

  return (
    <section className="section container" id="skills">
      <ScrollReveal>
        <h2 className="title">Skills</h2>
      </ScrollReveal>
      {/* Controls */}
      <div className="mt-4 mb-6 flex flex-wrap gap-3 items-center">
        <input
          type="text"
          placeholder="Search skills..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input px-3 py-2 rounded-lg border dark:border-gray-700 bg-white/70 dark:bg-gray-900/60 backdrop-blur text-sm"
        />
        {['All','Frontend','Backend','DSA','Tools','Other'].map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${category===cat ? 'bg-brand text-white border-brand' : 'bg-white/60 dark:bg-gray-900/40 border-gray-300 dark:border-gray-700'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      {loading ? (
        <SkeletonLoader />
      ) : (
        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <AnimatePresence mode="popLayout">
          {displaySkills.length === 0 && (
            <motion.div
              className="card col-span-full text-center py-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <p className="text-sm text-gray-600 dark:text-gray-400">No skills found for this filter.</p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Try switching category or clearing search.</p>
            </motion.div>
          )}
          {displaySkills.map((s, idx) => (
              <motion.div
                key={s._id || s.name || idx}
                className="card card-hover group cursor-pointer relative overflow-hidden"
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit="exit"
                layout
                whileHover={{ y: -6, scale: 1.01 }}
              >
                {/* Glow background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  {/* Header with icon and name */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div
                        className="w-14 h-14 rounded-full p-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-white/30 dark:border-gray-700/50 shadow-sm flex items-center justify-center"
                      >
                        <img
                          src={s.icon || 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'}
                          alt={s.name}
                          className="w-10 h-10 object-contain"
                        />
                      </div>
                    </div>
                    <div className="flex-1">
                      <motion.h3
                        className="font-bold text-lg bg-gradient-to-r from-brand to-cyan-400 bg-clip-text text-transparent"
                        transition={{ duration: 0.3 }}
                      >
                        {s.name}
                      </motion.h3>
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-gray-600 dark:text-gray-400">{s._category}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-md border ${s.proficiency>=75 ? 'bg-emerald-100/50 dark:bg-emerald-900/30 border-emerald-300 text-emerald-700 dark:text-emerald-200' : s.proficiency>=50 ? 'bg-amber-100/50 dark:bg-amber-900/30 border-amber-300 text-amber-700 dark:text-amber-200' : 'bg-rose-100/50 dark:bg-rose-900/30 border-rose-300 text-rose-700 dark:text-rose-200'}`}>{levelFor(s.proficiency)}</span>
                      </div>
                    </div>
                    <motion.span
                      className="text-sm font-bold bg-gradient-to-r from-brand to-brand-dark bg-clip-text text-transparent"
                    >
                      {s.proficiency}%
                    </motion.span>
                  </div>

                  {/* Enhanced Progress Bar */}
                  <div className="relative w-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-full h-3 overflow-hidden shadow-inner">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-brand via-cyan-400 to-brand-dark rounded-full shadow-lg"
                      initial={{ width: 0, opacity: 0 }}
                      whileInView={{ width: `${s.proficiency}%`, opacity: 1 }}
                      transition={{ duration: 1.0, delay: 0.15, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    />
                    {/* Gentle shimmer */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{ x: ['-120%', '120%'] }}
                      transition={{ duration: 2.4, repeat: Infinity }}
                    />
                    {/* Tooltip on hover showing exact percentage */}
                    <div className="absolute -top-7 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-xs px-2 py-1 rounded bg-black/70 text-white">
                      {s.proficiency}%
                    </div>
                  </div>
                </div>
              </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}
