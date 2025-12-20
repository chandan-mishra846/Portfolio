import { motion } from 'framer-motion';
import AnimatedCounter from '../components/AnimatedCounter.jsx';
import ScrollReveal from '../components/ScrollReveal';
import ImageRotator from '../components/ImageRotator';

export default function About() {
  return (
    <section className="section container" id="about">
      <ScrollReveal>
        <h2 className="title">About Me</h2>
      </ScrollReveal>
      
      <div className="grid md:grid-cols-2 gap-8">
        <ScrollReveal direction="left">
          <motion.div className="card card-hover relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}>
            
            {/* Card background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand/10 to-cyan-400/10 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            
            <div className="relative z-10">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                Passionate full-stack developer transforming ideas into beautiful, high-performance digital experiences. I specialize in modern web technologies and love crafting seamless user interfaces paired with robust backend solutions.
              </p>
              
              {/* Stats Grid */}
              <div className="mt-8 grid grid-cols-3 gap-4">
                <motion.div 
                  className="p-4 rounded-lg bg-gradient-to-br from-brand/10 to-cyan-400/10 border border-brand/20 text-center group hover:border-brand/50 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(79, 70, 229, 0.15)' }}
                >
                  <div className="text-4xl font-black bg-gradient-to-r from-brand to-cyan-400 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-brand transition-all">
                    <AnimatedCounter end={3} />
                  </div>
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-2 uppercase tracking-wide">Years Exp</div>
                </motion.div>
                
                <motion.div 
                  className="p-4 rounded-lg bg-gradient-to-br from-brand/10 to-cyan-400/10 border border-brand/20 text-center group hover:border-brand/50 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(79, 70, 229, 0.15)' }}
                >
                  <div className="text-4xl font-black bg-gradient-to-r from-brand to-cyan-400 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-brand transition-all">
                    <AnimatedCounter end={20} />
                  </div>
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-2 uppercase tracking-wide">Projects</div>
                </motion.div>
                
                <motion.div 
                  className="p-4 rounded-lg bg-gradient-to-br from-brand/10 to-cyan-400/10 border border-brand/20 text-center group hover:border-brand/50 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(79, 70, 229, 0.15)' }}
                >
                  <div className="text-4xl font-black bg-gradient-to-r from-brand to-cyan-400 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-brand transition-all">
                    <AnimatedCounter end={5} />
                  </div>
                  <div className="text-xs font-semibold text-gray-600 dark:text-gray-400 mt-2 uppercase tracking-wide">Certifications</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </ScrollReveal>
        
        <ScrollReveal direction="right">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: 'spring', stiffness: 100 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-brand/20"
              animate={{ 
                boxShadow: [
                  '0 0 20px rgba(79, 70, 229, 0.3)',
                  '0 0 40px rgba(79, 70, 229, 0.6)',
                  '0 0 20px rgba(79, 70, 229, 0.3)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <ImageRotator 
                images={[ '/temp/my photo1.jpg', '/temp/my photo2.jpg', '/temp/my photo3.jpg', '/temp/my photo4.jpg', '/temp/my photo5.jpg', '/temp/my photo6.jpg' ]}
                interval={3000}
                imgClassName="w-full h-80 object-cover"
                alt="Profile"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
