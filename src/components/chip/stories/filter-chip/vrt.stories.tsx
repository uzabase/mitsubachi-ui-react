import type { Meta, StoryObj } from '@storybook/react-vite';

import { FilterChip } from '../../filter-chip';

const meta = {
  title: 'Components/Chip/FilterChip/vrt',
  component: FilterChip,
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
      options: ['default', 'hover', 'active', 'focus', 'disabled'],
    },
  },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デスクトップサイズ - 未選択
 */
export const DesktopUnselected: Story = {
  args: {
    children: 'Text',
    size: 'desktop',
    state: 'default',
    selected: false,
  },
};

/**
 * デスクトップサイズ - 選択済み
 */
export const DesktopSelected: Story = {
  args: {
    children: 'Text',
    size: 'desktop',
    state: 'default',
    selected: true,
  },
};

/**
 * フォンサイズ - 未選択
 */
export const PhoneUnselected: Story = {
  args: {
    children: 'Text',
    size: 'phone',
    state: 'default',
    selected: false,
  },
};

/**
 * フォンサイズ - 選択済み
 */
export const PhoneSelected: Story = {
  args: {
    children: 'Text',
    size: 'phone',
    state: 'default',
    selected: true,
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
    selected: false,
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
          <FilterChip size="desktop" state="default">
            Default
          </FilterChip>
          <FilterChip size="desktop" state="default" selected>
            Selected
          </FilterChip>
          <FilterChip size="desktop" state="hover">
            Hover
          </FilterChip>
          <FilterChip size="desktop" state="hover" selected>
            Selected Hover
          </FilterChip>
          <FilterChip size="desktop" state="active">
            Active
          </FilterChip>
          <FilterChip size="desktop" state="active" selected>
            Selected Active
          </FilterChip>
          <FilterChip size="desktop" state="focus">
            Focus
          </FilterChip>
          <FilterChip size="desktop" state="focus" selected>
            Selected Focus
          </FilterChip>
          <FilterChip size="desktop" state="disabled">
            Disabled
          </FilterChip>
          <FilterChip size="desktop" state="disabled" selected>
            Selected Disabled
          </FilterChip>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#666' }}>Phone (14px)</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <FilterChip size="phone" state="default">
            Default
          </FilterChip>
          <FilterChip size="phone" state="default" selected>
            Selected
          </FilterChip>
          <FilterChip size="phone" state="hover">
            Hover
          </FilterChip>
          <FilterChip size="phone" state="hover" selected>
            Selected Hover
          </FilterChip>
          <FilterChip size="phone" state="active">
            Active
          </FilterChip>
          <FilterChip size="phone" state="active" selected>
            Selected Active
          </FilterChip>
          <FilterChip size="phone" state="focus">
            Focus
          </FilterChip>
          <FilterChip size="phone" state="focus" selected>
            Selected Focus
          </FilterChip>
          <FilterChip size="phone" state="disabled">
            Disabled
          </FilterChip>
          <FilterChip size="phone" state="disabled" selected>
            Selected Disabled
          </FilterChip>
        </div>
      </div>
    </div>
  ),
};
