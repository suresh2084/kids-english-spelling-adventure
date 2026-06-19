import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Confetti: React.FC<{ active: boolean }> = ({ active }) => {
  const [particles, setParticles] = useState<{ id: number; x: number; color: string }[]>([]);

  useEffect(() => {
    if (active) {
      const colors = ['#FBBF24', '#7C3AED', '#EC4899', '#10B981', '#3B82F6'];
      const newParticles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)]
      }));
      setParticles(newParticles);
      
      const timer = setTimeout(() => setParticles([]), 3000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ 
              top: '-10%', 
              left: `${p.x}%`, 
              opacity: 1, 
              rotate: 0,
              scale: Math.random() * 0.5 + 0.5
            }}
            animate={{ 
              top: '110%', 
              rotate: Math.random() * 720 - 360,
              opacity: [1, 1, 0]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: Math.random() * 2 + 1.5,
              ease: "linear"
            }}
            className="absolute w-4 h-4 rounded-sm"
            style={{ backgroundColor: p.color }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
