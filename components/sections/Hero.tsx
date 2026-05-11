"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center items-start px-6 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay so text is readable */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-6"
        >
          <p className="text-sm md:text-base font-medium text-white/70 tracking-wide uppercase">
            Creative Director & Video Editor
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-white">
            Shaping stories
            <br />
            <span className="text-gradient">that grow brands.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed">
            Multi-disciplinary creative focused on social media growth, short-form
            content, and long-form storytelling. Building the bridge between
            strategy and execution.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-12 left-6 z-10"
      >
        <a
          href="#work"
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors"
        >
          <ArrowDown className="h-4 w-4 animate-bounce" />
          Scroll to explore
        </a>
      </motion.div>
    </section>
  );
}