"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  Mail,
  MapPin,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Send,
  Sparkles,
} from "lucide-react";

// ============================================
// CONFIGURATION — Toggle socials on/off
// ============================================

const SOCIAL_CONFIG = {
  instagram: { enabled: true, url: "#" },
  youtube: { enabled: true, url: "#" },
  linkedin: { enabled: true, url: "#" },
  twitter: { enabled: true, url: "#" },
};

const socials = [
  { icon: Instagram, label: "Instagram", key: "instagram" },
  { icon: Youtube, label: "YouTube", key: "youtube" },
  { icon: Linkedin, label: "LinkedIn", key: "linkedin" },
  { icon: Twitter, label: "Twitter", key: "twitter" },
].filter((s) => SOCIAL_CONFIG[s.key as keyof typeof SOCIAL_CONFIG]?.enabled);

// ============================================
// LIQUID GLASS CARD
// ============================================

function LiquidGlass({
  children,
  className = "",
  intensity = "medium",
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: "light" | "medium" | "heavy";
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

  const blur = {
    light: "blur(16px) saturate(160%)",
    medium: "blur(28px) saturate(200%)",
    heavy: "blur(44px) saturate(250%)",
  }[intensity];

  const bg = {
    light: "rgba(255, 255, 255, 0.04)",
    medium: "rgba(255, 255, 255, 0.03)",
    heavy: "rgba(255, 255, 255, 0.025)",
  }[intensity];

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl ${className}`}
      style={{
        background: bg,
        backdropFilter: blur,
        WebkitBackdropFilter: blur,
        border: "1.5px solid rgba(255, 255, 255, 0.1)",
        boxShadow: `
          inset 0 1px 2px rgba(255, 255, 255, 0.12),
          inset 0 -1px 2px rgba(0, 0, 0, 0.15),
          0 12px 48px rgba(0, 0, 0, 0.25),
          0 4px 16px rgba(0, 0, 0, 0.15)
        `,
      }}
    >
      {/* Mouse spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, rgba(249, 115, 22, 0.1), transparent 60%)`,
        }}
      />
      {/* Specular top edge */}
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
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// ============================================
// HAZE PROXIMITY REVEAL HEADING
// ============================================

function HazeHeading({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [intensities, setIntensities] = useState<number[]>(
    new Array(text.length).fill(0)
  );
  const rafRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    const update = () => {
      const mouse = mouseRef.current;
      const newIntensities = letterRefs.current.map((el) => {
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const d = Math.sqrt(
          Math.pow(mouse.x - cx, 2) + Math.pow(mouse.y - cy, 2)
        );
        return easeOut(Math.max(0, 1 - d / 160));
      });
      setIntensities(newIntensities);
      rafRef.current = requestAnimationFrame(update);
    };
    rafRef.current = requestAnimationFrame(update);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      }}
      onMouseLeave={() => {
        mouseRef.current = { x: -1000, y: -1000 };
        setIntensities(new Array(text.length).fill(0));
      }}
      className="inline-block cursor-default select-none"
    >
      <h2
        className="text-4xl font-bold tracking-tight md:text-5xl"
        style={{ letterSpacing: "0.04em", lineHeight: 1.35 }}
      >
        {text.split("").map((char, i) => {
          const t = intensities[i];
          const r = Math.round(255 * 0.25 + (249 - 255 * 0.25) * t);
          const g = Math.round(255 * 0.25 + (115 - 255 * 0.25) * t);
          const b = Math.round(255 * 0.25 + (22 - 255 * 0.25) * t);
          const sb = t * 16;
          const so = t * 0.4;
          return (
            <span
              key={i}
              ref={(el) => { letterRefs.current[i] = el; }}
              className="inline-block transition-colors duration-75"
              style={{
                color: `rgb(${r}, ${g}, ${b})`,
                textShadow:
                  sb > 0
                    ? `0 0 ${sb}px rgba(249,115,22,${so}), 0 0 ${sb * 2}px rgba(249,115,22,${so * 0.3})`
                    : "none",
                minWidth: char === " " ? "0.35em" : undefined,
                minHeight: "1.35em",
                lineHeight: 1.35,
              }}
            >
              {char === " " ? " " : char}
            </span>
          );
        })}
      </h2>
    </div>
  );
}

