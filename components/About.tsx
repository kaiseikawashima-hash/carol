"use client";

import Image from "next/image";
import { useI18n } from "@/lib/i18n";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";

/** コンセプト紹介セクション */
export default function About() {
  const { t } = useI18n();

  return (
    <section id="about" className="scroll-mt-16 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-2xl">
        <FadeIn>
          <SectionHeading eyebrow="About" title={t("about.heading")} />
        </FadeIn>
        <FadeIn>
          <div className="space-y-6 text-sm leading-loose text-sumi-light sm:text-base">
            <p>{t("about.body1")}</p>
            <p>{t("about.body2")}</p>
            <p>{t("about.body3")}</p>
          </div>
        </FadeIn>
        <FadeIn className="mt-12">
          {/* 生成イメージ画像(実写に差し替え可)。富士山と門前町の情緒を伝える */}
          <div className="relative aspect-[3/2] overflow-hidden rounded-xl border border-kinari-line shadow-sm">
            <Image
              src="/images/placeholder_fujisan.png"
              alt={t("hero.lead")}
              fill
              sizes="(min-width: 768px) 42rem, 90vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
