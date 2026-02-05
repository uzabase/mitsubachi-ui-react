import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Dialog as BaseDialog } from '@base-ui/react';
import { ActionDialog } from '../../../src/components/dialog';

const meta = {
  title: 'Components/Dialog/ActionDialog',
  component: ActionDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: 'boolean',
      description: '開閉状態（制御用）',
    },
    defaultOpen: {
      control: 'boolean',
      description: '初期の開閉状態（非制御用）',
    },
    onOpenChange: {
      action: 'openChanged',
      description: '開閉状態が変わったときのコールバック',
    },
    size: {
      control: 'radio',
      options: ['small'],
      description: 'ダイアログのサイズ（Desktop 時）',
    },
  },
  args: {
    defaultOpen: true,
  },
} satisfies Meta<typeof ActionDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的な確認ダイアログ。
 * キャンセルとアクションの2つのボタンを持つ標準的な形式。
 */
export const Default: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          開く
        </button>
        <ActionDialog {...args} open={open} onOpenChange={setOpen}>
          <ActionDialog.Header text="操作の確認" />
          <ActionDialog.Body>
            この操作を実行してもよろしいですか？
          </ActionDialog.Body>
          <ActionDialog.Footer
            cancelLabel="キャンセル"
            actionLabel="実行する"
            onAction={() => console.log('action')}
          />
        </ActionDialog>
      </>
    );
  },
  args: {
    size: 'small',
    children: undefined,
  },
};

/**
 * 削除確認などの破壊的アクションを行うダイアログ。
 * 破壊的アクションボタンのスタイルは、Story内でカスタムスタイルとして定義。
 * 将来的にButtonコンポーネントができたら、そちらの責務に移行予定。
 */
export const Destructive: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    const destructiveButtonStyle = {
      minBlockSize: '40px',
      paddingBlock: '2px',
      paddingInline: 'var(--spacing-x-large, 16px)',
      fontFamily: 'var(--typography-font-family, Arial, sans-serif)',
      fontSize: 'var(--typography-font-size-font-scale-40, 14px)',
      fontWeight: 400,
      lineHeight: 1.5,
      color: 'var(--text-inverse, #ffffff)',
      background: 'var(--surface-error-default, #d93020)',
      border: 'none',
      borderRadius: 'var(--border-radius-full, 9999px)',
      cursor: 'pointer',
    } as const;
    return (
      <>
        <style>{`
          .destructive-action-button:hover {
            background: #b3281a;
          }
          .destructive-action-button:focus-visible {
            outline: 2px solid var(--focus-ring-default, #191919);
            outline-offset: 2px;
          }
          .footer-container {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: var(--spacing-medium, 8px);
            padding-block-start: var(--spacing-x-large, 16px);
            padding-block-end: var(--spacing-x-large, 16px);
            padding-inline-start: var(--spacing-x-large, 16px);
            padding-inline-end: var(--spacing-2x-large, 24px);
            border-block-start: 1px solid transparent;
            transition: border-block-start-color 0s ease;
          }
          /* Body の下部が隠れているときに仕切り線を表示 */
          [data-scrolled-from-bottom='true'] + .footer-container {
            border-block-start-color: var(--border-regular-default, rgba(0, 0, 0, 0.1));
          }
          .footer-cancel {
            min-block-size: 40px;
            padding-block: 2px;
            padding-inline: var(--spacing-x-large, 16px);
            font-family: var(--typography-font-family, Arial, sans-serif);
            font-size: var(--typography-font-size-font-scale-40, 14px);
            font-weight: 400;
            line-height: 1.5;
            color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
            background: transparent;
            border: 1px solid var(--border-regular-default, rgba(0, 0, 0, 0.1));
            border-radius: var(--border-radius-full, 9999px);
            cursor: pointer;
          }
          .footer-cancel:hover {
            background: var(--neutral-neutral-30-alpha, rgba(0, 0, 0, 0.13));
          }
          .footer-cancel:focus-visible {
            outline: 2px solid var(--focus-ring-default, #191919);
            outline-offset: 2px;
          }
        `}</style>
        <button type="button" onClick={() => setOpen(true)}>
          削除
        </button>
        <ActionDialog {...args} open={open} onOpenChange={setOpen}>
          <ActionDialog.Header text="ステータスの削除" />
          <ActionDialog.Body>
            <strong>{'{ステータス名}'}を削除しますか？</strong>
            <br />
            削除したステータスは元に戻せません。
          </ActionDialog.Body>
          <div className="footer-container">
            <BaseDialog.Close
              className="footer-cancel"
              render={<button type="button" />}
            >
              キャンセル
            </BaseDialog.Close>
            <BaseDialog.Close
              className="destructive-action-button"
              style={destructiveButtonStyle}
              onClick={() => console.log('delete')}
              render={<button type="button" />}
            >
              削除する
            </BaseDialog.Close>
          </div>
        </ActionDialog>
      </>
    );
  },
  args: {
    size: 'small',
    children: undefined,
  },
};

