// src/components/Hero.tsx
'use client';

import { motion } from 'framer-motion';
import { Inter, Poppins } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({ weight: '700', subsets: ['latin'] });

export default function Hero() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center py-16 w-full flex flex-col items-center"
    >
      <h1 className={`${poppins.className} text-7xl font-bold text-[#F8F9FA] mb-6 glow-text tracking-wide`}>FocusFlow</h1>
      <p className={`${inter.className} text-2xl text-[#ADB5BD] max-w-3xl mx-auto`}>Your AI-powered productivity coach. Stay focused, achieve more.</p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-8"
      >
        <button className="px-8 py-4 bg-[#3A86FF] text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all text-xl">Get Started</button>
      </motion.div>
    </motion.div>
  );
}