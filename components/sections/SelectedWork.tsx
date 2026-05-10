"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const projects = [
  {
    title: "Brand Growth Campaign",
    category: "Social Strategy / Short Form",
    description:
      "Scaled a lifestyle brand from 10K to 500K followers in 90 days through data-driven content systems.",
    slug: "brand-growth-campaign",
  },
  {
    title: "Product Launch Series",
    category: "Creative Direction / Long Form",
    description:
      "Led creative direction for a multi-episode product documentary generating 2M+ organic views.",
    slug: "product-launch-series",
  },
  {
    title: "Viral Content System",
    category: "Video Editing / Short Form",
    description:
      "Built a repeatable editing framework that produced 12 videos with 1M+ views each.",
    slug: "viral-content-system",
  },
  {
    title: "Rebrand Documentary",
    category: "Creative Direction / Long Form",
    description:
      "Directed and edited a 20-minute brand documentary capturing the company's evolution.",
    slug: "rebrand-documentary",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function SelectedWork() {
  return (
    <section id="work" className="py-32 px-6 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-4">
          Selected Work
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Projects that moved the needle.
        </h2>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {projects.map((project) => (
          <motion.article
            key={project.slug}
            variants={item}
            className="group relative"
          >
            <Link href={`/work/${project.slug}/`} className="block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted mb-6">
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent z-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm text-muted-foreground">[Project Image]</span>
                </div>
                <div className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-background/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-accent font-medium">{project.category}</p>
                <h3 className="text-2xl font-bold group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            </Link>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
