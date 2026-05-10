"use client";

import { motion } from "framer-motion";
import { Video, TrendingUp, Clapperboard, Megaphone, Palette, BarChart3, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: TrendingUp,
    title: "Social Media Growth Strategy",
    price: "Starting at $3,500/mo",
    description:
      "Data-driven content systems designed to scale your brand presence across TikTok, Instagram, and YouTube.",
    deliverables: [
      "Content strategy & calendar",
      "Platform-specific optimization",
      "Performance analytics & reporting",
      "Monthly strategy sessions",
    ],
  },
  {
    icon: Video,
    title: "Short-Form Video Editing",
    price: "Starting at $150/video",
    description:
      "High-retention edits optimized for the algorithm. Hooks, pacing, and visual storytelling that stops the scroll.",
    deliverables: [
      "Hook-optimized edits",
      "Caption & sound design",
      "Thumbnail frames",
      "Platform-specific exports",
    ],
  },
  {
    icon: Clapperboard,
    title: "Long-Form Content Production",
    price: "Starting at $5,000/project",
    description:
      "Documentaries, brand films, and interview series with cinematic production value and narrative structure.",
    deliverables: [
      "Full production planning",
      "Cinematic editing & color",
      "Motion graphics & titles",
      "Multi-platform distribution cuts",
    ],
  },
  {
    icon: Megaphone,
    title: "Creative Direction",
    price: "Starting at $8,000/project",
    description:
      "End-to-end creative leadership from concept to final delivery. Building cohesive visual worlds for brands.",
    deliverables: [
      "Creative concept development",
      "Visual direction & mood boards",
      "Team oversight & feedback",
      "Final delivery & handoff",
    ],
  },
  {
    icon: Palette,
    title: "Brand Identity & Visual Systems",
    price: "Starting at $4,500",
    description:
      "Developing distinctive visual languages that make brands instantly recognizable across all touchpoints.",
    deliverables: [
      "Visual identity system",
      "Content templates",
      "Brand guidelines",
      "Asset library",
    ],
  },
  {
    icon: BarChart3,
    title: "Content Analytics & Optimization",
    price: "Starting at $2,000/mo",
    description:
      "Performance analysis and iterative optimization to maximize reach, engagement, and conversion.",
    deliverables: [
      "Weekly performance reports",
      "A/B testing framework",
      "Content audit & recommendations",
      "Quarterly strategy reviews",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
          Services
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          How I can help.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Every project is different. These are starting points, we will tailor
          the scope and deliverables to fit your specific needs and budget.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group p-8 rounded-2xl bg-card border border-border hover:border-accent/50 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
              <service.icon className="h-6 w-6 text-accent" />
            </div>
            <div className="flex items-start justify-between mb-4">
              <h2 className="text-2xl font-bold">{service.title}</h2>
              <span className="text-sm font-medium text-accent shrink-0 ml-4">
                {service.price}
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {service.description}
            </p>
            <ul className="space-y-2 mb-8">
              {service.deliverables.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-muted-foreground"
                >
                  <span className="w-1 h-1 rounded-full bg-accent mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors"
            >
              Get in touch <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
