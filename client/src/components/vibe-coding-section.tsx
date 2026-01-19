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
    title: "AI-Powered Newsletter Briefing via Alexa",
    briefDescription: "Automated daily tech briefings delivered through Alexa using AI summarization. Processes 150+ newsletters monthly, saving 15 minutes every morning through intelligent content aggregation and natural language processing.",
    techStack: ["n8n", "Claude AI", "Gmail API", "Airtable", "Alexa Skills", "RSS", "REST API", "Workflow Automation"],
    overview: "An end-to-end automation that transforms email newsletter overload into concise audio briefings delivered via Amazon Alexa. The system monitors Gmail for incoming newsletters, uses Claude AI to generate audio-friendly summaries, stores them in a structured database, and serves them through a custom RSS feed that Alexa reads as a Flash Briefing.",
    challenge: "Like many professionals, I subscribed to multiple tech newsletters (TechCrunch, The Verge, NYT Tech, Axios) to stay informed. However, reading 5+ newsletters daily consumed 20+ minutes of my morning routine. Traditional solutions like \"read later\" tags or inbox filters didn't address the core issue: time scarcity during morning routines when information consumption needs to be rapid and hands-free.",
    solution: "I architected a serverless automation workflow that:\n\n1. Monitors Gmail using OAuth2 authentication and custom filters\n2. Extracts and sanitizes HTML content from newsletter emails\n3. Sends cleaned content to Claude 3.5 Haiku for intelligent summarization\n4. Stores summaries in Airtable with metadata (date, source, title)\n5. Generates a dynamic RSS feed with proper XML structure\n6. Serves the feed to Alexa Flash Briefing Skill for voice delivery\n\nThe system processes 150+ newsletters monthly with zero manual intervention, compressing hours of reading into 2-minute audio briefings.",
    demoLink: "https://www.linkedin.com/posts/akhilneelam_techautomation-ai-productivityhack-activity-7416624475321913362-uPJW",
    githubLink: "https://github.com/akhil-neelam-ai/alexa-newsletter-briefing",
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
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-highlight/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-highlight" />
            </div>
            <DialogTitle className="font-serif text-xl md:text-2xl">{project.title}</DialogTitle>
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

          <div className="flex flex-wrap gap-3 pt-4 border-t border-border">
            {project.demoLink && (
              <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                <Button variant="default" className="gap-2" data-testid="button-project-demo">
                  <ExternalLink className="w-4 h-4" />
                  View Demo
                </Button>
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-2" data-testid="button-project-github">
                  <Github className="w-4 h-4" />
                  Step-by-Step Guide
                </Button>
              </a>
            )}
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
            Side projects built with AI-powered tools—solving real problems while having fun with emerging tech.
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
