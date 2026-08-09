"use client";

import Image from "next/image";
import { localized, useI18n } from "@/lib/i18n";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import menuData from "@/data/menu.json";
import type { MenuData, MenuItem } from "@/lib/types";

const menu = menuData as MenuData;

/**
 * menu.json で featured: true + image ありの品があれば写真つきで並べる「自慢の一品」。
 * まだ品が無い間は、おまかせスタイルのモットーを訴求するコピーを表示する。
 */
export default function Signatures() {
  const { t, lang } = useI18n();

  const featured: readonly MenuItem[] = menu.categories.flatMap((category) =>
    (category.items ?? []).filter((item) => item.featured && item.image),
  );

  return (
    <section className="bg-washi-deep/60 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <FadeIn>
          <SectionHeading
            eyebrow="Omakase"
            title={t("signatures.heading")}
            lead={t("signatures.lead")}
          />
        </FadeIn>

        {featured.length > 0 ? (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item, index) => (
                <FadeIn key={item.id} delay={index * 120}>
                  <article className="overflow-hidden rounded-xl border border-kinari-line bg-washi shadow-sm">
                    <div className="relative aspect-[4/3]">
                      {/* 生成イメージ画像(実写に差し替え予定) */}
                      <Image
                        src={item.image ?? ""}
                        alt={localized(item.name, lang)}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="font-mincho text-lg font-semibold tracking-wide">
                        {localized(item.name, lang)}
                      </h3>
                      {item.description ? (
                        <p className="mt-2 text-sm leading-relaxed text-sumi-light">
                          {localized(item.description, lang)}
                        </p>
                      ) : null}
                    </div>
                  </article>
                </FadeIn>
              ))}
            </div>

            <FadeIn>
              <p className="mt-8 text-center text-xs text-sumi-light/80">
                {t("signatures.photoNote")}
              </p>
            </FadeIn>
          </>
        ) : (
          <FadeIn>
            <div className="mx-auto max-w-xl space-y-4 text-center text-sm leading-relaxed text-sumi-light sm:text-base">
              <p>{t("signatures.body1")}</p>
              <p>{t("signatures.body2")}</p>
              <p>{t("signatures.body3")}</p>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
