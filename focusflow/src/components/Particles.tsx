// src/components/Particles.tsx
'use client';

import { motion } from 'framer-motion';

export default function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {Array.from({ length: 50 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: window.innerHeight }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="w-1 h-1 bg-primary rounded-full absolute"
          style={{
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}