import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { FilterChip, FilterChipGroup } from '../../filter-chip';

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

/**
 * FilterChipGroup - 単一選択
 * ラジオボタンのように1つだけ選択できます
 */
export const SingleSelectGroup: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string>('');

    return (
      <div style={{ maxWidth: '600px' }}>
        <FilterChipGroup value={value} onChange={(v) => setValue(v as string)}>
          <FilterChip key="all" {...args}>
            すべて
          </FilterChip>
          <FilterChip key="published" {...args}>
            公開済み
          </FilterChip>
          <FilterChip key="draft" {...args}>
            下書き
          </FilterChip>
          <FilterChip key="archived" {...args}>
            アーカイブ
          </FilterChip>
        </FilterChipGroup>
        <p style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>
          選択中: {value || 'なし'}
        </p>
      </div>
    );
  },
  args: {
    children: 'Filter',
    size: 'desktop',
    state: 'default',
  },
};

/**
 * FilterChipGroup - 複数選択
 * チェックボックスのように複数選択できます
 */
export const MultipleSelectGroup: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<string[]>([]);

    return (
      <div style={{ maxWidth: '600px' }}>
        <FilterChipGroup
          multiple
          value={value}
          onChange={(v) => setValue(v as string[])}
        >
          <FilterChip key="react" {...args}>
            React
          </FilterChip>
          <FilterChip key="typescript" {...args}>
            TypeScript
          </FilterChip>
          <FilterChip key="vite" {...args}>
            Vite
          </FilterChip>
          <FilterChip key="storybook" {...args}>
            Storybook
          </FilterChip>
          <FilterChip key="vitest" {...args}>
            Vitest
          </FilterChip>
          <FilterChip key="eslint" {...args}>
            ESLint
          </FilterChip>
          <FilterChip key="prettier" {...args}>
            Prettier
          </FilterChip>
        </FilterChipGroup>
        <p style={{ marginTop: '16px', color: '#666', fontSize: '14px' }}>
          選択中: {value.length > 0 ? value.join(', ') : 'なし'}
        </p>
      </div>
    );
  },
  args: {
    children: 'Filter',
    size: 'desktop',
    state: 'default',
  },
};
