import { SectionHeader } from "@/components/section-header";
import { interests } from "@/data/personal";
import { useScrollToSection } from "@/hooks/use-scroll-to-section";

export function PersonalSection() {
  const scrollToSection = useScrollToSection();

  return (
    <section id="personal" className="py-20 md:py-32 bg-muted/30">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeader
          title="Personal"
          description="Always building, always tinkering. Here's what keeps me inspired and grounded."
        />

        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {interests.map((item, index) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="flex items-start gap-4 fade-in-view"
                data-testid={`card-interest-${index}`}
              >
                <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-accent-foreground" />
                </div>
                <div>
                  <h3
                    className="font-serif text-lg font-semibold text-foreground mb-2"
                    data-testid={`text-interest-title-${index}`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                    {item.linkToProjects ? (
                      <>
                        {" "}
                        <button
                          type="button"
                          className="text-primary font-medium hover:underline inline"
                          onClick={() => scrollToSection("projects")}
                        >
                          View projects
                        </button>
                      </>
                    ) : null}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
