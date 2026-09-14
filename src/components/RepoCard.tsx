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
    <article className="group relative flex h-full flex-col rounded-xl border border-stone-800 bg-stone-900 p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display font-semibold tracking-tight transition group-hover:text-accent-soft">
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
            className="relative z-10 flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-800 bg-emerald-950/60 px-2 py-0.5 text-xs font-medium text-emerald-400 transition hover:border-emerald-600 hover:text-emerald-300"
          >
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {t("liveBadge")}
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
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {repo.topics.slice(0, 4).map((topic) => (
            <li
              key={topic}
              className="rounded-full bg-stone-800 px-2 py-0.5 text-xs text-stone-400"
            >
              {topic}
            </li>
          ))}
        </ul>
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
      className="h-40 animate-pulse rounded-xl border border-stone-800 bg-stone-900 p-5"
    >
      <div className="h-4 w-1/2 rounded bg-stone-200" />
      <div className="mt-4 h-3 w-full rounded bg-stone-800" />
      <div className="mt-2 h-3 w-5/6 rounded bg-stone-800" />
      <div className="mt-2 h-3 w-2/3 rounded bg-stone-800" />
    </div>
  );
}
