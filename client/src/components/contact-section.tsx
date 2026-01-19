import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Linkedin, Download, MapPin, ExternalLink } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container max-w-4xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Interested in connecting with founders, product leaders, and changemakers in tech. 
            Drop me a message or send a connection invite.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-accent/20 via-background to-secondary/20 dark:from-accent/10 dark:via-background dark:to-secondary/10">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-3">
                      <Mail className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Email</p>
                    <a
                      href="mailto:akhil_neelam@berkeley.edu"
                      className="text-sm sm:text-base font-medium text-foreground hover:text-highlight transition-colors"
                      data-testid="link-email-contact"
                    >
                      akhil_neelam@berkeley.edu
                    </a>
                  </div>

                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-3">
                      <Linkedin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">LinkedIn</p>
                    <a
                      href="https://linkedin.com/in/akhilneelam"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm sm:text-base font-medium text-foreground hover:text-highlight transition-colors inline-flex items-center gap-1"
                      data-testid="link-linkedin-contact"
                    >
                      /in/akhilneelam
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <div className="flex flex-col items-center text-center p-4">
                    <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center mb-3">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Location</p>
                    <p className="text-sm sm:text-base font-medium text-foreground" data-testid="text-location">
                      SF Bay Area
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-center gap-4 pt-4 border-t border-border">
                  <p className="text-muted-foreground text-center text-sm">
                    Looking for my resume? Download the latest version here.
                  </p>
                  <a href="/api/resume" download="Akhil_Neelam_Resume.pdf" data-testid="button-download-resume-contact">
                    <Button size="lg" className="gap-2">
                      <Download className="w-5 h-5" />
                      Download Resume
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Akhil Neelam. Built using AI.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
