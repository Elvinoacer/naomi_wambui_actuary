import { cn } from "@/lib/utils";

interface MarqueeProps {
  items: string[];
  className?: string;
  slow?: boolean;
  separator?: string;
}

/** Infinite marquee — duplicated track, CSS animation, pauses on hover. */
export function Marquee({ items, className, slow = false, separator = "·" }: MarqueeProps) {
  const track = [...items, ...items];
  return (
    <div
      className={cn(
        "marquee-paused relative overflow-hidden",
        className
      )}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div
        className={cn(
          "flex w-max items-center gap-8 pr-8",
          slow ? "animate-marquee-slow" : "animate-marquee"
        )}
      >
        {track.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center gap-8">
            <span className="whitespace-nowrap font-mono text-sm text-muted-foreground">
              {item}
            </span>
            <span aria-hidden className="text-risk/60">
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
