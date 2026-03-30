---
name: story
description: Storybookのストーリーファイルを標準パターンに従って作成する。コンポーネントのストーリー作成、stories/ディレクトリへの配置、擬似状態（hover/focus/active）のカバレッジ、AllStates一覧ストーリーの作成を行う。ユーザーが「ストーリーを作って」「storyを追加」「Storybookに追加」「○○のstoriesファイルを作成」と言ったときや、新しいコンポーネントを作成した後にストーリーが必要なときに使う。
---

# Storybook ストーリー作成スキル

mitsubachi-ui-react のコンポーネントに対して、標準パターンに従った `.stories.tsx` ファイルを作成する。

## 設計思想

Storybook公式のAI向けベストプラクティスに基づき、**1つのストーリー = 1つのコンセプト**を徹底する。各ストーリーは「何を見せているか」が一目でわかるように書く。複数のコンセプトを1つのストーリーに詰め込まない（例: サイズとバリアントを同時に見せる「SizesAndVariants」は作らない）。

ストーリーにはJSDocで「なぜこのストーリーが存在するか」を説明する。AIエージェントや開発者がコンポーネントの使い方を理解するための参照資料になることを意識する。

## 情報収集（ストーリー作成前に必ず実施）

1. **コンポーネントソース** (`src/components/<name>/`) — Props定義、JSDoc、バリアント、状態
2. **CSS Modules** (`src/components/<name>/*.module.css`) — 擬似クラス定義（`:hover`, `:active`, `:focus-visible`, `:disabled`）を確認し、カバーすべき状態を特定
3. **既存ストーリー** — 同種のコンポーネントの既存ストーリーを参照し、パターンを合わせる
4. **コンポーネントの性質を分類** — 下記の「コンポーネント分類」に当てはめてストーリー構成を決める

## コンポーネント分類とストーリー構成

### A. 単一状態コンポーネント（状態の軸が1つ）

例: IconButton, Suggestion, SearchBox

擬似状態のみで分岐するコンポーネント。

```
Normal → Hover → Active → Focus → Loading（あれば） → Disabled
+ バリアント別ストーリー（variant prop があれば）
+ AllVariants / AllStates
```

### B. 二値状態コンポーネント（選択/未選択、チェック/未チェック等）

例: Checkbox, FilterChip, Segment

状態値 × 擬似状態のマトリクスでストーリーを構成する。

```
[状態A]Default → [状態A]Hover → [状態A]Active → [状態A]Focus → [状態A]Disabled
[状態B]Default → [状態B]Hover → [状態B]Active → [状態B]Focus → [状態B]Disabled
（中間状態があれば同様に）
+ AllStates
```

### C. インタラクティブコンポーネント（Dialog, Snackbar等）

例: ActionDialog, FormDialog, Snackbar

ユーザー操作でトリガーされるコンポーネント。render関数内にトリガーUIを配置する。

```
基本パターン → バリエーション（破壊的アクション、長文等）
+ Phone表示（レスポンシブ対応があれば）
```

### D. 構成コンポーネント（Group系）

例: FilterChipSingleSelectGroup, SectionTabGroup, InputChipGroup

子コンポーネントを組み合わせて使うコンポーネント。実際の使用シーンに近い形でストーリーを構成する。

```
Default → 各バリエーション → インタラクション例
```

## ファイル構造テンプレート

```tsx
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ComponentName } from '<コンポーネントへの相対パス>';

const meta = {
  title: 'Components/<Category>/<ComponentName>',
  component: ComponentName,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'コンポーネントの簡潔な説明（1-2文）',
      },
    },
  },
  tags: [],
  argTypes: {
    // Props ごとに control と description を設定
    propName: {
      control: 'select', // or 'radio', 'boolean', 'text', etc.
      options: ['option1', 'option2'],
      description: '日本語でプロパティの説明',
    },
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;
```

## 重要なパターン

### 擬似状態の表現

CSS擬似クラスの視覚的な確認には `storybook-addon-pseudo-states` を使う。
`parameters.pseudo` で状態を指定する。

```tsx
/**
 * Hover状態
 */
export const Hover: Story = {
  args: {
    ...Normal.args,
  },
  parameters: {
    pseudo: { hover: true },
  },
};

/**
 * Focus状態（:focus-visible）
 */
export const Focus: Story = {
  args: {
    ...Normal.args,
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
};

/**
 * Active状態
 */
export const Active: Story = {
  args: {
    ...Normal.args,
  },
  parameters: {
    pseudo: { active: true },
  },
};
```

### args の再利用

ベースとなるストーリーの `args` をスプレッドして差分だけ上書きする。重複を減らし、変更時の修正箇所を最小化する。

```tsx
export const Normal: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    label: 'Text',
  },
};

export const Disabled: Story = {
  args: {
    ...Normal.args,
    disabled: true,
  },
};
```

### AllStates 一覧ストーリー

全バリアント × 全状態を一覧できるストーリーを最後に配置する。ビジュアルリグレッションテストの基準として機能する。render関数を使い、直接コンポーネントをレンダリングする。

