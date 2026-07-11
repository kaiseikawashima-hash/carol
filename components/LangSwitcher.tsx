"use client";

import { LANGS, LANG_LABELS, useI18n } from "@/lib/i18n";

/** ヘッダーに置く言語切替。選択は localStorage に保存され次回訪問時も維持される */
export default function LangSwitcher() {
  const { lang, setLang } = useI18n();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex items-center gap-0.5 rounded-full border border-washi/25 bg-sumi/40 p-0.5 backdrop-blur-sm"
    >
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`rounded-full px-2 py-1 text-[11px] leading-none whitespace-nowrap transition-colors sm:px-2.5 sm:text-xs ${
            lang === code
              ? "bg-washi text-sumi font-medium"
              : "text-washi/75 hover:text-washi"
          }`}
        >
          {LANG_LABELS[code]}
        </button>
      ))}
    </div>
  );
}
