import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextAreaUnit } from '../../../src/components/text-area/text-area-unit';

const meta = {
  title: 'Components/TextArea/TextAreaUnit',
  component: TextAreaUnit,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '256px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    label: {
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
} satisfies Meta<typeof TextAreaUnit>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==============================
   Default
   ============================== */

/**
 * デフォルト状態
 */
export const Default: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
  },
};

/**
 * テキスト入力済み
 */
export const WithText: Story = {
  args: {
    label: 'Label',
    defaultValue: 'Text',
  },
};

/* ==============================
   ラベルバリアント
   ============================== */

/**
 * 必須ラベル付き
 */
export const Required: Story = {
  args: {
    label: 'Label',
    required: true,
    placeholder: 'Placeholder',
  },
};

/**
 * 補足テキスト付き
 */
export const WithSupportText: Story = {
  args: {
    label: 'Label',
    supportText: 'Support text',
    placeholder: 'Placeholder',
  },
};

/**
 * 必須 + 補足テキスト
 */
export const RequiredWithSupportText: Story = {
  args: {
    label: 'Label',
    required: true,
    supportText: 'Support text',
    placeholder: 'Placeholder',
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
    label: 'Label',
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
    label: 'Label',
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
    label: 'Label',
    placeholder: 'Placeholder',
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
    label: 'Label',
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
    label: 'Label',
    placeholder: 'Placeholder',
    maxCount: 100,
  },
};

/**
 * 文字数カウント超過（エラー状態）
 */
export const WithCountOver: Story = {
  args: {
    label: 'Label',
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
    label: 'Label',
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
    label: 'Label',
    defaultValue: 'Text',
    maxCount: 100,
    disabled: true,
  },
};

/* ==============================
   サイズ・ビューポート
   ============================== */

/**
 * Largeサイズ
 */
export const Large: Story = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    size: 'large',
  },
};

/**
 * Phone ビューポート
 */
export const Phone: Story = {
  args: {
    label: 'Label',
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
  args: {
    label: 'Label',
  },
  decorators: [
    () => (
      <div style={gridStyle}>
        <div />
        <p style={headerStyle}>Standard</p>
        <p style={headerStyle}>Count</p>

        <p style={labelStyle}>Default</p>
        <TextAreaUnit label="Label" placeholder="Placeholder" />
        <TextAreaUnit label="Label" placeholder="Placeholder" maxCount={100} />

        <p style={labelStyle}>With Text</p>
        <TextAreaUnit label="Label" defaultValue="Text" />
        <TextAreaUnit label="Label" defaultValue="Text" maxCount={100} />

        <p style={labelStyle}>Disabled</p>
        <TextAreaUnit label="Label" placeholder="Placeholder" disabled />
        <TextAreaUnit
          label="Label"
          placeholder="Placeholder"
          maxCount={100}
          disabled
        />

        <p style={labelStyle}>Disabled + Text</p>
        <TextAreaUnit label="Label" defaultValue="Text" disabled />
        <TextAreaUnit
          label="Label"
          defaultValue="Text"
          maxCount={100}
          disabled
        />

        <p style={labelStyle}>Error</p>
        <TextAreaUnit
          label="Label"
          placeholder="Placeholder"
          error
          errorMessages={['エラーテキストが入ります。']}
        />
        <TextAreaUnit
          label="Label"
          placeholder="Placeholder"
          maxCount={100}
          error
          errorMessages={['エラーテキストが入ります。']}
        />

        <p style={labelStyle}>Error + Text</p>
        <TextAreaUnit
          label="Label"
          defaultValue="Text"
          error
          errorMessages={['エラーテキストが入ります。']}
        />
        <TextAreaUnit
          label="Label"
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

/**
 * ラベルバリアント一覧
 */
export const AllLabelVariants: Story = {
  args: {
    label: 'Label',
  },
  decorators: [
    () => (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 256px)',
          gap: '24px',
          padding: '40px',
        }}
      >
        <div>
          <p style={labelStyle}>Default</p>
          <TextAreaUnit label="Label" placeholder="Placeholder" />
        </div>
        <div>
          <p style={labelStyle}>Required</p>
          <TextAreaUnit label="Label" required placeholder="Placeholder" />
        </div>
        <div>
          <p style={labelStyle}>Support Text</p>
          <TextAreaUnit
            label="Label"
            supportText="Support text"
            placeholder="Placeholder"
          />
        </div>
        <div>
          <p style={labelStyle}>Required + Support</p>
          <TextAreaUnit
            label="Label"
            required
            supportText="Support text"
            placeholder="Placeholder"
          />
        </div>
        <div>
          <p style={labelStyle}>Disabled</p>
          <TextAreaUnit label="Label" placeholder="Placeholder" disabled />
        </div>
        <div>
          <p style={labelStyle}>Large</p>
          <TextAreaUnit label="Label" size="large" placeholder="Placeholder" />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};
