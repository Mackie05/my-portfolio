"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import {
  Video,
  TrendingUp,
  Clapperboard,
  Megaphone,
  Palette,
  BarChart3,
} from "lucide-react";

// ============================================
// CONFIGURATION
// ============================================

const SHOW_BRAND_IDENTITY = false;
const SHOW_ANALYTICS = false;

const services = [
  {
    icon: TrendingUp,
    title: "Social Media Growth Strategy",
    description:
      "Data-driven content systems designed to scale your brand's presence across TikTok, Instagram, and YouTube.",
    disabled: false,
  },
  {
    icon: Video,
    title: "Short-Form Video Editing",
    description:
      "High-retention edits optimized for the algorithm. Hooks, pacing, and visual storytelling that stops the scroll.",
    disabled: false,
  },
  {
    icon: Clapperboard,
    title: "Long-Form Content Production",
    description:
      "Documentaries, brand films, and interview series with cinematic production value and narrative structure.",
    disabled: false,
  },
  {
    icon: Megaphone,
    title: "Creative Direction",
    description:
      "End-to-end creative leadership from concept to final delivery. Building cohesive visual worlds for brands.",
    disabled: false,
  },
  {
    icon: Palette,
    title: "Brand Identity & Visual Systems",
    description:
      "Developing distinctive visual languages that make brands instantly recognizable across all touchpoints.",
    disabled: !SHOW_BRAND_IDENTITY,
  },
  {
    icon: BarChart3,
    title: "Content Analytics & Optimization",
    description:
      "Performance analysis and iterative optimization to maximize reach, engagement, and conversion.",
    disabled: !SHOW_ANALYTICS,
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

// ============================================
// 3D TILT CARD
// ============================================

function TiltCard({
  service,
  isLastOdd,
}: {
  service: (typeof services)[0];
  isLastOdd: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Raw mouse position (0-1)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth spring physics for natural feel
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-12, 12]), springConfig);

  // Specular highlight position
  const highlightX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), springConfig);
  const highlightY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const Icon = service.icon;

  return (
    <motion.div
      ref={cardRef}
      variants={item}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={isLastOdd ? "md:col-span-2 lg:col-span-1 lg:col-start-2" : ""}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm transition-colors duration-300 hover:border-orange-500/30 hover:bg-white/[0.06]"
      >
        {/* 3D depth shadow */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(249, 115, 22, 0.1)",
          }}
        />

        {/* Specular highlight — follows cursor */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: useTransform(
              [highlightX, highlightY],
              ([x, y]) =>
                `radial-gradient(circle 180px at ${x}% ${y}%, rgba(255, 255, 255, 0.08), transparent 60%)`
            ),
          }}
        />

        {/* Orange inner glow on hover */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(249, 115, 22, 0.06), transparent 60%)",
          }}
        />

        {/* Content — translateZ for depth */}
        <div
          className="relative z-10"
          style={{ transform: "translateZ(30px)" }}
        >
          <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 transition-colors duration-300 group-hover:bg-orange-500/20">
            <Icon className="h-6 w-6 text-orange-400" />
          </div>

          <h3 className="mb-3 text-xl font-bold text-white transition-colors duration-300 group-hover:text-orange-100">
            {service.title}
          </h3>

          <p className="text-sm leading-relaxed text-white/50">
            {service.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================
// GLOWING POINTER — Section-level effect
// ============================================
// An orange glow follows the cursor across the entire section,
// visible behind/around cards

function GlowingPointer({ children }: { children: React.ReactNode }) {
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
      id="services"
      className="relative py-32 px-6"
    >
      {/* Glowing cursor follower */}
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

      <div className="relative z-10 mx-auto max-w-7xl">
        {children}
      </div>
    </section>
  );
}

// ============================================
// GRID LAYOUT HELPER
// ============================================

function getGridWrapperClasses(count: number): string {
  if (count <= 2) return "grid-cols-1 md:grid-cols-2";
  if (count === 3) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  if (count === 4) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:max-w-4xl lg:mx-auto";
  if (count === 5) return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
}

function getGridItemClasses(count: number, index: number): string {
  if (count === 1) return "col-span-full max-w-md mx-auto";
  if (count === 5 && index === 4) return "md:col-span-2 lg:col-span-1 lg:col-start-2";
  return "";
}

// ============================================
// MAIN SERVICES SECTION
// ============================================

export function Services() {
  const activeServices = services.filter((s) => !s.disabled);
  const count = activeServices.length;
  const isOdd = count % 2 !== 0 && count > 1;
  const lastIndex = count - 1;

  return (
    <GlowingPointer>
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-500/70">
          Services
        </p>
        <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
          What I bring to the table.
        </h2>
      </motion.div>

      {/* Services grid */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className={`grid gap-6 ${getGridWrapperClasses(count)}`}
      >
        {activeServices.map((service, index) => {
          const itemClasses = getGridItemClasses(count, index);
          const isLastOddItem = isOdd && index === lastIndex;

          return (
            <div key={service.title} className={itemClasses}>
              <TiltCard
                service={service}
                isLastOdd={isLastOddItem}
              />
            </div>
          );
        })}
      </motion.div>
    </GlowingPointer>
  );
}