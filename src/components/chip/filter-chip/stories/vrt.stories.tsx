import type { Meta, StoryObj } from '@storybook/react-vite';

import { FilterChip } from '../filter-chip';
import { Normal } from './Normal.stories';

const meta = {
  title: 'Components/Chip/FilterChip/vrt',
  component: FilterChip,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default Unselected状態
 */
export const DefaultUnselected: Story = {
  args: Normal.args,
};

/**
 * Default Selected状態
 */
export const DefaultSelected: Story = {
  args: {
    ...DefaultUnselected.args,
    selected: true,
  },
};

/**
 * Disabled Unselected状態
 */
export const DisabledUnselected: Story = {
  args: {
    ...Normal.args,
    disabled: true,
  },
};

/**
 * Disabled Selected状態
 */
export const DisabledSelected: Story = {
  args: {
    ...DisabledUnselected.args,
    selected: true,
  },
};

/**
 * Hover Unselected状態
 */
export const HoverUnselected: Story = {
  args: {
    ...DefaultUnselected.args,
    state: 'hover',
  },
};

/**
 * Hover Selected状態
 */
export const HoverSelected: Story = {
  args: {
    ...HoverUnselected.args,
    selected: true,
  },
};

/**
 * Active Unselected状態
 */
export const ActiveUnselected: Story = {
  args: {
    ...DefaultUnselected.args,
    state: 'active',
  },
};

/**
 * Active Selected状態
 */
export const ActiveSelected: Story = {
  args: {
    ...ActiveUnselected.args,
    selected: true,
  },
};

/**
 * Focus Unselected状態
 */
export const FocusUnselected: Story = {
  args: {
    ...DefaultUnselected.args,
    state: 'focus',
  },
};

/**
 * Focus Selected状態
 */
export const FocusSelected: Story = {
  args: {
    ...FocusUnselected.args,
    selected: true,
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
        <h3 style={{ marginBottom: '12px', color: '#666' }}>Desktop</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '80px', color: '#666', fontSize: '12px' }}>
              Default:
            </span>
            <FilterChip viewport="desktop" label="Text" />
            <FilterChip viewport="desktop" label="Text" selected />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '80px', color: '#666', fontSize: '12px' }}>
              Hover:
            </span>
            <FilterChip viewport="desktop" state="hover" label="Text" />
            <FilterChip
              viewport="desktop"
              state="hover"
              label="Text"
              selected
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '80px', color: '#666', fontSize: '12px' }}>
              Active:
            </span>
            <FilterChip viewport="desktop" state="active" label="Text" />
            <FilterChip
              viewport="desktop"
              state="active"
              label="Text"
              selected
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '80px', color: '#666', fontSize: '12px' }}>
              Focus:
            </span>
            <FilterChip viewport="desktop" state="focus" label="Text" />
            <FilterChip
              viewport="desktop"
              state="focus"
              label="Text"
              selected
            />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '80px', color: '#666', fontSize: '12px' }}>
              Disabled:
            </span>
            <FilterChip
              {...DisabledUnselected.args}
              viewport="desktop"
              label="Text"
            />
            <FilterChip
              {...DisabledSelected.args}
              viewport="desktop"
              label="Text"
            />
          </div>
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: '12px', color: '#666' }}>Phone</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '80px', color: '#666', fontSize: '12px' }}>
              Default:
            </span>
            <FilterChip viewport="phone" label="Text" />
            <FilterChip viewport="phone" label="Text" selected />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '80px', color: '#666', fontSize: '12px' }}>
              Hover:
            </span>
            <FilterChip viewport="phone" state="hover" label="Text" />
            <FilterChip viewport="phone" state="hover" label="Text" selected />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '80px', color: '#666', fontSize: '12px' }}>
              Active:
            </span>
            <FilterChip viewport="phone" state="active" label="Text" />
            <FilterChip viewport="phone" state="active" label="Text" selected />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '80px', color: '#666', fontSize: '12px' }}>
              Focus:
            </span>
            <FilterChip viewport="phone" state="focus" label="Text" />
            <FilterChip viewport="phone" state="focus" label="Text" selected />
          </div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <span style={{ width: '80px', color: '#666', fontSize: '12px' }}>
              Disabled:
            </span>
            <FilterChip
              {...DisabledUnselected.args}
              viewport="phone"
              label="Text"
            />
            <FilterChip
              {...DisabledSelected.args}
              viewport="phone"
              label="Text"
            />
          </div>
        </div>
      </div>
    </div>
  ),
};
