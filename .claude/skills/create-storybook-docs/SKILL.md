# Storybookドキュメントページ作成スキル

このスキルは、mitsubachi-ui-reactの各コンポーネントに対して、MDX形式のドキュメントページを生成します。
単なるAPI仕様の羅列ではなく、「いつ使うか」「いつ使わないか」「Speeda AI Agentではどう使うか」を明確にしたガイドを作ることが目的です。

## Use when

- ユーザーが `/create-storybook-docs` コマンドを実行した時
- コンポーネントのドキュメントページ作成を依頼された時
- 新しいコンポーネントを作成した後にドキュメントが必要な時

## 前提条件

### Storybook設定の確認

`.storybook/main.ts` で以下が設定されていることを確認する:

1. `stories` 配列に `'../src/**/*.mdx'` が含まれている
2. `remark-gfm` が `addon-docs` の `mdxCompileOptions.remarkPlugins` に設定されている

```ts
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  stories: [
    './*.mdx',
    '../src/**/*.mdx',                              // ← MDXドキュメントはここで読み込む
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    // ...
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],              // ← GFMテーブル対応
          },
        },
      },
    },
    // ...
  ],
};
```

## ドキュメントの配置

MDXファイルは、対応するコンポーネントソースと同じディレクトリに配置する:

```
src/components/
├── button/
│   └── icon-button/
│       ├── IconButton.tsx          # コンポーネント
│       ├── icon-button.module.css  # スタイル
│       ├── IconButton.mdx          # ← ドキュメントページ
│       └── index.ts
├── checkbox/
│   ├── Checkbox.tsx
│   ├── checkbox.module.css
│   ├── Checkbox.mdx                # ← ドキュメントページ
│   └── index.ts
```

### autodocs を MDX で置き換える

MDXは `<Meta of={Stories} />` でストーリーに紐づけ、COMPONENTS 配下の Docs タブとして表示する。
autodocs ではなく MDX がドキュメントページを担うため:

- MDXで `<Meta of={ComponentStories} />` を使う（`<Meta title="..." />` は使わない）
- ストーリー側の `tags` から `'autodocs'` を削除する（`tags: []`）
- MDXに `<Canvas>` と `<ArgTypes>` を配置し、ストーリープレビューとProps一覧をMDX内で提供する

## 情報収集プロセス

ドキュメントを書く前に、以下の情報源を全て確認する:

1. **コンポーネントソース** (`src/components/<name>/`) — Props定義、JSDoc、実装の詳細
2. **既存ストーリー** (`stories/<name>/`) — バリエーション、使用例、**`meta.parameters.docs.description.component` の記載内容**
3. **CSS Modules** (`src/components/<name>/*.module.css`) — デザイントークン、レスポンシブ対応
4. **Figma** — MCP経由でデザインコンテキストが取得可能であれば参照する
5. **関連コンポーネント** — 類似コンポーネントとの違いを明確にするため、関連するコンポーネントのソースも確認する

### 既存ストーリーからの情報活用

多くのストーリーファイルには `meta.parameters.docs.description.component` にコンポーネントの説明が記載されている。
MDX生成時にこの内容を **ベース情報として活用** する:

- 概要説明 → MDXの冒頭説明に反映
- サイズガイドラインや使い方ルール → バリエーションセクションに反映
- 注意事項（`⚠️` 付き） → アクセシビリティセクションや該当箇所に反映

MDX生成後、ストーリー側の `description.component` は **簡潔な1文の概要のみに整理** する（詳細はMDXに移管されたため）。

### When to Use / When NOT to Use / Service Context の考え方

特に「When to Use / When NOT to Use」と「Service Context」は、コンポーネントの実装だけではわからない。
以下の観点で考える:

- **When to Use**: このコンポーネントが最適解になるユースケースは何か？ どんなUIパターンに合うか？
- **When NOT to Use**: 一見使えそうだが別のコンポーネントが適切なケースは何か？ 類似コンポーネントとの境界線は？
- **Service Context**: Speeda AI Agentの画面のどこで、どんな文脈で使われるか？ ビジネスドメイン固有の使い方は？

## MDXテンプレート

