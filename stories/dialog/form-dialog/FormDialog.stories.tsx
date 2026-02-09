import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FormDialog } from '../../../src/components/dialog';

const meta = {
  title: 'Components/Dialog/FormDialog',
  component: FormDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    open: {
      control: false,
      table: { disable: true },
      description: '開閉状態（制御用）。Storyでは内部で管理します',
    },
    defaultOpen: {
      control: false,
      table: { disable: true },
      description: '初期の開閉状態（非制御用）。Storyでは内部で管理します',
    },
    onOpenChange: {
      action: 'openChanged',
      description: '開閉状態が変わったときのコールバック',
    },
    children: {
      control: false,
      table: { disable: true },
      description: 'ダイアログのコンテンツ。Storyでは内部で管理します',
    },
    size: {
      control: 'radio',
      options: ['medium'],
      description: 'ダイアログのサイズ（Desktop 時）',
    },
  },
} satisfies Meta<typeof FormDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * フォーム入力を行うダイアログ。
 * Desktop: size=medium、Phone: 横余白なし・画面端まで、高さも広がる。
 */
export const Default: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          新規作成
        </button>
        <FormDialog {...args} open={open} onOpenChange={setOpen}>
          <FormDialog.Header text="新規作成" />
          <FormDialog.Body>
            <form
              id="form-dialog-form"
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <label htmlFor="name">
                名前
                <input
                  id="name"
                  type="text"
                  placeholder="名前を入力"
                  style={{ marginInlineStart: '8px' }}
                />
              </label>
              <label htmlFor="description">
                説明
                <input
                  id="description"
                  type="text"
                  placeholder="説明を入力"
                  style={{ marginInlineStart: '8px' }}
                />
              </label>
            </form>
          </FormDialog.Body>
          <FormDialog.Footer
            cancelLabel="キャンセル"
            actionLabel="作成する"
            onAction={() => console.log('submit')}
          />
        </FormDialog>
      </>
    );
  },
  args: {
    size: 'medium',
    children: undefined,
  },
};

/**
 * 複数のフィールドを持つより複雑なフォーム。
 */
export const MultipleFields: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          プロフィール編集
        </button>
        <FormDialog {...args} open={open} onOpenChange={setOpen}>
          <FormDialog.Header text="プロフィール編集" />
          <FormDialog.Body>
            <form
              id="profile-form"
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <label htmlFor="username">
                ユーザー名
                <input
                  id="username"
                  type="text"
                  placeholder="ユーザー名"
                  style={{ marginInlineStart: '8px' }}
                />
              </label>
              <label htmlFor="email">
                メールアドレス
                <input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  style={{ marginInlineStart: '8px' }}
                />
              </label>
              <label htmlFor="bio">
                自己紹介
                <textarea
                  id="bio"
                  placeholder="自己紹介を入力"
                  style={{ marginInlineStart: '8px', minHeight: '80px' }}
                />
              </label>
            </form>
          </FormDialog.Body>
          <FormDialog.Footer
            cancelLabel="キャンセル"
            actionLabel="保存する"
            onAction={() => console.log('save')}
          />
        </FormDialog>
      </>
    );
  },
  args: {
    size: 'medium',
    children: undefined,
  },
};

/**
 * 多数のフィールドを持つ長いフォーム。
 * Header と Footer は固定され、Body のみスクロール可能。
 */
