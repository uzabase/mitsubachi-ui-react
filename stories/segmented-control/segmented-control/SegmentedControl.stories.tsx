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
        component: '排他的な単一選択のセグメントグループです。',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: '現在選択されているセグメントの値（制御モード）',
    },
    defaultValue: {
      control: 'text',
      description: '初期選択セグメントの値（非制御モード）',
    },
    onValueChange: {
      action: 'valueChanged',
      description: 'セグメント切り替え時のコールバック',
    },
    disabled: {
      control: 'boolean',
      description: '無効化状態（全セグメントを無効化）',
    },
    children: {
      control: false,
      description: 'Segment コンポーネント群',
    },
    'aria-label': {
      control: 'text',
      description: 'アクセシブルラベル',
    },
  },
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
 * テキスト: 長いラベル（折り返し確認用）
 *
 * 親の幅を超える長いラベルが含まれる場合、省略せず折り返して表示する。
 */
export const TextLongLabel: Story = {
  args: {
    defaultValue: 'item1',
    'aria-label': '長いラベル',
    children: (
      <>
        <Segment variant="text" value="item1">
          短い
        </Segment>
        <Segment variant="text" value="item2">
          短い
        </Segment>
        <Segment variant="text" value="item3">
          長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い長い
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
        <Segment variant="icon" value="item1" aria-label="サンプル1">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item2" aria-label="サンプル2">
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
        <Segment variant="icon" value="item1" aria-label="サンプル1">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item2" aria-label="サンプル2">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item3" aria-label="サンプル3">
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
        <Segment variant="icon" value="item1" aria-label="サンプル1">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item2" aria-label="サンプル2">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item3" aria-label="サンプル3">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item4" aria-label="サンプル4">
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
        <Segment variant="icon" value="item1" aria-label="サンプル1">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item2" aria-label="サンプル2">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item3" aria-label="サンプル3">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item4" aria-label="サンプル4">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item5" aria-label="サンプル5">
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
        <Segment variant="icon" value="item1" aria-label="サンプル1">
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item2" aria-label="サンプル2" disabled>
          <DummyIcon size={18} />
        </Segment>
        <Segment variant="icon" value="item3" aria-label="サンプル3">
          <DummyIcon size={18} />
        </Segment>
      </>
    ),
  },
};

/**
 * すべてのバリエーションを一覧表示
 */
export const AllStates: Story = {
  args: {
    ...TextTwoItems.args,
  },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          テキスト（2〜5個）
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SegmentedControl defaultValue="item1" aria-label="テキスト2項目">
            <Segment variant="text" value="item1">
              Label
            </Segment>
            <Segment variant="text" value="item2">
              Label
            </Segment>
          </SegmentedControl>
          <SegmentedControl defaultValue="item1" aria-label="テキスト3項目">
            <Segment variant="text" value="item1">
              Label
            </Segment>
            <Segment variant="text" value="item2">
              Label
            </Segment>
            <Segment variant="text" value="item3">
              Label
            </Segment>
          </SegmentedControl>
          <SegmentedControl defaultValue="item1" aria-label="テキスト4項目">
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
          </SegmentedControl>
          <SegmentedControl defaultValue="item1" aria-label="テキスト5項目">
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
          </SegmentedControl>
        </div>
      </div>

      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          アイコン（2〜5個）
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SegmentedControl defaultValue="item1" aria-label="アイコン2項目">
            <Segment variant="icon" value="item1" aria-label="サンプル1">
              <DummyIcon size={18} />
            </Segment>
            <Segment variant="icon" value="item2" aria-label="サンプル2">
              <DummyIcon size={18} />
            </Segment>
          </SegmentedControl>
          <SegmentedControl defaultValue="item1" aria-label="アイコン3項目">
            <Segment variant="icon" value="item1" aria-label="サンプル1">
              <DummyIcon size={18} />
            </Segment>
            <Segment variant="icon" value="item2" aria-label="サンプル2">
              <DummyIcon size={18} />
            </Segment>
            <Segment variant="icon" value="item3" aria-label="サンプル3">
              <DummyIcon size={18} />
            </Segment>
          </SegmentedControl>
          <SegmentedControl defaultValue="item1" aria-label="アイコン4項目">
            <Segment variant="icon" value="item1" aria-label="サンプル1">
              <DummyIcon size={18} />
            </Segment>
            <Segment variant="icon" value="item2" aria-label="サンプル2">
              <DummyIcon size={18} />
            </Segment>
            <Segment variant="icon" value="item3" aria-label="サンプル3">
              <DummyIcon size={18} />
            </Segment>
            <Segment variant="icon" value="item4" aria-label="サンプル4">
              <DummyIcon size={18} />
            </Segment>
          </SegmentedControl>
          <SegmentedControl defaultValue="item1" aria-label="アイコン5項目">
            <Segment variant="icon" value="item1" aria-label="サンプル1">
              <DummyIcon size={18} />
            </Segment>
            <Segment variant="icon" value="item2" aria-label="サンプル2">
              <DummyIcon size={18} />
            </Segment>
            <Segment variant="icon" value="item3" aria-label="サンプル3">
              <DummyIcon size={18} />
            </Segment>
            <Segment variant="icon" value="item4" aria-label="サンプル4">
              <DummyIcon size={18} />
            </Segment>
            <Segment variant="icon" value="item5" aria-label="サンプル5">
              <DummyIcon size={18} />
            </Segment>
          </SegmentedControl>
        </div>
      </div>

      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          無効化（テキスト / アイコン）
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <SegmentedControl
            defaultValue="item1"
            aria-label="テキスト一部無効化"
          >
            <Segment variant="text" value="item1">
              有効
            </Segment>
            <Segment variant="text" value="item2" disabled>
              無効
            </Segment>
            <Segment variant="text" value="item3">
              有効
            </Segment>
          </SegmentedControl>
          <SegmentedControl
            defaultValue="item1"
            aria-label="アイコン一部無効化"
          >
            <Segment variant="icon" value="item1" aria-label="サンプル1">
              <DummyIcon size={18} />
            </Segment>
            <Segment
              variant="icon"
              value="item2"
              aria-label="サンプル2"
              disabled
            >
              <DummyIcon size={18} />
            </Segment>
            <Segment variant="icon" value="item3" aria-label="サンプル3">
              <DummyIcon size={18} />
            </Segment>
          </SegmentedControl>
        </div>
      </div>
    </div>
  ),
};