// ============================================
// LIQUID INPUT (with mouse glow)
// ============================================

function LiquidInput({
  label,
  id,
  name,
  type = "text",
  placeholder,
  required = false,
  textarea = false,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
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

  const base = `
    w-full px-4 py-3 rounded-xl
    bg-white/[0.03] border border-white/10
    text-sm text-white placeholder:text-white/20
    backdrop-blur-md
    transition-all duration-300
    focus:border-orange-500/40 focus:bg-white/[0.06] focus:outline-none focus:ring-1 focus:ring-orange-500/20
    hover:border-white/20
  `;

  return (
    <div ref={ref} onMouseMove={handleMouseMove} className="group/field relative space-y-2">
      <div
        className="pointer-events-none absolute -inset-2 rounded-xl opacity-0 transition-opacity duration-500 group-hover/field:opacity-100"
        style={{
          background: `radial-gradient(300px circle at ${mousePos.x}% ${mousePos.y}%, rgba(249, 115, 22, 0.08), transparent 60%)`,
        }}
      />
      <label htmlFor={id} className="relative z-10 text-sm font-medium text-white/50">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          required={required}
          placeholder={placeholder}
          className={`${base} resize-none relative z-10`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          placeholder={placeholder}
          className={`${base} relative z-10`}
        />
      )}
    </div>
  );
}

// ============================================
// MAIN CONTACT SECTION
// ============================================

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="py-32 px-6 max-w-7xl mx-auto">
      {/* Header with haze reveal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-sm font-medium uppercase tracking-widest text-orange-500/70 mb-4">
          Contact
        </p>
        <HazeHeading text="Let's build something together." />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left column — info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <p className="text-lg text-white/50 leading-relaxed">
            Open to creative director roles, freelance projects, and brand
            partnerships. If you're building something worth talking about,
            I want to hear about it.
          </p>

          <div className="space-y-4">
            {/* Email */}
            <LiquidGlass intensity="light">
              <a
                href="mailto:Mackiebellen@gmail.com"
                className="flex items-center gap-4 p-4 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center group-hover:bg-orange-500/20 transition-colors">
                  <Mail className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Email</p>
                  <p className="font-medium text-white group-hover:text-orange-400 transition-colors">
                    Mackiebellen@gmail.com
                  </p>
                </div>
              </a>
            </LiquidGlass>

            {/* Location */}
            <LiquidGlass intensity="light">
              <div className="flex items-center gap-4 p-4">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-white/50">Location</p>
                  <p className="font-medium text-white">
                    Available Worldwide / Remote
                  </p>
                </div>
              </div>
            </LiquidGlass>
          </div>

          {/* Socials */}
          <div className="pt-4">
            <p className="text-sm text-white/50 mb-4">Follow along</p>
            <div className="flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={SOCIAL_CONFIG[social.key as keyof typeof SOCIAL_CONFIG]?.url || "#"}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center hover:bg-orange-500/10 hover:text-orange-400 transition-colors text-white/60"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right column — form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <LiquidGlass intensity="heavy" className="p-8">
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
                  Thanks for reaching out. I'll get back to you soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm text-orange-400/80 transition-colors hover:text-orange-400"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form
                action="https://formspree.io/f/xbdwpzlv"
                method="POST"
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const data = new FormData(form);
                  fetch(form.action, {
                    method: "POST",
                    body: data,
                    headers: { Accept: "application/json" },
                  }).then((res) => {
                    if (res.ok) {
                      setSubmitted(true);
                      form.reset();
                    }
                  });
                }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <LiquidInput
                    label="Name"
                    id="name"
                    name="name"
                    placeholder="MC KINLY BONGADILLO"
                    required
                  />
                  <LiquidInput
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <LiquidInput
                  label="Subject"
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  required
                />

                <LiquidInput
                  label="Message"
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  textarea
                  required
                />

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-orange-500/10 px-8 py-4 text-sm font-semibold text-orange-400 ring-1 ring-orange-500/20 transition-all duration-300 hover:bg-orange-500/20 hover:ring-orange-500/40"
                >
                  Send Message
                  <Send
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </motion.button>
              </form>
            )}
          </LiquidGlass>
        </motion.div>
      </div>
    </section>
  );
} 