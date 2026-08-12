# 作業記録（2026-07-12）

食酒房 客炉留（キャロル）ランディングページの初期構築〜公開までの記録。

| 項目 | 内容 |
|---|---|
| 本番URL | https://carol-topaz.vercel.app |
| GitHub | https://github.com/kaiseikawashima-hash/carol |
| Vercelプロジェクト | kekenikis-projects/carol（GitHub連携済み・mainへのpushで自動デプロイ） |
| 技術構成 | Next.js 16.2.10 (App Router) + TypeScript + Tailwind CSS v4 / 全ページSSG |

---

## 1. 実装内容

### ページ構成（1ページ完結）

ヒーロー → お店について → 自慢の一品 → お品書き → Instagram導線 → 店舗情報 → アクセス → フッター

### 多言語対応（4言語）

- 日本語（デフォルト）/ 英語 / 繁体字中国語 / **韓国語**（依頼時の3言語に、確認のうえ韓国語を追加）
- 自前の軽量i18n（`data/i18n.json` + `lib/i18n.tsx` の Context/フック）。重厚なライブラリは不使用
- 言語切替はヘッダー右上。選択は localStorage に保存され次回も維持。初回はブラウザ言語で自動判定（フォールバックは日本語）
- テキスト参照は `t("hero.catch")` のようなキー経由に統一（将来 next-intl 等へ移行しやすい形）

### データとコードの分離

| ファイル | 役割 |
|---|---|
| `data/site.json` | 店舗基本情報（住所・電話・Instagram・緯度経度・地図リンク） |
| `data/menu.json` | 料理・ドリンク。**ドリンクカテゴリの枠を用意済み**（生ビール・ハイボール・タルハイレモン収録、価格は未確定のため `null`＝非表示） |
| `data/i18n.json` | 4言語の全文言 |

### SEO / OGP

- Metadata API でタイトル・description・OGP・Twitterカードを実装
- `schema.org/Restaurant` の JSON-LD（住所・緯度経度・電話・Instagram）を埋め込み
- 本番URLは環境変数 `NEXT_PUBLIC_SITE_URL` から取得（Vercelに設定済み）

### デザイン

- 生成り（和紙テクスチャはSVGノイズで軽量に）＋墨のダークトーン、差し色に燈色/朱
- 見出しは Shippori Mincho、本文は Noto Sans JP（`next/font` で読み込み）
- スクロール時の控えめなフェードインのみ（`prefers-reduced-motion` 対応）
- スマホファーストのレスポンシブ

## 2. 画像（AI生成の仮イメージ・全6枚）

Codex CLI（imagegenスキル / gpt-5.5）で生成し `public/images/placeholder_*.png` に配置。
実写に差し替える際は**同名ファイルで上書きするだけ**（README第6章参照）。

- `placeholder_hero.png` — 夜の居酒屋店内（1536×1024）: ヒーロー背景・OGP画像
- `placeholder_hamburg.png` / `placeholder_motsuni.png` / `placeholder_karaage.png` — 料理3点（4:3）: 自慢の一品
- `placeholder_beer.png` — 生ビール（正方形）: 予備（現在未表示）
- `placeholder_fujisan.png` — 富士山の夕景（1536×1024）: お店についてセクション

※Codex の Windows サンドボックス補助プログラムが破損していたため、画像生成の実行時のみサンドボックスをバイパスした（プロンプトは本作業で管理した画像生成指示のみ）。

## 3. 調査で確定した事実

- 「富士宮市**東町**」の読みは**ひがしちょう**、郵便番号は **418-0077**（日本郵便・マピオンで確認）
- これに基づき英語住所を "22-11 Higashicho, Fujinomiya, Shizuoka 418-0077, Japan" とした

## 4. 未確定情報（断定を回避した箇所）

営業時間（参考値 18:00〜24:00）・定休日（参考値 日曜・祝日）は2013年頃の情報のため、
画面上は「※最新情報はお電話またはInstagramでご確認ください」の注記付きで表示。
席数・個室・貸切・駐車場・予算・各メニュー価格は**非表示**。

