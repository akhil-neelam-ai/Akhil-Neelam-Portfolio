import type { LucideIcon } from "lucide-react";
import { Award, BookOpen, Globe, Mic } from "lucide-react";

export type SpeakingHighlight = {
  id: number;
  title: string;
  type: string;
  description: string;
  icon: LucideIcon;
  link: string | null;
};

export const speakingHighlights: SpeakingHighlight[] = [
  {
    id: 1,
    title: "UN Women Asia-Pacific AI School",
    type: "Steering Committee/ Advisor",
    description:
      "Co-designed and facilitated training on AI for social impact for young professionals and policy leaders in APAC",
    icon: Award,
    link: "https://asiapacific.unwomen.org/sites/default/files/2025-12/ap-20250432996-ai-school-grad-booklet-s.pdf",
  },
  {
    id: 2,
    title: "UN Consultations on Women's Leadership",
    type: "Policy Influence",
    description: "Research and awareness projects influencing 5+ UN consultations",
    icon: Globe,
    link: null,
  },
  {
    id: 3,
    title: "G20 & Global Forums",
    type: "Keynote Speaking",
    description: "Spoke at G20, UN platforms and 15+ global platforms",
    icon: Mic,
    link: null,
  },
  {
    id: 4,
    title: "Custom GPT for UN Convening",
    type: "AI",
    description:
      "Custom trained an AI chatbot for APAC governments and civil society leaders with UN's context",
    icon: BookOpen,
    link: "https://asiapacific.unwomen.org/en/stories/feature-story/2025/01/young-leaders-and-un-women-asia-and-the-pacific",
  },
];

export const publications = [
  {
    title: "Worth Asking: Interviews with Women MPs and Ministers in South Asia (Book)",
    link: "https://www.cgapsouthasia.org/worth-asking-book",
  },
  {
    title:
      "Harini Amarasuriya: An Academician Rises to Sri Lanka's Premiership - The Diplomat",
    link: "https://thediplomat.com/2024/09/harini-amarasuriya-an-academician-rises-to-sri-lankas-premiership/",
  },
  {
    title:
      "Safeguarding digital spaces in Indian/South Asian politics - United Nations",
    link: "https://asiapacific.unwomen.org/en/stories/feature-story/2024/10/beijing30-youth-blog-safeguarding-digital-spaces-in-indiansouth-asian-politics",
  },
] as const;

/** Slug matches output from scripts/optimize-images.mjs */
export type GalleryImage = {
  slug: string;
  alt: string;
  caption: string;
};

export const galleryImages: GalleryImage[] = [
  {
    slug: "jp-morgan-hyderabad",
    alt: "Akhil Neelam speaking at J.P. Morgan office in Hyderabad",
    caption: "At J.P. Morgan, Hyderabad",
  },
  {
    slug: "leadership-conclave-2023",
    alt: "Akhil Neelam as panelist at a Leadership Conclave in 2023",
    caption: "Leadership Conclave · 2023",
  },
  {
    slug: "featured-china-2025",
    alt: "Akhil Neelam's work featured at an event in China, 2025",
    caption: "Featured in China · 2025",
  },
  {
    slug: "book-president-iceland",
    alt: "Akhil Neelam presenting his book to the President of Iceland",
    caption: "Presenting My Book to the President of Iceland",
  },
  {
    slug: "project-chinese-2025",
    alt: "Akhil Neelam's project featured in Chinese at an international event, 2025",
    caption: "Project Featured in Chinese · 2025",
  },
  {
    slug: "talk-reykjavik-2023",
    alt: "Akhil Neelam giving a talk in Reykjavík, Iceland in 2023",
    caption: "Talk · Reykjavík, Iceland · 2023",
  },
  {
    slug: "changemaker-award-2024",
    alt: "Akhil Neelam receiving the ChangeMaker Award in 2024",
    caption: "Receiving ChangeMaker Award · 2024",
  },
  {
    slug: "building-with-claude-2026",
    alt: "Akhil Neelam presenting on building with Claude AI in San Francisco, 2026",
    caption: "Building with Claude · San Francisco · 2026",
  },
];

export const linkedInGrowthNote =
  "Built thought-leadership presence from 1K to 16K followers, leveraging content strategy to engage global experts and recruit 140+ volunteers across 14 countries.";
