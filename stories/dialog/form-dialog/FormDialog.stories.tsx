import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { FormDialog } from '../../../src/components/dialog';
import { CloseIcon } from '../../../src/icons';

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
        <style>{`
          .form-field {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .form-label {
            font-family: var(--typography-font-family, Arial, sans-serif);
            font-weight: 700;
            font-size: var(--typography-font-size-font-scale-30, 12px);
            line-height: 1.5;
            letter-spacing: 0.02em;
            color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
          }

          .form-input {
            inline-size: 100%;
            min-block-size: 88px;
            padding: var(--spacing-medium, 8px);
            font-family: var(--typography-font-family, Arial, sans-serif);
            font-size: var(--typography-font-size-font-scale-40, 14px);
            line-height: 1.5;
            color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
            background: var(--surface-regular-default, #ffffff);
            border: 1px solid var(--border-semi-strong-default, rgba(0, 0, 0, 0.29));
            border-radius: var(--border-radius-medium, 6px);
            box-sizing: border-box;
            resize: vertical;
          }

          .form-input::placeholder {
            color: var(--text-regular-lighter, rgba(0, 0, 0, 0.42));
          }

          .form-input:focus-visible {
            outline: 2px solid var(--focus-ring-default, #191919);
            outline-offset: 2px;
          }
        `}</style>
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
              <div className="form-field">
                <label htmlFor="name" className="form-label">
                  名前
                </label>
                <textarea
                  id="name"
                  className="form-input"
                  placeholder="名前を入力"
                  rows={3}
                />
              </div>
              <div className="form-field">
                <label htmlFor="description" className="form-label">
                  メッセージ
                </label>
                <textarea
                  id="description"
                  className="form-input"
                  placeholder="メッセージを入力"
                  rows={3}
                />
              </div>
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
    const [emails, setEmails] = useState([
      'example@xyz.com',
      'sample@xyz.com',
      'test@xyz.com',
    ]);

    const removeEmail = (index: number) => {
      setEmails(emails.filter((_, i) => i !== index));
    };

    return (
      <>
        <style>{`
          .form-field {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .form-label-row {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .form-label {
            font-family: var(--typography-font-family, Arial, sans-serif);
            font-weight: 700;
            font-size: var(--typography-font-size-font-scale-30, 12px);
            line-height: 1.5;
            letter-spacing: 0.02em;
            color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
          }

          .required-badge {
            inline-size: 35px;
            block-size: 18px;
            padding-block: 2px;
            padding-inline: 6px;
            font-family: var(--typography-font-family, Arial, sans-serif);
            font-weight: 400;
            font-size: 11px;
            line-height: 1.3;
            letter-spacing: 0.02em;
            color: var(--ui-semantic-text-required, #c92812);
            background: var(--ui-semantic-surface-required-default, #ffedeb);
            border-radius: var(--border-radius-medium, 6px);
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .form-input {
            inline-size: 100%;
            min-block-size: 88px;
            padding: var(--spacing-medium, 8px);
            font-family: var(--typography-font-family, Arial, sans-serif);
            font-size: var(--typography-font-size-font-scale-40, 14px);
            line-height: 1.5;
            color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
            background: var(--surface-regular-default, #ffffff);
            border: 1px solid var(--border-semi-strong-default, rgba(0, 0, 0, 0.29));
            border-radius: var(--border-radius-medium, 6px);
            box-sizing: border-box;
            resize: vertical;
          }

          .form-input::placeholder {
            color: var(--text-regular-lighter, rgba(0, 0, 0, 0.42));
          }

          .form-input:focus-visible {
            outline: 2px solid var(--focus-ring-default, #191919);
            outline-offset: 2px;
          }

          .email-tags-container {
            inline-size: 100%;
            min-block-size: 88px;
            padding: var(--spacing-medium, 8px);
            background: var(--surface-regular-default, #ffffff);
            border: 1px solid var(--border-semi-strong-default, rgba(0, 0, 0, 0.29));
            border-radius: var(--border-radius-medium, 6px);
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
            align-content: flex-start;
          }

          .email-tag {
            min-block-size: 32px;
            padding-block: 2px;
            padding-inline-start: var(--spacing-large, 12px);
            padding-inline-end: var(--spacing-medium, 8px);
            display: inline-flex;
            align-items: center;
            gap: 4px;
            font-family: var(--typography-font-family, Arial, sans-serif);
            font-weight: 400;
            font-size: var(--typography-font-size-font-scale-40, 14px);
            line-height: 1.5;
            letter-spacing: 0.02em;
            color: var(--text-error, #c92812);
            background: var(--surface-required-default, #ffedeb);
            border-radius: 100px;
            border: none;
            cursor: default;
          }

          .email-tag.selected {
            color: var(--ui-semantic-text-regular-default, rgba(0, 0, 0, 0.84));
            background: var(--ui-semantic-surface-regular-selected-default, #f0f6ff);
          }

          .email-tag-remove {
            inline-size: 16px;
            block-size: 16px;
            padding: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: transparent;
            border: none;
            cursor: pointer;
            color: inherit;
          }

          .email-tag:not(.selected) .email-tag-remove {
            color: var(--text-error, #c92812);
          }

          .email-tag-remove:hover {
            opacity: 0.7;
          }

          .email-tag-remove:focus-visible {
            outline: 2px solid var(--focus-ring-default, #191919);
            outline-offset: 2px;
            border-radius: 2px;
          }

          .email-tag-remove svg {
            inline-size: 16px;
            block-size: 16px;
          }

          .form-label-wrapper {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-small, 4px);
          }

          .support-text {
            font-family: var(--typography-font-family, Arial, sans-serif);
            font-weight: 400;
            font-size: var(--typography-font-size-font-scale-20, 12px);
            line-height: 1.5;
            letter-spacing: 0.02em;
            color: var(--text-weak-default, rgba(0, 0, 0, 0.54));
          }
        `}</style>
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
              <div className="form-field">
                <div className="form-label-wrapper">
                  <div className="form-label-row">
                    <label htmlFor="email" className="form-label">
                      メールアドレス
                    </label>
                    <span className="required-badge">必須</span>
                  </div>
                  <div className="support-text">
                    複数の宛先を指定する場合は、「,（カンマ）」で区切って入力してください。
                  </div>
                </div>
                <div className="email-tags-container">
                  {emails.map((email, index) => (
                    <span
                      key={index}
                      className={`email-tag ${index === 0 || index === 2 ? 'selected' : ''}`}
                    >
                      {email}
                      <button
                        type="button"
                        className="email-tag-remove"
                        onClick={() => removeEmail(index)}
                        aria-label={`${email}を削除`}
                      >
                        <CloseIcon />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-field">
                <label htmlFor="message" className="form-label">
                  メッセージ
                </label>
                <textarea
                  id="message"
                  className="form-input"
                  placeholder="招待者へのメッセージを入力しましょう"
                  rows={3}
                />
              </div>
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
        <style>{`
          .form-field {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .form-label {
            font-family: var(--typography-font-family, Arial, sans-serif);
            font-weight: 700;
            font-size: var(--typography-font-size-font-scale-30, 12px);
            line-height: 1.5;
            letter-spacing: 0.02em;
            color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
          }

          .form-input {
            inline-size: 100%;
            padding: var(--spacing-medium, 8px);
            font-family: var(--typography-font-family, Arial, sans-serif);
            font-size: var(--typography-font-size-font-scale-40, 14px);
            line-height: 1.5;
            color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
            background: var(--surface-regular-default, #ffffff);
            border: 1px solid var(--border-semi-strong-default, rgba(0, 0, 0, 0.29));
            border-radius: var(--border-radius-medium, 6px);
            box-sizing: border-box;
          }

          textarea.form-input {
            min-block-size: 88px;
            resize: vertical;
          }

          .form-input::placeholder {
            color: var(--text-regular-lighter, rgba(0, 0, 0, 0.42));
          }

          .form-input:focus-visible {
            outline: 2px solid var(--focus-ring-default, #191919);
            outline-offset: 2px;
          }
        `}</style>
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
                  <div className="form-field">
                    <label htmlFor="lastName" className="form-label">
                      姓
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className="form-input"
                      placeholder="山田"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="firstName" className="form-label">
                      名
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className="form-input"
                      placeholder="太郎"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email" className="form-label">
                      メールアドレス
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-input"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="phone" className="form-label">
                      電話番号
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="form-input"
                      placeholder="090-1234-5678"
                    />
                  </div>
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
                  <div className="form-field">
                    <label htmlFor="postalCode" className="form-label">
                      郵便番号
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      className="form-input"
                      placeholder="123-4567"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="prefecture" className="form-label">
                      都道府県
                    </label>
                    <input
                      id="prefecture"
                      type="text"
                      className="form-input"
                      placeholder="東京都"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="city" className="form-label">
                      市区町村
                    </label>
                    <input
                      id="city"
                      type="text"
                      className="form-input"
                      placeholder="渋谷区"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="address" className="form-label">
                      番地・建物名
                    </label>
                    <input
                      id="address"
                      type="text"
                      className="form-input"
                      placeholder="〇〇1-2-3"
                    />
                  </div>
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
                  <div className="form-field">
                    <label htmlFor="occupation" className="form-label">
                      職業
                    </label>
                    <input
                      id="occupation"
                      type="text"
                      className="form-input"
                      placeholder="会社員"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="company" className="form-label">
                      会社名
                    </label>
                    <input
                      id="company"
                      type="text"
                      className="form-input"
                      placeholder="株式会社〇〇"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="department" className="form-label">
                      部署
                    </label>
                    <input
                      id="department"
                      type="text"
                      className="form-input"
                      placeholder="営業部"
                    />
                  </div>
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
                  <div className="form-field">
                    <label htmlFor="notes" className="form-label">
                      備考
                    </label>
                    <textarea
                      id="notes"
                      className="form-input"
                      placeholder="自由記入欄"
                      rows={3}
                    />
                  </div>
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
        <style>{`
          .form-field {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .form-label {
            font-family: var(--typography-font-family, Arial, sans-serif);
            font-weight: 700;
            font-size: var(--typography-font-size-font-scale-30, 12px);
            line-height: 1.5;
            letter-spacing: 0.02em;
            color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
          }

          .form-input {
            inline-size: 100%;
            min-block-size: 88px;
            padding: var(--spacing-medium, 8px);
            font-family: var(--typography-font-family, Arial, sans-serif);
            font-size: var(--typography-font-size-font-scale-40, 14px);
            line-height: 1.5;
            color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
            background: var(--surface-regular-default, #ffffff);
            border: 1px solid var(--border-semi-strong-default, rgba(0, 0, 0, 0.29));
            border-radius: var(--border-radius-medium, 6px);
            box-sizing: border-box;
            resize: vertical;
          }

          .form-input::placeholder {
            color: var(--text-regular-lighter, rgba(0, 0, 0, 0.42));
          }

          .form-input:focus-visible {
            outline: 2px solid var(--focus-ring-default, #191919);
            outline-offset: 2px;
          }
        `}</style>
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
              <div className="form-field">
                <label htmlFor="name" className="form-label">
                  名前
                </label>
                <textarea
                  id="name"
                  className="form-input"
                  placeholder="名前を入力"
                  rows={3}
                />
              </div>
              <div className="form-field">
                <label htmlFor="description" className="form-label">
                  メッセージ
                </label>
                <textarea
                  id="description"
                  className="form-input"
                  placeholder="メッセージを入力"
                  rows={3}
                />
              </div>
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
        <style>{`
          .form-field {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .form-label {
            font-family: var(--typography-font-family, Arial, sans-serif);
            font-weight: 700;
            font-size: var(--typography-font-size-font-scale-30, 12px);
            line-height: 1.5;
            letter-spacing: 0.02em;
            color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
          }

          .form-input {
            inline-size: 100%;
            padding: var(--spacing-medium, 8px);
            font-family: var(--typography-font-family, Arial, sans-serif);
            font-size: var(--typography-font-size-font-scale-40, 14px);
            line-height: 1.5;
            color: var(--text-regular-default, rgba(0, 0, 0, 0.84));
            background: var(--surface-regular-default, #ffffff);
            border: 1px solid var(--border-semi-strong-default, rgba(0, 0, 0, 0.29));
            border-radius: var(--border-radius-medium, 6px);
            box-sizing: border-box;
          }

          textarea.form-input {
            min-block-size: 88px;
            resize: vertical;
          }

          .form-input::placeholder {
            color: var(--text-regular-lighter, rgba(0, 0, 0, 0.42));
          }

          .form-input:focus-visible {
            outline: 2px solid var(--focus-ring-default, #191919);
            outline-offset: 2px;
          }
        `}</style>
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
                  <div className="form-field">
                    <label htmlFor="lastName" className="form-label">
                      姓
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className="form-input"
                      placeholder="山田"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="firstName" className="form-label">
                      名
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className="form-input"
                      placeholder="太郎"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email" className="form-label">
                      メールアドレス
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-input"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="phone" className="form-label">
                      電話番号
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="form-input"
                      placeholder="090-1234-5678"
                    />
                  </div>
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
                  <div className="form-field">
                    <label htmlFor="postalCode" className="form-label">
                      郵便番号
                    </label>
                    <input
                      id="postalCode"
                      type="text"
                      className="form-input"
                      placeholder="123-4567"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="prefecture" className="form-label">
                      都道府県
                    </label>
                    <input
                      id="prefecture"
                      type="text"
                      className="form-input"
                      placeholder="東京都"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="city" className="form-label">
                      市区町村
                    </label>
                    <input
                      id="city"
                      type="text"
                      className="form-input"
                      placeholder="渋谷区"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="address" className="form-label">
                      番地・建物名
                    </label>
                    <input
                      id="address"
                      type="text"
                      className="form-input"
                      placeholder="〇〇1-2-3"
                    />
                  </div>
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
                  <div className="form-field">
                    <label htmlFor="notes" className="form-label">
                      備考
                    </label>
                    <textarea
                      id="notes"
                      className="form-input"
                      placeholder="自由記入欄"
                      rows={3}
                    />
                  </div>
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
