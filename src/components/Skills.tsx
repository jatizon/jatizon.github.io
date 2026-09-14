import { useLocalized } from "../i18n/useLanguage";
import { useT } from "../i18n/strings";
import { site } from "../config/site";
import type { SkillGroup } from "../types";

function SkillGroupBlock({ group }: { group: SkillGroup }) {
  const label = useLocalized(group.label);

  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-stone-400 uppercase">{label}</p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {group.items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-stone-700 bg-stone-800 px-2.5 py-1 text-xs text-stone-200 transition hover:border-accent/40 hover:text-accent-soft"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills({ className = "" }: { className?: string }) {
  const t = useT();

  return (
    // h-full: when a flex parent stretches this taller than its own content
    // (to match a taller sibling), the border grows with it instead of
    // leaving invisible empty space below an unchanged-size box.
    <section aria-labelledby="skills-heading" className={`h-full ${className}`}>
      <div className="h-full rounded-xl border border-stone-800 bg-stone-900 p-6 shadow-sm">
        <h2 id="skills-heading" className="font-display text-xl font-semibold tracking-tight">
          {t("stackHeading")}
        </h2>

        <div className="mt-4 space-y-4">
          {site.skills.map((group) => (
            <SkillGroupBlock key={group.label.en} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
