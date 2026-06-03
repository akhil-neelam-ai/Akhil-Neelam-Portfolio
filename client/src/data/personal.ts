import type { LucideIcon } from "lucide-react";
import { Code, Plane } from "lucide-react";

export type PersonalInterest = {
  icon: LucideIcon;
  title: string;
  description: string;
  linkToProjects?: boolean;
};

export const interests: PersonalInterest[] = [
  {
    icon: Plane,
    title: "Travel & Culture",
    description:
      "Backpacked across 14 countries and 20 Indian states, experiencing diverse cultures and perspectives.",
  },
  {
    icon: Code,
    title: "Side Projects",
    description:
      "Building apps with Claude Code, Replit, and other AI-powered tools—whether it's boosting personal productivity or just having fun with side projects.",
    linkToProjects: true,
  },
];
