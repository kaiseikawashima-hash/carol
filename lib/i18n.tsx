"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import i18n from "@/data/i18n.json";
import type { Lang, LocalizedText } from "@/lib/types";

export const LANGS = ["ja", "en", "ko"] as const;

/** 言語切替スイッチャーに表示するラベル(その言語自身の表記で固定) */
export const LANG_LABELS: Record<Lang, string> = {
  ja: "日本語",
  en: "English",
  ko: "한국어",
};

export type Dict = (typeof i18n)["ja"];

const STORAGE_KEY = "carol-lang";
const FALLBACK_LANG: Lang = "ja";

function isLang(value: string | null): value is Lang {
  return LANGS.includes(value as Lang);
}

/** ブラウザ言語から初期言語を推定する(フォールバックは日本語) */
function detectBrowserLang(): Lang {
  const nav = window.navigator.language.toLowerCase();
  if (nav.startsWith("en")) return "en";
  if (nav.startsWith("ko")) return "ko";
  return FALLBACK_LANG;
}

/*
 * 言語状態はモジュールスコープの小さな外部ストアで持ち、
 * useSyncExternalStore で購読する。SSG時は日本語、マウント後に
 * localStorage → ブラウザ言語の順で解決される(ハイドレーション安全)。
 */
let currentLang: Lang | null = null;
const listeners = new Set<() => void>();

function getClientLang(): Lang {
  if (currentLang === null) {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      // プライベートモード等で localStorage が使えない場合はブラウザ言語のみで判定
    }
    currentLang = isLang(stored) ? stored : detectBrowserLang();
  }
  return currentLang;
}

function getServerLang(): Lang {
  return FALLBACK_LANG;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function setStoredLang(next: Lang): void {
  currentLang = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // 保存できなくても表示言語の切替自体は成立させる
  }
  listeners.forEach((listener) => listener());
}

interface I18nContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** 現在の言語の辞書ツリー(配列などの構造化データ用) */
  dict: Dict;
  /** "hero.catch" のようなドット区切りキーで文字列を引く。無ければ日本語にフォールバック */
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

function lookup(tree: unknown, key: string): unknown {
  return key.split(".").reduce<unknown>((node, part) => {
    if (node && typeof node === "object") {
      return (node as Record<string, unknown>)[part];
    }
    return undefined;
  }, tree);
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, getClientLang, getServerLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setStoredLang(next);
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    const dict = (i18n as Record<Lang, Dict>)[lang];
    const t = (key: string): string => {
      const found = lookup(dict, key) ?? lookup(i18n.ja, key);
      return typeof found === "string" ? found : key;
    };
    return { lang, setLang, dict, t };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n は LanguageProvider の内側で使用してください");
  }
  return ctx;
}

/** menu.json などの言語別テキストから現在言語の文字列を取り出す */
export function localized(text: LocalizedText, lang: Lang): string {
  return text[lang] ?? text.ja;
}
