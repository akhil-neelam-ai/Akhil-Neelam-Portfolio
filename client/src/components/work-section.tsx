import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { featuredProjects } from "@/data/projects";
import { analytics } from "@/lib/analytics";

export function WorkSection() {
  return (
    <section id="work" className="py-20 md:py-32 bg-muted/30">
      <div className="container max-w-5xl mx-auto px-6 md:px-8">
        <SectionHeader
          title="Featured Work"
          description="Selected product and impact work from InsurTech, civic tech, EdTech, and government AI pilots."
        />

        <ol className="divide-y divide-border border-t border-border">
          {featuredProjects.map((project, index) => {
            const number = String(index + 1).padStart(2, "0");
            return (
              <li
                key={project.id}
                className="fade-in-view grid grid-cols-1 md:grid-cols-[auto_1fr] gap-x-10 gap-y-4 py-10 md:py-14 group"
                data-testid={`card-project-${project.id}`}
              >
                <div
                  aria-hidden
                  className="font-serif text-5xl md:text-6xl font-bold leading-none text-secondary/70 md:pt-1 md:w-24 select-none"
                >
                  {number}
                </div>

                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3
                      className="font-serif text-2xl md:text-3xl font-semibold text-foreground leading-snug"
                      data-testid={`text-project-title-${project.id}`}
                    >
                      {project.title}
                    </h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 text-muted-foreground hover:text-primary transition-colors flex-shrink-0"
                        data-testid={`link-project-${project.id}`}
                        aria-label={`Open ${project.title} in a new tab`}
                        onClick={() => analytics.clickExternalLink(project.link!, project.title)}
                      >
                        <ArrowUpRight className="w-6 h-6" />
                      </a>
                    )}
                  </div>

                  <p className="text-sm text-muted-foreground mb-5">
                    <span className="font-medium text-foreground/80">{project.organization}</span>
                    <span> · {project.role}</span>
                  </p>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-5 max-w-3xl">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
