import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextArea } from '../../../src/components/text-area/text-area';

const meta = {
  title: 'Components/TextArea/TextArea',
  component: TextArea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '複数行のテキスト入力を受け付けるコンポーネントです。',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '256px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['medium', 'large'],
      description: 'テキストエリアのサイズ',
    },
    viewport: {
      control: 'select',
      options: ['desktop', 'phone'],
      description: 'ビューポート',
    },
    error: {
      control: 'boolean',
      description: 'エラー状態',
    },
    errorMessages: {
      control: 'object',
      description: 'エラーメッセージ一覧',
    },
    showCount: {
      control: 'boolean',
      description: '文字数カウント表示（maxCount設定時は自動表示）',
    },
    maxCount: {
      control: 'number',
      description: '最大文字数',
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダーテキスト',
    },
    disabled: {
      control: 'boolean',
      description: '無効化状態',
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==============================
   Default
   ============================== */

/**
 * デフォルト状態（medium, desktop）
 */
export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
    size: 'medium',
    viewport: 'desktop',
  },
};

/**
 * テキスト入力済みの状態
 */
export const WithText: Story = {
  args: {
    defaultValue: 'Text',
    size: 'medium',
    viewport: 'desktop',
  },
};

/* ==============================
   サイズバリアント
   ============================== */

/**
 * Mediumサイズ（デフォルト）
 */
export const Medium: Story = {
  args: {
    placeholder: 'Placeholder',
    size: 'medium',
  },
};

/**
 * Largeサイズ
 */
export const Large: Story = {
  args: {
    placeholder: 'Placeholder',
    size: 'large',
  },
};

/* ==============================
   インタラクション状態（Pseudo States）
   ============================== */

/**
 * Hover状態
 */
export const Hover: Story = {
  args: {
    placeholder: 'Placeholder',
  },
  parameters: {
    pseudo: { hover: true },
  },
};

/**
 * Focus状態
 */
export const Focus: Story = {
  args: {
    placeholder: 'Placeholder',
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
};

/**
 * Disabled状態
 */
export const Disabled: Story = {
  args: {
    placeholder: 'Placeholder',
    disabled: true,
  },
};

/**
 * Disabled状態（テキスト入力済み）
 */
export const DisabledWithText: Story = {
  args: {
    defaultValue: 'Text',
    disabled: true,
  },
};

/* ==============================
   エラー状態
   ============================== */

/**
 * エラー状態
 */
export const Error: Story = {
  args: {
    placeholder: 'Placeholder',
    error: true,
    errorMessages: ['エラーテキストが入ります。'],
  },
};

/**
 * エラー + Hover状態
 */
export const ErrorHover: Story = {
  args: {
    ...Error.args,
  },
  parameters: {
    pseudo: { hover: true },
  },
};

/**
 * エラー + Focus状態
 */
export const ErrorFocus: Story = {
  args: {
    ...Error.args,
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
};

/* ==============================
   文字数カウント
   ============================== */

/**
 * 文字数カウント表示
 */
export const WithCount: Story = {
  args: {
    placeholder: 'Placeholder',
    maxCount: 100,
  },
};

/**
 * 文字数カウント超過（エラー状態）
 */
export const WithCountOver: Story = {
  args: {
    defaultValue:
      'TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTex',
    maxCount: 100,
    error: true,
    errorMessages: ['エラーテキストが入ります。'],
  },
};

/**
 * 文字数カウント + Disabled状態
 */
export const WithCountDisabled: Story = {
  args: {
    placeholder: 'Placeholder',
    maxCount: 100,
    disabled: true,
  },
};

/**
 * 文字数カウント + Disabled状態（テキスト入力済み）
 */
export const WithCountDisabledWithText: Story = {
  args: {
    defaultValue: 'Text',
    maxCount: 100,
    disabled: true,
  },
};

/* ==============================
   ビューポート
   ============================== */

/**
 * Phone ビューポート
 */
export const Phone: Story = {
  args: {
    placeholder: 'Placeholder',
    viewport: 'phone',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/* ==============================
   全パターン一覧
   ============================== */

const labelStyle = {
  color: '#666',
  fontSize: '12px',
  margin: 0,
  whiteSpace: 'nowrap' as const,
};

const headerStyle = {
  ...labelStyle,
  fontWeight: 'bold' as const,
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'auto 256px 256px',
  gap: '24px 16px',
  alignItems: 'start',
  padding: '40px',
};

const LONG_TEXT =
  'TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTex';

/**
 * 全状態一覧（Standard / Count 比較）
 */
export const AllStates: Story = {
  decorators: [
    () => (
      <div style={gridStyle}>
        <div />
        <p style={headerStyle}>Standard</p>
        <p style={headerStyle}>Count</p>

        <p style={labelStyle}>Default</p>
        <TextArea placeholder="Placeholder" />
        <TextArea placeholder="Placeholder" maxCount={100} />

        <p style={labelStyle}>With Text</p>
        <TextArea defaultValue="Text" />
        <TextArea defaultValue="Text" maxCount={100} />

        <p style={labelStyle}>Disabled</p>
        <TextArea placeholder="Placeholder" disabled />
        <TextArea placeholder="Placeholder" maxCount={100} disabled />

        <p style={labelStyle}>Disabled + Text</p>
        <TextArea defaultValue="Text" disabled />
        <TextArea defaultValue="Text" maxCount={100} disabled />

        <p style={labelStyle}>Error</p>
        <TextArea
          placeholder="Placeholder"
          error
          errorMessages={['エラーテキストが入ります。']}
        />
        <TextArea
          placeholder="Placeholder"
          maxCount={100}
          error
          errorMessages={['エラーテキストが入ります。']}
        />

        <p style={labelStyle}>Error + Text</p>
        <TextArea
          defaultValue="Text"
          error
          errorMessages={['エラーテキストが入ります。']}
        />
        <TextArea
          defaultValue={LONG_TEXT}
          maxCount={100}
          error
          errorMessages={['エラーテキストが入ります。']}
        />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};
