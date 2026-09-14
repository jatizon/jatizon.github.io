import { useContext } from "react";
import type { Localized } from "../types";
import { LanguageContext, type LanguageContextValue } from "./languageContextValue";

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}

/** Resolves a bilingual content field to the current language's string. */
export function useLocalized(value: Localized): string {
  const { lang } = useLanguage();
  return value[lang];
}

/** Like `useLocalized`, but also accepts a plain string (same in both languages). */
export function useMaybeLocalized(value: string | Localized): string {
  const { lang } = useLanguage();
  return typeof value === "string" ? value : value[lang];
}
