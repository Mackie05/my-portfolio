"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Brand Growth Campaign",
    category: "Social Strategy / Short Form",
    year: "2025",
    description:
      "Scaled a lifestyle brand from 10K to 500K followers in 90 days through data-driven content systems.",
    slug: "brand-growth-campaign",
  },
  {
    title: "Product Launch Series",
    category: "Creative Direction / Long Form",
    year: "2025",
    description:
      "Led creative direction for a multi-episode product documentary generating 2M+ organic views.",
    slug: "product-launch-series",
  },
  {
    title: "Viral Content System",
    category: "Video Editing / Short Form",
    year: "2024",
    description:
      "Built a repeatable editing framework that produced 12 videos with 1M+ views each.",
    slug: "viral-content-system",
  },
  {
    title: "Rebrand Documentary",
    category: "Creative Direction / Long Form",
    year: "2024",
    description:
      "Directed and edited a 20-minute brand documentary capturing the company's evolution.",
    slug: "rebrand-documentary",
  },
  {
    title: "Influencer Campaign",
    category: "Social Strategy / Short Form",
    year: "2024",
    description:
      "Orchestrated a 20-creator campaign that drove 5M impressions and 200K new followers.",
    slug: "influencer-campaign",
  },
  {
    title: "Tutorial Series",
    category: "Video Editing / Long Form",
    year: "2023",
    description:
      "Produced a 10-part educational series that became the brand's highest-performing content.",
    slug: "tutorial-series",
  },
];

export default function WorkPage() {
  return (
    <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
          All Work
        </p>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
          Selected projects.
        </h1>
      </motion.div>

      <div className="space-y-0">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              href={`/work/${project.slug}/`}
              className="group flex flex-col md:flex-row md:items-center justify-between py-8 border-t border-border hover:bg-muted/30 px-4 -mx-4 rounded-xl transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-sm text-accent font-medium">
                    {project.category}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {project.year}
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold group-hover:text-accent transition-colors">
                  {project.title}
                </h2>
                <p className="text-muted-foreground mt-2 max-w-xl">
                  {project.description}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-accent group-hover:border-accent transition-all">
                  <ArrowUpRight className="h-5 w-5 group-hover:text-white transition-colors" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
