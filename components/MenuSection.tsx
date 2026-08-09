"use client";

import { localized, useI18n } from "@/lib/i18n";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import menuData from "@/data/menu.json";
import type { MenuCategory, MenuData } from "@/lib/types";

const menu = menuData as MenuData;

/**
 * お品書き。data/menu.json を編集するだけで反映される。
 * 固定メニューを持たないため items は現在空。カテゴリの枠だけ用意してあり、
 * 実際のメニュー(特にドリンク)が決まり次第 items に追記すれば一覧表示に切り替わる。
 */
export default function MenuSection() {
  const { t } = useI18n();

  return (
    <section id="menu" className="scroll-mt-16 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl">
        <FadeIn>
          <SectionHeading eyebrow="Menu" title={t("menu.heading")} lead={t("menu.lead")} />
        </FadeIn>

        <div className="space-y-12">
          {menu.categories.map((category) => (
            <FadeIn key={category.id}>
              <CategoryBlock category={category} />
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          {/* TODO: 要確認 — 各メニューの価格が確定したら menu.json の price に数値を入れる */}
          <p className="mt-10 text-center text-xs leading-relaxed text-sumi-light/80">
            {t("menu.priceNote")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}

function CategoryBlock({ category }: { category: MenuCategory }) {
  const { t, lang } = useI18n();

  return (
    <div>
      <h3 className="font-mincho flex items-center gap-3 text-xl font-semibold tracking-widest">
        <span aria-hidden className="h-px w-8 bg-akari" />
        {t(`menu.categories.${category.id}`)}
      </h3>

      {category.items.length === 0 ? (
        <p className="mt-4 pl-11 text-sm text-sumi-light">{t("menu.emptyCategory")}</p>
      ) : (
        <ul className="mt-5 space-y-4">
          {category.items.map((item) => (
            <li
              key={item.id}
              className="flex items-baseline justify-between gap-4 border-b border-dotted border-kinari-line pb-3"
            >
              <div>
                <span className="text-sm font-medium sm:text-base">
                  {localized(item.name, lang)}
                </span>
                {item.description ? (
                  <p className="mt-1 text-xs leading-relaxed text-sumi-light sm:text-sm">
                    {localized(item.description, lang)}
                  </p>
                ) : null}
              </div>
              {item.price !== null ? (
                <span className="shrink-0 text-sm tracking-wider text-sumi-light">
                  ¥{item.price.toLocaleString()}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
