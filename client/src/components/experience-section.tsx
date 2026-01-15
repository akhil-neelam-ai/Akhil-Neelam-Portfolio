import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

interface Experience {
  id: number;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "Uniblox",
    role: "Pre-MBA Product Intern",
    period: "Apr 2025 - Jun 2025",
    location: "Seattle, WA (Remote)",
    description: "InsurTech startup building an AI powered platform to automate group insurance enrollment and underwriting.",
  },
  {
    id: 2,
    company: "Centre for Gender And Politics (CGAP)",
    role: "Co-founder & Director",
    period: "Jul 2021 - Mar 2025",
    location: "India (Remote)",
    description: "Co-founded South Asia's first-ever think tank exclusively focused on gender inclusion in politics, growing to 140+ members across 14 countries.",
  },
  {
    id: 3,
    company: "Central Square Foundation",
    role: "Project Manager",
    period: "Nov 2019 - Jun 2021",
    location: "Hyderabad, India",
    description: "Product customization for a WhatsApp learning bot during COVID-19, maintaining continuity for 3M students",
  },
  {
    id: 4,
    company: "Government of Andhra Pradesh",
    role: "Consultant, Project Management Unit",
    period: "Sep 2017 - Jun 2020",
    location: "Vijayawada, India",
    description: "Predictive ML based school dropout prediction and retention; Product Customisation and Rollout of AI based EdTech products across public schools",
  },
];

function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />
      <div className="absolute left-0 top-1 w-2 h-2 rounded-full -translate-x-1/2 bg-accent" />
      
      <div className="bg-card rounded-xl border border-card-border p-6 hover-elevate transition-all duration-300" data-testid={`card-experience-${experience.id}`}>
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
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

        <p className="text-muted-foreground leading-relaxed">
          {experience.description}
        </p>
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
