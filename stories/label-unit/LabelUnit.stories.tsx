import type { Meta, StoryObj } from '@storybook/react-vite';

import { LabelUnit } from '../../src/components/label-unit';

const meta = {
  title: 'Components/LabelUnit',
  component: LabelUnit,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'フォーム用コンポーネントが「何を入力・選択するためのものか」を明確に伝えるためのラベルコンポーネントです。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'ラベルテキスト',
    },
    required: {
      control: 'boolean',
      description: '必須表示',
    },
    supportText: {
      control: 'text',
      description: '補足テキスト',
    },
    htmlFor: {
      control: 'text',
      description: 'htmlFor（対応する入力要素のid）',
    },
    disabled: {
      control: 'boolean',
      description: '無効化状態',
    },
  },
} satisfies Meta<typeof LabelUnit>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * デフォルト状態
 */
export const Default: Story = {
  args: {
    text: 'ラベル',
  },
};

/**
 * 必須表示あり
 */
export const Required: Story = {
  args: {
    ...Default.args,
    required: true,
  },
};

/**
 * 補足テキストあり
 */
export const WithSupportText: Story = {
  args: {
    ...Default.args,
    supportText: '補足テキストが入ります',
  },
};

/**
 * 必須 + 補足テキスト
 */
export const RequiredWithSupportText: Story = {
  args: {
    ...Default.args,
    required: true,
    supportText: '補足テキストが入ります',
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
 * 無効化 + 必須 + 補足テキスト
 */
export const DisabledFull: Story = {
  args: {
    ...Default.args,
    required: true,
    supportText: '補足テキストが入ります',
    disabled: true,
  },
};

/**
 * すべての状態を一覧表示
 */
export const AllStates: Story = {
  args: {
    ...Default.args,
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '32px',
        padding: '40px',
      }}
    >
      <div>
        <h3 style={{ marginBlockEnd: '12px', color: '#666', fontSize: '12px' }}>
          Default
        </h3>
        <LabelUnit text="ラベル" />
      </div>
      <div>
        <h3 style={{ marginBlockEnd: '12px', color: '#666', fontSize: '12px' }}>
          Required
        </h3>
        <LabelUnit text="ラベル" required />
      </div>
      <div>
        <h3 style={{ marginBlockEnd: '12px', color: '#666', fontSize: '12px' }}>
          With Support Text
        </h3>
        <LabelUnit text="ラベル" supportText="補足テキストが入ります" />
      </div>
      <div>
        <h3 style={{ marginBlockEnd: '12px', color: '#666', fontSize: '12px' }}>
          Required + Support Text
        </h3>
        <LabelUnit
          text="ラベル"
          required
          supportText="補足テキストが入ります"
        />
      </div>
      <div>
        <h3 style={{ marginBlockEnd: '12px', color: '#666', fontSize: '12px' }}>
          Disabled
        </h3>
        <LabelUnit text="ラベル" disabled />
      </div>
      <div>
        <h3 style={{ marginBlockEnd: '12px', color: '#666', fontSize: '12px' }}>
          Disabled + Required + Support Text
        </h3>
        <LabelUnit
          text="ラベル"
          required
          supportText="補足テキストが入ります"
          disabled
        />
      </div>
    </div>
  ),
};
