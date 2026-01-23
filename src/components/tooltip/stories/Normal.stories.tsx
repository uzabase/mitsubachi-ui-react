import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from '../tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'start', 'end'],
      description: '表示方向',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: '配置調整',
    },
    sideOffset: {
      control: { type: 'number', min: 0, max: 20 },
    },
    delay: {
      control: { type: 'number', min: 0, max: 1000 },
    },
    closeDelay: {
      control: { type: 'number', min: 0, max: 1000 },
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的なツールチップの例
 */
export const Normal: Story = {
  args: {
    content: 'ツールチップの内容',
    children: <button type="button">ホバーしてください</button>,
  },
};
