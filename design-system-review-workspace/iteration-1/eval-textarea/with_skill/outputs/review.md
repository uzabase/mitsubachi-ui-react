# TextArea コンポーネント レビュー

対象: `src/components/text-area/text-area/`

---

## TextArea.tsx:24-25

### 問題点: `showCount` と `maxCount` の冗長なAPI

**観点**: API設計と開発者体験（DX）
**重要度**: 高

`showCount` と `maxCount` がセット指定を要求する冗長なAPIになっている。現在の実装では `shouldShowCount = showCount !== false && maxCount !== undefined` となっており、`maxCount` を指定すれば自動的にカウントが表示される仕組みだが、`showCount` propの存在自体が不要。`maxCount` の有無で表示を判定すれば十分であり、`showCount` を残すと利用者に混乱を与える。

```tsx
// 現在のコード
/** 文字数カウント表示（maxCount 設定時は自動表示） */
showCount?: boolean;
/** 最大文字数 */
maxCount?: number;

// 改善案: showCount を削除し、maxCount の有無で判定
/** 最大文字数。指定すると文字数カウントが表示される */
maxCount?: number;
```

---

## TextArea.tsx:40

### 問題点: `className` propの外部公開

**観点**: コンポーネント設計
**重要度**: 高

`className` が `TextareaHTMLAttributes` の `extends` 経由で受け取れる状態になっており、さらに40行目で明示的にdestructureされ、89行目で `textareaClassName` に結合されている。デザインシステムのコンポーネントは `className` を外部に公開してはならない。利用側からのスタイル上書きはデザインの一貫性を破壊する。

```tsx
// 現在のコード (TextArea.tsx:40, 89)
className,
// ...
const textareaClassName = [
  styles.textarea,
  styles[size],
  error && styles.error,
  showHighlight && styles.textTransparent,
  className,  // ← 外部のclassNameを混入
]

// 改善案: className を Omit で除外し、destructure から削除
export interface TextAreaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size' | 'className'
> {
  // ...
}

// destructure から className を削除
const textareaClassName = [
  styles.textarea,
  styles[size],
  error && styles.error,
  showHighlight && styles.textTransparent,
]
  .filter(Boolean)
  .join(' ');
```

---

## TextArea.tsx:19

### 問題点: `error` と `errorMessages` の冗長なAPI

**観点**: API設計と開発者体験（DX）
**重要度**: 中

`error` ブール値と `errorMessages` 配列の2つのpropsを常にセットで渡させている。`errorMessages` が存在すれば自動的にエラー状態と判定できるため、`error` propは冗長。ただし、エラーメッセージなしでボーダーだけエラー色にしたいケースがあるなら `error` を残す合理性はある。その場合はJSDocにそのユースケースを明記すべき。

```tsx
// 現在のコード
/** エラー状態 */
error?: boolean;
/** エラーメッセージ一覧 */
errorMessages?: string[];

// 改善案A: errorMessages の有無で判定（error prop を削除）
/** エラーメッセージ一覧。指定するとエラー状態になり、ボーダーがエラー色に変わる */
errorMessages?: string[];

// 改善案B: error を残すなら用途を明記
/** エラー状態。ボーダーをエラー色に変更する。errorMessages なしでも単独で使用可能 @default false */
error?: boolean;
```

---

## TextArea.tsx:15-16

### 問題点: JSDocが不十分 — props名の繰り返しだけで挙動が伝わらない

**観点**: API設計と開発者体験（DX）
**重要度**: 中

複数のpropsのJSDocが名前の繰り返しに留まり、挙動や副作用が記述されていない。コーディング規約では「props名の繰り返しを避ける」「挙動・副作用があれば明記する」とされている。

```tsx
// 現在のコード
/** テキストエリアのサイズ */
size?: TextAreaSize;
/** ビューポート */
viewport?: Viewport;
/** エラー状態 */
error?: boolean;

// 改善案
/** テキストエリアの高さとフォントサイズを制御する @default 'medium' */
size?: TextAreaSize;
/** レスポンシブ対応。phoneを指定するとmediumがlarge相当のサイズに昇格する @default 'desktop' */
viewport?: Viewport;
/**
 * エラー状態。ボーダーをエラー色に変更し、errorMessagesと組み合わせてエラーメッセージを表示する
 * @default false
 */
error?: boolean;
```

---

## TextArea.tsx:45-46

### 問題点: HTML属性 `disabled` の独自destructure

**観点**: API設計と開発者体験（DX）
**重要度**: 低

`disabled` を明示的にdestructureしているが、TextAreaProps で `disabled` を再宣言していないため、`...rest` 経由でもネイティブ要素に渡せる。ただし、コンポーネント内部で `disabled` を参照する必要があるため（カウント表示のスタイル制御など）、このdestructureは実装上必要であり問題なし。

---

## text-area.module.css:29

