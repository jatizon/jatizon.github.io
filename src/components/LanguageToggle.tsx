import { useLanguage } from "../i18n/useLanguage";
import { useT } from "../i18n/strings";

/** A compact PT/EN switch; the active language is highlighted. */
export function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  const t = useT();

  return (
    <div
      role="group"
      aria-label={t("languageToggleAria")}
      className="flex items-center rounded-full border border-stone-700 bg-stone-900/70 p-0.5 text-xs font-medium backdrop-blur"
    >
      {(["pt", "en"] as const).map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => setLang(option)}
          aria-pressed={lang === option}
          className={
            lang === option
              ? "rounded-full bg-accent px-2.5 py-1 text-white"
              : "rounded-full px-2.5 py-1 text-stone-400 transition hover:text-stone-100"
          }
        >
          {option.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
