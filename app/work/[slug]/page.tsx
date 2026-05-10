import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const projectData: Record<string, {
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  description: string;
  challenge: string;
  solution: string;
  results: string[];
}> = {
  "brand-growth-campaign": {
    title: "Brand Growth Campaign",
    category: "Social Strategy / Short Form",
    year: "2025",
    client: "Lifestyle Brand",
    role: "Creative Director & Video Editor",
    description: "A comprehensive content strategy that transformed a niche lifestyle brand into a mainstream social media presence.",
    challenge: "The brand had strong products but zero social presence. Their content was inconsistent, visually flat, and failed to capture attention in the first 3 seconds.",
    solution: "I developed a content system built on three pillars: high-impact hooks, consistent visual identity, and data-driven iteration. We produced 90 videos in 90 days, each optimized for retention and shareability.",
    results: [
      "500K+ followers gained in 90 days",
      "12 videos surpassed 1M views",
      "4.2% average engagement rate (industry avg: 1.5%)",
      "25% increase in website traffic from social",
    ],
  },
  "product-launch-series": {
    title: "Product Launch Series",
    category: "Creative Direction / Long Form",
    year: "2025",
    client: "Tech Startup",
    role: "Creative Director",
    description: "A multi-episode documentary series launching a flagship product to a global audience.",
    challenge: "The product was complex and technical. The marketing team needed content that educated without boring, and inspired without overselling.",
    solution: "I directed a 5-episode series blending founder interviews, behind-the-scenes footage, and cinematic product shots. Each episode was structured like a mini-documentary with a clear narrative arc.",
    results: [
      "2.1M organic views across all episodes",
      "35% completion rate on 8-minute videos",
      "Featured in Product Hunt top 10",
      "$500K in pre-orders attributed to the series",
    ],
  },
  "viral-content-system": {
    title: "Viral Content System",
    category: "Video Editing / Short Form",
    year: "2024",
    client: "E-commerce Brand",
    role: "Lead Video Editor",
    description: "A repeatable editing framework that turned sporadic viral hits into a predictable content machine.",
    challenge: "The brand had one viral video but could not replicate the success. Their editing was inconsistent and their hooks were not optimized for the algorithm.",
    solution: "I built a modular editing system with templated hooks, pacing guides, and sound design libraries. The team could now produce algorithm-optimized content at 3x the previous speed.",
    results: [
      "12 videos with 1M+ views each",
      "3x increase in content output",
      "60% improvement in average watch time",
      "System adopted by 3 other brands",
    ],
  },
  "rebrand-documentary": {
    title: "Rebrand Documentary",
    category: "Creative Direction / Long Form",
    year: "2024",
    client: "Heritage Brand",
    role: "Director & Editor",
    description: "A 20-minute brand documentary capturing the company evolution from startup to industry leader.",
    challenge: "The rebrand needed to feel authentic, not corporate. The story had to honor the past while positioning the brand for the future.",
    solution: "I spent 3 weeks embedded with the team, capturing candid moments and intimate interviews. The edit balanced emotional storytelling with strategic messaging.",
    results: [
      "850K views in first month",
      "95% positive sentiment in comments",
      "Used as onboarding content for new hires",
      "Won internal Content of the Year award",
    ],
  },
  "influencer-campaign": {
    title: "Influencer Campaign",
    category: "Social Strategy / Short Form",
    year: "2024",
    client: "Beauty Brand",
    role: "Creative Director",
    description: "A 20-creator campaign designed to launch a new product line through authentic storytelling.",
    challenge: "The brand needed to reach a new demographic without feeling inauthentic. Traditional ads were not converting.",
    solution: "I curated creators whose values aligned with the brand, then provided them with creative briefs that allowed for personal expression while maintaining brand consistency.",
    results: [
      "5M impressions across all platforms",
      "200K new followers",
      "18% conversion rate on campaign landing page",
      "3x ROI on influencer spend",
    ],
  },
  "tutorial-series": {
    title: "Tutorial Series",
    category: "Video Editing / Long Form",
    year: "2023",
    client: "SaaS Company",
    role: "Video Editor & Motion Designer",
    description: "A 10-part educational series that became the brand highest-performing organic content.",
    challenge: "The product was powerful but complex. Users were churning because they could not unlock its full potential.",
    solution: "I produced a cinematic tutorial series that treated education like entertainment. Motion graphics, dynamic pacing, and real-world examples made complex features feel accessible.",
    results: [
      "Highest-performing organic content in brand history",
      "40% reduction in support tickets",
      "22% increase in feature adoption",
      "Series repurposed into 50+ short-form clips",
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(projectData).map((slug) => ({
    slug,
  }));
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const project = projectData[slug];

  if (!project) {
    return (
      <div className="pt-32 pb-32 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Project not found</h1>
        <Link href="/work/" className="text-accent hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to all work
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Link href="/work/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-12">
          <ArrowLeft className="h-4 w-4" />
          All Work
        </Link>

        <div className="space-y-2 mb-8">
          <div className="flex items-center gap-4">
            <span className="text-sm text-accent font-medium">{project.category}</span>
            <span className="text-sm text-muted-foreground">{project.year}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
        </div>

        <div className="aspect-video rounded-2xl bg-muted mb-12 flex items-center justify-center">
          <span className="text-sm text-muted-foreground">[Project Hero Image / Video]</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-12 border-b border-border">
          <div><p className="text-sm text-muted-foreground mb-1">Client</p><p className="font-medium">{project.client}</p></div>
          <div><p className="text-sm text-muted-foreground mb-1">Role</p><p className="font-medium">{project.role}</p></div>
          <div><p className="text-sm text-muted-foreground mb-1">Year</p><p className="font-medium">{project.year}</p></div>
        </div>

        <div className="space-y-12">
          <div><h2 className="text-2xl font-bold mb-4">Overview</h2><p className="text-muted-foreground leading-relaxed text-lg">{project.description}</p></div>
          <div><h2 className="text-2xl font-bold mb-4">The Challenge</h2><p className="text-muted-foreground leading-relaxed">{project.challenge}</p></div>
          <div><h2 className="text-2xl font-bold mb-4">The Solution</h2><p className="text-muted-foreground leading-relaxed">{project.solution}</p></div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <ul className="space-y-3">
              {project.results.map((result, i) => (
                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  {result}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-12 border-t border-border">
          <Link href="/work/" className="inline-flex items-center gap-2 text-accent hover:underline">
            <ArrowLeft className="h-4 w-4" />
            View all projects
          </Link>
        </div>
      </motion.div>
    </div>
  );
}