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
        component: [
          'FilterChipを横並び・折り返しでレイアウトするコンポーネントです。',
          '選択肢の中から複数同時に選択できます。',
          '',
          '### 使用例',
          '',
          '```tsx',
          'import { FilterChipMultiSelectGroup } from "mitsubachi-ui-react";',
          'import type { FilterChipOption } from "mitsubachi-ui-react";',
          '',
          'const options: FilterChipOption[] = [',
          '  { value: "tech", label: "テクノロジー" },',
          '  { value: "finance", label: "金融" },',
          '  { value: "healthcare", label: "ヘルスケア" },',
          '];',
          '',
          '<FilterChipMultiSelectGroup',
          '  options={options}',
          '  defaultValue={["tech"]}',
          '  onChange={(values) => console.log(values)}',
          '  aria-label="業種フィルター"',
          '/>',
          '```',
        ].join('\n'),
      },
    },
  },
  tags: ['autodocs'],
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
