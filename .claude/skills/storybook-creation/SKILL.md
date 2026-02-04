# Storybookストーリー作成スキル

このスキルは、mitsubachi-ui-reactプロジェクトのStorybookストーリーファイルを標準パターンに従って作成します。

## Use when:

- ユーザーが `/story` コマンドを実行した時
- 新しいコンポーネントを作成した時
- 既存コンポーネントにStorybookストーリーが不足している時
- ユーザーが明示的にストーリー作成を依頼した時

## ストーリーファイルの標準パターン

### ファイル配置

```
src/components/ComponentName/
├── ComponentName.tsx
├── ComponentName.css
├── index.ts
└── stories/
    └── ComponentName.stories.tsx
```

### 基本テンプレート

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from '../ComponentName';

const meta = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // propsの型定義に基づいてargTypesを設定
  },
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

// デフォルトストーリー
export const Default: Story = {
  args: {
    // デフォルトのprops
  },
};

// バリエーションストーリー
export const Variant: Story = {
  args: {
    // バリエーションのprops
  },
};

// 状態ストーリー（Pseudo States使用）
export const Hover: Story = {
  args: {
    // デフォルトのprops
  },
  parameters: {
    pseudo: { hover: true },
  },
};

export const Focus: Story = {
  args: {
    // デフォルトのprops
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
};

export const Active: Story = {
  args: {
    // デフォルトのprops
  },
  parameters: {
    pseudo: { active: true },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    // その他のprops
  },
};
```

## 必須ストーリー

各コンポーネントには以下のストーリーを必ず用意する:

1. **Default**: 基本的な使用例
2. **バリエーション**: サイズ、色、スタイル等のバリエーション
3. **Hover**: ホバー状態（`pseudo: { hover: true }`）
4. **Focus**: フォーカス状態（`pseudo: { focusVisible: true }`）※`:focus`ではなく`:focus-visible`
5. **Active**: アクティブ状態（`pseudo: { active: true }`）
6. **Disabled**: 無効状態（該当する場合）

## レスポンシブ対応

viewportプロパティがある場合は、desktop版とphone版のストーリーを作成:

```tsx
export const Desktop: Story = {
  args: {
    viewport: 'desktop',
  },
};

export const Phone: Story = {
  args: {
    viewport: 'phone',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1', // 360px
    },
  },
};
```

## argTypesの設定例

```tsx
argTypes: {
  size: {
    control: 'select',
    options: ['small', 'medium', 'large'],
    description: 'コンポーネントのサイズ',
  },
  disabled: {
    control: 'boolean',
    description: '無効化状態',
  },
  onClick: {
    action: 'clicked',
    description: 'クリック時のコールバック',
  },
  children: {
    control: 'text',
    description: '子要素',
  },
},
```

## Pseudo Statesの使用

YOU MUST: CSS擬似状態は、Storybook Pseudo Statesアドオンを使用して表現する。

```tsx
// ✅ 推奨
export const Hover: Story = {
  parameters: {
    pseudo: { hover: true },
  },
};

// ✅ focus-visibleを使用
export const Focus: Story = {
  parameters: {
    pseudo: { focusVisible: true }, // focusではなくfocusVisible
  },
};

// ❌ 非推奨: props経由で状態を制御しない
export const Hover: Story = {
  args: {
    isHovered: true, // このような実装は避ける
  },
};
```

## 実装手順

1. コンポーネントのpropsを確認
2. `stories/`ディレクトリを作成（存在しない場合）
3. `ComponentName.stories.tsx`ファイルを作成
4. metaオブジェクトを定義
5. 必須ストーリー（Default、バリエーション、状態）を作成
6. argTypesを適切に設定
7. Pseudo Statesで擬似状態を表現

## チェックリスト

- [ ] `stories/`ディレクトリに配置されている
- [ ] ファイル名が`ComponentName.stories.tsx`形式
- [ ] metaオブジェクトが`satisfies Meta<typeof ComponentName>`で定義されている
- [ ] `tags: ['autodocs']`が設定されている
- [ ] Defaultストーリーがある
- [ ] バリエーションストーリーがある（該当する場合）
- [ ] Hover、Focus、Activeストーリーがある（インタラクティブな要素の場合）
- [ ] Focusストーリーは`focusVisible: true`を使用している（`focus`ではない）
- [ ] Disabledストーリーがある（該当する場合）
- [ ] viewportプロパティがある場合、desktop/phoneストーリーがある
- [ ] argTypesが適切に設定されている
