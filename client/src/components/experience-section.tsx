import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, MapPin, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Milestone {
  date: string;
  title: string;
  description?: string;
}

interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  milestones?: Milestone[];
  current?: boolean;
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "UC Berkeley Haas School of Business",
    role: "MBA Candidate",
    period: "Aug 2025 - May 2027",
    location: "Berkeley, CA",
    description: "Pursuing AI for Business Certificate with coursework on A/B Testing and Product Management. Project Manager for Haas Tech & AI Summit; Member at Haas Tech, AI and Product Management Clubs.",
    current: true,
    milestones: [
      { date: "2025", title: "Started MBA program at UC Berkeley Haas" },
      { date: "2025", title: "Joined Haas Tech, AI and Product Management Clubs" },
    ],
  },
  {
    id: 2,
    company: "Uniblox",
    role: "Pre-MBA Product Intern",
    period: "Apr 2025 - Jun 2025",
    location: "Seattle, WA (Remote)",
    description: "InsurTech startup building an AI powered platform to automate group insurance enrollment and underwriting.",
    milestones: [
      { date: "Jun 2025", title: "Cut compute load by 85% through LLM fine-tuning" },
      { date: "May 2025", title: "Led 3 ML engineers for AI-powered census automation" },
      { date: "Apr 2025", title: "Joined as Pre-MBA Product Intern" },
    ],
  },
  {
    id: 3,
    company: "Centre for Gender And Politics (CGAP)",
    role: "Co-founder & Director",
    period: "Jul 2021 - Mar 2025",
    location: "India (Remote)",
    description: "Co-founded South Asia's first-ever think tank exclusively focused on gender inclusion in politics, growing to 140+ members across 14 countries.",
    milestones: [
      { date: "2024", title: "Partnered with J.P. Morgan for women politicians repository" },
      { date: "2023", title: "Influenced 5+ UN consultations on women's leadership" },
      { date: "2022", title: "Expanded reach to 8 South Asian countries" },
      { date: "2021", title: "Co-founded CGAP" },
    ],
  },
  {
    id: 4,
    company: "Central Square Foundation",
    role: "Project Manager",
    period: "Nov 2019 - Jun 2021",
    location: "Hyderabad, India",
    description: "Gates-funded philanthropy, deputed to consult with School Education departments in two Indian states. Maintained learning continuity for 3M students during COVID-19.",
    milestones: [
      { date: "2021", title: "Translated 6,600 parent interviews into tailored learning programs" },
      { date: "2020", title: "Launched WhatsApp learning bot reaching 3M students" },
      { date: "2019", title: "Joined as Project Management Consultant" },
    ],
  },
  {
    id: 5,
    company: "Government of Andhra Pradesh",
    role: "Consultant, Project Management Unit",
    period: "Sep 2017 - Jun 2020",
    location: "Vijayawada, India",
    description: "Led AI/ML partnerships with Microsoft and tech vendors, developing solutions that retained 60,000+ at-risk students.",
    milestones: [
      { date: "2019", title: "Scaled AI-based learning solution to 500 schools" },
      { date: "2018", title: "Partnered with Microsoft for predictive ML model" },
      { date: "2017", title: "Mobilized 20+ media houses for AgTech Summit with Bill Gates" },
    ],
  },
];

function ExperienceCard({ experience }: { experience: Experience }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
      <div className={`absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-1/2 ${experience.current ? 'bg-highlight' : 'bg-accent'}`} />
      
      <div className="bg-card rounded-xl border border-card-border p-6 hover-elevate transition-all duration-300" data-testid={`card-experience-${experience.id}`}>
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            {experience.current && (
              <Badge className="mb-2 bg-highlight/20 text-highlight border-highlight/30">
                Current
              </Badge>
            )}
            <h3 className="font-serif text-xl md:text-2xl font-semibold text-foreground">
              {experience.company}
            </h3>
            <p className="text-lg text-muted-foreground">{experience.role}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
              <Calendar className="w-4 h-4" />
              {experience.period}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {experience.location}
            </div>
          </div>
        </div>

        <p className="text-muted-foreground leading-relaxed mb-4">
          {experience.description}
        </p>

        {experience.milestones && experience.milestones.length > 0 && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="gap-2 text-muted-foreground hover:text-foreground p-0 h-auto"
              data-testid={`button-expand-${experience.id}`}
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  Hide Milestones
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  View Milestones ({experience.milestones.length})
                </>
              )}
            </Button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 pt-4 border-t border-border space-y-3">
                    {experience.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="text-xs text-muted-foreground w-16 flex-shrink-0 pt-0.5">
                          {milestone.date}
                        </span>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {milestone.title}
                          </p>
                          {milestone.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {milestone.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </div>
    </motion.div>
  );
}

export function ExperienceSection() {
  return (
    <section id="experience" className="py-20 md:py-32 bg-muted/30">
      <div className="container max-w-4xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Experience Timeline
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From government consulting to founding a think tank, my journey has been 
            about scaling impact through technology and partnerships.
          </p>
        </motion.div>

        <div className="relative">
          {experiences.map((experience) => (
            <ExperienceCard key={experience.id} experience={experience} />
          ))}
        </div>
      </div>
    </section>
  );
}