### 問題点: トークン名の不一致 `--radius-medium` vs `--border-radius-medium`

**観点**: デザイントークンの正確性
**重要度**: 高

`design-tokens.md` では `--border-radius-medium` と定義されているが、CSSでは `--radius-medium` が使用されている。トークン名が一致していないと、利用側アプリケーションがトークンを提供した際に正しく適用されない。

```css
/* 現在のコード (text-area.module.css:29) */
border-radius: var(--radius-medium, 6px);

/* 改善案 */
border-radius: var(--border-radius-medium, 6px);
```

同じ問題が `.highlight` (218行目) にも存在する。

```css
/* 現在のコード (text-area.module.css:218) */
border-radius: var(--radius-medium, 6px);

/* 改善案 */
border-radius: var(--border-radius-medium, 6px);
```

---

## text-area.module.css:127

### 問題点: `gap` に生の値を使用

**観点**: CSS設計 / デザイントークン
**重要度**: 中

`.count` の `gap: 2px` と `.errorItem` の `gap: 2px` が生の値で指定されている。デザイントークンを使用すべき。`--spacing-x-small` (2px) が該当する。

```css
/* 現在のコード */
.count {
  gap: 2px;
}
.errorItem {
  gap: 2px;
}

/* 改善案 */
.count {
  gap: var(--spacing-x-small, 2px);
}
.errorItem {
  gap: var(--spacing-x-small, 2px);
}
```

---

## text-area.module.css:34

### 問題点: ベースの `.textarea` にfont-sizeを指定

**観点**: コンポーネント設計 / ベースコンポーネントにバリアント固有スタイルを入れない
**重要度**: 中

`.textarea` のベーススタイルに `font-size: var(--font-scale-50, 16px)` を指定し、`.textarea.medium` で `font-size: var(--font-scale-40, 14px)` に上書きしている。ベースには全バリアント共通のスタイルのみ定義すべきであり、font-sizeはサイズバリアントごとに異なるため、各バリアントクラスで指定する方が明確。

```css
/* 現在のコード */
.textarea {
  font-size: var(--font-scale-50, 16px); /* large用の値をベースに */
}
.textarea.medium {
  font-size: var(--font-scale-40, 14px); /* mediumで上書き */
}
.textarea.large {
  /* font-size の指定なし（ベースの16pxを継承） */
}

/* 改善案: ベースからfont-sizeを削除し、各バリアントで明示 */
.textarea {
  /* font-size は各サイズバリアントで指定 */
}
.textarea.medium {
  font-size: var(--font-scale-40, 14px);
}
.textarea.large {
  font-size: var(--font-scale-50, 16px);
}
```

---

## text-area.module.css:9, 129

### 問題点: `.container` の `gap` と `.count` の `justify-content` で物理的な値を使用

**観点**: CSS設計
**重要度**: 低

`justify-content: flex-start` は方向に依存しない標準的なflexbox値であり、論理プロパティの範疇外なので問題なし。

---

## ErrorIcon.tsx:3-5

### 問題点: ErrorIcon に `aria-hidden` が設定されていない

**観点**: アクセシビリティ
**重要度**: 中

`ErrorIcon` は装飾的なアイコンとして使用されており（隣接する `errorText` でテキストが提供される）、SVGに `aria-hidden="true"` を付与すべき。ただしこれは TextArea コンポーネント外の問題であり、呼び出し側の `.errorIcon` の `<span>` に `aria-hidden="true"` を付けるか、ErrorIcon 自体に付与する。

```tsx
// 現在のコード (TextArea.tsx:153-155)
<span className={styles.errorIcon}>
  <ErrorIcon />
</span>

// 改善案: span に aria-hidden を付与
<span className={styles.errorIcon} aria-hidden="true">
  <ErrorIcon />
</span>
```

---

## TextArea.tsx:1

### 問題点: 不要な `React` のデフォルトインポート

**観点**: コーディング規約 (React 19)
**重要度**: 低

`import React` は `React.TextareaHTMLAttributes` と `React.ChangeEvent` 等の型参照で必要なので、この場合は正当。ただし `import type` で型のみのインポートに変えるとバンドルサイズの観点で望ましい。現状はランタイムで `React` を使っていないため。

```tsx
// 現在のコード
import React, { useState, useCallback, useId, useRef } from 'react';

// 改善案: 型だけなら import type を使う
import { useState, useCallback, useId, useRef } from 'react';
import type React from 'react';
```

---

## text-area.module.css:180-182

### 問題点: errorIcon のサイズにviewport別の指定がない

**観点**: CSS設計
**重要度**: 低

`.errorIcon` のサイズ (`inline-size: 20px`, `block-size: 20px`) にphone viewport向けの指定がない。エラーアイコンのサイズがdesktopとphoneで同じであればこれで問題ないが、他のコンポーネントとの整合性のため確認が望ましい。

