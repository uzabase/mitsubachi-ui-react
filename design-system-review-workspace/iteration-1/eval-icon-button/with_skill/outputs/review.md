# IconButton コンポーネント レビュー

**対象ファイル:**
- `src/components/button/icon-button/IconButton.tsx`
- `src/components/button/icon-button/icon-button.module.css`
- `src/components/button/icon-button/index.ts`
- `stories/button/icon-button/IconButton.stories.tsx`

**参照済みドキュメント:**
- `ai-guide/components.md`
- `ai-guide/styling.md`
- `ai-guide/coding-rules.md`
- `ai-guide/design-tokens.md`

---

## IconButton.tsx:36 — `outline: none` の重複指定

### 問題点

**観点**: CSS設計
**重要度**: 低

`.button` で `all: unset` を使用しているため、`outline` は既にリセットされている。36行目の `outline: none` は冗長。`ai-guide/styling.md` の `all: unset` リセットパターンのセクションに「`outline: none` 等の個別リセットは冗長になるため書かない」と明記されている。

```css
/* 現在のコード (icon-button.module.css:35-36) */
/* フォーカス時のアウトライン無効化（:focus-visibleで制御） */
outline: none;

/* 改善案 */
/* この行を削除する。all: unset で既にリセット済み */
```

---

## icon-button.module.css:82-83 — `padding` ショートハンドの使用（物理プロパティ）

### 問題点

**観点**: CSS設計
**重要度**: 高

`padding: 2px` や `padding: var(--spacing-small, 4px)` というショートハンド形式が使われている。`ai-guide/styling.md` および CLAUDE.md で「`padding` のショートハンドも物理プロパティ扱い。全辺同値でも `padding-block` + `padding-inline` に分けて書く」と明記されている。

該当箇所: 82行目（small）、95行目（medium）、108行目（large）

```css
/* 現在のコード */
.button.small {
  inline-size: 24px;
  block-size: 24px;
  padding: 2px;
}

.button.medium {
  inline-size: 32px;
  block-size: 32px;
  padding: var(--spacing-small, 4px);
}

.button.large {
  inline-size: 40px;
  block-size: 40px;
  padding: var(--spacing-small, 4px);
}

/* 改善案 */
.button.small {
  inline-size: 24px;
  block-size: 24px;
  padding-block: var(--spacing-x-small, 2px);
  padding-inline: var(--spacing-x-small, 2px);
}

.button.medium {
  inline-size: 32px;
  block-size: 32px;
  padding-block: var(--spacing-small, 4px);
  padding-inline: var(--spacing-small, 4px);
}

.button.large {
  inline-size: 40px;
  block-size: 40px;
  padding-block: var(--spacing-small, 4px);
  padding-inline: var(--spacing-small, 4px);
}
```

---

## icon-button.module.css:59 — タグ名セレクタの使用

### 問題点

**観点**: CSS設計
**重要度**: 高

`.loadingSpinner > svg` でタグ名セレクタ `svg` を使用している。CLAUDE.md および `ai-guide/styling.md` で「class名セレクタのみ使用する（IDセレクタ・タグ名セレクタは使わない）」と明記されている。

```css
/* 現在のコード (icon-button.module.css:59-63) */
.loadingSpinner > svg {
  inline-size: 15px;
  block-size: 15px;
  animation: spin 1s linear infinite;
}

/* 改善案: SpinnerIcon にクラス名を付与するか、
   .loadingSpinner 自身でサイズとアニメーションを制御する */
.loadingSpinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  animation: spin 1s linear infinite;
}
```

---

## icon-button.module.css:60-61 — スピナーサイズに生の値を使用

### 問題点

**観点**: デザイントークンの正確性
**重要度**: 中

`.loadingSpinner > svg` のサイズが `15px` というハードコードされた値になっている。デザイントークンの `var(--token, fallback)` 形式を使用すべき。また、15px というサイズが各サイズバリアント（small/medium/large）で固定されている点も疑問。アイコンサイズと同様にバリアントごとにサイズを変えるべきではないか確認が必要。

```css
/* 現在のコード */
.loadingSpinner > svg {
  inline-size: 15px;
  block-size: 15px;
}

/* 改善案: サイズバリアントごとのアイコンサイズに合わせる
   （既に .button.small .loadingSpinner 等でラッパーサイズは指定されているので、
     svg の固定サイズ指定自体が不要な可能性がある） */
```

---

## icon-button.module.css:165 — 未定義トークン `--surface-regular-focus` の使用

### 問題点

**観点**: デザイントークンの正確性
**重要度**: 中

`--surface-regular-focus` というトークンが secondary、tertiary、ghost の `:focus-visible` で使われているが、`ai-guide/design-tokens.md` のトークン一覧にこのトークンは存在しない。フォールバック値が `rgba(255, 255, 255, 0)`（完全透明）であり、`transparent` と同義であるため、意図的な効果がないなら行ごと削除するか、正しいトークン名に修正すべき。

該当箇所: 165行目、225行目、285行目

