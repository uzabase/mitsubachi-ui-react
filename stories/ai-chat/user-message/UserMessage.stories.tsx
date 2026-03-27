import type { Meta, StoryObj } from '@storybook/react-vite';

import { UserMessage } from '../../../src/components/ai-chat';

const meta = {
  title: 'Components/AiChat/FloatingAiChat/UserMessage',
  component: UserMessage,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'ユーザーが送信したプロンプトを右寄せバブルで表示するコンポーネントです。',
      },
    },
  },
  tags: [],
  decorators: [
    (Story) => (
      <div style={{ inlineSize: '700px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UserMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 短いテキストの場合。バブルはテキスト幅にフィットする。
 */
export const Normal: Story = {
  args: {
    children: 'ユーザーが入力した文章が入ります',
  },
};

/**
 * テキストが長い場合。バブルは最大幅（560px）まで広がり、テキストは折り返される。
 */
export const LongText: Story = {
  args: {
    children:
      'ユーザーが入力した文章が入りますユーザーが入力した文章が入りますユーザーが入力した文章が入りますユーザーが入力した文章が入ります',
  },
};

/**
 * 1行に収まる非常に短いテキスト。バブル幅が最小になるケース。
 */
export const ShortText: Story = {
  args: {
    children: 'こんにちは',
  },
};

/**
 * すべてのテキスト長パターンを一覧表示
 */
export const AllStates: Story = {
  args: {
    ...Normal.args,
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-x-large, 16px)',
        inlineSize: '700px',
      }}
    >
      <UserMessage>こんにちは</UserMessage>
      <UserMessage>ユーザーが入力した文章が入ります</UserMessage>
      <UserMessage>
        ユーザーが入力した文章が入りますユーザーが入力した文章が入りますユーザーが入力した文章が入りますユーザーが入力した文章が入ります
      </UserMessage>
    </div>
  ),
};
