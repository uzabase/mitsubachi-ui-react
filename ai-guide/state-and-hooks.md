# 状態管理とHooks

## 基本方針

- 外部状態管理ライブラリ（Redux、Zustand等）は使用しない
- ローカルコンポーネント状態（`useState`）と Base UI への委譲で管理する
- Context はコンポーネントツリー内の静的な設定値の伝播に限定する
- Hooks は必要な箇所のみ使用し、過度なメモ化は避ける

## 状態の分類

### 1. ローカルコンポーネント状態 (`useState`)

コンポーネント固有の状態を管理する。

```tsx
// TextArea: Uncontrolled モードの内部値
const [internalValue, setInternalValue] = useState(() =>
  defaultValue != null ? String(defaultValue) : ''
);

// DialogBody: スクロール位置の追跡
const [isScrolledFromTop, setIsScrolledFromTop] = useState(false);
const [isScrolledFromBottom, setIsScrolledFromBottom] = useState(false);
```

### 2. Base UI への委譲

インタラクティブなUIの状態は Base UI に委譲する。ライブラリ独自の状態は持たない。

```tsx
// Dialog: 開閉状態は Base UI が管理
<BaseDialog.Root
  open={open}
  defaultOpen={defaultOpen}
  onOpenChange={onOpenChange}
>

// Snackbar: トーストキューは Base UI Toast が管理
<Toast.Provider timeout={timeout}>
  {children}
</Toast.Provider>
```

### 3. Context による設定値の伝播

ドリルダウンを避けるため、ツリー全体で共有する設定値を Context で伝播する。

```tsx
// dialog-context.tsx
export const DialogContext = React.createContext<DialogContextValue | null>(null);

// DialogContextValue はミュータブルな状態ではなく、props 由来の静的な設定
type DialogContextValue = {
  size: DialogSize;
  variant: DialogVariant;
};
```

## Hooks パターン

### `useState` — ローカル状態

```tsx
// ✅ 遅延初期化: 初回レンダリング時のみ関数を実行
const [internalValue, setInternalValue] = useState(() =>
  defaultValue != null ? String(defaultValue) : ''
);

// ✅ boolean 状態: UIの表示制御
const [isScrolledFromTop, setIsScrolledFromTop] = useState(false);
```

### `useCallback` — イベントハンドラのメモ化

外部の `onChange` や `onScroll` を呼び出すハンドラに使用する。

```tsx
// TextArea: 変更ハンドラ
const handleChange = useCallback(
  (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isControlled) {
      setInternalValue(e.target.value);
    }
    onChange?.(e);
  },
  [isControlled, onChange]
);

// TextArea: スクロール同期ハンドラ
const handleScroll = useCallback(
  (e: React.UIEvent<HTMLTextAreaElement>) => {
    if (highlightRef.current && textareaRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
    }
    onScroll?.(e);
  },
  [onScroll]
);
```

### `useRef` — DOM要素への参照

`useState` とは異なり、値の変更で再レンダリングを発生させない。DOM操作が必要な場合に使用する。

```tsx
// TextArea: テキストエリアとハイライトオーバーレイのスクロール同期
const textareaRef = useRef<HTMLTextAreaElement>(null);
const highlightRef = useRef<HTMLDivElement>(null);

// DialogBody: イベントリスナーのアタッチ先
const bodyRef = useRef<HTMLDivElement>(null);
```

### `useId` — アクセシビリティ用のID自動生成

ラベルと入力要素のリンク、`aria-describedby` によるエラー通知に使用する。

```tsx
// TextArea: エラーリストの aria-describedby 用
const errorListId = useId();

<textarea aria-describedby={hasError ? errorListId : undefined} />
{hasError && <div id={errorListId} role="alert">...</div>}

// TextAreaUnit: label と textarea を紐づける
const generatedId = useId();
const textareaId = id ?? generatedId;

<LabelUnit htmlFor={textareaId} />
<TextArea id={textareaId} />
```

### `useEffect` — 副作用の管理

DOM イベントリスナーや `ResizeObserver` のアタッチ・クリーンアップに使用する。

