import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Segment } from '../../../src/components/segmented-control/segment';
import { SegmentedControl } from '../../../src/components/segmented-control/segmented-control';

const meta = {
  title: 'Components/SegmentedControl/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '排他的な単一選択（ラジオボタン相当）のセグメントグループです。\n\n' +
          '> **使い分け:** 複数選択が必要な場合は、チェックボックスグループの使用を検討してください。\n\n' +
          '## 使用例\n\n' +
          '```tsx\n' +
          '<SegmentedControl defaultValue="tab1" aria-label="表示切り替え">\n' +
          '  <Segment value="Item1">アイテム1</Segment>\n' +
          '  <Segment value="Item2">アイテム2</Segment>\n' +
          '  <Segment value="Item3">アイテム3</Segment>\n' +
          '</SegmentedControl>\n' +
          '```',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SegmentedControl>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * セグメント2個
 */
export const TwoItems: Story = {
  args: {
    defaultValue: 'item1',
    'aria-label': '2項目',
    children: (
      <>
        <Segment value="item1">Label</Segment>
        <Segment value="item2">Label</Segment>
      </>
    ),
  },
};

/**
 * セグメント3個
 */
export const ThreeItems: Story = {
  args: {
    defaultValue: 'item1',
    'aria-label': '3項目',
    children: (
      <>
        <Segment value="item1">Label</Segment>
        <Segment value="item2">Label</Segment>
        <Segment value="item3">Label</Segment>
      </>
    ),
  },
};

/**
 * セグメント4個
 */
export const FourItems: Story = {
  args: {
    defaultValue: 'item1',
    'aria-label': '4項目',
    children: (
      <>
        <Segment value="item1">Label</Segment>
        <Segment value="item2">Label</Segment>
        <Segment value="item3">Label</Segment>
        <Segment value="item4">Label</Segment>
      </>
    ),
  },
};

/**
 * セグメント5個
 */
export const FiveItems: Story = {
  args: {
    defaultValue: 'item1',
    'aria-label': '5項目',
    children: (
      <>
        <Segment value="item1">Label</Segment>
        <Segment value="item2">Label</Segment>
        <Segment value="item3">Label</Segment>
        <Segment value="item4">Label</Segment>
        <Segment value="item5">Label</Segment>
      </>
    ),
  },
};

/**
 * 一部セグメント無効化
 */
export const WithDisabled: Story = {
  args: {
    defaultValue: 'item1',
    'aria-label': '一部無効化',
    children: (
      <>
        <Segment value="item1">有効</Segment>
        <Segment value="item2" disabled>
          無効
        </Segment>
        <Segment value="item3">有効</Segment>
      </>
    ),
  },
};

/**
 * 制御モード（Controlled）
 */
export const Controlled: Story = {
  args: {
    'aria-label': '制御モード',
    children: (
      <>
        <Segment value="item1">タブ1</Segment>
        <Segment value="item2">タブ2</Segment>
        <Segment value="item3">タブ3</Segment>
      </>
    ),
  },
  render: function Render(args) {
    const [value, setValue] = useState('item1');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <SegmentedControl {...args} value={value} onValueChange={setValue} />
        <p>
          選択中: <strong>{value}</strong>
        </p>
      </div>
    );
  },
};
