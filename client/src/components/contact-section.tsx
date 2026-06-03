import { Mail, Linkedin, MapPin, ExternalLink, Github } from "lucide-react";
import { SectionHeader } from "@/components/section-header";
import { ResumeButton } from "@/components/resume-button";
import { contact } from "@/data/site";
import { analytics } from "@/lib/analytics";

export function ContactSection() {
  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container max-w-4xl mx-auto px-6 md:px-8">
        <SectionHeader
          title="Let's Connect"
          description="Open to conversations with founders, product leaders, and builders in tech."
          className="mb-12"
        />

        <div className="fade-in-view rounded-xl border border-border bg-card/50 p-8 md:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center p-4">
              <Mail className="w-6 h-6 text-primary mb-3" />
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <a
                href={`mailto:${contact.email}`}
                className="text-sm sm:text-base font-medium text-foreground hover:text-primary transition-colors"
                data-testid="link-email-contact"
                onClick={() => analytics.contactInteraction("email_click_contact")}
              >
                {contact.email}
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <Linkedin className="w-6 h-6 text-primary mb-3" />
              <p className="text-sm text-muted-foreground mb-1">LinkedIn</p>
              <a
                href={contact.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                data-testid="link-linkedin-contact"
                onClick={() => analytics.clickSocial("linkedin")}
              >
                /in/akhilneelam
                <ExternalLink className="w-3 h-3" aria-hidden />
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <Github className="w-6 h-6 text-primary mb-3" />
              <p className="text-sm text-muted-foreground mb-1">GitHub</p>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm sm:text-base font-medium text-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                data-testid="link-github-contact"
                onClick={() => analytics.clickSocial("github")}
              >
                akhil-neelam-ai
                <ExternalLink className="w-3 h-3" aria-hidden />
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <MapPin className="w-6 h-6 text-primary mb-3" />
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <p className="text-sm sm:text-base font-medium text-foreground" data-testid="text-location">
                {contact.location}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4 pt-8 mt-8 border-t border-border">
            <p className="text-muted-foreground text-center text-sm">
              Looking for my resume? Download the latest version here.
            </p>
            <ResumeButton size="lg" label="Download Resume" testId="button-download-resume-contact" />
          </div>
        </div>

        <p className="mt-16 text-center text-sm text-muted-foreground fade-in-view">
          &copy; {new Date().getFullYear()} Akhil Neelam. Built using AI.
        </p>
      </div>
    </section>
  );
}
