import { MapPin, Calendar } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { experiences } from "@/data/experience";

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-32 bg-muted/30">
      <div className="container max-w-4xl mx-auto px-6 md:px-8">
        <SectionHeader
          title="Experience Timeline"
          description="From government consulting to founding a think tank—roles where product, policy, and partnerships shipped together."
        />

        <div className="relative">
          {experiences.map((experience) => (
            <article
              key={experience.id}
              className="relative pl-8 pb-12 last:pb-0 fade-in-view"
              data-testid={`card-experience-${experience.id}`}
            >
              <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
              <div className="absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-1/2 bg-secondary" />

              <div className="border-l-2 border-secondary/40 pl-6 py-1">
                <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
                      {experience.company}
                    </h3>
                    <p className="text-lg text-muted-foreground">{experience.role}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center justify-end gap-2 mb-1">
                      <Calendar className="w-4 h-4" />
                      {experience.period}
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <MapPin className="w-4 h-4" />
                      {experience.location}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed">{experience.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
