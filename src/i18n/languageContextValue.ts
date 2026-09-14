import { createContext } from "react";

export type Lang = "en" | "pt";

export interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);
