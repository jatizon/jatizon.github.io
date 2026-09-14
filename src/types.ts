/** A piece of prose available in both site languages. */
export interface Localized {
  en: string;
  pt: string;
}

export type SocialIcon =
  | "linkedin"
  | "github"
  | "gmail"
  | "email"
  | "x"
  | "website";

export interface SocialLink {
  /** Visible label, also used as the accessible name. */
  label: string;
  href: string;
  icon: SocialIcon;
}

/** One entry of the hand-curated project list in `site.repos`. */
export interface RepoConfig {
  /** Repository name under `site.githubUser`. */
  slug: string;
  /** Override — wins over whatever GitHub returns. */
  description?: string;
  /** Used only when GitHub has no description, or when the API is unreachable. */
  fallbackDescription?: string;
  /** Optional nicer display name; defaults to a prettified slug. */
  title?: string;
}

/** A repo config merged with whatever the GitHub API could tell us about it. */
export interface Repo extends RepoConfig {
  title: string;
  url: string;
  description?: string;
  language?: string;
  stars?: number;
  topics?: string[];
  homepage?: string;
}

export interface ExperienceItem {
  /** Job titles are proper nouns — not translated. */
  role: string;
  /**
   * A plain string when it reads the same in both languages; `Localized`
   * for the rare case where a qualifier changes (e.g. "(Itaú Unibanco
   * Group)" in English vs. just "(Itaú Unibanco)" in Portuguese).
   */
  organization: string | Localized;
  period: string;
  summary: Localized;
}

export interface EducationItem {
  degree: Localized;
  /** The institution's own name — kept as-is in both languages. */
  school: string;
  period: string;
  /** Path to the institution emblem in `public/`. */
  logo?: string;
}

export interface Achievement {
  text: Localized;
  /** Optional source to cite — e.g. the official results page. */
  href?: string;
}

export interface SkillGroup {
  label: Localized;
  /** Technology names — not translated. */
  items: string[];
}

