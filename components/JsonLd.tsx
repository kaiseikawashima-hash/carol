import site from "@/data/site.json";

/**
 * schema.org Restaurant 構造化データ(ローカル検索対策)。
 * TODO: 要確認 — 営業時間確定後に openingHoursSpecification を、
 * 予算感確定後に priceRange を追加する。
 */
export default function JsonLd({ siteUrl }: { siteUrl: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    alternateName: [site.alias, site.aliasRomaji],
    url: siteUrl,
    telephone: "+81-544-26-0730",
    servesCuisine: ["居酒屋", "Izakaya"],
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