```css
/* 現在のコード */
.button.secondary:focus-visible {
  background-color: var(--surface-regular-focus, rgba(255, 255, 255, 0));
  box-shadow: ...;
}

/* 改善案: background-color の行を削除（透明は元々のデフォルト）
   または定義済みトークンを使用 */
.button.secondary:focus-visible {
  box-shadow:
    0 0 0 2px var(--surface-regular-default, white),
    0 0 0 4px var(--focus-ring-default, #191919);
}
```

---

## IconButton.tsx:19-20 — JSDoc が props 名の繰り返しで意味不十分

### 問題点

**観点**: API設計と開発者体験（DX）
**重要度**: 中

いくつかの props の JSDoc が props 名の単純な繰り返しで、挙動や副作用が記載されていない。`ai-guide/coding-rules.md` の JSDoc 記述ルールに「props名の繰り返しを避ける」「挙動・副作用があれば明記する」と記載されている。

```tsx
/* 現在のコード */
/** ローディング状態 */
loading?: boolean;
/** 無効化状態 */
disabled?: boolean;
/** ref */
ref?: React.Ref<HTMLButtonElement>;

/* 改善案 */
/**
 * ローディング状態。アイコンがスピナーに置き換わり、ボタンは無効化される
 * @default false
 */
loading?: boolean;
/** 無効化状態 @default false */
disabled?: boolean;
/** Tooltip の位置決めやフォーカス管理に使用する ref */
ref?: React.Ref<HTMLButtonElement>;
```

---

## IconButton.tsx:13-14 — `@default` の記載漏れ

### 問題点

**観点**: API設計と開発者体験（DX）
**重要度**: 中

`variant`、`size`、`selected`、`loading`、`disabled`、`type` にはデフォルト値が設定されているが、JSDoc に `@default` が記載されていない。`ai-guide/components.md` で「`@default` でデフォルト値を明示」と記載されている。

```tsx
/* 現在のコード */
/** ボタンのバリアント（表示スタイル） */
variant?: IconButtonVariant;
/** ボタンのサイズ */
size?: IconButtonSize;

/* 改善案 */
/** ボタンのバリアント（表示スタイル） @default 'primary' */
variant?: IconButtonVariant;
/** ボタンのサイズ @default 'medium' */
size?: IconButtonSize;
/** 選択状態（secondary, tertiary, ghostのみ） @default false */
selected?: boolean;
/** type属性 @default 'button' */
type?: 'button' | 'submit' | 'reset';
```

---

## IconButton.tsx:124 — `displayName` の設定

### 問題点

**観点**: コンポーネント設計
**重要度**: 低

`ai-guide/coding-rules.md` の React 19 セクションに「`forwardRef` は不要。`displayName` の設定も不要になる」と記載されている。named export の関数コンポーネントでは `displayName` は不要。

```tsx
/* 現在のコード */
IconButton.displayName = 'IconButton';

/* 改善案 */
// この行を削除する
```

---

## IconButton.tsx:26 — `onClick` の独自 props 宣言

### 問題点

**観点**: API設計と開発者体験（DX）
**重要度**: 低

`onClick` を明示的に props として宣言しているが、`...rest` で Base UI の `BaseButton` に渡しているため、HTML のボタン属性として自然に渡すことも可能。ただし、IconButton は独自の Props interface を持ち `HTMLAttributes` を extends していないため、`onClick` の明示的宣言自体は妥当。しかし、他のHTML属性（`onMouseEnter` 等）が必要になった場合の拡張性を考えると、`React.ButtonHTMLAttributes<HTMLButtonElement>` の extends を検討する価値がある。

現状では大きな問題ではないが、将来的な拡張性を考慮すると改善の余地がある。

---

## icon-button.module.css:80-115 — ボタンサイズの生の値

### 問題点

**観点**: デザイントークンの正確性
**重要度**: 低

ボタンの `inline-size` / `block-size` が `24px`、`32px`、`40px` と生の値で指定されている。デザイントークンが存在するならトークンを使うべきだが、`ai-guide/design-tokens.md` にはボタンサイズ用のトークンが定義されていないため、現状では許容範囲。ただし、アイコンサイズは `var(--icon-size-small, 18px)` のようにトークン化されているので一貫性がやや気になる。

---

## IconButton.tsx:112 — `iconWrapper` に `aria-hidden` がない

### 問題点

**観点**: アクセシビリティ
**重要度**: 低

`loadingSpinner` には `aria-hidden="true"` が設定されているが、`iconWrapper` には設定されていない。アイコンは装飾的要素であり、`aria-label` でボタンの意味は伝えているので、アイコン自体はスクリーンリーダーから隠すべき。

```tsx
/* 現在のコード */
<span className={styles.iconWrapper}>{children}</span>

/* 改善案 */
<span className={styles.iconWrapper} aria-hidden="true">{children}</span>
```

---

## stories/button/icon-button/IconButton.stories.tsx:319 — AllVariants の構造がガイドに準拠していない

### 問題点

**観点**: テスト容易性
**重要度**: 中

