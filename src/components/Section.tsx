import type { ReactNode } from "react";

interface SectionProps {
  id: string;
  title: string;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}

export function Section({ id, title, action, className = "", children }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={`scroll-mt-24 ${className}`}
    >
      <div className="flex items-baseline justify-between gap-4">
        <h2
          id={`${id}-heading`}
          className="font-display text-xl font-semibold"
        >
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
