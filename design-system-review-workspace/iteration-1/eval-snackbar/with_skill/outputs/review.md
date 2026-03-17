# Snackbar コンポーネント レビュー

**対象ファイル:**
- `src/components/snackbar/Snackbar.tsx`
- `src/components/snackbar/snackbar.module.css`
- `src/components/snackbar/index.ts`
- `stories/snackbar/Snackbar.stories.tsx`

---

## src/components/snackbar/Snackbar.tsx:81

### [問題点] `className` prop が外部に公開されている

**観点**: コンポーネント設計
**重要度**: 高

`SnackbarViewportProps` に `className` prop が定義されており、外部からスタイルを上書きできる状態になっている。デザインシステムのコンポーネントは閉じたスタイリングを持つべきであり、`className` の外部公開はデザインの一貫性を破壊する。

```tsx
// 現在のコード
export interface SnackbarViewportProps {
  className?: string;
}

function SnackbarViewport({ className }: SnackbarViewportProps) {
  const viewportClassName = [styles.viewport, className]
    .filter(Boolean)
    .join(' ');
  // ...
}

// 改善案
export interface SnackbarViewportProps {}

function SnackbarViewport({}: SnackbarViewportProps) {
  return (
    <Toast.Portal>
      <Toast.Viewport className={styles.viewport}>
        <SnackbarList />
      </Toast.Viewport>
    </Toast.Portal>
  );
}
```

---

## src/components/snackbar/snackbar.module.css:99-101

### [問題点] `padding` ショートハンドは物理プロパティ扱い

**観点**: CSS設計
**重要度**: 高

`.small` で `padding` ショートハンドが使用されている。全辺同値であっても `padding-block` + `padding-inline` に分けて書く必要がある。

```css
/* 現在のコード */
.small {
  padding: var(--spacing-medium, 8px);
}

/* 改善案 */
.small {
  padding-block: var(--spacing-medium, 8px);
  padding-inline: var(--spacing-medium, 8px);
}
```

---

## src/components/snackbar/snackbar.module.css:155

### [問題点] `margin` ショートハンドは物理プロパティ扱い

**観点**: CSS設計
**重要度**: 高

`.text` で `margin: 0` が使用されている。論理プロパティに置き換えるべき。

```css
/* 現在のコード */
.text {
  margin: 0;
}

/* 改善案 */
.text {
  margin-block: 0;
  margin-inline: 0;
}
```

---

## src/components/snackbar/snackbar.module.css:103

### [問題点] `line-height` にパーセンテージ表記の不統一

**観点**: CSS設計
**重要度**: 低

`.small .text` で `line-height: 130%` を使用しているが、ai-guide/styling.md では `1.5`（本文）または `1.3`（小テキスト）のような数値指定が記載されている。一貫性のため数値形式に統一すべき。

```css
/* 現在のコード */
.small .text {
  line-height: 130%;
}

/* 改善案 */
.small .text {
  line-height: 1.3;
}
```

同様に `.medium .text` の `line-height: 150%` も `1.5` に統一すべき。

---

## src/components/snackbar/Snackbar.tsx:149-162

### [問題点] `Toast.Close` に `className={styles.close}` を指定しているが、`.close` クラスがCSSに未定義

**観点**: CSS設計
**重要度**: 中

`SnackbarRoot` で `<Toast.Close className={styles.close} ...>` と指定しているが、`snackbar.module.css` には `.close` クラスが定義されていない。不要なクラス参照であれば削除すべき。もしスタイルが必要であれば定義を追加すべき。

```tsx
// 現在のコード
<Toast.Close
  className={styles.close}
  render={
    <IconButton variant="ghost" size={size} aria-label="閉じる" tooltip={false}>
      <CloseIcon />
    </IconButton>
  }
/>

// 改善案（不要なら className を削除）
<Toast.Close
  render={
    <IconButton variant="ghost" size={size} aria-label="閉じる" tooltip={false}>
      <CloseIcon />
    </IconButton>
  }
/>
```

---

## src/components/snackbar/snackbar.module.css:142-149

### [問題点] アイコンサイズにviewport別の指定がない

**観点**: CSS設計
**重要度**: 中

`.icon` のサイズが `20px` 固定になっているが、デスクトップとスマホでアイコンサイズが異なるケースが多い。Figmaのデザインでモバイル時のサイズが異なる場合は、メディアクエリでviewport別のサイズを指定する必要がある。

