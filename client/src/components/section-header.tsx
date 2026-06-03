import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  description?: string;
  className?: string;
  descriptionClassName?: string;
};

export function SectionHeader({
  title,
  description,
  className,
  descriptionClassName,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-16 fade-in-view", className)}>
      <h2 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "text-lg text-muted-foreground max-w-2xl mx-auto",
            descriptionClassName
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
