# コーディング規約

## 命名規則

### ファイル名
- **公開コンポーネント**: PascalCase (例: `IconButton.tsx`, `TextArea.tsx`)
- **内部コンポーネント**: kebab-case (例: `dialog-body.tsx`, `dialog-context.tsx`)
- **CSS Modules**: kebab-case + `.module.css` (例: `icon-button.module.css`)
- **ディレクトリ**: kebab-case (例: `icon-button/`, `text-area-unit/`)
- **ストーリー**: PascalCase + `.stories.tsx` (例: `IconButton.stories.tsx`)

### 変数・関数
```typescript
// 変数: camelCase
const userName = 'John';
const isActive = true;

// Boolean: is/has/can プレフィックス
const isLoading = false;
const hasError = false;

// イベントハンドラー: handle プレフィックス
const handleClick = () => {};
const handleChange = () => {};
```

## TypeScript

### 型定義
```typescript
// Props は interface で定義
export interface IconButtonProps {
  /** ボタンの表示スタイル @default 'primary' */
  variant?: IconButtonVariant;
  /** ボタンのサイズ @default 'medium' */
  size?: IconButtonSize;
}

// バリアント・サイズは type（string literal union）で定義
export type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type IconButtonSize = 'small' | 'medium' | 'large';
```

### Props の JSDoc 記述ルール

JSDoc は Storybook の Docs タブに表示されるため、**利用者がpropsの役割・挙動を理解できる** ように書く。

#### 基本ルール

- **日本語で記述する**
- **句点なし**（体言止めまたは「〜する」「〜される」で終わる）
- **「オプショナル」等の冗長な修飾を避ける**（`?` で自明）
- **props名の繰り返しを避ける**（`loading` に「ローディング状態」だけでは不十分）
- **挙動・副作用があれば明記する**（何が起きるかを書く）

#### `@default` の書き方

- 短い説明：1行にまとめる `/** 説明 @default 'value' */`
- 長い説明：複数行にし `@default` は別の行

```typescript
// ✅ 短い説明（1行）
/** ボタンのサイズ @default 'medium' */
size?: MenuButtonSize;

// ✅ 長い説明（複数行）
/**
 * ローディング状態。アイコンがスピナーに置き換わり、ボタンは無効化される
 * @default false
 */
loading?: boolean;
```

#### 良い例・悪い例

```typescript
// ❌ props名の繰り返しだけで意味が伝わらない
/** ローディング状態 */
loading?: boolean;
/** ref */
ref?: React.Ref<HTMLButtonElement>;

// ✅ 挙動や用途が伝わる
/**
 * ローディング状態。アイコンがスピナーに置き換わり、ボタンは無効化される
 * @default false
 */
loading?: boolean;
/** Menu コンポーネントとの連携用 ref。ドロップダウンの位置決めやフォーカス管理に使用 */
ref?: React.Ref<HTMLButtonElement>;

// ❌ 冗長な修飾
/** 先頭に表示するオプショナルアイコン */
icon?: React.ReactNode;

// ✅ 簡潔に
/** ラベルの先頭に表示するアイコン */
icon?: React.ReactNode;
```

## React コンポーネント

### 関数コンポーネント
```typescript
import styles from './component-name.module.css';

export interface ComponentProps {
  /** プロパティの説明（日本語） */
  variant?: ComponentVariant;
  children?: React.ReactNode;
}

export const Component = ({ variant = 'primary', children }: ComponentProps) => {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
};
```

### インポート順序

```typescript
import React from 'react';                                    // 1. react
import { useState, useCallback } from 'react';                //    react hooks
import { Button as BaseButton } from '@base-ui/react/button'; // 2. サードパーティ
import { Tooltip } from '../tooltip';                          // 3. ローカルコンポーネント
import styles from './icon-button.module.css';                 // 4. CSS Modules（最後）
```

## React 19 準拠

このプロジェクトは React 19（`^19.2.3`）を使用する。React 19 の作法に従い、レガシーパターンは避ける。

### `FC` / `React.FC` は使用しない

`FC` は `children` の暗黙的な型付けなど問題があり、React 19 では非推奨。
Props を直接引数に型注釈する。

```tsx
// ❌ 非推奨
import { FC } from 'react';
export const Component: FC<Props> = ({ variant }) => { ... };

// ✅ 推奨
export const Component = ({ variant = 'primary' }: ComponentProps) => { ... };
```

### `forwardRef` は使用しない — ref は props で直接受け取る

React 19 では `ref` を通常の props として受け取れるようになった。
`forwardRef` は不要。`displayName` の設定も不要になる。

```tsx
// ❌ レガシー（React 18 以前）
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    return <button ref={ref} {...props} />;
  }
);
IconButton.displayName = 'IconButton';

// ✅ React 19
export interface IconButtonProps {
  ref?: React.Ref<HTMLButtonElement>;
  variant?: IconButtonVariant;
}

export const IconButton = ({ ref, variant = 'primary', ...rest }: IconButtonProps) => {
  return <button ref={ref} {...rest} />;
};
```

> **現状:** 全コンポーネントが ref-as-prop パターンに移行済み。

### Context は `<Context>` で直接レンダリングできる

React 19 では `<Context.Provider>` の代わりに `<Context>` を直接使用できる。

```tsx
// ❌ レガシー
<DialogContext.Provider value={{ size, variant }}>
  {children}
</DialogContext.Provider>

// ✅ React 19
<DialogContext value={{ size, variant }}>
  {children}
</DialogContext>
```

> **現状:** Dialog が `<Context.Provider>` を使用中。新規コンポーネントでは `<Context>` を使用し、既存コンポーネントも順次移行する。

### `react-jsx` トランスフォーム

`tsconfig.json` で `"jsx": "react-jsx"` を設定済み。
JSX のためだけの `import React from 'react'` は不要。

```tsx
// ❌ 不要（JSX のためだけにインポートしない）
import React from 'react';

// ✅ 必要な API のみインポート
import { useState, useCallback, useId } from 'react';

// ✅ React 名前空間が必要な場合のみインポート
import React from 'react';  // React.createContext, React.ReactNode 等を使う場合
```

### React 19 で活用する Hooks

| Hook | 用途 | 使用状況 |
|------|------|---------|
| `useId` | フォームのアクセシビリティ用ID生成 | ✅ 使用中 |
| `use` | Promise・Context の読み取り | 必要に応じて採用 |
| `useActionState` | フォームアクションの状態管理 | コンポーネントライブラリでは不要 |
| `useOptimistic` | 楽観的UI更新 | コンポーネントライブラリでは不要 |

---

## ESLint/Prettier

プロジェクトでは `typescript-eslint` + `eslint-plugin-jsx-a11y` + `eslint-config-prettier` を使用しています。

主要なルール:
- セミコロン: 必須
- クォート: シングルクォート（JSXはダブルクォート）
- インデント: スペース2つ
- 行末カンマ: ES5準拠
- 1行の幅: 80文字
- アロー関数の引数: 常にカッコ
- 改行コード: LF
