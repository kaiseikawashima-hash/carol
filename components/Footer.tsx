"use client";

import { useI18n } from "@/lib/i18n";
import site from "@/data/site.json";
import type { Lang } from "@/lib/types";

export default function Footer() {
  const { t, lang } = useI18n();
  const address = site.address[lang as Lang] ?? site.address.ja;

  return (
    <footer className="bg-sumi px-6 py-14 text-center text-washi/75">
      <p className="font-mincho text-xl font-semibold tracking-[0.2em] text-washi break-keep">
        食酒房 客炉留
      </p>
      <p className="mt-2 text-xs tracking-[0.25em] text-washi/60 break-keep">
        {site.alias} / {site.aliasRomaji}
      </p>
      <p className="mt-5 text-sm">{t("footer.tagline")}</p>
      <p className="mt-2 text-xs leading-relaxed">
        {address}
        <span className="mx-2" aria-hidden>
          |
        </span>
        <a href={`tel:${site.phoneTel}`} className="underline underline-offset-4 hover:text-akari">
          {site.phoneDisplay}
        </a>
      </p>
      <p className="mt-6 text-[11px] text-washi/50">{t("footer.photoNote")}</p>
      <p className="mt-2 text-[11px] text-washi/50">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
