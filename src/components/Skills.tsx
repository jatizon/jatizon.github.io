import { useLocalized } from "../i18n/useLanguage";
import { useT } from "../i18n/strings";
import { site } from "../config/site";
import type { SkillGroup } from "../types";

function SkillGroupBlock({ group }: { group: SkillGroup }) {
  const label = useLocalized(group.label);

  return (
    <div>
      <p className="text-xs font-medium text-stone-400 uppercase">{label}</p>
      <p className="mt-1.5 text-sm text-stone-300">{group.items.join(" · ")}</p>
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
      <div className="h-full border-t border-stone-800 pt-5">
        <h2 id="skills-heading" className="font-display text-xl font-semibold">
          {t("stackHeading")}
        </h2>

        <div className="mt-4 space-y-3">
          {site.skills.map((group) => (
            <SkillGroupBlock key={group.label.en} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
