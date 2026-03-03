# コンポーネント設計

新規コンポーネントの設計・実装時に参照する汎用ガイドです。

---

## 1. コンポーネントの分類

### 単体コンポーネント

単一の責務を持つ基本コンポーネント。再利用性が高い。

```tsx
export const Component = ({ variant = 'primary' }: ComponentProps) => {
  return <div className={styles.container}>...</div>;
};
```

**該当:** IconButton, LinkTag, ReadOnlyTag, LabelUnit, InlineNotification, Tooltip, SectionTab

### 複合コンポーネント (Compound Components)

`Object.assign` で名前空間パターンを実現する。ルートコンポーネントとサブコンポーネントを一体で提供する。

```tsx
// ルートコンポーネントがある場合
export const MyDialog = Object.assign(MyDialogRoot, {
  Header: DialogHeader,
  Body: DialogBody,
  Footer: DialogFooter,
});

// 使用例
<MyDialog open={open} onOpenChange={setOpen}>
  <MyDialog.Header text="タイトル" />
  <MyDialog.Body>内容</MyDialog.Body>
  <MyDialog.Footer actionLabel="実行する" />
</MyDialog>
```

```tsx
// ルートコンポーネントがない場合（名前空間のみ）
export const Snackbar = Object.assign({}, {
  Provider: SnackbarProvider,
  Viewport: SnackbarViewport,
});
```

**該当:** ActionDialog, FormDialog, InformationDialog, Snackbar, SectionTabGroup

### ユニットコンポーネント（Unit）

複数の単体コンポーネントを組み合わせた高レベルコンポーネント。
`useId()` でラベルと入力要素を自動的にリンクする。

```tsx
export const InputUnit = ({ label, id: idProp, ...inputProps }: InputUnitProps) => {
  const autoId = useId();
  const id = idProp ?? autoId;

  return (
    <div className={styles.container}>
      <LabelUnit text={label} htmlFor={id} />
      <Input id={id} {...inputProps} />
    </div>
  );
};
```

**該当:** TextAreaUnit

---

## 2. パターンの選択ガイド

| 条件 | 推奨パターン |
|------|------------|
| Base UI にプリミティブがある | Base UI ラップ |
| 外部から ref が必要 | `React.forwardRef` |
| サブコンポーネントをドット記法で提供 | `Object.assign` 複合 |
| `href` 有無で要素を切り替え | Discriminated Union（Polymorphic） |
| ラベル + 入力を組み合わせる | Unit コンポーネント |
| 上記に該当しない単純な表示 | 単体コンポーネント |

---

## 3. ファイル構成

> ディレクトリの詳細は [project-structure.md](./project-structure.md) を参照。

### 基本構造

```
src/components/
├── component-name/
│   ├── ComponentName.tsx          # メインコンポーネント（PascalCase）
│   ├── component-name.module.css  # スタイル（kebab-case）
│   └── index.ts                   # エクスポート
stories/
├── component-name/
│   └── ComponentName.stories.tsx   # Storybook（src外のルートに配置）
```

### サブコンポーネントがある場合

```
src/components/
├── my-group/
│   ├── sub-a/
│   │   ├── SubA.tsx
│   │   ├── sub-a.module.css
│   │   └── index.ts
│   ├── sub-b/
│   │   ├── SubB.tsx
│   │   ├── sub-b.module.css
│   │   └── index.ts
│   ├── shared/                    # 内部共有コンポーネント
│   │   ├── my-context.tsx
│   │   ├── my-primitive.tsx
│   │   └── index.ts
│   └── index.ts                   # グループ全体の再エクスポート
```

---

## 4. 実装チェックリスト

### 新規コンポーネント作成時

1. **Base UI を確認** — 該当するプリミティブがあれば優先的にラップする
2. **ディレクトリ作成** — `src/components/<kebab-case>/`
3. **型定義** — Props は `interface`、バリアント/サイズは `type` で同一ファイルに定義
4. **コンポーネント実装** — パターンを選択し、named export
5. **CSS Modules** — `<kebab-case>.module.css` を作成
6. **index.ts** — コンポーネントと型を named export
7. **親 index.ts に追加** — `src/components/index.ts` に `export *` を追加
8. **ストーリー作成** — `stories/<kebab-case>/ComponentName.stories.tsx`
9. **擬似状態ストーリー** — Normal, Hover, Active, Focus, Disabled を作成

