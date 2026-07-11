"use client";

import { useI18n } from "@/lib/i18n";
import LangSwitcher from "@/components/LangSwitcher";

const NAV_ITEMS = [
  { href: "#about", key: "header.about" },
  { href: "#menu", key: "header.menu" },
  { href: "#access", key: "header.access" },
] as const;

/** 固定ヘッダー。店名・アンカーナビ・言語切替 */
export default function Header() {
  const { t } = useI18n();

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-sumi/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-baseline gap-2 text-washi">
          <span className="font-mincho text-lg font-semibold tracking-widest sm:text-xl">
            客炉留
          </span>
          <span className="text-[10px] tracking-[0.25em] text-washi/70 sm:text-xs">
            CAROL
          </span>
        </a>
        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-washi/85 transition-colors hover:text-akari"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>
        <LangSwitcher />
      </div>
    </header>
  );
}
