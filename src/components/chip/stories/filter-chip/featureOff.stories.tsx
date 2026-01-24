import type { Meta, StoryObj } from '@storybook/react-vite';

import { FilterChip } from '../../filter-chip';

const meta = {
  title: 'Components/Chip/FilterChip/featureOff',
  component: FilterChip,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * FilterChip - Desktop
 */
export const Desktop: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <FilterChip label="Text" viewport="desktop" />
    </div>
  ),
  args: {
    label: 'Text',
  },
};

/**
 * FilterChip - Phone
 */
export const Phone: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <FilterChip label="Text" viewport="phone" />
    </div>
  ),
  args: {
    label: 'Text',
  },
};