```css
/* 現在のコード */
.icon {
  inline-size: 20px;
  block-size: 20px;
}

/* 改善案（モバイルサイズが異なる場合） */
.icon {
  inline-size: 20px;
  block-size: 20px;
}

@media (max-width: 720px) {
  .icon {
    inline-size: 20px; /* Figmaのモバイル指定値に合わせる */
    block-size: 20px;
  }
}
```

---

## src/components/snackbar/snackbar.module.css:63

### [問題点] `font-weight` にデザイントークンが使われていない

**観点**: デザイントークンの正確性
**重要度**: 中

`font-weight: 400` が生の値でハードコードされている。デザイントークン `--typography-font-weight-regular` を使用すべき。

```css
/* 現在のコード */
font-weight: 400;

/* 改善案 */
font-weight: var(--typography-font-weight-regular, 400);
```

---

## src/components/snackbar/Snackbar.tsx:144

### [問題点] アイコンに `aria-hidden` が設定されていない

**観点**: アクセシビリティ
**重要度**: 中

`SuccessIcon` は装飾的なアイコンであり、スクリーンリーダーに読み上げる必要がない。`aria-hidden="true"` を設定すべき。

```tsx
// 現在のコード
<span className={styles.icon}>
  <SuccessIcon />
</span>

// 改善案
<span className={styles.icon} aria-hidden="true">
  <SuccessIcon />
</span>
```

---

## src/components/snackbar/Snackbar.tsx:22

### [問題点] `SnackbarShowOptions` の JSDoc が不十分

**観点**: API設計と開発者体験（DX）
**重要度**: 低

`SnackbarShowOptions` の `size` プロパティの JSDoc が `@default` のみで、挙動の説明がない。

```tsx
// 現在のコード
export interface SnackbarShowOptions {
  /** @default 'small' */
  size?: SnackbarSize;
}

// 改善案
export interface SnackbarShowOptions {
  /** Snackbarの表示サイズ。mediumは複数行テキストに対応 @default 'small' */
  size?: SnackbarSize;
}
```

---

## src/components/snackbar/Snackbar.tsx:60-66

### [問題点] `SnackbarProviderProps` の `children` に JSDoc がない

**観点**: API設計と開発者体験（DX）
**重要度**: 低

```tsx
// 現在のコード
export interface SnackbarProviderProps {
  children: ReactNode;
  /**
   * 自動消去までの時間（ミリ秒）
   * @default 5000
   */
  timeout?: number;
}

// 改善案
export interface SnackbarProviderProps {
  /** プロバイダーで囲む子要素 */
  children: ReactNode;
  /**
   * 自動消去までの時間（ミリ秒）
   * @default 5000
   */
  timeout?: number;
}
```

---

## src/components/snackbar/snackbar.module.css:117

### [問題点] `max-block-size` のフォールバック計算がコメントのみで、デザイントークンが使われていない

**観点**: デザイントークンの正確性
**重要度**: 低

`max-block-size: 87px` が生の値になっている。計算結果をハードコードする場合でも、コメントで計算根拠は記載されているので許容範囲ではあるが、`min-block-size: 56px` も同様に生の値となっている点は留意する。

---

## stories/snackbar/Snackbar.stories.tsx

### [問題点] 擬似状態ストーリーが存在しない

**観点**: テスト容易性
**重要度**: 中

CLAUDE.md および ai-guide/components.md では、各コンポーネントの擬似状態（hover, focus, active等）をStorybookで可視化することが必須とされている。Snackbar自体はインタラクティブなコンポーネントではないが、閉じるボタン（IconButton）のhover/focus状態をSnackbar内で確認できるストーリーがあると、ビジュアルテストの観点で有用。

ただしSnackbarはToast（一時的に表示されるOverlay）であり、ボタンクリックで発火する性質上、擬似状態の静的なストーリーを作ることが難しいコンポーネントであるため、現状のストーリー構成（Small/Medium/LongText/Desktop/Mobile/AllPatterns）は合理的な判断と言える。

---

## src/components/snackbar/snackbar.module.css:23-26

### [改善提案] Viewportの位置指定にデザイントークンの確認

**観点**: デザイントークンの正確性
**重要度**: 低

Viewport の `inset-block-start` と `inset-inline-end` に `--spacing-large` (12px) が使われている。ai-guide/styling.md のSnackbar Viewport例では `--spacing-x-large` (16px) が使われている。Figmaのデザインと照合して正しいトークンを選択すべき。

