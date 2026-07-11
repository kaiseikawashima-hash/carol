interface SectionHeadingProps {
  /** 英字の飾りラベル(全言語共通のデザイン要素) */
  eyebrow: string;
  title: string;
  lead?: string;
  /** 暗い背景セクションで使うときに true */
  onDark?: boolean;
}

/** 各セクション共通の見出し。明朝の和文見出し+燈色のアクセントバー */
export default function SectionHeading({ eyebrow, title, lead, onDark = false }: SectionHeadingProps) {
  return (
    <div className="mb-10 text-center sm:mb-14">
      <p
        className={`text-xs font-medium tracking-[0.35em] uppercase ${
          onDark ? "text-akari" : "text-shu"
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-mincho mt-3 text-3xl font-semibold tracking-wide sm:text-4xl ${
          onDark ? "text-washi" : "text-sumi"
        }`}
      >
        {title}
      </h2>
      <span aria-hidden className="mx-auto mt-5 block h-px w-12 bg-akari" />
      {lead ? (
        <p
          className={`mx-auto mt-5 max-w-xl text-sm leading-relaxed sm:text-base ${
            onDark ? "text-washi/80" : "text-sumi-light"
          }`}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
