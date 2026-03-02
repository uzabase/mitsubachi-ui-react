import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputChip } from '../../../src/components/chip/input-chip';

const meta = {
  title: 'Components/Chip/InputChip',
  component: InputChip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ユーザーが入力した内容を、要素ごとに整理して表示するコンポーネントです。\n' +
          'Chipの削除操作（×ボタン）で、ユーザーが入力内容を削除することができます。\n\n' +
          '> **⚠️注意:** このコンポーネントを単独で使用しないでください。\n' +
          '> [InputChipGroup](?path=/docs/components-chip-inputchipgroup--docs) 経由で利用してください。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: '表示するラベルテキスト',
    },
    disabled: {
      control: 'boolean',
      description: '無効化状態',
    },
  },
} satisfies Meta<typeof InputChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルト状態
 */
export const Default: Story = {
  args: {
    label: 'Text',
    onRemove: () => {},
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
 * Hover状態
 */
export const Hover: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * Active状態
 */
export const Active: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};