→ 確認すべき項目の一覧と更新場所は **README 第7章「オーナーに確認すべきこと」** にまとめてある。
コード内の該当箇所には `TODO: 要確認` コメントを付けてある。

## 5. 検証結果

- `npm run build` 成功（全ルート静的生成）/ ESLint エラー0
- 4言語の辞書キー構造・メニュー翻訳・住所翻訳の整合性を機械チェックで確認（ALL PASS）

## 8. 追記（2026-08-12）— ヒーロー画像を実写に差し替え

- `placeholder_hero.png` を、店内カウンター席の実写（縦長 941×1672）で同名上書き。ファイル名は変更していない（README第6章の運用どおり）
- `app/layout.tsx` の OGP画像 `width`/`height` を実際の寸法（941×1672）に更新
- `data/i18n.json` の `hero.imageAlt`（日/英/韓）を実写内容に合わせて修正（旧文言は生成イメージ由来の「提灯」を含んでいたため）
- Hero.tsx は `fill` + `object-cover` のためコード変更なし。縦長写真とモバイル表示（縦長ビューポート）のアスペクト比が近く、スマホでは写真がほぼ全体表示される。デスクトップ幅では写真の中央帯（カウンター〜のれん〜棚のあたり）が表示される
- Playwright (`npx playwright screenshot`) でモバイル(390×844)・デスクトップ(1440×900)を実機確認済み
- 本番サイトで確認済み: ページ・全6画像が200 / OGPが本番URLで出力 / JSON-LD出力 / `tel:` リンク / Instagramリンク / Googleマップ埋め込み・リンク

## 6. コミット・デプロイ履歴

1. `0d745d5` Initial commit from Create Next App
2. `b13e376` feat: 食酒房 客炉留(キャロル)のランディングページを実装
3. `dcede47` chore: .vercel を .gitignore に追加
4. ブランチを `master` → `main` にリネームして GitHub へプッシュ
5. Vercel へ本番デプロイ → `NEXT_PUBLIC_SITE_URL` 設定 → 再デプロイ
6. `vercel git connect` で GitHub リポジトリと接続（以後 main への push で自動デプロイ）

## 7. 今後の更新フロー

```
ファイル編集 → git add → git commit → git push
```

これだけで本番に自動反映される。運用手順（メニュー追加・言語追加・画像差し替え等）は README を参照。

## 9. 追記（2026-08-12）— スマホでの不自然な改行を修正

- 症状: 端末幅によって「気軽なひとときを」が「気」「軽なひとときを」のように単語の途中で改行される等、日本語テキストが不自然な位置で折り返される
- `app/globals.css` の `body` に以下を追加(全文言・全言語に効く一括対応):
  - `word-break: keep-all` — 単語(文節)の途中で改行しない。読点(、)や句点(。)の後ろでのみ改行を許可
  - `overflow-wrap: break-word` — `keep-all`だけでは折り返せない(読点等の区切りが無い)長い一続きの文が幅に収まらない場合のフォールバック
  - `line-break: strict` — 行頭に禁則文字が来にくくする補助
- 上記だけでは救えない「読点の無い長い一続きの文がフォールバックで不自然な位置で強制改行される」ケースが2件見つかったため、文言に読点を追加して解消:
  - `about.body3`「…おしゃべりとともにほどいていってください」→「…おしゃべりとともに、ほどいていってください」
  - `signatures.body2`「…お気軽にお申し付けください」→「…お気軽に、お申し付けください」
  - `info.note`「…お電話またはInstagramでご確認ください」→「…お電話、またはInstagramでご確認ください」
- Playwright + `word-break:keep-all` 対応済みブラウザ(Chromium)で幅 320/360/375/390/412/428px を検証。日本語の主要文言(約20箇所)・韓国語の長文3箇所を目視確認し、単語途中や句読点単独での改行が無いことを確認済み
- 英語(スペース区切り)・韓国語(単語間スペース区切り)は `word-break:keep-all` の影響を受けにくく、既存表示に悪影響なし
