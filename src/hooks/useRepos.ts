import { useEffect, useState } from "react";
import { site } from "../config/site";
import type { Repo, RepoConfig } from "../types";

interface GitHubRepo {
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  topics?: string[];
  homepage: string | null;
}

/** "uncertainty-propagation-calculator" -> "Uncertainty Propagation Calculator" */
function prettify(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** What we render before (or instead of) the API answering. */
function fallbackRepo(config: RepoConfig): Repo {
  return {
    ...config,
    description: config.description ?? config.fallbackDescription,
    title: config.title ?? prettify(config.slug),
    url: `https://github.com/${site.githubUser}/${config.slug}`,
  };
}

function mergeRepo(config: RepoConfig, data: GitHubRepo): Repo {
  return {
    ...fallbackRepo(config),
    // An explicit override wins; otherwise GitHub's text, then the fallback.
    description:
      config.description ?? data.description ?? config.fallbackDescription,
    url: data.html_url,
    language: data.language ?? undefined,
    stars: data.stargazers_count,
    topics: data.topics?.length ? data.topics : undefined,
    homepage: data.homepage || undefined,
  };
}

const CACHE_KEY = "repos-cache-v1";

/** Last good API answer, so a rate-limited visit still shows real data. */
function readCache(): Repo[] | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const parsed = JSON.parse(cached) as Repo[];
    const slugs = site.repos.map((repo) => repo.slug).join();
    // Ignore the cache if the configured project list changed.
    if (parsed.map((repo) => repo.slug).join() !== slugs) return null;
    // Config descriptions may have been edited since the cache was written.
    return parsed.map((repo, index) => {
      const config: RepoConfig = site.repos[index];
      return {
        ...repo,
        description:
          config.description ?? repo.description ?? config.fallbackDescription,
      };
    });
  } catch {
    return null;
  }
}

function writeCache(repos: Repo[]): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(repos));
  } catch {
    // Private mode / disabled storage: caching is a nicety, never required.
  }
}

/**
 * Fetches metadata for the repos listed in `site.repos`, one request each.
 * The unauthenticated API allows 60 requests/hour per IP, so every failure
 * falls back to the config entry instead of surfacing an error.
 */
export function useRepos() {
  const [cached] = useState(readCache);
  const [repos, setRepos] = useState<Repo[]>(
    () => cached ?? site.repos.map(fallbackRepo),
  );
  // With a warm cache there is nothing to wait for — skip the skeletons.
  const [loading, setLoading] = useState(cached === null);
  const [degraded, setDegraded] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      const results = await Promise.allSettled(
        site.repos.map(async (config) => {
          const response = await fetch(
            `https://api.github.com/repos/${site.githubUser}/${config.slug}`,
            { signal: controller.signal, headers: { Accept: "application/vnd.github+json" } },
          );
          if (!response.ok) throw new Error(`GitHub responded ${response.status}`);
          return mergeRepo(config, (await response.json()) as GitHubRepo);
        }),
      );

      if (controller.signal.aborted) return;

      const merged = results.map((result, index) =>
        result.status === "fulfilled"
          ? result.value
          : (cached?.[index] ?? fallbackRepo(site.repos[index])),
      );
      const failed = results.some((result) => result.status === "rejected");

      setRepos(merged);
      setDegraded(failed);
      setLoading(false);
      if (!failed) writeCache(merged);
    }

    void load();
    return () => controller.abort();
  }, [cached]);

  return { repos, loading, degraded };
}
