import type { Meta, StoryObj } from '@storybook/react-vite';

import { LinkTag } from '../../../src/components/tag/link-tag';

const meta = {
  title: 'Components/Tag/LinkTag',
  component: LinkTag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'コンテンツの属性や分類を簡潔に示すためのクリック可能なタグコンポーネント。\n\n' +
          '## サイズ使用ガイドライン\n' +
          '- **x-small**: 文中や文末に置くときは、x-smallを使用。\n' +
          '- **small**: 原則はmediumだが、12pxの文字列と並べて配置するときは、smallサイズでもOK\n' +
          '- **medium**: 原則、mediumを使用。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    text: {
      control: 'text',
      description: 'タグに表示するテキスト',
    },
    size: {
      control: 'select',
      options: ['x-small', 'small', 'medium'],
      description: 'タグのサイズ',
    },
    state: {
      control: 'select',
      options: ['default', 'hover', 'active', 'focus'],
      description: 'タグの状態',
    },
    href: {
      control: 'text',
      description: 'リンク先のURL（指定するとa要素として動作）',
    },
  },
} satisfies Meta<typeof LinkTag>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * x-smallサイズ（最小）
 *
 * **使用ガイドライン**: 文中や文末に置くときは、x-smallを使用。
 */
export const XSmall: Story = {
  args: {
    text: 'Text',
    size: 'x-small',
    href: '#',
  },
};

/**
 * smallサイズ
 *
 * **使用ガイドライン**: 原則はmediumだが、12pxの文字列と並べて配置するときは、smallサイズでもOK
 */
export const Small: Story = {
  args: {
    ...XSmall.args,
    size: 'small',
  },
};

/**
 * mediumサイズ（デフォルト）
 *
 * **使用ガイドライン**: 原則、mediumを使用。
 */
export const Medium: Story = {
  args: {
    ...XSmall.args,
    size: 'medium',
  },
};

/**
 * Default状態
 */
export const Default: Story = {
  args: {
    ...Medium.args,
    text: 'Default',
    state: 'default',
  },
};

/**
 * Hover状態
 */
export const Hover: Story = {
  args: {
    ...Medium.args,
    text: 'Hover',
    state: 'hover',
  },
};

/**
 * Active状態
 */
export const Active: Story = {
  args: {
    ...Medium.args,
    text: 'Active',
    state: 'active',
  },
};

/**
 * Focus状態
 */
export const Focus: Story = {
  args: {
    ...Medium.args,
    text: 'Focus',
    state: 'focus',
  },
};

/**
 * すべてのパターンを一覧表示
 */
export const AllPatterns: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '40px',
      }}
    >
      {/* サイズ別 */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          サイズ別
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <LinkTag {...XSmall.args} />
          <LinkTag {...Small.args} />
          <LinkTag {...Medium.args} />
        </div>
      </div>

      {/* 状態別 */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          状態別
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <LinkTag {...Default.args} />
          <LinkTag {...Hover.args} />
          <LinkTag {...Active.args} />
          <LinkTag {...Focus.args} />
        </div>
      </div>

      {/* サイズ × 状態の組み合わせ */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          サイズ × 状態の組み合わせ
        </h3>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ marginBottom: '8px', color: '#888', fontSize: '12px' }}>
            x-small
          </h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <LinkTag {...XSmall.args} state="default" />
            <LinkTag {...XSmall.args} state="hover" />
            <LinkTag {...XSmall.args} state="active" />
            <LinkTag {...XSmall.args} state="focus" />
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ marginBottom: '8px', color: '#888', fontSize: '12px' }}>
            small
          </h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <LinkTag {...Small.args} state="default" />
            <LinkTag {...Small.args} state="hover" />
            <LinkTag {...Small.args} state="active" />
            <LinkTag {...Small.args} state="focus" />
          </div>
        </div>

        <div>
          <h4 style={{ marginBottom: '8px', color: '#888', fontSize: '12px' }}>
            medium
          </h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <LinkTag {...Medium.args} state="default" />
            <LinkTag {...Medium.args} state="hover" />
            <LinkTag {...Medium.args} state="active" />
            <LinkTag {...Medium.args} state="focus" />
          </div>
        </div>
      </div>
    </div>
  ),
};
