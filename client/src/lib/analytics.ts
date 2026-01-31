// Google Analytics event tracking utilities

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

// Predefined event tracking functions
export const analytics = {
  // Track page views
  pageView: (pagePath: string) => {
    trackEvent('page_view', {
      page_path: pagePath,
    });
  },

  // Track resume downloads
  downloadResume: () => {
    trackEvent('download', {
      file_name: 'resume',
      file_type: 'pdf',
    });
  },

  // Track external link clicks
  clickExternalLink: (url: string, label?: string) => {
    trackEvent('click', {
      event_category: 'external_link',
      event_label: label || url,
      url: url,
    });
  },

  // Track project link clicks
  clickProject: (projectName: string, linkType: 'demo' | 'github') => {
    trackEvent('click', {
      event_category: 'project',
      event_label: `${projectName} - ${linkType}`,
      project_name: projectName,
      link_type: linkType,
    });
  },

  // Track section navigation
  navigateToSection: (sectionName: string) => {
    trackEvent('navigation', {
      event_category: 'section',
      event_label: sectionName,
      section: sectionName,
    });
  },

  // Track contact form interactions
  contactInteraction: (action: string) => {
    trackEvent('contact', {
      event_category: 'engagement',
      event_label: action,
      action: action,
    });
  },

  // Track social media clicks
  clickSocial: (platform: string) => {
    trackEvent('click', {
      event_category: 'social',
      event_label: platform,
      platform: platform,
    });
  },
};
