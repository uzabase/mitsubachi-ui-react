# 型システムとモデル

## 1. 型定義の配置ルール

### コンポーネントと同一ファイルに定義

型定義はコンポーネント実装ファイルに同居させる。型専用ファイルは作らない。

```
icon-button/
├── IconButton.tsx    # 型定義 + コンポーネント実装
└── index.ts          # エクスポート
```

### 記述順序

ファイル内の定義順序は以下に統一する。

```tsx
// 1. バリアント・サイズの type 定義
export type ComponentVariant = 'primary' | 'secondary';
export type ComponentSize = 'small' | 'medium' | 'large';

// 2. Props の interface 定義
export interface ComponentProps {
  variant?: ComponentVariant;
  size?: ComponentSize;
}

// 3. コンポーネント実装
export const Component = ({ variant = 'primary', size = 'medium' }: ComponentProps) => {
  // ...
};
```

### 例外: Context の型は別ファイル

複合コンポーネントで共有する Context は `shared/` ディレクトリに分離する。

```
dialog/shared/
├── dialog-context.tsx   # DialogContextValue, DialogSize, DialogVariant
└── index.ts
```

---

## 2. Props Interface の定義

### 基本パターン

Props は `interface` で定義する。JSDoc コメントは日本語で記述し、`@default` でデフォルト値を明示する。

```tsx
export interface IconButtonProps {
  /** ボタンのバリアント（表示スタイル） */
  variant?: IconButtonVariant;
  /** ボタンのサイズ */
  size?: IconButtonSize;
  /** 選択状態（secondary, tertiary, ghostのみ） */
  selected?: boolean;
  /** ローディング状態 */
  loading?: boolean;
  /** 無効化状態 */
  disabled?: boolean;
  /** ボタン内のアイコン */
  children: React.ReactNode;
  /** アクセシビリティラベル（必須：ツールチップのテキストとしても使用） */
  'aria-label': string;
  /**
   * ツールチップの表示/非表示
   * @default true
   */
  tooltip?: boolean;
}
```

### HTML 属性の拡張（Omit パターン）

HTML 標準属性を拡張する場合、衝突するプロパティを `Omit` で除外してから再定義する。

```tsx
export interface TextAreaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
> {
  /** テキストエリアのサイズ */
  size?: TextAreaSize;
  /** ビューポート */
  viewport?: Viewport;
  /** エラー状態 */
  error?: boolean;
}
```

### Props 型の拡張

別コンポーネントの Props を拡張する場合は `extends` を使用する。

```tsx
import type { TextAreaProps } from '../text-area';

export interface TextAreaUnitProps extends TextAreaProps {
  /** ラベルテキスト */
  label: string;
  /** 補足テキスト */
  supportText?: string;
}
```

### Props 型の参照（配列要素への追加プロパティ）

```tsx
import type { LinkTagProps } from '../link-tag';

export interface LinkTagGroupProps {
  /** 表示するタグの配列 */
  tags: Array<LinkTagProps & { id?: string }>;
}
```

---

## 3. バリアント・サイズの型定義

### String Literal Union

バリアント・サイズは `type` で String Literal Union を定義する。`enum` は使用しない。

```tsx
export type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
export type IconButtonSize = 'small' | 'medium' | 'large';

export type ReadOnlyTagPattern = 'neutral' | 'information' | 'positive' | 'negative';
export type InlineNotificationStatus = 'information' | 'success' | 'warning' | 'error';
export type Viewport = 'desktop' | 'phone';
```

### CSS Modules のクラス名と対応させる

バリアント・サイズの値は CSS Module のクラス名と一致させ、動的にルックアップする。

```tsx
// TSX: styles[variant] で動的参照
const className = [styles.button, styles[variant], styles[size]].filter(Boolean).join(' ');
```

```css
/* CSS: 型の値と同名のクラス */
.primary { }
.secondary { }
.small { }
.medium { }
```

---

## 4. Discriminated Union（Polymorphic パターン）

`href` の有無で `<a>` / `<button>` を切り替える場合、Discriminated Union で型安全に実現する。

