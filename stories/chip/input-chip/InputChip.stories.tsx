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
          'ユーザーが入力した内容を要素ごとに表示し、個別に削除できるコンポーネントです。',
      },
    },
  },
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

/**
 * Focus状態（:focus-visible）
 */
export const Focus: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};

/**
 * すべての状態を一覧表示
 */
export const AllStates: Story = {
  args: {
    ...Default.args,
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, auto)',
        gap: '16px',
        alignItems: 'center',
        padding: '40px',
      }}
    >
      <InputChip label="Default" onRemove={() => {}} />
      <InputChip label="Disabled" onRemove={() => {}} disabled />
    </div>
  ),
};
