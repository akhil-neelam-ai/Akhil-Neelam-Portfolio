import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Briefcase, Globe, Lightbulb } from "lucide-react";

const skills = [
  "User Research & Personas",
  "Cross-functional Team Leadership",
  "Go-to-Market Planning",
  "Data Analysis & Experimentation",
  "AI/ML Strategy",
  "Product Roadmapping",
  "Stakeholder Management",
  "Policy Design & Implementation",
];

const education = [
  {
    degree: "MBA",
    school: "UC Berkeley Haas School of Business",
    year: "2025 - 2027",
    note: "Pursuing AI for Business Certificate",
  },
  {
    degree: "Young India Fellowship (PG Diploma)",
    school: "Ashoka University",
    year: "2016 - 2017",
    note: "Liberal Arts and Sciences",
  },
  {
    degree: "B.Tech, Mechanical Engineering",
    school: "SASTRA University, India",
    year: "2012 - 2016",
    note: "Co-founder, Entrepreneurship Club",
  },
];

export function BioSection() {
  return (
    <section id="bio" className="py-20 md:py-32">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A blend of startup grit, strategic thinking, and global leadership 
            with a passion for building technology that creates measurable impact.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I'm a full-time MBA student at{" "}
                <span className="text-foreground font-semibold">
                  UC Berkeley Haas School of Business
                </span>
                . Prior to business school, I co-founded South Asia's only volunteer-led 
                think tank on gender & politics, growing it to{" "}
                <span className="text-foreground font-semibold">140+ members across 14 countries</span>{" "}
                and building a global network of changemakers.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                My journey from building AI partnerships in government to leading 
                product customization to launching an impact startup has been about{" "}
                <span className="text-foreground font-semibold">scaling impact through technology</span>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Today I'm pivoting into product management and product marketing roles 
                in tech where I can translate user insights into strategy, define 
                data-driven roadmaps, and build human-centered products with measurable 
                impact, whether that's growth, engagement, or scalability.
              </p>
            </div>

            <Card className="mt-8 bg-accent/20 dark:bg-accent/10 border-accent/30" data-testid="card-quote">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Lightbulb className="w-6 h-6 text-accent-foreground mt-1 flex-shrink-0" />
                  <blockquote className="italic text-foreground" data-testid="text-bio-quote">
                    "I'm excited to bring my blend of startup grit, strategic thinking, 
                    and global leadership into a tech product role that values both 
                    business growth and meaningful impact."
                  </blockquote>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/50 dark:bg-secondary/30 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-secondary-foreground dark:text-secondary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground" data-testid="heading-education">
                    Education
                  </h3>
                </div>
                <div className="space-y-4">
                  {education.map((edu, index) => (
                    <div key={index} className="border-l-2 border-accent/50 pl-4">
                      <p className="font-medium text-foreground">{edu.degree}</p>
                      <p className="text-sm text-muted-foreground">{edu.school}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {edu.year} · {edu.note}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/50 dark:bg-secondary/30 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-secondary-foreground dark:text-secondary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground" data-testid="heading-skills">
                    Core Skills
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-muted rounded-full text-sm text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary/50 dark:bg-secondary/30 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-secondary-foreground dark:text-secondary" />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-foreground" data-testid="heading-languages">
                    Languages
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="font-medium text-foreground text-sm">Telugu</p>
                    <p className="text-xs text-muted-foreground">Native</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Hindi</p>
                    <p className="text-xs text-muted-foreground">Full Professional</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">English</p>
                    <p className="text-xs text-muted-foreground">Professional Working</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">Tamil</p>
                    <p className="text-xs text-muted-foreground">Elementary</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