```tsx
/** a要素としてのProps */
interface LinkTagAsLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  text?: string;
  size?: LinkTagSize;
  /** hrefを指定するとa要素として動作 */
  href: string;
}

/** button要素としてのProps */
interface LinkTagAsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  size?: LinkTagSize;
  /** hrefを指定しない場合はbutton要素として動作 */
  href?: never;
}

export type LinkTagProps = LinkTagAsLinkProps | LinkTagAsButtonProps;
```

**ポイント:**

- `href: string` と `href?: never` で相互排他性を表現
- 実装側は `'href' in props && props.href` で型を絞り込む

---

## 5. Context の型定義

### Context 値の型

Context に渡す値は `interface` で定義する。ミュータブルな状態ではなく、props 由来の静的な設定値に限定する。

```tsx
export type DialogSize = 'small' | 'medium' | 'large';
export type DialogVariant = 'action' | 'information' | 'form';

export interface DialogContextValue {
  size: DialogSize;
  variant: DialogVariant;
}

export const DialogContext = React.createContext<DialogContextValue | null>(null);
```

### ガード付きカスタム Hook

Context の消費は専用 Hook でラップし、`null` チェックを一箇所に集約する。

```tsx
export function useDialogContext(): DialogContextValue {
  const ctx = React.useContext(DialogContext);
  if (!ctx) {
    throw new Error(
      'Dialog subcomponents must be used within ActionDialog, InformationDialog, or FormDialog.'
    );
  }
  return ctx;
}
```

---

## 6. ランタイム型検証

Base UI の `toast.data` など、外部から来る `unknown` 型の値を安全に変換する。

```tsx
export type SnackbarSize = 'small' | 'medium';

const SNACKBAR_SIZES = new Set<string>(['small', 'medium']);

function toSnackbarSize(value: unknown): SnackbarSize {
  return typeof value === 'string' && SNACKBAR_SIZES.has(value)
    ? (value as SnackbarSize)
    : 'small';
}
```

**ルール:**

- `Set` で許可値を定義
- 不正な値はデフォルト値にフォールバック
- `as` アサーションは検証済みの値にのみ使用

---

## 7. マッピング型

### `Record` による型安全なマッピング

```tsx
const defaultIcons: Record<InlineNotificationStatus, React.ReactNode> = {
  information: <InformationIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
};
```

### `as const` による不変マッピング

props の値と CSS クラス名が一致しない場合に使用する。

```tsx
const sizeClassMap = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
} as const;
```

---

## 8. エクスポートパターン

### コンポーネントの index.ts

コンポーネントと型を分けてエクスポートする。

```ts
export { IconButton } from './IconButton';
export type {
  IconButtonProps,
  IconButtonVariant,
  IconButtonSize,
} from './IconButton';
```

### カスタム Hook がある場合

```ts
export { Snackbar, useSnackbar } from './Snackbar';
export type { SnackbarSize, SnackbarShowOptions } from './Snackbar';
```

### グループの集約

```ts
// tag/index.ts
export * from './link-tag';
export * from './read-only-tag';
```

---

## 9. 命名規則

| 種類 | 規則 | 例 |
|------|------|----|
| Props | `<ComponentName>Props` | `IconButtonProps`, `TextAreaProps` |
| バリアント | `<ComponentName>Variant` | `IconButtonVariant` |
| サイズ | `<ComponentName>Size` | `IconButtonSize`, `TextAreaSize` |
| パターン | `<ComponentName>Pattern` | `ReadOnlyTagPattern` |
| ステータス | `<ComponentName>Status` | `InlineNotificationStatus` |
| Context 値 | `<GroupName>ContextValue` | `DialogContextValue` |
| Hook オプション | `<HookName>Options` | `SnackbarShowOptions` |

---

## 10. アンチパターン

```tsx
// ❌ enum は使わない
enum Variant { Primary, Secondary }

// ❌ type alias で Props を定義しない（interface を使う）
type ComponentProps = { variant?: string };

// ❌ 型定義専用ファイルを作らない
// types.ts に分離するのではなく、コンポーネントファイルに同居

// ❌ any を使わない
const handler = (e: any) => {};

// ❌ 検証なしの as アサーション
const size = toast.data.size as SnackbarSize;

// ❌ defaultProps は使わない（分割代入のデフォルト値を使う）
Component.defaultProps = { variant: 'primary' };
```
