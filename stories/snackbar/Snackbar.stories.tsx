import type { Meta, StoryObj } from '@storybook/react-vite';

import { Snackbar, useSnackbar } from '../../src/components/snackbar';
import type { SnackbarSize } from '../../src/components/snackbar';

/** ストーリー用のargs型 */
interface SnackbarStoryArgs {
  size: SnackbarSize;
  text: string;
}

/**
 * Snackbar トリガーボタン
 * ストーリー内でSnackbarを発火させるためのヘルパーコンポーネント
 */
function SnackbarTrigger({ size, text }: { size: SnackbarSize; text: string }) {
  const snackbar = useSnackbar();

  return (
    <button
      type="button"
      onClick={() => snackbar.show(text, { size })}
      style={{
        padding: '8px 16px',
        borderRadius: '6px',
        border: '1px solid #ccc',
        background: '#fff',
        cursor: 'pointer',
        fontSize: '14px',
      }}
    >
      Snackbarを表示
    </button>
  );
}

const meta = {
  title: 'Components/Snackbar',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Snackbar は、ユーザー操作に対する短いフィードバックを、既存 UI の上に重ねて表示する軽量な Overlay 通知コンポーネントです。\n\n' +
          'ユーザーの視線に入りやすい位置に、短時間だけ情報を提示し、操作フローを中断させずに状態を共有することを目的としています。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Snackbarのサイズ',
    },
    text: {
      control: 'text',
      description: '表示するメッセージ',
    },
  },
  args: {
    size: 'small',
    text: 'Message',
  },
  decorators: [
    (Story) => (
      <Snackbar.Provider>
        <Story />
        <Snackbar.Viewport />
      </Snackbar.Provider>
    ),
  ],
} satisfies Meta<SnackbarStoryArgs>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Small サイズ
 */
export const Small: Story = {
  args: {
    size: 'small',
    text: 'Message',
  },
  render: (args) => <SnackbarTrigger {...args} />,
};

/**
 * Medium サイズ
 */
export const Medium: Story = {
  args: {
    size: 'medium',
    text: 'Message',
  },
  render: (args) => <SnackbarTrigger {...args} />,
};

/**
 * 長いテキスト
 */
export const LongText: Story = {
  args: {
    size: 'medium',
    text: 'アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。',
  },
  render: (args) => <SnackbarTrigger {...args} />,
};

/**
 * デスクトップ配置
 * 画面右上に表示され、右からスライドインする
 */
export const DesktopPosition: Story = {
  args: {
    size: 'small',
    text: '保存しました',
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'responsive',
    },
  },
  decorators: [
    (Story) => (
      <Snackbar.Provider>
        <div style={{ padding: '40px' }}>
          <div style={{ marginBlockEnd: '24px' }}>
            <p
              style={{ color: '#666', fontSize: '14px', marginBlockEnd: '8px' }}
            >
              デスクトップ配置: 画面右上に表示、右からスライドイン
            </p>
            <p style={{ color: '#999', fontSize: '12px' }}>
              721px以上のビューポートで確認してください
            </p>
          </div>
          <Story />
        </div>
        <Snackbar.Viewport />
      </Snackbar.Provider>
    ),
  ],
  render: (args) => <SnackbarTrigger {...args} />,
};

/**
 * モバイル配置
 * 画面下中央に表示され、下からスライドインする
 */
export const MobilePosition: Story = {
  args: {
    size: 'small',
    text: '保存しました',
  },
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  decorators: [
    (Story) => (
      <Snackbar.Provider>
        <div style={{ padding: '40px' }}>
          <div style={{ marginBlockEnd: '24px' }}>
            <p
              style={{ color: '#666', fontSize: '14px', marginBlockEnd: '8px' }}
            >
              モバイル配置: 画面下中央に表示、下からスライドイン
            </p>
            <p style={{ color: '#999', fontSize: '12px' }}>
              720px以下のビューポートで確認してください
            </p>
          </div>
          <Story />
        </div>
        <Snackbar.Viewport />
      </Snackbar.Provider>
    ),
  ],
  render: (args) => <SnackbarTrigger {...args} />,
};

/**
 * 全パターン一覧
 * Small / Medium の見た目を並べて確認
 */
export const AllPatterns: Story = {
  args: {
    size: 'small',
    text: 'Message',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '40px',
      }}
    >
      <div>
        <h3 style={{ marginBlockEnd: '16px', color: '#666', fontSize: '14px' }}>
          Small
        </h3>
        <SnackbarTrigger {...args} size="small" />
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '16px', color: '#666', fontSize: '14px' }}>
          Medium
        </h3>
        <SnackbarTrigger {...args} size="medium" />
      </div>

      <div>
        <h3 style={{ marginBlockEnd: '16px', color: '#666', fontSize: '14px' }}>
          Medium（長文）
        </h3>
        <SnackbarTrigger
          {...args}
          size="medium"
          text="アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。"
        />
      </div>
    </div>
  ),
};
