import { CvPanel } from "./components/CvPanel";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Portfolio } from "./components/Portfolio";
import { useElementHeight } from "./hooks/useElementHeight";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useT } from "./i18n/strings";

export default function App() {
  // Projects is capped to Experience's own height and scrolls internally
  // past that, but only once the grid actually lays them out side by side
  // (the md breakpoint, matching the grid's own `md:grid-cols-2`).
  const [experienceRef, experienceHeight] = useElementHeight<HTMLDivElement>();
  const sideBySide = useMediaQuery("(min-width: 768px)");
  const capProjects = sideBySide && experienceHeight !== null;
  const t = useT();

  return (
    <div id="top" className="min-h-screen">
      {/* Visually hidden until focused — lets keyboard/screen-reader users
          skip the sticky header + hero instead of tabbing through them
          every single page load. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        {t("skipToContent")}
      </a>

      <Header />
      <Hero />

      <main id="main" className="mx-auto max-w-[100rem] px-4 lg:px-6 py-12">
        {/* Three columns on desktop, weighted so Experience reads as a real
            column (not a sidebar) and Projects still fits two cards per row. */}
        <div className="grid items-start gap-8 md:grid-cols-2 lg:grid-cols-[3fr_4fr_2fr]">
          <div ref={experienceRef}>
            <Experience />
          </div>

          <div
            // pr-3 only when actually capped, so the scrollbar (once it
            // appears) doesn't sit flush against the cards; uncapped, the
            // extra padding would just waste width on nothing.
            // tabIndex + role/aria-label: this becomes a scrollable region
            // once capped, and a keyboard-only user needs a way to focus
            // and scroll it (arrow keys) without a mouse wheel — WCAG 2.1.1.
            className={`min-h-0${capProjects ? " pr-3" : ""}`}
            style={capProjects ? { maxHeight: experienceHeight, overflowY: "auto" } : undefined}
            tabIndex={capProjects ? 0 : undefined}
            role={capProjects ? "region" : undefined}
            aria-label={capProjects ? t("projectsScrollableAria") : undefined}
          >
            <Portfolio />
          </div>

          <CvPanel />
        </div>
      </main>

      <Footer />
    </div>
  );
}
