import { useLocalized, useMaybeLocalized } from "../i18n/useLanguage";
import { useT } from "../i18n/strings";
import { site } from "../config/site";
import type { ExperienceItem } from "../types";
import { Section } from "./Section";

function ExperienceEntry({ job }: { job: ExperienceItem }) {
  const organization = useMaybeLocalized(job.organization);
  const summary = useLocalized(job.summary);

  return (
    <li className="group relative">
      <span
        aria-hidden="true"
        className="absolute top-2 -left-[1.8125rem] h-2.5 w-2.5 rounded-full bg-stone-700 ring-4 ring-stone-950 transition group-hover:bg-accent"
      />
      {/* The period rides with the organization so a long role title can
          wrap without leaving a gap beside it. */}
      <h3 className="font-display font-semibold tracking-tight">{job.role}</h3>
      <div className="mt-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="text-sm font-medium text-accent-soft">{organization}</p>
        <span className="rounded-full bg-stone-800 px-2.5 py-0.5 text-xs whitespace-nowrap text-stone-400">
          {job.period}
        </span>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-stone-400">{summary}</p>
    </li>
  );
}

export function Experience() {
  const t = useT();

  return (
    <Section id="experience" title={t("experienceHeading")}>
      <ol className="mt-5 space-y-7 border-l border-stone-800 pl-6">
        {site.experience.map((job) => (
          <ExperienceEntry key={`${job.role}-${job.period}`} job={job} />
        ))}
      </ol>
    </Section>
  );
}
