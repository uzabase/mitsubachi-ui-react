import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AiChatFooter, AiChatArea } from '../../../src/components/ai-chat';

const meta = {
  title: 'Components/AiChat/AiChatFooter',
  component: AiChatFooter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'AIチャットウィンドウのフッターコンポーネントです。children（AiChatArea等）と免責文で構成されます。',
      },
    },
  },
  tags: [],
  decorators: [
    (Story) => (
      <div style={{ inlineSize: '536px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AiChatFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルト状態。AiChatAreaと免責文を表示します。
 */
export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <AiChatFooter {...args}>
        <AiChatArea
          value={value}
          onValueChange={setValue}
          onSubmit={() => setValue('')}
        />
      </AiChatFooter>
    );
  },
};

/**
 * テキスト入力済みの状態
 */
export const WithText: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('日本のGDP推移について教えてください');
    return (
      <AiChatFooter {...args}>
        <AiChatArea
          value={value}
          onValueChange={setValue}
          onSubmit={() => setValue('')}
        />
      </AiChatFooter>
    );
  },
};

/**
 * AI回答生成中。送信ボタンが停止ボタンに変わります。
 */
export const InProgress: Story = {
  render: function Render(args) {
    return (
      <AiChatFooter {...args}>
        <AiChatArea
          state="in-progress"
          value="日本のGDP推移について教えてください"
        />
      </AiChatFooter>
    );
  },
};

/**
 * 無効化状態
 */
export const Disabled: Story = {
  render: function Render(args) {
    return (
      <AiChatFooter {...args}>
        <AiChatArea state="disabled" />
      </AiChatFooter>
    );
  },
};

/**
 * すべての状態を一覧表示
 */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        inlineSize: '536px',
      }}
    >
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>Default</p>
        <AiChatFooter>
          <AiChatArea />
        </AiChatFooter>
      </div>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>With Text</p>
        <AiChatFooter>
          <AiChatArea value="日本のGDP推移について教えてください" />
        </AiChatFooter>
      </div>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>In Progress</p>
        <AiChatFooter>
          <AiChatArea
            state="in-progress"
            value="日本のGDP推移について教えてください"
          />
        </AiChatFooter>
      </div>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>Disabled</p>
        <AiChatFooter>
          <AiChatArea state="disabled" />
        </AiChatFooter>
      </div>
    </div>
  ),
};
