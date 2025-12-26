import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';

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
  const [errorMsg, setErrorMsg] = useState('');
  const [focused, setFocused] = useState(null);

  const api = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  async function submit(e) {
    e.preventDefault();
    setStatus('sending');
    try {
      const trimmedForm = {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim()
      };
      await axios.post(`${api}/api/contact`, trimmedForm);
      setStatus('sent');
      setForm({ name: '', email: '', message: '' });
      setErrorMsg('');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.response?.data?.error || 'Failed to send message. Please try again.');
      console.error('Contact error:', err);
    }
  }

  return (
    <section className="section container" id="contact">
      <ScrollReveal>
        <h2 className="title">Get In Touch</h2>
      </ScrollReveal>
      
      <motion.form className="card card-hover grid gap-6 max-w-2xl mx-auto relative overflow-hidden" onSubmit={submit}
        data-contact-section="true"
        variants={formVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}>
        
        {/* Glow background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-cyan-400/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10">
          <motion.div variants={fieldVariants} className="relative group">
            <input 
              className="w-full rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800/80 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-brand transition-all duration-300 group-focus-within:border-brand group-focus-within:shadow-lg"
              placeholder="Your Name" 
              value={form.name} 
              onChange={e => setForm({ ...form, name: e.target.value })} 
              onFocus={() => setFocused('name')} 
              onBlur={() => setFocused(null)} 
              data-contact-section="true"
              required 
            />
            <motion.div 
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brand to-cyan-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: focused === 'name' ? '100%' : 0 }}
              transition={{ duration: 0.3 }} 
            />
          </motion.div>

          <motion.div variants={fieldVariants} className="relative group">
            <input 
              type="email" 
              className="w-full rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800/80 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-brand transition-all duration-300 group-focus-within:border-brand group-focus-within:shadow-lg"
              placeholder="Your Email" 
              value={form.email} 
              onChange={e => setForm({ ...form, email: e.target.value })} 
              onFocus={() => setFocused('email')} 
              onBlur={() => setFocused(null)} 
              data-contact-section="true"
              required 
            />
            <motion.div 
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brand to-cyan-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: focused === 'email' ? '100%' : 0 }}
              transition={{ duration: 0.3 }} 
            />
          </motion.div>

          <motion.div variants={fieldVariants} className="relative group">
            <textarea 
              className="w-full rounded-lg px-4 py-3 border border-gray-300 dark:border-gray-700 dark:bg-gray-800/80 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-brand transition-all duration-300 group-focus-within:border-brand group-focus-within:shadow-lg resize-none" 
              placeholder="Your Message" 
              rows="5" 
              value={form.message} 
              onChange={e => setForm({ ...form, message: e.target.value })} 
              onFocus={() => setFocused('message')} 
              onBlur={() => setFocused(null)} 
              data-contact-section="true"
              required 
            />
            <motion.div 
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-brand to-cyan-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: focused === 'message' ? '100%' : 0 }}
              transition={{ duration: 0.3 }} 
            />
          </motion.div>

          <motion.button 
            className="btn w-full justify-center text-lg font-bold" 
            type="submit" 
            disabled={status === 'sending'}
            variants={fieldVariants}
            data-mascot-trigger="contact"
            whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(79, 70, 229, 0.3)' }}
            whileTap={{ scale: 0.95 }}>
            {status === 'sending' ? (
              <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>⚡</motion.span>
            ) : (
              '✉️ Send Message'
            )}
          </motion.button>

          {/* Status messages */}
          <div className="mt-4">
            <AnimatePresence mode="popLayout">
              {status === 'sent' && (
                <motion.div
                  className="text-green-600 dark:text-green-400 font-bold text-center py-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                >
                  ✓ Message sent successfully!
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div
                  className="text-red-600 dark:text-red-400 font-bold text-center py-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800"
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                >
                  ✗ {errorMsg || 'Something went wrong.'}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.form>
    </section>
  );
}
