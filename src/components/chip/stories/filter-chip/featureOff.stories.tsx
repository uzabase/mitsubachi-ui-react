import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { FilterChip, FilterChipGroup } from '../../filter-chip';

const meta = {
  title: 'Components/Chip/FilterChip/featureOff',
  component: FilterChip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['desktop', 'phone'],
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'focus', 'disabled'],
    },
  },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * FilterChip - デスクトップサイズ（12px）
 */
export const Desktop: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <FilterChip size="desktop" state="default">
        Text
      </FilterChip>
      <FilterChip size="desktop" state="default" selected>
        Text
      </FilterChip>
    </div>
  ),
};

/**
 * FilterChip - フォンサイズ（14px）
 */
export const Phone: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <FilterChip size="phone" state="default">
        Text
      </FilterChip>
      <FilterChip size="phone" state="default" selected>
        Text
      </FilterChip>
    </div>
  ),
};

/**
 * FilterChip - 全状態
 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <FilterChip size="desktop" state="default">
          Default
        </FilterChip>
        <FilterChip size="desktop" state="hover">
          Hover
        </FilterChip>
        <FilterChip size="desktop" state="active">
          Active
        </FilterChip>
        <FilterChip size="desktop" state="focus">
          Focus
        </FilterChip>
        <FilterChip size="desktop" state="disabled">
          Disabled
        </FilterChip>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <FilterChip size="desktop" state="default" selected>
          Selected
        </FilterChip>
        <FilterChip size="desktop" state="hover" selected>
          Selected Hover
        </FilterChip>
        <FilterChip size="desktop" state="active" selected>
          Selected Active
        </FilterChip>
        <FilterChip size="desktop" state="focus" selected>
          Selected Focus
        </FilterChip>
        <FilterChip size="desktop" state="disabled" selected>
          Selected Disabled
        </FilterChip>
      </div>
    </div>
  ),
};

/**
 * FilterChipGroup - 単一選択
 */
const GroupSingleComponent = () => {
  const [value, setValue] = useState<string>('');

  return (
    <FilterChipGroup
      multiple={false}
      value={value}
      onChange={(newValue) => setValue(newValue as string)}
    >
      <FilterChip key="option1">Option 1</FilterChip>
      <FilterChip key="option2">Option 2</FilterChip>
      <FilterChip key="option3">Option 3</FilterChip>
      <FilterChip key="option4">Option 4</FilterChip>
    </FilterChipGroup>
  );
};

export const GroupSingle: Story = {
  render: () => <GroupSingleComponent />,
};

/**
 * FilterChipGroup - 複数選択
 */
const GroupMultipleComponent = () => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <FilterChipGroup
      multiple={true}
      value={value}
      onChange={(newValue) => setValue(newValue as string[])}
    >
      <FilterChip key="option1">Option 1</FilterChip>
      <FilterChip key="option2">Option 2</FilterChip>
      <FilterChip key="option3">Option 3</FilterChip>
      <FilterChip key="option4">Option 4</FilterChip>
    </FilterChipGroup>
  );
};

export const GroupMultiple: Story = {
  render: () => <GroupMultipleComponent />,
};

/**
 * FilterChipGroup - 折り返し
 */
const GroupWrapComponent = () => {
  const [value, setValue] = useState<string[]>([]);

  return (
    <div style={{ width: '300px', border: '1px dashed #ccc', padding: '16px' }}>
      <FilterChipGroup
        multiple={true}
        value={value}
        onChange={(newValue) => setValue(newValue as string[])}
      >
        <FilterChip key="option1">Very Long Option Name 1</FilterChip>
        <FilterChip key="option2">Very Long Option Name 2</FilterChip>
        <FilterChip key="option3">Very Long Option Name 3</FilterChip>
        <FilterChip key="option4">Very Long Option Name 4</FilterChip>
        <FilterChip key="option5">Very Long Option Name 5</FilterChip>
      </FilterChipGroup>
    </div>
  );
};

export const GroupWrap: Story = {
  render: () => <GroupWrapComponent />,
};
