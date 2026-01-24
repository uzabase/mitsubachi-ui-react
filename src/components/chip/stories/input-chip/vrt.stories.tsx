import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputChip } from '../../input-chip';

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
 * デスクトップサイズ
 */
export const Desktop: Story = {
  args: {
    children: 'Text',
    size: 'desktop',
    state: 'default',
    onDelete: () => {},
  },
};

/**
 * フォンサイズ
 */
export const Phone: Story = {
  args: {
    children: 'Text',
    size: 'phone',
    state: 'default',
    onDelete: () => {},
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
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#666' }}>Phone (14px)</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <InputChip size="phone" state="default" onDelete={() => {}}>
            Default
          </InputChip>
          <InputChip size="phone" state="hover" onDelete={() => {}}>
            Hover
          </InputChip>
          <InputChip size="phone" state="active" onDelete={() => {}}>
            Active
          </InputChip>
          <InputChip size="phone" state="focus" onDelete={() => {}}>
            Focus
          </InputChip>
          <InputChip size="phone" state="loading">
            Loading
          </InputChip>
          <InputChip size="phone" state="disabled">
            Disabled
          </InputChip>
        </div>
      </div>
    </div>
  ),
};
