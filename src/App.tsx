import { CvPanel } from "./components/CvPanel";
import { Experience } from "./components/Experience";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Portfolio } from "./components/Portfolio";
import { useT } from "./i18n/strings";

export default function App() {
  const t = useT();

  return (
    <div id="top" className="min-h-screen">
      {/* Visually hidden until focused — lets keyboard/screen-reader users
          skip the sticky header + hero instead of tabbing through them
          every single page load. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        {t("skipToContent")}
      </a>

      <Header />
      <Hero />

      <main id="main" className="mx-auto max-w-[100rem] px-4 lg:px-6 py-12">
        {/* Three columns on desktop, weighted so Experience reads as a real
            column (not a sidebar) and Projects still fits two cards per row. */}
        <div className="grid items-start gap-8 md:grid-cols-2 lg:grid-cols-[3fr_4fr_2fr]">
          <Experience />
          <Portfolio />
          <CvPanel />
        </div>
      </main>

      <Footer />
    </div>
  );
}
