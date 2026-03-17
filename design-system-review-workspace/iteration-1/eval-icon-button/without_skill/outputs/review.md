# IconButton コンポーネント レビュー

**対象:** `src/components/button/icon-button/`
**レビュー日:** 2026-03-10

---

## 総合評価

全体的に高品質なコンポーネント。Base UI をラップし、CSS Modules でスタイルを適用するプロジェクトの方針に沿った実装。アクセシビリティ、型安全性、デザイントークンの活用いずれも良好。以下に改善点と指摘事項をまとめる。

---

## 1. コード品質 (TypeScript / React)

### 良い点

- `aria-label` を必須 prop にしている設計が優秀。アイコンボタンでは必須であり、型レベルで強制できている
- `process.env.NODE_ENV !== 'production'` ガード付き `console.warn` による開発時警告が適切
- `displayName` の設定済み
- `type` のデフォルト値が `'button'` になっており、フォーム内での意図しない submit を防止できている
- デフォルト値が分割代入で設定されており、`defaultProps` を使っていない（プロジェクト規約に準拠）
- `...rest` でその他の props を透過できている

### 指摘事項

#### [中] `iconWrapper` に `aria-hidden` が未設定

```tsx
// 現状
<span className={styles.iconWrapper}>{children}</span>

// 推奨
<span className={styles.iconWrapper} aria-hidden="true">{children}</span>
```

`loadingSpinner` には `aria-hidden="true"` が付与されているが、`iconWrapper` には付与されていない。アイコン SVG が内部にテキストやタイトルを持つ場合、スクリーンリーダーが二重に読み上げる可能性がある。`aria-label` がボタンに設定されているため、アイコン自体は装飾要素として `aria-hidden="true"` を付けるべき。

> 注: 最近のコミットメッセージ `f52d0d1` に「iconWrapperにaria-hiddenを追加」とあるが、現在のコードには反映されていない。マージ時に消失した可能性がある。

#### [低] `ref` を props interface で直接定義している

React 19 では `ref` が通常の prop として渡せるため、これ自体は動作するが、`React.ComponentPropsWithRef` や `forwardRef` との互換性を意識する場合は注意が必要。現時点では問題ないが、プロジェクトの ai-guide で `forwardRef` パターンが推奨されている点と整合性を確認すること。

#### [低] `tooltip` prop の JSDoc に `@default true` が記載されているが、他の prop では `@default` が一貫して省略されている

`variant`, `size`, `selected`, `loading`, `disabled`, `type` にも `@default` を付けると、Storybook の autodocs で一覧表示される際に分かりやすくなる。

---

## 2. アクセシビリティ

### 良い点

- `aria-label` が必須 prop（型レベルで強制）
- `aria-pressed` によるトグル状態の通知
- `aria-busy` によるローディング状態の通知
- `:focus-visible` でキーボードフォーカスのみにフォーカスリングを表示
- `loading` 時に `disabled` を同時設定して操作を防止
- ツールチップのデフォルト有効化（アイコンのみボタンの意味を補完）
- `tooltip={false}` 時に `title` 属性にフォールバック

### 指摘事項

#### [中] `aria-pressed` の型が `'true' | undefined`

```tsx
// 現状
aria-pressed={isSelected ? 'true' : undefined}
```

`aria-pressed` はトグルボタンを示す ARIA 属性。`undefined` にすると「このボタンはトグルボタンではない」という意味になる。これ自体は正しい設計で、`selected` が使えない `primary` バリアントでは `aria-pressed` が出力されない。

ただし、`secondary`/`tertiary`/`ghost` で `selected={false}` の場合も `aria-pressed` が `undefined` になる。トグルボタンとして使われるケースでは、非選択状態でも `aria-pressed="false"` を出力すべき。現状だと、スクリーンリーダーが「このボタンはトグルボタンである」こと自体を認識できない。

```tsx
// 改善案: variant が primary 以外で、selected prop が明示的に渡された場合
aria-pressed={variant !== 'primary' ? (selected ? 'true' : 'false') : undefined}
```

ただし、これは「selected prop が渡されていないときはトグルボタンではない」という判断も必要になるため、別途 `toggle` のような prop を設けるか、`selected` の型を `boolean | undefined` にして `undefined` のときは `aria-pressed` を出力しないという設計も考えられる。

#### [低] ローディング中のスクリーンリーダー通知

`aria-busy="true"` は設定されているが、「何が処理中か」の情報は `aria-label` に依存している。ストーリーでは `aria-label="処理中"` と記載されているが、実際の利用では元の `aria-label`（例: 「検索」）のまま `loading` に切り替わることが多い。`aria-live` リージョンを使ったローディング開始/終了の通知は、このコンポーネントの責務外として割り切るのは妥当。

---

## 3. CSS 設計

### 良い点

- CSS Modules でスコープ化
- デザイントークンをフォールバック値付きで使用（`var(--token, fallback)` 形式）
- `all: unset` + `box-sizing: border-box` のリセットパターン
- 論理プロパティ（`inline-size`, `block-size`）の使用
- `:hover:not(:disabled)` パターンで disabled 時のホバーを防止
- `:focus-visible` によるフォーカスリング（`:focus` は未使用）
- `.loading` と `:disabled` で同じスタイルを共有
- 2重リング（白 + ダーク）の `box-shadow` によるフォーカスリングの統一
- クラス名がシンプルで BEM 不使用
- `!important` 不使用

### 指摘事項

#### [中] `padding` プロパティが物理プロパティのまま

```css
/* 現状 */
.button.small {
  padding: 2px;
}
.button.medium {
  padding: var(--spacing-small, 4px);
}
.button.large {
  padding: var(--spacing-small, 4px);
}
```

