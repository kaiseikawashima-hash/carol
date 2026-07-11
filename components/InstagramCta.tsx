"use client";

import { useI18n } from "@/lib/i18n";
import FadeIn from "@/components/FadeIn";
import site from "@/data/site.json";

/** Instagram導線。日替わりメニューの発信元としてフォローを促す */
export default function InstagramCta() {
  const { t } = useI18n();

  return (
    <section className="bg-sumi px-6 py-20 text-center text-washi sm:py-24">
      <FadeIn className="mx-auto max-w-xl">
        <p className="text-xs font-medium tracking-[0.35em] text-akari uppercase">Instagram</p>
        <h2 className="font-mincho mt-3 text-2xl font-semibold tracking-wide sm:text-3xl">
          {t("instagram.heading")}
        </h2>
        <p className="mt-5 text-sm leading-relaxed text-washi/80 sm:text-base">
          {t("instagram.body")}
        </p>
        <a
          href={site.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-shu to-akari px-8 py-3.5 text-sm font-medium text-washi shadow-lg transition-opacity hover:opacity-90"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="0.9" className="fill-current stroke-none" />
          </svg>
          {t("instagram.action")}
        </a>
        <p className="mt-4 text-xs tracking-wider text-washi/60">{site.instagramHandle}</p>
      </FadeIn>
    </section>
  );
}
