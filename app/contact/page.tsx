"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Send,
  Mail,
  MapPin,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

// ============================================
// CONFIGURATION
// ============================================

const FORMSPREE_ID = "YOUR_FORM_ID"; // Replace with your Formspree form ID

// Toggle social platforms on/off
const SOCIAL_CONFIG = {
  instagram: { enabled: true, handle: "YOUR_HANDLE", url: "https://instagram.com/YOUR_HANDLE" },
  youtube: { enabled: true, handle: "@YOUR_HANDLE", url: "https://youtube.com/@YOUR_HANDLE" },
  linkedin: { enabled: true, handle: "YOUR_PROFILE", url: "https://linkedin.com/in/YOUR_PROFILE" },
  twitter: { enabled: true, handle: "YOUR_HANDLE", url: "https://twitter.com/YOUR_HANDLE" },
};

const socialLinks = [
  { name: "Instagram", key: "instagram", icon: Instagram },
  { name: "YouTube", key: "youtube", icon: Youtube },
  { name: "LinkedIn", key: "linkedin", icon: Linkedin },
  { name: "Twitter / X", key: "twitter", icon: Twitter },
].filter((link) => SOCIAL_CONFIG[link.key as keyof typeof SOCIAL_CONFIG]?.enabled);

// ============================================
// EXAGGERATED LIQUID GLASS CARD
// ============================================

