import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contact } from "@/data/site";
import { analytics } from "@/lib/analytics";

type ResumeButtonProps = {
  className?: string;
  fullWidth?: boolean;
  label?: string;
  size?: "default" | "sm" | "lg" | "icon";
  testId?: string;
};

export function ResumeButton({
  className,
  fullWidth,
  label = "Resume",
  size = "default",
  testId = "button-download-resume",
}: ResumeButtonProps) {
  return (
    <a
      href={contact.resumePath}
      download={contact.resumeFileName}
      data-testid={testId}
      className={fullWidth ? "block w-full" : undefined}
      onClick={() => analytics.downloadResume()}
    >
      <Button variant="secondary" size={size} className={className ?? (fullWidth ? "w-full gap-2" : "gap-2")}>
        <Download className="h-4 w-4" />
        {label}
      </Button>
    </a>
  );
}
