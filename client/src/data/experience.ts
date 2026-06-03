export type Experience = {
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
};

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Uniblox",
    role: "Pre-MBA Product Management",
    period: "Apr 2025 - Jun 2025",
    location: "Seattle, WA (Remote)",
    description:
      "InsurTech startup building an AI powered platform to automate group insurance enrollment and underwriting.",
  },
  {
    id: 2,
    company: "Centre for Gender And Politics (CGAP)",
    role: "Co-founder & Director",
    period: "Jul 2021 - Mar 2025",
    location: "India",
    description:
      "Co-founded South Asia's first-ever think tank exclusively focused on gender inclusion in politics, growing to 140+ members across 14 countries.",
  },
  {
    id: 3,
    company: "Central Square Foundation",
    role: "Project Manager",
    period: "Nov 2019 - Jun 2021",
    location: "India",
    description:
      "Product customization for a WhatsApp learning bot during COVID-19, maintaining continuity for 3M students",
  },
  {
    id: 4,
    company: "Government of Andhra Pradesh",
    role: "Consultant, Project Management Unit",
    period: "Sep 2017 - Oct 2019",
    location: "India",
    description:
      "Predictive ML based school dropout prediction and retention; Product Customisation and Rollout of AI based EdTech products across public schools",
  },
];
