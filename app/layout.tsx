import type { Metadata } from "next";
import { Noto_Sans_JP, Shippori_Mincho } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n";
import JsonLd from "@/components/JsonLd";

const shipporiMincho = Shippori_Mincho({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-shippori-mincho",
  display: "swap",
});

const notoSansJp = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

// TODO: Vercel デプロイ後、環境変数 NEXT_PUBLIC_SITE_URL に本番URLを設定する(README参照)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const title = "食酒房 客炉留（キャロル）｜富士宮・浅間大社近くの和風居酒屋";
const description =
  "静岡県富士宮市の和風居酒屋「食酒房 客炉留（きゃくろとめ／キャロル）」。煮込みハンバーグ、お通しのモツ煮、唐揚げと気取らないお酒。富士山本宮浅間大社のすぐ近く、友達の家のようにくつろげるお店です。";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: "食酒房 客炉留（キャロル）",
    title,
    description,
    images: [
      {
        url: "/images/placeholder_hero.png",
        width: 1536,
        height: 1024,
        alt: "食酒房 客炉留（キャロル）店内イメージ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // lang は言語切替時にクライアント側で更新される(lib/i18n.tsx)
    <html lang="ja" className={`${shipporiMincho.variable} ${notoSansJp.variable} antialiased`}>
      <body>
        <JsonLd siteUrl={siteUrl} />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
