import type { Meta, StoryObj } from '@storybook/react-vite';

import { Tooltip } from '../tooltip';

/** サンプルテキスト */
const sampleContent = 'ここにヒントを表示';

/** 長いサンプルテキスト（折り返し確認用） */
const sampleLongContent =
  'ここにヒントを表示ここにヒントを表示ここにヒントを表示ここにヒントを表示';

const meta = {
  title: 'Components/Tooltip/vrt',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    side: {
      control: 'select',
      options: ['top', 'bottom', 'start', 'end'],
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
 * 上部に表示
 */
export const Top: Story = {
  args: {
    content: sampleContent,
    side: 'top',
    children: <button type="button">Top</button>,
  },
};

/**
 * 下部に表示
 */
export const Bottom: Story = {
  args: {
    content: sampleContent,
    side: 'bottom',
    children: <button type="button">Bottom</button>,
  },
};

/**
 * 開始側に表示
 */
export const Start: Story = {
  args: {
    content: sampleContent,
    side: 'start',
    children: <button type="button">Start</button>,
  },
};

/**
 * 終了側に表示
 */
export const End: Story = {
  args: {
    content: sampleContent,
    side: 'end',
    children: <button type="button">End</button>,
  },
};

/**
 * 配置調整: 開始寄せ
 */
export const AlignStart: Story = {
  args: {
    content: sampleContent,
    side: 'top',
    align: 'start',
    children: <button type="button">Align Start</button>,
  },
};

/**
 * 配置調整: 終了寄せ
 */
export const AlignEnd: Story = {
  args: {
    content: sampleContent,
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
    content: '',
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
          <Tooltip {...Top.args} content={sampleLongContent} align="start">
            <button type="button">align: start</button>
          </Tooltip>
          <Tooltip {...Top.args} content={sampleLongContent} align="center">
            <button type="button">align: center</button>
          </Tooltip>
          <Tooltip {...Top.args} content={sampleLongContent} align="end">
            <button type="button">align: end</button>
          </Tooltip>
        </div>
      </div>

      {/* Side: Bottom */}
      <div>
        <h3 style={{ marginBottom: '20px', color: '#666' }}>side: bottom</h3>
        <div style={{ display: 'flex', gap: '40px' }}>
          <Tooltip {...Bottom.args} content={sampleLongContent} align="start">
            <button type="button">align: start</button>
          </Tooltip>
          <Tooltip {...Bottom.args} content={sampleLongContent} align="center">
            <button type="button">align: center</button>
          </Tooltip>
          <Tooltip {...Bottom.args} content={sampleLongContent} align="end">
            <button type="button">align: end</button>
          </Tooltip>
        </div>
      </div>

      {/* Side: Start */}
      <div>
        <h3 style={{ marginBottom: '20px', color: '#666' }}>side: start</h3>
        <div style={{ display: 'flex', gap: '40px' }}>
          <Tooltip {...Start.args} content={sampleLongContent} align="start">
            <button type="button">align: start</button>
          </Tooltip>
          <Tooltip {...Start.args} content={sampleLongContent} align="center">
            <button type="button">align: center</button>
          </Tooltip>
          <Tooltip {...Start.args} content={sampleLongContent} align="end">
            <button type="button">align: end</button>
          </Tooltip>
        </div>
      </div>

      {/* Side: End */}
      <div>
        <h3 style={{ marginBottom: '20px', color: '#666' }}>side: end</h3>
        <div style={{ display: 'flex', gap: '40px' }}>
          <Tooltip {...End.args} content={sampleLongContent} align="start">
            <button type="button">align: start</button>
          </Tooltip>
          <Tooltip {...End.args} content={sampleLongContent} align="center">
            <button type="button">align: center</button>
          </Tooltip>
          <Tooltip {...End.args} content={sampleLongContent} align="end">
            <button type="button">align: end</button>
          </Tooltip>
        </div>
      </div>
    </div>
  ),
};
