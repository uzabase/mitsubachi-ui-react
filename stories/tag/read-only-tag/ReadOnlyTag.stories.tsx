import type { Meta, StoryObj } from '@storybook/react-vite';

import { ReadOnlyTag } from '../../../src/components/tag/read-only-tag';
import { ArrowDownIcon, ArrowUpIcon } from '../../../src/icons';

const icons = {
  'arrow-up': <ArrowUpIcon />,
  'arrow-down': <ArrowDownIcon />,
};

const meta = {
  title: 'Components/Tag/ReadOnlyTag',
  component: ReadOnlyTag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ステータスや属性を示す読み取り専用のタグコンポーネントです。',
      },
    },
  },
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
    icon: {
      control: 'select',
      options: ['arrow-up', 'arrow-down'],
      mapping: icons,
      description: 'アイコンの種類',
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
    icon: 'arrow-up',
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
    icon: 'arrow-down',
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
          <ReadOnlyTag
            pattern="positive"
            text="黒字化"
            showIcon
            icon={<ArrowUpIcon />}
          />
          <ReadOnlyTag
            pattern="negative"
            text="赤字化"
            showIcon
            icon={<ArrowDownIcon />}
          />
        </div>
      </div>

      {/* 実際の使用例 */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          実際の使用例
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <ReadOnlyTag pattern="neutral" text="タグ" />
          <ReadOnlyTag pattern="information" text="現任" />
          <ReadOnlyTag pattern="positive" text="推奨" />
          <ReadOnlyTag pattern="negative" text="ロック中" />
          <ReadOnlyTag
            pattern="positive"
            text="増加"
            showIcon
            icon={<ArrowUpIcon />}
          />
          <ReadOnlyTag
            pattern="negative"
            text="減少"
            showIcon
            icon={<ArrowDownIcon />}
          />
        </div>
      </div>
    </div>
  ),
};