export const LongForm: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          詳細な登録フォームを開く
        </button>
        <FormDialog {...args} open={open} onOpenChange={setOpen}>
          <FormDialog.Header text="ユーザー登録" />
          <FormDialog.Body>
            <form
              id="long-form"
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend style={{ fontWeight: 'bold', marginBlockEnd: '8px' }}>
                  基本情報
                </legend>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <label htmlFor="lastName">
                    姓
                    <input
                      id="lastName"
                      type="text"
                      placeholder="山田"
                      style={{ marginInlineStart: '8px', width: '200px' }}
                    />
                  </label>
                  <label htmlFor="firstName">
                    名
                    <input
                      id="firstName"
                      type="text"
                      placeholder="太郎"
                      style={{ marginInlineStart: '8px', width: '200px' }}
                    />
                  </label>
                  <label htmlFor="email">
                    メールアドレス
                    <input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      style={{ marginInlineStart: '8px', width: '300px' }}
                    />
                  </label>
                  <label htmlFor="phone">
                    電話番号
                    <input
                      id="phone"
                      type="tel"
                      placeholder="090-1234-5678"
                      style={{ marginInlineStart: '8px', width: '200px' }}
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend style={{ fontWeight: 'bold', marginBlockEnd: '8px' }}>
                  住所
                </legend>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <label htmlFor="postalCode">
                    郵便番号
                    <input
                      id="postalCode"
                      type="text"
                      placeholder="123-4567"
                      style={{ marginInlineStart: '8px', width: '150px' }}
                    />
                  </label>
                  <label htmlFor="prefecture">
                    都道府県
                    <input
                      id="prefecture"
                      type="text"
                      placeholder="東京都"
                      style={{ marginInlineStart: '8px', width: '200px' }}
                    />
                  </label>
                  <label htmlFor="city">
                    市区町村
                    <input
                      id="city"
                      type="text"
                      placeholder="渋谷区"
                      style={{ marginInlineStart: '8px', width: '200px' }}
                    />
                  </label>
                  <label htmlFor="address">
                    番地・建物名
                    <input
                      id="address"
                      type="text"
                      placeholder="〇〇1-2-3"
                      style={{ marginInlineStart: '8px', width: '300px' }}
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend style={{ fontWeight: 'bold', marginBlockEnd: '8px' }}>
                  職業情報
                </legend>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <label htmlFor="occupation">
                    職業
                    <input
                      id="occupation"
                      type="text"
                      placeholder="会社員"
                      style={{ marginInlineStart: '8px', width: '200px' }}
                    />
                  </label>
                  <label htmlFor="company">
                    会社名
                    <input
                      id="company"
                      type="text"
                      placeholder="株式会社〇〇"
                      style={{ marginInlineStart: '8px', width: '250px' }}
                    />
                  </label>
                  <label htmlFor="department">
                    部署
                    <input
                      id="department"
                      type="text"
                      placeholder="営業部"
                      style={{ marginInlineStart: '8px', width: '200px' }}
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend style={{ fontWeight: 'bold', marginBlockEnd: '8px' }}>
                  その他
                </legend>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <label htmlFor="notes">
                    備考
                    <textarea
                      id="notes"
                      placeholder="自由記入欄"
                      style={{
                        marginInlineStart: '8px',
                        width: '100%',
                        minHeight: '100px',
                      }}
                    />
                  </label>
                </div>
              </fieldset>
            </form>
          </FormDialog.Body>
          <FormDialog.Footer
            cancelLabel="キャンセル"
            actionLabel="登録する"
            onAction={() => console.log('register')}
          />
        </FormDialog>
      </>
    );
  },
  args: {
    size: 'medium',
    children: undefined,
  },
};

/**
 * Phone表示でのフォームダイアログ。
 * 横余白なし・画面端まで表示され、高さも広がる（フルスクリーン）。
 */
export const PhoneDefault: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          新規作成
        </button>
        <FormDialog {...args} open={open} onOpenChange={setOpen}>
          <FormDialog.Header text="新規作成" />
          <FormDialog.Body>
            <form
              id="form-dialog-form"
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <label htmlFor="name">
                名前
                <input
                  id="name"
                  type="text"
                  placeholder="名前を入力"
                  style={{ marginInlineStart: '8px' }}
                />
              </label>
              <label htmlFor="description">
                説明
                <input
                  id="description"
                  type="text"
                  placeholder="説明を入力"
                  style={{ marginInlineStart: '8px' }}
                />
              </label>
            </form>
          </FormDialog.Body>
          <FormDialog.Footer
            cancelLabel="キャンセル"
            actionLabel="作成する"
            onAction={() => console.log('submit')}
          />
        </FormDialog>
      </>
    );
  },
  args: {
    size: 'medium',
    children: undefined,
  },
  globals: {
    viewport: { value: 'mobile2' },
  },
};

