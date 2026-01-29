import type { Meta, StoryObj } from '@storybook/react-vite';

import { ReadOnlyTag } from '../../src/components/read-only-tag';

/** サンプルアイコン（上矢印） */
const ArrowUpIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 19V5M5 12L12 5L19 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** サンプルアイコン（下矢印） */
const ArrowDownIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V19M5 12L12 19L19 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const meta = {
  title: 'Components/ReadOnlyTag',
  component: ReadOnlyTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'タグに表示するテキスト',
    },
    pattern: {
      control: 'select',
      options: ['neutral', 'information', 'positive', 'negative'],
      description: 'タグのパターン（色の種類）',
    },
    showIcon: {
      control: 'boolean',
      description: 'アイコンを表示するかどうか',
    },
  },
} satisfies Meta<typeof ReadOnlyTag>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * neutralパターン（グレー）
 * 中立的な情報を示す際に使用
 */
export const Neutral: Story = {
  args: {
    text: 'Text',
    pattern: 'neutral',
  },
};

/**
 * informationパターン（青）
 * 情報を示す際に使用
 */
export const Information: Story = {
  args: {
    ...Neutral.args,
    pattern: 'information',
  },
};

/**
 * positiveパターン（緑）
 * 肯定的な情報を示す際に使用
 */
export const Positive: Story = {
  args: {
    ...Neutral.args,
    pattern: 'positive',
  },
};

/**
 * negativeパターン（赤）
 * 否定的な情報を示す際に使用
 */
export const Negative: Story = {
  args: {
    ...Neutral.args,
    pattern: 'negative',
  },
};

/**
 * アイコン付き（上矢印）
 */
export const PositiveWithIcon: Story = {
  args: {
    ...Positive.args,
    text: '黒字化',
    showIcon: true,
    icon: <ArrowUpIcon />,
  },
};

/**
 * アイコン付き（下矢印）
 */
export const NegativeWithIcon: Story = {
  args: {
    ...Negative.args,
    text: '赤字化',
    showIcon: true,
    icon: <ArrowDownIcon />,
  },
};

/**
 * すべてのパターンを一覧表示
 */
export const AllPatterns: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '40px',
      }}
    >
      {/* パターン別 */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          パターン別
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <ReadOnlyTag {...Neutral.args} />
          <ReadOnlyTag {...Information.args} />
          <ReadOnlyTag {...Positive.args} />
          <ReadOnlyTag {...Negative.args} />
        </div>
      </div>

      {/* アイコン付き */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          アイコン付き
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <ReadOnlyTag {...PositiveWithIcon.args} />
          <ReadOnlyTag {...NegativeWithIcon.args} />
        </div>
      </div>

      {/* 実際の使用例 */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          実際の使用例
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <ReadOnlyTag {...Neutral.args} text="タグ" />
          <ReadOnlyTag {...Information.args} text="現任" />
          <ReadOnlyTag {...Positive.args} text="推奨" />
          <ReadOnlyTag {...Negative.args} text="ロック中" />
          <ReadOnlyTag {...PositiveWithIcon.args} text="増加" />
          <ReadOnlyTag {...NegativeWithIcon.args} text="減少" />
        </div>
      </div>
    </div>
  ),
};
