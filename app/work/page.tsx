"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
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
  Eye,
  Lightbulb,
  Users,
  CheckCircle2,
} from "lucide-react";

// ============================================
// PROJECTS DATA
// ============================================

const allProjects = [
  {
    title: "Social Media Growth Campaign",
    category: "Social Strategy / Short Form",
    year: "2025",
    description: "How I would grow a lifestyle brand from 0 to 100K followers using a data-driven content system.",
    slug: "brand-growth-campaign",
    serviceId: "social-growth",
    metric: "0 to 100K",
    metricLabel: "follower growth",
  },
  {
    title: "Content Pillar System",
    category: "Creative Direction / Content Strategy",
    year: "2025",
    description: "How I would build a repeatable content framework that turns one viral hit into a sustainable growth engine.",
    slug: "content-pillar-system",
    serviceId: "creative-direction",
    metric: "3x Content Output",
    metricLabel: "efficiency increase",
  },
  {
    title: "Retention-Optimized Editing Framework",
    category: "Video Editing / Short Form",
    year: "2025",
    description: "How I would develop an editing system focused on maximizing viewer retention and shareability for algorithm-driven platforms.",
    slug: "retention-optimized-editing-framework",
    serviceId: "short-form",
    metric: "60% Watch Time Improvement",
    metricLabel: "average watch time increase",
  },
  {
    title: "Wedding Film Storytelling",
    category: "Creative Direction / Long Form",
    year: "2025",
    description: "Edited a heartfelt moment capturing a couple's love story.",
    slug: "storytelling-wedding-film",
    serviceId: "long-form",
    metric: "6 min",
    metricLabel: "runtime",
  },
   
];

const services = [
  {
    id: "social-growth",
    icon: TrendingUp,
    title: "Social Media Growth",
    subtitle: "Strategy",
    steps: [
      { icon: Search, label: "Audit", detail: "Deep-dive into your brand, audience behavior, and competitor gaps to find what's already working." },
      { icon: Layout, label: "Architect", detail: "Build a repeatable content system — hook templates, format libraries, and a posting rhythm designed to scale." },
      { icon: Zap, label: "Execute", detail: "Produce and ship platform-native content optimized for each algorithm's current appetite." },
      { icon: BarChart3, label: "Iterate", detail: "Weekly performance reviews. Double down on winners. Kill what doesn't move the needle." },
    ],
  },
  {
    id: "short-form",
    icon: Video,
    title: "Short-Form Video",
    subtitle: "Editing",
    steps: [
      { icon: Film, label: "Ingest", detail: "Import raw footage and identify the strongest moments, natural hooks, and emotional beats." },
      { icon: Scissors, label: "Hook", detail: "Craft a 0-3 second opener with pattern interrupts and visual punch that stops the scroll." },
      { icon: Music, label: "Sound", detail: "Layer sound design, captions, and music that drives emotional pacing and retention." },
      { icon: Share2, label: "Export", detail: "Deliver platform-native cuts — vertical, square, and landscape — optimized for each feed." },
    ],
  },
  {
    id: "long-form",
    icon: Clapperboard,
    title: "Long-Form Content",
    subtitle: "Production",
    steps: [
      { icon: Search, label: "Pre-Pro", detail: "Script, storyboard, and plan every shot before cameras roll. No surprises on set." },
      { icon: Scissors, label: "Edit", detail: "Assemble the narrative with deliberate pacing, tension arcs, and emotional payoffs." },
      { icon: Music, label: "Grade", detail: "Apply cinematic color grading and motion graphics that elevate production value." },
      { icon: Share2, label: "Distribute", detail: "Create multi-platform cuts — trailers, clips, and full versions from a single source." },
    ],
  },
  {
    id: "creative-direction",
    icon: Megaphone,
    title: "Creative Direction",
    subtitle: "Leadership",
    steps: [
      { icon: Eye, label: "Discover", detail: "Deep-dive into your brand DNA, competitors, and the story only you can tell." },
      { icon: Lightbulb, label: "Concept", detail: "Develop the creative vision, mood boards, and visual direction that becomes your north star." },
      { icon: Users, label: "Direct", detail: "Lead the team through production with clear creative oversight and decisive feedback." },
      { icon: CheckCircle2, label: "Deliver", detail: "Hand off final assets with brand guidelines for consistent, scalable rollout." },
    ],
  },
];

// ============================================
// PIPELINE NODE
// ============================================

