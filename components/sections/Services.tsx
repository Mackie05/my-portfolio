"use client";

import { motion } from "framer-motion";
import { Video, TrendingUp, Clapperboard, Megaphone, Palette, BarChart3 } from "lucide-react";

const services = [
  {
    icon: TrendingUp,
    title: "Social Media Growth Strategy",
    description:
      "Data-driven content systems designed to scale your brand's presence across TikTok, Instagram, and YouTube.",
  },
  {
    icon: Video,
    title: "Short-Form Video Editing",
    description:
      "High-retention edits optimized for the algorithm. Hooks, pacing, and visual storytelling that stops the scroll.",
  },
  {
    icon: Clapperboard,
    title: "Long-Form Content Production",
    description:
      "Documentaries, brand films, and interview series with cinematic production value and narrative structure.",
  },
  {
    icon: Megaphone,
    title: "Creative Direction",
    description:
      "End-to-end creative leadership from concept to final delivery. Building cohesive visual worlds for brands.",
  },
  {
    icon: Palette,
    title: "Brand Identity & Visual Systems",
    description:
      "Developing distinctive visual languages that make brands instantly recognizable across all touchpoints.",
  },
  {
    icon: BarChart3,
    title: "Content Analytics & Optimization",
    description:
      "Performance analysis and iterative optimization to maximize reach, engagement, and conversion.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Services() {
  return (
    <section id="services" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
          Services
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          What I bring to the table.
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={item}
            className="group p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
              <service.icon className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3">{service.title}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">
              {service.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
