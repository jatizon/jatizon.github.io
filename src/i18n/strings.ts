import { useLanguage } from "./useLanguage";

/**
 * UI chrome — labels, buttons, headings that belong to the page itself
 * rather than to José's content. Person-specific prose (tagline, experience,
 * achievements...) lives as `Localized` fields in `src/config/site.ts`
 * instead, right next to the English version it's a translation of.
 */
const strings = {
  navProjects: { en: "Projects", pt: "Projetos" },
  navExperience: { en: "Experience", pt: "Experiência" },
  navEducation: { en: "Education", pt: "Educação" },
  socialLinksLabel: { en: "Social links", pt: "Links sociais" },
  sectionsNavLabel: { en: "Sections", pt: "Seções" },

  cvHeading: { en: "CV", pt: "Currículo" },
  cvDescription: {
    en: "Full background — experience, education and skills — in a single PDF.",
    pt: "Histórico completo — experiência, formação e habilidades — em um único PDF.",
  },
  cvClickToEnlarge: { en: "Click to enlarge", pt: "Clique para ampliar" },
  cvDownload: { en: "Download PDF", pt: "Baixar PDF" },
  cvOpenNewTab: { en: "Open the PDF in a new tab", pt: "Abrir o PDF em uma nova aba" },
  cvLastUpdated: { en: "Last updated:", pt: "Atualizado em:" },
  cvOpenAsPdfAria: { en: "Open the CV as a PDF", pt: "Abrir o currículo em PDF" },
  cvFirstPageAlt: { en: "First page of the CV", pt: "Primeira página do currículo" },
  cvFullPageAlt: { en: "Full first page of the CV", pt: "Página completa do currículo" },
  cvClose: { en: "Close", pt: "Fechar" },
  downloadCv: { en: "Download CV", pt: "Baixar currículo" },

  stackHeading: { en: "Stack", pt: "Stack" },
  educationHeading: { en: "Education", pt: "Educação" },
  achievementsHeading: { en: "Achievements", pt: "Conquistas" },

  projectsHeading: { en: "Projects", pt: "Projetos" },
  allRepositories: { en: "All repositories", pt: "Todos os repositórios" },
  reposDegraded: {
    en: "Live GitHub data is unavailable right now, so stars and topics may be missing.",
    pt: "Os dados ao vivo do GitHub estão indisponíveis no momento, então estrelas e tópicos podem estar faltando.",
  },
  liveBadge: { en: "Live", pt: "Ao vivo" },

  experienceHeading: { en: "Experience", pt: "Experiência" },

  languageToggleAria: {
    en: "Switch to Portuguese",
    pt: "Switch to English",
  },
} satisfies Record<string, { en: string; pt: string }>;

type StringKey = keyof typeof strings;
const dict: Record<StringKey, { en: string; pt: string }> = strings;

export function useT() {
  const { lang } = useLanguage();
  return (key: StringKey): string => dict[key][lang];
}
