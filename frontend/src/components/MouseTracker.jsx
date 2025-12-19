import { useEffect, useRef } from 'react';

export default function MouseTracker() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      if (cursorRef.current) {
        cursorRef.current.style.left = x + 'px';
        cursorRef.current.style.top = y + 'px';
      }

      if (dotRef.current) {
        setTimeout(() => {
          dotRef.current.style.left = x + 'px';
          dotRef.current.style.top = y + 'px';
        }, 100);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 bg-gradient-to-r from-brand to-cyan-400 rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2"
        style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }}
      />
      <div
        ref={dotRef}
        className="fixed w-8 h-8 border-2 border-brand rounded-full pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 opacity-30"
      />
    </>
  );
}