/**
 * Phone表示での長いフォーム。
 * フルスクリーン表示で、Body のみスクロール可能。
 */
export const PhoneLongForm: Story = {
  render: function Render(args) {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button type="button" onClick={() => setOpen(true)}>
          詳細な登録フォームを開く
        </button>
        <FormDialog {...args} open={open} onOpenChange={setOpen}>
          <FormDialog.Header text="ユーザー登録" />
          <FormDialog.Body>
            <form
              id="long-form"
              onSubmit={(e) => e.preventDefault()}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend style={{ fontWeight: 'bold', marginBlockEnd: '8px' }}>
                  基本情報
                </legend>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <label htmlFor="lastName">
                    姓
                    <input
                      id="lastName"
                      type="text"
                      placeholder="山田"
                      style={{ marginInlineStart: '8px', width: '200px' }}
                    />
                  </label>
                  <label htmlFor="firstName">
                    名
                    <input
                      id="firstName"
                      type="text"
                      placeholder="太郎"
                      style={{ marginInlineStart: '8px', width: '200px' }}
                    />
                  </label>
                  <label htmlFor="email">
                    メールアドレス
                    <input
                      id="email"
                      type="email"
                      placeholder="email@example.com"
                      style={{
                        marginInlineStart: '8px',
                        width: '100%',
                        maxWidth: '300px',
                      }}
                    />
                  </label>
                  <label htmlFor="phone">
                    電話番号
                    <input
                      id="phone"
                      type="tel"
                      placeholder="090-1234-5678"
                      style={{ marginInlineStart: '8px', width: '200px' }}
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend style={{ fontWeight: 'bold', marginBlockEnd: '8px' }}>
                  住所
                </legend>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <label htmlFor="postalCode">
                    郵便番号
                    <input
                      id="postalCode"
                      type="text"
                      placeholder="123-4567"
                      style={{ marginInlineStart: '8px', width: '150px' }}
                    />
                  </label>
                  <label htmlFor="prefecture">
                    都道府県
                    <input
                      id="prefecture"
                      type="text"
                      placeholder="東京都"
                      style={{ marginInlineStart: '8px', width: '200px' }}
                    />
                  </label>
                  <label htmlFor="city">
                    市区町村
                    <input
                      id="city"
                      type="text"
                      placeholder="渋谷区"
                      style={{ marginInlineStart: '8px', width: '200px' }}
                    />
                  </label>
                  <label htmlFor="address">
                    番地・建物名
                    <input
                      id="address"
                      type="text"
                      placeholder="〇〇1-2-3"
                      style={{
                        marginInlineStart: '8px',
                        width: '100%',
                        maxWidth: '300px',
                      }}
                    />
                  </label>
                </div>
              </fieldset>

              <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
                <legend style={{ fontWeight: 'bold', marginBlockEnd: '8px' }}>
                  その他
                </legend>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  <label htmlFor="notes">
                    備考
                    <textarea
                      id="notes"
                      placeholder="自由記入欄"
                      style={{
                        marginInlineStart: '8px',
                        width: '100%',
                        minHeight: '100px',
                      }}
                    />
                  </label>
                </div>
              </fieldset>
            </form>
          </FormDialog.Body>
          <FormDialog.Footer
            cancelLabel="キャンセル"
            actionLabel="登録する"
            onAction={() => console.log('register')}
          />
        </FormDialog>
      </>
    );
  },
  args: {
    size: 'medium',
    children: undefined,
  },
  globals: {
    viewport: { value: 'mobile2' },
  },
};
