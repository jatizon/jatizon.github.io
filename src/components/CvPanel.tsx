import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/useLanguage";
import { useT } from "../i18n/strings";
import { site } from "../config/site";

export function CvPanel() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // The full-resolution render is only requested once the lightbox is opened.
  const [zoomRequested, setZoomRequested] = useState(false);
  const t = useT();
  const { lang } = useLanguage();
  const cvFile = site.cv.files[lang];
  const cvPreview = site.cv.previews[lang];
  const cvPreviewFull = site.cv.previewsFull[lang];

  useEffect(() => {
    if (zoomRequested) dialogRef.current?.showModal();
  }, [zoomRequested]);

  const close = () => {
    dialogRef.current?.close();
    setZoomRequested(false);
  };

  return (
    <section aria-labelledby="cv-heading" className="border-t border-stone-800 pt-5">
      <h2 id="cv-heading" className="font-display text-xl font-semibold">
        {t("cvHeading")}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-stone-400">{t("cvDescription")}</p>

      {/* Static first-page render; `npm run cv:preview` regenerates it. */}
      <button
        type="button"
        onClick={() => setZoomRequested(true)}
        aria-label={t("cvOpenAsPdfAria")}
        className="group relative mt-5 block w-full overflow-hidden border border-stone-800 transition hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <img
          src={cvPreview}
          width={680}
          height={880}
          alt={t("cvFirstPageAlt")}
          loading="lazy"
          decoding="async"
          className="block w-full bg-white"
        />
        <span className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/80 to-transparent p-3 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100">
          {t("cvClickToEnlarge")}
        </span>
      </button>

      <a
        href={cvFile}
        download
        className="mt-4 block text-sm font-medium text-stone-100 underline underline-offset-4 hover:text-accent-soft"
      >
        {t("cvDownload")}
      </a>

      <a
        href={cvFile}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-2 block text-sm text-stone-400 underline underline-offset-4 hover:text-accent-soft"
      >
        {t("cvOpenNewTab")}
      </a>

      <p className="mt-5 border-t border-stone-800 pt-4 text-xs text-stone-400">
        {t("cvLastUpdated")}{" "}
        <time dateTime={site.cv.updated}>
          {new Date(`${site.cv.updated}T00:00:00`).toLocaleDateString(
            lang === "pt" ? "pt-BR" : "en-GB",
            { day: "numeric", month: "long", year: "numeric" },
          )}
        </time>
      </p>

      <dialog
        ref={dialogRef}
        onClose={() => setZoomRequested(false)}
        onClick={(event) => {
          // Clicking the backdrop (the dialog itself, outside the image) closes it.
          if (event.target === dialogRef.current) close();
        }}
        className="m-auto max-h-[92vh] max-w-[min(56rem,92vw)] bg-transparent p-0 backdrop:bg-ink/85"
      >
        {zoomRequested && (
          <div className="relative">
            <img
              src={cvPreviewFull}
              alt={t("cvFullPageAlt")}
              className="block h-auto w-full bg-white"
            />
            <button
              type="button"
              onClick={close}
              className="absolute top-3 right-3 border border-stone-700 bg-ink px-3 py-1.5 text-xs font-medium text-white hover:border-stone-400"
            >
              {t("cvClose")}
            </button>
          </div>
        )}
      </dialog>
    </section>
  );
}
