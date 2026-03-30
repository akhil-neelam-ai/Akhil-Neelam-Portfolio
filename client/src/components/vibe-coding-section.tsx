import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ExternalLink, Github, Code, Sparkles } from "lucide-react";
import { analytics } from "@/lib/analytics";

interface Project {
  id: number;
  title: string;
  briefDescription: string;
  techStack: string[];
  overview: string;
  challenge: string;
  solution: string;
  productInsight: string;
  overviewLabel?: string;
  challengeLabel?: string;
  solutionLabel?: string;
  productInsightLabel?: string;
  demoLink?: string;
  githubLink?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Daily Newsletter Briefing via Alexa",
    briefDescription: "I wasted way too much time each morning reading newsletters. Built an Alexa skill that turns them into 2-minute audio briefings I can listen to while getting ready.",
    techStack: ["n8n", "Claude AI", "Gmail API", "Airtable", "Alexa Skills", "RSS", "REST API", "Workflow Automation"],
    overview: "I subscribe to 5+ daily newsletters. Mornings are hands-free time. I'm in the kitchen, getting ready, not sitting at a desk. \"Read later\" folders don't help because they assume you'll sit down later and actually read. I needed something that worked while I was moving. So I built the whole system around voice. Summaries are written to sound natural when spoken, kept under 30 seconds each, and delivered through an Alexa speaker already sitting on my counter.",
    challenge: "The real problem wasn't too many newsletters. It was the format. Reading is the wrong medium for a busy morning. Audio is perfect. But I didn't want another app to open. Alexa Flash Briefing already existed as a habit. I just needed to pipe my newsletters into it.",
    solution: "Once set up, the system runs with zero daily input from me. Gmail filters catch newsletters as they arrive. The HTML gets stripped to core content. Claude 3.5 Haiku generates a summary written for spoken delivery. Airtable stores everything for debugging. An RSS feed ties it all together. Every morning, I ask Alexa for my briefing and it's there. I picked Alexa Flash Briefing over a custom app because the habit of asking Alexa for a morning update already existed. No new behavior needed.",
    productInsight: "",
    demoLink: "https://www.linkedin.com/posts/akhilneelam_techautomation-ai-productivityhack-activity-7416624475321913362-uPJW",
    githubLink: "https://github.com/akhil-neelam-ai/alexa-newsletter-briefing",
  },
  {
    id: 2,
    title: "CalEvents Discovery",
    briefDescription: "Berkeley has hundreds of events every week, scattered across 30+ department websites. I built an AI search tool that finds them in one place.",
    techStack: ["React 19", "Tailwind CSS", "Gemini 2.0 Flash", "Google Search Grounding", "JSON Schema", "Natural Language Filtering"],
    overview: "I asked classmates how they find campus events. The answer was always the same: they check 10 bookmarks, miss half the stuff, and hear about the rest through word of mouth. The events exist. They're just spread across dozens of department websites that all look different and update on different schedules.",
    challenge: "The obvious approach was to scrape every department site. But scrapers break every time someone redesigns a page. I went a different direction: use AI to search the web in real time. Gemini 2.0 Flash with Google Search grounding queries UC Berkeley domains on demand. The web is the database. When a department changes their site, nothing breaks on my end.",
    solution: "Gemini searches the web and returns raw snippets. I transform those into a typed JSON schema so the UI gets consistent data regardless of where it came from. Users can filter by discipline or time frame. Every result links back to the original page. I picked real-time AI search over a traditional database because event pages change weekly. Zero maintenance beats fast queries for this use case.",
    productInsight: "I talked to 15 classmates before writing a single line of code. The pattern was clear: everyone knew events existed, nobody knew where to find them. The real competitor wasn't another app. It was word of mouth. If I couldn't beat hearing about it from a friend, the tool was dead. Speed and zero friction were the only things that mattered.",
    demoLink: "https://calevents-discovery.vercel.app/",
    githubLink: "https://github.com/akhil-neelam-ai/Cal-Events-Discovery",
  },
  {
    id: 3,
    title: "MirrorMe: AI Virtual Try-On Chrome Extension",
    briefDescription: "Buying clothes online is a gamble without trying them on. I built a Chrome extension that shows how clothes look on you, right on the product page.",
    techStack: ["Chrome Extension API", "Next.js", "Replicate", "NanoBanana AI", "React", "Tailwind CSS"],
    overview: "Virtual try-on already exists. The problem is that every tool makes you leave the shopping site, upload a photo somewhere else, and find the same product again. That's too many steps. I put the try-on directly on the product page. You're on Amazon looking at a shirt. You click one button. You see it on you. You're still on the same page, still in buying mode.",
    challenge: "People buy multiple sizes \"just in case\" or skip the purchase entirely because they can't tell how something will look. The try-on tools that exist today pull you out of the shopping flow. By the time you've uploaded a photo, found the product again, and waited for a result, the moment is gone.",
    solution: "I built it as a Chrome extension so it works on sites people already shop on. Amazon, Myntra, wherever. The extension detects product images and handles the UI. A separate Next.js app at mirror-me.app runs the AI processing. This split avoids Content Security Policy issues and keeps the extension lightweight.\n\nThe flow is short: extension spots the product image, you click to try on, a clean interface opens with the product pre-loaded, NanoBanana AI generates the visualization, result shows up in seconds. You're still next to the buy button.",
    productInsight: "I watched 5 friends try existing virtual try-on tools. Every one of them gave up midway. The friction wasn't the AI quality. It was leaving the product page. By the time they uploaded a photo, found the item again, and waited for a result, they'd lost interest. I learned that in e-commerce, staying inside the buying flow is the product. Everything else is a feature.",
    demoLink: "https://www.linkedin.com/posts/akhilneelam_ai-sideproject-buildinpublic-activity-7419082563580739584-coS3?utm_source=share&utm_medium=member_desktop&rcm=ACoAABBO9jYBzpbFmyeJuaql55xs2TnXfE7QS58",
  },
  {
    id: 4,
    title: "starred: Google Takeout Data Visualization",
    briefDescription: "1,248 starred places on Google Maps. Exported the raw data. Built a WebGL globe. Every dot is somewhere I've been.",
    techStack: ["React 19", "Three.js", "TypeScript", "WebGL", "Google Takeout", "Vite"],
    overviewLabel: "The Story",
    overview: "I had 1,248 stars on Google Maps across 16 countries. That data was just sitting in Google's servers doing nothing. So I exported it through Google Takeout. Got a raw JSON dump of coordinates, names, and countries. Cleaned out the noise. What was left: 825 places across 16 countries, 21 Indian states, 35 airports.",
    challengeLabel: "What I Built",
    challenge: "I mapped every coordinate onto a Three.js globe. Color-coded each dot by country. Connected nearby dots with lines to create a constellation effect. You can drag to rotate, pinch to zoom, click a dot and the camera flies there. There's search, category filters, and a data feed on the left that syncs with the globe. Hover a row and the dot lights up. Hover a dot and the row scrolls into view. The whole thing runs as a pipeline: Google Takeout to a cleaning script to a WebGL point cloud. Three.js is lazy-loaded so the initial bundle is 65KB.",
    solutionLabel: "Red Teaming My Own Data",
    solution: "Before shipping, I went through the entire dataset looking for privacy risks. The raw export had my home addresses, medical visits, banks, daily grocery stores. All with GPS precision accurate to 0.1 meters. I built a cleaning script that strips sensitive categories, removes residential addresses, and keeps only places worth sharing publicly. The data gets inlined into the JS bundle so there's no public JSON endpoint to scrape. It only loads after user interaction. I also ran a Vercel design guidelines audit and a SquirrelScan security audit. Fixed accessibility issues, added CSP headers, and cleaned up focus states.",
    productInsight: "The interesting tradeoff was privacy vs. richness. The raw data was fascinating. Every doctor visit, every late-night grocery run, every place I stayed while traveling. But sharing that would be reckless. I had to decide what was interesting enough to show without revealing things I'd regret. That tension between \"cool data\" and \"safe data\" shaped every design decision.",
    demoLink: "https://starred.akhilneelam.com",
    githubLink: "https://github.com/akhil-neelam-ai/starred",
  },
  {
    id: 5,
    title: "Write Like a Human",
    briefDescription: "AI writing sounds like AI. I built a skill you drop into any LLM that bans 50+ overused words, catches structural tells, and calibrates to your personal voice.",
    techStack: ["Claude API", "Prompt Engineering", "Anthropic SDK", "Python", "Markdown"],
    overview: "I kept getting AI outputs stuffed with \"delve,\" \"tapestry,\" and \"not just X but Y.\" Research showed these words surged 500-6,700% in academic papers after ChatGPT launched. Readers can spot them. Recruiters can spot them. I wanted a single file I could drop into any AI tool that would fix the problem at the source, not after the fact.",
    challenge: "Banning words is easy. Making AI actually sound like a specific person is hard. A generic \"write simply\" instruction produces generic simple writing. I needed the skill to learn individual voice patterns, so two different users would get two different outputs from the same prompt.",
    solution: "The skill has four parts. A banned word list backed by a 950,000-paper study. Structural rules that catch em dash overuse, rule-of-three filler, positivity bias, and 10 other AI tells. A 13-point self-check the AI runs before returning any writing. And a voice calibration system: you feed it 3-5 samples of your own writing, it builds a profile of your sentence structure, openers, word choices, and register range. After that, the AI writes like you.\n\nI tested it across Claude Haiku, Sonnet, and Opus. Zero banned words in the output across all models. Works with Claude, ChatGPT, Gemini, Manus, or anything that takes a system prompt.",
    productInsight: "Early versions just had the banned word list. The output was cleaner but still felt generic. That's when I realized the real problem wasn't bad words. It was the absence of a specific voice. Two people using the same skill should get different outputs. The calibration feature changed the product from \"less AI-sounding\" to \"sounds like you.\" That shift is what made it worth open-sourcing.",
    githubLink: "https://github.com/akhil-neelam-ai/write-like-a-human",
  },
];

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card 
        className="h-full cursor-pointer hover-elevate transition-all duration-300 group"
        onClick={onClick}
        data-testid={`card-project-${project.id}`}
      >
        <CardContent className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-lg bg-highlight/20 flex items-center justify-center flex-shrink-0">
              <Code className="w-6 h-6 text-highlight" />
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-1" data-testid={`text-project-title-${project.id}`}>
                {project.title}
              </h3>
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-project-description-${project.id}`}>
            {project.briefDescription}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ProjectModal({ project, open, onClose }: { project: Project | null; open: boolean; onClose: () => void }) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg bg-highlight/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-highlight" />
            </div>
            <DialogTitle className="font-serif text-xl md:text-2xl text-left">{project.title}</DialogTitle>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {project.demoLink && (
              <a
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.clickProject(project.title, 'demo')}
              >
                <Button size="sm" variant="default" className="gap-1.5 h-8" data-testid="button-project-demo-top">
                  <ExternalLink className="w-3.5 h-3.5" />
                  Watch it live
                </Button>
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.clickProject(project.title, 'github')}
              >
                <Button size="sm" variant="outline" className="gap-1.5 h-8" data-testid="button-project-github-top">
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </Button>
              </a>
            )}
          </div>
          <DialogDescription className="sr-only">
            Details about {project.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">{project.overviewLabel || 'Project Overview'}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {project.overview}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">{project.challengeLabel || 'The Challenge'}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {project.challenge}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-2">{project.solutionLabel || 'The Solution'}</h4>
            <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {project.solution}
            </p>
          </div>

          {project.productInsight && (
            <div>
              <h4 className="font-semibold text-foreground mb-2">{project.productInsightLabel || 'What I Learned'}</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {project.productInsight}
              </p>
            </div>
          )}

          <div>
            <h4 className="font-semibold text-foreground mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <Badge key={index} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}

export function VibeCodingSection() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container max-w-6xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Side Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            I notice friction, then build the fix. Each project started with something that annoyed me or someone around me.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onClick={() => handleProjectClick(project)}
            />
          ))}
        </div>

        <ProjectModal
          project={selectedProject}
          open={modalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </section>
  );
}
