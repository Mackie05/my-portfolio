"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Sparkles, Film, Clapperboard, Palette, BarChart3 } from "lucide-react";

// ============================================
// CONFIGURATION
// ============================================

const SHOW_BRAND_IDENTITY = false;
const SHOW_ANALYTICS = false;
const SHOW_PRICES = false;

// ============================================
// ANIMATED BACKGROUND ILLUSTRATIONS
// ============================================

function SocialGrowthAnimation() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full opacity-[0.12]"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Grid lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.line
          key={`h-${i}`}
          x1="0"
          y1={60 + i * 50}
          x2="400"
          y2={60 + i * 50}
          stroke="currentColor"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.3 }}
          transition={{ duration: 2, delay: i * 0.2, ease: "easeInOut" }}
        />
      ))}
      {/* Upward trend line */}
      <motion.path
        d="M 40 240 Q 100 200 160 180 T 280 120 T 360 60"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 3 }}
      />
      {/* Data points */}
      {[
        { cx: 40, cy: 240 },
        { cx: 160, cy: 180 },
        { cx: 280, cy: 120 },
        { cx: 360, cy: 60 },
      ].map((point, i) => (
        <motion.circle
          key={i}
          cx={point.cx}
          cy={point.cy}
          r="4"
          fill="currentColor"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.4, ease: "easeOut" }}
        />
      ))}
      {/* Floating follower icons */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.g
          key={`follower-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [-10, -40],
            x: [0, (i % 2 === 0 ? 15 : -15)],
          }}
          transition={{
            duration: 3,
            delay: i * 0.6,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          <circle cx={80 + i * 70} cy={200} r="6" fill="currentColor" />
          <circle cx={80 + i * 70} cy={190} r="3" fill="currentColor" />
        </motion.g>
      ))}
    </svg>
  );
}

function VideoEditingAnimation() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full opacity-[0.12]"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Film strips */}
      {[0, 1, 2].map((i) => (
        <motion.rect
          key={i}
          x={40 + i * 120}
          y={80 + i * 30}
          width="80"
          height="120"
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 0.8, delay: i * 0.3 }}
        />
      ))}
      {/* Playhead / scrubber */}
      <motion.line
        x1="40"
        y1="220"
        x2="360"
        y2="220"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Infinity }}
      />
      {/* Moving playhead indicator */}
      <motion.circle
        cx="40"
        cy="220"
        r="6"
        fill="currentColor"
        animate={{ cx: [40, 360, 40] }}
        transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
      />
      {/* Cut markers */}
      {[120, 200, 280].map((x, i) => (
        <motion.line
          key={i}
          x1={x}
          y1="210"
          x2={x}
          y2="230"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.3, delay: 1 + i * 0.5 }}
        />
      ))}
    </svg>
  );
}

function LongFormAnimation() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full opacity-[0.12]"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Camera frame */}
      <motion.rect
        x="100"
        y="60"
        width="200"
        height="140"
        rx="8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 0.5, pathLength: 1 }}
        transition={{ duration: 1.5 }}
      />
      {/* Recording dot */}
      <motion.circle
        cx="280"
        cy="80"
        r="6"
        fill="#ef4444"
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {/* Waveform */}
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
        <motion.rect
          key={i}
          x={120 + i * 15}
          y={150}
          width="8"
          rx="4"
          fill="currentColor"
          initial={{ height: 10, opacity: 0 }}
          animate={{
            height: [10, 30 + Math.random() * 40, 10],
            opacity: 0.4,
          }}
          transition={{
            duration: 1.2,
            delay: i * 0.1,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Timeline track */}
      <motion.rect
        x="60"
        y="240"
        width="280"
        height="4"
        rx="2"
        fill="currentColor"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </svg>
  );
}

function CreativeDirectionAnimation() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full opacity-[0.12]"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Mood board grid */}
      {[
        { x: 60, y: 50, w: 100, h: 80 },
        { x: 180, y: 50, w: 70, h: 80 },
        { x: 270, y: 50, w: 70, h: 80 },
        { x: 60, y: 150, w: 130, h: 100 },
        { x: 210, y: 150, w: 130, h: 100 },
      ].map((rect, i) => (
        <motion.rect
          key={i}
          x={rect.x}
          y={rect.y}
          width={rect.w}
          height={rect.h}
          rx="4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 0.6, delay: i * 0.15 }}
        />
      ))}
      {/* Connecting lines — creative flow */}
      <motion.path
        d="M 110 90 L 215 90 L 305 90 L 305 150 L 275 150"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="6 4"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
      />
      {/* Brush stroke effect */}
      <motion.path
        d="M 50 250 Q 200 230 350 250"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeOut", repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );
}

function BrandIdentityAnimation() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full opacity-[0.12]"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Logo mark forming */}
      <motion.circle
        cx="200"
        cy="120"
        r="50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0, rotate: -90 }}
        animate={{ pathLength: 1, rotate: 0 }}
        transition={{ duration: 2, ease: "easeInOut", repeat: Infinity, repeatDelay: 2 }}
        style={{ transformOrigin: "200px 120px" }}
      />
      {/* Typography lines */}
      {[0, 1, 2, 3].map((i) => (
        <motion.line
          key={i}
          x1="120"
          y1={200 + i * 18}
          x2={280 - i * 20}
          y2={200 + i * 18}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.5 + i * 0.2, ease: "easeOut" }}
        />
      ))}
      {/* Color swatches */}
      {[
        { x: 80, color: "#f97316" },
        { x: 130, color: "#3b82f6" },
        { x: 180, color: "#10b981" },
        { x: 230, color: "#8b5cf6" },
      ].map((swatch, i) => (
        <motion.rect
          key={i}
          x={swatch.x}
          y="50"
          width="30"
          height="30"
          rx="4"
          fill={swatch.color}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.4, delay: 1.5 + i * 0.15 }}
        />
      ))}
    </svg>
  );
}

function AnalyticsAnimation() {
  return (
    <svg
      viewBox="0 0 400 300"
      className="absolute inset-0 h-full w-full opacity-[0.12]"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Bar chart */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.rect
          key={i}
          x={60 + i * 55}
          y={200}
          width="35"
          rx="3"
          fill="currentColor"
          initial={{ height: 0, y: 200, opacity: 0 }}
          animate={{
            height: [0, 40 + i * 25, 30 + i * 20],
            y: [200, 200 - (40 + i * 25), 200 - (30 + i * 20)],
            opacity: 0.4,
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />
      ))}
      {/* Line overlay */}
      <motion.path
        d="M 77 160 L 132 130 L 187 100 L 242 120 L 297 70 L 352 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }}
      />
      {/* Data labels floating */}
      {[0, 1, 2, 3].map((i) => (
        <motion.text
          key={i}
          x={100 + i * 80}
          y={60 + i * 15}
          fill="currentColor"
          fontSize="10"
          fontFamily="sans-serif"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{
            duration: 2,
            delay: i * 0.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          +{12 + i * 8}%
        </motion.text>
      ))}
    </svg>
  );
}

const animationMap: Record<string, React.FC> = {
  "social-media-growth": SocialGrowthAnimation,
  "short-form-video": VideoEditingAnimation,
  "long-form-video": LongFormAnimation,
  "creative-direction": CreativeDirectionAnimation,
  "brand-identity": BrandIdentityAnimation,
  "content-analytics": AnalyticsAnimation,
};

// ============================================
// SERVICES DATA
// ============================================

const services = [
  {
    id: "social-media-growth",
    number: "01",
    title: "Social Media Growth Strategy",
    price: "$3,500/mo",
    description:
      "Data-driven content systems designed to scale your brand presence across TikTok, Instagram, and YouTube.",
    features: [
      "Content strategy & calendar",
      "Platform-specific optimization",
      "Performance analytics & reporting",
      "Monthly strategy sessions",
    ],
    icon: Sparkles,
    featured: false,
  },
  {
    id: "short-form-video",
    number: "02",
    title: "Short-Form Video Editing",
    price: "$150/video",
    description:
      "High-retention edits optimized for the algorithm. Hooks, pacing, and visual storytelling that stops the scroll.",
    features: [
      "Hook-optimized edits",
      "Caption & sound design",
      "Thumbnail frames",
      "Platform-specific exports",
    ],
    icon: Film,
    featured: false,
  },
  {
    id: "long-form-video",
    number: "03",
    title: "Long-Form Content Production",
    price: "$5,000/project",
    description:
      "Documentaries, brand films, and interview series with cinematic production value and narrative structure.",
    features: [
      "Full production planning",
      "Cinematic editing & color",
      "Motion graphics & titles",
      "Multi-platform distribution cuts",
    ],
    icon: Clapperboard,
    featured: false,
  },
  {
    id: "creative-direction",
    number: "04",
    title: "Creative Direction",
    price: "$8,000/project",
    description:
      "End-to-end creative leadership from concept to final delivery. Building cohesive visual worlds for brands.",
    features: [
      "Creative concept development",
      "Visual direction & mood boards",
      "Team oversight & feedback",
      "Final delivery & handoff",
    ],
    icon: Palette,
    featured: true,
  },
  {
    id: "brand-identity",
    number: "05",
    title: "Brand Identity & Visual Systems",
    price: "$4,500",
    description:
      "Developing distinctive visual languages that make brands instantly recognizable across all touchpoints.",
    features: [
      "Visual identity system",
      "Content templates",
      "Brand guidelines",
      "Asset library",
    ],
    icon: Palette,
    featured: false,
    disabled: !SHOW_BRAND_IDENTITY,
  },
  {
    id: "content-analytics",
    number: "06",
    title: "Content Analytics & Optimization",
    price: "$2,000/mo",
    description:
      "Performance analysis and iterative optimization to maximize reach, engagement, and conversion.",
    features: [
      "Weekly performance reports",
      "A/B testing framework",
      "Content audit & recommendations",
      "Quarterly strategy reviews",
    ],
    icon: BarChart3,
    featured: false,
    disabled: !SHOW_ANALYTICS,
  },
];

// ============================================
// ANIMATION VARIANTS
// ============================================

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// ============================================
// SERVICE CARD COMPONENT
// ============================================

function ServiceCard({
  service,
  isLastOdd,
}: {
  service: (typeof services)[0];
  isLastOdd: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const Icon = service.icon;
  const Animation = animationMap[service.id];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors duration-300 hover:border-orange-500/30 hover:bg-white/[0.06]"
    >
      {/* Animated background illustration */}
      {Animation && (
        <div className="pointer-events-none absolute inset-0 text-orange-500">
          <Animation />
        </div>
      )}

      {/* Mouse-tracking spotlight glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, rgba(249, 115, 22, 0.12), transparent 50%)`,
        }}
      />

      {/* Static edge glow on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          boxShadow:
            "inset 0 0 40px rgba(249, 115, 22, 0.08), 0 0 40px rgba(249, 115, 22, 0.05)",
        }}
      />

      {/* Card content */}
      <div className="relative z-10 flex h-full flex-col">
        {/* Number + Icon row */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-sm font-medium text-white/30">
            {service.number}
          </span>
          <div className="rounded-lg bg-orange-500/10 p-2.5 text-orange-400 transition-colors duration-300 group-hover:bg-orange-500/20 group-hover:text-orange-300">
            <Icon size={20} strokeWidth={1.5} />
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-semibold tracking-tight text-white transition-colors duration-300 group-hover:text-orange-100">
          {service.title}
        </h3>

        {/* Price — hidden when SHOW_PRICES is false */}
        {SHOW_PRICES && (
          <p className="mb-4 text-sm font-medium text-orange-400/80">
            Starting at {service.price}
          </p>
        )}

        {/* Description */}
        <p className="mb-6 text-sm leading-relaxed text-white/50">
          {service.description}
        </p>

        {/* Features list */}
        <ul className="mb-8 flex-1 space-y-2.5">
          {service.features.map((feature, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-sm text-white/40"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-orange-500/60" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="/contact"
          className="group/btn inline-flex items-center gap-2 text-sm font-medium text-white/60 transition-colors duration-300 hover:text-orange-400"
        >
          Get in touch
          <ArrowRight
            size={14}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </a>
      </div>
    </motion.div>
  );
}

// ============================================
// EVEN STACK GRID LOGIC
// ============================================
// Rules:
// - Always even rows: 2 per row on md, 3 per row on lg
// - 1 service: centered single
// - 2 services: 1 row of 2
// - 3 services: 1 row of 3 (perfect)
// - 4 services: 2 rows of 2 (2 top, 2 bottom)
// - 5 services: 2 rows of 2 + 1 centered on 3rd row
// - 6 services: 2 rows of 3 (3 top, 3 bottom)

function getGridItemClasses(count: number, index: number): string {
  // 1 item: centered
  if (count === 1) {
    return "col-span-full max-w-md mx-auto";
  }

  // 2 items: standard 2-col, no special handling needed
  if (count === 2) {
    return "";
  }

  // 3 items: standard 3-col on lg, perfect row
  if (count === 3) {
    return "";
  }

  // 4 items: 2 per row on md, 2 per row on lg
  // md grid is 2-col, so 4 = 2×2 naturally
  // lg grid is 3-col, so we need to force 2 per row
  if (count === 4) {
    // On lg (3-col), make each card span 1 col but center the pair
    // We use a wrapper approach instead
    return "";
  }

  // 5 items: 2 + 2 + 1 (centered)
  if (count === 5) {
    // Last item (index 4) gets centered on its own row
    if (index === 4) {
      return "md:col-span-2 lg:col-span-1 lg:col-start-2";
    }
    return "";
  }

  // 6 items: 3 + 3 (perfect on lg)
  if (count === 6) {
    return "";
  }

  return "";
}

// ============================================
// MAIN SECTION
// ============================================

export default function ServicesSection() {
  const activeServices = services.filter((s) => !s.disabled);
  const count = activeServices.length;

  // Determine grid wrapper classes based on count
  const getGridWrapperClasses = () => {
    if (count <= 2) return "grid-cols-1 md:grid-cols-2";
    if (count === 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    if (count === 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:max-w-4xl lg:mx-auto";
    if (count === 5) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  };

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 max-w-2xl"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-orange-500/70">
            Services
          </p>
          <h2 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
            What I do
          </h2>
          <p className="text-lg text-white/50">
            End-to-end creative services for brands that want to stand out and
            scale.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className={`grid gap-5 ${getGridWrapperClasses()}`}
        >
          {activeServices.map((service, index) => {
            const itemClasses = getGridItemClasses(count, index);

            return (
              <div key={service.id} className={itemClasses}>
                <ServiceCard
                  service={service}
                  isLastOdd={count % 2 !== 0 && index === count - 1}
                />
              </div>
            );
          })}
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
            Have a project in mind? Let&apos;s talk.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-orange-500/10 px-6 py-3 text-sm font-medium text-orange-400 ring-1 ring-orange-500/20 transition-all duration-300 hover:bg-orange-500/20 hover:ring-orange-500/40"
          >
            Start a conversation
            <ArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}