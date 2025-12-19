import { motion } from 'framer-motion';

const items = [
  { title: 'Senior Frontend Developer', place: 'Tech Corp', time: '2023 - Present', desc: 'Leading UI architecture and performance optimization.' },
  { title: 'Frontend Engineer', place: 'Startup Inc.', time: '2021 - 2023', desc: 'Built SPA dashboards and responsive landing pages.' },
  { title: 'B.Sc. Computer Science', place: 'University', time: '2017 - 2021', desc: 'Focused on HCI and modern web technologies.' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

export default function Experience() {
  return (
    <section className="section container" id="experience">
      <h2 className="title">Experience & Education</h2>
      <div className="relative pl-8">
        <motion.div className="absolute left-3 top-0 bottom-0 w-1 bg-gradient-to-b from-brand to-brand-dark rounded"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          viewport={{ once: true }} />
        <motion.ul className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}>
          {items.map((it, idx) => (
            <motion.li key={idx} className="card relative hover:shadow-md transition-shadow"
              variants={itemVariants}
              whileHover={{ x: 5 }}>
              <motion.div className="absolute -left-5 top-6 w-4 h-4 bg-brand rounded-full border-4 border-white dark:border-gray-900 shadow-md"
                whileHover={{ scale: 1.2 }} />
              <div className="font-semibold text-lg">{it.title}</div>
              <div className="text-sm text-brand font-medium">{it.place}</div>
              <div className="text-sm text-gray-500">{it.time}</div>
              <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{it.desc}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
