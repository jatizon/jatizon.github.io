import type { CSSProperties, ReactNode } from "react";
import { useLanguage, useLocalized } from "../i18n/useLanguage";
import { useT } from "../i18n/strings";
import { site } from "../config/site";
import { brandColors } from "./brandColors";
import { DownloadIcon, SocialIconFor } from "./icons";
import { Skills } from "./Skills";
import type { Achievement, EducationItem } from "../types";

function Monogram() {
  // First and last name, so "José Alberto Tizon" reads as JT rather than JA.
  const parts = site.name.trim().split(/\s+/);
  const initials = `${parts[0][0]}${parts.length > 1 ? parts[parts.length - 1][0] : ""}`;

  return (
    <div
      aria-hidden="true"
      className="font-display flex h-32 w-32 items-center justify-center rounded-full bg-accent text-4xl font-bold text-white sm:h-40 sm:w-40 lg:h-48 lg:w-48 lg:text-5xl"
    >
      {initials}
    </div>
  );
}

/**
 * A bordered card used in the hero's third column. `h-full` lets it grow to
 * fill whatever height the shared stretch context (see the pair wrapper in
 * `Hero`) gives it — never the other way around, so nothing here is ever
 * asked to shrink below its own content and needs to scroll.
 */
function SidebarCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="h-full rounded-xl border border-stone-800 bg-stone-900 p-6 shadow-sm">
      <h2 className="font-display text-xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function EducationEntry({ item }: { item: EducationItem }) {
  const degree = useLocalized(item.degree);

  return (
    <li>
      <p className="font-medium text-stone-100">
        {degree}
        {item.logo && (
          <img
            src={item.logo}
            alt=""
            width={364}
            height={139}
            className="ml-2 inline h-3 w-auto align-middle"
          />
        )}
      </p>
      <p className="mt-0.5 text-sm text-stone-400">{item.school}</p>
      <p className="mt-1 text-xs text-stone-400">{item.period}</p>
    </li>
  );
}

function EducationList() {
  return (
    <ul className="space-y-4">
      {site.education.map((item: EducationItem) => (
        <EducationEntry key={item.school} item={item} />
      ))}
    </ul>
  );
}

function AchievementEntry({ achievement }: { achievement: Achievement }) {
  const text = useLocalized(achievement.text);

  return (
    <li className="flex gap-2.5">
      <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      {achievement.href ? (
        <a
          href={achievement.href}
          target="_blank"
          rel="noreferrer noopener"
          className="underline underline-offset-4 hover:text-accent-soft"
        >
          {text}
        </a>
      ) : (
        text
      )}
    </li>
  );
}

function AchievementsList() {
  return (
    <ul className="space-y-2 text-sm text-stone-400">
      {site.achievements.map((achievement: Achievement) => (
        <AchievementEntry key={achievement.text.en} achievement={achievement} />
      ))}
    </ul>
  );
}

export function Hero() {
  const tagline = useLocalized(site.tagline);
  const location = useLocalized(site.location);
  const { lang } = useLanguage();
  const t = useT();

  return (
    <section aria-labelledby="hero-heading" className="border-b border-stone-800">
      <div className="mx-auto flex max-w-[100rem] flex-col gap-10 px-4 lg:flex-row lg:items-center lg:gap-8 lg:px-6 py-14 sm:py-20">
        <div className="flex flex-1 flex-col gap-8 lg:flex-row lg:items-center lg:justify-center">
          {site.photo ? (
            <img
              src={site.photo}
              alt={site.name}
              width={192}
              height={192}
              // The likely LCP element — loads eagerly and jumps the queue.
              fetchPriority="high"
              className="h-32 w-32 shrink-0 rounded-full object-cover shadow-lg ring-4 ring-stone-900 sm:h-40 sm:w-40 lg:h-48 lg:w-48"
            />
          ) : (
            <Monogram />
          )}

          <div className="min-w-0">
            <h1
              id="hero-heading"
              className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl"
            >
              {site.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-stone-400 sm:text-lg">
              {tagline}
            </p>
            <p className="mt-2 text-sm text-stone-400">{location}</p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={site.cv.files[lang]}
                download
                className="flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-accent-cta-hover hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <DownloadIcon className="h-4 w-4" />
                {t("downloadCv")}
              </a>

              {site.socials.map((social) => (
                <a
                  key={social.label}
                  style={{ "--brand": brandColors[social.icon] } as CSSProperties}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="flex items-center gap-2 rounded-lg border border-stone-700 bg-stone-900/70 px-4 py-2.5 text-sm font-medium text-stone-200 backdrop-blur transition hover:border-stone-500 hover:bg-stone-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-100"
                >
                  <SocialIconFor
                    icon={social.icon}
                    className="h-4 w-4 text-[var(--brand)]"
                  />
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Stack and Education/Achievements are grouped so `lg:items-stretch`
            sizes only these two against each other: whichever is naturally
            shorter grows to match the taller one (blank space at the
            bottom, via `h-full` inside each card), and neither is ever
            asked to shrink below its own content — so nothing scrolls. */}
        <div className="flex w-full flex-col gap-8 lg:w-auto lg:flex-row lg:items-stretch lg:gap-8">
          <div className="w-full shrink-0 lg:w-72 xl:w-80">
            <Skills />
          </div>

          <div
            id="education"
            className="scroll-mt-24 flex w-full shrink-0 flex-col gap-6 lg:w-72 xl:w-80"
          >
            <SidebarCard title={t("educationHeading")}>
              <EducationList />
            </SidebarCard>
            <SidebarCard title={t("achievementsHeading")}>
              <AchievementsList />
            </SidebarCard>
          </div>
        </div>
      </div>
    </section>
  );
}
