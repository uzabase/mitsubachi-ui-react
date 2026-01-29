import type { Meta, StoryObj } from '@storybook/react-vite';

import { LinkTag } from '../../src/components/link-tag';

const meta = {
  title: 'Components/LinkTag',
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
export const StateDefault: Story = {
  args: {
    ...Medium.args,
    text: 'Default',
    state: 'default',
  },
};

/**
 * Hover状態
 */
export const StateHover: Story = {
  args: {
    ...Medium.args,
    text: 'Hover',
    state: 'hover',
  },
};

/**
 * Active状態
 */
export const StateActive: Story = {
  args: {
    ...Medium.args,
    text: 'Active',
    state: 'active',
  },
};

/**
 * Focus状態
 */
export const StateFocus: Story = {
  args: {
    ...Medium.args,
    text: 'Focus',
    state: 'focus',
  },
};

/**
 * すべての状態を一覧表示
 */
export const AllStates: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '40px',
      }}
    >
      {/* 状態別 */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          状態別
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <LinkTag {...StateDefault.args} />
          <LinkTag {...StateHover.args} />
          <LinkTag {...StateActive.args} />
          <LinkTag {...StateFocus.args} />
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

/**
 * すべてのサイズを一覧表示
 */
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '40px',
      }}
    >
      {/* サイズ使用ガイドライン */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          サイズ使用ガイドライン
        </h3>
        <ul
          style={{
            marginBottom: '16px',
            color: '#666',
            fontSize: '12px',
            lineHeight: '1.6',
          }}
        >
          <li>
            <strong>x-small</strong>: 文中や文末に置くときは、x-smallを使用。
          </li>
          <li>
            <strong>small</strong>:
            原則はmediumだが、12pxの文字列と並べて配置するときは、smallサイズでもOK
          </li>
          <li>
            <strong>medium</strong>: 原則、mediumを使用。
          </li>
        </ul>
      </div>

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
          <LinkTag {...StateDefault.args} />
          <LinkTag {...StateHover.args} />
          <LinkTag {...StateActive.args} />
          <LinkTag {...StateFocus.args} />
        </div>
      </div>

      {/* 実際の使用例 */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          実際の使用例
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <LinkTag {...Medium.args} text="カテゴリA" />
          <LinkTag {...Medium.args} text="カテゴリB" />
          <LinkTag {...Medium.args} text="タグ1" />
          <LinkTag {...Small.args} text="タグ2" />
          <LinkTag {...Small.args} text="タグ3" />
          <LinkTag {...XSmall.args} text="小タグ" />
        </div>
      </div>

      {/* インタラクション状態の説明 */}
      <div>
        <h3 style={{ marginBottom: '16px', color: '#666', fontSize: '14px' }}>
          インタラクション状態
        </h3>
        <p style={{ marginBottom: '12px', color: '#666', fontSize: '12px' }}>
          通常はCSS疑似クラス（:hover, :active,
          :focus）で自動的に状態が適用されますが、
          stateプロパティを使用することで状態を固定表示できます。
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <LinkTag {...Medium.args} text="マウスを乗せてみてください" />
          <LinkTag {...Medium.args} text="クリックしてみてください" />
          <LinkTag {...Medium.args} text="Tabでフォーカス" />
        </div>
      </div>
    </div>
  ),
};
