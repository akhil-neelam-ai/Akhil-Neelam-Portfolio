import { Button } from "@/components/ui/button";
import { ResumeButton } from "@/components/resume-button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center bg-background px-6 md:px-8">
      <div className="max-w-xl mx-auto w-full">
        <p className="text-sm uppercase tracking-wider text-muted-foreground mb-4">
          404 · Page not found
        </p>
        <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground leading-tight mb-6">
          This page doesn't exist.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">
          The link may be old or mistyped. You can find everything on the homepage.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="lg" variant="secondary">
            <a href="/">Go to homepage</a>
          </Button>
          <ResumeButton size="lg" label="Download resume" testId="button-download-resume-404" />
        </div>
      </div>
    </div>
  );
}
