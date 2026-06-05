import { lazy } from "react";

const sectionImports = {
  work: () => import("@/components/work-section").then((m) => ({ default: m.WorkSection })),
  projects: () => import("@/components/projects-section").then((m) => ({ default: m.ProjectsSection })),
  experience: () => import("@/components/experience-section").then((m) => ({ default: m.ExperienceSection })),
  speaking: () => import("@/components/speaking-section").then((m) => ({ default: m.SpeakingSection })),
  personal: () => import("@/components/personal-section").then((m) => ({ default: m.PersonalSection })),
  contact: () => import("@/components/contact-section").then((m) => ({ default: m.ContactSection })),
} as const;

export type LazySectionId = keyof typeof sectionImports;

export const lazySections = {
  work: lazy(sectionImports.work),
  projects: lazy(sectionImports.projects),
  experience: lazy(sectionImports.experience),
  speaking: lazy(sectionImports.speaking),
  personal: lazy(sectionImports.personal),
  contact: lazy(sectionImports.contact),
};

export function preloadSection(id: string): void {
  if (id in sectionImports) {
    void sectionImports[id as LazySectionId]();
  }
}