function LiquidGlassCard({
  children,
  className = "",
  intensity = "medium",
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "heavy" | "extreme";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const blurValues = {
    light: "blur(16px) saturate(160%)",
    medium: "blur(28px) saturate(200%)",
    heavy: "blur(44px) saturate(250%)",
    extreme: "blur(60px) saturate(300%)",
  };

  const bgValues = {
    light: "rgba(255, 255, 255, 0.04)",
    medium: "rgba(255, 255, 255, 0.03)",
    heavy: "rgba(255, 255, 255, 0.025)",
    extreme: "rgba(255, 255, 255, 0.02)",
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: bgValues[intensity],
        backdropFilter: blurValues[intensity],
        WebkitBackdropFilter: blurValues[intensity],
        border: "1.5px solid rgba(255, 255, 255, 0.1)",
        boxShadow: `
          inset 0 1px 2px rgba(255, 255, 255, 0.12),
          inset 0 -1px 2px rgba(0, 0, 0, 0.15),
          0 12px 48px rgba(0, 0, 0, 0.25),
          0 4px 16px rgba(0, 0, 0, 0.15),
          0 0 0 1px rgba(255, 255, 255, 0.03)
        `,
      }}
    >
      {/* Mouse-tracking spotlight glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(249, 115, 22, 0.1), transparent 60%)`,
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

      {/* Inner edge glow — bottom/right */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `
            linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 15%),
            linear-gradient(0deg, rgba(0,0,0,0.08) 0%, transparent 20%),
            linear-gradient(135deg, transparent 60%, rgba(255,255,255,0.02) 100%)
          `,
        }}
      />

      {/* Orange hover glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, rgba(249, 115, 22, 0.08), transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(249, 115, 22, 0.04), transparent 50%)
          `,
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================
// SOFT HAZE PROXIMITY REVEAL HEADING
// ============================================
// - Words are spaced out (letter-spacing)
// - Soft gradient falloff instead of binary on/off
// - Text-shadow glow creates a hazy, dreamy feel
// - Works from any direction

function HazeRevealHeading({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [intensities, setIntensities] = useState<number[]>(
    new Array(text.length).fill(0)
  );
  const rafRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  // Smooth ease-out curve: closer = faster ramp to full intensity
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    const updateProximity = () => {
      const mouse = mouseRef.current;
      const newIntensities = letterRefs.current.map((letterEl) => {
        if (!letterEl) return 0;
        const rect = letterEl.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(mouse.x - letterCenterX, 2) +
          Math.pow(mouse.y - letterCenterY, 2)
        );
        // 160px radius with soft falloff
        const maxDist = 160;
        const raw = Math.max(0, 1 - distance / maxDist);
        return easeOut(raw);
      });
      setIntensities(newIntensities);
      rafRef.current = requestAnimationFrame(updateProximity);
    };

    rafRef.current = requestAnimationFrame(updateProximity);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
    setIntensities(new Array(text.length).fill(0));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block cursor-default select-none"
    >
      <h1
        className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
        style={{ letterSpacing: "0.04em", lineHeight: 1.35 }}
      >
        {text.split("").map((char, i) => {
          const intensity = intensities[i];
          // Interpolate between dim gray and soft orange
          const r = Math.round(255 * 0.25 + (249 - 255 * 0.25) * intensity);
          const g = Math.round(255 * 0.25 + (115 - 255 * 0.25) * intensity);
          const b = Math.round(255 * 0.25 + (22 - 255 * 0.25) * intensity);
          const color = `rgb(${r}, ${g}, ${b})`;

          // Soft glow shadow that grows with intensity
          const shadowBlur = intensity * 16;
          const shadowOpacity = intensity * 0.4;
          const textShadow =
            shadowBlur > 0
              ? `0 0 ${shadowBlur}px rgba(249, 115, 22, ${shadowOpacity}), 0 0 ${shadowBlur * 2}px rgba(249, 115, 22, ${shadowOpacity * 0.3})`
              : "none";

          return (
            <span
              key={i}
              ref={(el) => { letterRefs.current[i] = el; }}
              className="inline-block transition-colors duration-75"
              style={{
                color,
                textShadow,
                minWidth: char === " " ? "0.35em" : undefined,
                minHeight: "1.35em",
                lineHeight: 1.35,
              }}
            >
              {char === " " ? " " : char}
            </span>
          );
        })}
      </h1>
    </div>
  );
}

// ============================================
// FORM INPUT WITH LIQUID GLASS + MOUSE GLOW
// ============================================

function LiquidInput({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const baseClasses = `
    w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5
    text-sm text-white placeholder:text-white/20
    backdrop-blur-md
    transition-all duration-300
    focus:border-orange-500/40 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-orange-500/20
    hover:border-white/20
  `;

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className="group/field relative space-y-2">
      {/* Mouse-tracking spotlight */}
      <div
        className="pointer-events-none absolute -inset-2 rounded-xl opacity-0 transition-opacity duration-500 group-hover/field:opacity-100"
        style={{
          background: `radial-gradient(300px circle at ${mousePos.x}% ${mousePos.y}%, rgba(249, 115, 22, 0.08), transparent 60%)`,
        }}
      />

      <label className="relative z-10 text-sm font-medium text-white/50">{label}</label>
      {textarea ? (
        <textarea
          name={name}
          placeholder={placeholder}
          required={required}
          rows={5}
          className={`${baseClasses} relative z-10 resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          className={`${baseClasses} relative z-10`}
        />
      )}
    </div>
  );
}

// ============================================
// MAIN CONTACT SECTION
// ============================================

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setSubmitted(true);
        form.reset();
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <section className="relative min-h-screen py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-orange-500/70">
            Contact
          </p>

          {/* Haze reveal heading */}
          <div className="flex justify-center">
            <HazeRevealHeading text="Let us build something together." />
          </div>

          <p className="mx-auto mt-6 max-w-lg text-lg text-white/40">
            Have a project in mind? I&apos;d love to hear about it. Drop me a
            message and let&apos;s create something great.
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Contact form — takes 3 columns */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <LiquidGlassCard className="p-8 md:p-10" intensity="heavy">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="mb-4 rounded-full bg-orange-500/10 p-4">
                    <Sparkles className="text-orange-400" size={32} />
                  </div>
                  <h3 className="mb-2 text-2xl font-semibold text-white">
                    Message sent!
                  </h3>
                  <p className="text-white/50">
                    Thanks for reaching out. I&apos;ll get back to you soon.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-orange-400/80 transition-colors hover:text-orange-400"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <LiquidInput
                      label="Name"
                      name="name"
                      placeholder="Your name"
                      required
                    />
                    <LiquidInput
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <LiquidInput
                    label="Subject"
                    name="subject"
                    placeholder="What's this about?"
                    required
                  />

                  <LiquidInput
                    label="Message"
                    name="message"
                    placeholder="Tell me about your project..."
                    textarea
                    required
                  />

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500/10 px-6 py-4 text-sm font-semibold text-orange-400 ring-1 ring-orange-500/20 transition-all duration-300 hover:bg-orange-500/20 hover:ring-orange-500/40 sm:w-auto"
                  >
                    Send message
                    <Send
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-0.5"
                    />
                  </motion.button>
                </form>
              )}
            </LiquidGlassCard>
          </motion.div>

          {/* Side info — takes 2 columns */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-6 lg:col-span-2"
          >
            {/* Email card */}
            <LiquidGlassCard className="p-6" intensity="medium">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-orange-500/10 p-3 text-orange-400">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-white/50">
                    Email
                  </p>
                  <a
                    href="mailto:hello@yourname.com"
                    className="text-white transition-colors hover:text-orange-400"
                  >
                    hello@yourname.com
                  </a>
                </div>
              </div>
            </LiquidGlassCard>

            {/* Location card */}
            <LiquidGlassCard className="p-6" intensity="medium">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-orange-500/10 p-3 text-orange-400">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="mb-1 text-sm font-medium text-white/50">
                    Location
                  </p>
                  <p className="text-white">Remote / Worldwide</p>
                </div>
              </div>
            </LiquidGlassCard>

            {/* Social links card */}
            <LiquidGlassCard className="p-6" intensity="medium">
              <p className="mb-4 text-sm font-medium text-white/50">
                Socials
              </p>
              <div className="grid grid-cols-2 gap-3">
                {socialLinks.map((link) => {
                  const Icon = link.icon;
                  const config = SOCIAL_CONFIG[link.key as keyof typeof SOCIAL_CONFIG];
                  return (
                    <a
                      key={link.name}
                      href={config?.url || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-all duration-300 hover:border-orange-500/20 hover:bg-white/[0.05]"
                    >
                      <Icon
                        size={18}
                        className="text-white/40 transition-colors group-hover:text-orange-400"
                      />
                      <span className="text-sm text-white/60 transition-colors group-hover:text-white">
                        {link.name}
                      </span>
                      <ArrowUpRight
                        size={12}
                        className="ml-auto text-white/20 transition-all group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  );
                })}
              </div>
            </LiquidGlassCard>

            {/* Availability badge */}
            <LiquidGlassCard className="p-6" intensity="medium">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" />
                </span>
                <p className="text-sm text-white/60">
                  Currently available for new projects
                </p>
              </div>
            </LiquidGlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}