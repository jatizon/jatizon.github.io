import { CvPanel } from "./components/CvPanel";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Portfolio } from "./components/Portfolio";
import { useElementHeight } from "./hooks/useElementHeight";
import { useMediaQuery } from "./hooks/useMediaQuery";

export default function App() {
  // Projects is capped to Experience's own height and scrolls internally
  // past that, but only once the grid actually lays them out side by side
  // (the md breakpoint, matching the grid's own `md:grid-cols-2`).
  const [experienceRef, experienceHeight] = useElementHeight<HTMLDivElement>();
  const sideBySide = useMediaQuery("(min-width: 768px)");
  const capProjects = sideBySide && experienceHeight !== null;

  return (
    <div id="top" className="min-h-screen">
      <Header />
      <Hero />

      <main className="mx-auto max-w-[100rem] px-4 lg:px-6 py-12">
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
            className={`min-h-0${capProjects ? " pr-3" : ""}`}
            style={capProjects ? { maxHeight: experienceHeight, overflowY: "auto" } : undefined}
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
