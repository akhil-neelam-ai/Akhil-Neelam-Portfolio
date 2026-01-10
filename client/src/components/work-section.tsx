import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Bot, Users, School, Brain } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "AI-Powered Census Automation",
    organization: "Uniblox (InsurTech Startup)",
    role: "Pre-MBA Product Intern",
    description: "Led 3 ML engineers for an AI-powered product that automated messy census file parsing for insurance brokers and carriers. Led daily bug triage and LLM fine-tuning that cut compute load by 85%.",
    tags: ["AI/ML", "Product Management", "InsurTech"],
    icon: Bot,
    link: null,
  },
  {
    id: 2,
    title: "Women Politicians Repository",
    organization: "CGAP x J.P. Morgan",
    role: "Co-founder & Director",
    description: "Defined product vision and executed partnership with J.P. Morgan to build a first-of-its-kind online repository for aspiring women politicians in South Asia. Created a scalable CMS platform democratizing access for 10K+ users.",
    tags: ["Product Strategy", "Partnerships", "Social Impact"],
    icon: Users,
    link: "https://www.cgapsouthasia.org",
  },
  {
    id: 3,
    title: "WhatsApp Learning Bot",
    organization: "Central Square Foundation",
    role: "Project Manager",
    description: "Spearheaded product customization (content pacing, multi-language, low-data settings) by collaborating with engineers and educators for a WhatsApp learning bot during COVID-19, maintaining learning continuity for 3M students.",
    tags: ["EdTech", "Product Customization", "Scale"],
    icon: School,
    link: null,
  },
  {
    id: 4,
    title: "AI-Based Learning Solution",
    organization: "Govt of Andhra Pradesh x Microsoft",
    role: "PMU Consultant",
    description: "Orchestrated a pilot project with 3 tech vendors, 2 consulting firms, and 3 govt departments. Developed performance metrics and policy framework enabling scaling of AI-based personalized learning to 500 schools.",
    tags: ["AI/ML", "Government", "Education"],
    icon: Brain,
    link: null,
  },
];

export function WorkSection() {
  return (
    <section id="work" className="py-20 md:py-32 bg-muted/30">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured Work
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Highlights from my journey building technology solutions for impact, 
            from AI-powered products to platforms serving millions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate transition-all duration-300 group" data-testid={`card-project-${project.id}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/50 dark:bg-accent/30 flex items-center justify-center">
                      <project.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        data-testid={`link-project-${project.id}`}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                  <CardTitle className="font-serif text-xl md:text-2xl mt-4 group-hover:text-highlight transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    <span className="font-medium text-foreground/80">{project.organization}</span>
                    <span className="text-muted-foreground"> · {project.role}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
