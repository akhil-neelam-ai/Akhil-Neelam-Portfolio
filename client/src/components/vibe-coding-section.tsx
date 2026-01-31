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
    briefDescription: "Automated daily tech briefings delivered through Alexa using AI summarization. Processes 150+ newsletters monthly, saving 15 minutes every morning through intelligent content aggregation and natural language processing.",
    techStack: ["n8n", "Claude AI", "Gmail API", "Airtable", "Alexa Skills", "RSS", "REST API", "Workflow Automation"],
    overview: "An end-to-end automation that transforms email newsletter overload into concise audio briefings delivered via Amazon Alexa. The system monitors Gmail for incoming newsletters, uses Claude AI to generate audio-friendly summaries, stores them in a structured database, and serves them through a custom RSS feed that Alexa reads as a Flash Briefing.",
    challenge: "Like many professionals, I subscribed to multiple tech newsletters (TechCrunch, The Verge, NYT Tech, Axios) to stay informed. However, reading 5+ newsletters daily consumed 20+ minutes of my morning routine. Traditional solutions like \"read later\" tags or inbox filters didn't address the core issue: time scarcity during morning routines when information consumption needs to be rapid and hands-free.",
    solution: "I architected a serverless automation workflow that:\n\n1. Monitors Gmail using OAuth2 authentication and custom filters\n2. Extracts and sanitizes HTML content from newsletter emails\n3. Sends cleaned content to Claude 3.5 Haiku for intelligent summarization\n4. Stores summaries in Airtable with metadata (date, source, title)\n5. Generates a dynamic RSS feed with proper XML structure\n6. Serves the feed to Alexa Flash Briefing Skill for voice delivery\n\nThe system processes 150+ newsletters monthly with zero manual intervention, compressing hours of reading into 2-minute audio briefings.",
    demoLink: "https://www.linkedin.com/posts/akhilneelam_techautomation-ai-productivityhack-activity-7416624475321913362-uPJW",
    githubLink: "https://github.com/akhil-neelam-ai/alexa-newsletter-briefing",
  },
  {
    id: 2,
    title: "CalEvents Discovery: AI-Powered Campus Intelligence",
    briefDescription: "A centralized, real-time event discovery engine for UC Berkeley. Leveraging Gemini 2.0 Flash with Google Search grounding to dynamically crawl and standardize disparate departmental calendars into a single interface.",
    techStack: ["React 19", "Tailwind CSS", "Gemini 2.0 Flash", "Google Search Grounding", "JSON Schema", "Natural Language Filtering"],
    overview: "A centralized, real-time event discovery engine designed to navigate the fragmented ecosystem of UC Berkeley’s campus life. By leveraging the Gemini 2.0 Flash model with Google Search grounding, the application dynamically crawls, synthesizes, and standardizes disparate departmental calendars—ranging from Computer Science seminars to Anthropology workshops—into a single, high-performance interface.",
    challenge: "UC Berkeley hosts hundreds of world-class events weekly, but the information is siloed across dozens of departmental subdomains (CDSS, Engineering, CE3, etc.), each using different web formats and scheduling tools. For students and researchers, staying informed meant manually checking 10+ bookmarks daily or relying on word-of-mouth, often resulting in missed opportunities for interdisciplinary collaboration and campus engagement.",
    solution: "I architected a \"vibe-coded\" discovery platform that replaces traditional database scraping with real-time AI reasoning:\n\n1. AI Search Grounding: Integrates Gemini’s search tools to perform live queries across specific high-priority UC Berkeley domains.\n2. Unstructured-to-Structured Pipeline: Transforms chaotic web snippets into a clean, typed JSON schema for a consistent UI experience.\n3. Contextual Filtering: Natural language filter system allowing users to toggle between disciplines or timeframes.\n4. Source Attribution: Automatically extracts and displays grounding metadata with direct links to original pages.\n5. Modern Stack: Built using React 19 and Tailwind CSS with a mobile-responsive \"Berkeley Blue & Gold\" aesthetic.\n\nThe system compresses 20 minutes of manual browsing into a 5-second, AI-curated briefing of everything happening on campus.",
    demoLink: "https://calevents-discovery.vercel.app/",
    githubLink: "https://github.com/akhil-neelam-ai/Cal-Events-Discovery",
  },
  {
    id: 3,
    title: "MirrorMe: AI Virtual Try-On Chrome Extension",
    briefDescription: "A Chrome extension that lets users visualize clothing on themselves before purchasing. Integrates AI virtual try-on technology directly into fashion e-commerce sites like Amazon and Myntra.",
    techStack: ["Chrome Extension API", "Next.js", "Replicate", "NanoBanana AI", "React", "Tailwind CSS"],
    overview: "A Chrome extension that eliminates online shopping uncertainty by letting users visualize how clothing will actually look on them before purchasing. The system detects product images on fashion e-commerce sites like Amazon and Myntra, then uses AI-powered virtual try-on technology to generate realistic visualizations of the user wearing the selected items.",
    challenge: "Online clothing shopping has a fundamental problem: you can't try things on. This leads to high return rates, wasted time, and hesitant purchases. Shoppers often buy multiple sizes \"just in case\" or abandon carts entirely due to uncertainty about fit and appearance. Existing solutions required leaving the shopping site or uploading photos to separate applications, breaking the natural shopping flow.",
    solution: "I built a lightweight Chrome extension paired with a Next.js web application that:\n\n1. Detects product images on supported fashion retail sites using site-specific selectors with intelligent fallbacks\n2. Opens a clean interface at mirror-me.app without disrupting the shopping experience\n3. Processes user photos through Replicate's NanoBanana AI model for realistic clothing visualization\n4. Returns try-on results in seconds, letting shoppers see themselves in the item before buying\n\nThe architecture separates the extension from the AI processing to avoid Content Security Policy restrictions, resulting in a seamless experience that integrates naturally into existing shopping workflows.",
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
            Vibe Coding Projects
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