```css
/* 現在のコード */
.viewport {
  inset-block-start: var(--spacing-large, 12px);
  inset-inline-end: var(--spacing-large, 12px);
}

/* ai-guide/styling.md の例 */
.viewport {
  inset-block-start: var(--spacing-x-large, 16px);
  inset-inline-end: var(--spacing-x-large, 16px);
}
```

---

## src/components/snackbar/snackbar.module.css:34-35

### [改善提案] スマホ版Viewportの位置指定にもデザイントークンの確認

**観点**: デザイントークンの正確性
**重要度**: 低

同様に、スマホ版の `inset-block-end` も `--spacing-large` (12px) が使われているが、ai-guide の例では `--spacing-x-large` (16px) となっている。

---

## 良い点

### src/components/snackbar/Snackbar.tsx 全体

**観点**: API設計と開発者体験（DX）

- `Object.assign({}, { Provider, Viewport })` による複合コンポーネントパターンが ai-guide/components.md のパターンに正確に従っている
- `useSnackbar()` hook による命令的API（`show` / `close`）が直感的で使いやすい
- 成功フィードバック専用という用途の制約がJSDocに明確に記載されており、誤用を防いでいる
- `toSnackbarSize` による型安全なバリデーションが堅実

### src/components/snackbar/snackbar.module.css 全体

**観点**: CSS設計

- 論理プロパティの使用が概ね徹底されている（`inline-size`, `block-size`, `inset-block-start` 等）
- デザイントークンが `var(--token, fallback)` 形式で正しく使用されている
- PCファーストで720pxブレイクポイントのレスポンシブ対応が正しく実装されている
- アニメーション（デスクトップ: 右からスライド、スマホ: 下からスライド）の分岐が適切
- `letter-spacing: 0.02em` が `em` 単位で正しく指定されている
- Snackbar 固有のシャドウトークン（`--elevation-regular`, `--elevation-semi-weak`）が ai-guide/design-tokens.md の定義と一致している

### stories/snackbar/Snackbar.stories.tsx

**観点**: テスト容易性

- デスクトップ/モバイル両方のポジション確認ストーリーが用意されている
- AllPatternsストーリーでサイズバリエーションを一覧確認できる
- デコレータで `Snackbar.Provider` / `Snackbar.Viewport` を適切にラップしている

### src/components/snackbar/index.ts

**観点**: コンポーネント設計

- エクスポートが整理されており、コンポーネント・hook・型が適切にnamed exportされている

---

## レビュー完了チェックリスト

- [x] `ai-guide/` のドキュメントを参照したか
- [x] `className` prop を外部に公開していないか → **NG: `SnackbarViewportProps` で公開されている**
- [x] `showXxx` + 値のセット指定など冗長なAPIがないか → OK
- [x] HTML属性を独自propsで再宣言していないか → OK
- [x] disabled/error状態が全構成要素に伝播しているか（アイコン色含む） → 該当なし（Snackbarにdisabled/error状態はない）
- [x] `aria-describedby` でエラーメッセージと入力要素が紐づいているか → 該当なし
- [x] CSSは論理プロパティのみか（`padding` ショートハンドも不可） → **NG: `.small` で `padding` ショートハンド、`.text` で `margin` ショートハンドを使用**
- [x] `:focus-visible` を使用しているか（`:focus` は不可） → OK（Snackbar本体にはフォーカス状態がない。閉じるボタンはIconButtonに委譲）
- [x] class名セレクタのみ使用しているか → OK
- [x] デザイントークンを `var(--token, fallback)` 形式で使っているか（生の値は不可） → **一部NG: `font-weight: 400` が生の値**
- [x] `letter-spacing` は `em` 単位か → OK
- [x] アイコンサイズにviewport別の指定があるか → **要確認: Figmaデザインとの照合が必要**
- [x] PCファーストで720pxのブレイクポイントか → OK
- [x] ポリモーフィックrefにintersection型を使っているか → 該当なし
- [x] ベースコンポーネントに全バリアント共通でないスタイルが混入していないか → OK（`.root` には共通スタイルのみ、サイズ固有のスタイルは `.small` / `.medium` に分離）
- [x] 不要な再レンダリングを避けているか → OK
- [x] `any` や不適切な `as` 使用を避けているか → OK（`as SnackbarSize` は `toSnackbarSize` 内で型ガード後に使用しており適切）
- [x] Storybookストーリーは擬似状態ごとに用意されているか → 該当外（Snackbarの性質上、擬似状態ストーリーは不要）
