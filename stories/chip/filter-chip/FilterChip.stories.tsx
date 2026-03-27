import type { Meta, StoryObj } from '@storybook/react-vite';

import { FilterChip } from '../../../src/components/chip/filter-chip';

const meta = {
  title: 'Components/Chip/FilterChip',
  component: FilterChip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'フィルター条件を選択して切り替えるコンポーネントです。',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: '表示するラベルテキスト',
    },
    selected: {
      control: 'boolean',
      description: '選択状態',
    },
    disabled: {
      control: 'boolean',
      description: '無効化状態',
    },
  },
} satisfies Meta<typeof FilterChip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 未選択 - デフォルト状態
 */
export const UnselectedDefault: Story = {
  args: {
    label: 'Text',
    selected: false,
  },
};

/**
 * 選択 - デフォルト状態
 */
export const SelectedDefault: Story = {
  args: {
    ...UnselectedDefault.args,
    selected: true,
  },
};

/**
 * 未選択 - Hover状態
 */
export const UnselectedHover: Story = {
  args: {
    ...UnselectedDefault.args,
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * 選択 - Hover状態
 */
export const SelectedHover: Story = {
  args: {
    ...SelectedDefault.args,
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * 未選択 - Active状態
 */
export const UnselectedActive: Story = {
  args: {
    ...UnselectedDefault.args,
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

/**
 * 選択 - Active状態
 */
export const SelectedActive: Story = {
  args: {
    ...SelectedDefault.args,
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

/**
 * 未選択 - Focus状態
 */
export const UnselectedFocus: Story = {
  args: {
    ...UnselectedDefault.args,
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};

/**
 * 選択 - Focus状態
 */
export const SelectedFocus: Story = {
  args: {
    ...SelectedDefault.args,
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};

/**
 * 未選択 - Disabled状態
 */
export const UnselectedDisabled: Story = {
  args: {
    ...UnselectedDefault.args,
    disabled: true,
  },
};

/**
 * 選択 - Disabled状態
 */
export const SelectedDisabled: Story = {
  args: {
    ...SelectedDefault.args,
    disabled: true,
  },
};

/**
 * すべての状態を一覧表示
 */
export const AllStates: Story = {
  args: {
    ...UnselectedDefault.args,
  },
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      <FilterChip label="未選択" selected={false} />
      <FilterChip label="選択" selected={true} />
      <FilterChip label="無効(未選択)" selected={false} disabled={true} />
      <FilterChip label="無効(選択)" selected={true} disabled={true} />
    </div>
  ),
};
