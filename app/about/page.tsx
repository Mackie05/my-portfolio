"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";

const experience = [
  {
    role: "Creative Director",
    company: "Freelance",
    period: "2024 — Present",
    description:
      "Leading creative strategy and content production for brands across lifestyle, tech, and e-commerce.",
  },
  {
    role: "Senior Video Editor",
    company: "Content Agency",
    period: "2022 — 2024",
    description:
      "Edited high-performing short-form and long-form content for 15+ brands. Developed editing frameworks adopted agency-wide.",
  },
  {
    role: "Video Editor",
    company: "Media Studio",
    period: "2021 — 2022",
    description:
      "Cut social content, brand films, and interview series. Learned the fundamentals of algorithm-driven storytelling.",
  },
];

const skills = [
  "Creative Direction",
  "Social Media Strategy",
  "Short-Form Video Editing",
  "Long-Form Production",
  "Motion Graphics",
  "Color Grading",
  "Sound Design",
  "Content Analytics",
  "Brand Identity",
  "Team Leadership",
  "DaVinci Resolve",
  "After Effects",
  "CapCut",
  "Figma",
];

export default function AboutPage() {
  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
          About
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          The story so far.
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              I started in the edit room, obsessing over frame-by-frame cuts and
              the perfect pacing of a story. That foundation taught me that every
              second matters, and that the best content does not just look good,
              it performs.
            </p>
            <p>
              Today, I lead creative for brands that want to grow through content.
              I bridge the gap between strategy and execution, designing content
              systems that turn scrollers into followers and followers into customers.
            </p>
            <p>
              My sweet spot is at the intersection of data-driven growth strategy
              and cinematic storytelling. Whether it is a 6-second TikTok hook or
              a 20-minute brand documentary, I believe every piece of content
              should earn its place in the feed.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
            <div>
              <p className="text-3xl font-bold text-accent">50M+</p>
              <p className="text-sm text-muted-foreground mt-1">Total Views</p>
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

          <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-medium hover:bg-accent hover:text-accent-foreground transition-colors">
            <Download className="h-4 w-4" />
            Download Resume
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-12"
        >
          <div>
            <h2 className="text-2xl font-bold mb-6">Experience</h2>
            <div className="space-y-8">
              {experience.map((job) => (
                <div
                  key={job.role + job.company}
                  className="pb-8 border-b border-border last:border-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-bold">{job.role}</h3>
                      <p className="text-muted-foreground">{job.company}</p>
                    </div>
                    <span className="text-sm text-muted-foreground shrink-0 ml-4">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-6">Skills & Tools</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 rounded-full bg-muted text-sm font-medium hover:bg-accent/10 hover:text-accent transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
