/** 対応言語。増やすときは data/i18n.json と lib/i18n.tsx の LANGS も更新する */
export type Lang = "ja" | "en" | "zh-TW" | "ko";

/** 言語ごとのテキスト。メニュー名・説明などに使う */
export interface LocalizedText {
  ja: string;
  en: string;
  "zh-TW": string;
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

export interface MenuCategory {
  id: string;
  items: MenuItem[];
}

export interface MenuData {
  categories: MenuCategory[];
}
