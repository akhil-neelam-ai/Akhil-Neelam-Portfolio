import { useRef, useState, type KeyboardEvent, type RefObject } from "react";
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
import { ArrowRight, ExternalLink, Github, Code, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { sideProjects, type SideProject } from "@/data/projects";
import { analytics } from "@/lib/analytics";

function ProjectCard({
  project,
  onOpen,
}: {
  project: SideProject;
  onOpen: (card: HTMLElement) => void;
}) {
  const titleId = `project-title-${project.id}`;
  const descriptionId = `project-description-${project.id}`;

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(event.currentTarget);
    }
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-haspopup="dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="h-full cursor-pointer hover-elevate transition-all duration-300 group fade-in-view focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      onClick={(event) => onOpen(event.currentTarget)}
      onKeyDown={handleKeyDown}
      data-testid={`card-project-${project.id}`}
    >
      <CardContent className="p-6 h-full flex flex-col">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 rounded-lg bg-secondary/70 flex items-center justify-center flex-shrink-0">
            <Code className="w-6 h-6 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <h3
              id={titleId}
              className="font-serif text-lg font-semibold text-foreground mb-1"
              data-testid={`text-project-title-${project.id}`}
            >
              {project.title}
            </h3>
          </div>
        </div>
        <p
          id={descriptionId}
          className="text-muted-foreground text-sm leading-relaxed"
          data-testid={`text-project-description-${project.id}`}
        >
          {project.briefDescription}
        </p>
        <span
          aria-hidden="true"
          className="mt-auto pt-4 self-start inline-flex items-center gap-1 text-sm font-medium text-foreground"
        >
          Read case study
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </span>
      </CardContent>
    </Card>
  );
}

function ProjectModal({
  project,
  open,
  onClose,
  returnFocusRef,
}: {
  project: SideProject | null;
  open: boolean;
  onClose: () => void;
  returnFocusRef: RefObject<HTMLElement | null>;
}) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl max-h-[85vh] overflow-y-auto"
        onCloseAutoFocus={(event) => {
          // The dialog opens without a DialogTrigger, so Radix has no element to refocus.
          event.preventDefault();
          returnFocusRef.current?.focus();
        }}
      >
        <DialogHeader>
          <div className="flex flex-col gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-secondary/70 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-accent-foreground" />
            </div>
            <DialogTitle className="font-serif text-xl md:text-2xl text-left">
              {project.title}
            </DialogTitle>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open live demo for ${project.title}`}
                onClick={() => analytics.clickProject(project.title, "demo")}
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
                aria-label={`Open GitHub repository for ${project.title}`}
                onClick={() => analytics.clickProject(project.title, "github")}
              >
                <Button size="sm" variant="outline" className="gap-1.5 h-8" data-testid="button-project-github-top">
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </Button>
              </a>
            )}
          </div>
          <DialogDescription className="sr-only">Details about {project.title}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">
              {project.overviewLabel || "Project Overview"}
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.overview}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">
              {project.challengeLabel || "The Challenge"}
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed">{project.challenge}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">
              {project.solutionLabel || "The Solution"}
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {project.solution}
            </p>
          </div>
          {project.productInsight ? (
            <div>
              <h4 className="font-semibold text-foreground mb-2">
                {project.productInsightLabel || "What I Learned"}
              </h4>
              <p className="text-muted-foreground text-sm leading-relaxed">{project.productInsight}</p>
            </div>
          ) : null}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
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

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<SideProject | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const lastOpenedCard = useRef<HTMLElement | null>(null);

  const handleProjectOpen = (project: SideProject, card: HTMLElement) => {
    lastOpenedCard.current = card;
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
        <SectionHeader
          title="Side Projects"
          description="Each one started with friction I noticed, then a small build to fix it."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {sideProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={(card) => handleProjectOpen(project, card)}
            />
          ))}
        </div>

        <ProjectModal
          project={selectedProject}
          open={modalOpen}
          onClose={handleCloseModal}
          returnFocusRef={lastOpenedCard}
        />
      </div>
    </section>
  );
}
