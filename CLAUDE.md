# CLAUDE.md

このファイルは、Claude AIがこのリポジトリを理解するためのコンテキストを提供します。

## プロジェクト概要

**mitsubachi-ui-react** は、React 19ベースのデザインシステムコンポーネントライブラリです。

コンポーネント構築には、基本的にBase UIを使用します。Base UIで対応できない部分はWeb Componentsで実装します。

## 技術スタック

- フレームワーク: React 19
- UIライブラリ: Base UI（ヘッドレスUIコンポーネント）
- Web Components: Base UIで対応できない場合に使用
- 言語: TypeScript
- ビルドツール: Vite
- UIドキュメント: Storybook 10
- テスト: Vitest + Playwright + Testing Library
- リント: ESLint + eslint-plugin-jsx-a11y
- フォーマット: Prettier
- Gitフック: Husky + lint-staged

## ディレクトリ構造

```
src/
├── components/             # UIコンポーネント
│   ├── icon-button/        # kebab-case ディレクトリ
│   │   ├── IconButton.tsx  # PascalCase コンポーネントファイル
│   │   ├── icon-button.module.css  # CSS Modules
│   │   └── index.ts        # エクスポート
│   └── ...
├── icons/                  # SVGアイコンコンポーネント
├── test-utils/             # テストユーティリティ
└── index.ts                # エントリーポイント
stories/                    # Storybook（src外のルートに配置）
├── icon-button/
│   └── IconButton.stories.tsx
└── ...
```

## 開発コマンド

```bash
# Storybook起動
pnpm storybook

# テスト実行
pnpm test              # 全テスト
pnpm test:unit         # ユニットテストのみ
pnpm test:storybook    # Storybookテストのみ
pnpm test:coverage     # カバレッジ付き

# リント・フォーマット
pnpm lint              # ESLintチェック
pnpm lint:fix          # ESLint自動修正
pnpm format            # Prettier適用
pnpm format:check      # フォーマットチェック
```

## コーディング規約

> 詳細な実装ガイドは [ai-guide/](./ai-guide/index.md) を必ず参照。

### コンポーネント作成ルール

1. 各コンポーネントは `src/components/<kebab-case>/` に独自のディレクトリを持つ
2. `index.ts` でエクスポートを管理
3. Storybookのストーリーはルートの `stories/<kebab-case>/` に配置
4. CSSは同一ディレクトリに `<kebab-case>.module.css` で配置

### Storybook運用

YOU MUST: 各コンポーネントの状態は、Storybook Pseudo Statesを使って各storyを用意する。

- hover、focus、active等の擬似状態をStorybookで可視化
- 各状態のビジュアルテストを可能にする

### アクセシビリティ

- `eslint-plugin-jsx-a11y` による自動チェックを実施
- WCAG 2.2準拠を目指す
- IMPORTANT: HTMLをセマンティックに記述することで、一定レベルのアクセシビリティを確保する

## レスポンシブ対応

- IMPORTANT: ミツバチは**PCファースト**で設計されています。

### ブレイクポイント

| デバイス | サイズ |
| --- | --- |
| スマホ | 0 - 720px |
| タブレット & デスクトップ | 721px - |

- YOU MUST: ブレイクポイントは**1箇所のみ**（720px）を使用する
- YOU MUST: スマホ版は**最小360px**でレイアウトが崩れないことを保証する
- 320pxは保証対象外（ユーザーが少ないため）

### コンポーネントのモバイル対応

コンポーネントの `viewport` プロパティで、desktop用とphone用を管理します。

```tsx
// 例
<Component viewport="desktop" />
<Component viewport="phone" />
```

## CSS設計方針

> 詳細は [ai-guide/styling.md](./ai-guide/styling.md) を参照。

### 必須ルール

- YOU MUST: CSSセレクタは**class名セレクタに統一**する（ID名・タグ名セレクタは使用しない）
- YOU MUST: **論理プロパティ**を使用する（`margin-inline-start` 等。物理プロパティは非推奨）
- YOU MUST: コンポーネントの状態は**CSS擬似クラス**で実装する（`:hover`, `:active`, `:disabled`）
- YOU MUST: フォーカススタイルには**`:focus-visible`**を使用する（`:focus` は使用しない）
- CSS Modules でスコープ化するため、**シンプルなclass名**を使う（BEM・接頭辞は不要）

### 非推奨事項

ID名セレクタ、タグ名セレクタ、物理プロパティ、BEM、class名への接頭辞（`l-hoge` 等）

## コミットルール

### フォーマット

```
<type>(<scope>): <概要>
```

- `type` と `scope` は英語
- `概要` は日本語で記述し、変更内容を端的な1文にまとめる

### コミットメッセージの書き方

YOU MUST: コミットメッセージの`<概要>`部分は以下のルールに従う：

- **日本語で記述する**
- **やったことがわかるように書く**（実装内容や変更内容を具体的に）
- **端的な1文にまとめる**（簡潔で明確に）

```bash
# ✅ 良い例
refactor(IconButton): フォーカススタイルを:focus-visibleに変更
feat(Tag): LinkTagコンポーネントを追加
fix(TextArea): ホバー時のボーダー色が正しく表示されない問題を修正

# ❌ 悪い例
refactor(IconButton): 修正  # 何を修正したか不明
feat(Tag): 追加  # 何を追加したか不明
fix(TextArea): バグ修正  # どんなバグか不明
```

### type（タイプ）

- refactor: UIの見た目が変わらない変更
- fix: UIの見た目が変わる変更、バグ修正
- feat: 新機能追加
- docs: ドキュメントのみの変更
- test: テストの追加・修正
- chore: ビルド・設定の変更

### 例

```
refactor(IconButton): デザイントークンをCSS変数に置き換え
feat(Snackbar): Snackbarコンポーネントを追加
fix(Tooltip): ホバー時の表示位置ずれを修正
```

## pre-commitフック

コミット時に以下が自動実行されます：

- `.ts`, `.tsx` ファイル: ESLint + Prettier
- `.js`, `.json`, `.css`, `.md` ファイル: Prettier

## ワークフロー・オーケストレーション

### 1. Plan Node Default
- 3ステップ以上、または設計判断を含む非自明なタスクは必ずプランモードに入る
- 問題が起きたら無理に進めず、すぐ停止して再プランする
- ビルドだけでなく検証工程にもプランモードを使う
- 曖昧さを減らすため、最初に詳細な仕様を書く

### 2. サブエージェント戦略
- メインのコンテキストを綺麗に保つため積極的にサブエージェントを使う
- 調査・探索・並列分析はサブエージェントに任せる
- 複雑な問題にはサブエージェントで計算資源を多く投下する
- 1サブエージェント1タスクで集中実行

### 3. 自己改善ループ
- ユーザーから修正を受けたら必ず `.claude/skills/lessons.md` にパターンを追記（未作成の場合は新規作成）
- 同じミスを防ぐルールを自分で作る
- ミス率が下がるまで徹底的に改善を繰り返す
- セッション開始時に関連プロジェクトの教訓を見直す

### 4. 完了前の検証
- 動作確認なしに完了扱いにしない
- 必要に応じて main と変更差分を確認する
- 「スタッフエンジニアが承認するか？」と自問する
- ログ確認・正しさの証明を行う

### 5. エレガンスの追求（バランス重視）
- 重要な変更では「より美しい方法はないか？」と立ち止まる
- ハックっぽい修正なら、最善の解決策を再実装する
- 単純な修正では過度な設計をしない
- 提出前に自分の仕事を疑う
