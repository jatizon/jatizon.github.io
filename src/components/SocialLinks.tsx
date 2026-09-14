import type { CSSProperties } from "react";
import { site } from "../config/site";
import { brandColors } from "./brandColors";
import { SocialIconFor } from "./icons";

/** Compact icon-only buttons for the sticky header. */
export function SocialLinks() {
  return (
    <nav aria-label="Social links" className="flex items-center gap-2">
      {site.socials.map((social) => {
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={social.label}
            title={social.label}
            style={{ "--brand": brandColors[social.icon] } as CSSProperties}
            className="group flex h-9 w-9 items-center justify-center rounded-full border border-stone-800 bg-stone-900 transition hover:border-[var(--brand)] hover:bg-[color-mix(in_oklab,var(--brand)_12%,transparent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand)]"
          >
            <SocialIconFor
              icon={social.icon}
              className="h-4 w-4 text-[var(--brand)] transition group-hover:scale-110"
            />
          </a>
        );
      })}
    </nav>
  );
}
