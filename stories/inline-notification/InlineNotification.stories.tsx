import type { Meta, StoryObj } from '@storybook/react-vite';

import { InlineNotification } from '../../src/components/inline-notification';

const meta = {
  title: 'Components/InlineNotification',
  component: InlineNotification,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '重要な情報を画面の文脈の中で提示する通知コンポーネントです。',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
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
    children: {
      control: 'text',
      description:
        '通知メッセージのコンテンツ（テキスト、太字、リンク、改行などを含む）',
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
    children: 'Message',
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
    children: 'Message',
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
    children: 'Message',
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
    children: 'Message',
  },
};

/**
 * Secondary - Information
 */
export const SecondaryInformation: Story = {
  args: {
    status: 'information',
    variant: 'secondary',
    children: 'Message',
  },
};

/**
 * Secondary - Warning
 */
export const SecondaryWarning: Story = {
  args: {
    status: 'warning',
    variant: 'secondary',
    children: 'Message',
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
    children:
      'メッセージが入りますメッセージが入りますメッセージが入りますメッセージが入りますメッセージが入りますメッセージが入りますメッセージが入ります',
  },
};

/**
 * すべてのパターンを一覧表示
 */
export const AllPatterns: Story = {
  args: {
    status: 'information',
    variant: 'primary',
    children: 'Message',
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
          <InlineNotification status="information" variant="primary">
            Information message
          </InlineNotification>
          <InlineNotification status="success" variant="primary">
            Success message
          </InlineNotification>
          <InlineNotification status="warning" variant="primary">
            Warning message
          </InlineNotification>
          <InlineNotification status="error" variant="primary">
            Error message
          </InlineNotification>
        </div>
      </div>

      {/* Secondary */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          Secondary
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <InlineNotification status="information" variant="secondary">
            Information
          </InlineNotification>
          <InlineNotification status="warning" variant="secondary">
            Warning
          </InlineNotification>
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
    children: 'Message',
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
        <InlineNotification status="information" variant="primary">
          この通知はレスポンシブ対応しています
        </InlineNotification>
        <InlineNotification status="warning" variant="secondary">
          画面幅に応じてスタイルが変わります
        </InlineNotification>
      </div>
    </div>
  ),
};
