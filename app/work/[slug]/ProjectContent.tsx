"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface Project {
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
}

export function ProjectContent({ project }: { project: Project }) {
  return (
    <div className="pt-32 pb-32 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          href="/work/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12"
        >
          <ArrowLeft className="h-4 w-4" />
          All Work
        </Link>

        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-4">
            <span className="text-sm text-accent font-medium">
              {project.category}
            </span>
            <span className="text-sm text-muted-foreground">
              {project.year}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {project.title}
          </h1>
        </div>

        <div className="aspect-video rounded-2xl bg-muted mb-12 flex items-center justify-center">
          <span className="text-sm text-muted-foreground">[Project Hero Image / Video]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-border">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Client</p>
            <p className="font-medium">{project.client}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Role</p>
            <p className="font-medium">{project.role}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Year</p>
            <p className="font-medium">{project.year}</p>
          </div>
        </div>

        <div className="space-y-12">
          <div>
            <h2 className="text-2xl font-bold mb-4">Overview</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {project.description}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">The Challenge</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">The Solution</h2>
            <p className="text-muted-foreground leading-relaxed">
              {project.solution}
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <ul className="space-y-3">
              {project.results.map((result, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  {result}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-border">
          <Link
            href="/work/"
            className="inline-flex items-center gap-2 text-accent hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            View all projects
          </Link>
        </div>
      </motion.div>
    </div>
  );
}