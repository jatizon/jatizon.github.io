import { useT } from "../i18n/strings";
import { site } from "../config/site";
import { useRepos } from "../hooks/useRepos";
import { RepoCard, RepoCardSkeleton } from "./RepoCard";
import { Section } from "./Section";

export function Portfolio() {
  const { repos, loading, degraded } = useRepos();
  const t = useT();

  return (
    <Section
      id="projects"
      title={t("projectsHeading")}
      action={
        <a
          href={`https://github.com/${site.githubUser}?tab=repositories`}
          target="_blank"
          rel="noreferrer noopener"
          className="text-sm text-stone-400 underline underline-offset-4 transition hover:text-accent-soft"
        >
          {t("allRepositories")}
        </a>
      }
    >
      {degraded && <p className="mt-3 text-xs text-stone-400">{t("reposDegraded")}</p>}

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {loading
          ? site.repos.map((repo) => <RepoCardSkeleton key={repo.slug} />)
          : repos.map((repo) => <RepoCard key={repo.slug} repo={repo} />)}
      </div>
    </Section>
  );
}
