import type { Meta, StoryObj } from '@storybook/react-vite';

import { FilterChip } from '../../filter-chip';

const meta = {
  title: 'Components/Chip/FilterChip',
  component: FilterChip,
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
      options: ['default', 'hover', 'active', 'focus', 'disabled'],
      description: 'チップの状態',
    },
    selected: {
      control: 'boolean',
      description: '選択状態',
    },
    disabled: {
      control: 'boolean',
      description: '無効化',
    },
  },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的なFilterChipの例
 */
export const Normal: Story = {
  args: {
    children: 'Text',
    size: 'desktop',
    state: 'default',
    selected: false,
  },
};
