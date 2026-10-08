import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/** Consistent section header: mono index + eyebrow rule, display title. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <Reveal>
        <div
          className={cn(
            "flex items-center gap-3 mb-5",
            align === "center" && "justify-center"
          )}
        >
          <span className="font-mono text-xs font-medium text-risk tnum">
            {index}
          </span>
          <span
            aria-hidden
            className="h-px w-10 bg-gradient-to-r from-risk/70 to-transparent"
          />
          <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
            {eyebrow}
          </span>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display text-3xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
          {title}
        </h2>
      </Reveal>
      {description ? (
        <Reveal delay={0.16}>
          <p
            className={cn(
              "mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg",
              align === "center" && "mx-auto"
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
