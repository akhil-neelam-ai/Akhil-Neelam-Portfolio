import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, Globe, Award, BookOpen, ArrowUpRight } from "lucide-react";

const speakingHighlights = [
  {
    id: 1,
    title: "UN Women Asia-Pacific AI School",
    type: "Training & Steering Committee",
    description: "Co-facilitated training on AI for social impact as Steering Committee Member",
    icon: Award,
    link: "https://asiapacific.unwomen.org/sites/default/files/2025-12/ap-20250432996-ai-school-grad-booklet-s.pdf",
  },
  {
    id: 2,
    title: "UN Consultations on Women's Leadership",
    type: "Policy Influence",
    description: "Research and awareness projects influencing 5+ UN consultations",
    icon: Globe,
    link: null,
  },
  {
    id: 3,
    title: "G20 & Global Forums",
    type: "Keynote Speaking",
    description: "Spoke at G20, UN platforms and 15+ global platforms",
    icon: Mic,
    link: null,
  },
  {
    id: 4,
    title: "Custom GPT for UN Convening",
    type: "AI Innovation",
    description: "Co-designed a custom GPT for a UN convening on gender equality",
    icon: BookOpen,
    link: "https://asiapacific.unwomen.org/en/stories/feature-story/2025/01/young-leaders-and-un-women-asia-and-the-pacific",
  },
];

const publications = [
  {
    title: "South Asia's women leaders: Disaster management, gender equality and COVID-19",
    link: null,
  },
  {
    title: "Women Voters in India Play a Significant Role in its Electoral System",
    link: null,
  },
  {
    title: "Harini Amarasuriya: An Academician Rises to Sri Lanka's Premiership",
    link: null,
  },
  {
    title: "Gender Analysis of Nepal's Local Elections May 2022",
    link: null,
  },
  {
    title: "Safeguarding digital spaces in Indian/South Asian politics",
    link: null,
  },
];

export function SpeakingSection() {
  return (
    <section id="speaking" className="py-20 md:py-32">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Speaking & Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Sharing insights on AI, gender equality, and technology for social good 
            at global forums and through thought leadership.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {speakingHighlights.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate transition-all duration-300" data-testid={`card-speaking-${item.id}`}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary/50 dark:bg-secondary/30 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-secondary-foreground dark:text-secondary" />
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
                            className="text-muted-foreground hover:text-highlight transition-colors"
                            data-testid={`link-speaking-${item.id}`}
                          >
                            <ArrowUpRight className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-foreground mb-2" data-testid={`text-speaking-title-${item.id}`}>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-xl border border-card-border p-8"
        >
          <h3 className="font-serif text-2xl font-bold text-foreground mb-6" data-testid="heading-publications">
            Publications & Writing
          </h3>
          <ul className="space-y-4">
            {publications.map((pub, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-3 group"
              >
                <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                {pub.link ? (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground group-hover:text-highlight transition-colors flex items-center gap-2"
                    data-testid={`link-publication-${index}`}
                  >
                    <span>{pub.title}</span>
                    <ArrowUpRight className="w-4 h-4 flex-shrink-0" />
                  </a>
                ) : (
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors" data-testid={`text-publication-${index}`}>
                    {pub.title}
                  </span>
                )}
              </motion.li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">LinkedIn Growth:</span>{" "}
              Built thought-leadership presence from 1K to 15K followers, leveraging content 
              strategy to engage global experts and recruit 140+ volunteers across 14 countries.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
