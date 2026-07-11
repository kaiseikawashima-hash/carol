"use client";

import type { ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import site from "@/data/site.json";
import type { Lang } from "@/lib/types";

/** 店舗情報セクション。値は data/site.json と data/i18n.json(info.*) から */
export default function ShopInfo() {
  const { t, lang } = useI18n();
  const address = site.address[lang as Lang] ?? site.address.ja;

  const rows: ReadonlyArray<{ label: string; value: ReactNode }> = [
    { label: t("info.rows.name"), value: t("info.nameValue") },
    { label: t("info.rows.genre"), value: t("info.genreValue") },
    {
      label: t("info.rows.address"),
      value: (
        <span>
          {address}
          <a
            href={site.links.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-xs text-shu underline underline-offset-4 hover:text-akari"
          >
            {t("info.openMap")}
          </a>
        </span>
      ),
    },
    {
      label: t("info.rows.phone"),
      value: (
        <a
          href={`tel:${site.phoneTel}`}
          className="tracking-wider text-shu underline underline-offset-4 hover:text-akari"
        >
          {site.phoneDisplay}
        </a>
      ),
    },
    // TODO: 要確認 — 営業時間・定休日は2013年頃の参考値(18:00〜24:00 / 日曜・祝日)。
    // 確定後は data/i18n.json の info.hoursValue / info.closedValue を全言語ぶん更新する。
    { label: t("info.rows.hours"), value: t("info.hoursValue") },
    { label: t("info.rows.closed"), value: t("info.closedValue") },
    { label: t("info.rows.station"), value: t("info.stationValue") },
  ];

  return (
    <section id="info" className="scroll-mt-16 bg-washi-deep/60 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <SectionHeading eyebrow="Information" title={t("info.heading")} />
        </FadeIn>
        <FadeIn>
          <dl className="divide-y divide-kinari-line rounded-xl border border-kinari-line bg-washi px-6 shadow-sm sm:px-8">
            {rows.map((row) => (
              <div key={row.label} className="flex gap-6 py-4 text-sm sm:text-base">
                <dt className="w-20 shrink-0 font-medium text-sumi-light sm:w-24">{row.label}</dt>
                <dd className="leading-relaxed">{row.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs leading-relaxed text-sumi-light/80">{t("info.note")}</p>
          {/* TODO: 要確認 — 席数・個室・貸切可否・駐車場・予算感が確定したら行を追加する */}
        </FadeIn>
      </div>
    </section>
  );
}
