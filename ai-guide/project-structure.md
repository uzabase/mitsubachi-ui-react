# プロジェクト構造

mitsubachi-ui-react のディレクトリ構成、コンポーネント設計パターン、設定ファイル、依存関係をまとめたドキュメントです。

---

## 1. 全体構成

```
mitsubachi-ui-react/
├── src/                   # ライブラリソースコード
│   ├── components/        # UIコンポーネント
│   ├── icons/             # SVGアイコンコンポーネント
│   ├── test-utils/        # テストユーティリティ
│   ├── css.d.ts           # CSS Modules の型定義
│   └── index.ts           # ライブラリエントリーポイント
├── stories/               # Storybookストーリー（srcの外に配置）
├── .storybook/            # Storybook設定
├── .husky/                # Gitフック設定
├── .claude/               # Claude Code設定（コマンド、スキル）
├── ai-guide/              # AI向け実装ガイド
├── tsconfig.json          # TypeScript設定
├── vitest.config.ts       # テスト設定
├── eslint.config.js       # ESLint設定
├── .prettierrc            # Prettier設定
└── package.json           # 依存関係・スクリプト・lint-staged設定
```

---

## 2. コンポーネント設計パターン

### エクスポートの階層

```
src/index.ts                     → export * from './components'
src/components/index.ts          → export * from './<各コンポーネント>'
src/components/<name>/index.ts   → 個別コンポーネントのエクスポート
```

新しいコンポーネントを追加したら、`src/components/index.ts` に `export * from './<name>'` を追加すること。

### パターン A: 単体コンポーネント

最もシンプルな構成。1ファイル = 1コンポーネント。

```
<component-name>/
├── <ComponentName>.tsx
├── <component-name>.module.css
└── index.ts
```

### パターン B: バリアントファミリー

同一カテゴリの複数バリアントをまとめる構成。親ディレクトリの `index.ts` で全バリアントを集約エクスポートする。

```
<category>/
├── index.ts                         # 全バリアントを re-export
├── <variant-a>/
│   ├── <VariantA>.tsx
│   ├── <variant-a>.module.css
│   └── index.ts
├── <variant-b>/
│   └── ...
└── shared/                          # （任意）内部共有コンポーネント（直接エクスポートしない）
    ├── <category>-primitive.tsx      # Base UI をラップしたプリミティブ
    ├── <category>-context.tsx        # React.createContext + useXxxContext()
    ├── <category>.module.css
    └── index.ts
```

`shared/` ディレクトリは外部にエクスポートしない内部実装。バリアント間で共通のロジック・UI・Context を置く。

### パターン C: 複合コンポーネント（Unit パターン）

低レベルコンポーネントと、それを組み合わせた高レベルコンポーネント（`XxxUnit`）を提供する構成。`XxxUnit` は `useId()` でアクセシビリティ用のID紐付けを自動化する。

```
<category>/
├── index.ts
├── <base-component>/
│   ├── <BaseComponent>.tsx
│   ├── <base-component>.module.css
│   └── index.ts
└── <base-component>-unit/
    ├── <BaseComponentUnit>.tsx       # LabelUnit + BaseComponent の複合
    ├── <base-component>-unit.module.css
    └── index.ts
```

### 実装上の共通ルール

- **named export のみ**（default export 禁止）
- `React.forwardRef` で ref を転送する
- バリアント / サイズは Union 型で定義し、CSS Modules のクラス名と対応させる
- `aria-label` 等のアクセシビリティ属性は型レベルで必須にできるなら必須にする
- Compound Component パターン（`Component.Header` / `Component.Body` 等）は、Context で親の状態を子に伝達する

---

## 3. src/icons/ — アイコンコンポーネント

- SVGをReactコンポーネントとして定義（PascalCase: `XxxIcon.tsx`）
- 色は `currentColor`（親のcolorを継承）またはデザイントークン（`var(--xxx, #fallback)`）
- サイズは props または固定値で制御

---

## 4. src/test-utils/ — テストユーティリティ

Web Components テスト用のヘルパー（`queryShadow`, `waitForShadowElement` 等）を提供。

---

## 5. stories/ — Storybookストーリー

ストーリーファイルは `src/` の外に配置し、コンポーネントのディレクトリ構造をミラーする。

```
stories/
└── <component-name>/
    └── <ComponentName>.stories.tsx
```

バリアントファミリーの場合はネストする:

```
stories/
└── <category>/
    ├── <variant-a>/<VariantA>.stories.tsx
    └── <variant-b>/<VariantB>.stories.tsx
```

コンポーネントへのインポートパスは相対パス: `../../src/components/<component-name>`

---

## 6. .storybook/ — Storybook設定

```
.storybook/
├── main.ts                # フレームワーク: @storybook/react-vite、ストーリーglob、アドオン
├── preview.ts             # グローバルパラメータ: controlsマッチャー、a11yテストモード、ストーリーソート
├── vitest.setup.ts        # Vitest統合用セットアップ（a11y + preview annotations）
└── Configure.mdx          # デフォルトのウェルカムページ
```

