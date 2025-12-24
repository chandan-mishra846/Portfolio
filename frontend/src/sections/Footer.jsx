import { motion } from 'framer-motion';

const socials = [
  { name: 'GitHub', icon: '🐙', link: '#' },
  { name: 'LinkedIn', icon: '💼', link: '#' },
  { name: 'Twitter', icon: '𝕏', link: '#' },
  { name: 'Email', icon: '📧', link: 'mailto:contact@example.com' }
];

export default function Footer() {
  return (
    <footer className="section container border-t border-gray-200 dark:border-gray-800">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h3 className="font-bold text-lg mb-3">Chandan Mishra</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Building beautiful, performant web experiences.</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <h3 className="font-bold text-lg mb-3">Quick Links</h3>
          <ul className="text-sm space-y-1">
            {['About', 'Projects', 'Experience', 'Contact'].map(link => (
              <li key={link}><a href={`#${link.toLowerCase()}`} className="hover:text-brand transition-colors">{link}</a></li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
          <h3 className="font-bold text-lg mb-3">Connect</h3>
          <div className="flex gap-3">
            {socials.map((s, i) => (
              <motion.a key={s.name} href={s.link} target="_blank" rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-brand hover:text-white transition-colors"
                data-mascot-trigger={s.name.toLowerCase()}
                whileHover={{ scale: 1.15, rotate: 10 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                viewport={{ once: true }}
                title={s.name}>
                {s.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}>
        <div>© {new Date().getFullYear()} Chandan Mishra
          
          
          
          
          
          
          
          
          
          
          
          
          
          . All rights reserved.</div>
        <motion.a href="/resume.pdf" download className="hover:text-brand font-medium transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          Download Resume
        </motion.a>
      </motion.div>
    </footer>
  );
}
