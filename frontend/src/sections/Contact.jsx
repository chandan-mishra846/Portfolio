import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);
  const [focused, setFocused] = useState(null);

  const api = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post(`${api}/api/contact`, form);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('error');
    }
  }

  return (
    <section className="section container" id="contact">
      <h2 className="title">Get In Touch</h2>
      <motion.form className="card grid gap-4 max-w-2xl" onSubmit={submit}
        variants={formVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}>
        <motion.div variants={fieldVariants} className="relative">
          <input className="w-full rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:border-brand transition-colors"
            placeholder="Your Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} required />
          <motion.div className="absolute bottom-0 left-0 h-0.5 bg-brand rounded-full"
            initial={{ width: 0 }}
            animate={{ width: focused === 'name' ? '100%' : 0 }}
            transition={{ duration: 0.3 }} />
        </motion.div>

        <motion.div variants={fieldVariants} className="relative">
          <input type="email" className="w-full rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:border-brand transition-colors"
            placeholder="Your Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} required />
          <motion.div className="absolute bottom-0 left-0 h-0.5 bg-brand rounded-full"
            initial={{ width: 0 }}
            animate={{ width: focused === 'email' ? '100%' : 0 }}
            transition={{ duration: 0.3 }} />
        </motion.div>

        <motion.div variants={fieldVariants} className="relative">
          <textarea className="w-full rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:border-brand transition-colors" placeholder="Your Message" rows="5" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} required />
          <motion.div className="absolute bottom-0 left-0 h-0.5 bg-brand rounded-full"
            initial={{ width: 0 }}
            animate={{ width: focused === 'message' ? '100%' : 0 }}
            transition={{ duration: 0.3 }} />
        </motion.div>

        <motion.button className="btn" type="submit" disabled={status === 'sending'}
          variants={fieldVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          {status === 'sending' ? (
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>⚡</motion.span>
          ) : (
            'Send Message'
          )}
        </motion.button>

        <AnimatePresence>
          {status === 'sent' && (
            <motion.div className="text-green-600 font-semibold text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}>
              ✓ Message sent successfully!
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div className="text-red-600 font-semibold text-center"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}>
              ✗ Something went wrong.
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>
    </section>
  );
}
