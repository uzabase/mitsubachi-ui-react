import type { Meta, StoryObj } from '@storybook/react-vite';

import { ReportHeading } from '../../src/components/report-heading';

const meta = {
  title: 'Components/ReportHeading',
  component: ReportHeading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'レポートや記事などの読み物コンテンツにおいて、内容の区切りや構造を示すための見出しコンポーネント。h1〜h6の階層に応じて情報の優先度と関係性を表現する。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '見出しテキスト',
    },
    level: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: '見出しレベル（h1〜h6）',
    },
    action: {
      control: false,
      description: 'アクションスロット（ボタンなどのコンポーネントを配置）',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ inlineSize: '800px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ReportHeading>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Level 1（h1）: ページタイトル相当の最上位見出し。
 * 通常ウェイト・最大フォントサイズで表示される。
 */
export const Level1: Story = {
  args: {
    children: 'Heading',
    level: 1,
  },
};

/**
 * Level 2（h2）: セクション見出し。
 * 太字・下線付きでセクションの区切りを明示する。
 */
export const Level2: Story = {
  args: {
    children: 'Heading',
    level: 2,
  },
};

/**
 * Level 3（h3）: サブセクション見出し。
 * 左側に赤い縦線ディバイダーが表示される。
 */
export const Level3: Story = {
  args: {
    children: 'Heading',
    level: 3,
  },
};

/**
 * Level 4（h4）
 */
export const Level4: Story = {
  args: {
    children: 'Heading',
    level: 4,
  },
};

/**
 * Level 5（h5）
 */
export const Level5: Story = {
  args: {
    children: 'Heading',
    level: 5,
  },
};

/**
 * Level 6（h6）: 最下位の見出し。
 * テキスト色が薄く（weak）なり、補助的な見出しであることを示す。
 */
export const Level6: Story = {
  args: {
    children: 'Heading',
    level: 6,
  },
};

const ActionSlotPlaceholder = () => (
  <div
    style={{
      inlineSize: '40px',
      blockSize: '40px',
      backgroundColor: 'rgba(0, 0, 0, 0.07)',
      borderRadius: '4px',
    }}
  />
);

/**
 * アクションスロット付き。
 * 見出しの右側にボタンなどのアクション要素を配置できる。
 */
export const WithAction: Story = {
  args: {
    children: 'Heading',
    level: 2,
    action: <ActionSlotPlaceholder />,
  },
};

/**
 * Phone表示: Level 1はスマホでは太字・25pxに変化する
 */
export const PhoneLevel1: Story = {
  args: {
    ...Level1.args,
  },
  globals: {
    viewport: { value: 'mobile2' },
  },
};

/**
 * Phone表示: Level 6はスマホでは14pxに縮小される
 */
export const PhoneLevel6: Story = {
  args: {
    ...Level6.args,
  },
  globals: {
    viewport: { value: 'mobile2' },
  },
};

/**
 * すべてのレベルを一覧表示
 */
export const AllLevels: Story = {
  args: {
    children: 'Heading',
  },
  decorators: [
    () => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          inlineSize: '800px',
        }}
      >
        <div>
          <p
            style={{
              marginBlockEnd: '8px',
              color: '#666',
              fontSize: '12px',
            }}
          >
            Level 1 (h1)
          </p>
          <ReportHeading level={1}>Heading</ReportHeading>
        </div>
        <div>
          <p
            style={{
              marginBlockEnd: '8px',
              color: '#666',
              fontSize: '12px',
            }}
          >
            Level 2 (h2)
          </p>
          <ReportHeading level={2}>Heading</ReportHeading>
        </div>
        <div>
          <p
            style={{
              marginBlockEnd: '8px',
              color: '#666',
              fontSize: '12px',
            }}
          >
            Level 3 (h3)
          </p>
          <ReportHeading level={3}>Heading</ReportHeading>
        </div>
        <div>
          <p
            style={{
              marginBlockEnd: '8px',
              color: '#666',
              fontSize: '12px',
            }}
          >
            Level 4 (h4)
          </p>
          <ReportHeading level={4}>Heading</ReportHeading>
        </div>
        <div>
          <p
            style={{
              marginBlockEnd: '8px',
              color: '#666',
              fontSize: '12px',
            }}
          >
            Level 5 (h5)
          </p>
          <ReportHeading level={5}>Heading</ReportHeading>
        </div>
        <div>
          <p
            style={{
              marginBlockEnd: '8px',
              color: '#666',
              fontSize: '12px',
            }}
          >
            Level 6 (h6)
          </p>
          <ReportHeading level={6}>Heading</ReportHeading>
        </div>
        <div>
          <p
            style={{
              marginBlockEnd: '8px',
              color: '#666',
              fontSize: '12px',
            }}
          >
            Level 2 + Action
          </p>
          <ReportHeading level={2} action={<ActionSlotPlaceholder />}>
            Heading
          </ReportHeading>
        </div>
      </div>
    ),
  ],
};
