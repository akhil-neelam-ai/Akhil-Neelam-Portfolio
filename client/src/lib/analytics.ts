declare global {
  interface Window {
    gtag?: (
      command: "event" | "config" | "js",
      targetId: string | Date,
      params?: Record<string, string | number | boolean>
    ) => void;
  }
}

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, string | number | boolean>
) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventParams);
  }
};

export const analytics = {
  pageView: (pagePath: string) => {
    trackEvent("page_view", { page_path: pagePath });
  },

  downloadResume: () => {
    trackEvent("download", {
      file_name: "resume",
      file_type: "pdf",
    });
  },

  clickExternalLink: (url: string, label?: string) => {
    trackEvent("click", {
      event_category: "external_link",
      event_label: label || url,
      url,
    });
  },

  clickProject: (projectName: string, linkType: "demo" | "github") => {
    trackEvent("click", {
      event_category: "project",
      event_label: `${projectName} - ${linkType}`,
      project_name: projectName,
      link_type: linkType,
    });
  },

  navigateToSection: (sectionName: string) => {
    trackEvent("navigation", {
      event_category: "section",
      event_label: sectionName,
      section: sectionName,
    });
  },

  contactInteraction: (action: string) => {
    trackEvent("contact", {
      event_category: "engagement",
      event_label: action,
      action,
    });
  },

  clickSocial: (platform: string) => {
    trackEvent("click", {
      event_category: "social",
      event_label: platform,
      platform,
    });
  },
};
