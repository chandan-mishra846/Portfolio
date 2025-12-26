import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Nav3D() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  
  const navItems = [
    { name: 'Home', href: '#hero', icon: '🏠' },
    { name: 'About', href: '#about', icon: '👨‍💻' },
    { name: 'Skills', href: '#skills', icon: '⚡' },
    { name: 'Projects', href: '#projects', icon: '🚀' },
    { name: 'Experience', href: '#experience', icon: '💼' },
    { name: 'Contact', href: '#contact', icon: '📧' }
  ];

  return (
    <div className="hidden lg:flex gap-1">
      {navItems.map((item, index) => (
        <motion.a
          key={item.name}
          href={item.href}
          className="relative px-4 py-2 text-sm font-medium transition-colors rounded-lg overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          whileHover={{ 
            scale: 1.05,
            y: -2,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Background layer */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-brand/10 to-cyan-400/10 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: hoveredIndex === index ? 1 : 0,
              scale: hoveredIndex === index ? 1 : 0.8
            }}
            transition={{ duration: 0.3 }}
            style={{ transform: 'translateZ(-10px)' }}
          />
          
          {/* Icon and Text */}
          <span className="relative flex items-center gap-2" style={{ transform: 'translateZ(10px)' }}>
            <motion.span
              animate={{ 
                rotate: hoveredIndex === index ? [0, -10, 10, 0] : 0,
                scale: hoveredIndex === index ? 1.2 : 1
              }}
              transition={{ duration: 0.5 }}
            >
              {item.icon}
            </motion.span>
            <span className={`${hoveredIndex === index ? 'text-brand' : 'text-gray-700 dark:text-gray-300'} transition-colors`}>
              {item.name}
            </span>
          </span>
          
          {/* Glow effect */}
          {hoveredIndex === index && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-brand/20 to-cyan-400/20 rounded-lg blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ transform: 'translateZ(-20px)' }}
            />
          )}
        </motion.a>
      ))}
    </div>
  );
}
