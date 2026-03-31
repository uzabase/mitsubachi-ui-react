import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { AiChatArea } from '../../../src/components/ai-chat';

const meta = {
  title: 'Components/AiChat/AiChatArea',
  component: AiChatArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'AIとの対話において、ユーザーがプロンプトを入力・送信するためのコンポーネントです。デフォルトでAiChatSegmentedControlを内蔵しています。',
      },
    },
  },
  tags: [],
  argTypes: {
    state: {
      control: 'radio',
      options: ['default', 'in-progress', 'disabled'],
      description: 'コンポーネントの状態',
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダーテキスト',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ inlineSize: '480px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AiChatArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルト状態（空欄）。AiChatSegmentedControlが内蔵されています。
 */
export const Default: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <AiChatArea
        {...args}
        value={value}
        onValueChange={setValue}
        onSubmit={() => setValue('')}
      />
    );
  },
};

/**
 * テキスト入力済みの状態。送信ボタンが有効になります。
 */
export const WithText: Story = {
  render: function Render(args) {
    const [value, setValue] = useState('日本のGDP推移について教えてください');
    return (
      <AiChatArea
        {...args}
        value={value}
        onValueChange={setValue}
        onSubmit={() => setValue('')}
      />
    );
  },
};

/**
 * フォーカス状態。ボーダーが選択色に変わります。
 */
export const Focus: Story = {
  parameters: { pseudo: { focusWithin: true } },
  render: function Render(args) {
    const [value, setValue] = useState('');
    return (
      <AiChatArea
        {...args}
        value={value}
        onValueChange={setValue}
        onSubmit={() => setValue('')}
      />
    );
  },
};

/**
 * 処理中の状態。送信ボタンが停止ボタンに変わります。
 */
export const InProgress: Story = {
  args: {
    state: 'in-progress',
  },
  render: function Render(args) {
    const [value, setValue] = useState('日本のGDP推移について教えてください');
    return (
      <AiChatArea
        {...args}
        value={value}
        onValueChange={setValue}
        onSubmit={() => setValue('')}
      />
    );
  },
};

/**
 * 無効化状態。入力・送信・セグメントコントロールすべてが無効になります。
 */
export const Disabled: Story = {
  args: {
    state: 'disabled',
  },
};

/**
 * 無効化状態（テキストあり）
 */
export const DisabledWithText: Story = {
  args: {
    state: 'disabled',
    value: '日本のGDP推移について教えてください',
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
        inlineSize: '480px',
      }}
    >
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          Default（空欄）
        </p>
        <AiChatArea placeholder="質問を入力..." />
      </div>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          Default（テキストあり）
        </p>
        <AiChatArea value="日本のGDP推移について教えてください" />
      </div>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>In Progress</p>
        <AiChatArea
          state="in-progress"
          value="日本のGDP推移について教えてください"
        />
      </div>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          Disabled（空欄）
        </p>
        <AiChatArea state="disabled" placeholder="質問を入力..." />
      </div>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          Disabled（テキストあり）
        </p>
        <AiChatArea
          state="disabled"
          value="日本のGDP推移について教えてください"
        />
      </div>
    </div>
  ),
};
