# 食酒房 客炉留（キャロル）公式ランディングページ

静岡県富士宮市の創作居酒屋「食酒房 客炉留（キャロル）」の1ページ完結のホームページです。
日本語・英語・韓国語の3言語に対応しています。

- 技術構成: Next.js (App Router) + TypeScript + Tailwind CSS
- ホスティング: Vercel（無料プランでOK）

---

## 1. ローカルで表示する方法

パソコンに [Node.js](https://nodejs.org/ja)（LTS版）が入っていれば動きます。

```bash
# 1) このフォルダでターミナルを開き、初回のみ実行
npm install

# 2) 開発サーバーを起動
npm run dev
```

ブラウザで `http://localhost:3000` を開くとページが表示されます。
ファイルを保存すると自動で画面に反映されます。終了は `Ctrl + C` です。

## 2. Vercel にデプロイする方法

1. このフォルダを GitHub にプッシュする（プライベートリポジトリでOK）
2. [vercel.com](https://vercel.com) にGitHubアカウントでログイン
3. 「Add New → Project」でこのリポジトリを選び、設定は**何も変えずに** Deploy を押す
4. 数分で `https://〜.vercel.app` のURLが発行される

デプロイ後にやること:

- Vercel の **Settings → Environment Variables** で
  `NEXT_PUBLIC_SITE_URL` に発行されたURL（例: `https://carol.vercel.app`）を設定して再デプロイ。
  → SNSでシェアしたときの画像（OGP）や検索エンジン向け情報が正しいURLになります。

以降は GitHub にプッシュするたびに自動で再デプロイされます。

## 3. 店舗情報の更新方法

**`data/site.json`** を開いて値を書き換えるだけです。

| 変えたいもの | 場所 |
|---|---|
| 電話番号 | `phoneDisplay`（表示用）と `phoneTel`（発信リンク用・国際表記） |
| 住所 | `address` の各言語 |
| Instagram | `instagramUrl` / `instagramHandle` |
| 地図の位置 | `geo` と `links` 内のURL（緯度,経度を書き換え） |

営業時間・定休日などの**文章**は多言語のため **`data/i18n.json`** にあります。
`info.hoursValue` / `info.closedValue` を3言語（ja / en / ko）ぶん書き換えてください。

## 4. メニュー（特にドリンク）の追加方法

当店は固定のグランドメニューを持たず、その日の仕入れでいちばん良い料理を出すスタイルのため、
現在 `data/menu.json` の `items` はすべて空にしてあり、画面にはモットー訴求のコピーが表示されています。
実際のメニュー（特にドリンク）が決まり次第、**`data/menu.json`** を編集すれば自動で一覧表示に切り替わります。
「お飲み物」（`"id": "drinks"`）の `items` に、次の形をコピーして追加します。

```json
{
  "id": "lemon-sour",
  "name": {
    "ja": "レモンサワー",
    "en": "Lemon Sour",
    "ko": "레몬 사와"
  },
  "price": 450
}
```

- `price` が決まっていなければ `null` にすると価格欄が非表示になります
- `description`（説明文）と `image`（写真）は省略できます
- `featured: true` を付けると「自慢の一品」セクションにも写真つきで表示されます（`image` 必須）

## 5. 言語の追加方法

例としてフランス語（`fr`）を足す場合:

1. `data/i18n.json` — `"ja"` のブロックを丸ごとコピーして `"fr"` を作り、翻訳する
2. `data/menu.json` — 各 `name` / `description` に `"fr"` を足す
3. `data/site.json` — `address` に `"fr"` を足す
4. `lib/types.ts` — `Lang` に `"fr"` を追加
5. `lib/i18n.tsx` — `LANGS` に `"fr"`、`LANG_LABELS` に `fr: "Français"` を追加

これだけでヘッダーの言語切替に自動で表示されます。

## 6. 画像の差し替え方法（実写ができたら）

現在の画像は **AI生成の仮イメージ**です（ファイル名が `placeholder_` で始まります）。
実写ができたら `public/images/` 内の**同じファイル名のまま**上書きしてください。コード変更は不要です。

| ファイル | 使われている場所 | 推奨サイズ・比率 |
|---|---|---|
| `placeholder_hero.png` | トップの背景・SNSシェア画像 | 横長 1536×1024 以上 |
| `placeholder_hamburg.png` | 自慢の一品用の予備画像（現在メニュー未掲載のため未使用。`data/menu.json` に写真つきメニューを追加すると使える） | 4:3（1024×768 以上） |
| `placeholder_motsuni.png` | 同上（未使用の予備画像） | 4:3 |
| `placeholder_karaage.png` | 同上（未使用の予備画像） | 4:3 |
| `placeholder_beer.png` | 同上（未使用の予備画像） | 正方形 |
| `placeholder_fujisan.png` | お店について（富士山の風景） | 横長 3:2 |

ファイル名を変えたい場合は `data/menu.json` の `image` と `components/Hero.tsx` / `app/layout.tsx` 内のパスも合わせて変更します。

## 7. オーナーに確認すべきこと（TODO一覧）

ネット上に古い情報しかなく、**未確認のまま仮置き**している項目です。
確認できたら以下の場所を更新してください（コード内にも `TODO: 要確認` コメントがあります）。

| 項目 | 現在の仮の値 | 更新する場所 |
|---|---|---|
| 席数・個室 | 未掲載 | 確定後 `components/ShopInfo.tsx` に行を追加 |
| 駐車場 | 「お電話でご確認ください」と表示中 | `data/i18n.json` → `access.routes`（3言語） |
| 予算感 | 未掲載 | 確定後 `components/JsonLd.tsx` の `priceRange` にも追加 |
| 各メニューの価格 | すべて非表示（`null`） | `data/menu.json` → 各 `price` |
| 車での所要時間 | 「約15〜20分（目安）」 | `data/i18n.json` → `access.routes`（3言語） |

## フォルダ構成

```
app/            ページ本体・全体レイアウト・スタイル
components/     各セクション（Hero, Menu, Access など）
data/           ★ふだん編集するのはここ
  site.json     店舗の基本情報
  menu.json     料理・ドリンク
  i18n.json     3言語の文章
lib/            言語切替のしくみ・型定義
public/images/  写真（placeholder_〜 は仮画像）
```
