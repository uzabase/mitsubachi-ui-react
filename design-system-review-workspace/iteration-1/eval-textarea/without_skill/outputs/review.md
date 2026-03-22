# TextArea コンポーネント レビュー

**対象**: `src/components/text-area/text-area/`

---

## 総合評価

全体的に高品質な実装。CSS設計・アクセシビリティ・コンポーネント設計の各面でプロジェクト規約に沿っている。以下に改善点と懸念事項を挙げる。

---

## 1. コード品質

### 1-1. `import React` が不要（重要度: 低）

```tsx
import React, { useState, useCallback, useId, useRef } from 'react';
```

プロジェクトは `tsconfig.json` で `"jsx": "react-jsx"` を設定済みであり、`coding-rules.md` に「JSX のためだけの `import React from 'react'` は不要」と明記されている。ただし、`React.TextareaHTMLAttributes` や `React.ChangeEvent` などの型参照で `React` 名前空間を使用しているため、このインポート自体は妥当。型参照のみであれば `import type React from 'react'` と `import { useState, useCallback, useId, useRef } from 'react'` に分離するとより明確になる。

### 1-2. `className` prop を外部に公開している（重要度: 高）

```tsx
export const TextArea = ({
  // ...
  className,
  // ...
}: TextAreaProps) => {
```

`TextAreaProps` は `React.TextareaHTMLAttributes<HTMLTextAreaElement>` を extends しており、`className` が外部に公開されている。`components.md` の「12. className prop の禁止」に抵触する。デザインシステムのコンポーネントは利用側からのスタイル上書きを防ぐため `className` を受け付けるべきではない。

**推奨**: `Omit` に `'className'` を追加するか、`className` を受け取らずに内部で閉じる。

```tsx
export interface TextAreaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size' | 'className'
> {
```

### 1-3. JSDoc の `@default` が不足（重要度: 中）

Props の JSDoc にデフォルト値を持つプロパティの `@default` 記述がない。

```tsx
/** テキストエリアのサイズ */
size?: TextAreaSize;
```

規約に従い、以下のように書くべき:

```tsx
/** テキストエリアのサイズ @default 'medium' */
size?: TextAreaSize;
/** ビューポート @default 'desktop' */
viewport?: Viewport;
/** エラー状態 @default false */
error?: boolean;
```

### 1-4. `showCount` の JSDoc が挙動を十分に説明していない（重要度: 低）

```tsx
/** 文字数カウント表示（maxCount 設定時は自動表示） */
showCount?: boolean;
```

実装を見ると `showCount !== false && maxCount !== undefined` という条件であり、`showCount` を `true` にしても `maxCount` がなければカウントは表示されない。つまり `showCount` は「maxCountがある時にカウント表示を抑制する」ためのフラグ。JSDoc がこの挙動を正確に伝えていない。

**推奨**:
```tsx
/** maxCount 設定時の文字数カウント表示を制御する。false に設定するとカウントを非表示にする */
showCount?: boolean;
```

### 1-5. `Viewport` 型の再利用性（重要度: 低）

`Viewport` 型がこのファイル内で定義されエクスポートされているが、他のコンポーネント（TextAreaUnit等）でも同じ概念を使う。共通型として `src/types/` などに切り出すと重複を避けられる。ただし、現状のプロジェクト構造を見ると他コンポーネントでも個別定義しているようなので、プロジェクト全体の方針として統一するかどうかの判断が必要。

---

## 2. アクセシビリティ

### 2-1. `aria-invalid` と `aria-describedby` の実装は適切

```tsx
aria-invalid={error || undefined}
aria-describedby={hasError ? errorListId : undefined}
```

`error` が `true` の場合に `aria-invalid` を設定し、エラーメッセージがある場合のみ `aria-describedby` で関連付けている。パターンとして正しい。

### 2-2. `role="alert"` の使用に注意（重要度: 中）

```tsx
<div id={errorListId} className={styles.errorList} role="alert">
```

`role="alert"` はライブリージョンであり、要素がDOMに追加された時点でスクリーンリーダーに即座にアナウンスされる。初期レンダリング時にエラーメッセージが存在する場合（サーバーサイドバリデーション後のリロード等）、ページ読み込み直後にアナウンスが発生する可能性がある。

これは意図した動作であれば問題ないが、フォーム送信後のバリデーションエラー通知としては適切。初期表示のみの静的なエラー表示の場合は `role="alert"` ではなくエラーテキストを `aria-describedby` で関連付けるだけで十分な場合もある。現在の実装は `aria-describedby` も併用しているため、問題は小さい。