/**
 * キャンセルボタンなし、閉じるボタンのみのダイアログ。
 * 通知など、確認のみが必要な場合に使用。
 */
export const CloseOnly: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          開く
        </button>
        <ActionDialog {...args} open={open} onOpenChange={setOpen}>
          <ActionDialog.Header text="お知らせ" />
          <ActionDialog.Body>処理が完了しました。</ActionDialog.Body>
          <ActionDialog.Footer
            actionLabel="閉じる"
            onAction={() => console.log('close')}
          />
        </ActionDialog>
      </>
    );
  },
  args: {
    size: 'small',
    children: undefined,
  },
};

/**
 * 長いコンテンツを含むダイアログ。
 * Header と Footer は固定され、Body のみスクロール可能。
 */
export const LongContent: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          長いコンテンツを開く
        </button>
        <ActionDialog {...args} open={open} onOpenChange={setOpen}>
          <ActionDialog.Header text="管理者権限付与の確認" />
          <ActionDialog.Body>
            <p style={{ marginTop: 0 }}>
              管理者権限を付与すると、スピーダの利用に関する権限設定やユーザーの各種設定変更を行うことができます。
              <br />
              このユーザーに管理者権限を付与してもよろしいですか？
            </p>
            <p>
              <strong>名前</strong>
              <br />
              山田 太郎
            </p>
            <p>
              <strong>ログインID</strong>
              <br />
              yamada.taro@example.com
            </p>
            <p>
              <strong>所属部署</strong>
              <br />
              営業本部 第一営業部 企画グループ
            </p>
            <p>
              <strong>現在の権限</strong>
              <br />
              一般ユーザー
            </p>
            <p>
              <strong>付与される権限の詳細</strong>
            </p>
            <ul style={{ marginTop: 0 }}>
              <li>
                ユーザー管理：新規ユーザーの追加、既存ユーザーの編集・削除が可能
              </li>
              <li>権限管理：各ユーザーの権限設定、グループ権限の変更が可能</li>
              <li>組織管理：部署・グループの作成、編集、削除が可能</li>
              <li>システム設定：全体設定の変更、機能の有効化・無効化が可能</li>
              <li>
                データ管理：全ユーザーのデータへのアクセス、エクスポートが可能
              </li>
              <li>ログ閲覧：システムログ、操作ログの閲覧が可能</li>
              <li>
                セキュリティ設定：パスワードポリシー、アクセス制限の設定が可能
              </li>
            </ul>
            <p>
              <strong>注意事項</strong>
            </p>
            <ul style={{ marginTop: 0 }}>
              <li>
                管理者権限を付与すると、機密情報を含むすべてのデータにアクセスできるようになります
              </li>
              <li>
                管理者による操作はすべて監査ログに記録され、定期的に確認されます
              </li>
              <li>
                不適切な権限使用が確認された場合、権限の剥奪および懲戒処分の対象となる場合があります
              </li>
              <li>管理者権限の付与には、上位管理者による承認が必要です</li>
              <li>
                管理者権限は定期的に見直しが行われ、必要に応じて変更または取り消される場合があります
              </li>
            </ul>
          </ActionDialog.Body>
          <ActionDialog.Footer
            cancelLabel="キャンセル"
            actionLabel="付与する"
            onAction={() => console.log('grant admin')}
          />
        </ActionDialog>
      </>
    );
  },
  args: {
    size: 'small',
    children: undefined,
  },
};