```mdx
import { Meta, Canvas, ArgTypes } from '@storybook/addon-docs/blocks';
import * as ComponentStories from '<ストーリーファイルへの相対パス>';

<Meta of={ComponentStories} />

# コンポーネント名

{/* 1-2文の端的な説明。このコンポーネントが何をするかを敬体で書きます。すでに記載がある場合は加筆しないでください。 */}

- Figma URL : [{コンポーネント名}]({Figma URL}) // 殻にしておいて手入力でもいい

<Canvas of={ComponentStories.Normal} />

{/* ↑ 代表的なストーリーを1つ表示。ストーリー名はコンポーネントによって異なる */}

---

## When to Use

{/* このコンポーネントを使うべき具体的なシーン。箇条書きで数項目 */}

- 〇〇のとき（「〜のとき」で統一）
- 〇〇のとき（「〜のとき」で統一）
- ...

## When NOT to Use

{/* 使うべきでないシーンと、あれば代わりに何を使うか。「→ 代替コンポーネント」の形式で */}
{/* アイコンの使い分け:
     🚫 = 禁則（「必ず〜してください」— 守らないと壊れる・動かない制約）
     ⚠️ = 非推奨（「代わりに〜を使ってください」— 別コンポーネントを推奨） */}

- 🚫 〇〇のとき。必ず [親コンポーネント名](?path=/docs/components-カテゴリ-コンポーネント名--docs) 経由で使用してください
- ⚠️ 〇〇のとき。代わりに [コンポーネント名](?path=/docs/components-カテゴリ-コンポーネント名--docs) を使ってください
- ...

## Service Context — Speeda AI Agent での使い方

{/* Speeda AI Agent固有の使用文脈。具体的な画面や機能を挙げる */}

- ...
- ...

## バリエーション

{/* 主要なvariant/sizeの使い分けガイド。全てを網羅する必要はなく、判断に迷うポイントを重点的に */}

| バリエーション | 用途 |
| --- | --- |
| `primary` | ... |
| `secondary` | ... |

{/* 用途の書き振り、文体は各バリエーションですべて統一します */}
{/* バリエーション一覧のストーリーがあれば Canvas で表示 */}

<Canvas of={ComponentStories.AllVariants} />

## アクセシビリティ

{/* このコンポーネント固有のa11y注意点。汎用的な話は不要、具体的な注意点のみ */}

- ...

## Props

<ArgTypes of={ComponentStories} />

## 関連コンポーネント

{/* 類似・関連するコンポーネントへのリンクと、違いの端的な説明 */}

- [コンポーネント名](?path=/docs/components-カテゴリ-コンポーネント名--docs) : 違いの説明
```

## テンプレートの運用ルール

### 必須セクション

以下の3セクションは全コンポーネントに必須:

- **When to Use**
- **When NOT to Use**
- **Service Context**

これらがドキュメントの核。十分な情報が得られない場合でも、コンポーネントの性質から推論して書く。
ユーザーにレビューしてもらう前提で、推論部分は自然な文体で書き、推測であることを明示しない。

### 必須ブロック

以下のStorybookブロックは全コンポーネントに必須:

- **`<Canvas of={ComponentStories.XXX} />`** — 代表的なストーリーを `# コンポーネント名` 直後に配置
- **`<ArgTypes of={ComponentStories} />`** — Props セクションに配置

### 省略可能セクション

以下は、コンポーネントの特性に応じて省略してよい:

- **バリエーション** — バリエーションが1種類しかない場合は省略
- **アクセシビリティ** — 特記事項がなければ省略
- **関連コンポーネント** — 類似コンポーネントがなければ省略

### 文体

- 日本語で書きます
- 端的に・冗長な説明は避けます
- 「〜しましょう」「〜してください」といった敬体で書きます。体言止めや「〜する」の形は使いません

### リンクのパス規則

関連コンポーネントへのリンクは `components-` プレフィックスを使う（Docs タブは COMPONENTS 配下にあるため）:

```
?path=/docs/components-button-menubutton--docs
?path=/docs/components-chip-filterchip--docs
?path=/docs/components-checkbox--docs
```

## 一括生成モード

ユーザーが「全コンポーネントのドキュメントを作成して」と依頼した場合:

1. `src/components/` 配下の全コンポーネントディレクトリを列挙する
2. 対応する `.mdx` が既に存在するものはスキップする
3. 各コンポーネントについて情報収集 → MDX生成を行う
4. サブエージェントを活用して並列に処理する（1エージェント1コンポーネント）

## 実装手順

1. `.storybook/main.ts` の設定確認（初回のみ）
2. 対象コンポーネントの情報収集（ソース、ストーリー、CSS、関連コンポーネント）
3. **既存ストーリーの `description.component` 内容を確認し、MDXに反映**
4. MDXファイルを `src/components/<name>/` に生成（`<Meta of={Stories} />` パターン）
5. ストーリー側の `tags` から `'autodocs'` を削除し、`description.component` を簡潔な1文に整理
6. Storybookでの表示確認（`pnpm storybook` が起動中であればブラウザで確認）

## チェックリスト

- [ ] `.storybook/main.ts` に `'../src/**/*.mdx'` が含まれている
- [ ] `.storybook/main.ts` に `remark-gfm` が設定されている
- [ ] MDXファイルが `src/components/<name>/` に配置されている
- [ ] `<Meta of={ComponentStories} />` でストーリーに紐づけている
- [ ] ストーリー側の `tags` から `'autodocs'` が削除されている
- [ ] `<Canvas>` で代表的なストーリーを表示している
- [ ] `<ArgTypes>` でProps一覧を表示している
- [ ] When to Use セクションがある
- [ ] When NOT to Use セクションがある（代替コンポーネントへの誘導を含む）
- [ ] Service Context セクションがある
- [ ] 関連コンポーネントへのリンクが `components-` プレフィックスになっている
- [ ] ストーリー側の `description.component` が簡潔な1文に整理されている