```tsx
// DialogBody: スクロール位置の追跡
useEffect(() => {
  const element = bodyRef.current;
  if (!element) return;

  const checkScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = element;
    setIsScrolledFromTop(scrollTop > 0);
    setIsScrolledFromBottom(scrollTop + clientHeight < scrollHeight - 1);
  };

  checkScroll(); // 初回チェック

  element.addEventListener('scroll', checkScroll);

  const resizeObserver = new ResizeObserver(checkScroll);
  resizeObserver.observe(element);

  // ✅ クリーンアップ関数で確実に解除
  return () => {
    element.removeEventListener('scroll', checkScroll);
    resizeObserver.disconnect();
  };
}, []);
```

### `useContext` — ガード付きアクセサ

Context の消費は専用のカスタム Hook でラップし、Provider 外での誤用を防ぐ。

```tsx
// dialog-context.tsx
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

### ref as prop — 外部への ref 公開（React 19）

外部から DOM 要素への参照が必要な場合、`ref` を通常の props として受け取る。
`forwardRef` と `displayName` は不要。

```tsx
// ✅ React 19: ref を props で受け取る
export interface IconButtonProps {
  ref?: React.Ref<HTMLButtonElement>;
  variant?: IconButtonVariant;
}

export const IconButton = ({ ref, variant = 'primary', ...rest }: IconButtonProps) => {
  return (
    <BaseButton ref={ref} {...rest}>
      {children}
    </BaseButton>
  );
};
```

```tsx
// ❌ レガシー（React 18 以前）: forwardRef は使用しない
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => { ... }
);
IconButton.displayName = 'IconButton';
```

## カスタム Hooks

### `useSnackbar` — Base UI の Toast API をラップ

```tsx
export function useSnackbar() {
  const manager = Toast.useToastManager();
  return {
    show: (description: string, options?: SnackbarShowOptions) => {
      return manager.add({
        description,
        data: { size: options?.size ?? 'small' },
      });
    },
    close: manager.close,
  };
}
```

**設計意図:**

- Base UI の `Toast.useToastManager()` を直接公開せず、シンプルな `{ show, close }` に変換
- `show()` で `size` オプションを `toast.data` に埋め込み、レンダリング側で取り出す
- `Snackbar.Provider` 内でのみ使用可能

### `useDialogContext` — 型安全な Context アクセサ

```tsx
export function useDialogContext(): DialogContextValue {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error('...');
  return ctx;
}
```

**設計意図:**

- `null` チェック + エラーメッセージを消費側に分散させない
- 戻り値の型が `DialogContextValue | null` ではなく `DialogContextValue` になる

## Controlled / Uncontrolled パターン

フォーム要素は両モードをサポートする。

```tsx
// 判定
const isControlled = value !== undefined;
const currentValue = isControlled ? String(value) : internalValue;

// DOM への渡し方（React の混在警告を回避）
<textarea
  value={isControlled ? value : undefined}
  defaultValue={!isControlled ? defaultValue : undefined}
  onChange={handleChange}
/>
```

**ルール:**

- `value !== undefined` で Controlled を判定する
- Controlled 時は `internalValue` を更新しない
- `onChange` は両モードで常に呼び出す
- `defaultValue` は `useState` の遅延初期化で一度だけ読む

## アンチパターン

```tsx
// ❌ コンポーネントライブラリで外部状態管理を使う
import { useAtom } from 'jotai';

// ❌ 不要なメモ化（プリミティブ値や安定した参照）
const label = useMemo(() => 'テキスト', []);

// ❌ useEffect 内で派生状態をセット（レンダリング中に計算すべき）
useEffect(() => {
  setValue(derivedValue);
}, [derivedValue]);

// ❌ ref を状態管理の代用にする
const countRef = useRef(0);
countRef.current += 1; // 再レンダリングされないので UI に反映されない

// ❌ Context にミュータブルな状態を入れて広範囲に再レンダリング
const [globalState, setGlobalState] = useState({});
<SomeContext value={{ globalState, setGlobalState }}>

// ❌ forwardRef を使う（React 19 では不要）
export const Component = React.forwardRef<HTMLDivElement, Props>((props, ref) => { ... });
Component.displayName = 'Component';
```
