"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import site from "@/data/site.json";

/** ファーストビュー。店名・キャッチ・電話/Instagram導線 */
export default function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className="relative flex min-h-[92svh] items-center justify-center overflow-hidden">
      {/* 背景: 生成イメージ画像(実写に差し替え予定)。README「画像の差し替え方法」参照 */}
      <Image
        src="/images/placeholder_hero.png"
        alt={t("hero.imageAlt")}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-sumi/75 via-sumi/40 to-sumi/80" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 pt-24 pb-16 text-center text-washi">
        <p className="text-xs tracking-[0.4em] text-washi/85 sm:text-sm">{t("hero.genre")}</p>

        <h1 className="mt-6">
          <span className="font-mincho block text-4xl font-semibold tracking-[0.08em] break-keep drop-shadow-md sm:text-6xl sm:tracking-[0.12em] md:text-7xl">
            食酒房 客炉留
          </span>
          <span className="mt-4 block text-sm tracking-[0.3em] text-washi/90 break-keep sm:text-base">
            {site.alias} / {site.aliasRomaji}
          </span>
        </h1>

        <p className="font-mincho mx-auto mt-8 max-w-xl text-lg leading-relaxed sm:text-xl">
          {t("hero.catch")}
        </p>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-washi/85 sm:text-base">
          {t("hero.lead")}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <a
            href={`tel:${site.phoneTel}`}
            className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-shu px-8 py-3.5 text-sm font-medium text-washi shadow-lg transition-colors hover:bg-akari sm:w-auto"
          >
            <PhoneIcon />
            <span>
              {t("hero.call")}
              <span className="ml-2 tracking-wider">{site.phoneDisplay}</span>
            </span>
          </a>
          <a
            href={site.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full max-w-xs items-center justify-center gap-2 rounded-full border border-washi/60 px-8 py-3.5 text-sm font-medium text-washi backdrop-blur-sm transition-colors hover:border-akari hover:text-akari sm:w-auto"
          >
            <InstagramIcon />
            {t("hero.instagram")}
          </a>
        </div>
      </div>
    </section>
  );
}

function PhoneIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.8 21 3 13.2 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1l-2.22 2.2Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" className="fill-current stroke-none" />
    </svg>
  );
}
