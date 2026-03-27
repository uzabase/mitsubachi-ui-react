import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  FloatingAiChat,
  AiChatArea,
  UserMessage,
  type FloatingAiChatSize,
} from '../../../src/components/ai-chat';

interface FloatingAiChatStoryArgs {
  size: FloatingAiChatSize;
}

const meta = {
  title: 'Components/AiChat/FloatingAiChat',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'AIチャットのフローティングウィンドウコンポーネントです。Header / Body / Footer の3パーツで構成されます。',
      },
    },
  },
  tags: [],
  argTypes: {
    size: {
      control: 'radio',
      options: ['collapsed', 'expanded'],
      description: 'チャットウィンドウのサイズ',
    },
  },
  args: {
    size: 'collapsed',
  },
} satisfies Meta<FloatingAiChatStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 新規セッション・collapsedサイズ（デフォルト）
 */
export const CollapsedNewSession: Story = {
  args: {
    size: 'collapsed',
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <FloatingAiChat {...args}>
        <FloatingAiChat.Header newSession />
        <FloatingAiChat.Body>
          <div style={{ blockSize: '200px' }} />
        </FloatingAiChat.Body>
        <FloatingAiChat.Footer>
          <AiChatArea
            value={value}
            onValueChange={setValue}
            onSubmit={() => setValue('')}
          />
        </FloatingAiChat.Footer>
      </FloatingAiChat>
    );
  },
};

/**
 * 新規セッション・expandedサイズ
 */
export const ExpandedNewSession: Story = {
  args: {
    size: 'expanded',
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <FloatingAiChat {...args}>
        <FloatingAiChat.Header newSession />
        <FloatingAiChat.Body>
          <div style={{ blockSize: '200px' }} />
        </FloatingAiChat.Body>
        <FloatingAiChat.Footer>
          <AiChatArea
            value={value}
            onValueChange={setValue}
            onSubmit={() => setValue('')}
          />
        </FloatingAiChat.Footer>
      </FloatingAiChat>
    );
  },
};

/**
 * 既存セッション・collapsedサイズ
 */
export const CollapsedExistingSession: Story = {
  args: {
    size: 'collapsed',
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <FloatingAiChat {...args}>
        <FloatingAiChat.Header
          newSession={false}
          title="日本のGDP推移について"
        />
        <FloatingAiChat.Body>
          <UserMessage>日本のGDP推移について教えてください</UserMessage>
        </FloatingAiChat.Body>
        <FloatingAiChat.Footer>
          <AiChatArea
            value={value}
            onValueChange={setValue}
            onSubmit={() => setValue('')}
          />
        </FloatingAiChat.Footer>
      </FloatingAiChat>
    );
  },
};

/**
 * 既存セッション・expandedサイズ
 */
export const ExpandedExistingSession: Story = {
  args: {
    size: 'expanded',
  },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <FloatingAiChat {...args}>
        <FloatingAiChat.Header
          newSession={false}
          title="日本のGDP推移について"
        />
        <FloatingAiChat.Body>
          <UserMessage>日本のGDP推移について教えてください</UserMessage>
        </FloatingAiChat.Body>
        <FloatingAiChat.Footer>
          <AiChatArea
            value={value}
            onValueChange={setValue}
            onSubmit={() => setValue('')}
          />
        </FloatingAiChat.Footer>
      </FloatingAiChat>
    );
  },
};

/**
 * AI回答生成中の状態。送信ボタンが停止ボタンに変わります。
 */
export const InProgress: Story = {
  args: {
    size: 'collapsed',
  },
  render: function Render(args) {
    return (
      <FloatingAiChat {...args}>
        <FloatingAiChat.Header
          newSession={false}
          title="日本のGDP推移について"
        />
        <FloatingAiChat.Body>
          <UserMessage>日本のGDP推移について教えてください</UserMessage>
        </FloatingAiChat.Body>
        <FloatingAiChat.Footer>
          <AiChatArea
            state="in-progress"
            value="日本のGDP推移について教えてください"
          />
        </FloatingAiChat.Footer>
      </FloatingAiChat>
    );
  },
};

/**
 * 全バリアントの一覧表示
 */
export const AllStates: Story = {
  args: {
    size: 'collapsed',
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        alignItems: 'center',
      }}
    >
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          Collapsed / New Session
        </p>
        <FloatingAiChat size="collapsed">
          <FloatingAiChat.Header newSession />
          <FloatingAiChat.Body>
            <div style={{ blockSize: '100px' }} />
          </FloatingAiChat.Body>
          <FloatingAiChat.Footer>
            <AiChatArea />
          </FloatingAiChat.Footer>
        </FloatingAiChat>
      </div>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          Expanded / New Session
        </p>
        <FloatingAiChat size="expanded">
          <FloatingAiChat.Header newSession />
          <FloatingAiChat.Body>
            <div style={{ blockSize: '100px' }} />
          </FloatingAiChat.Body>
          <FloatingAiChat.Footer>
            <AiChatArea />
          </FloatingAiChat.Footer>
        </FloatingAiChat>
      </div>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          Collapsed / Existing Session
        </p>
        <FloatingAiChat size="collapsed">
          <FloatingAiChat.Header
            newSession={false}
            title="日本のGDP推移について"
          />
          <FloatingAiChat.Body>
            <UserMessage>日本のGDP推移について教えてください</UserMessage>
          </FloatingAiChat.Body>
          <FloatingAiChat.Footer>
            <AiChatArea />
          </FloatingAiChat.Footer>
        </FloatingAiChat>
      </div>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          Expanded / Existing Session
        </p>
        <FloatingAiChat size="expanded">
          <FloatingAiChat.Header
            newSession={false}
            title="日本のGDP推移について"
          />
          <FloatingAiChat.Body>
            <UserMessage>日本のGDP推移について教えてください</UserMessage>
          </FloatingAiChat.Body>
          <FloatingAiChat.Footer>
            <AiChatArea />
          </FloatingAiChat.Footer>
        </FloatingAiChat>
      </div>
    </div>
  ),
};
