// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import axios from 'axios';

// export default function Testimonials() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const api = import.meta.env.VITE_API_URL || 'http://localhost:5000';
//     axios.get(`${api}/api/testimonials`).then(res => {
//       setItems(res.data);
//     }).finally(() => setLoading(false));
//   }, []);

//   useEffect(() => {
//     if (items.length === 0) return;
//     const interval = setInterval(() => setIndex(i => (i + 1) % items.length), 5000);
//     return () => clearInterval(interval);
//   }, [items.length]);

//   return (
//     <section className="section container" id="testimonials">
//       <h2 className="title">Testimonials</h2>
//       {loading && <div className="text-sm text-gray-500">Loading...</div>}
//       <div className="grid md:grid-cols-2 gap-6">
//         <AnimatePresence mode="wait">
//           {items.map((t, i) => (
//             i === index && (
//               <motion.div key={t._id} className="card md:col-span-2"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 transition={{ duration: 0.5 }}>
//                 <div className="flex items-center gap-3">
//                   <motion.img src={t.image || 'https://picsum.photos/80/80'} alt={t.name} className="w-12 h-12 rounded-full object-cover"
//                     whileHover={{ scale: 1.1 }} />
//                   <div>
//                     <div className="font-semibold">{t.name}</div>
//                     <div className="text-xs text-gray-500">{t.role}</div>
//                   </div>
//                 </div>
//                 <motion.p className="mt-4 text-sm text-gray-700 dark:text-gray-300 italic"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 0.2 }}>
//                   "{t.message}"
//                 </motion.p>
//                 <div className="mt-4 flex gap-1 justify-center">
//                   {items.map((_, i2) => (
//                     <motion.div key={i2} className="h-1 w-2 rounded-full"
//                       initial={{ opacity: 0.3 }}
//                       animate={{ opacity: i === i2 ? 1 : 0.3, scale: i === i2 ? 1.2 : 1 }}
//                       transition={{ duration: 0.3 }} />
//                   ))}
//                 </div>
//               </motion.div>
//             )
//           ))}
//         </AnimatePresence>
//         {items.map(t => (
//           <motion.div key={t._id} className="hidden md:block card"
//             initial={{ opacity: 0, y: 10 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             whileHover={{ y: -4 }}>
//             <div className="flex items-center gap-3">
//               <img src={t.image || 'https://picsum.photos/80/80'} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
//               <div>
//                 <div className="font-semibold">{t.name}</div>
//                 <div className="text-xs text-gray-500">{t.role}</div>
//               </div>
//             </div>
//             <p className="mt-3 text-sm text-gray-700 dark:text-gray-300 italic">"{t.message}"</p>
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// }
