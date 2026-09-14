import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/site";
import { analytics } from "@/lib/analytics";

type SocialLinksProps = {
  variant?: "sidebar" | "inline";
  analyticsPrefix?: string;
};

export function SocialLinks({ variant = "sidebar", analyticsPrefix = "" }: SocialLinksProps) {
  const prefix = analyticsPrefix ? `${analyticsPrefix}_` : "";
  const buttonClass =
    variant === "sidebar"
      ? "text-sidebar-foreground hover:bg-sidebar-accent"
      : "text-foreground hover:bg-muted";

  return (
    <>
      <Button asChild variant="ghost" size="icon" className={buttonClass}>
        <a
          href={contact.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-linkedin"
          aria-label="LinkedIn profile"
          onClick={() => analytics.clickSocial("linkedin")}
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </Button>
      <Button asChild variant="ghost" size="icon" className={buttonClass}>
        <a
          href={`mailto:${contact.email}`}
          data-testid="link-email"
          aria-label="Send email"
          onClick={() => analytics.contactInteraction(`${prefix}email_click`)}
        >
          <Mail className="h-5 w-5" />
        </a>
      </Button>
      <Button asChild variant="ghost" size="icon" className={buttonClass}>
        <a
          href={contact.github}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="link-github"
          aria-label="GitHub profile"
          onClick={() => analytics.clickSocial("github")}
        >
          <Github className="h-5 w-5" />
        </a>
      </Button>
    </>
  );
}