function PipelineNode({
  step,
  index,
  isLast,
  lineProgress,
}: {
  step: (typeof services)[0]["steps"][0];
  index: number;
  isLast: boolean;
  lineProgress: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = step.icon;

  const triggerPoint = index * 25;
  const isReached = lineProgress >= triggerPoint;
  const glowIntensity = isReached
    ? Math.min(1, (lineProgress - triggerPoint) / 15)
    : 0;

  const segmentProgress = isLast
    ? 0
    : Math.max(0, Math.min(100, ((lineProgress - triggerPoint) / 25) * 100));

  return (
    <div className="relative flex flex-1 flex-col items-center">
      {/* Connecting line — stops at icon edges */}
      {!isLast && (
        <div
          className="absolute top-6 h-[2px]"
          style={{
            left: "calc(50% + 26px)",
            width: "calc(100% - 52px)",
          }}
        >
          <div className="absolute inset-0 rounded-full bg-white/10" />
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <motion.div
              className="h-full rounded-full"
              style={{ background: "rgba(249, 115, 22, 0.7)" }}
              animate={{ width: `${segmentProgress}%` }}
              transition={{ duration: 0 }}
            />
          </div>
        </div>
      )}

      {/* Node */}
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative z-10 flex flex-col items-center cursor-default"
      >
        {/* Icon container — glow applied DIRECTLY here, no separate covering div */}
        <motion.div
          className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full border"
          animate={{
            borderColor: isReached
              ? "rgba(249, 115, 22, 0.6)"
              : "rgba(255, 255, 255, 0.1)",
            backgroundColor: isReached
              ? "rgba(249, 115, 22, 0.12)"
              : "rgba(255, 255, 255, 0.03)",
            scale: isReached ? [1, 1.12, 1] : 1,
            boxShadow: isReached
              ? `0 0 ${20 + glowIntensity * 15}px rgba(249, 115, 22, ${0.35 + glowIntensity * 0.25})`
              : "none",
          }}
          transition={{
            borderColor: { duration: 0.3 },
            backgroundColor: { duration: 0.3 },
            scale: { duration: 0.4, delay: 0.05 },
            boxShadow: { duration: 0.3 },
          }}
        >
          <motion.div
            animate={{
              scale: isReached ? [1, 1.2, 1] : 1,
              opacity: isReached ? 1 : 0.3,
            }}
            transition={{ duration: 0.35, delay: 0.05 }}
          >
            <Icon
              size={18}
              style={{
                color: isReached
                  ? "rgba(249, 115, 22, 0.95)"
                  : "rgba(255, 255, 255, 0.3)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Label */}
        <motion.p
          className="mt-3 text-xs font-medium uppercase tracking-wider"
          animate={{
            color: isReached
              ? "rgba(249, 115, 22, 0.9)"
              : "rgba(255, 255, 255, 0.3)",
            opacity: isReached ? 1 : 0.5,
          }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          {step.label}
        </motion.p>

        {/* Tooltip on hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="absolute top-20 left-1/2 z-20 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md"
              style={{ boxShadow: "0 8px 32px rgba(0, 0, 0, 0.35)" }}
            >
              <p className="text-xs leading-relaxed text-white/60">
                {step.detail}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

// ============================================
// PIPELINE WRAPPER
// ============================================

function Pipeline({ steps }: { steps: (typeof services)[0]["steps"] }) {
  const [lineProgress, setLineProgress] = useState(0);

  useEffect(() => {
    setLineProgress(0);
    const duration = 2500;
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setLineProgress(progress);
      if (elapsed < duration) {
        requestAnimationFrame(tick);
      }
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [steps]);

  return (
    <div className="flex items-start justify-between gap-4 px-4 md:px-12">
      {steps.map((step, i) => (
        <PipelineNode
          key={step.label}
          step={step}
          index={i}
          isLast={i === steps.length - 1}
          lineProgress={lineProgress}
        />
      ))}
    </div>
  );
}

// ============================================
// MAGNETIC ROW
// ============================================

function MagneticRow({
  project,
  index,
}: {
  project: (typeof allProjects)[0];
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setTransform({
      x: (e.clientX - centerX) * 0.06,
      y: (e.clientY - centerY) * 0.06,
    });
  };

  return (
    <motion.div
      ref={rowRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setTransform({ x: 0, y: 0 });
      }}
      style={{
        transform: `translate(${transform.x}px, ${transform.y}px)`,
        transition: isHovered ? "none" : "transform 0.4s ease-out",
      }}
    >
      <Link href={`/work/${project.slug}/`} className="group block">
        <div
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-all duration-300 group-hover:border-orange-500/30 group-hover:bg-white/[0.06]"
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
              animate={{ width: isHovered ? "100%" : "0%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>

          <div className="mb-3 flex items-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-orange-400/80">
              {project.category}
            </span>
            <span className="text-xs text-white/30">{project.year}</span>
          </div>

          <div className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <h3 className="mb-2 text-2xl font-bold text-white transition-colors duration-300 group-hover:text-orange-100">
                {project.title}
              </h3>
              <p className="max-w-lg text-sm leading-relaxed text-white/50">
                {project.description}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-2xl font-bold text-orange-400">
                  {project.metric}
                </p>
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
      </Link>
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
              background: isActive
                ? "rgba(249, 115, 22, 0.1)"
                : "rgba(255, 255, 255, 0.03)",
              border: isActive
                ? "1.5px solid rgba(249, 115, 22, 0.3)"
                : "1.5px solid rgba(255, 255, 255, 0.08)",
              color: isActive
                ? "rgba(249, 115, 22, 0.95)"
                : "rgba(255, 255, 255, 0.4)",
            }}
          >
            <Icon size={14} strokeWidth={1.5} />
            <span>{service.title}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

// ============================================
// MAIN PAGE
// ============================================

export default function WorkPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = services[activeIndex];
  const filteredProjects = allProjects.filter(
    (p) => p.serviceId === activeService.id
  );

  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="text-sm font-medium uppercase tracking-widest text-orange-500/70 mb-4">
          All Work
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white">
          Selected projects.
        </h1>
      </motion.div>

      {/* Service Switcher */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
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
          <div className="mb-10 text-center">
            <h3 className="text-2xl font-bold text-white">
              {activeService.title}{" "}
              <span className="text-white/30">{activeService.subtitle}</span>
            </h3>
            <p className="mt-2 text-sm text-white/40">
              Hover each step to explore the workflow
            </p>
          </div>

          <Pipeline steps={activeService.steps} />
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
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, i) => (
              <MagneticRow key={project.slug} project={project} index={i} />
            ))
          ) : (
            <div className="py-16 text-center">
              <p className="text-white/40">
                Projects coming soon for this service.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}