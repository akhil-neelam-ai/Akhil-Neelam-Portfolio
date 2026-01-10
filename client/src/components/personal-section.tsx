import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Award, Heart, BookOpen } from "lucide-react";

const interests = [
  {
    icon: Plane,
    title: "Explorer",
    description: "Backpacked across 14 countries and 20 Indian states, experiencing diverse cultures and perspectives.",
  },
  {
    icon: Heart,
    title: "Aspiring Runner",
    description: "Currently training for a 10K, building discipline and endurance one mile at a time.",
  },
  {
    icon: BookOpen,
    title: "Lifelong Learner",
    description: "From AI tools like Claude and CustomGPTs to emerging tech, always exploring new frontiers.",
  },
  {
    icon: Award,
    title: "Fellowship Recipient",
    description: "Young India Fellowship, GRÓ GEST Fellowship, altMBA Leaders of the World Scholarship.",
  },
];

const certifications = [
  "Management Consulting Specialization",
  "altMBA (Leaders of the World Scholarship)",
  "AI for Business Certificate (pursuing)",
];

const tools = [
  "Azure DevOps",
  "Lovable AI",
  "Claude Code",
  "CustomGPTs",
  "Excel",
  "Wix",
  "Canva",
];

export function PersonalSection() {
  return (
    <section id="personal" className="py-20 md:py-32 bg-muted/30">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Beyond the Office
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            When I'm not building products or championing social causes, 
            here's what keeps me inspired and grounded.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {interests.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate transition-all duration-300" data-testid={`card-interest-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-accent/30 dark:bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-2" data-testid={`text-interest-title-${index}`}>
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4" data-testid="heading-certifications">
                  Certifications & Awards
                </h3>
                <ul className="space-y-3">
                  {certifications.map((cert, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="w-2 h-2 rounded-full bg-highlight mt-2 flex-shrink-0" />
                      <span className="text-muted-foreground">{cert}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Honors:</span>{" "}
                    MHRD-CSS Scholarship, Full Scholarship at Young India Fellowship, 
                    Youth Co:Lab Springboard Elevate Fellowship
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                  Tools & Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 bg-secondary/50 dark:bg-secondary/30 rounded-full text-sm text-secondary-foreground dark:text-secondary"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">Also proficient in:</span>{" "}
                    User research methodologies, A/B testing, product analytics, 
                    and cross-functional team collaboration
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
