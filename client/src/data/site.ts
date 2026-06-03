export const SITE_URL = "https://akhilneelam.com";
export const SITE_NAME = "Akhil Neelam Portfolio";
export const LAST_UPDATED = "2026-06-03";

export const contact = {
  email: "akhil_neelam@berkeley.edu",
  location: "San Francisco Bay Area",
  linkedIn: "https://linkedin.com/in/akhilneelam",
  github: "https://github.com/akhil-neelam-ai",
  resumePath: "/Akhil_Neelam_Resume.pdf",
  resumeFileName: "Akhil_Neelam_Resume.pdf",
} as const;

export const publicLinks = {
  website: SITE_URL,
  resume: `${SITE_URL}${contact.resumePath}`,
  mcp: `${SITE_URL}/api/mcp`,
  linkedIn: contact.linkedIn,
  github: contact.github,
  cgap: "https://www.cgapsouthasia.org",
  calevents: "https://calevents-discovery.vercel.app/",
  starred: "https://starred.akhilneelam.com",
} as const;