---

## TextArea.stories.tsx

### 問題点: Active状態のストーリーが欠けている

**観点**: テスト容易性 / Storybook
**重要度**: 中

擬似状態ストーリーとして Hover、Focus、Disabled は用意されているが、Active 状態のストーリーがない。コーディング規約では「Normal, Hover, Active, Focus, Disabled を作成」と明記されている。

```tsx
// 追加すべきストーリー
export const Active: Story = {
  args: {
    placeholder: 'Placeholder',
  },
  parameters: {
    pseudo: { active: true },
  },
};
```

---

## TextArea.stories.tsx:295-350

### 問題点: AllStates ストーリーのグリッド構成

**観点**: テスト容易性 / Storybook
**重要度**: 低

AllStates ストーリーが「バリアントを列・状態を行」のグリッド構成になっており、規約に沿っている。ただしHover / Focus / Active の擬似状態行が含まれていない。ビジュアルテストの網羅性を高めるために、擬似状態の行も追加することを検討すべき。

---

## TextArea.tsx:58, 137-138

### 良い点: アクセシビリティの適切な実装

**観点**: アクセシビリティ
**重要度**: -

`aria-invalid` と `aria-describedby` を適切に使用し、`useId()` でIDを生成してエラーメッセージと入力要素を紐づけている。`role="alert"` もエラーリスト要素に設定されている。SKILLドキュメントで指摘されているパターンを正しく実装している。

---

## TextArea.tsx:48-72

### 良い点: Controlled / Uncontrolled の両対応

**観点**: コンポーネント設計
**重要度**: -

`value` と `defaultValue` の両方に対応し、`isControlled` フラグで適切に制御している。`useCallback` によるメモ化も適切。

---

## text-area.module.css:76-96

### 良い点: 擬似クラスによる状態管理

**観点**: CSS設計
**重要度**: -

`:hover:not(:disabled):not(:focus-visible)`, `:focus-visible`, `:disabled` を正しく使用。フォーカスリングも2重リング（白内環 + #191919外環）のbox-shadowで統一されている。

---

## text-area.module.css:36-37

### 良い点: letter-spacing に em 単位を使用

**観点**: CSS設計
**重要度**: -

`letter-spacing: 0.02em` と規約通りの em 単位で指定されている。

---

## text-area.module.css

### 良い点: 論理プロパティの使用

**観点**: CSS設計
**重要度**: -

`inline-size`, `block-size`, `padding-block`, `padding-inline`, `min-block-size`, `min-inline-size` など、論理プロパティが一貫して使用されている。

---

## text-area.module.css:260-264

### 良い点: 文字数超過ハイライトの実装

**観点**: コンポーネント設計
**重要度**: -

テキスト透過 + ハイライトオーバーレイによる文字数超過の視覚的フィードバックは、UXとして優れた実装。`aria-hidden="true"` もハイライトレイヤーに正しく設定されている。

---

# レビュー完了チェックリスト

- [x] `ai-guide/` のドキュメントを参照したか
- [x] `className` prop を外部に公開していないか → **違反あり（指摘済み）**
- [x] `showXxx` + 値のセット指定など冗長なAPIがないか → **`showCount` + `maxCount` に該当（指摘済み）**
- [x] HTML属性を独自propsで再宣言していないか → 問題なし
- [x] disabled/error状態が全構成要素に伝播しているか（アイコン色含む） → ErrorIconはCSS変数 `--object-error` を使用しておりdisabled時の色変更はないが、disabled時にエラーメッセージ自体が表示されないフローであれば問題なし
- [x] `aria-describedby` でエラーメッセージと入力要素が紐づいているか → 適切に実装済み
- [x] CSSは論理プロパティのみか（`padding` ショートハンドも不可） → 問題なし
- [x] `:focus-visible` を使用しているか（`:focus` は不可） → 問題なし
- [x] class名セレクタのみ使用しているか → 問題なし
- [x] デザイントークンを `var(--token, fallback)` 形式で使っているか（生の値は不可） → **`gap: 2px` が2箇所で違反（指摘済み）**
- [x] `letter-spacing` は `em` 単位か → 問題なし
- [x] アイコンサイズにviewport別の指定があるか → **指摘済み（軽微）**
- [x] PCファーストで720pxのブレイクポイントか → viewport propパターンを使用（問題なし）
- [x] ポリモーフィックrefにintersection型を使っているか → 該当なし
- [x] ベースコンポーネントに全バリアント共通でないスタイルが混入していないか → **font-sizeがベースに混入（指摘済み）**
- [x] 不要な再レンダリングを避けているか → `useCallback` で適切にメモ化済み
- [x] `any` や不適切な `as` 使用を避けているか → 問題なし
- [x] Storybookストーリーは擬似状態ごとに用意されているか → **Active状態が欠けている（指摘済み）**
