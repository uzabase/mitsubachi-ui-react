import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputChip } from '../../input-chip';
import { Normal } from './Normal.stories';

const meta = {
  title: 'Components/Chip/InputChip/vrt',
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
 * Default状態
 */
export const Default: Story = {
  args: Normal.args,
};

/**
 * Hover状態
 */
export const Hover: Story = {
  args: {
    ...Normal.args,
    state: 'hover',
  },
};

/**
 * Active状態
 */
export const Active: Story = {
  args: {
    ...Normal.args,
    state: 'active',
  },
};

/**
 * Focus状態
 */
export const Focus: Story = {
  args: {
    ...Normal.args,
    state: 'focus',
  },
};

/**
 * Loading状態
 */
export const Loading: Story = {
  args: {
    ...Normal.args,
    state: 'loading',
  },
};

/**
 * Disabled状態
 */
export const Disabled: Story = {
  args: {
    ...Normal.args,
    state: 'disabled',
    disabled: true,
  },
};

/**
 * 全状態の一覧表示
 */
export const AllStates: Story = {
  args: {
    children: 'Text',
    size: 'desktop',
    state: 'default',
    onDelete: () => {},
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '20px',
      }}
    >
      <div>
        <h3 style={{ marginBottom: '12px', color: '#666' }}>Desktop (12px)</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <InputChip {...Default.args} size="desktop">
            Default
          </InputChip>
          <InputChip {...Hover.args} size="desktop">
            Hover
          </InputChip>
          <InputChip {...Active.args} size="desktop">
            Active
          </InputChip>
          <InputChip {...Focus.args} size="desktop">
            Focus
          </InputChip>
          <InputChip {...Loading.args} size="desktop">
            Loading
          </InputChip>
          <InputChip {...Disabled.args} size="desktop">
            Disabled
          </InputChip>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#666' }}>Phone (14px)</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <InputChip {...Default.args} size="phone">
            Default
          </InputChip>
          <InputChip {...Hover.args} size="phone">
            Hover
          </InputChip>
          <InputChip {...Active.args} size="phone">
            Active
          </InputChip>
          <InputChip {...Focus.args} size="phone">
            Focus
          </InputChip>
          <InputChip {...Loading.args} size="phone">
            Loading
          </InputChip>
          <InputChip {...Disabled.args} size="phone">
            Disabled
          </InputChip>
        </div>
      </div>
    </div>
  ),
};
