import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { FilterChip } from '../../filter-chip';
import { FilterChipGroup } from '../../filter-chip-group';

const meta = {
  title: 'Components/Chip/FilterChipGroup',
  component: FilterChipGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selectionMode: {
      control: 'radio',
      options: ['single', 'multiple'],
      description: '選択モード（デフォルト: single）',
      table: {
        type: { summary: "'single' | 'multiple'" },
        defaultValue: { summary: 'single' },
      },
    },
    value: {
      control: false,
      description: '選択された値（controlled）',
      table: {
        type: { summary: 'string | null | string[]' },
      },
    },
    defaultValue: {
      control: false,
      description: '初期選択値（uncontrolled）',
      table: {
        type: { summary: 'string | null | string[]' },
      },
    },
    onChange: {
      action: 'changed',
      description: '選択変更時のハンドラ',
      table: {
        type: {
          summary: '(value: string | null | string[]) => void',
        },
      },
    },
    children: {
      control: false,
      description: 'FilterChip要素',
      table: {
        type: {
          summary:
            'ReactElement<FilterChipProps> | ReactElement<FilterChipProps>[]',
        },
      },
    },
    className: {
      control: 'text',
      description: '追加のクラス名',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof FilterChipGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 単一選択
 * ラジオボタンのように1つだけ選択できます
 * （selectionModeのデフォルトは'single'）
 */
export const SingleSelect: Story = {
  args: {
    children: <FilterChip value="1" label="Text" />,
  },
  render: function Render() {
    const [value, setValue] = useState<string | null>('1');

    return (
      <FilterChipGroup value={value} onChange={setValue}>
        <FilterChip value="1" label="Text" />
        <FilterChip value="2" label="Text" />
        <FilterChip value="3" label="Text" />
        <FilterChip value="4" label="Text" />
        <FilterChip value="5" label="Text" />
        <FilterChip value="6" label="Text" />
        <FilterChip value="7" label="Text" />
        <FilterChip value="8" label="Text" />
      </FilterChipGroup>
    );
  },
};

/**
 * 複数選択
 * チェックボックスのように複数選択できます
 */
export const MultipleSelect: Story = {
  args: {
    selectionMode: 'multiple',
    children: <FilterChip value="1" label="Text" />,
  },
  render: function Render() {
    const [value, setValue] = useState<string[]>(['1', '3', '6']);

    return (
      <FilterChipGroup
        selectionMode="multiple"
        value={value}
        onChange={setValue}
      >
        <FilterChip value="1" label="Text" />
        <FilterChip value="2" label="Text" />
        <FilterChip value="3" label="Text" />
        <FilterChip value="4" label="Text" />
        <FilterChip value="5" label="Text" />
        <FilterChip value="6" label="Text" />
        <FilterChip value="7" label="Text" />
        <FilterChip value="8" label="Text" />
      </FilterChipGroup>
    );
  },
};
