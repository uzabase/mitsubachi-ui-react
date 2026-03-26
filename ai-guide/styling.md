# スタイリング規約

## CSS Modules

コンポーネントごとに `.module.css` ファイルを持ち、スタイルをスコープ化する。

```
tooltip/
├── tooltip.tsx
├── tooltip.module.css
└── index.ts
```

型定義は `src/css.d.ts` で提供される。

```ts
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
```

## クラス名の命名規則

フラットでシンプルな名前を使う。CSS Modules がスコープを制御するため、BEM や接頭辞は不要。

```css
/* ✅ 推奨: フラット・シンプル */
.container { }
.button { }
.label { }
.iconWrapper { }
.supportText { }

/* ❌ 非推奨 */
.l-container { }                   /* 接頭辞 */
.block__element--modifier { }      /* BEM */
#header { }                        /* IDセレクタ */
div { }                            /* タグセレクタ */
```

バリアント・状態のクラスは、props の値と一致するフラットな名前にする。

```css
/* バリアント */
.primary { }
.secondary { }
.tertiary { }
.ghost { }

/* サイズ */
.small { }
.medium { }
.large { }
.x-small { }

/* 状態 */
.selected { }
.loading { }
.disabled { }
.phone { }
```

## クラス名の組み合わせ

### パターン A: Array + filter + join（条件付きクラスがある場合）

最も一般的なパターン。条件によってクラスを付け外しする場合に使う。

```tsx
const buttonClassName = [
  styles.button,
  styles[variant],
  styles[size],
  isSelected && styles.selected,
  loading && styles.loading,
]
  .filter(Boolean)
  .join(' ');
```

### パターン B: テンプレートリテラル（常に適用されるクラスが少数の場合）

```tsx
<span className={`${styles.tag} ${styles[pattern]}`} />
```

### パターン C: join のみ（条件分岐なし、全クラス確定の場合）

```tsx
const rootClassName = [styles.root, styles[size]].join(' ');
```

### 動的キーのルックアップ

props の値で CSS Module のクラスを動的に参照する。

```tsx
styles[variant]   // 'primary' | 'secondary' | 'tertiary' | 'ghost'
styles[size]      // 'small' | 'medium' | 'large'
styles[pattern]   // 'neutral' | 'information' | 'positive' | 'negative'
```

### 静的マップ（複合キーの場合）

props の値とクラス名が一致しない場合は、明示的なマップを使う。

```tsx
const sizeClassMap = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
} as const;
```

## デザイントークン

専用のトークン定義ファイルは持たない。CSS カスタムプロパティをフォールバック値付きで直接使用する。
トークンは利用側アプリケーション（Figma トークンエクスポート等）から提供される想定。

```css
/* 必ず var(--token, fallback) の形式で書く */
background-color: var(--surface-strong-default, #282828);
color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
font-size: var(--font-scale-40, 14px);
border-radius: var(--border-radius-full, 9999px);
```

## 論理プロパティ

物理プロパティではなく、論理プロパティを使う。RTL 言語対応のため。

```css
/* ❌ 物理プロパティ */
width: 100%;
height: 40px;
padding-top: 8px;
padding-left: 16px;
margin-right: 12px;
top: 16px;
right: 16px;

/* ✅ 論理プロパティ */
inline-size: 100%;
block-size: 40px;
padding-block-start: 8px;
padding-inline-start: 16px;
margin-inline-end: 12px;
inset-block-start: 16px;
inset-inline-end: 16px;
```

物理プロパティの使用が許容されるケース:

- 論理プロパティが存在しない場合（`resize: vertical`, `transform: translateX`）
- 方向に依存しない値（`align-items: center`）

## 擬似クラスによる状態管理

コンポーネントの各状態は CSS 擬似クラスで実装する。

### :hover

`:not(:disabled)` と組み合わせて、disabled 要素でのホバーを防ぐ。

```css
.button.primary:hover:not(:disabled) {
  background-color: var(--surface-strong-hover, #191919);
}

/* TextArea: focus 中は hover スタイルを除外 */
.textarea:hover:not(:disabled):not(:focus-visible) {
  border-color: var(--border-semi-strong-hover, rgba(0, 0, 0, 0.35));
}
```

### :focus-visible

`:focus` ではなく `:focus-visible` を使う。キーボード操作時のみフォーカスリングを表示する。

フォーカスリングは 2 重リング（内側白 + 外側ダーク）の `box-shadow` で統一する。

```css
.button.primary:focus-visible {
  box-shadow:
    0 0 0 2px var(--surface-regular-default, white),
    0 0 0 4px var(--focus-ring-default, #191919);
}

/* TextArea: outline を消して box-shadow で統一 */
.textarea:focus-visible {
  outline: none;
  box-shadow:
    0 0 0 2px var(--surface-regular-default, #ffffff),
    0 0 0 4px var(--focus-ring-default, #191919);
}
```

### :active

```css
.button.primary:active:not(:disabled) {
  background-color: var(--surface-strong-active, black);
}
```

### :disabled

`.loading` クラスと同じスタイルを共有する（loading 中は disabled と同じ見た目になる）。

```css
.button:disabled {
  cursor: not-allowed;
}

.button.primary:disabled,
.button.primary.loading {
  background-color: var(--surface-semi-strong-disabled, rgba(0, 0, 0, 0.07));
  color: var(--icon-disabled, rgba(0, 0, 0, 0.25));
}
```

### Base UI の data 属性による状態管理

Base UI コンポーネントをラップする場合、状態は Base UI が付与する `data-*` 属性で管理する。`:disabled` 等の擬似クラスの代わりに `[data-disabled]` を使う。