```tsx
/**
 * すべての状態を一覧表示
 */
export const AllStates: Story = {
  args: {
    ...Normal.args, // Storybook Controls のために args は設定する
  },
  render: () => (
    // グリッドレイアウトで状態を並べる
  ),
};
```

### Phone表示のストーリー

レスポンシブ対応のコンポーネントは、Phone用のストーリーを追加する。`globals.viewport` で表示サイズを指定する。

```tsx
export const PhoneDefault: Story = {
  // ... args & render
  globals: {
    viewport: { value: 'mobile2' },
  },
};
```

### Decorator パターン

Provider等のラッパーが必要なコンポーネントは、meta の `decorators` で設定する。

```tsx
const meta = {
  // ...
  decorators: [
    (Story) => (
      <SomeProvider>
        <Story />
      </SomeProvider>
    ),
  ],
} satisfies Meta<typeof ComponentName>;
```

### インタラクティブコンポーネントのトリガー

Dialog や Snackbar など、ユーザー操作でトリガーするコンポーネントは `render` 関数内に開閉制御を組み込む。

```tsx
export const Default: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          開く
        </button>
        <DialogComponent {...args} open={open} onOpenChange={setOpen}>
          {/* ... */}
        </DialogComponent>
      </>
    );
  },
  args: { /* ... */ },
};
```

## JSDoc の書き方

### コンポーネント説明（meta.parameters.docs.description.component）

簡潔な1-2文で、コンポーネントが何をするかを説明する。使い方のルールや注意事項があれば含める。

### ストーリーのJSDoc

各ストーリーの export の直前にJSDocを書く。「何を見せているか」と「なぜ重要か」を伝える。

```tsx
/**
 * 未選択 - Hover状態
 */
export const UnselectedHover: Story = { /* ... */ };

/**
 * 削除確認などの破壊的アクションを行うダイアログ。
 * 破壊的アクションボタンは赤色で視覚的に警告を示す。
 */
export const Destructive: Story = { /* ... */ };
```

短い状態説明で十分なケース（`Hover状態`、`Disabled`等）は1行で良い。ユースケースの説明が必要なケース（`Destructive`、`LongContent`等）は2-3行で背景を含める。

### argTypes の description

各propの説明は日本語で書く。

```tsx
argTypes: {
  variant: {
    control: 'select',
    options: ['primary', 'secondary', 'tertiary', 'ghost'],
    description: 'ボタンのバリアント（表示スタイル）',
  },
},
```

## ストーリーの命名規則

| パターン | 命名例 |
| --- | --- |
| デフォルト状態 | `Normal` or `Default` |
| 擬似状態 | `Hover`, `Active`, `Focus` |
| 機能状態 | `Loading`, `Disabled` |
| 二値状態 × 擬似状態 | `UnselectedHover`, `CheckedFocus`, `SelectedDisabled` |
| バリアント | `Primary`, `Secondary`, `Ghost` |
| サイズ | `Small`, `Medium`, `Large` |
| ユースケース | `Destructive`, `LongContent`, `WithIcon` |
| Phone表示 | `PhoneDefault`, `PhoneLongContent` |
| 全状態一覧 | `AllStates` or `AllVariants` |
| 動作確認 | `Playground`（useState等を使うインタラクティブデモ） |

## 配置ルール

- ストーリーファイルは `stories/<kebab-case>/` に配置する
- ネストがある場合: `stories/<category>/<kebab-case>/`
- title は `'Components/<Category>/<ComponentName>'` の形式

```
stories/
├── button/
│   ├── icon-button/
│   │   └── IconButton.stories.tsx
│   └── menu-button/
│       └── MenuButton.stories.tsx
├── checkbox/
│   └── Checkbox.stories.tsx
├── chip/
│   ├── filter-chip/
│   │   └── FilterChip.stories.tsx
```

## チェックリスト

- [ ] `import type { Meta, StoryObj } from '@storybook/react-vite'` を使用
- [ ] `satisfies Meta<typeof Component>` で型安全に
- [ ] `type Story = StoryObj<typeof meta>`
- [ ] `parameters.layout` を設定（通常は `'centered'`）
- [ ] `parameters.docs.description.component` にコンポーネント説明
- [ ] `tags: []` を設定（MDXドキュメントがある場合。ない場合は `['autodocs']`）
- [ ] 各propに `argTypes` で `control` と `description` を設定
- [ ] Normal/Default ストーリーが存在する
- [ ] CSSの擬似クラスに対応するストーリーが存在する（Hover, Active, Focus, Disabled等）
- [ ] 擬似状態は `parameters.pseudo` で表現
- [ ] `args` はベースストーリーからスプレッドして再利用
- [ ] AllStates / AllVariants 一覧ストーリーが最後にある
- [ ] 各ストーリーにJSDocコメント
- [ ] ストーリー名が命名規則に従っている
- [ ] ファイル配置が `stories/<kebab-case>/` に従っている
