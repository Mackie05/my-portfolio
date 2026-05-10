"use client";

import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="py-32 px-6 max-w-7xl mx-auto bg-muted/30">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="aspect-[3/4] rounded-2xl bg-muted overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm text-muted-foreground">[Your Photo]</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/10 rounded-full blur-3xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div>
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
              About
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              From editor to creative director.
            </h2>
          </div>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I started in the edit room, obsessing over frame-by-frame cuts and
              the perfect pacing of a story. That foundation taught me that every
              second matters — and that the best content doesn't just look good,
              it performs.
            </p>
            <p>
              Today, I lead creative for brands that want to grow through content.
              I bridge the gap between strategy and execution, designing content
              systems that turn scrollers into followers and followers into customers.
            </p>
            <p>
              My sweet spot is at the intersection of data-driven growth strategy
              and cinematic storytelling. Whether it's a 6-second TikTok hook or
              a 20-minute brand documentary, I believe every piece of content
              should earn its place in the feed.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
            <div>
              <p className="text-3xl font-bold text-accent">50M+</p>
              <p className="text-sm text-muted-foreground mt-1">Total Views Generated</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">500K+</p>
              <p className="text-sm text-muted-foreground mt-1">Followers Grown</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-accent">4+</p>
              <p className="text-sm text-muted-foreground mt-1">Years Experience</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
