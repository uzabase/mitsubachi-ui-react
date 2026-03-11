import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MenuButton } from '../../../src/components/button/menu-button';
import { DummyIcon } from '../../../src/icons';

const meta = {
  title: 'Components/Button/MenuButton',
  component: MenuButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Menuを表示するためのトリガーとなるボタンコンポーネントです。\n' +
          'クリック（またはタップ）することで、関連するメニューを展開し、複数の操作や遷移先を提示します。\n' +
          '`MenuButton` は「操作の入り口」であり、現在の値を表示・選択する目的では使用しません。\n\n' +
          '> **⚠️注意:** `MenuButton` は単体使用せず、必ず `Menu` コンポーネントと組み合わせて使用してください。また、「何が選ばれているか」という状態（State）を示す場合は、`Select-box` コンポーネントを使用してください。\n\n',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'ボタンのバリアント（表示スタイル）',
    },
    size: {
      control: 'radio',
      options: ['medium', 'large', 'x-large'],
      description: 'ボタンのサイズ',
    },
    loading: {
      control: 'boolean',
      description: 'ローディング状態',
    },
    disabled: {
      control: 'boolean',
      description: '無効化状態',
    },
    icon: {
      control: false,
      description: '先頭に表示するオプショナルアイコン',
    },
  },
} satisfies Meta<typeof MenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Normal (Default State)
 */
export const Normal: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    children: 'Label',
  },
};

/**
 * Hover
 */
export const Hover: Story = {
  args: {
    ...Normal.args,
  },
  parameters: {
    pseudo: { hover: true },
  },
};

/**
 * Active
 */
export const Active: Story = {
  args: {
    ...Normal.args,
  },
  parameters: {
    pseudo: { active: true },
  },
};

/**
 * Focus
 */
export const Focus: Story = {
  args: {
    ...Normal.args,
  },
  parameters: {
    pseudo: { focusVisible: true },
  },
};

/**
 * Loading
 */
export const Loading: Story = {
  args: {
    ...Normal.args,
    loading: true,
  },
};

/**
 * Disabled
 */
export const Disabled: Story = {
  args: {
    ...Normal.args,
    disabled: true,
  },
};

/**
 * アイコン付き
 */
export const WithIcon: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    children: 'Label',
    icon: <DummyIcon size={18} />,
  },
};

/**
 * Primary バリアント（全サイズ）
 */
export const Primary: Story = {
  args: {
    ...Normal.args,
    variant: 'primary',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'center',
        padding: '40px',
      }}
    >
      <MenuButton {...args} size="medium">
        Label
      </MenuButton>
      <MenuButton {...args} size="large">
        Label
      </MenuButton>
      <MenuButton {...args} size="x-large">
        Label
      </MenuButton>
    </div>
  ),
};

/**
 * Secondary バリアント（全サイズ）
 */
export const Secondary: Story = {
  args: {
    ...Normal.args,
    variant: 'secondary',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '40px',
      }}
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <MenuButton {...args} size="medium">
          Label
        </MenuButton>
        <MenuButton {...args} size="large">
          Label
        </MenuButton>
        <MenuButton {...args} size="x-large">
          Label
        </MenuButton>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <MenuButton {...args} size="medium" icon={<DummyIcon size={18} />}>
          Label
        </MenuButton>
        <MenuButton {...args} size="large" icon={<DummyIcon size={20} />}>
          Label
        </MenuButton>
        <MenuButton {...args} size="x-large" icon={<DummyIcon size={24} />}>
          Label
        </MenuButton>
      </div>
    </div>
  ),
};

/**
 * Ghost バリアント（全サイズ）
 */
export const Ghost: Story = {
  args: {
    ...Normal.args,
    variant: 'ghost',
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '40px',
      }}
    >
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <MenuButton {...args} size="medium">
          Label
        </MenuButton>
        <MenuButton {...args} size="large">
          Label
        </MenuButton>
        <MenuButton {...args} size="x-large">
          Label
        </MenuButton>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <MenuButton {...args} size="medium" icon={<DummyIcon size={18} />}>
          Label
        </MenuButton>
        <MenuButton {...args} size="large" icon={<DummyIcon size={20} />}>
          Label
        </MenuButton>
        <MenuButton {...args} size="x-large" icon={<DummyIcon size={24} />}>
          Label
        </MenuButton>
      </div>
    </div>
  ),
};

