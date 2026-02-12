import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink, Github, Code, Sparkles } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface Project {
  id: number;
  title: string;
  briefDescription: string;
  techStack: string[];
  overview: string;
  challenge: string;
  solution: string;
  demoLink?: string;
  githubLink?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Daily Newsletter Briefing via Alexa",
    briefDescription: "I noticed my mornings were bleeding 20+ minutes into newsletter reading—time I couldn't afford as a grad student. I built a hands-free system that turns 150+ newsletters/month into 2-minute Alexa audio briefings, reclaiming that time entirely.",
    techStack: ["n8n", "Claude AI", "Gmail API", "Airtable", "Alexa Skills", "RSS", "REST API", "Workflow Automation"],
    overview: "I started by mapping the user journey of my own morning routine and identified a key insight: the problem wasn't too many newsletters—it was that reading is the wrong modality for time-constrained mornings. Audio is. So rather than building another \"summarize my inbox\" tool, I designed a pipeline specifically optimized for voice delivery: summaries are written in spoken-language cadence, structured for linear listening, and delivered through a device already in the room (Alexa).",
    challenge: "Like many professionals, I subscribed to 5+ daily newsletters (TechCrunch, The Verge, NYT Tech, Axios) to stay informed. But the core issue wasn't volume—it was context mismatch. Mornings demand hands-free, rapid consumption. \"Read later\" tags and inbox filters don't solve this because they still assume the user will sit down and read. I needed a solution that met me where I already was: in the kitchen, getting ready.",
    solution: "I designed the system around one principle: zero daily interaction required. Once configured, the entire pipeline runs autonomously:\n\n1. Gmail Monitoring: OAuth2-authenticated filters catch newsletters as they arrive\n2. Content Extraction: HTML is sanitized and stripped to core content\n3. AI Summarization: Claude 3.5 Haiku generates audio-optimized summaries (conversational tone, no jargon, under 30 seconds each)\n4. Structured Storage: Airtable serves as both database and audit trail for debugging\n5. RSS Generation: A dynamic feed with proper XML structure acts as the integration layer\n6. Voice Delivery: Alexa Flash Briefing Skill reads the feed each morning\n\nThe key product decision was choosing Alexa Flash Briefing over a custom app—it eliminated adoption friction entirely since the habit of asking Alexa for a morning briefing already existed.",
    demoLink: "https://www.linkedin.com/posts/akhilneelam_techautomation-ai-productivityhack-activity-7416624475321913362-uPJW",
    githubLink: "https://github.com/akhil-neelam-ai/alexa-newsletter-briefing",
  },
  {
    id: 2,
    title: "CalEvents Discovery: AI-Powered Campus Intelligence",
    briefDescription: "UC Berkeley has world-class events every week, but discovery is broken—siloed across 30+ departmental websites with no central hub. I built an AI-powered aggregator that replaces 20 minutes of manual browsing with a single, real-time search.",
    techStack: ["React 19", "Tailwind CSS", "Gemini 2.0 Flash", "Google Search Grounding", "JSON Schema", "Natural Language Filtering"],
    overview: "After talking to classmates, I found that the problem wasn't a lack of events—it was a discovery gap. Students routinely missed cross-departmental talks and workshops because no one checks 10 different websites daily. Instead of building a traditional scraper (which would break every time a department redesigned their page), I made a deliberate architectural bet: use AI search grounding to query sites in real-time, treating the web itself as the database. This made the system resilient to upstream changes without any maintenance.",
    challenge: "UC Berkeley hosts hundreds of events weekly across dozens of departmental subdomains (CDSS, Engineering, CE3, etc.), each with different web formats, calendaring tools, and update cadences. For students and researchers, staying informed meant manually checking 10+ bookmarks daily or relying on word-of-mouth. The real cost wasn't just time—it was missed serendipity. An ML student never discovers the behavioral economics talk that would have sparked their next research idea.",
    solution: "I designed the platform around a key insight: scraping is fragile, but search is resilient. Instead of maintaining brittle parsers for each department site, I used Gemini 2.0 Flash with Google Search grounding to query live data on demand:\n\n1. Real-Time AI Queries: Gemini searches specific UC Berkeley domains and synthesizes results—no stored data to go stale\n2. Unstructured → Structured Pipeline: Raw web snippets are transformed into a typed JSON schema, giving the UI consistent data regardless of source format\n3. Natural Language Filtering: Users filter by discipline or timeframe conversationally, lowering the interaction cost\n4. Source Attribution: Every result links back to the original page, building trust and driving traffic to departments\n\nThe core product decision was choosing real-time AI search over a traditional database. It trades query speed for zero maintenance and always-fresh data—the right tradeoff for a campus where event pages change weekly.",
    demoLink: "https://calevents-discovery.vercel.app/",
    githubLink: "https://github.com/akhil-neelam-ai/Cal-Events-Discovery",
  },
  {
    id: 3,
    title: "MirrorMe: AI Virtual Try-On Chrome Extension",
    briefDescription: "Online shoppers can't try clothes on—leading to hesitant purchases and high return rates. I built a Chrome extension that brings virtual try-on directly into the shopping flow on Amazon and Myntra, eliminating the need to leave the page.",
    techStack: ["Chrome Extension API", "Next.js", "Replicate", "NanoBanana AI", "React", "Tailwind CSS"],
    overview: "The critical product insight was about distribution, not technology. Virtual try-on tools already exist—but they all require the shopper to leave their current site, upload a photo to a separate app, and manually find the product. That's too much friction. By packaging it as a Chrome extension that activates on the retailer's own product page, I embedded the experience exactly where the purchase decision happens. The best feature is the one users don't have to go looking for.",
    challenge: "Online clothing shopping has a fundamental conversion problem: uncertainty about fit and appearance drives cart abandonment and costly returns. Shoppers buy multiple sizes \"just in case\" or skip the purchase entirely. Existing virtual try-on solutions require leaving the shopping site or uploading photos to separate applications—adding friction at the exact moment when reducing it matters most. The opportunity was clear: bring the try-on experience to the shopper, not the other way around.",
    solution: "I made two key architectural decisions that shaped the product:\n\n1. Extension-First Distribution: A Chrome extension meets users on the sites they already shop on (Amazon, Myntra)—zero behavior change required\n2. Separated Processing: The extension handles detection and UI, while a Next.js app at mirror-me.app handles AI processing. This avoids Content Security Policy restrictions and keeps the extension lightweight\n\nThe flow is designed for minimal steps:\n1. Extension detects product images using site-specific selectors with intelligent fallbacks\n2. User clicks to try on → clean interface opens with the product pre-loaded\n3. Replicate's NanoBanana AI model generates the visualization\n4. Result returns in seconds, right alongside the buy button\n\nThe guiding principle was reducing steps-to-value. Every design decision optimized for keeping the shopper in their purchasing mindset rather than pulling them into a separate \"tool\" experience.",
    demoLink: "https://www.linkedin.com/posts/akhilneelam_ai-sideproject-buildinpublic-activity-7419082563580739584-coS3?utm_source=share&utm_medium=member_desktop&rcm=ACoAABBO9jYBzpbFmyeJuaql55xs2TnXfE7QS58",
  },
];

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card 
        className="h-full cursor-pointer hover-elevate transition-all duration-300 group"
        onClick={onClick}
        data-testid={`card-project-${project.id}`}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-highlight/20 flex items-center justify-center flex-shrink-0">
              <Code className="w-6 h-6 text-highlight" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-1" data-testid={`text-project-title-${project.id}`}>
                {project.title}
              </h3>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm leading-relaxed mb-4" data-testid={`text-project-description-${project.id}`}>
            {project.briefDescription}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 4).map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{project.techStack.length - 4} more
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProjectModal({ project, open, onClose }: { project: Project | null; open: boolean; onClose: () => void }) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-highlight/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-highlight" />
            </div>
            <DialogTitle className="font-serif text-xl md:text-2xl text-left">{project.title}</DialogTitle>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.clickProject(project.title, 'demo')}
              >
                <Button size="sm" variant="default" className="gap-1.5 h-8" data-testid="button-project-demo-top">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Watch it live
                </Button>
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.clickProject(project.title, 'github')}
              >
                <Button size="sm" variant="outline" className="gap-1.5 h-8" data-testid="button-project-github-top">
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </Button>
              </a>
            )}
          </div>
          <DialogDescription className="sr-only">
            Details about {project.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">Project Overview</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {project.overview}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">The Challenge</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">The Solution</h4>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {project.solution}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}

export function VibeCodingSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Side Projects <span className="text-muted-foreground text-2xl md:text-3xl font-normal">[vibecoded with AI Coding agents]</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Scrappy AI prototypes built to test ideas quickly, learn faster, and ship useful tools
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>

        <ProjectModal
          project={selectedProject}
          open={modalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
}