### 登録アドオン

| アドオン | 用途 |
|---|---|
| `@storybook/addon-docs` | 自動ドキュメント生成 |
| `@storybook/addon-vitest` | ストーリーをVitestテストとして実行 |
| `@storybook/addon-a11y` | アクセシビリティチェック |
| `storybook-addon-pseudo-states` | CSS擬似状態（hover, focus, active）のシミュレーション |
| `@chromatic-com/storybook` | Chromatic ビジュアルリグレッション |

---

## 7. 設定ファイル

### tsconfig.json

| 設定 | 値 |
|---|---|
| target | ES2020 |
| module | ESNext |
| moduleResolution | bundler |
| jsx | react-jsx（React importが不要） |
| noEmit | true（ビルドはVite/Storybookが担当） |
| strict | true |
| noUnusedLocals | true |
| noUnusedParameters | true |
| noFallthroughCasesInSwitch | true |

### vitest.config.ts

2つのテストプロジェクトを1つの設定で管理する。

| プロジェクト | 対象 | ブラウザ |
|---|---|---|
| storybook | 各StoryをVitestテストとして実行 | Playwright headless Chromium |
| unit | `src/**/*.test.{ts,tsx}` | Playwright headless Chromium |

### eslint.config.js（フラットコンフィグ）

| プラグイン/ルール | 用途 |
|---|---|
| `@eslint/js` recommended | JavaScript基本ルール |
| `typescript-eslint` recommended | TypeScriptルール |
| `eslint-plugin-react` + `react-hooks` | Reactルール |
| `eslint-plugin-jsx-a11y` recommended | アクセシビリティルール |
| `eslint-config-prettier` | Prettierとの競合を無効化 |

除外対象: `node_modules/`, `storybook-static/`, `dist/`, `*.config.js`, `*.config.ts`

### .prettierrc

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "bracketSpacing": true,
  "jsxSingleQuote": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### Gitフック（.husky/ + lint-staged）

pre-commit フックで `npx lint-staged` を実行:

| 対象ファイル | 実行内容 |
|---|---|
| `*.{ts,tsx}` | `eslint --cache --fix` → `prettier --write` |
| `*.{js,json,css,md}` | `prettier --write` |

---

## 8. 依存関係

### ランタイム依存（3パッケージ）

| パッケージ | バージョン | 用途 |
|---|---|---|
| `@base-ui/react` | ^1.1.0 | ヘッドレスUIプリミティブ（Dialog, Tooltip, Toast, Button） |
| `react` | ^19.2.3 | UIフレームワーク |
| `react-dom` | ^19.2.3 | DOMレンダラー |

### 主要な開発依存

| パッケージ | 用途 |
|---|---|
| `storybook` / `@storybook/react-vite` | Storybook 10（Viteビルド） |
| `@storybook/addon-vitest` | ストーリーのテスト実行 |
| `storybook-addon-pseudo-states` | CSS擬似状態シミュレーション |
| `@chromatic-com/storybook` | ビジュアルリグレッション |
| `vitest` / `@vitest/browser-playwright` / `playwright` | テストランナー + ブラウザ環境 |
| `@testing-library/react` / `dom` / `user-event` | DOMテストユーティリティ |
| `typescript-eslint` / `eslint-plugin-jsx-a11y` | リンティング |
| `husky` / `lint-staged` | Gitフック |
| `prettier` | コードフォーマット |

---

## 9. モジュール構成

```
"type": "module"（ES Modules）
```

ライブラリ全体が ES Modules で構成されている。`tsconfig.json` の `noEmit: true` によりTypeScriptコンパイラはビルドを行わず、Vite / Storybook がバンドルを担当する。

---

## 10. ファイル命名規則

| 種類 | 命名規則 | 例 |
|---|---|---|
| 公開コンポーネント | PascalCase | `IconButton.tsx` |
| 共有内部コンポーネント | kebab-case | `dialog-body.tsx` |
| CSS Modules | kebab-case + `.module.css` | `icon-button.module.css` |
| ストーリー | PascalCase + `.stories.tsx` | `IconButton.stories.tsx` |
| アイコン | PascalCase + `Icon` サフィックス | `SuccessIcon.tsx` |
| テストユーティリティ | kebab-case | `shadow-dom.ts` |
| 型定義 | kebab-case + `.d.ts` | `css.d.ts` |

---

## 11. 重要なポイント

1. **コンポーネント中心の設計** — 各コンポーネントが独自のディレクトリを持ち、実装・スタイル・エクスポートを自己完結させる
2. **ストーリーの分離** — `stories/` は `src/` の外に配置し、ソースとドキュメントの関心を分離する
3. **ヘッドレスUI + CSS Modules** — Base UI でアクセシビリティと機能を確保し、CSS Modules で独自スタイルを適用する
4. **型安全性** — TypeScript strict mode で運用し、すべてのプロパティに型定義を付ける
5. **ランタイム依存の最小化** — ランタイム依存は React と Base UI の3パッケージのみ
