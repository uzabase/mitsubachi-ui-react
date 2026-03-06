import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

import { Segment } from '../../../src/components/segmented-control/segment';
import { SegmentedControl } from '../../../src/components/segmented-control/segmented-control';

const meta = {
  title: 'Components/SegmentedControl/Segment',
  component: Segment,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'SegmentedControl 内の個別セグメントです。\n\n' +
          '> **注意:** このコンポーネントを単独で使用しないでください。\n' +
          '> [SegmentedControl](?path=/docs/components-segmentedcontrol-segmentedcontrol--docs) 内に配置して利用してください。\n\n' +
          '> **使い分け:** SegmentedControl は単一選択のUIコンポーネントです。\n' +
          '> 複数選択が必要な場合は、チェックボックスグループの使用を検討してください。\n\n' +
          '## 使用例\n\n' +
          '```tsx\n' +
          '<SegmentedControl defaultValue="tab1">\n' +
          '  <Segment value="Item1">アイテム1</Segment>\n' +
          '  <Segment value="Item">アイテム2</Segment>\n' +
          '</SegmentedControl>\n' +
          '```',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'text',
      description: 'セグメントの値',
    },
    children: {
      control: 'text',
      description: 'セグメントに表示するテキスト',
    },
    disabled: {
      control: 'boolean',
      description: '無効化状態',
    },
  },
  decorators: [
    (Story) => (
      <SegmentedControl>
        <Story />
      </SegmentedControl>
    ),
  ],
} satisfies Meta<typeof Segment>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==============================
   未選択状態
   ============================== */

/**
 * 未選択のデフォルト状態
 */
export const Normal: Story = {
  args: {
    value: 'normal',
    children: 'Label',
  },
};

/**
 * Hover 状態（未選択）
 */
export const Hover: Story = {
  args: {
    value: 'hover',
    children: 'Label',
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * Active 状態（未選択）
 */
export const Active: Story = {
  args: {
    value: 'active',
    children: 'Label',
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

/**
 * Focus 状態
 */
export const Focus: Story = {
  args: {
    value: 'focus',
    children: 'Label',
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};

/**
 * 無効化状態（未選択）
 */
export const Disabled: Story = {
  args: {
    value: 'disabled',
    children: 'Label',
    disabled: true,
  },
};

/* ==============================
   選択状態
   ============================== */

const selectedDecorator: Decorator = (Story) => (
  <SegmentedControl defaultValue="current">
    <Story />
  </SegmentedControl>
);

/**
 * 選択状態
 */
export const Selected: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    children: 'Label',
  },
};

/**
 * 選択 + Hover 状態
 */
export const SelectedHover: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    children: 'Label',
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * 選択 + Active 状態
 */
export const SelectedActive: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    children: 'Label',
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

/**
 * 選択 + Focus 状態
 */
export const SelectedFocus: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    children: 'Label',
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};

/**
 * 選択 + 無効化状態
 */
export const SelectedDisabled: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    children: 'Label',
    disabled: true,
  },
};

/* ==============================
   全状態一覧
   ============================== */

/**
 * 全状態の一覧表示
 */
export const AllStates: StoryObj = {
  decorators: [],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          未選択セグメント
        </p>
        <SegmentedControl>
          <Segment value="default">Default</Segment>
          <Segment value="disabled" disabled>
            Disabled
          </Segment>
        </SegmentedControl>
      </div>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          選択セグメント
        </p>
        <SegmentedControl defaultValue="selected">
          <Segment value="selected">Selected</Segment>
          <Segment value="selected-disabled" disabled>
            Selected + Disabled
          </Segment>
        </SegmentedControl>
      </div>
    </div>
  ),
};
