"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";

const videos = {
  shortForm: [
    {
      title: "Viral Hook Series #1",
      platform: "TikTok / Reels",
      views: "2.4M views",
      description: "3-second hook formula applied to a fitness brand launch.",
    },
    {
      title: "Trend Jacking Campaign",
      platform: "TikTok / Reels",
      views: "1.8M views",
      description: "Real-time trend adaptation for a beverage brand.",
    },
    {
      title: "UGC Remix Edit",
      platform: "Instagram / YouTube Shorts",
      views: "890K views",
      description: "Community content remixed into a high-energy brand story.",
    },
  ],
  longForm: [
    {
      title: "Behind the Brand",
      platform: "YouTube",
      views: "450K views",
      description: "A 12-minute documentary on a DTC brand's origin story.",
    },
    {
      title: "Product Deep Dive",
      platform: "YouTube",
      views: "320K views",
      description: "Cinematic product breakdown with motion graphics.",
    },
    {
      title: "Founder Interview",
      platform: "YouTube / Podcast",
      views: "180K views",
      description: "Multi-camera interview series with dynamic B-roll.",
    },
  ],
};

export function SampleWorks() {
  const [activeTab, setActiveTab] = useState<"shortForm" | "longForm">("shortForm");

  return (
    <section className="py-32 px-6 max-w-7xl mx-auto bg-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
          Sample Works
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">
          The edit room.
        </h2>

        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("shortForm")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
              activeTab === "shortForm"
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Short Form
          </button>
          <button
            onClick={() => setActiveTab("longForm")}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
              activeTab === "longForm"
                ? "bg-foreground text-background"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Long Form
          </button>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {videos[activeTab].map((video, i) => (
            <motion.div
              key={video.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 transition-colors"
            >
              <div className="aspect-video bg-muted relative flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-background/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="h-6 w-6 fill-foreground" />
                </div>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-accent uppercase tracking-wide">
                    {video.platform}
                  </span>
                  <span className="text-xs text-muted-foreground">{video.views}</span>
                </div>
                <h3 className="text-lg font-bold">{video.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {video.description}
                </p>
                <button className="inline-flex items-center gap-2 text-sm font-medium hover:text-accent transition-colors pt-2">
                  Watch Video <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
