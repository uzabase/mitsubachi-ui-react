import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
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
 * actionVariant="destructive" で赤いボタンになる。
 */
export const Destructive: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          削除
        </button>
        <ActionDialog {...args} open={open} onOpenChange={setOpen}>
          <ActionDialog.Header text="削除の確認" />
          <ActionDialog.Body>
            この項目を削除すると元に戻せません。削除しますか？
          </ActionDialog.Body>
          <ActionDialog.Footer
            cancelLabel="キャンセル"
            actionLabel="削除する"
            actionVariant="destructive"
            onAction={() => console.log('delete')}
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
 * ホバー状態のダイアログ（アクションボタンにマウスをホバー）。
 */
export const Hover: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(true);
    return (
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
    );
  },
  args: {
    size: 'small',
    children: undefined,
  },
  parameters: {
    pseudo: { hover: true },
  },
};

/**
 * フォーカス状態のダイアログ（アクションボタンにキーボードフォーカス）。
 */
export const Focus: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(true);
    return (
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
    );
  },
  args: {
    size: 'small',
    children: undefined,
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
};

/**
 * アクティブ状態のダイアログ（アクションボタンを押下中）。
 */
export const Active: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(true);
    return (
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
    );
  },
  args: {
    size: 'small',
    children: undefined,
  },
  parameters: {
    pseudo: { active: true },
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
          <ActionDialog.Header text="利用規約の確認" />
          <ActionDialog.Body>
            <h3>第1条 総則</h3>
            <p>
              本規約は、当サービスの利用に関する条件を定めるものです。
              ユーザーは、本規約に同意の上、当サービスを利用するものとします。
            </p>
            <h3>第2条 定義</h3>
            <p>本規約において使用する用語の定義は、以下の通りとします。</p>
            <ul>
              <li>「当社」とは、本サービスを提供する事業者を指します。</li>
              <li>
                「ユーザー」とは、本サービスを利用する個人または法人を指します。
              </li>
              <li>
                「本サービス」とは、当社が提供するすべてのサービスを指します。
              </li>
            </ul>
            <h3>第3条 アカウント登録</h3>
            <p>
              ユーザーは、本サービスの利用にあたり、当社所定の方法によりアカウント登録を行うものとします。
              登録情報は正確かつ最新の内容を保つ義務があります。
            </p>
            <h3>第4条 禁止事項</h3>
            <p>
              ユーザーは、本サービスの利用にあたり、以下の行為を行ってはなりません。
            </p>
            <ol>
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>
                当社、本サービスの他のユーザー、または第三者の知的財産権を侵害する行為
              </li>
              <li>
                当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
              </li>
              <li>不正アクセスをし、またはこれを試みる行為</li>
            </ol>
            <h3>第5条 サービスの停止</h3>
            <p>
              当社は、以下のいずれかに該当する場合、ユーザーに事前に通知することなく、
              本サービスの全部または一部の提供を停止することができるものとします。
            </p>
            <h3>第6条 免責事項</h3>
            <p>
              当社は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた
              取引、連絡または紛争等について一切責任を負いません。
            </p>
            <h3>第7条 損害賠償</h3>
            <p>
              ユーザーが本規約に違反したことにより当社に損害を与えた場合、
              当社はユーザーに対して損害賠償を請求することができるものとします。
            </p>
          </ActionDialog.Body>
          <ActionDialog.Footer
            cancelLabel="キャンセル"
            actionLabel="同意する"
            onAction={() => console.log('agree')}
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
