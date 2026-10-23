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
import { ArrowRight, ExternalLink, Github, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { sideProjects, type SideProject } from "@/data/projects";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

function ProjectCard({
  project,
  onOpen,
  featured = false,
  className,
}: {
  project: SideProject;
  onOpen: (card: HTMLElement) => void;
  featured?: boolean;
  className?: string;
}) {
  const titleId = `project-title-${project.id}`;
  const descriptionId = `project-description-${project.id}`;
  const statsId = `project-stats-${project.id}`;
  const stats = featured ? project.stats : undefined;

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
      aria-describedby={stats ? `${descriptionId} ${statsId}` : descriptionId}
      className={cn(
        "h-full cursor-pointer hover-elevate transition-all duration-300 group fade-in-view focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className
      )}
      onClick={(event) => onOpen(event.currentTarget)}
      onKeyDown={handleKeyDown}
      data-testid={`card-project-${project.id}`}
    >
      <CardContent className={cn("h-full flex flex-col", featured ? "p-6 md:p-8" : "p-6")}>
        {featured ? (
          <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Latest build</p>
        ) : null}
        <h3
          id={titleId}
          className={cn(
            "font-serif font-semibold text-foreground mb-3",
            featured ? "text-2xl md:text-3xl leading-snug" : "text-lg"
          )}
          data-testid={`text-project-title-${project.id}`}
        >
          {project.title}
        </h3>
        <p
          id={descriptionId}
          className={cn(
            "text-muted-foreground leading-relaxed max-w-3xl",
            featured ? "text-base" : "text-sm"
          )}
          data-testid={`text-project-description-${project.id}`}
        >
          {project.briefDescription}
        </p>
        {stats?.length ? (
          <div
            id={statsId}
            className="mt-6 pt-5 border-t border-border grid gap-3 sm:grid-cols-3 sm:gap-6 max-w-3xl"
          >
            {stats.map((stat) => (
              <p key={stat.label} className="flex items-baseline gap-3 sm:flex-col sm:gap-1">
                <span className="w-20 shrink-0 sm:w-auto font-serif text-2xl sm:text-3xl font-bold leading-none text-foreground lining-nums">
                  {stat.value}
                </span>{" "}
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </p>
            ))}
          </div>
        ) : null}
        <span
          aria-hidden="true"
          className="mt-auto pt-4 self-start inline-flex items-center gap-1 text-sm font-medium text-foreground"
        >
          Read more
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
            <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-accent-foreground" />
            </div>
            <DialogTitle className="font-serif text-xl md:text-2xl text-left">
              {project.title}
            </DialogTitle>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.demoLink && (
              <Button asChild size="sm" variant="default" className="gap-1.5 h-8">
                <a
                  href={project.demoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live demo for ${project.title}`}
                  data-testid="button-project-demo-top"
                  onClick={() => analytics.clickProject(project.title, "demo")}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Watch it live
                </a>
              </Button>
            )}
            {project.githubLink && (
              <Button asChild size="sm" variant="outline" className="gap-1.5 h-8">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open GitHub repository for ${project.title}`}
                  data-testid="button-project-github-top"
                  onClick={() => analytics.clickProject(project.title, "github")}
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </a>
              </Button>
            )}
          </div>
          <DialogDescription className="sr-only">Details about {project.title}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">
              {project.overviewLabel || "Project Overview"}
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{project.overview}</p>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">
              {project.challengeLabel || "The Challenge"}
            </h4>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{project.challenge}</p>
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
              <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">{project.productInsight}</p>
            </div>
          ) : null}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="outline">
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
    <section id="projects" className="py-16 md:py-24">
      <div className="container max-w-5xl mx-auto px-6 md:px-8">
        <SectionHeader
          title="Side Projects"
          description="Each one started with friction I noticed, then a small build to fix it."
        />

        <div className="grid md:grid-cols-2 gap-6">
          {sideProjects.map((project, index) => {
            const featured = index === 0;
            // The featured card fills the first row, so an even count leaves the last card alone on its row.
            const lastOnItsOwn = index === sideProjects.length - 1 && index % 2 === 1;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                featured={featured}
                className={featured || lastOnItsOwn ? "md:col-span-2" : undefined}
                onOpen={(card) => handleProjectOpen(project, card)}
              />
            );
          })}
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
