import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  FloatingAiChatProvider,
  AiChatHeader,
} from '../../../src/components/ai-chat';
import type { AiChatHistoryItem } from '../../../src/components/ai-chat';

const sampleHistories: AiChatHistoryItem[] = [
  { id: '1', title: '日本のGDP推移について', url: '/chat/1' },
  { id: '2', title: '半導体業界の最新動向', url: '/chat/2' },
  { id: '3', title: 'ESG投資のトレンド分析', url: '/chat/3' },
];

const meta = {
  title: 'Components/AiChat/AiChatHeader',
  component: AiChatHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'AIチャットウィンドウのヘッダーコンポーネントです。タイトルとアクションボタン群を表示します。',
      },
    },
  },
  tags: [],
  decorators: [
    (Story) => (
      <FloatingAiChatProvider
        value={{ size: 'collapsed', histories: sampleHistories }}
      >
        <div style={{ inlineSize: '536px' }}>
          <Story />
        </div>
      </FloatingAiChatProvider>
    ),
  ],
} satisfies Meta<typeof AiChatHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 新規セッション。太字タイトル「AI Research β版」を表示します。
 */
export const NewSession: Story = {
  args: {
    newSession: true,
  },
};

/**
 * 既存セッション。通常ウェイトの会話履歴タイトルを表示します。
 */
export const ExistingSession: Story = {
  args: {
    newSession: false,
    title: '日本のGDP推移について',
  },
};

/**
 * 長いタイトル。テキストが省略されます。
 */
export const LongTitle: Story = {
  args: {
    newSession: false,
    title: 'とても長い会話のタイトルが入ります。これは省略表示のテストです。',
  },
};

/**
 * Expandedサイズ。最大化アイコンが最小化アイコンに変わります。
 */
export const Expanded: Story = {
  args: {
    newSession: true,
  },
  decorators: [
    (Story) => (
      <FloatingAiChatProvider
        value={{ size: 'expanded', histories: sampleHistories }}
      >
        <div style={{ inlineSize: '720px' }}>
          <Story />
        </div>
      </FloatingAiChatProvider>
    ),
  ],
};

/**
 * すべてのバリエーションを一覧表示
 */
export const AllStates: Story = {
  args: {
    newSession: true,
  },
  decorators: [(Story) => <Story />],
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-x-large, 16px)',
      }}
    >
      <div>
        <p style={{ marginBlockEnd: '4px', fontWeight: 'bold' }}>
          Collapsed / New Session
        </p>
        <FloatingAiChatProvider
          value={{ size: 'collapsed', histories: sampleHistories }}
        >
          <div style={{ inlineSize: '536px' }}>
            <AiChatHeader newSession />
          </div>
        </FloatingAiChatProvider>
      </div>
      <div>
        <p style={{ marginBlockEnd: '4px', fontWeight: 'bold' }}>
          Collapsed / Existing Session
        </p>
        <FloatingAiChatProvider
          value={{ size: 'collapsed', histories: sampleHistories }}
        >
          <div style={{ inlineSize: '536px' }}>
            <AiChatHeader newSession={false} title="日本のGDP推移について" />
          </div>
        </FloatingAiChatProvider>
      </div>
      <div>
        <p style={{ marginBlockEnd: '4px', fontWeight: 'bold' }}>
          Expanded / New Session
        </p>
        <FloatingAiChatProvider
          value={{ size: 'expanded', histories: sampleHistories }}
        >
          <div style={{ inlineSize: '720px' }}>
            <AiChatHeader newSession />
          </div>
        </FloatingAiChatProvider>
      </div>
      <div>
        <p style={{ marginBlockEnd: '4px', fontWeight: 'bold' }}>
          Expanded / Existing Session
        </p>
        <FloatingAiChatProvider
          value={{ size: 'expanded', histories: sampleHistories }}
        >
          <div style={{ inlineSize: '720px' }}>
            <AiChatHeader newSession={false} title="日本のGDP推移について" />
          </div>
        </FloatingAiChatProvider>
      </div>
    </div>
  ),
};
