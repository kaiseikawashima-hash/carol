"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  className?: string;
  /** ミリ秒。カードを順に出したいときに使う */
  delay?: number;
}

/**
 * スクロールで一度だけ静かにフェードインさせるラッパー。
 * prefers-reduced-motion 環境では motion-reduce ユーティリティにより
 * アニメーションなしで常時表示になる。
 */
export default function FadeIn({ children, className = "", delay = 0 }: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={delay > 0 ? { transitionDelay: `${delay}ms` } : undefined}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } motion-reduce:translate-y-0 motion-reduce:opacity-100 ${className}`}
    >
      {children}
    </div>
  );
}
