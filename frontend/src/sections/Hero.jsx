import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Hero() {
  return (
    <section className="section container min-h-screen flex items-center" id="hero">
      <div className="w-full flex items-center justify-between gap-8">
        <motion.div variants={container} initial="hidden" animate="show" className="flex-1">
          <motion.h1 className="text-5xl md:text-6xl font-extrabold leading-tight"
            variants={item}>
            Hi, I'm <span className="text-brand">Chandan Mishra</span>
          </motion.h1>
          <motion.p className="mt-4 text-lg text-gray-600 dark:text-gray-400"
            variants={item}>
            Full Stack Developer . I build scalable, responsive, and user-focused web applications using modern technologies. <br /><br /><br />
            ⚛️ React.js · 🟢 Node.js · 🚀 Express.js · 🍃 MongoDB · 🎨 Tailwind CSS · 🔐 JWT · ☁️ Cloudinary · 🧰 Git & GitHub
          </motion.p>
          <motion.div className="mt-8 flex gap-3"
            variants={item}>
            <a className="btn hover:scale-105 transition-transform" href="#contact">Hire Me</a>
            <a className="btn bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 hover:scale-105 transition-transform" href="#projects">View Projects</a>
          </motion.div>
        </motion.div>
        <motion.div className="hidden lg:block flex-1 flex justify-center"
          initial={{ scale: 0.8, opacity: 0, x: 50 }}
          animate={{ scale: 1, opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}>
          <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl ring-4 ring-brand/20">
            <img src="/temp/my photo.jpg" alt="Chandan Mishra" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
