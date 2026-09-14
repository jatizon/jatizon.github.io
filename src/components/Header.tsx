import { useT } from "../i18n/strings";
import { site } from "../config/site";
import { LanguageToggle } from "./LanguageToggle";
import { SocialLinks } from "./SocialLinks";

export function Header() {
  const t = useT();
  const sections = [
    { id: "projects", label: t("navProjects") },
    { id: "experience", label: t("navExperience") },
    { id: "education", label: t("navEducation") },
  ];

  return (
    <header className="sticky top-0 z-20 border-b border-stone-800/80 bg-stone-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-[100rem] items-center justify-between gap-4 px-4 lg:px-6 py-3">
        <a
          href="#top"
          className="font-display truncate font-semibold tracking-tight hover:text-accent-soft"
        >
          {site.name}
        </a>

        <nav aria-label={t("sectionsNavLabel")} className="hidden gap-6 md:flex">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-sm text-stone-400 transition hover:text-accent-soft"
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageToggle />
          <SocialLinks />
        </div>
      </div>
    </header>
  );
}