### 型定義のルール

> 詳細は [types-and-models.md](./types-and-models.md) を参照。

```tsx
// ✅ type alias で union 定義
export type ComponentVariant = 'primary' | 'secondary';
export type ComponentSize = 'small' | 'medium' | 'large';

// ✅ interface で Props 定義（JSDoc は日本語、@default でデフォルト値を明示）
export interface ComponentProps {
  /** バリアント @default 'primary' */
  variant?: ComponentVariant;
  /** サイズ @default 'medium' */
  size?: ComponentSize;
  /** 無効化状態 @default false */
  disabled?: boolean;
}

// ❌ defaultProps は使用禁止（分割代入のデフォルト値を使う）
```

**`@default` の注意**: ラッパーコンポーネントで内部ライブラリのデフォルト値をそのまま `@default` に記載しない。ラッパー自身がデフォルト値を設定していない場合、`@default` は省略する。

### HTML属性を拡張する場合

```tsx
// ✅ Omit で衝突するプロパティを除外して再定義
export interface ComponentProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
> {
  size?: ComponentSize;
}
```

---

## 5. Base UI の型を再利用する

Base UI をラップする場合、Props の型は Base UI の namespace 型を直接参照する。独自に `string | number` 等を再定義しない。

```tsx
import type { TabsTab, TabsRoot } from '@base-ui/react/tabs';

export interface SectionTabGroupRootProps {
  value?: TabsTab.Value;
  onValueChange?: (
    value: TabsTab.Value,
    eventDetails: TabsRoot.ChangeEventDetails,
  ) => void;
}
```

---

## 6. className の組み立て

> 詳細は [coding-rules.md §3.3](./coding-rules.md) を参照。

```tsx
// ✅ 条件付きクラス: 配列 + filter + join
const className = [
  styles.container,
  styles[variant],
  styles[size],
  isSelected && styles.selected,
  loading && styles.loading,
]
  .filter(Boolean)
  .join(' ');

// ✅ 条件なし: join のみ
const className = [styles.root, styles[size]].join(' ');

// ❌ テンプレートリテラル
const className = `${styles.container} ${styles.active}`;
```

---

## 7. CSS の基本ルール

> 詳細は [styling.md](./styling.md)、トークン一覧は [design-tokens.md](./design-tokens.md) を参照。

```css
/* ✅ シンプルなクラス名 */
.container { }
.button { }

/* ✅ バリアント・サイズは props 値と一致するクラス名 */
.primary { }
.medium { }

/* ✅ 論理プロパティ */
inline-size: 32px;
padding-block-start: 16px;

/* ✅ デザイントークン（フォールバック値付き） */
background-color: var(--surface-strong-default, #282828);

/* ✅ 擬似クラスで状態管理 */
.button:hover:not(:disabled) { }
.button:focus-visible { }
.button:disabled { cursor: not-allowed; }
```

---

## 8. エクスポート

> 詳細は [coding-rules.md §5](./coding-rules.md) を参照。

### コンポーネントの index.ts

```ts
export { MyComponent } from './MyComponent';
export type {
  MyComponentProps,
  MyComponentVariant,
  MyComponentSize,
} from './MyComponent';
```

### カスタムフックがある場合

```ts
export { MyComponent, useMyComponent } from './MyComponent';
export type { MyComponentProps } from './MyComponent';
```

### グループの index.ts

```ts
export * from './sub-a';
export * from './sub-b';
```

### ルートへの登録

```ts
// src/components/index.ts に追加
export * from './my-component';
```

---

## 9. アクセシビリティ

> 詳細は [coding-rules.md §8](./coding-rules.md) を参照。

### セマンティックHTML優先

