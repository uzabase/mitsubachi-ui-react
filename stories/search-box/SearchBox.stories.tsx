import type { Meta, StoryObj } from '@storybook/react-vite';

import { LabelUnit } from '../../src/components/label-unit';
import { SearchBox } from '../../src/components/search-box';

const meta = {
  title: 'Components/SearchBox',
  component: SearchBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'キーワード検索のための入力フィールドコンポーネントです。',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '256px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: '見た目のバリアント',
    },
    placeholder: {
      control: 'text',
      description: 'プレースホルダーテキスト',
    },
    disabled: {
      control: 'boolean',
      description: '無効化状態',
    },
  },
} satisfies Meta<typeof SearchBox>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==============================
   Primary バリアント
   ============================== */

/**
 * デフォルト状態（primary, desktop）
 */
export const Default: Story = {
  args: {
    placeholder: 'Placeholder',
    variant: 'primary',
  },
};

/**
 * テキスト入力済みの状態
 */
export const WithText: Story = {
  args: {
    defaultValue: 'Text',
    variant: 'primary',
  },
};

/* ==============================
   インタラクション状態: Primary（Pseudo States）
   ============================== */

/**
 * Primary: Hover状態
 */
export const PrimaryHover: Story = {
  args: {
    placeholder: 'Placeholder',
    variant: 'primary',
  },
  parameters: {
    pseudo: { hover: true },
  },
};

/**
 * Primary: Focus状態
 */
export const PrimaryFocus: Story = {
  args: {
    placeholder: 'Placeholder',
    variant: 'primary',
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
};

/**
 * Primary: Disabled状態
 */
export const PrimaryDisabled: Story = {
  args: {
    placeholder: 'Placeholder',
    variant: 'primary',
    disabled: true,
  },
};

/**
 * Primary: Disabled状態（テキスト入力済み）
 */
export const PrimaryDisabledWithText: Story = {
  args: {
    defaultValue: 'Text',
    variant: 'primary',
    disabled: true,
  },
};

/* ==============================
   Secondary バリアント
   ============================== */

/**
 * Secondary: デフォルト状態
 */
export const Secondary: Story = {
  args: {
    placeholder: 'Placeholder',
    variant: 'secondary',
  },
};

/**
 * Secondary: テキスト入力済みの状態
 */
export const SecondaryWithText: Story = {
  args: {
    defaultValue: 'Text',
    variant: 'secondary',
  },
};

/* ==============================
   インタラクション状態: Secondary（Pseudo States）
   ============================== */

/**
 * Secondary: Hover状態
 */
export const SecondaryHover: Story = {
  args: {
    placeholder: 'Placeholder',
    variant: 'secondary',
  },
  parameters: {
    pseudo: { hover: true },
  },
};

/**
 * Secondary: Focus状態
 */
export const SecondaryFocus: Story = {
  args: {
    placeholder: 'Placeholder',
    variant: 'secondary',
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
};

/**
 * Secondary: Disabled状態
 */
export const SecondaryDisabled: Story = {
  args: {
    placeholder: 'Placeholder',
    variant: 'secondary',
    disabled: true,
  },
};

/**
 * Secondary: Disabled状態（テキスト入力済み）
 */
export const SecondaryDisabledWithText: Story = {
  args: {
    defaultValue: 'Text',
    variant: 'secondary',
    disabled: true,
  },
};

/* ==============================
   ビューポート
   ============================== */

/**
 * Phone ビューポート（Primary）
 */
export const PhonePrimary: Story = {
  args: {
    placeholder: 'Placeholder',
    variant: 'primary',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/**
 * Phone ビューポート（Secondary）
 */
export const PhoneSecondary: Story = {
  args: {
    placeholder: 'Placeholder',
    variant: 'secondary',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

/* ==============================
   LabelUnit との併用
   ============================== */

const withLabelStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 'var(--spacing-medium, 8px)',
  width: '256px',
};

/**
 * ラベル（LabelUnit）と併用して「何を」検索するのかを明示することが望ましいです。
 * ラベルの併用が難しい場合は、プレースホルダーで補足してください。
 */
export const WithLabel: Story = {
  decorators: [
    () => (
      <div style={withLabelStyle}>
        <LabelUnit text="競合企業" htmlFor="search-competitor" />
        <SearchBox
          id="search-competitor"
          placeholder="企業を検索"
          variant="secondary"
        />
      </div>
    ),
  ],
};

/**
 * LabelUnit + 必須 + 補足テキスト
 */
export const WithLabelRequired: Story = {
  decorators: [
    () => (
      <div style={withLabelStyle}>
        <LabelUnit
          text="競合企業"
          required
          supportText="最大5社まで追加できます"
          htmlFor="search-competitor-required"
        />
        <SearchBox
          id="search-competitor-required"
          placeholder="企業を検索"
          variant="secondary"
        />
      </div>
    ),
  ],
};

/* ==============================
   全パターン一覧
   ============================== */

const labelStyle = {
  color: '#666',
  fontSize: '12px',
  margin: 0,
  whiteSpace: 'nowrap' as const,
};

const headerStyle = {
  ...labelStyle,
  fontWeight: 'bold' as const,
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'auto 256px 256px',
  gap: '24px 16px',
  alignItems: 'start',
  padding: '40px',
};

/**
 * 全状態一覧（Primary / Secondary 比較）
 */
export const AllStates: Story = {
  decorators: [
    () => (
      <div style={gridStyle}>
        <div />
        <p style={headerStyle}>Primary</p>
        <p style={headerStyle}>Secondary</p>

        <p style={labelStyle}>Default</p>
        <SearchBox placeholder="Placeholder" variant="primary" />
        <SearchBox placeholder="Placeholder" variant="secondary" />

        <p style={labelStyle}>Default (empty)</p>
        <SearchBox variant="primary" />
        <SearchBox variant="secondary" />

        <p style={labelStyle}>With Text</p>
        <SearchBox defaultValue="Text" variant="primary" />
        <SearchBox defaultValue="Text" variant="secondary" />

        <p style={labelStyle}>Disabled</p>
        <SearchBox placeholder="Placeholder" variant="primary" disabled />
        <SearchBox placeholder="Placeholder" variant="secondary" disabled />

        <p style={labelStyle}>Disabled (empty)</p>
        <SearchBox variant="primary" disabled />
        <SearchBox variant="secondary" disabled />

        <p style={labelStyle}>Disabled + Text</p>
        <SearchBox defaultValue="Text" variant="primary" disabled />
        <SearchBox defaultValue="Text" variant="secondary" disabled />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * 全状態一覧 Phone（Primary / Secondary 比較）
 */
export const AllStatesPhone: Story = {
  decorators: [
    () => (
      <div style={gridStyle}>
        <div />
        <p style={headerStyle}>Primary</p>
        <p style={headerStyle}>Secondary</p>

        <p style={labelStyle}>Default</p>
        <SearchBox placeholder="Placeholder" variant="primary" />
        <SearchBox placeholder="Placeholder" variant="secondary" />

        <p style={labelStyle}>With Text</p>
        <SearchBox defaultValue="Text" variant="primary" />
        <SearchBox defaultValue="Text" variant="secondary" />

        <p style={labelStyle}>Disabled</p>
        <SearchBox placeholder="Placeholder" variant="primary" disabled />
        <SearchBox placeholder="Placeholder" variant="secondary" disabled />

        <p style={labelStyle}>Disabled + Text</p>
        <SearchBox defaultValue="Text" variant="primary" disabled />
        <SearchBox defaultValue="Text" variant="secondary" disabled />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
