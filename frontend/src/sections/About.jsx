import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter.jsx';

export default function About() {
  return (
    <section className="section container" id="about">
      <h2 className="title">About Me</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div className="card"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Passionate developer focused on building delightful, performant interfaces. With years of experience in modern web technologies, I craft seamless user experiences and scalable solutions.
          </p>
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <div className="text-3xl font-bold text-brand"><AnimatedCounter end={3} /></div>
              <div className="text-sm text-gray-500">Years</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <div className="text-3xl font-bold text-brand"><AnimatedCounter end={20} /></div>
              <div className="text-sm text-gray-500">Projects</div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <div className="text-3xl font-bold text-brand"><AnimatedCounter end={5} /></div>
              <div className="text-sm text-gray-500">Certs</div>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileHover={{ y: -10, transition: { duration: 0.3 } }}>
          <img className="rounded-xl object-cover w-full h-64 shadow-lg" src="/temp/my photo.jpg" alt="Profile" />
        </motion.div>
      </div>
    </section>
  );
}
