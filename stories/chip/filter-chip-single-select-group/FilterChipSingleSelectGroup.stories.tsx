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
        component: [
          'FilterChipを横並び・折り返しでレイアウトするコンポーネントです。',
          '選択肢の中から1つだけを選択できます。',
          '',
          '### 使用例',
          '',
          '```tsx',
          'import { FilterChipSingleSelectGroup } from "mitsubachi-ui-react";',
          'import type { FilterChipOption } from "mitsubachi-ui-react";',
          '',
          'const options: FilterChipOption[] = [',
          '  { value: "all", label: "すべて" },',
          '  { value: "news", label: "ニュース" },',
          '  { value: "analysis", label: "分析" },',
          '];',
          '',
          '<FilterChipSingleSelectGroup',
          '  options={options}',
          '  defaultValue="all"',
          '  onChange={(value) => console.log(value)}',
          '  aria-label="コンテンツタイプ"',
          '/>',
          '```',
        ].join('\n'),
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    viewport: {
      control: 'radio',
      options: ['desktop', 'phone'],
      description: 'ビューポート',
    },
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
    viewport: 'desktop',
    'aria-label': 'コンテンツタイプ',
  },
};

/**
 * Phone表示
 */
export const Phone: Story = {
  args: {
    ...Default.args,
    viewport: 'phone',
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
    viewport: 'desktop',
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
        viewport="desktop"
        aria-label="コンテンツタイプ"
      />
    </div>
  ),
};
