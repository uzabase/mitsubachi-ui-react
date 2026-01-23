import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from '../tooltip';

const meta = {
  title: 'Components/Tooltip/featureOff',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'inline-start', 'inline-end'],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 長いテキスト（max-width: 200pxを超える場合、テキストが折り返されます）
 */
export const LongText: Story = {
  args: {
    label:
      'これは非常に長いツールチップのテキストです。max-width: 200pxを超える場合、テキストは自動的に折り返されます。',
    children: <button type="button">長いテキスト</button>,
  },
};

/**
 * アイコンボタンの例
 */
export const IconButton: Story = {
  args: {
    label: '設定を開く',
    children: (
      <button
        type="button"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid #ccc',
          background: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-label="設定"
      >
        ⚙️
      </button>
    ),
  },
};

/**
 * フォーカス可能な要素（キーボードアクセシビリティ）
 */
export const FocusableElement: Story = {
  args: {
    label: 'Tabキーでフォーカスすると表示されます',
    children: (
      <button
        type="button"
        style={{
          textDecoration: 'underline',
          color: '#007bff',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        フォーカス可能なボタン
      </button>
    ),
  },
};