/**
 * Phone表示での基本的なダイアログ。
 * 横に余白を持ち、高さは広がらない（max-height: min(80dvh, 560px)）。
 */
export const PhoneDefault: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          開く
        </button>
        <ActionDialog {...args} open={open} onOpenChange={setOpen}>
          <ActionDialog.Header text="操作の確認" />
          <ActionDialog.Body>
            この操作を実行してもよろしいですか？
          </ActionDialog.Body>
          <ActionDialog.Footer
            cancelLabel="キャンセル"
            actionLabel="実行する"
            onAction={() => console.log('action')}
          />
        </ActionDialog>
      </>
    );
  },
  args: {
    size: 'small',
    children: undefined,
  },
  globals: {
    viewport: { value: 'mobile2' },
  },
};

/**
 * Phone表示での長いコンテンツを含むダイアログ。
 * 横に余白があり、高さは制限される（スクロール可能）。
 */
export const PhoneLongContent: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          長いコンテンツを開く
        </button>
        <ActionDialog {...args} open={open} onOpenChange={setOpen}>
          <ActionDialog.Header text="管理者権限付与の確認" />
          <ActionDialog.Body>
            <p style={{ marginTop: 0 }}>
              管理者権限を付与すると、スピーダの利用に関する権限設定やユーザーの各種設定変更を行うことができます。
              <br />
              このユーザーに管理者権限を付与してもよろしいですか？
            </p>
            <p>
              <strong>名前</strong>
              <br />
              山田 太郎
            </p>
            <p>
              <strong>ログインID</strong>
              <br />
              yamada.taro@example.com
            </p>
            <p>
              <strong>所属部署</strong>
              <br />
              営業本部 第一営業部 企画グループ
            </p>
            <p>
              <strong>現在の権限</strong>
              <br />
              一般ユーザー
            </p>
            <p>
              <strong>付与される権限の詳細</strong>
            </p>
            <ul style={{ marginTop: 0 }}>
              <li>
                ユーザー管理：新規ユーザーの追加、既存ユーザーの編集・削除が可能
              </li>
              <li>権限管理：各ユーザーの権限設定、グループ権限の変更が可能</li>
              <li>組織管理：部署・グループの作成、編集、削除が可能</li>
              <li>システム設定：全体設定の変更、機能の有効化・無効化が可能</li>
              <li>
                データ管理：全ユーザーのデータへのアクセス、エクスポートが可能
              </li>
              <li>ログ閲覧：システムログ、操作ログの閲覧が可能</li>
              <li>
                セキュリティ設定：パスワードポリシー、アクセス制限の設定が可能
              </li>
            </ul>
            <p>
              <strong>注意事項</strong>
            </p>
            <ul style={{ marginTop: 0 }}>
              <li>
                管理者権限を付与すると、機密情報を含むすべてのデータにアクセスできるようになります
              </li>
              <li>
                管理者による操作はすべて監査ログに記録され、定期的に確認されます
              </li>
              <li>
                不適切な権限使用が確認された場合、権限の剥奪および懲戒処分の対象となる場合があります
              </li>
              <li>管理者権限の付与には、上位管理者による承認が必要です</li>
              <li>
                管理者権限は定期的に見直しが行われ、必要に応じて変更または取り消される場合があります
              </li>
            </ul>
          </ActionDialog.Body>
          <ActionDialog.Footer
            cancelLabel="キャンセル"
            actionLabel="付与する"
            onAction={() => console.log('grant admin')}
          />
        </ActionDialog>
      </>
    );
  },
  args: {
    size: 'small',
    children: undefined,
  },
  globals: {
    viewport: { value: 'mobile2' },
  },
};
