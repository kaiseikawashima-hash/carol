"use client";

import { useI18n } from "@/lib/i18n";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import site from "@/data/site.json";

/**
 * アクセスセクション。各ルートの文面は data/i18n.json の access.routes(配列)。
 * TODO: 要確認 — 徒歩・車の所要時間はすべて概算。確定したら i18n.json を全言語ぶん更新する。
 */
export default function Access() {
  const { t, dict } = useI18n();

  return (
    <section id="access" className="scroll-mt-16 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <FadeIn>
          <SectionHeading eyebrow="Access" title={t("access.heading")} lead={t("access.lead")} />
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2">
          {dict.access.routes.map((route, index) => (
            <FadeIn key={route.title} delay={index * 80}>
              <article className="h-full rounded-xl border border-kinari-line bg-washi p-5 shadow-sm">
                <h3 className="font-mincho flex items-start gap-3 text-base font-semibold tracking-wide sm:text-lg">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-akari/15 text-xs font-bold text-shu"
                  >
                    {index + 1}
                  </span>
                  {route.title}
                </h3>
                <p className="mt-3 pl-9 text-sm leading-relaxed text-sumi-light">{route.body}</p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12">
          <div className="overflow-hidden rounded-xl border border-kinari-line shadow-sm">
            <iframe
              src={site.links.mapEmbed}
              title={t("access.mapTitle")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="aspect-[4/3] w-full sm:aspect-video"
            />
          </div>
          <div className="mt-4 text-center">
            <a
              href={site.links.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-shu underline underline-offset-4 hover:text-akari"
            >
              {t("access.openMap")}
              <span aria-hidden>↗</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
