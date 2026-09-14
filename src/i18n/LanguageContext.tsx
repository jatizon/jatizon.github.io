import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { LanguageContext, type Lang } from "./languageContextValue";

const STORAGE_KEY = "lang";

function detectInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "pt") return stored;
  } catch {
    // Storage can be unavailable (private mode) — fall through to the browser guess.
  }
  return typeof navigator !== "undefined" && navigator.language.toLowerCase().startsWith("pt")
    ? "pt"
    : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Best-effort only — the toggle still works for this visit without it.
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggle = useCallback(() => setLangState((prev) => (prev === "en" ? "pt" : "en")), []);

  const value = useMemo(() => ({ lang, setLang, toggle }), [lang, setLang, toggle]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
