import { notFound } from "next/navigation";
import { ProjectContent } from "./ProjectContent";

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
export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(projectData).map((slug) => ({
    slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projectData[slug];

  if (!project) {
    notFound();
  }

  return <ProjectContent project={project} />;
}