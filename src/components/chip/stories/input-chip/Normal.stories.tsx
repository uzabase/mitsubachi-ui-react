import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputChip } from '../../input-chip';

const meta = {
  title: 'Components/Chip/InputChip',
  component: InputChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['desktop', 'phone'],
      description: 'チップのサイズ',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'focus', 'loading', 'disabled'],
      description: 'チップの状態',
    },
    disabled: {
      control: 'boolean',
      description: '無効化',
    },
  },
} satisfies Meta<typeof InputChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的なInputChipの例
 */
export const Normal: Story = {
  args: {
    children: 'Text',
    size: 'desktop',
    state: 'default',
    onDelete: () => {},
  },
};
