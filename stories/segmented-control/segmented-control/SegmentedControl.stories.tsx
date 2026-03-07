import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Segment } from '../../../src/components/segmented-control/segment';
import { SegmentedControl } from '../../../src/components/segmented-control/segmented-control';
import { DummyIcon } from '../../../src/icons';

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
          '  <Segment variant="text" value="Item1">アイテム1</Segment>\n' +
          '  <Segment variant="text" value="Item2">アイテム2</Segment>\n' +
          '  <Segment variant="text" value="Item3">アイテム3</Segment>\n' +
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
 * テキスト: セグメント2個
 */
export const TextTwoItems: Story = {
  args: {
    defaultValue: 'item1',
    'aria-label': 'テキスト2項目',
    children: (
      <>
        <Segment variant="text" value="item1">
          Label
        </Segment>
        <Segment variant="text" value="item2">
          Label
        </Segment>
      </>
    ),
  },
};

/**
 * テキスト: セグメント3個
 */
export const TextThreeItems: Story = {
  args: {
    defaultValue: 'item1',
    'aria-label': 'テキスト3項目',
    children: (
      <>
        <Segment variant="text" value="item1">
          Label
        </Segment>
        <Segment variant="text" value="item2">
          Label
        </Segment>
        <Segment variant="text" value="item3">
          Label
        </Segment>
      </>
    ),
  },
};

/**
 * テキスト: セグメント4個
 */
export const TextFourItems: Story = {
  args: {
    defaultValue: 'item1',
    'aria-label': 'テキスト4項目',
    children: (
      <>
        <Segment variant="text" value="item1">
          Label
        </Segment>
        <Segment variant="text" value="item2">
          Label
        </Segment>
        <Segment variant="text" value="item3">
          Label
        </Segment>
        <Segment variant="text" value="item4">
          Label
        </Segment>
      </>
    ),
  },
};

/**
 * テキスト: セグメント5個
 */
export const TextFiveItems: Story = {
  args: {
    defaultValue: 'item1',
    'aria-label': 'テキスト5項目',
    children: (
      <>
        <Segment variant="text" value="item1">
          Label
        </Segment>
        <Segment variant="text" value="item2">
          Label
        </Segment>
        <Segment variant="text" value="item3">
          Label
        </Segment>
        <Segment variant="text" value="item4">
          Label
        </Segment>
        <Segment variant="text" value="item5">
          Label
        </Segment>
      </>
    ),
  },
};

/**
 * テキスト: 一部セグメント無効化
 */
export const TextWithDisabled: Story = {
  args: {
    defaultValue: 'item1',
    'aria-label': 'テキスト一部無効化',
    children: (
      <>
        <Segment variant="text" value="item1">
          有効
        </Segment>
        <Segment variant="text" value="item2" disabled>
          無効
        </Segment>
        <Segment variant="text" value="item3">
          有効
        </Segment>
      </>
    ),
  },
};

/**
 * テキスト: 制御モード（Controlled）
 */
export const TextControlled: Story = {
  args: {
    'aria-label': 'テキスト制御モード',
    children: (
      <>
        <Segment variant="text" value="item1">
          タブ1
        </Segment>
        <Segment variant="text" value="item2">
          タブ2
        </Segment>
        <Segment variant="text" value="item3">
          タブ3
        </Segment>
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

/**
 * アイコン: セグメント2個
 */
export const IconTwoItems: Story = {
  args: {
    defaultValue: 'item1',
    'aria-label': 'アイコン2項目',
    children: (
      <>
        <Segment variant="icon" value="item1">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item2">
          <DummyIcon size={18} />
        </Segment>
      </>
    ),
  },
};

/**
 * アイコン: セグメント3個
 */
export const IconThreeItems: Story = {
  args: {
    defaultValue: 'item1',
    'aria-label': 'アイコン3項目',
    children: (
      <>
        <Segment variant="icon" value="item1">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item2">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item3">
          <DummyIcon size={18} />
        </Segment>
      </>
    ),
  },
};

/**
 * アイコン: セグメント4個
 */
export const IconFourItems: Story = {
  args: {
    defaultValue: 'item1',
    'aria-label': 'アイコン4項目',
    children: (
      <>
        <Segment variant="icon" value="item1">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item2">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item3">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item4">
          <DummyIcon size={18} />
        </Segment>
      </>
    ),
  },
};

/**
 * アイコン: セグメント5個
 */
export const IconFiveItems: Story = {
  args: {
    defaultValue: 'item1',
    'aria-label': 'アイコン5項目',
    children: (
      <>
        <Segment variant="icon" value="item1">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item2">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item3">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item4">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item5">
          <DummyIcon size={18} />
        </Segment>
      </>
    ),
  },
};

/**
 * アイコン: 一部セグメント無効化
 */
export const IconWithDisabled: Story = {
  args: {
    defaultValue: 'item1',
    'aria-label': 'アイコン一部無効化',
    children: (
      <>
        <Segment variant="icon" value="item1">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item2" disabled>
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item3">
          <DummyIcon size={18} />
        </Segment>
      </>
    ),
  },
};
