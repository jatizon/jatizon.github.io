import { useLanguage } from "../i18n/useLanguage";
import { useT } from "../i18n/strings";

// Each language's own name for itself, not translated — a Portuguese
// speaker on an all-English page still needs to recognize "Português".
const languageNames = { pt: "Português", en: "English" } as const;

/** A compact PT/EN switch; the active language is highlighted. */
export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const t = useT();

  return (
    <div
      role="group"
      aria-label={t("languageGroupLabel")}
      className="flex items-center gap-1.5 text-xs font-medium"
    >
      {(["pt", "en"] as const).map((option, i) => (
        <span key={option} className="flex items-center gap-1.5">
          {i > 0 && <span aria-hidden="true" className="text-stone-700">/</span>}
          <button
            type="button"
            onClick={() => setLang(option)}
            aria-pressed={lang === option}
            aria-label={languageNames[option]}
            className={
              lang === option
                ? "text-accent-soft underline underline-offset-4"
                : "text-stone-400 hover:text-stone-100"
            }
          >
            {option.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}
