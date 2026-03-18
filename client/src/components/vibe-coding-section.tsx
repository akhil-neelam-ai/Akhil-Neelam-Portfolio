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
    briefDescription: "I wasted way too much time each morning reading newsletters. Built an Alexa skill that summarizes them into quick 2-minute audio briefings you can listen to hands-free.",
    techStack: ["n8n", "Claude AI", "Gmail API", "Airtable", "Alexa Skills", "RSS", "REST API", "Workflow Automation"],
    overview: "I mapped my own morning routine and realized the real problem. It wasn't that I had too many newsletters. It was that reading them was the wrong format for a busy morning. Audio, though—that's perfect for getting ready. So instead of building another summarizer, I designed the whole system around voice: summaries sound natural when spoken, they're structured for listening while you move around, and they come through an Alexa speaker already sitting on your kitchen counter.",
    challenge: "I subscribed to 5+ daily newsletters to stay on top of tech news. But here's the thing: the problem wasn't the number of newsletters. It was that mornings are hands-free time. I'm in the kitchen, getting ready, not sitting at a desk. \"Read later\" folders and email filters don't help because they still assume you'll sit down later and actually read. I needed something that worked while I was moving.",
    solution: "I designed the system around one principle: zero daily interaction required. Once configured, the entire pipeline runs autonomously:\n\n1. Gmail Monitoring: OAuth2-authenticated filters catch newsletters as they arrive\n2. Content Extraction: HTML is sanitized and stripped to core content\n3. AI Summarization: Claude 3.5 Haiku generates audio-optimized summaries (conversational tone, no jargon, under 30 seconds each)\n4. Structured Storage: Airtable serves as both database and audit trail for debugging\n5. RSS Generation: A dynamic feed with proper XML structure acts as the integration layer\n6. Voice Delivery: Alexa Flash Briefing Skill reads the feed each morning\n\nThe key product decision was choosing Alexa Flash Briefing over a custom app—it eliminated adoption friction entirely since the habit of asking Alexa for a morning briefing already existed.",
    demoLink: "https://www.linkedin.com/posts/akhilneelam_techautomation-ai-productivityhack-activity-7416624475321913362-uPJW",
    githubLink: "https://github.com/akhil-neelam-ai/alexa-newsletter-briefing",
  },
  {
    id: 2,
    title: "CalEvents Discovery: AI-Powered Campus Intelligence",
    briefDescription: "Berkeley's best events are scattered across 30+ websites. Built an AI search tool that finds them instantly, solving the frustration of endless manual hunting.",
    techStack: ["React 19", "Tailwind CSS", "Gemini 2.0 Flash", "Google Search Grounding", "JSON Schema", "Natural Language Filtering"],
    overview: "I asked classmates about event discovery and realized the real problem. Berkeley has tons of events. The issue is that they're all on different websites. Nobody checks 10 departmental sites daily. Instead of building a fragile scraper that breaks every time someone redesigns their website, I made a different bet: use AI to search the web in real-time. The web becomes the database. When a department changes their site, nothing breaks on my end. It all stays fresh.",
    challenge: "Berkeley has hundreds of events every week spread across dozens of department websites. Each one looks different, uses different calendar tools, updates on different schedules. Students end up checking 10+ bookmarks daily, or worse, they miss things entirely and just rely on who mentions it in conversation. The real problem? That's not just lost time. It's lost opportunities. An ML student misses a behavioral economics talk that could have inspired their next research idea. A grad student skips a networking event that could have changed their career.",
    solution: "I designed the platform around a key insight: scraping is fragile, but search is resilient. Instead of maintaining brittle parsers for each department site, I used Gemini 2.0 Flash with Google Search grounding to query live data on demand:\n\n1. Real-Time AI Queries: Gemini searches specific UC Berkeley domains and synthesizes results—no stored data to go stale\n2. Unstructured → Structured Pipeline: Raw web snippets are transformed into a typed JSON schema, giving the UI consistent data regardless of source format\n3. Natural Language Filtering: Users filter by discipline or timeframe conversationally, lowering the interaction cost\n4. Source Attribution: Every result links back to the original page, building trust and driving traffic to departments\n\nThe core product decision was choosing real-time AI search over a traditional database. It trades query speed for zero maintenance and always-fresh data—the right tradeoff for a campus where event pages change weekly.",
    demoLink: "https://calevents-discovery.vercel.app/",
    githubLink: "https://github.com/akhil-neelam-ai/Cal-Events-Discovery",
  },
  {
    id: 3,
    title: "MirrorMe: AI Virtual Try-On Chrome Extension",
    briefDescription: "Buying clothes online is risky without trying them on first. Built a Chrome extension that shows how clothes look on you right on the product page, eliminating that friction.",
    techStack: ["Chrome Extension API", "Next.js", "Replicate", "NanoBanana AI", "React", "Tailwind CSS"],
    overview: "The key insight wasn't about building better AI. Virtual try-on exists already. The problem is friction. All existing tools require you to leave the site, upload a photo to some random app, and hunt for the same product again. That's too much. So I flipped the approach: put the try-on right on the product page itself. No leaving, no uploading photos elsewhere, no friction. The experience meets you exactly where you're making the buying decision.",
    challenge: "Online clothing shopping has a fundamental conversion problem: uncertainty about fit and appearance drives cart abandonment and costly returns. Shoppers buy multiple sizes \"just in case\" or skip the purchase entirely. Existing virtual try-on solutions require leaving the shopping site or uploading photos to separate applications—adding friction at the exact moment when reducing it matters most. The opportunity was clear: bring the try-on experience to the shopper, not the other way around.",
    solution: "I made two key architectural decisions that shaped the product:\n\n1. Extension-First Distribution: A Chrome extension meets users on the sites they already shop on (Amazon, Myntra)—zero behavior change required\n2. Separated Processing: The extension handles detection and UI, while a Next.js app at mirror-me.app handles AI processing. This avoids Content Security Policy restrictions and keeps the extension lightweight\n\nThe flow is designed for minimal steps:\n1. Extension detects product images using site-specific selectors with intelligent fallbacks\n2. User clicks to try on → clean interface opens with the product pre-loaded\n3. Replicate's NanoBanana AI model generates the visualization\n4. Result returns in seconds, right alongside the buy button\n\nThe guiding principle was reducing steps-to-value. Every design decision optimized for keeping the shopper in their purchasing mindset rather than pulling them into a separate \"tool\" experience.",
    demoLink: "https://www.linkedin.com/posts/akhilneelam_ai-sideproject-buildinpublic-activity-7419082563580739584-coS3?utm_source=share&utm_medium=member_desktop&rcm=ACoAABBO9jYBzpbFmyeJuaql55xs2TnXfE7QS58",
  },
  {
    id: 4,
    title: "starred: Google Takeout Data Visualization",
    briefDescription: "Exported 1,248 starred places from Google Maps and turned them into a WebGL constellation map. 16 countries, 21 Indian states, 35 airports — all rendered as an interactive 3D point cloud.",
    techStack: ["React 19", "Three.js", "TypeScript", "WebGL", "Google Takeout", "Vite"],
    overview: "I had 1,248 starred places on Google Maps across 16 countries. That data was just sitting in Google's servers. I exported it via Google Takeout, cleaned it (removed medical facilities, banks, and daily-life places for privacy), and mapped every coordinate onto a 3D globe as a WebGL point cloud. The result is an interactive constellation map where each dot is a place I've been — color-coded by country, connected by constellation lines, explorable by search, category, and click-to-fly camera animation.",
    challenge: "Google Maps starred places are invisible data. You can see them on your own map, but there's no way to visualize the full picture — the geographic spread, the density of travel, or the patterns. I wanted to answer: what does a life of travel look like as data? And how do you display personal location data publicly without compromising privacy?",
    solution: "I built the entire pipeline from raw data to interactive visualization:\n\n1. Data Extraction: Google Takeout exports starred places as GeoJSON with coordinates, names, and addresses\n2. Privacy Cleaning: A TypeScript script strips medical, financial, and personal service locations. Coordinates are kept but sensitive places are removed. Berkeley residential stars were cleaned to only show public landmarks\n3. Geographic Mapping: Real lat/lng coordinates are mapped to spherical positions on a Three.js globe using trigonometric projection\n4. Terminal Aesthetic: Boot sequence, scanline overlay, HUD, monospace typography — the UI tells the story of 'raw data → curated journey'\n5. Interaction Design: Bidirectional hover (panel ↔ globe), click-to-fly camera animation, drag-to-rotate, pinch-to-zoom, keyboard navigation, and URL deep linking\n6. Performance: Three.js is code-split and lazy-loaded (65KB initial bundle). Raycaster throttled to mouse-move-only. Particle highlights update only 2 dots instead of all 781.\n\nThe manifesto label says it all: SELECT * FROM places WHERE forgotten = false",
    demoLink: "https://starred.akhilneelam.com",
    githubLink: "https://github.com/akhil-neelam-ai/my-world-in-stars",
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
            Side Projects
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
