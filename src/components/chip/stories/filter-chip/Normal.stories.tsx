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
    viewport: {
      control: 'radio',
      options: ['desktop', 'phone'],
      description: 'ビューポート（デスクトップ/モバイル）',
    },
    state: {
      control: 'radio',
      options: ['default', 'hover', 'active', 'focus', 'disabled'],
      description: 'チップの状態（Storybook表示用）',
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
    label: 'Text',
    selected: false,
  },
};
