import { site } from "../config/site";

export function Footer() {
  return (
    <footer className="mx-auto max-w-[100rem] px-4 lg:px-6 pb-10 text-sm text-stone-400">
      <p>
        © {new Date().getFullYear()} {site.name} ·{" "}
        <a
          href={`https://github.com/${site.githubUser}`}
          target="_blank"
          rel="noreferrer noopener"
          className="underline underline-offset-4 hover:text-white"
        >
          @{site.githubUser}
        </a>
      </p>
    </footer>
  );
}
