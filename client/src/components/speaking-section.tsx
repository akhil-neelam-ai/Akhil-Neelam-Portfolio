import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import { ResponsiveImage } from "@/components/responsive-image";
import { SectionHeader } from "@/components/section-header";
import {
  galleryImages,
  linkedInGrowthNote,
  publications,
  speakingHighlights,
} from "@/data/speaking";
import { analytics } from "@/lib/analytics";
import useEmblaCarousel from "embla-carousel-react";

const SPEAKING_WIDTHS = [800, 1200];

export function SpeakingSection() {
  const [emblaRef] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    loop: true,
  });

  return (
    <section id="speaking" className="py-20 md:py-32">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeader
          title="Speaking & Impact"
          description="Talks and publications on AI, gender equality, and technology in the public sector."
        />

        <div className="mb-20 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {galleryImages.map((image) => (
              <figure
                key={image.slug}
                className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 fade-in-view"
              >
                <div className="aspect-[16/10] relative rounded-xl overflow-hidden border border-border bg-muted group">
                  <ResponsiveImage
                    basePath={`/images/speaking/${image.slug}`}
                    widths={SPEAKING_WIDTHS}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 30vw"
                  />
                  <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3 text-white text-sm font-sans">
                    {image.caption}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {speakingHighlights.map((item) => (
            <article
              key={item.id}
              className="flex items-start gap-4 fade-in-view"
              data-testid={`card-speaking-${item.id}`}
            >
              <div className="w-12 h-12 rounded-lg bg-secondary/70 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-6 h-6 text-accent-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="outline" className="mb-2 text-xs" data-testid={`badge-speaking-type-${item.id}`}>
                    {item.type}
                  </Badge>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      data-testid={`link-speaking-${item.id}`}
                      aria-label={`Open ${item.title} in a new tab`}
                      onClick={() => analytics.clickExternalLink(item.link!, item.title)}
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  )}
                </div>
                <h3
                  className="font-serif text-lg font-semibold text-foreground mb-2"
                  data-testid={`text-speaking-title-${item.id}`}
                >
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="fade-in-view border-t border-border pt-10">
          <h3 className="font-serif text-2xl font-bold text-foreground mb-6" data-testid="heading-publications">
            Select Publications
          </h3>
          <ul className="space-y-4">
            {publications.map((pub, index) => (
              <li key={pub.title} className="flex items-start gap-3 group">
                <span className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0" />
                <a
                  href={pub.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-2"
                  data-testid={`link-publication-${index}`}
                >
                  <span>{pub.title}</span>
                  <ArrowUpRight className="w-4 h-4 flex-shrink-0" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 pt-6 border-t border-border text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">LinkedIn Growth:</span> {linkedInGrowthNote}
          </p>
        </div>
      </div>
    </section>
  );
}
