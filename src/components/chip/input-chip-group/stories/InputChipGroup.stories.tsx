import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { InputChip } from '../../input-chip/input-chip';
import { InputChipGroup } from '../input-chip-group';

const meta = {
  title: 'Components/Chip/InputChipGroup',
  component: InputChipGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof InputChipGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Normal: Story = {
  render: function Render() {
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
              label={chip.label}
              onDelete={() => handleDelete(chip.id)}
            />
          ))}
        </InputChipGroup>
      </div>
    );
  },
  args: {
    children: <></>,
  },
};