プロジェクトの規約では論理プロパティの使用が必須（YOU MUST）とされている。`padding` は物理プロパティだが、4方向すべて同じ値の場合は `padding` ショートハンドでも方向性がないため許容される、という解釈もできる。ただし厳密には `padding-block` + `padding-inline` に分けるべき。

```css
/* 厳密に論理プロパティにする場合 */
.button.small {
  padding-block: 2px;
  padding-inline: 2px;
}
```

ただし、実用上は 4方向同値の `padding` は方向に依存しないため、現状でも問題ない。プロジェクト内の他コンポーネントとの一貫性を優先すること。

#### [中] `.loadingSpinner > svg` がタグセレクタを使用

```css
.loadingSpinner > svg {
  inline-size: 15px;
  block-size: 15px;
  animation: spin 1s linear infinite;
}
```

プロジェクトの規約では「タグ名セレクタは使用しない」（YOU MUST）とされている。`SpinnerIcon` コンポーネント側にサイズとアニメーションを適用するか、SVG にクラスを付与する方法を検討すべき。

```css
/* 改善案: SpinnerIcon にクラスを渡す、または SpinnerIcon 内部でサイズを制御 */
.spinnerSvg {
  inline-size: 15px;
  block-size: 15px;
  animation: spin 1s linear infinite;
}
```

#### [低] `outline: none` が冗長

```css
.button {
  all: unset;
  /* ... */
  outline: none; /* <- 冗長 */
}
```

`all: unset` がすべてのプロパティをリセットするため、`outline: none` は冗長。ai-guide の styling.md でも「`all: unset` の後に `outline: none` 等の個別リセットは冗長になるため書かない」と明記されている。

#### [低] `.button.small` の `padding: 2px` がデザイントークン未使用

`medium` と `large` では `var(--spacing-small, 4px)` を使用しているが、`small` では `2px` がハードコードされている。対応するトークンがない場合は仕方ないが、コメントで意図を明記するとよい。

#### [低] ローディングスピナーの SVG サイズ `15px` がデザイントークン未使用

```css
.loadingSpinner > svg {
  inline-size: 15px;
  block-size: 15px;
}
```

他のアイコンサイズ（`--icon-size-small: 18px`, `--icon-size-medium: 20px`, `--icon-size-large: 22px`）はトークンを使用しているが、スピナーの `15px` はハードコード。サイズ別にスピナーサイズを変えるか、トークンを定義することを検討。

---

## 4. Storybook

### 良い点

- 擬似状態（Hover, Active, Focus）のストーリーが Storybook Pseudo States で実装されている
- Loading / Disabled のストーリーがある
- 全バリアント一覧の `AllVariants` ストーリーで網羅的に確認できる
- `autodocs` タグが設定されている
- `argTypes` で各 prop の説明が記載されている

### 指摘事項

#### [中] `AllVariants` ストーリーで Hover/Active/Focus の擬似状態が視覚的に確認できない

`AllVariants` の render 内に Hover/Active/Focus 用の `<div>` ラッパーがあるが、`parameters.pseudo` が設定されていないため、実際には通常状態で表示される。ストーリー単位で `pseudo` を設定するか、コメントで「手動操作で確認」と明記すべき。

#### [低] `Hover`, `Active`, `Focus` ストーリーで `tooltip: false` が設定されている

擬似状態の表示テスト用に `tooltip: false` にしているのは理解できるが、実際のユーザー体験（ツールチップあり）でのテストストーリーも用意するとよい。

#### [低] Selected 状態の個別ストーリーがない

各バリアントのストーリー（Secondary, Tertiary, Ghost）で Selected 状態が含まれているが、独立した `Selected` ストーリー（擬似状態付き）があると、ビジュアルリグレッションテストで便利。

---

## 5. コンポーネント設計

### 良い点

- 単体コンポーネントとして適切な粒度
- Tooltip との統合が巧み（デフォルト有効、`aria-label` から自動取得）
- `tooltip={false}` 時の `title` フォールバックで、ツールチップ非表示時もマウスホバーで説明が出る
- `primary` での `selected` 使用に対する開発時警告
- バリアント/サイズの型定義が union type で適切

### 指摘事項

#### [低] `className` prop が公開されていない（規約準拠 -- 良い）

プロジェクトの規約通り、`className` を外部に公開していない点は正しい。

#### [低] `...rest` の型安全性

`IconButtonProps` は HTML 属性を extends していないため、`...rest` に渡される props の型が `Record<string, unknown>` 相当になる。意図しない props が `BaseButton` に渡される可能性がある。ただし、デザインシステムでは prop を最小限に抑える方針なので、現状の設計で問題ない。もし将来 `data-*` 属性などを渡す必要が出た場合は、`React.ButtonHTMLAttributes` から必要なものだけ `Pick` するか、`Omit` で拡張することを検討。

---

## 改善優先度まとめ

| 優先度 | 項目 | カテゴリ |
|--------|------|----------|
| 中 | `iconWrapper` に `aria-hidden="true"` を追加 | アクセシビリティ |
| 中 | `.loadingSpinner > svg` のタグセレクタをクラスセレクタに変更 | CSS規約 |
| 中 | `aria-pressed` のトグルボタン意味論を再検討 | アクセシビリティ |
| 中 | `AllVariants` の擬似状態表示の改善 | Storybook |
| 低 | `outline: none` の冗長な記述を削除 | CSS |
| 低 | `padding` の論理プロパティ化を検討 | CSS規約 |
| 低 | `small` の `padding: 2px` と spinner の `15px` にトークンまたはコメント追加 | デザイントークン |
| 低 | JSDoc の `@default` を他の prop にも追加 | ドキュメント |
| 低 | Selected 状態の個別ストーリー追加 | Storybook |
