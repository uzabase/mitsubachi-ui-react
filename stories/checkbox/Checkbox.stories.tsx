import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Checkbox } from '../../src/components/checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '項目の選択・解除を行うコンポーネントです。',
      },
    },
  },
  argTypes: {
    checked: {
      control: 'boolean',
      description: 'チェック状態',
    },
    indeterminate: {
      control: 'boolean',
      description: '中間状態',
    },
    disabled: {
      control: 'boolean',
      description: '無効化状態',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ========================================
   動作確認
   ======================================== */

/**
 * クリックでチェック状態を切り替えられるインタラクティブなデモ
 */
export const Playground: Story = {
  args: {},
  render: function Render() {
    const [checked, setChecked] = useState(false);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Checkbox
          checked={checked}
          onCheckedChange={(value) => setChecked(value)}
        />
        <span style={{ fontSize: '14px' }}>
          {checked ? 'チェック済み' : '未チェック'}
        </span>
      </div>
    );
  },
};

/* ========================================
   未チェック状態
   ======================================== */

/**
 * 未チェック - デフォルト状態
 */
export const UncheckedDefault: Story = {
  args: {
    checked: false,
  },
};

/**
 * 未チェック - Hover状態
 */
export const UncheckedHover: Story = {
  args: {
    ...UncheckedDefault.args,
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * 未チェック - Active状態
 */
export const UncheckedActive: Story = {
  args: {
    ...UncheckedDefault.args,
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

/**
 * 未チェック - Focus状態
 */
export const UncheckedFocus: Story = {
  args: {
    ...UncheckedDefault.args,
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};

/**
 * 未チェック - Disabled状態
 */
export const UncheckedDisabled: Story = {
  args: {
    ...UncheckedDefault.args,
    disabled: true,
  },
};

/* ========================================
   チェック状態
   ======================================== */

/**
 * チェック - デフォルト状態
 */
export const CheckedDefault: Story = {
  args: {
    checked: true,
  },
};

/**
 * チェック - Hover状態
 */
export const CheckedHover: Story = {
  args: {
    ...CheckedDefault.args,
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * チェック - Active状態
 */
export const CheckedActive: Story = {
  args: {
    ...CheckedDefault.args,
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

/**
 * チェック - Focus状態
 */
export const CheckedFocus: Story = {
  args: {
    ...CheckedDefault.args,
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};

/**
 * チェック - Disabled状態
 */
export const CheckedDisabled: Story = {
  args: {
    ...CheckedDefault.args,
    disabled: true,
  },
};

/* ========================================
   中間状態
   ======================================== */

/**
 * 中間状態 - デフォルト
 */
export const IndeterminateDefault: Story = {
  args: {
    indeterminate: true,
  },
};

/**
 * 中間状態 - Hover
 */
export const IndeterminateHover: Story = {
  args: {
    ...IndeterminateDefault.args,
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * 中間状態 - Active
 */
export const IndeterminateActive: Story = {
  args: {
    ...IndeterminateDefault.args,
  },
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

/**
 * 中間状態 - Focus
 */
export const IndeterminateFocus: Story = {
  args: {
    ...IndeterminateDefault.args,
  },
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};

/**
 * 中間状態 - Disabled
 */
export const IndeterminateDisabled: Story = {
  args: {
    ...IndeterminateDefault.args,
    disabled: true,
  },
};

/* ========================================
   全状態一覧
   ======================================== */

/**
 * すべての状態を一覧表示
 */
export const AllStates: Story = {
  args: {
    checked: false,
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto repeat(3, 1fr)',
        gap: '12px',
        alignItems: 'center',
      }}
    >
      {/* ヘッダー */}
      <div />
      <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
        未チェック
      </div>
      <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
        チェック
      </div>
      <div style={{ fontSize: '12px', color: '#666', textAlign: 'center' }}>
        中間状態
      </div>

      {/* Default */}
      <div style={{ fontSize: '12px', color: '#666' }}>Default</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Checkbox checked={false} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Checkbox checked={true} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Checkbox indeterminate />
      </div>

      {/* Disabled */}
      <div style={{ fontSize: '12px', color: '#666' }}>Disabled</div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Checkbox checked={false} disabled />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Checkbox checked={true} disabled />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Checkbox indeterminate disabled />
      </div>
    </div>
  ),
};
