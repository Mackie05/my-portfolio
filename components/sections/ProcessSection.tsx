"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import {
  TrendingUp,
  Video,
  Clapperboard,
  Megaphone,
  ArrowRight,
  Search,
  Layout,
  Zap,
  BarChart3,
  Scissors,
  Music,
  Share2,
  Film,
  Palette,
  Eye,
  Lightbulb,
  Users,
  CheckCircle2,
} from "lucide-react";

// ============================================
// PROCESS DATA
// ============================================

const processes = [
  {
    icon: TrendingUp,
    title: "Social Media Growth Strategy",
    description:
      "A repeatable system designed to scale your brand presence and turn content into consistent growth.",
    steps: [
      { icon: Search, label: "Audit", detail: "Study your brand, audience, and what's already winning in your niche." },
      { icon: Layout, label: "Architect", detail: "Build a content system — repeatable formats, hook templates, and posting rhythm." },
      { icon: Zap, label: "Execute", detail: "Produce, edit, and ship content optimized for each platform's algorithm." },
      { icon: BarChart3, label: "Iterate", detail: "Review data weekly, double down on winners, and refine what doesn't land." },
    ],
  },
  {
    icon: Video,
    title: "Short-Form Video Editing",
    description:
      "High-retention edits built to stop the scroll and keep viewers watching until the last frame.",
    steps: [
      { icon: Film, label: "Ingest", detail: "Import raw footage and identify the strongest moments and natural hooks." },
      { icon: Scissors, label: "Hook", detail: "Craft a 0-3 second opener with pattern interrupts and visual punch." },
      { icon: Music, label: "Sound", detail: "Layer sound design, captions, and music that drives emotional pacing." },
      { icon: Share2, label: "Export", detail: "Deliver platform-native cuts — vertical, square, and landscape formats." },
    ],
  },
  {
    icon: Clapperboard,
    title: "Long-Form Content Production",
    description:
      "Documentaries, brand films, and interview series with cinematic production value and narrative structure.",
    steps: [
      { icon: Search, label: "Pre-Pro", detail: "Script, storyboard, and plan every shot before cameras roll." },
      { icon: Scissors, label: "Edit", detail: "Assemble the narrative with pacing, tension, and emotional arcs." },
      { icon: Palette, label: "Grade", detail: "Apply cinematic color grading and motion graphics for polish." },
      { icon: Share2, label: "Distribute", detail: "Create multi-platform cuts — trailers, clips, and full versions." },
    ],
  },
  {
    icon: Megaphone,
    title: "Creative Direction",
    description:
      "End-to-end creative leadership that turns vague ideas into cohesive, memorable brand worlds.",
    steps: [
      { icon: Eye, label: "Discover", detail: "Deep-dive into your brand, competitors, and the story you want to tell." },
      { icon: Lightbulb, label: "Concept", detail: "Develop the creative vision, mood boards, and visual direction." },
      { icon: Users, label: "Direct", detail: "Lead the team through production with clear creative oversight." },
      { icon: CheckCircle2, label: "Deliver", detail: "Hand off final assets with guidelines for consistent rollout." },
    ],
  },
];

// ============================================
// ANIMATION VARIANTS
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ============================================
// LIQUID GLASS CARD (no tilt)
// ============================================

function ProcessCard({ process }: { process: (typeof processes)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const Icon = process.icon;

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      className="group relative overflow-hidden rounded-2xl"
      style={{
        background: "rgba(255, 255, 255, 0.025)",
        backdropFilter: "blur(44px) saturate(250%)",
        WebkitBackdropFilter: "blur(44px) saturate(250%)",
        border: "1.5px solid rgba(255, 255, 255, 0.1)",
        boxShadow: `
          inset 0 1px 2px rgba(255, 255, 255, 0.12),
          inset 0 -1px 2px rgba(0, 0, 0, 0.15),
          0 12px 48px rgba(0, 0, 0, 0.25),
          0 4px 16px rgba(0, 0, 0, 0.15)
        `,
      }}
    >
      {/* Mouse-tracking spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, rgba(249, 115, 22, 0.1), transparent 60%)`,
        }}
      />

      {/* Specular highlight — top edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[1.5px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 30%, rgba(255,255,255,0.35) 50%, rgba(255,255,255,0.25) 70%, transparent 100%)",
        }}
      />

      {/* Inner edge glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `
            linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 15%),
            linear-gradient(0deg, rgba(0,0,0,0.08) 0%, transparent 20%)
          `,
        }}
      />

      {/* Orange hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(249, 115, 22, 0.08), transparent 60%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 p-8">
        {/* Icon + Title */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400 transition-colors duration-300 group-hover:bg-orange-500/20">
            <Icon size={22} strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-orange-100">
            {process.title}
          </h3>
        </div>

        {/* Description */}
        <p className="mb-8 text-sm leading-relaxed text-white/50">
          {process.description}
        </p>

        {/* Steps */}
        <div className="space-y-4">
          {process.steps.map((step, i) => {
            const StepIcon = step.icon;
            return (
              <div
                key={i}
                className="group/step flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition-all duration-300 hover:border-orange-500/20 hover:bg-white/[0.04]"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400/70">
                  <StepIcon size={14} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white/70">
                    {step.label}
                  </p>
                  <p className="text-xs leading-relaxed text-white/40">
                    {step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ============================================
// GLOWING POINTER SECTION WRAPPER
// ============================================

function GlowingSection({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="process"
      className="relative py-32 px-6"
    >
      {/* Primary glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(249, 115, 22, 0.06), transparent 60%)`,
        }}
      />
      {/* Secondary softer glow */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(900px circle at ${mousePos.x}% ${mousePos.y}%, rgba(249, 115, 22, 0.03), transparent 50%)`,
        }}
      />
      <div className="relative z-10 mx-auto max-w-6xl">
        {children}
      </div>
    </section>
  );
}

// ============================================
// MAIN SECTION
// ============================================

export default function ProcessSection() {
  return (
    <GlowingSection>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-500/70">
          Process
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          My Process
        </h2>
        <p className="mt-4 max-w-xl text-lg text-white/40">
          Every project follows a proven workflow designed to deliver
          results — not just deliverables.
        </p>
      </motion.div>

      {/* Process grid — 2x2 even stack */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:max-w-5xl lg:mx-auto"
      >
        {processes.map((process) => (
          <ProcessCard key={process.title} process={process} />
        ))}
      </motion.div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-16 text-center"
      >
        <p className="mb-4 text-white/40">
          Wanna dive deeper into the process?
        </p>
        <a
          href="/work"
          className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-6 py-3 text-sm font-medium text-orange-400 ring-1 ring-orange-500/20 transition-all duration-300 hover:bg-orange-500/20 hover:ring-orange-500/40"
        >
          Learn more here
          <ArrowRight size={14} />
        </a>
      </motion.div>
    </GlowingSection>
  );
}