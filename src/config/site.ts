import type {
  Achievement,
  EducationItem,
  ExperienceItem,
  RepoConfig,
  SkillGroup,
  SocialLink,
} from "../types";

/**
 * Everything editable about this page lives here.
 * Adding a social network: push an entry below and make sure `icon` exists in
 * `src/components/icons.tsx`. Adding a project: push a slug to `repos` —
 * ordering on the page follows this array. Prose fields are `{ en, pt }` —
 * repo descriptions are the one exception, kept English-only on purpose (they
 * come straight from GitHub).
 */
export const site = {
  name: "José Alberto Tizon",
  tagline: {
    en: "Computer Engineering student at ITA · automation and backend engineering.",
    pt: "Estudante de Engenharia da Computação no ITA · automação e engenharia backend.",
  },
  githubUser: "jatizon",
  location: {
    en: "São José dos Campos, SP — Brazil",
    pt: "São José dos Campos, SP — Brasil",
  },
  /**
   * Drop a photo in `public/` and point this at it (e.g. "/photo.jpg").
   * While it is null the hero shows a monogram instead.
   */
  photo: "/photo.webp" as string | null,

  cv: {
    // One PDF per language — a real translation, not the same file relabeled.
    // Regenerate the preview images with `npm run cv:preview` after
    // replacing either file.
    files: {
      en: "/cv-en.pdf",
      pt: "/cv-pt.pdf",
    },
    /** First page rendered as images, per language. */
    previews: {
      en: "/cv-en-preview.png",
      pt: "/cv-pt-preview.png",
    },
    /** Higher-resolution renders, loaded only when the lightbox opens. */
    previewsFull: {
      en: "/cv-en-full.png",
      pt: "/cv-pt-full.png",
    },
    /** ISO date, formatted for display by CvPanel. */
    updated: "2026-09-14",
  },

  socials: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jos%C3%A9-alberto-feij%C3%A3o-tizon-31383726b/",
      icon: "linkedin",
    },
    {
      label: "GitHub",
      href: "https://github.com/jatizon",
      icon: "github",
    },
    {
      // Gmail's web compose, so the link opens a browser tab instead of
      // whatever mail client the visitor's OS has registered for mailto:.
      label: "Gmail",
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=tizon.josealberto@gmail.com",
      icon: "gmail",
    },
  ] satisfies SocialLink[],

  experience: [
    {
      role: "Junior Automation Engineer",
      organization: "NG.CASH",
      period: "2026",
      summary: {
        en: "Software and automation for internal processes: Python integrations between systems and APIs, data processing and internal tooling, built with modularization, tests and versioning so the solutions stay reliable and maintainable.",
        pt: "Desenvolvimento de software e automação para processos internos: integrações em Python entre sistemas e APIs, processamento de dados e ferramentas internas, com modularização, testes e versionamento para manter as soluções confiáveis e de fácil manutenção.",
      },
    },
    {
      role: "Intern",
      organization: {
        en: "Kinea Investimentos (Itaú Unibanco Group)",
        pt: "Kinea Investimentos (Itaú Unibanco)",
      },
      period: "2025 — 2026",
      summary: {
        en: "Built a Python pipeline that replaced the manual monthly correction of 200 fund reports — PDF extraction and validation through Azure Document Analyzer, Blob Storage uploads, remote job orchestration, and LLM-assisted consistency checks across Private Equity, Risk and prior-month data.",
        pt: "Desenvolvimento de um pipeline em Python que substituiu a correção manual mensal de 200 relatórios de fundos — extração e validação de dados via Azure Document Analyzer, upload em Blob Storage, orquestração remota de jobs e verificações de consistência assistidas por LLM entre bases de Private Equity, Risco e meses anteriores.",
      },
    },
    {
      role: "Teaching Assistant — Algorithms and Data Structures",
      organization: "ITA",
      period: "2025",
      summary: {
        en: "Automation tooling for grading labs: Python scripts that analyse student submissions, handle recurring errors and verify results automatically, cutting grading time and making the process more reliable.",
        pt: "Ferramentas de automação para correção de laboratórios: scripts em Python que analisam os códigos submetidos pelos alunos, tratam erros recorrentes e verificam resultados automaticamente, reduzindo o tempo de correção e aumentando a confiabilidade do processo.",
      },
    },
    {
      role: "Summer Intern",
      organization: "EMS",
      period: "2025",
      summary: {
        en: "Intelligence, Pricing and Performance team. Prototyped an algorithm that converts monthly per-drug sales targets into per-store KPI goals, processing the underlying data with R and SQL.",
        pt: "Equipe de Inteligência, Preço e Performance. Prototipagem de um algoritmo que converte metas mensais de vendas por medicamento em objetivos de KPI por ponto de venda, com processamento dos dados em R e SQL.",
      },
    },
  ] satisfies ExperienceItem[],

  education: [
    {
      degree: {
        en: "BSc in Computer Engineering",
        pt: "Graduação em Engenharia da Computação",
      },
      school: "ITA — Instituto Tecnológico de Aeronáutica",
      period: "2023 — 2027",
      logo: "/ita-emblem.png",
    },
  ] satisfies EducationItem[],

  achievements: [
    {
      // "major-selection period" = "período de escolha de curso": the term
      // at ITA for when common-track students pick their engineering major.
      text: {
        en: "Ranked 7th out of 141 students at ITA based on performance during the major-selection period (9.301/10 average).",
        pt: "7º colocado entre 141 alunos do ITA com base no desempenho durante o período de escolha de curso (média de 9,301/10).",
      },
    },
    {
      text: {
        en: "Bronze medal at the International Physics Olympiad (IPhO) 2022.",
        pt: "Medalha de bronze na Olimpíada Internacional de Física (IPhO) 2022.",
      },
      href: "https://www.sbfisica.org.br/v1/olimpiada/2022/index.php/15-soif/307-conquistas-na-ipho-2022.html",
    },
  ] satisfies Achievement[],

  skills: [
    {
      label: { en: "Languages", pt: "Linguagens" },
      items: ["Python", "TypeScript", "C++", "SQL"],
    },
    {
      label: { en: "Backend", pt: "Backend" },
      items: ["Node.js", "Fastify", "Prisma", "Redis", "REST APIs"],
    },
    {
      label: { en: "Infrastructure", pt: "Infraestrutura" },
      items: ["Docker", "Nginx", "GitHub Actions", "Azure", "AWS"],
    },
  ] satisfies SkillGroup[],

  // Descriptions here are English-only on purpose: they mirror what GitHub
  // shows for each repo, and GitHub's own field isn't translated either.
  repos: [
    {
      slug: "zipr",
      title: "Zipr",
      // GitHub has no description for this repo; text taken from its README.
      fallbackDescription:
        "URL shortener backend built with Fastify, TypeScript, Prisma and SQLite. Short codes are derived from the database id via Base62 encoding.",
    },
    {
      slug: "dsa-lab-grader",
      title: "DSA Lab Grader",
      fallbackDescription:
        "Auto-corrector built while teaching assistant for an Algorithms and Data Structures course. Combines automation and AI API calls into a correction pipeline, with a generic interface that adapts to new labs.",
    },
    {
      slug: "clash-of-clans-bot",
      title: "Clash of Clans Bot",
      fallbackDescription:
        "Automation bot that uses image matching and a behavior tree to autonomously manage and upgrade a Clash of Clans account.",
    },
    {
      slug: "uncertainty-propagation-calculator",
      title: "Uncertainty Propagation Calculator",
      fallbackDescription:
        "Web app that evaluates mathematical expressions over measured values and their uncertainties, returning the result with propagated error, a history of expressions and copyable output.",
    },
    {
      slug: "chess-game",
      title: "Chess Game",
      fallbackDescription:
        "Chess game with a graphical interface built using SFML in C++ (2023).",
    },
    // Pinned on GitHub but the repository is still empty, so it is hidden here.
    // Uncomment once it has code (and write a description — GitHub has none).
    // {
    //   slug: "c-minus-compiler",
    //   title: "C- Compiler",
    //   description: "...",
    // },
  ] satisfies RepoConfig[],
} as const;
