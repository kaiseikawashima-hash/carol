"use client";

import { localized, useI18n } from "@/lib/i18n";
import FadeIn from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";
import menuData from "@/data/menu.json";
import type { DrinkGroup, DrinkItem, MenuCategory, MenuData, PriceOption } from "@/lib/types";

const menu = menuData as MenuData;

/**
 * お品書き。data/menu.json を編集するだけで反映される。
 * 「お料理」は固定メニューを持たないため items は現在空(おまかせのモットー訴求を表示)。
 * 「お飲み物」は groups(カテゴリ内グループ)構造で実際のドリンクメニューを表示する。
 */
export default function MenuSection() {
  const { t } = useI18n();

  return (
    <section id="menu" className="scroll-mt-16 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
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
          {/* TODO: 要確認 — お料理メニューが確定したら menu.json の food.items に追記する */}
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
  const items = category.items ?? [];

  return (
    <div>
      <h3 className="font-mincho flex items-center gap-3 text-xl font-semibold tracking-widest">
        <span aria-hidden className="h-px w-8 bg-akari" />
        {t(`menu.categories.${category.id}`)}
      </h3>

      {category.groups ? (
        <>
          <p className="mt-3 pl-11 text-xs text-sumi-light/80">{t("menu.taxNote")}</p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {category.groups.map((group) => (
              <DrinkGroupCard key={group.id} group={group} />
            ))}
          </div>
        </>
      ) : items.length === 0 ? (
        <p className="mt-4 pl-11 text-sm text-sumi-light">{t("menu.emptyCategory")}</p>
      ) : (
        <ul className="mt-5 space-y-4">
          {items.map((item) => (
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

/** お飲み物1グループ分のカード。フレーバー羅列型と名前+価格リスト型の両方に対応 */
function DrinkGroupCard({ group }: { group: DrinkGroup }) {
  const { lang } = useI18n();

  return (
    <div className="rounded-xl border border-kinari-line bg-washi p-5 shadow-sm">
      <h4 className="font-mincho flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-base font-semibold tracking-wide">
        <span>{localized(group.heading, lang)}</span>
        {group.headingNote ? (
          <span className="text-xs font-normal tracking-normal text-shu">
            {localized(group.headingNote, lang)}
          </span>
        ) : null}
      </h4>

      {group.flavors ? (
        <p className="mt-3 text-sm leading-relaxed text-sumi-light">
          {group.flavors.map((flavor) => localized(flavor, lang)).join(" / ")}
        </p>
      ) : (
        <ul className="mt-3 space-y-3">
          {group.items?.map((item) => <DrinkItemRow key={item.id} item={item} />)}
        </ul>
      )}

      {group.note ? (
        <p className="mt-3 text-xs leading-relaxed text-sumi-light/80">
          {localized(group.note, lang)}
        </p>
      ) : null}
    </div>
  );
}

/** お飲み物1品分。価格が1つだけ(かつラベル無し)なら名前と同じ行に、複数/ラベル付きなら内訳を並べる */
function DrinkItemRow({ item }: { item: DrinkItem }) {
  const { lang } = useI18n();
  const inline = item.prices.length === 1 && !item.prices[0].label;

  return (
    <li>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium">{localized(item.name, lang)}</span>
        {inline ? <PriceTag price={item.prices[0]} /> : null}
      </div>
      {!inline ? (
        <ul className="mt-1 space-y-0.5 pl-3">
          {item.prices.map((price, index) => (
            <li key={index} className="flex items-baseline justify-between gap-3 text-xs text-sumi-light">
              <span>{price.label ? localized(price.label, lang) : ""}</span>
              <PriceTag price={price} />
            </li>
          ))}
        </ul>
      ) : null}
    </li>
  );
}

/** 価格1つ分の表示。free: true なら「無料」バッジ、from: true なら「〜」付き */
function PriceTag({ price }: { price: PriceOption }) {
  const { t } = useI18n();

  if (price.free) {
    return (
      <span className="shrink-0 rounded-full bg-akari/15 px-2 py-0.5 text-xs font-semibold tracking-wide text-shu">
        {t("menu.freeLabel")}
      </span>
    );
  }

  return (
    <span className="shrink-0 text-sm tracking-wider text-sumi-light">
      ¥{(price.price ?? 0).toLocaleString()}
      {price.from ? t("menu.priceFrom") : ""}
    </span>
  );
}
