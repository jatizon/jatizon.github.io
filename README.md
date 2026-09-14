# personal-page

Personal page, bilingual (EN/PT): a hero with photo, Stack, Education and
Achievements, projects pulled live from the GitHub API, an experience
timeline, and a downloadable CV — one PDF per language.

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build
npm run lint
```

## Editing content

Everything editable lives in [`src/config/site.ts`](src/config/site.ts):

- **Name, photo, GitHub user, location** — top of the file. `photo` is `null`
  until you drop an image in `public/` and point it there; the hero falls
  back to a monogram (initials) until then.
- **Social links** — push an entry to `socials`. The `icon` value must exist
  in `src/components/icons.tsx` (`linkedin`, `github`, `gmail`, `email`, `x`,
  `website`), where new SVGs are also added, and in
  `src/components/brandColors.ts`.
- **Experience, education, achievements, skill group labels** — these are
  bilingual: `{ en: "...", pt: "..." }`. Job titles, company names and
  technology names are plain strings by default (not translated — they're
  proper nouns), but `organization` also accepts `{ en, pt }` for the rare
  case where a qualifier differs between languages (see the Kinea entry).
  Rendered by `Experience.tsx` and, for Education/Achievements/Stack, inside
  `Hero.tsx` and `Skills.tsx`.
- **Projects** — push a `{ slug }` to `repos`; page order follows this array.
  Language and star counts come from the GitHub API at runtime. For the
  description text: `description` overrides GitHub, `fallbackDescription` is
  used only when GitHub has none or the API is unreachable. Descriptions are
  English-only on purpose — they mirror what GitHub shows.

## Languages (EN/PT)

The toggle in the header switches the whole page between English and
Portuguese:

- `src/i18n/languageContextValue.ts` + `LanguageContext.tsx` hold the
  provider (wraps `<App>` in `main.tsx`), detect the initial language from
  `localStorage` then `navigator.language`, and persist changes.
- `src/i18n/useLanguage.ts` exports `useLanguage()` (current language +
  setters), `useLocalized(value)` (resolves a `{ en, pt }` field to a plain
  string), and `useMaybeLocalized(value)` for fields that accept either a
  plain string or `{ en, pt }`.
- `src/i18n/strings.ts` holds UI chrome — button labels, nav items, headings —
  that isn't part of José's content. Add a key there, then call
  `t("thatKey")` via `useT()`.

## CV PDFs

Two files, one per language — `public/cv-en.pdf` and `public/cv-pt.pdf` are
real translations, not the same PDF relabeled. `CvPanel` and the hero's
"Download CV" button pick the right one from `site.cv.files[lang]`.

After replacing either PDF:

```bash
npm run cv:preview   # re-renders both languages' preview + lightbox PNGs
```

It needs `poppler-utils` (`pdftoppm`) installed. The panel shows the preview
PNG as a clickable image, so a new PDF without a new preview leaves a stale
image on the page. The "Last updated" line comes from `site.cv.updated` (one
shared ISO date, formatted per-language by `CvPanel`).

## GitHub data

The unauthenticated GitHub API allows 60 requests/hour per IP. The last
successful response is cached in `localStorage`, and if a request fails the
page falls back to that cache and then to the config entry, so it never shows
an error or an empty list (see `src/hooks/useRepos.ts`).

## Analytics

Basic, privacy-respecting traffic telemetry via
[GoatCounter](https://www.goatcounter.com/) — free, no cookies, no personal
data collected, and it skips counting automatically when the visitor's
browser sends `Do Not Track` or when running on `localhost`. No backend of
our own is involved; it's a single `<script>` tag in `index.html`.

**One manual step needed to activate it**: create a free site at
goatcounter.com and swap `REPLACE-WITH-YOUR-CODE` in `index.html` for the
code you chose. Stats then live at `https://<that code>.goatcounter.com`.

## Layout notes

- Stack and the Education/Achievements column are grouped in `Hero.tsx` so
  `lg:items-stretch` sizes them against each other: whichever is naturally
  shorter grows to match the taller one (blank space at the bottom), and
  neither is ever asked to shrink below its content — nothing in that pair
  scrolls.
- In the three-column grid below the hero, Projects is capped to Experience's
  own rendered height (`useElementHeight` + `useMediaQuery` in `App.tsx`) and
  scrolls internally past that — CvPanel is uninvolved in that comparison.

## Credits

- The Gmail mark in `src/components/icons.tsx` is a Google trademark, used to
  label the contact link.
- `public/ita-emblem.png` — the ITA emblem, supplied by José; background
  made transparent for use on a dark card.