### 2-3. 文字数カウントがスクリーンリーダーに通知されない（重要度: 中）

文字数カウント (`shouldShowCount`) の表示部分に `aria-live` が設定されていない。視覚的にはカウントが更新されるが、スクリーンリーダーユーザーには現在の文字数や超過状態が伝わらない。

**推奨**: カウント表示に `aria-live="polite"` を追加し、リアルタイムの文字数変化を通知する。ただし、キー入力毎のアナウンスは煩わしいため、超過時のみアナウンスするか、デバウンスを検討する。

```tsx
<div className={countClassName} aria-live="polite">
```

### 2-4. `maxCount` 超過時に `aria-invalid` が自動設定されない（重要度: 中）

`maxCount` を超過しても `error` prop を明示的に `true` にしない限り `aria-invalid` は設定されない。文字数超過はバリデーションエラーの一種であるため、超過時に自動で `aria-invalid="true"` を設定することを検討すべき。

現状は利用側で `error={currentLength > maxCount}` のように制御する必要があるが、これは利用側に責任を転嫁している。コンポーネント内で `isCountOver` 時に自動的にエラー状態にする選択肢もある。

### 2-5. ハイライトオーバーレイの `aria-hidden="true"` は適切

```tsx
<div className={highlightClassName} ref={highlightRef} aria-hidden="true">
```

視覚的な装飾用のオーバーレイを正しく支援技術から隠している。

### 2-6. エラーアイコンの `aria-hidden` が未設定（重要度: 低）

```tsx
<span className={styles.errorIcon}>
  <ErrorIcon />
</span>
```

`ErrorIcon` コンポーネント自体が `aria-hidden="true"` を内部で設定しているかどうかによるが、装飾的なアイコンであるならラッパー `<span>` に `aria-hidden="true"` を追加すると確実。

---

## 3. CSS 設計

### 3-1. 論理プロパティの使用は適切

`inline-size`, `block-size`, `padding-block`, `padding-inline`, `min-inline-size`, `min-block-size` など、一貫して論理プロパティを使用している。規約に準拠。

### 3-2. 擬似クラスの使用は適切

`:hover:not(:disabled):not(:focus-visible)`, `:focus-visible`, `:disabled` を正しく使い分けている。`outline: none` + `box-shadow` によるフォーカスリングも規約通り。

### 3-3. `transition` が未設定（重要度: 中）

`styling.md` のアニメーションセクションでは、インタラクティブ要素に `transition` を推奨しているが、TextArea の `.textarea` クラスには `transition` が設定されていない。hover 時の `border-color` 変化や focus 時の `box-shadow` 変化がアニメーションなしで瞬時に切り替わる。

**推奨**:
```css
.textarea {
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}
```

### 3-4. `gap: 2px` がデザイントークンを使用していない（重要度: 低）

```css
.count {
  gap: 2px;
}
.errorItem {
  gap: 2px;
}
```

他のスペーシングは `var(--spacing-small, 4px)` などトークンを使用しているが、`2px` はハードコードされている。2px に対応するトークンが存在しない可能性もあるが、確認が必要。

### 3-5. ハイライトとテキストエリアのスタイル同期がフラジャイル（重要度: 中）

ハイライトオーバーレイ（`.highlight`, `.highlightMedium`, `.highlightLarge`）は、`.textarea` のフォント・パディング・ボーダーと完全に同期する必要がある。現在は手動で値を複製しているため、一方を変更した際にもう一方の更新を忘れるリスクがある。

**推奨**: CSS カスタムプロパティでテキストエリアのレイアウト値を共有する。

```css
.textareaWrapper {
  --ta-padding-block: var(--spacing-medium, 8px);
  --ta-padding-inline: var(--spacing-medium, 8px);
  --ta-font-size: var(--font-scale-40, 14px);
}

.textarea.medium {
  padding-block: var(--ta-padding-block);
  padding-inline: var(--ta-padding-inline);
  font-size: var(--ta-font-size);
}

.highlightMedium {
  padding-block: var(--ta-padding-block);
  padding-inline: var(--ta-padding-inline);
  font-size: var(--ta-font-size);
}
```

### 3-6. `justify-content: flex-start` は冗長（重要度: 極低）

```css
.count {
  justify-content: flex-start;
}
```

`flex-start` は `justify-content` のデフォルト値であるため、この宣言は不要。削除しても動作は変わらない。

