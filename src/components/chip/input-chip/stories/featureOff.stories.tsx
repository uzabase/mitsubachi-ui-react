import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputChip } from '../input-chip';

const meta = {
  title: 'Components/Chip/InputChip/featureOff',
  component: InputChip,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InputChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * InputChip - Desktop
 */
export const Desktop: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <InputChip label="Text" viewport="desktop" onDelete={() => {}} />
    </div>
  ),
  args: {
    label: 'Text',
  },
};

/**
 * InputChip - Phone
 */
export const Phone: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <InputChip label="Text" viewport="phone" onDelete={() => {}} />
    </div>
  ),
  args: {
    label: 'Text',
  },
};
