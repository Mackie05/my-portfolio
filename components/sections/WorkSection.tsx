"use client";

import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  TrendingUp,
  Video,
  Clapperboard,
  Megaphone,
  ArrowUpRight,
  Search,
  Layout,
  Zap,
  BarChart3,
  Film,
  Scissors,
  Music,
  Share2,
  Palette,
  Eye,
  Lightbulb,
  Users,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

// ============================================
// DATA
// ============================================

const services = [
  {
    id: "social-growth",
    icon: TrendingUp,
    title: "Social Media Growth",
    subtitle: "Strategy",
    color: "249, 115, 22",
    steps: [
      { icon: Search, label: "Audit", detail: "Deep-dive into your brand, audience behavior, and competitor gaps to find what's already working." },
      { icon: Layout, label: "Architect", detail: "Build a repeatable content system — hook templates, format libraries, and a posting rhythm designed to scale." },
      { icon: Zap, label: "Execute", detail: "Produce and ship platform-native content optimized for each algorithm's current appetite." },
      { icon: BarChart3, label: "Iterate", detail: "Weekly performance reviews. Double down on winners. Kill what doesn't move the needle." },
    ],
    projects: [
      {
        category: "Social Strategy / Short Form",
        year: "2025",
        title: "Brand Growth Campaign",
        description: "Scaled a lifestyle brand from 10K to 500K followers in 90 days through data-driven content systems.",
        metric: "+4,900%",
        metricLabel: "follower growth",
      },
      {
        category: "Social Strategy / Short Form",
        year: "2024",
        title: "Viral Content System",
        description: "Built a repeatable editing framework that produced 12 videos with 1M+ views each.",
        metric: "12M+",
        metricLabel: "total views",
      },
    ],
  },
  {
    id: "short-form",
    icon: Video,
    title: "Short-Form Video",
    subtitle: "Editing",
    color: "249, 115, 22",
    steps: [
      { icon: Film, label: "Ingest", detail: "Import raw footage and identify the strongest moments, natural hooks, and emotional beats." },
      { icon: Scissors, label: "Hook", detail: "Craft a 0-3 second opener with pattern interrupts and visual punch that stops the scroll." },
      { icon: Music, label: "Sound", detail: "Layer sound design, captions, and music that drives emotional pacing and retention." },
      { icon: Share2, label: "Export", detail: "Deliver platform-native cuts — vertical, square, and landscape — optimized for each feed." },
    ],
    projects: [
      {
        category: "Video Editing / Short Form",
        year: "2025",
        title: "Product Launch Series",
        description: "Led creative direction for a multi-episode product documentary generating 2M+ organic views.",
        metric: "2M+",
        metricLabel: "organic views",
      },
      {
        category: "Video Editing / Short Form",
        year: "2024",
        title: "Tutorial Series",
        description: "Created a 20-part educational series with 85% average watch time and 300K+ saves.",
        metric: "85%",
        metricLabel: "watch time",
      },
    ],
  },
  {
    id: "long-form",
    icon: Clapperboard,
    title: "Long-Form Content",
    subtitle: "Production",
    color: "249, 115, 22",
    steps: [
      { icon: Search, label: "Pre-Pro", detail: "Script, storyboard, and plan every shot before cameras roll. No surprises on set." },
      { icon: Scissors, label: "Edit", detail: "Assemble the narrative with deliberate pacing, tension arcs, and emotional payoffs." },
      { icon: Palette, label: "Grade", detail: "Apply cinematic color grading and motion graphics that elevate production value." },
      { icon: Share2, label: "Distribute", detail: "Create multi-platform cuts — trailers, clips, and full versions from a single source." },
    ],
    projects: [
      {
        category: "Creative Direction / Long Form",
        year: "2024",
        title: "Rebrand Documentary",
        description: "Directed and edited a 20-minute brand documentary capturing the company's evolution.",
        metric: "20min",
        metricLabel: "runtime",
      },
      {
        category: "Creative Direction / Long Form",
        year: "2025",
        title: "Influencer Campaign",
        description: "Produced a 6-episode interview series with top creators, averaging 500K views per episode.",
        metric: "3M+",
        metricLabel: "total views",
      },
    ],
  },
  {
    id: "creative-direction",
    icon: Megaphone,
    title: "Creative Direction",
    subtitle: "Leadership",
    color: "249, 115, 22",
    steps: [
      { icon: Eye, label: "Discover", detail: "Deep-dive into your brand DNA, competitors, and the story only you can tell." },
      { icon: Lightbulb, label: "Concept", detail: "Develop the creative vision, mood boards, and visual direction that becomes your north star." },
      { icon: Users, label: "Direct", detail: "Lead the team through production with clear creative oversight and decisive feedback." },
      { icon: CheckCircle2, label: "Deliver", detail: "Hand off final assets with brand guidelines for consistent, scalable rollout." },
    ],
    projects: [
      {
        category: "Creative Direction / Brand",
        year: "2025",
        title: "Full Rebrand System",
        description: "Built a complete visual identity system including typography, color, and content templates.",
        metric: "100%",
        metricLabel: "brand consistency",
      },
      {
        category: "Creative Direction / Campaign",
        year: "2024",
        title: "Launch Campaign",
        description: "Led end-to-end creative for a product launch that generated $2M in first-week sales.",
        metric: "$2M",
        metricLabel: "first-week sales",
      },
    ],
  },
];

