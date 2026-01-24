import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { InputChip, InputChipGroup } from '../../input-chip';

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
  render: function Render(args) {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return <></>;
    }

    return (
      <InputChip {...args} onDelete={() => setVisible(false)}>
        {args.children}
      </InputChip>
    );
  },
  args: {
    children: 'Text',
    size: 'desktop',
    state: 'default',
    onDelete: () => {},
  },
};

/**
 * InputChipGroup - 複数のチップ削除
 * InputChipGroupは折り返しあり、水平スクロールを禁止します
 */
export const InputChipGroupStory: Story = {
  render: function Render(args) {
    const [chips, setChips] = useState([
      { id: 1, label: 'Text' },
      { id: 2, label: 'Text' },
      { id: 3, label: 'Text' },
      { id: 4, label: 'Text' },
      { id: 5, label: 'Text' },
      { id: 6, label: 'Text' },
      { id: 7, label: 'Text' },
      { id: 8, label: 'Text' },
    ]);

    const handleDelete = (id: number) => {
      setChips((prev) => prev.filter((chip) => chip.id !== id));
    };

    return (
      <div style={{ maxWidth: '400px' }}>
        <InputChipGroup>
          {chips.map((chip) => (
            <InputChip
              key={chip.id}
              {...args}
              onDelete={() => handleDelete(chip.id)}
            >
              {chip.label}
            </InputChip>
          ))}
        </InputChipGroup>
      </div>
    );
  },
  args: Normal.args,
};
