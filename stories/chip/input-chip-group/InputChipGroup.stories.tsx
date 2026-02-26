import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { InputChipItem } from '../../../src/components/chip/input-chip-group';
import { InputChipGroup } from '../../../src/components/chip/input-chip-group';

const meta = {
  title: 'Components/Chip/InputChipGroup',
  component: InputChipGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: [
          'InputChipを横並び・折り返しでレイアウトするコンポーネントです。',
          'ユーザーが入力した内容を一覧表示して、個別削除ができます。',
          '',
          '### 使用例',
          '',
          '```tsx',
          'import { InputChipGroup } from "mitsubachi-ui-react";',
          '',
          'const [items, setItems] = useState([',
          '  { id: "1", label: "Apple" },',
          '  { id: "2", label: "Banana" },',
          ']);',
          '',
          '<InputChipGroup',
          '  items={items}',
          '  onRemove={(id) => setItems((prev) => prev.filter((item) => item.id !== id))}',
          '  aria-label="フルーツ一覧"',
          '/>',
          '```',
        ].join('\n'),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    viewport: {
      control: 'radio',
      options: ['desktop', 'phone'],
      description: 'ビューポート',
    },
    disabled: {
      control: 'boolean',
      description: '無効化状態',
    },
  },
} satisfies Meta<typeof InputChipGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: InputChipItem[] = [
  { id: '1', label: 'Apple' },
  { id: '2', label: 'Banana' },
  { id: '3', label: 'Cherry' },
  { id: '4', label: 'Dragon Fruit' },
  { id: '5', label: 'Elderberry' },
];

/**
 * デフォルト状態
 */
export const Default: Story = {
  args: {
    items: sampleItems,
    viewport: 'desktop',
    onRemove: () => {},
    'aria-label': 'フルーツ一覧',
  },
};

/**
 * Phone表示
 */
export const Phone: Story = {
  args: {
    ...Default.args,
    viewport: 'phone',
  },
};

/**
 * 無効化状態
 */
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

/**
 * 幅制限で折り返し表示
 */
export const Wrap: Story = {
  args: {
    ...Default.args,
  },
  render: () => (
    <div style={{ maxInlineSize: '300px' }}>
      <InputChipGroup
        items={sampleItems}
        viewport="desktop"
        onRemove={() => {}}
        aria-label="フルーツ一覧"
      />
    </div>
  ),
};

/**
 * インタラクティブ（削除可能）
 */
export const Interactive: Story = {
  args: {
    ...Default.args,
  },
  render: function Render() {
    const [items, setItems] = useState<InputChipItem[]>(sampleItems);

    const handleRemove = (id: string) => {
      setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
      <InputChipGroup
        items={items}
        viewport="desktop"
        onRemove={handleRemove}
        aria-label="フルーツ一覧"
      />
    );
  },
};
