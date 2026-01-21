import type { Meta, StoryObj } from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { BaseUIExample } from '../BaseUIExample';

const meta = {
  title: 'Example/BaseUIExample',
  component: BaseUIExample,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: { onClick: fn() },
} satisfies Meta<typeof BaseUIExample>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Base UIボタン',
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'クリックしてください',
  },
};
