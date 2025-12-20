import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

// Add your certificates here
const certificates = [
  // Example structure - uncomment and add your certificates:
  // { 
  //   title: 'Full Stack Web Development', 
  //   issuer: 'Coursera', 
  //   date: '2024',
  //   logo: 'https://example.com/certificate-logo.png',
  //   credentialUrl: 'https://example.com/credential'
  // },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

export default function Certifications() {
  // Don't render if no certificates
  if (certificates.length === 0) return null;

  return (
    <section className="section container" id="certifications">
      <ScrollReveal>
        <h2 className="title">Certifications</h2>
      </ScrollReveal>
      
      <motion.div 
        className="grid md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {certificates.map((cert, idx) => (
          <ScrollReveal key={idx} delay={idx * 0.1}>
            <motion.div
              className="card card-hover group cursor-pointer relative overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Card glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Certificate Logo */}
                {cert.logo && (
                  <div className="w-16 h-16 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur border border-white/30 dark:border-gray-700/50 shadow-sm flex items-center justify-center mb-4">
                    <img
                      src={cert.logo}
                      alt={cert.issuer}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                )}
                
                <h3 className="font-bold text-lg bg-gradient-to-r from-brand to-cyan-400 bg-clip-text text-transparent">
                  {cert.title}
                </h3>
                
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {cert.issuer}
                </div>
                
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                  {cert.date}
                </div>
                
                {cert.credentialUrl && (
                  <motion.a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block px-4 py-2 bg-gradient-to-r from-brand to-cyan-400 text-white rounded-lg text-sm font-semibold hover:shadow-lg transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Credential →
                  </motion.a>
                )}
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </motion.div>
    </section>
  );
}
