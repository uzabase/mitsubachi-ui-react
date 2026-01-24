import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputChip } from '../../input-chip';

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
  args: {
    children: 'Text',
  },
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
  args: {
    children: 'Text',
  },
};
