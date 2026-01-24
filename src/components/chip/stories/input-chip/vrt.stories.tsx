import type { Meta, StoryObj } from '@storybook/react-vite';

import { InputChip } from '../../input-chip';

const meta = {
  title: 'Components/Chip/InputChip/vrt',
  component: InputChip,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof InputChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default状態
 */
export const Default: Story = {
  args: {
    label: 'Text',
    viewport: 'desktop',
    state: 'default',
    onDelete: () => {},
  },
};

/**
 * Hover状態
 */
export const Hover: Story = {
  args: {
    ...Default.args,
    state: 'hover',
  },
};

/**
 * Active状態
 */
export const Active: Story = {
  args: {
    ...Default.args,
    state: 'active',
  },
};

/**
 * Focus状態
 */
export const Focus: Story = {
  args: {
    ...Default.args,
    state: 'focus',
  },
};

/**
 * Loading状態
 */
export const Loading: Story = {
  args: {
    ...Default.args,
    state: 'loading',
  },
};

/**
 * Disabled状態
 */
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

/**
 * 全状態の一覧表示
 *
 * Note: state prop は Storybook でのビジュアル確認用です。
 * 実際のインタラクションは CSS の擬似クラスで自動的に処理されます。
 */
export const AllStates: Story = {
  args: {
    label: 'Text',
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
        <h3 style={{ marginBottom: '12px', color: '#666' }}>Desktop</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <InputChip viewport="desktop" label="Default" onDelete={() => {}} />
          <InputChip
            viewport="desktop"
            state="hover"
            label="Hover"
            onDelete={() => {}}
          />
          <InputChip
            viewport="desktop"
            state="active"
            label="Active"
            onDelete={() => {}}
          />
          <InputChip
            viewport="desktop"
            state="focus"
            label="Focus"
            onDelete={() => {}}
          />
          <InputChip
            viewport="desktop"
            state="loading"
            label="Loading"
            onDelete={() => {}}
          />
          <InputChip
            viewport="desktop"
            label="Disabled"
            disabled
            onDelete={() => {}}
          />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#666' }}>Phone</h3>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <InputChip viewport="phone" label="Default" onDelete={() => {}} />
          <InputChip
            viewport="phone"
            state="hover"
            label="Hover"
            onDelete={() => {}}
          />
          <InputChip
            viewport="phone"
            state="active"
            label="Active"
            onDelete={() => {}}
          />
          <InputChip
            viewport="phone"
            state="focus"
            label="Focus"
            onDelete={() => {}}
          />
          <InputChip
            viewport="phone"
            state="loading"
            label="Loading"
            onDelete={() => {}}
          />
          <InputChip
            viewport="phone"
            label="Disabled"
            disabled
            onDelete={() => {}}
          />
        </div>
      </div>
    </div>
  ),
};
