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
- テスト: Vitest + Testing Library + Playwright
- リント: ESLint + eslint-plugin-jsx-a11y
- フォーマット: Prettier
- Gitフック: Husky + lint-staged

## ディレクトリ構造

```
src/
├── components/       # UIコンポーネント
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.css
│   │   ├── index.ts
│   │   └── stories/
│   │       └── Button.stories.tsx
│   └── ...
├── test-utils/       # テストユーティリティ
└── index.ts          # エントリーポイント
```

## 開発コマンド

```bash
# Storybook起動
npm run storybook

# テスト実行
npm run test              # 全テスト
npm run test:unit         # ユニットテストのみ
npm run test:storybook    # Storybookテストのみ
npm run test:coverage     # カバレッジ付き

# リント・フォーマット
npm run lint              # ESLintチェック
npm run lint:fix          # ESLint自動修正
npm run format            # Prettier適用
npm run format:check      # フォーマットチェック
```

## コーディング規約

### コンポーネント作成ルール

1. 各コンポーネントは独自のディレクトリを持つ
2. `index.ts` でエクスポートを管理
3. Storybookのストーリーは `stories/` サブディレクトリに配置
4. CSSは同一ディレクトリにコンポーネント名で配置

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

### 推奨事項

#### class名セレクタを使用する

YOU MUST: CSSセレクタは、class名セレクタに統一する。
（ID名セレクタ、タグ名セレクタは詳細度を複雑にするので、`!important` の濫用を未然に防ぐため）
参考: https://developer.mozilla.org/ja/docs/Web/CSS/Specificity

#### 論理プロパティを使用する

物理プロパティではなく、論理プロパティを強く推奨する。

```css
/* ❌ 物理プロパティ（非推奨） */
margin-left: 8px;
margin-right: 8px;
padding-top: 16px;

/* ✅ 論理プロパティ（推奨） */
margin-inline-start: 8px;
margin-inline-end: 8px;
padding-block-start: 16px;
```

右から左に書く言語（RTL）にも対応するため、アクセシブルさを保つ。
参考: https://developer.mozilla.org/ja/docs/Web/CSS/CSS_logical_properties_and_values

#### シンプルなclass名

CSSはコンポーネント単位でカプセル化されるため、シンプルなclass名で運用する。

```css
/* ✅ シンプル（推奨） */
.container { }
.title { }
.button { }
```

### 非推奨事項

以下は、非推奨（禁止ではないが、避けるべき）：

- ID名セレクタ - 詳細度が高すぎる
- タグ名セレクタ - 詳細度の管理が複雑になる
- 物理プロパティ - RTL対応ができない
- BEM - スコープが制御できる環境では不要
- class名への接頭辞 - 例: `l-hoge`, `c-fuga` など

```css
/* ❌ 非推奨 */
#header { }           /* ID名セレクタ */
div { }               /* タグ名セレクタ */
.l-container { }      /* 接頭辞付き */
.block__element--modifier { }  /* BEM */
```

## コミットルール

### フォーマット

```
<type>(<scope>): <概要>
```

- `type` と `scope` は英語
- `概要` は日本語で記述し、変更内容を端的な1文にまとめる

### type（タイプ）

- refactor: UIの見た目が変わらない変更
- fix: UIの見た目が変わる変更、バグ修正
- feat: 新機能追加
- docs: ドキュメントのみの変更
- test: テストの追加・修正
- chore: ビルド・設定の変更

### 例

```
refactor(Button): Buttonコンポーネントのデザイントークンを更新
feat(components): Cardコンポーネントを追加
fix(Header): ホバー状態の色を修正
```

## pre-commitフック

コミット時に以下が自動実行されます：

- `.ts`, `.tsx` ファイル: ESLint + Prettier
- `.js`, `.json`, `.css`, `.md` ファイル: Prettier
