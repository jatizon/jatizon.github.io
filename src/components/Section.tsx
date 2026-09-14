import type { ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

interface SectionProps {
  id: string;
  title: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

/** A titled block that fades in on first scroll into view. */
export function Section({ id, title, action, className = "", children }: SectionProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <section
      ref={ref}
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`reveal scroll-mt-24 ${className}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id={`${id}-heading`}
          className="font-display text-xl font-semibold tracking-tight"
        >
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
