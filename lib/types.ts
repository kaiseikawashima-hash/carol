/** 対応言語。増やすときは data/i18n.json と lib/i18n.tsx の LANGS も更新する */
export type Lang = "ja" | "en" | "ko";

/** 言語ごとのテキスト。メニュー名・説明などに使う */
export interface LocalizedText {
  ja: string;
  en: string;
  ko: string;
}

export interface MenuItem {
  id: string;
  name: LocalizedText;
  description?: LocalizedText;
  /** 円。未確定は null(画面には表示されない) TODO: 要確認 — 各メニューの価格 */
  price: number | null;
  /** /public 配下のパス。自慢の一品セクションで使用 */
  image?: string;
  /** true の場合「自慢の一品」セクションに写真つきで表示される */
  featured?: boolean;
}

/** 価格1行分。サイズ・容器違いなど、1品に複数持てる */
export interface PriceOption {
  /** "中"/"大"/"グラス"/"ボトル"/"1合" など。単一価格の品は省略可 */
  label?: LocalizedText;
  /** 円。free: true のときは省略可 */
  price?: number;
  /** true で価格の後ろに「〜」(以上)を表示 */
  from?: boolean;
  /** true で価格の代わりに「無料」を表示 */
  free?: boolean;
}

/** お飲み物の1品。名前+価格(1つ以上) */
export interface DrinkItem {
  id: string;
  name: LocalizedText;
  prices: PriceOption[];
}

/** お飲み物のカテゴリ内グループ(例: ビール、樽ハイ) */
export interface DrinkGroup {
  id: string;
  heading: LocalizedText;
  /** 見出しに添える価格表記(例:「各500円」)。フレーバー羅列型で使用 */
  headingNote?: LocalizedText;
  /** フレーバー等を単純に列挙するだけの型。価格は headingNote 側で表現 */
  flavors?: LocalizedText[];
  /** 通常の名前+価格リスト型 */
  items?: DrinkItem[];
  /** 割り方などの補足テキスト */
  note?: LocalizedText;
}

export interface MenuCategory {
  id: string;
  /** 単純な名前+価格の列挙(現状「お料理」で使用) */
  items?: MenuItem[];
  /** グループ単位の一覧(現状「お飲み物」で使用) */
  groups?: DrinkGroup[];
}

export interface MenuData {
  categories: MenuCategory[];
}
