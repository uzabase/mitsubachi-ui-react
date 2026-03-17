# Snackbar コンポーネント レビュー

## 対象ファイル

- `src/components/snackbar/Snackbar.tsx`
- `src/components/snackbar/snackbar.module.css`
- `src/components/snackbar/index.ts`
- `stories/snackbar/Snackbar.stories.tsx`

---

## 総合評価

全体的に良い設計のコンポーネント。Base UI の Toast をうまくラップし、成功フィードバック専用という明確なスコープを持っている。複合コンポーネントパターン（`Snackbar.Provider` / `Snackbar.Viewport`）の採用、CSS 論理プロパティの使用、デザイントークンの活用など、プロジェクトの規約に概ね沿った実装になっている。以下、改善すべき点を指摘する。

---

## 1. アクセシビリティ

### 1-1. SuccessIcon に `aria-hidden` が付与されていない（重要度: 中）

`SnackbarRoot` 内のアイコンは装飾的な要素であり、テキストと重複した情報を伝えている。`aria-hidden="true"` を付与してスクリーンリーダーから隠すべき。

**該当箇所:** `Snackbar.tsx` L144

```tsx
// 現状
<span className={styles.icon}>
  <SuccessIcon />
</span>

// 推奨
<span className={styles.icon} aria-hidden="true">
  <SuccessIcon />
</span>
```

`InlineNotification` コンポーネントではアイコンに `aria-hidden` が付いていないが、同様の問題がある。Snackbar から改善を始めるべき。

### 1-2. Toast の role / aria-live について（重要度: 低）

Base UI の `Toast.Root` は内部的に `role="status"` と `aria-live="polite"` を付与するため、この点は問題ない。成功フィードバック専用であり `polite` で適切。

---

## 2. コンポーネント設計

### 2-1. `SnackbarViewportProps` に `className` が公開されている（重要度: 高）

プロジェクトの規約（`ai-guide/components.md` セクション12）では、デザインシステムコンポーネントは `className` prop を外部に公開しないことになっている。`SnackbarViewportProps` に `className` があるのは規約違反。

**該当箇所:** `Snackbar.tsx` L80-82

```tsx
// 現状
export interface SnackbarViewportProps {
  className?: string;
}

// 推奨: className を削除
export interface SnackbarViewportProps {}
// または props が空なら interface 自体不要で、引数なしの関数にする
```

### 2-2. `toSnackbarSize` のランタイムバリデーション（重要度: 低）

`toSnackbarSize` 関数は `unknown` 型を受け取り、ランタイムでサイズ値をバリデーションしている。Base UI の `data` フィールドが `unknown` 型であるため防御的プログラミングとして妥当だが、`SNACKBAR_SIZES` の Set の型パラメータが `<string>` と広い。`<SnackbarSize>` にした方が型安全性が高まる。

```tsx
// 推奨
const SNACKBAR_SIZES = new Set<SnackbarSize>(['small', 'medium']);
```

### 2-3. `SnackbarShowOptions` の `title` 未対応（重要度: 情報）

`useSnackbar().show()` は `description` のみを受け取り、`title` を渡す手段がない。Base UI Toast は `title` フィールドをサポートしているが、Snackbar が「成功フィードバック専用で短いメッセージ」に限定されている設計意図から考えると、現状で問題ない。ドキュメント上で title が不要な理由を明記すると、将来の混乱を防げる。

---

## 3. CSS

### 3-1. `z-index: 2147483647`（重要度: 中）

Viewport に `z-index: 2147483647`（32bit 整数の最大値）がハードコードされている。デザイントークン化されておらず、他のオーバーレイ（Dialog 等）との z-index 管理が困難になる。

**該当箇所:** `snackbar.module.css` L17

```css
/* 現状 */
z-index: 2147483647;

/* 推奨: デザイントークンで管理 */
z-index: var(--z-index-snackbar, 2147483647);
```

z-index の管理ポリシーをプロジェクトレベルで定義し、Snackbar / Dialog / Tooltip 等の重なり順序を明確にすることを推奨する。

### 3-2. `.small .text` の `white-space: nowrap` とテキスト切り詰めの不整合（重要度: 中）

`.small .text` に `white-space: nowrap` が指定されているが、テキストがコンテナ幅を超えた場合にどうなるか不明確。`overflow: hidden` と `text-overflow: ellipsis` がないため、テキストがはみ出す可能性がある。`.text` クラスに `overflow: hidden` はあるが、`-webkit-line-clamp` と `white-space: nowrap` は互いに矛盾する（`-webkit-line-clamp` は複数行を想定、`nowrap` は1行を強制）。

**該当箇所:** `snackbar.module.css` L103-108, L152-164