```css
/* 選択状態 */
.tab[data-active] { }

/* hover（選択・無効以外） */
.tab:hover:not([data-active]):not([data-disabled]) { }

/* 無効化 + 選択の複合状態 */
.tab[data-active][data-disabled] { }
```

### ::placeholder

```css
.textarea::placeholder {
  color: var(--text-weak-default, rgba(0, 0, 0, 0.54));
}

.textarea:disabled::placeholder {
  color: var(--text-disabled, rgba(0, 0, 0, 0.35));
}
```

## `all: unset` リセットパターン

ブラウザのデフォルトスタイルを完全にリセットする場合に `all: unset` を使用する。

```css
.tab {
  all: unset;
  box-sizing: border-box; /* all: unset で content-box に戻るため必須 */
  display: inline-flex;   /* all: unset で inline に戻るため再指定 */
}
```

**注意点:**
- `all: unset` は `outline`, `box-sizing`, `display` 等すべてをリセットする
- `outline: none` 等の個別リセットは冗長になるため書かない
- `box-sizing: border-box` と `display` は必ず直後に再設定する

## セレクタの詳細度

`!important` は使用しない。詳細度はクラスセレクタの組み合わせのみで制御する。

```css
/* 基本 (0,1,0) */
.button { }

/* バリアント (0,2,0) */
.button.primary { }

/* 状態 (0,3,0) */
.button.secondary.selected { }

/* 子孫セレクタ */
.button.small .iconWrapper { }
.phone .textarea.medium { }

/* 擬似クラス付き */
.button.primary:hover:not(:disabled) { }
```

## レスポンシブ対応

### メディアクエリ（ブレイクポイント: 720px）

```css
/* デスクトップがベース */
.viewport {
  inset-block-start: var(--spacing-x-large, 16px);
  inset-inline-end: var(--spacing-x-large, 16px);
}

/* スマホ */
@media (max-width: 720px) {
  .viewport {
    inset-block-end: var(--spacing-x-large, 16px);
    inset-inline-start: 50%;
    transform: translateX(-50%);
  }
}
```

### viewport props パターン

一部のコンポーネントは `viewport` props（`'desktop'` | `'phone'`）で `.phone` クラスを付与し、CSS で子要素のスタイルを切り替える。

```tsx
// TSX
<div className={viewport === 'phone' ? styles.phone : undefined}>
  <textarea className={styles.textarea} />
</div>
```

```css
/* CSS: 親の .phone クラスで子要素を上書き */
.phone .textarea.medium {
  min-block-size: 64px;
  padding-block: var(--spacing-medium, 8px);
  padding-inline: var(--spacing-large, 12px);
  font-size: var(--font-scale-50, 16px);
}
```

### overflow 領域でのフォーカスリング確保

`overflow: auto` のスクロールコンテナでは、フォーカスリング（box-shadow 4px）が切れる。padding + 負マージンで確保する。

```css
@media (max-width: 720px) {
  .list {
    overflow-x: auto;
    /* フォーカスリング（4px spread）が切り取られないよう確保 */
    padding: 4px;
    margin: -4px;
  }
}
```

### Dialog のスマホ対応パターン

- **ActionDialog**: 水平パディング維持、高さ `min(80dvh, 560px)` に制限
- **FormDialog / InformationDialog**: フルスクリーン化（`inline-size: 100%`, `block-size: 100%`, `border-radius: 0`）

## アニメーション

### トランジション

ボタンやタグなど、独立したインタラクティブ要素に `transition` を使用する。
メニューアイテムなど即時フィードバックが求められる要素には `transition` を付けない。

```css
/* ボタン系: 複数プロパティ */
.button {
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

/* タグ系: 単一プロパティ */
.tag {
  transition: background-color 150ms ease-out;
}
```

### Base UI のアニメーションフック

Base UI の `data-starting-style` / `data-ending-style` 属性で、表示・非表示時のアニメーションを制御する。

```css
/* 通常状態（表示中） */
.popup {
  opacity: 1;
  transform: scale(1);
  transform-origin: var(--transform-origin);
  transition:
    opacity 150ms ease-out,
    transform 150ms ease-out;
}

/* 表示開始時・非表示終了時 */
.popup[data-starting-style],
.popup[data-ending-style] {
  opacity: 0;
  transform: scale(0.95);
}
```

### @keyframes

ローディングスピナーにのみ使用。

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```

## シャドウ / エレベーション

2 層構造の `box-shadow` で統一する。

```css
/* Tooltip */
box-shadow:
  0px 1px 2px 0px var(--neutral-neutral-50-alpha, rgba(0, 0, 0, 0.29)),
  0px 5px 9px 2px var(--neutral-neutral-30-alpha, rgba(0, 0, 0, 0.13));

/* Dialog */
box-shadow:
  0px 1px 2px 0px var(--neutral-neutral-50-alpha, rgba(0, 0, 0, 0.29)),
  0px 8px 12px 3px var(--neutral-neutral-30-alpha, rgba(0, 0, 0, 0.13));

/* Snackbar */
box-shadow:
  0px 8px 16px 0px var(--elevation-regular, rgba(0, 0, 0, 0.13)),
  0px 0px 6px 0px var(--elevation-semi-weak, rgba(0, 0, 0, 0.1));
```

## タイポグラフィ

全コンポーネント共通: `letter-spacing: 0.02em`。

| スケール | フォールバック | 用途 |
|---------|-------------|------|
| `--font-scale-20` | 11px | 必須バッジ、小タグ |
| `--font-scale-30` | 12px | サポートテキスト、文字数カウント、ツールチップ |
| `--font-scale-40` | 14px | 本文テキスト、Snackbar、Dialog body |
| `--font-scale-50` | 16px | TextArea（large / phone） |

line-height は `1.5`（本文）または `1.3`（小テキスト）を使用する。
