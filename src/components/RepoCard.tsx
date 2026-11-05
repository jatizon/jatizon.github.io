import { useT } from "../i18n/strings";
import type { Repo } from "../types";
import { ExternalLinkIcon, StarIcon } from "./icons";

/** GitHub's language colors for the languages used across the listed repos. */
const languageColors: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  "C++": "#f34b7d",
  C: "#555555",
  CSS: "#663399",
  HTML: "#e34c26",
  Java: "#b07219",
  Rust: "#dea584",
  Go: "#00add8",
};

export function RepoCard({ repo }: { repo: Repo }) {
  const t = useT();

  return (
    <article className="group relative flex h-full flex-col border border-stone-800 bg-stone-900 p-5 transition hover:border-accent/40">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display font-semibold transition group-hover:text-accent-soft">
          {/* Stretched link: the whole card is clickable, but only one link is focusable. */}
          <a
            href={repo.url}
            target="_blank"
            rel="noreferrer noopener"
            className="after:absolute after:inset-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-100"
          >
            {repo.title}
          </a>
        </h3>

        {repo.homepage ? (
          // Above the stretched link (z-10), so it opens the live site
          // instead of GitHub.
          <a
            href={repo.homepage}
            target="_blank"
            rel="noreferrer noopener"
            className="relative z-10 flex shrink-0 items-center gap-1 text-xs font-medium text-stone-400 underline underline-offset-4 transition hover:text-accent-soft"
          >
            {t("liveBadge")}
            <ExternalLinkIcon className="h-3 w-3" />
          </a>
        ) : (
          <ExternalLinkIcon className="h-4 w-4 shrink-0 text-stone-500 transition group-hover:text-accent-soft" />
        )}
      </div>

      {repo.description && (
        <p className="mt-2 text-sm leading-relaxed text-stone-400">
          {repo.description}
        </p>
      )}

      {repo.topics && (
        <p className="mt-3 text-xs text-stone-500">
          {repo.topics.slice(0, 4).join(" · ")}
        </p>
      )}

      <div className="mt-auto flex items-center gap-4 pt-4 text-xs text-stone-400">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: languageColors[repo.language] ?? "#9ca3af" }}
            />
            {repo.language}
          </span>
        )}
        {repo.stars !== undefined && repo.stars > 0 && (
          <span className="flex items-center gap-1">
            <StarIcon className="h-3.5 w-3.5" />
            {repo.stars}
          </span>
        )}
      </div>
    </article>
  );
}

export function RepoCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="h-40 animate-pulse border border-stone-800 bg-stone-900 p-5"
    >
      <div className="h-4 w-1/2 bg-stone-800" />
      <div className="mt-4 h-3 w-full bg-stone-800" />
      <div className="mt-2 h-3 w-5/6 bg-stone-800" />
      <div className="mt-2 h-3 w-2/3 bg-stone-800" />
    </div>
  );
}
