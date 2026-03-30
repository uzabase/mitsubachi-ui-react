import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

import { SectionTab } from '../../../src/components/section-tab/section-tab';
import { SectionTabGroup } from '../../../src/components/section-tab/section-tab-group';

/**
 * ダミーの国旗コンポーネント（ストーリー用）
 */
function JpnFlag() {
  return (
    <svg
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18" height="11" rx="1" fill="white" />
      <rect
        x="0.25"
        y="0.25"
        width="17.5"
        height="10.5"
        rx="0.75"
        stroke="black"
        strokeOpacity="0.1"
        strokeWidth="0.5"
      />
      <circle cx="9" cy="5.5" r="3" fill="#BC002D" />
    </svg>
  );
}

function UsaFlag() {
  return (
    <svg
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18" height="11" rx="1" fill="#B22234" />
      <rect y="1.57" width="18" height="0.85" fill="white" />
      <rect y="3.14" width="18" height="0.85" fill="white" />
      <rect y="4.71" width="18" height="0.85" fill="white" />
      <rect y="6.29" width="18" height="0.85" fill="white" />
      <rect y="7.86" width="18" height="0.85" fill="white" />
      <rect y="9.43" width="18" height="0.85" fill="white" />
      <rect width="7.2" height="5.5" fill="#3C3B6E" />
    </svg>
  );
}

const meta = {
  title: 'Components/SectionTab/SectionTab',
  component: SectionTab,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ページ内セクションの切り替えに使用する個別タブです。',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description: 'タブの値',
    },
    children: {
      control: 'text',
      description: 'タブに表示するテキスト',
    },
    disabled: {
      control: 'boolean',
      description: '無効化状態',
    },
  },
  decorators: [
    (Story) => (
      <SectionTabGroup defaultValue={null}>
        <SectionTabGroup.List>
          <Story />
        </SectionTabGroup.List>
      </SectionTabGroup>
    ),
  ],
} satisfies Meta<typeof SectionTab>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==============================
   未選択状態
   ============================== */

/**
 * 未選択のデフォルト状態
 */
export const Normal: Story = {
  args: {
    value: 'normal',
    children: 'Label',
  },
};

/**
 * Hover 状態（未選択）
 */
export const Hover: Story = {
  args: {
    value: 'hover',
    children: 'Label',
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * Active 状態（未選択）
 */
export const Active: Story = {
  args: {
    value: 'active',
    children: 'Label',
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

/**
 * Focus 状態
 */
export const Focus: Story = {
  args: {
    value: 'focus',
    children: 'Label',
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};

/**
 * 無効化状態（未選択）
 */
export const Disabled: Story = {
  args: {
    value: 'disabled',
    children: 'Label',
    disabled: true,
  },
};

/* ==============================
   選択状態
   ============================== */

const selectedDecorator: Decorator = (Story) => (
  <SectionTabGroup defaultValue="current">
    <SectionTabGroup.List>
      <Story />
    </SectionTabGroup.List>
  </SectionTabGroup>
);

/**
 * 選択状態
 */
export const Selected: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    children: 'Label',
  },
};

/**
 * 選択 + Focus 状態
 */
export const SelectedFocus: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    children: 'Label',
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};

/**
 * 選択 + 無効化状態
 */
export const SelectedDisabled: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    children: 'Label',
    disabled: true,
  },
};

/* ==============================
   国旗付き
   ============================== */

/**
 * 国旗付きタブ（選択）
 */
export const WithFlag: Story = {
  decorators: [selectedDecorator],
  args: {
    value: 'current',
    children: 'JPN',
    flag: <JpnFlag />,
  },
};

/**
 * 国旗付きタブ（未選択）
 */
export const WithFlagUnselected: Story = {
  args: {
    value: 'unselected',
    children: 'USA',
    flag: <UsaFlag />,
  },
};

/**
 * 国旗付きタブ（無効化）
 */
export const WithFlagDisabled: Story = {
  args: {
    value: 'disabled-flag',
    children: 'JPN',
    flag: <JpnFlag />,
    disabled: true,
  },
};

/* ==============================
   全状態一覧
   ============================== */

/**
 * 全状態の一覧表示
 */
export const AllStates: StoryObj = {
  decorators: [],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>未選択タブ</p>
        <SectionTabGroup defaultValue={null}>
          <SectionTabGroup.List>
            <SectionTab value="default">Default</SectionTab>
            <SectionTab value="disabled" disabled>
              Disabled
            </SectionTab>
          </SectionTabGroup.List>
        </SectionTabGroup>
      </div>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>選択タブ</p>
        <SectionTabGroup defaultValue="selected">
          <SectionTabGroup.List>
            <SectionTab value="selected">Selected</SectionTab>
            <SectionTab value="selected-disabled" disabled>
              Selected + Disabled
            </SectionTab>
          </SectionTabGroup.List>
        </SectionTabGroup>
      </div>
      <div>
        <p style={{ marginBlockEnd: '8px', fontWeight: 'bold' }}>
          国旗付き / 国旗なし
        </p>
        <SectionTabGroup defaultValue="jpn">
          <SectionTabGroup.List>
            <SectionTab value="jpn" flag={<JpnFlag />}>
              JPN
            </SectionTab>
            <SectionTab value="usa" flag={<UsaFlag />}>
              USA
            </SectionTab>
            <SectionTab value="europe">ヨーロッパ</SectionTab>
          </SectionTabGroup.List>
        </SectionTabGroup>
      </div>
    </div>
  ),
};
