import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from '../../src/components/tooltip';

/** サンプルテキスト */
const sampleContent = 'ここにヒントを表示';

/** 長いサンプルテキスト（折り返し確認用） */
const sampleLongContent =
  'ここにヒントを表示ここにヒントを表示ここにヒントを表示ここにヒントを表示';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'inline-start', 'inline-end'],
      description: '表示方向',
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end'],
      description: '配置調整',
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 基本的なツールチップの例
 */
export const Normal: Story = {
  args: {
    label: 'ツールチップの内容',
    children: <button type="button">ホバーしてください</button>,
  },
};

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

/**
 * 上部に表示
 */
export const Top: Story = {
  args: {
    label: sampleContent,
    side: 'top',
    children: <button type="button">Top</button>,
  },
};

/**
 * 下部に表示
 */
export const Bottom: Story = {
  args: {
    label: sampleContent,
    side: 'bottom',
    children: <button type="button">Bottom</button>,
  },
};

/**
 * 開始側に表示
 */
export const InlineStart: Story = {
  args: {
    label: sampleContent,
    side: 'inline-start',
    children: <button type="button">Inline Start</button>,
  },
};

/**
 * 終了側に表示
 */
export const InlineEnd: Story = {
  args: {
    label: sampleContent,
    side: 'inline-end',
    children: <button type="button">Inline End</button>,
  },
};

/**
 * 配置調整: 開始寄せ
 */
export const AlignStart: Story = {
  args: {
    label: sampleContent,
    side: 'top',
    align: 'start',
    children: <button type="button">Align Start</button>,
  },
};

/**
 * 配置調整: 中央
 */
export const AlignCenter: Story = {
  args: {
    label: sampleContent,
    side: 'top',
    align: 'center',
    children: <button type="button">Align Center</button>,
  },
};

/**
 * 配置調整: 終了寄せ
 */
export const AlignEnd: Story = {
  args: {
    label: sampleContent,
    side: 'top',
    align: 'end',
    children: <button type="button">Align End</button>,
  },
};

/**
 * すべての配置を一覧表示
 */
export const AllPlacements: Story = {
  args: {
    label: '',
    children: <button type="button">placeholder</button>,
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '60px',
        padding: '80px',
      }}
    >
      {/* Side: Top */}
      <div>
        <h3 style={{ marginBottom: '20px', color: '#666' }}>side: top</h3>
        <div style={{ display: 'flex', gap: '40px' }}>
          <Tooltip {...Top.args} label={sampleLongContent} align="start">
            <button type="button">align: start</button>
          </Tooltip>
          <Tooltip {...Top.args} label={sampleLongContent} align="center">
            <button type="button">align: center</button>
          </Tooltip>
          <Tooltip {...Top.args} label={sampleLongContent} align="end">
            <button type="button">align: end</button>
          </Tooltip>
        </div>
      </div>

      {/* Side: Bottom */}
      <div>
        <h3 style={{ marginBottom: '20px', color: '#666' }}>side: bottom</h3>
        <div style={{ display: 'flex', gap: '40px' }}>
          <Tooltip {...Bottom.args} label={sampleLongContent} align="start">
            <button type="button">align: start</button>
          </Tooltip>
          <Tooltip {...Bottom.args} label={sampleLongContent} align="center">
            <button type="button">align: center</button>
          </Tooltip>
          <Tooltip {...Bottom.args} label={sampleLongContent} align="end">
            <button type="button">align: end</button>
          </Tooltip>
        </div>
      </div>

      {/* Side: Inline Start */}
      <div>
        <h3 style={{ marginBottom: '20px', color: '#666' }}>
          side: inline-start
        </h3>
        <div style={{ display: 'flex', gap: '40px' }}>
          <Tooltip
            {...InlineStart.args}
            label={sampleLongContent}
            align="start"
          >
            <button type="button">align: start</button>
          </Tooltip>
          <Tooltip
            {...InlineStart.args}
            label={sampleLongContent}
            align="center"
          >
            <button type="button">align: center</button>
          </Tooltip>
          <Tooltip {...InlineStart.args} label={sampleLongContent} align="end">
            <button type="button">align: end</button>
          </Tooltip>
        </div>
      </div>

      {/* Side: Inline End */}
      <div>
        <h3 style={{ marginBottom: '20px', color: '#666' }}>
          side: inline-end
        </h3>
        <div style={{ display: 'flex', gap: '40px' }}>
          <Tooltip {...InlineEnd.args} label={sampleLongContent} align="start">
            <button type="button">align: start</button>
          </Tooltip>
          <Tooltip {...InlineEnd.args} label={sampleLongContent} align="center">
            <button type="button">align: center</button>
          </Tooltip>
          <Tooltip {...InlineEnd.args} label={sampleLongContent} align="end">
            <button type="button">align: end</button>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
};
