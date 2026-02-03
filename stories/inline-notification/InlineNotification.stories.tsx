import type { Meta, StoryObj } from '@storybook/react-vite';

import { InlineNotification } from '../../src/components/inline-notification';

const meta = {
  title: 'Components/InlineNotification',
  component: InlineNotification,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: '通知メッセージのテキスト（必須）',
    },
    status: {
      control: 'select',
      options: ['information', 'success', 'warning', 'error'],
      description: '通知のステータス（色・アイコンの種類）',
    },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: '通知のバリアント（表示スタイル）',
    },
  },
} satisfies Meta<typeof InlineNotification>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Primary - Information
 * 情報を示す際に使用
 */
export const PrimaryInformation: Story = {
  args: {
    status: 'information',
    variant: 'primary',
    text: 'Message',
  },
};

/**
 * Primary - Success
 * 成功を示す際に使用
 */
export const PrimarySuccess: Story = {
  args: {
    status: 'success',
    variant: 'primary',
    text: 'Message',
  },
};

/**
 * Primary - Warning
 * 警告を示す際に使用
 */
export const PrimaryWarning: Story = {
  args: {
    status: 'warning',
    variant: 'primary',
    text: 'Message',
  },
};

/**
 * Primary - Error
 * エラーを示す際に使用
 */
export const PrimaryError: Story = {
  args: {
    status: 'error',
    variant: 'primary',
    text: 'Message',
  },
};

/**
 * Secondary - Information
 */
export const SecondaryInformation: Story = {
  args: {
    status: 'information',
    variant: 'secondary',
    text: 'Message',
  },
};

/**
 * Secondary - Warning
 */
export const SecondaryWarning: Story = {
  args: {
    status: 'warning',
    variant: 'secondary',
    text: 'Message',
  },
};

/**
 * Long Text
 * 長いテキストの表示を確認
 */
export const LongText: Story = {
  args: {
    status: 'information',
    variant: 'primary',
    text: 'メッセージが入りますメッセージが入りますメッセージが入りますメッセージが入りますメッセージが入りますメッセージが入りますメッセージが入ります',
  },
};

/**
 * すべてのパターンを一覧表示
 */
export const AllPatterns: Story = {
  args: {
    status: 'information',
    variant: 'primary',
    text: 'Message',
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '40px',
      }}
    >
      {/* Primary */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          Primary
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <InlineNotification
            status="information"
            variant="primary"
            text="Information message"
          />
          <InlineNotification
            status="success"
            variant="primary"
            text="Success message"
          />
          <InlineNotification
            status="warning"
            variant="primary"
            text="Warning message"
          />
          <InlineNotification
            status="error"
            variant="primary"
            text="Error message"
          />
        </div>
      </div>

      {/* Secondary */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          Secondary
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <InlineNotification
            status="information"
            variant="secondary"
            text="Information"
          />
          <InlineNotification
            status="warning"
            variant="secondary"
            text="Warning"
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * レスポンシブ動作を確認
 * ブラウザのウィンドウ幅を変更すると、720px以下でスマホスタイルに切り替わります
 */
export const Responsive: Story = {
  args: {
    status: 'information',
    variant: 'primary',
    text: 'Message',
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  render: () => (
    <div style={{ padding: '40px' }}>
      <div style={{ marginBottom: '24px' }}>
        <p style={{ color: '#666', fontSize: '14px', marginBottom: '8px' }}>
          ブラウザのウィンドウ幅を変更して、レスポンシブ動作を確認してください
        </p>
        <p style={{ color: '#999', fontSize: '12px' }}>
          720px以下: スマホスタイル（パディング小）
          <br />
          721px以上: デスクトップスタイル（パディング大）
        </p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <InlineNotification
          status="information"
          variant="primary"
          text="この通知はレスポンシブ対応しています"
        />
        <InlineNotification
          status="warning"
          variant="secondary"
          text="画面幅に応じてスタイルが変わります"
        />
      </div>
    </div>
  ),
};
