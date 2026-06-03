import { GraduationCap, Briefcase, Globe, Lightbulb } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import {
  bioParagraphs,
  bioQuote,
  education,
  languages,
  skills,
} from "@/data/bio";

export function BioSection() {
  return (
    <section id="bio" className="py-20 md:py-32">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <SectionHeader
          title="About Me"
          description="Startup grit, strategic thinking, and global leadership—with a focus on products that create measurable impact."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="fade-in-view">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {bioParagraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="text-lg text-muted-foreground leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </div>

            <blockquote
              className="mt-8 border-l-4 border-secondary pl-6 py-2 flex gap-4 items-start"
              data-testid="card-quote"
            >
              <Lightbulb className="w-6 h-6 text-accent-foreground mt-1 flex-shrink-0" />
              <p className="italic text-foreground" data-testid="text-bio-quote">
                "{bioQuote}"
              </p>
            </blockquote>
          </div>

          <div className="space-y-10 fade-in-view">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <GraduationCap className="w-5 h-5 text-accent-foreground" />
                <h3 className="font-serif text-xl font-semibold text-foreground" data-testid="heading-education">
                  Education
                </h3>
              </div>
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.school} className="border-l-2 border-secondary/60 pl-4">
                    <p className="font-medium text-foreground">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground">{edu.school}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {edu.year} · {edu.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5 text-accent-foreground" />
                <h3 className="font-serif text-xl font-semibold text-foreground" data-testid="heading-skills">
                  Core Skills
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 bg-muted rounded-full text-sm text-muted-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-accent-foreground" />
                <h3 className="font-serif text-xl font-semibold text-foreground" data-testid="heading-languages">
                  Languages
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {languages.map((lang) => (
                  <div key={lang.name}>
                    <p className="font-medium text-foreground text-sm">{lang.name}</p>
                    <p className="text-xs text-muted-foreground">{lang.level}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