---

## 4. コンポーネント設計

### 4-1. Controlled / Uncontrolled の両対応は適切

`value` の有無で制御/非制御モードを切り替えており、`handleChange` で内部状態を正しく更新している。パターンとして正しい。

### 4-2. `useCallback` の使用は適切

`handleChange` と `handleScroll` を `useCallback` でメモ化している。依存配列も正しい。

### 4-3. `errorMessages` の `key` に `index` を使用（重要度: 低）

```tsx
{errorMessages.map((message, index) => (
  <div key={index} className={styles.errorItem}>
```

エラーメッセージのリストは通常並び替えや挿入が発生しないため、`index` をキーに使うことは実用上問題ない。ただし、メッセージ文字列自体をキーにする方がより安全。

```tsx
{errorMessages.map((message) => (
  <div key={message} className={styles.errorItem}>
```

### 4-4. `ref` prop が未サポート（重要度: 中）

`TextAreaProps` で `React.TextareaHTMLAttributes` を extends しているが、コンポーネント自体は内部で `textareaRef` を作成しており、外部から `ref` を渡す手段がない。React 19 では ref を props として受け取れるため、外部からの ref と内部 ref を統合する仕組みが必要。

**推奨**: `ref` を props で受け取り、内部 ref と統合する。

```tsx
export interface TextAreaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size' | 'className'
> {
  ref?: React.Ref<HTMLTextAreaElement>;
  // ...
}

export const TextArea = ({
  ref,
  // ...
}: TextAreaProps) => {
  const internalRef = useRef<HTMLTextAreaElement>(null);
  // React 19: useImperativeHandle or callback ref to merge
```

### 4-5. `hasError` の条件が厳格すぎる可能性（重要度: 低）

```tsx
const hasError = error && errorMessages != null && errorMessages.length > 0;
```

`error` が `true` でも `errorMessages` が空配列や未指定の場合、`aria-describedby` が設定されない。これ自体は正しい（参照先がないため）が、`error` が `true` で `errorMessages` がない場合にエラーの視覚的表示（赤ボーダー）はあるのにスクリーンリーダーへの説明がない状態になる。利用側がこの不整合を起こさないよう、型レベルで制約するか、ドキュメントで明記すべき。

---

## 5. Storybook

### 5-1. 擬似状態ストーリーは適切に網羅されている

Default, Hover, Focus, Disabled, Error, ErrorHover, ErrorFocus の各状態が個別のストーリーとして用意されている。プロジェクト規約に準拠。

### 5-2. `Active` 状態のストーリーが不足（重要度: 低）

他のコンポーネントの規約では Normal, Hover, Active, Focus, Disabled を用意するよう記載があるが、TextArea に `:active` スタイルがないため、不要と判断できる。問題なし。

### 5-3. AllStates ストーリーでの網羅性は良好

Standard と Count の比較、各状態（Default, With Text, Disabled, Error等）を一覧で確認できる。

---

## 6. テスト

### 6-1. ユニットテストが存在しない（重要度: 高）

`src/components/text-area/` 配下にテストファイルが見当たらない。以下の観点でテストが必要:

- Controlled / Uncontrolled モードの動作
- 文字数カウントの表示/非表示
- 文字数超過時のハイライト表示
- エラーメッセージの表示
- `aria-invalid`, `aria-describedby` の適切な設定
- disabled 状態の挙動
- スクロール同期（ハイライトオーバーレイ）

---

## 改善点サマリー（優先度順）

| 優先度 | 項目 | セクション |
|--------|------|-----------|
| 高 | `className` prop の外部公開を禁止する | 1-2 |
| 高 | ユニットテストを追加する | 6-1 |
| 中 | `ref` prop をサポートする（React 19 パターン） | 4-4 |
| 中 | 文字数カウントに `aria-live` を追加する | 2-3 |
| 中 | `transition` を追加する | 3-3 |
| 中 | ハイライトとテキストエリアのスタイル同期を堅牢にする | 3-5 |
| 中 | JSDoc に `@default` を追記する | 1-3 |
| 中 | `maxCount` 超過時の `aria-invalid` 自動設定を検討する | 2-4 |
| 低 | `showCount` の JSDoc を改善する | 1-4 |
| 低 | エラーメッセージの `key` を `message` に変更する | 4-3 |
| 低 | `import React` を型用と値用で分離する | 1-1 |
| 低 | エラーアイコンラッパーに `aria-hidden` を追加する | 2-6 |
