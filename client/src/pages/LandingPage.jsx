import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-bg text-text flex flex-col items-center justify-center px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="space-y-6 max-w-2xl">
        <p className="text-sm uppercase tracking-[0.3em] text-accent">Dhyey Pavagadhi Collective</p>
        <h1 className="text-4xl md:text-5xl font-bold text-white">Cinematic, client-focused digital experiences.</h1>
        <p className="text-text/80 text-lg">Premium portfolio builds, AI-powered products, and production-grade engineering for ambitious brands.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/home" className="button-primary">Enter Portfolio</Link>
          <a href="/home#contact" className="px-5 py-3 rounded-lg border border-white/10 hover:bg-white/5 transition">Book a Project</a>
        </div>
      </motion.div>
    </div>
  );
};

export default LandingPage;
