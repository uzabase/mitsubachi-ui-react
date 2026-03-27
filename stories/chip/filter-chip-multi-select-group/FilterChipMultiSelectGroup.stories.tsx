import type { Meta, StoryObj } from '@storybook/react-vite';

import type { FilterChipOption } from '../../../src/components/chip/filter-chip';
import { FilterChipMultiSelectGroup } from '../../../src/components/chip/filter-chip-multi-select-group';

const meta = {
  title: 'Components/Chip/FilterChipMultiSelectGroup',
  component: FilterChipMultiSelectGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'FilterChipを横並び・折り返しでレイアウトし、複数同時に選択できるグループコンポーネントです。',
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'グループ全体の無効化',
    },
  },
} satisfies Meta<typeof FilterChipMultiSelectGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions: FilterChipOption[] = [
  { value: 'tech', label: 'テクノロジー' },
  { value: 'finance', label: '金融' },
  { value: 'healthcare', label: 'ヘルスケア' },
  { value: 'energy', label: 'エネルギー' },
  { value: 'retail', label: '小売' },
];

/**
 * デフォルト状態（非制御モード）
 */
export const Default: Story = {
  args: {
    options: sampleOptions,
    defaultValue: ['tech', 'finance'],
    'aria-label': '業種フィルター',
  },
};

/**
 * 無効化状態
 */
export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

/**
 * 幅制限で折り返し表示
 */
export const Wrap: Story = {
  args: {
    ...Default.args,
  },
  render: () => (
    <div style={{ maxInlineSize: '250px' }}>
      <FilterChipMultiSelectGroup
        options={sampleOptions}
        defaultValue={['tech', 'finance']}
        aria-label="業種フィルター"
      />
    </div>
  ),
};

/**
 * すべての状態を一覧表示
 */
export const AllStates: Story = {
  args: {
    ...Default.args,
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '40px',
      }}
    >
      <div>
        <h3>Default</h3>
        <FilterChipMultiSelectGroup
          options={sampleOptions}
          defaultValue={['tech', 'finance']}
          aria-label="業種フィルター"
        />
      </div>
      <div>
        <h3>Disabled</h3>
        <FilterChipMultiSelectGroup
          options={sampleOptions}
          defaultValue={['tech', 'finance']}
          disabled
          aria-label="業種フィルター（無効）"
        />
      </div>
      <div>
        <h3>Wrap</h3>
        <div style={{ maxInlineSize: '250px' }}>
          <FilterChipMultiSelectGroup
            options={sampleOptions}
            defaultValue={['tech', 'finance']}
            aria-label="業種フィルター（折り返し）"
          />
        </div>
      </div>
    </div>
  ),
};
