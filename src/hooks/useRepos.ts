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

interface NamedGitHubRepo extends GitHubRepo {
  name: string;
}

/**
 * Fetches metadata for the repos listed in `site.repos` — a single request
 * for the account's public repos, matched back to our list by name. (One
 * call instead of one-per-repo: the unauthenticated API allows only 60
 * requests/hour per IP, shared by everyone behind the same NAT, and this
 * page only ever needs the handful of repos already in `site.repos`.) A repo
 * missing from that single response — or the request failing outright —
 * falls back to the cache, then the config entry, instead of an error.
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
      let byName: Map<string, NamedGitHubRepo> | null = null;
      try {
        const response = await fetch(
          `https://api.github.com/users/${site.githubUser}/repos?per_page=100&type=public`,
          { signal: controller.signal, headers: { Accept: "application/vnd.github+json" } },
        );
        if (!response.ok) throw new Error(`GitHub responded ${response.status}`);
        const list = (await response.json()) as NamedGitHubRepo[];
        byName = new Map(list.map((repo) => [repo.name, repo]));
      } catch {
        if (controller.signal.aborted) return;
        byName = null; // Whole request failed — every repo falls back below.
      }

      const merged = site.repos.map((config, index) => {
        const data = byName?.get(config.slug);
        return data ? mergeRepo(config, data) : (cached?.[index] ?? fallbackRepo(config));
      });
      // Degraded when the request itself failed, or it succeeded but didn't
      // list one of our repos (private, renamed, or beyond the 100-repo page).
      const failed = byName === null || site.repos.some((config) => !byName!.has(config.slug));

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
