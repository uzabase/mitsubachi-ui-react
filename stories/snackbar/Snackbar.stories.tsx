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
          'ユーザーの視線に入りやすい位置に、短時間だけ情報を提示し、操作フローを中断させずに状態を共有することを目的としています。\n\n' +
          '### 使い方のルール\n\n' +
          '- **成功フィードバック専用** — Snackbar は成功時のみ使用します\n' +
          '- **重要な情報には使わない** — 短時間で自動消去されるため、見逃してほしくない情報のお知らせには適しません\n' +
          '- **失敗・警告・エラー** — `InlineNotification` 等の別コンポーネントを使用してください',
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
 * Small 長いテキスト
 */
export const SmallLongText: Story = {
  args: {
    size: 'small',
    text: 'アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。',
  },
  render: (args) => <SnackbarTrigger {...args} />,
};

/**
 * Medium 長いテキスト
 */
export const MediumLongText: Story = {
  args: {
    size: 'medium',
    text: 'アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。',
  },
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
          Small（長文）
        </h3>
        <SnackbarTrigger
          {...args}
          size="small"
          text="アップロードしたファイルの名寄せが完了しました。結果はダウンロードページから確認できます。"
        />
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