SKILL.md のチェックリストに「AllStates系ストーリーは、バリアントを列・状態を行にしたグリッドで構成されているか？」と記載されている。現在の `AllVariants` はサイズごとにグループ化し、その中にバリアント x 状態をグリッドで表示している。構造がやや複雑で、バリアントを列・状態を行にした明確なグリッドレイアウトにはなっていない。

また、AllVariants ストーリーの Hover / Active / Focus セルには擬似状態が適用されていない（`parameters.pseudo` が設定されていない）。実際にはデフォルト状態と同じ見た目になっており、ビジュアルテストとして機能していない。

---

## stories/button/icon-button/IconButton.stories.tsx:1 — 不要な `import React`

### 問題点

**観点**: コーディング規約
**重要度**: 低

`ai-guide/coding-rules.md` に「JSX のためだけの `import React from 'react'` は不要」と記載されている。ただし、このファイルでは `React.Fragment` を使用しているため、React の名前空間インポートは必要。問題なし。

---

## 良い点

### IconButton.tsx — 開発時警告の適切な実装

**観点**: コンポーネント設計

`process.env.NODE_ENV !== 'production'` ガード付きの `console.warn` で、primary variant に selected を渡した場合の警告を出している。`ai-guide/components.md` のベストプラクティスに完全準拠しており、開発者体験が良い。

---

### IconButton.tsx — `aria-pressed` と `aria-busy` の適切な使用

**観点**: アクセシビリティ

選択状態を `aria-pressed` で、ローディング状態を `aria-busy` で正確に伝えている。`undefined` を返すことで不要な属性がレンダリングされない点も正しい。

---

### IconButton.tsx — ツールチップの設計

**観点**: API設計と開発者体験（DX）

`aria-label` をツールチップのテキストとして再利用する設計は、テキストのないアイコンボタンにおいて一貫性のある優れたアプローチ。`tooltip={false}` 時に `title` 属性へフォールバックする点も適切。

---

### IconButton.tsx — className の組み立てパターン

**観点**: コーディング規約

配列 + filter + join パターンを正しく使用しており、`ai-guide/components.md` の推奨パターンに完全準拠。

---

### icon-button.module.css — 擬似クラスによる状態管理

**観点**: CSS設計

`:hover:not(:disabled)`、`:active:not(:disabled)`、`:focus-visible`、`:disabled` を正しく使い分けている。`:focus` は使われておらず、すべて `:focus-visible` で統一されている点が規約通り。

---

### icon-button.module.css — デザイントークンの適切な使用

**観点**: デザイントークンの正確性

ほとんどのスタイルプロパティで `var(--token, fallback)` 形式のデザイントークンが正しく使用されている。フォールバック値も `ai-guide/design-tokens.md` と一致している。

---

### index.ts — エクスポートの正確さ

**観点**: コンポーネント設計

コンポーネントと型を個別に named export しており、`ai-guide/components.md` のエクスポートパターンに完全準拠。

---

## レビュー完了チェックリスト

- [x] `ai-guide/` のドキュメントを参照したか
- [x] `className` prop を外部に公開していないか → **問題なし**
- [x] `showXxx` + 値のセット指定など冗長なAPIがないか → **問題なし**
- [x] HTML属性を独自propsで再宣言していないか → **`onClick` は独自宣言だが、HTMLAttributes を extends していないため妥当**
- [x] disabled/error状態が全構成要素に伝播しているか（アイコン色含む） → **問題なし（単体コンポーネント）**
- [x] `aria-describedby` でエラーメッセージと入力要素が紐づいているか → **該当なし（ボタンコンポーネント）**
- [x] CSSは論理プロパティのみか（`padding` ショートハンドも不可） → **違反あり（padding ショートハンド使用）**
- [x] `:focus-visible` を使用しているか（`:focus` は不可） → **問題なし**
- [x] class名セレクタのみ使用しているか → **違反あり（`.loadingSpinner > svg` タグ名セレクタ）**
- [x] デザイントークンを `var(--token, fallback)` 形式で使っているか（生の値は不可） → **一部違反あり（スピナー 15px）**
- [x] `letter-spacing` は `em` 単位か → **該当なし（テキストなしボタン）**
- [x] アイコンサイズにviewport別の指定があるか → **指定なし（IconButton は viewport prop 未対応だが、PCファースト設計上は許容範囲）**
- [x] PCファーストで720pxのブレイクポイントか → **該当なし（レスポンシブ対応なし）**
- [x] ポリモーフィックrefにintersection型を使っているか → **該当なし（ポリモーフィックではない）**
- [x] ベースコンポーネントに全バリアント共通でないスタイルが混入していないか → **問題なし**
- [x] 不要な再レンダリングを避けているか → **問題なし（メモ化が必要な重い処理はない）**
- [x] `any` や不適切な `as` 使用を避けているか → **問題なし**
- [x] Storybookストーリーは擬似状態ごとに用意されているか → **用意されている（Normal, Hover, Active, Focus, Loading, Disabled）**