```css
/* .small .text で nowrap だが、.text で line-clamp: 3 が効いている */
/* small では1行に制限したいなら、明示的に text-overflow: ellipsis を追加 */
.small .text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

あるいは、small サイズでも `-webkit-line-clamp` を1に上書きする形で統一するのが分かりやすい。

### 3-3. `line-height` の値が規約と一致しない（重要度: 低）

`ai-guide/styling.md` では line-height は `1.5`（本文）または `1.3`（小テキスト）とあるが、CSS では `130%`（small）と `150%`（medium）とパーセンテージ表記になっている。動作上の違いはないが、プロジェクト内での一貫性を考えると小数表記に統一した方がよい。

### 3-4. `overflow: clip` の使用（重要度: 低）

`.root` で `overflow: clip` が使用されている。`overflow: clip` は `overflow: hidden` と異なり、プログラム的にもスクロールできないという点で意図的な選択と思われるが、ブラウザサポートがやや新しい（2022年以降）。ターゲットブラウザによっては `overflow: hidden` の方が安全。

### 3-5. スマホ時の `translateX(-50%)` による中央配置（重要度: 低）

`transform: translateX(-50%)` は論理プロパティではない物理的な変換だが、`ai-guide/styling.md` で「論理プロパティが存在しない場合は許容」とあるため問題ない。ただし、RTL 環境では `inset-inline-start: 50%` と `translateX(-50%)` の組み合わせが期待通り中央に来ることを確認する価値はある。

---

## 4. Storybook

### 4-1. 擬似状態ストーリーが不足（重要度: 高）

CLAUDE.md で「各コンポーネントの状態は、Storybook Pseudo States を使って各 story を用意する」と明記されているが、Snackbar のストーリーには擬似状態（hover, focus, active）のストーリーがない。特に閉じるボタン（IconButton）の hover / focus-visible 状態を確認できるストーリーが必要。

```tsx
// 追加すべきストーリー例
export const CloseButtonHover: Story = {
  parameters: { pseudo: { hover: '[aria-label="閉じる"]' } },
  // ...
};

export const CloseButtonFocus: Story = {
  parameters: { pseudo: { focusVisible: '[aria-label="閉じる"]' } },
  // ...
};
```

### 4-2. Storybook の `meta` に `component` が指定されていない（重要度: 低）

`meta` オブジェクトに `component` プロパティがない。Snackbar は複合コンポーネントのため直接指定しにくいが、autodocs の Props テーブル生成に影響する。カスタム args を使っているため意図的かもしれないが、確認が必要。

### 4-3. デコレータの重複（重要度: 低）

`DesktopPosition` と `MobilePosition` ストーリーで、meta レベルのデコレータ（Provider + Viewport）を上書きする形で個別のデコレータを定義している。Provider が二重にネストされる可能性がある。Storybook のデコレータの適用順序を確認し、meta デコレータが上書きされるのか追加されるのかを明確にすべき。

---

## 5. 型・エクスポート

### 5-1. 内部型 `SnackbarRootProps` がエクスポートされていない（重要度: 情報）

`SnackbarRootProps` は内部コンポーネント用なのでエクスポートしないのが正しい。現状で問題なし。

### 5-2. index.ts のエクスポートは適切（重要度: 情報）

公開 API（`Snackbar`, `useSnackbar`, 型）が適切にエクスポートされており、`src/components/index.ts` にも登録済み。問題なし。

---

## 6. その他

### 6-1. `useSnackbar` の Provider 外での使用時のエラーハンドリング（重要度: 中）

`useSnackbar` が `Snackbar.Provider` の外で呼ばれた場合、Base UI の `Toast.useToastManager()` が例外を投げるかどうかは Base UI の実装に依存する。開発時に分かりやすいエラーメッセージを提供するために、Provider の存在チェックを追加することを検討すべき。

### 6-2. `close` メソッドの直接代入（重要度: 低）

```tsx
close: manager.close,
```

`manager.close` を直接代入しているため、`this` のバインディング問題が発生する可能性がある。Base UI の実装がアロー関数やバインド済みメソッドであれば問題ないが、安全のためラップすることを検討。

```tsx
close: (id: string) => manager.close(id),
```

---

## 改善優先度まとめ

| 優先度 | 項目 | カテゴリ |
|--------|------|----------|
| 高 | `className` prop の公開を削除 | 設計規約 |
| 高 | 擬似状態ストーリーの追加 | Storybook |
| 中 | SuccessIcon に `aria-hidden="true"` を追加 | アクセシビリティ |
| 中 | z-index のトークン化 | CSS |
| 中 | `white-space: nowrap` と `line-clamp` の矛盾解消 | CSS |
| 中 | Provider 外での使用時のエラーハンドリング | DX |
| 低 | `line-height` の表記統一 | CSS |
| 低 | `SNACKBAR_SIZES` の型パラメータ | 型安全性 |
| 低 | Storybook デコレータの二重ネスト確認 | Storybook |
| 低 | `close` メソッドのラッピング | 堅牢性 |