/**
 * すべてのバリアントとサイズを一覧表示
 */
export const AllVariants: Story = {
  args: {
    ...Normal.args,
  },
  render: () => {
    const sizes = ['medium', 'large', 'x-large'] as const;
    const iconSizes = { medium: 18, large: 20, 'x-large': 24 } as const;
    const variants = [
      { label: 'Primary', variant: 'primary' as const },
      { label: 'Secondary', variant: 'secondary' as const },
      { label: 'Ghost', variant: 'ghost' as const },
    ];

    const stateLabels = [
      'Default',
      'Hover',
      'Active',
      'Focus',
      'Loading',
      'Disabled',
    ];

    return (
      <div style={{ padding: '40px', backgroundColor: '#f5f5f5' }}>
        {sizes.map((size) => (
          <div key={size} style={{ marginBlockEnd: '48px' }}>
            <h3
              style={{
                marginBlockEnd: '16px',
                color: '#333',
                fontSize: '14px',
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
            >
              {size}
            </h3>

            {/* 状態ラベルヘッダー */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '120px repeat(6, 1fr)',
                gap: '8px',
                alignItems: 'center',
                justifyItems: 'center',
                marginBlockEnd: '8px',
              }}
            >
              <div />
              {stateLabels.map((label) => (
                <span
                  key={label}
                  style={{
                    fontSize: '11px',
                    color: '#666',
                    textAlign: 'center',
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            {variants.map((row) => (
              <React.Fragment key={row.variant}>
                {/* テキストのみ */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px repeat(6, 1fr)',
                    gap: '8px',
                    alignItems: 'center',
                    justifyItems: 'center',
                    marginBlockEnd: '8px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#666',
                    }}
                  >
                    {row.label}
                  </span>
                  <MenuButton variant={row.variant} size={size}>
                    Label
                  </MenuButton>
                  <MenuButton variant={row.variant} size={size}>
                    Label
                  </MenuButton>
                  <MenuButton variant={row.variant} size={size}>
                    Label
                  </MenuButton>
                  <MenuButton variant={row.variant} size={size}>
                    Label
                  </MenuButton>
                  <MenuButton variant={row.variant} size={size} loading>
                    Label
                  </MenuButton>
                  <MenuButton variant={row.variant} size={size} disabled>
                    Label
                  </MenuButton>
                </div>

                {/* アイコン付き */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '120px repeat(6, 1fr)',
                    gap: '8px',
                    alignItems: 'center',
                    justifyItems: 'center',
                    marginBlockEnd: '16px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#666',
                    }}
                  >
                    {row.label} + Icon
                  </span>
                  <MenuButton
                    variant={row.variant}
                    size={size}
                    icon={<DummyIcon size={iconSizes[size]} />}
                  >
                    Label
                  </MenuButton>
                  <MenuButton
                    variant={row.variant}
                    size={size}
                    icon={<DummyIcon size={iconSizes[size]} />}
                  >
                    Label
                  </MenuButton>
                  <MenuButton
                    variant={row.variant}
                    size={size}
                    icon={<DummyIcon size={iconSizes[size]} />}
                  >
                    Label
                  </MenuButton>
                  <MenuButton
                    variant={row.variant}
                    size={size}
                    icon={<DummyIcon size={iconSizes[size]} />}
                  >
                    Label
                  </MenuButton>
                  <MenuButton
                    variant={row.variant}
                    size={size}
                    icon={<DummyIcon size={iconSizes[size]} />}
                    loading
                  >
                    Label
                  </MenuButton>
                  <MenuButton
                    variant={row.variant}
                    size={size}
                    icon={<DummyIcon size={iconSizes[size]} />}
                    disabled
                  >
                    Label
                  </MenuButton>
                </div>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
