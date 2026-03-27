import type { Meta, StoryObj } from '@storybook/react-vite';

import type { FilterChipOption } from '../../../src/components/chip/filter-chip';
import { FilterChipSingleSelectGroup } from '../../../src/components/chip/filter-chip-single-select-group';

const meta = {
  title: 'Components/Chip/FilterChipSingleSelectGroup',
  component: FilterChipSingleSelectGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'FilterChipを横並び・折り返しでレイアウトし、1つだけを選択できるグループコンポーネントです。',
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'グループ全体の無効化',
    },
  },
} satisfies Meta<typeof FilterChipSingleSelectGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleOptions: FilterChipOption[] = [
  { value: 'all', label: 'すべて' },
  { value: 'news', label: 'ニュース' },
  { value: 'analysis', label: '分析' },
  { value: 'report', label: 'レポート' },
];

/**
 * デフォルト状態（非制御モード）
 */
export const Default: Story = {
  args: {
    options: sampleOptions,
    defaultValue: 'all',
    'aria-label': 'コンテンツタイプ',
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
 * 一部の選択肢を無効化
 */
export const PartialDisabled: Story = {
  args: {
    options: [
      { value: 'all', label: 'すべて' },
      { value: 'news', label: 'ニュース' },
      { value: 'analysis', label: '分析', disabled: true },
      { value: 'report', label: 'レポート' },
    ],
    defaultValue: 'all',
    'aria-label': 'コンテンツタイプ',
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
    <div style={{ maxInlineSize: '200px' }}>
      <FilterChipSingleSelectGroup
        options={sampleOptions}
        defaultValue="all"
        aria-label="コンテンツタイプ"
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
        <FilterChipSingleSelectGroup
          options={sampleOptions}
          defaultValue="all"
          aria-label="コンテンツタイプ"
        />
      </div>
      <div>
        <h3>Disabled</h3>
        <FilterChipSingleSelectGroup
          options={sampleOptions}
          defaultValue="all"
          disabled
          aria-label="コンテンツタイプ（無効）"
        />
      </div>
      <div>
        <h3>Partial Disabled</h3>
        <FilterChipSingleSelectGroup
          options={[
            { value: 'all', label: 'すべて' },
            { value: 'news', label: 'ニュース' },
            { value: 'analysis', label: '分析', disabled: true },
            { value: 'report', label: 'レポート' },
          ]}
          defaultValue="all"
          aria-label="コンテンツタイプ（一部無効）"
        />
      </div>
      <div>
        <h3>Wrap</h3>
        <div style={{ maxInlineSize: '200px' }}>
          <FilterChipSingleSelectGroup
            options={sampleOptions}
            defaultValue="all"
            aria-label="コンテンツタイプ（折り返し）"
          />
        </div>
      </div>
    </div>
  ),
};
