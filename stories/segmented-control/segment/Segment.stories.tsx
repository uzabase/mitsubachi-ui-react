import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

import { Segment } from '../../../src/components/segmented-control/segment';
import { SegmentedControl } from '../../../src/components/segmented-control/segmented-control';
import { DummyIcon } from '../../../src/icons';

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
          '  <Segment variant="text" value="Item1">アイテム1</Segment>\n' +
          '  <Segment variant="text" value="Item2">アイテム2</Segment>\n' +
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
    variant: {
      control: 'radio',
      options: ['text', 'icon'],
      description: 'セグメントの表示バリアント',
    },
    children: {
      control: 'text',
      description: 'セグメントに表示するコンテンツ',
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
   テキスト: 未選択状態
   ============================== */

/**
 * テキスト: 未選択のデフォルト状態
 */
export const TextNormal: Story = {
  args: {
    value: 'normal',
    variant: 'text',
    children: 'Label',
  },
};

/**
 * テキスト: Hover 状態（未選択）
 */
export const TextHover: Story = {
  args: {
    value: 'hover',
    variant: 'text',
    children: 'Label',
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * テキスト: Active 状態（未選択）
 */
export const TextActive: Story = {
  args: {
    value: 'active',
    variant: 'text',
    children: 'Label',
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

/**
 * テキスト: Focus 状態
 */
export const TextFocus: Story = {
  args: {
    value: 'focus',
    variant: 'text',
    children: 'Label',
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};

/**
 * テキスト: 無効化状態（未選択）
 */
export const TextDisabled: Story = {
  args: {
    value: 'disabled',
    variant: 'text',
    children: 'Label',
    disabled: true,
  },
};

/* ==============================
   テキスト: 選択状態
   ============================== */

const selectedDecorator: Decorator = (Story) => (
  <SegmentedControl defaultValue="current">
    <Story />
  </SegmentedControl>
);

/**
 * テキスト: 選択状態
 */
export const TextSelected: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    variant: 'text',
    children: 'Label',
  },
};

/**
 * テキスト: 選択 + Hover 状態
 */
export const TextSelectedHover: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    variant: 'text',
    children: 'Label',
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * テキスト: 選択 + Active 状態
 */
export const TextSelectedActive: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    variant: 'text',
    children: 'Label',
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

/**
 * テキスト: 選択 + Focus 状態
 */
export const TextSelectedFocus: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    variant: 'text',
    children: 'Label',
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};

/**
 * テキスト: 選択 + 無効化状態
 */
export const TextSelectedDisabled: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    variant: 'text',
    children: 'Label',
    disabled: true,
  },
};

/* ==============================
   アイコン: 未選択状態
   ============================== */

/**
 * アイコン: 未選択のデフォルト状態
 */
export const IconNormal: Story = {
  args: {
    value: 'normal',
    variant: 'icon',
    children: <DummyIcon size={18} />,
  },
};

/**
 * アイコン: Hover 状態（未選択）
 */
export const IconHover: Story = {
  args: {
    value: 'hover',
    variant: 'icon',
    children: <DummyIcon size={18} />,
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * アイコン: Active 状態（未選択）
 */
export const IconActive: Story = {
  args: {
    value: 'active',
    variant: 'icon',
    children: <DummyIcon size={18} />,
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

/**
 * アイコン: Focus 状態
 */
export const IconFocus: Story = {
  args: {
    value: 'focus',
    variant: 'icon',
    children: <DummyIcon size={18} />,
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};

/**
 * アイコン: 無効化状態（未選択）
 */
export const IconDisabled: Story = {
  args: {
    value: 'disabled',
    variant: 'icon',
    children: <DummyIcon size={18} />,
    disabled: true,
  },
};

/* ==============================
   アイコン: 選択状態
   ============================== */

/**
 * アイコン: 選択状態
 */
export const IconSelected: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    variant: 'icon',
    children: <DummyIcon size={18} />,
  },
};

/**
 * アイコン: 選択 + Hover 状態
 */
export const IconSelectedHover: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    variant: 'icon',
    children: <DummyIcon size={18} />,
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * アイコン: 選択 + Active 状態
 */
export const IconSelectedActive: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    variant: 'icon',
    children: <DummyIcon size={18} />,
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

/**
 * アイコン: 選択 + Focus 状態
 */
export const IconSelectedFocus: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    variant: 'icon',
    children: <DummyIcon size={18} />,
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};

/**
 * アイコン: 選択 + 無効化状態
 */
export const IconSelectedDisabled: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    variant: 'icon',
    children: <DummyIcon size={18} />,
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
          テキスト: 未選択
        </p>
        <SegmentedControl>
          <Segment variant="text" value="default">
            Default
          </Segment>
          <Segment variant="text" value="disabled" disabled>
            Disabled
          </Segment>
        </SegmentedControl>
      </div>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          テキスト: 選択
        </p>
        <SegmentedControl defaultValue="selected">
          <Segment variant="text" value="selected">
            Selected
          </Segment>
          <Segment variant="text" value="selected-disabled" disabled>
            Selected + Disabled
          </Segment>
        </SegmentedControl>
      </div>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          アイコン: 未選択
        </p>
        <SegmentedControl>
          <Segment variant="icon" value="default">
            <DummyIcon size={18} />
          </Segment>
          <Segment variant="icon" value="disabled" disabled>
            <DummyIcon size={18} />
          </Segment>
        </SegmentedControl>
      </div>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          アイコン: 選択
        </p>
        <SegmentedControl defaultValue="selected">
          <Segment variant="icon" value="selected">
            <DummyIcon size={18} />
          </Segment>
          <Segment variant="icon" value="selected-disabled" disabled>
            <DummyIcon size={18} />
          </Segment>
        </SegmentedControl>
      </div>
    </div>
  ),
};
