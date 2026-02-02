import type { Meta, StoryObj } from '@storybook/react-vite';

import { LinkTagGroup } from '../../../src/components/tag/link-tag-group';

const meta = {
  title: 'Components/Tag/LinkTagGroup',
  component: LinkTagGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '複数のLinkTagをグループ化して表示するコンポーネント。\n\n' +
          'タグは折り返しを許容します。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    tags: {
      description: '表示するタグの配列',
    },
  },
} satisfies Meta<typeof LinkTagGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的な使用例
 */
export const Default: Story = {
  args: {
    tags: [
      { text: 'Text', size: 'x-small', href: '#' },
      { text: 'Text', size: 'x-small', href: '#' },
      { text: 'Text', size: 'x-small', href: '#' },
      { text: 'Text', size: 'x-small', href: '#' },
      { text: 'Text', size: 'x-small', href: '#' },
      { text: 'Text', size: 'x-small', href: '#' },
      { text: 'Text', size: 'x-small', href: '#' },
      { text: 'Text', size: 'x-small', href: '#' },
      { text: 'Text', size: 'x-small', href: '#' },
      { text: 'Text', size: 'x-small', href: '#' },
    ],
  },
};

/**
 * 折り返しの確認
 */
export const Wrap: Story = {
  args: {
    tags: [
      { text: '#人工知能', size: 'medium', href: '#' },
      { text: '#BtoB', size: 'medium', href: '#' },
      { text: '#FinTech', size: 'medium', href: '#' },
      { text: '#サブスクリプション', size: 'medium', href: '#' },
      { text: '#金融', size: 'medium', href: '#' },
      { text: '#クラウドサービス', size: 'medium', href: '#' },
      { text: '#Text', size: 'medium', href: '#' },
      { text: '#Text', size: 'medium', href: '#' },
      { text: '#Text', size: 'medium', href: '#' },
      { text: '#Text', size: 'medium', href: '#' },
    ],
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <LinkTagGroup {...args} />
    </div>
  ),
};