```tsx
// ✅ セマンティックなHTML要素を使用
<label htmlFor={id}>{text}</label>
<button type="button">{children}</button>
<textarea aria-invalid={error || undefined} />

// ❌ div + role で代替しない
<div role="button">{children}</div>
```

### 頻出する ARIA パターン

```tsx
// テキストのないボタン
<button aria-label="検索">...</button>

// トグル状態
aria-pressed={isSelected ? 'true' : undefined}

// ローディング
aria-busy={loading ? 'true' : undefined}

// エラー通知
<textarea
  aria-invalid={error || undefined}
  aria-describedby={hasError ? errorListId : undefined}
/>
{hasError && <div id={errorListId} role="alert">...</div>}

// ライブリージョン
<div aria-live={status === 'error' ? 'assertive' : 'polite'}>

// 装飾的要素
<span aria-hidden="true"><LoadingSpinner /></span>
```

---

## 10. レスポンシブ対応

### メディアクエリ（720px の1箇所のみ）

```css
/* PCファースト: デフォルトがデスクトップ */
.viewport {
  inset-block-start: 16px;
  inset-inline-end: 16px;
}

/* スマホ: 720px 以下で上書き */
@media (max-width: 720px) {
  .viewport {
    inset-block-end: 16px;
    inset-inline-start: 50%;
  }
}
```

### viewport prop による切り替え

メディアクエリの代わりに、`viewport` prop で明示的にスタイルを切り替えるパターン。

```tsx
const containerClassName = [
  styles.container,
  viewport === 'phone' && styles.phone,
]
  .filter(Boolean)
  .join(' ');
```

```css
.textarea.medium {
  min-block-size: 58px;
  font-size: var(--font-scale-40, 14px);
}

.phone .textarea.medium {
  min-block-size: 64px;
  font-size: var(--font-scale-50, 16px);
}
```

---

## 11. Storybook

> 詳細は [coding-rules.md §7](./coding-rules.md) を参照。

### 基本構造

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MyComponent } from '../../src/components/my-component';

const meta = {
  title: 'Components/MyComponent',
  component: MyComponent,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof MyComponent>;

export default meta;
type Story = StoryObj<typeof meta>;
```

### カスタムデコレータの型

デコレータを変数に切り出す場合は Storybook の `Decorator` 型を使う。`React.ComponentType` は使わない。

```tsx
import type { Decorator } from '@storybook/react-vite';

const selectedDecorator: Decorator = (Story) => (
  <Wrapper><Story /></Wrapper>
);
```

### 擬似状態ストーリー（必須）

```tsx
export const Normal: Story = { args: { variant: 'primary' } };
export const Hover: Story = {
  args: { ...Normal.args },
  parameters: { pseudo: { hover: true } },
};
export const Focus: Story = {
  args: { ...Normal.args },
  parameters: { pseudo: { focusVisible: true } },
};
export const Active: Story = {
  args: { ...Normal.args },
  parameters: { pseudo: { active: true } },
};
export const Disabled: Story = {
  args: { ...Normal.args, disabled: true },
};
```

### 状態を持つストーリー

```tsx
export const Default: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button onClick={() => setOpen(true)}>開く</button>
        <MyDialog {...args} open={open} onOpenChange={setOpen} />
      </>
    );
  },
};
```

---

## 12. ベストプラクティス

1. **Base UI を活用** — インタラクティブなコンポーネントはまず Base UI で実装を検討する
2. **単一責任** — 1コンポーネント1責任
3. **Props の最小化** — 必要最小限の Props のみ受け取る
4. **`forwardRef`** — 外部からの ref 制御が必要なコンポーネントに適用し、`displayName` を設定
5. **開発時警告** — `process.env.NODE_ENV !== 'production'` ガード付き `console.warn`
6. **`useId()` によるID生成** — ラベルと入力要素のリンクに自動生成IDを使用
7. **Controlled / Uncontrolled の両対応** — フォーム要素は両モードをサポート
8. **アクセシビリティ** — セマンティックHTML + 適切なARIA属性
9. **CSS論理プロパティ** — RTL対応のため物理プロパティは使わない
10. **デザイントークン** — ハードコードせず `var(--token, fallback)` を使用
