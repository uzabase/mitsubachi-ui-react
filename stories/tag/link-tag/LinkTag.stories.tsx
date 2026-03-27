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
          'コンテンツの属性や分類を簡潔に示すクリック可能なタグコンポーネントです。',
      },
    },
  },
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
    href: {
      control: 'text',
      description: 'リンク先のURL（指定するとa要素として動作）',
    },
    'aria-label': {
      control: 'text',
      description: 'アクセシビリティラベル',
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
 * すべてのサイズを一覧表示
 */
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        padding: '40px',
        flexWrap: 'wrap',
      }}
    >
      <LinkTag text="x-small" size="x-small" href="#" />
      <LinkTag text="small" size="small" href="#" />
      <LinkTag text="medium" size="medium" href="#" />
    </div>
  ),
};

/**
 * Normal状態（デフォルト）
 */
export const Normal: Story = {
  args: {
    text: 'Normal',
    size: 'medium',
    href: '#',
  },
};

/**
 * Hover状態
 */
export const Hover: Story = {
  args: {
    text: 'Hover',
    size: 'medium',
    href: '#',
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * Active状態
 */
export const Active: Story = {
  args: {
    text: 'Active',
    size: 'medium',
    href: '#',
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

/**
 * Focus状態
 */
export const Focus: Story = {
  args: {
    text: 'Focus',
    size: 'medium',
    href: '#',
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};

/**
 * すべての状態を一覧表示
 */
export const AllStates: Story = {
  args: {
    ...Normal.args,
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        padding: '40px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      <LinkTag text="Normal" size="medium" href="#" />
      <LinkTag text="x-small" size="x-small" href="#" />
      <LinkTag text="small" size="small" href="#" />
      <LinkTag text="medium" size="medium" href="#" />
    </div>
  ),
};
