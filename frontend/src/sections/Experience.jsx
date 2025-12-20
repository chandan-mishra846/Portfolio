import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

const items = [
  { 
    title: 'B.Tech in Computer Science and Engineering', 
    place: 'IIIT Vadodara', 
    time: '2023 - Present', 
    desc: 'Current CPI: 7.7 | Specializing in Data Structures, Algorithms, and Full Stack Development. Active in competitive programming with 234 problems solved on LeetCode.'
  },
  { 
    title: 'JEE Mains 2023', 
    place: 'NTA', 
    time: '2023', 
    desc: '97.4 Percentile | Secured admission to Indian Institute of Information Technology, Vadodara through JoSAA counseling.'
  },
  { 
    title: 'Class XII (Intermediate)', 
    place: 'Sita Bal Vidya Mandir Inter College', 
    time: '2021', 
    desc: '88% | UP Board | Focused on Physics, Chemistry, and Mathematics with strong analytical and problem-solving skills.'
  },
  { 
    title: 'Class X (High School)', 
    place: 'Sita Bal Vidya Mandir Inter College', 
    time: '2019', 
    desc: '82.5% | UP Board | Built strong foundation in Mathematics, Science, and Computer Applications.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

export default function Experience() {
  return (
    <section className="section container" id="experience">
      <ScrollReveal>
        <h2 className="title">Experience & Education</h2>
      </ScrollReveal>
      
      <div className="relative pl-10">
        {/* Animated Timeline Line */}
        <motion.div 
          className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-brand via-cyan-400 to-brand-dark rounded-full"
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          viewport={{ once: true }}
        />
        
        {/* Decorative glow behind timeline */}
        <motion.div 
          className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-brand via-cyan-400 to-brand-dark rounded-full blur-lg opacity-50"
          initial={{ scaleY: 0, originY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
          viewport={{ once: true }}
        />

        <motion.ul className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}>
          {items.map((it, idx) => (
            <ScrollReveal key={idx} direction="right" delay={idx * 0.1}>
              <motion.li className="card card-hover relative group overflow-hidden"
                variants={itemVariants}
                whileHover={{ x: 8, y: -4 }}>
                
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Timeline dot with pulsing animation */}
                <motion.div 
                  className="absolute -left-9 top-8 w-6 h-6 bg-gradient-to-r from-brand to-cyan-400 rounded-full border-4 border-white dark:border-gray-900 shadow-lg"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(79, 70, 229, 0.4)',
                      '0 0 0 8px rgba(79, 70, 229, 0)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  whileHover={{ scale: 1.5 }}
                />
                
                <div className="relative z-10">
                  <motion.div 
                    className="inline-block px-3 py-1 bg-gradient-to-r from-brand/20 to-cyan-400/20 rounded-full text-xs font-bold text-brand dark:text-cyan-400 border border-brand/30 mb-2"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    {it.time}
                  </motion.div>
                  
                  <div className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent group-hover:from-brand group-hover:to-cyan-400 transition-all">
                    {it.title}
                  </div>
                  
                  <div className="text-sm font-semibold text-brand dark:text-cyan-400 mt-1 flex items-center gap-2">
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity }}>
                      📍
                    </motion.span>
                    {it.place}
                  </div>
                  
                  <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{it.desc}</p>
                </div>
              </motion.li>
            </ScrollReveal>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
