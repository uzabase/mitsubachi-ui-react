import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { InputChip, InputChipGroup } from '../../input-chip';

const meta = {
  title: 'Components/Chip/InputChip/featureOff',
  component: InputChip,
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
      options: ['default', 'hover', 'active', 'focus', 'loading', 'disabled'],
    },
  },
} satisfies Meta<typeof InputChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * InputChip - デスクトップサイズ（12px）
 */
export const Desktop: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <InputChip size="desktop" state="default" onDelete={() => {}}>
        Text
      </InputChip>
    </div>
  ),
};

/**
 * InputChip - フォンサイズ（14px）
 */
export const Phone: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <InputChip size="phone" state="default" onDelete={() => {}}>
        Text
      </InputChip>
    </div>
  ),
};

/**
 * InputChip - 全状態
 */
export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <InputChip size="desktop" state="default" onDelete={() => {}}>
        Default
      </InputChip>
      <InputChip size="desktop" state="hover" onDelete={() => {}}>
        Hover
      </InputChip>
      <InputChip size="desktop" state="active" onDelete={() => {}}>
        Active
      </InputChip>
      <InputChip size="desktop" state="focus" onDelete={() => {}}>
        Focus
      </InputChip>
      <InputChip size="desktop" state="loading">
        Loading
      </InputChip>
      <InputChip size="desktop" state="disabled">
        Disabled
      </InputChip>
    </div>
  ),
};

/**
 * InputChipGroup - 基本
 */
const GroupBasicComponent = () => {
  const [chips, setChips] = useState(['Chip 1', 'Chip 2', 'Chip 3']);

  return (
    <InputChipGroup>
      {chips.map((chip, index) => (
        <InputChip
          key={index}
          size="desktop"
          onDelete={() => {
            setChips(chips.filter((_, i) => i !== index));
          }}
        >
          {chip}
        </InputChip>
      ))}
    </InputChipGroup>
  );
};

export const GroupBasic: Story = {
  render: () => <GroupBasicComponent />,
};

/**
 * InputChipGroup - 折り返し（水平スクロール禁止）
 */
const GroupWrapComponent = () => {
  const [chips, setChips] = useState([
    'Very Long Chip Name 1',
    'Very Long Chip Name 2',
    'Very Long Chip Name 3',
    'Very Long Chip Name 4',
    'Very Long Chip Name 5',
  ]);

  return (
    <div style={{ width: '300px', border: '1px dashed #ccc', padding: '16px' }}>
      <InputChipGroup>
        {chips.map((chip, index) => (
          <InputChip
            key={index}
            size="desktop"
            onDelete={() => {
              setChips(chips.filter((_, i) => i !== index));
            }}
          >
            {chip}
          </InputChip>
        ))}
      </InputChipGroup>
    </div>
  );
};

export const GroupWrap: Story = {
  render: () => <GroupWrapComponent />,
};