// ============================================
// PIPELINE NODE
// ============================================

function PipelineNode({
  step,
  index,
  isActive,
  isLast,
}: {
  step: (typeof services)[0]["steps"][0];
  index: number;
  isActive: boolean;
  isLast: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = step.icon;

  return (
    <div className="relative flex flex-1 flex-col items-center">
      {/* Connecting line */}
      {!isLast && (
        <div className="absolute left-1/2 top-6 w-full h-[2px]">
          <div className="h-full w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "rgba(249, 115, 22, 0.6)" }}
              initial={{ width: "0%" }}
              animate={{ width: isActive ? "100%" : "0%" }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
            />
          </div>
        </div>
      )}

      {/* Node */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className="relative z-10 flex flex-col items-center cursor-default"
      >
        <motion.div
          animate={{
            boxShadow: isActive
              ? isHovered
                ? "0 0 30px rgba(249, 115, 22, 0.4), 0 0 60px rgba(249, 115, 22, 0.15)"
                : "0 0 20px rgba(249, 115, 22, 0.2)"
              : "0 0 0px rgba(249, 115, 22, 0)",
          }}
          transition={{ duration: 0.3 }}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] transition-colors duration-300"
          style={{
            borderColor: isActive ? "rgba(249, 115, 22, 0.4)" : undefined,
            backgroundColor: isActive ? "rgba(249, 115, 22, 0.1)" : undefined,
          }}
        >
          <Icon
            size={18}
            className="transition-colors duration-300"
            style={{ color: isActive ? "rgba(249, 115, 22, 0.9)" : "rgba(255, 255, 255, 0.3)" }}
          />
        </motion.div>

        {/* Label */}
        <motion.p
          animate={{ color: isActive ? "rgba(249, 115, 22, 0.9)" : "rgba(255, 255, 255, 0.3)" }}
          className="mt-3 text-xs font-medium uppercase tracking-wider"
        >
          {step.label}
        </motion.p>

        {/* Expanded detail on hover */}
        <AnimatePresence>
          {isHovered && isActive && (
            <motion.div
              initial={{ opacity: 0, y: 8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: 8, height: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 w-56 overflow-hidden rounded-xl border border-white/10 bg-white/[0.05] p-4 backdrop-blur-md"
              style={{
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            >
              <p className="text-xs leading-relaxed text-white/60">{step.detail}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ============================================
// MAGNETIC ROW CARD
// ============================================

function MagneticRow({
  project,
  index,
}: {
  project: (typeof services)[0]["projects"][0];
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set((e.clientX - centerX) * 0.08);
    mouseY.set((e.clientY - centerY) * 0.08);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setProgress(100);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    setProgress(0);
  };

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="group relative cursor-pointer"
    >
      {/* Liquid glass container */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors duration-300 group-hover:border-orange-500/30 group-hover:bg-white/[0.06]"
        style={{
          boxShadow: isHovered
            ? "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(249, 115, 22, 0.1)"
            : "none",
        }}
      >
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5">
          <motion.div
            className="h-full rounded-full"
            style={{ background: "rgba(249, 115, 22, 0.6)" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>

        {/* Top row: category + year */}
        <div className="mb-3 flex items-center gap-3">
          <span className="text-xs font-medium uppercase tracking-wider text-orange-400/80">
            {project.category}
          </span>
          <span className="text-xs text-white/30">{project.year}</span>
        </div>

        {/* Main content */}
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <h3 className="mb-2 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-orange-100">
              {project.title}
            </h3>
            <p className="max-w-lg text-sm leading-relaxed text-white/50">
              {project.description}
            </p>
          </div>

          {/* Metric + Arrow */}
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-400">{project.metric}</p>
              <p className="text-xs text-white/40">{project.metricLabel}</p>
            </div>
            <motion.div
              animate={{ rotate: isHovered ? 45 : 0 }}
              transition={{ duration: 0.3 }}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-colors duration-300 group-hover:border-orange-500/40 group-hover:bg-orange-500/10"
            >
              <ArrowUpRight
                size={16}
                className="text-white/40 transition-colors duration-300 group-hover:text-orange-400"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// SERVICE SWITCHER
// ============================================

function ServiceSwitcher({
  activeIndex,
  onChange,
}: {
  activeIndex: number;
  onChange: (index: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      {services.map((service, i) => {
        const Icon = service.icon;
        const isActive = i === activeIndex;
        return (
          <motion.button
            key={service.id}
            onClick={() => onChange(i)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="relative flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300"
            style={{
              background: isActive ? "rgba(249, 115, 22, 0.1)" : "rgba(255, 255, 255, 0.03)",
              border: isActive ? "1.5px solid rgba(249, 115, 22, 0.3)" : "1.5px solid rgba(255, 255, 255, 0.08)",
              color: isActive ? "rgba(249, 115, 22, 0.95)" : "rgba(255, 255, 255, 0.4)",
            }}
          >
            <Icon size={14} strokeWidth={1.5} />
            <span>{service.title}</span>
            {isActive && (
              <motion.div
                layoutId="activePill"
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1.5px solid rgba(249, 115, 22, 0.3)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

// ============================================
// MAIN WORK SECTION
// ============================================

export default function WorkSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];

  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-500/70">
            All Work
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
            Selected projects.
          </h2>
        </motion.div>

        {/* Service Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <ServiceSwitcher activeIndex={activeIndex} onChange={setActiveIndex} />
        </motion.div>

        {/* Pipeline */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="mb-20"
          >
            {/* Pipeline title */}
            <div className="mb-10 text-center">
              <h3 className="text-2xl font-bold text-white">
                {activeService.title}{" "}
                <span className="text-white/30">{activeService.subtitle}</span>
              </h3>
              <p className="mt-2 text-sm text-white/40">
                Hover each step to explore the workflow
              </p>
            </div>

            {/* Pipeline nodes */}
            <div className="flex items-start justify-between gap-4 px-4 md:px-12">
              {activeService.steps.map((step, i) => (
                <PipelineNode
                  key={step.label}
                  step={step}
                  index={i}
                  isActive={true}
                  isLast={i === activeService.steps.length - 1}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Project Rows */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id + "-projects"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {activeService.projects.map((project, i) => (
              <MagneticRow key={project.title} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="mb-4 text-white/40">
            Want to see your project here?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-6 py-3 text-sm font-medium text-orange-400 ring-1 ring-orange-500/20 transition-all duration-300 hover:bg-orange-500/20 hover:ring-orange-500/40"
          >
            Start a project
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
