import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { InputChip } from '../../input-chip';

const meta = {
  title: 'Components/Chip/InputChip',
  component: InputChip,
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
      options: ['default', 'hover', 'active', 'focus', 'loading', 'disabled'],
      description: 'チップの状態（Storybook表示用）',
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
      <InputChip
        {...args}
        onDelete={() => setVisible(false)}
        label={args.label}
      />
    );
  },
  args: {
    label: 'Text',
    onDelete: () => {},
  },
};
