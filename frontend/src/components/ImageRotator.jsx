import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ImageRotator({
  images = [],
  interval = 4000,
  className = '',
  imgClassName = '',
  alt = 'Profile'
}) {
  const [index, setIndex] = useState(0);
  const [valid, setValid] = useState(images.map(() => true));

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex(prev => {
        let next = (prev + 1) % images.length;
        let attempts = 0;
        while (!valid[next] && attempts < images.length) {
          next = (next + 1) % images.length;
          attempts++;
        }
        return next;
      });
    }, interval);
    return () => clearInterval(id);
  }, [images.length, interval, valid]);

  const handleError = (i) => {
    setValid(v => {
      const nv = [...v];
      nv[i] = false;
      return nv;
    });
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          alt={alt}
          className={imgClassName}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6 }}
          onError={() => handleError(index)}
        />
      </AnimatePresence>
    </div>
  );
}
