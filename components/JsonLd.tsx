import site from "@/data/site.json";

/**
 * schema.org Restaurant 構造化データ(ローカル検索対策)。
 * TODO: 要確認 — 予算感確定後に priceRange を追加する。
 */
export default function JsonLd({ siteUrl }: { siteUrl: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    alternateName: [site.alias, site.aliasRomaji],
    url: siteUrl,
    telephone: "+81-544-26-0730",
    servesCuisine: ["創作居酒屋", "Creative Izakaya"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "東町22-11",
      addressLocality: "富士宮市",
      addressRegion: "静岡県",
      postalCode: site.postalCode,
      addressCountry: "JP",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.geo.latitude,
      longitude: site.geo.longitude,
    },
    // 定休日は日曜・祝日(事前予約があれば人数により相談可)。祝日の例外はschema.orgでは表現しないため
    // 通常営業日(月〜土)の時間のみを記載する。
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "18:00",
      closes: "23:00",
    },
    hasMap: site.links.googleMaps,
    sameAs: [site.instagramUrl],
    image: `${siteUrl}/images/placeholder_hero.png`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
