import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Plane, Code } from "lucide-react";

const interests = [
  {
    icon: Plane,
    title: "Explorer",
    description: "Backpacked across 14 countries and 20 Indian states, experiencing diverse cultures and perspectives.",
  },
  {
    icon: Code,
    title: "Vibe Coding",
    description: (
      <>
        Building apps with Claude Code, Replit, and other AI-powered tools—whether it's boosting personal productivity or just having fun with side projects.{" "}
        <a 
          href="#projects" 
          className="text-accent-foreground font-medium hover:underline inline-flex items-center gap-1"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          View projects
        </a>
      </>
    ),
  },
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
            Interests
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Always building, always tinkering. Here's what keeps me inspired and grounded.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
      </div>
    </section>
  );
}
