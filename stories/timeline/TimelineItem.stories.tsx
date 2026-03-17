import type { Meta, StoryObj } from '@storybook/react-vite';

import { Timeline } from '../../src/components/timeline/timeline';
import { TimelineItem } from '../../src/components/timeline/timeline-item';

/* ---------- Story helpers ---------- */

const textStyle: React.CSSProperties = {
  fontSize: '14px',
  letterSpacing: '0.02em',
};

const meta = {
  title: 'Components/Timeline/TimelineItem',
  component: TimelineItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '時系列の個別アイテムです。\n\n' +
          '`emphasized` を指定すると、ドットが有彩色になり重要な出来事を強調できます。\n\n' +
          '> **⚠️注意:** 必ず `<Timeline>` の子要素として使用してください（`<Timeline.Item>` で参照可能）。Timeline の外で使用するとエラーになります。\n\n' +
          '## 使用例\n\n' +
          '```tsx\n' +
          '<Timeline>\n' +
          '  <Timeline.Item>2024年05月 CEO室 マネジャー</Timeline.Item>\n' +
          '  <Timeline.Item emphasized>2024年05月 CEO室 マネジャー</Timeline.Item>\n' +
          '</Timeline>\n' +
          '```',
      },
    },
  },
  tags: ['autodocs'],
  args: {
    children: undefined,
  },
  argTypes: {
    emphasized: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <Timeline>
        <Story />
      </Timeline>
    ),
  ],
} satisfies Meta<typeof TimelineItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==============================
   デフォルト
   ============================== */

/**
 * デフォルト表示
 */
export const Default: Story = {
  args: {
    emphasized: false,
  },
  render: (args) => (
    <TimelineItem {...args}>
      <span style={textStyle}>2024年05月 CEO室 マネジャー</span>
    </TimelineItem>
  ),
};

/* ==============================
   強調表示
   ============================== */

/**
 * 強調表示
 *
 * 最も重要な出来事や、現在のステータスなどに使用します。
 */
export const Emphasized: Story = {
  args: {
    emphasized: true,
  },
  render: (args) => (
    <TimelineItem {...args}>
      <span style={textStyle}>2024年05月 在籍中 CEO室 マネジャー</span>
    </TimelineItem>
  ),
};
