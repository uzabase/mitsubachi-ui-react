import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButton } from '../../src/components/icon-button';
import { DummyIcon } from '../../src/icons';

const meta = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost'],
      description: 'ボタンのバリアント（表示スタイル）',
    },
    size: {
      control: 'radio',
      options: ['small', 'medium', 'large'],
      description: 'ボタンのサイズ',
    },
    selected: {
      control: 'boolean',
      description: '選択状態（secondary, tertiary, ghostのみ）',
    },
    loading: {
      control: 'boolean',
      description: 'ローディング状態',
    },
    disabled: {
      control: 'boolean',
      description: '無効化状態',
    },
    tooltip: {
      control: 'boolean',
      description: 'ツールチップの表示/非表示',
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Normal (Default State)
 */
export const Normal: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    'aria-label': 'アクション',
    children: <DummyIcon size={20} />,
  },
};

/**
 * Hover
 * ブラウザでボタンにマウスオーバーして確認してください
 */
export const Hover: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    'aria-label': 'アクション',
    tooltip: false,
    children: <DummyIcon size={20} />,
  },
  parameters: {
    pseudo: { hover: true },
  },
};

/**
 * Active
 * ブラウザでボタンをクリックして確認してください
 */
export const Active: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    'aria-label': 'アクション',
    tooltip: false,
    children: <DummyIcon size={20} />,
  },
  parameters: {
    pseudo: { active: true },
  },
};

/**
 * Focus
 * キーボードのTabキーでフォーカスを当てて確認してください
 */
export const Focus: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    'aria-label': 'アクション',
    tooltip: false,
    children: <DummyIcon size={20} />,
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
    variant: 'primary',
    size: 'medium',
    loading: true,
    'aria-label': '処理中',
    children: <DummyIcon size={20} />,
  },
};

/**
 * Disabled
 */
export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: true,
    'aria-label': 'アクション',
    children: <DummyIcon size={20} />,
  },
};

/**
 * Primary
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
      <IconButton {...args} size="small">
        <DummyIcon size={18} />
      </IconButton>
      <IconButton {...args} size="medium">
        <DummyIcon size={20} />
      </IconButton>
      <IconButton {...args} size="large">
        <DummyIcon size={24} />
      </IconButton>
    </div>
  ),
};

/**
 * Secondary
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
        <IconButton {...args} size="small">
          <DummyIcon size={18} />
        </IconButton>
        <IconButton {...args} size="medium">
          <DummyIcon size={20} />
        </IconButton>
        <IconButton {...args} size="large">
          <DummyIcon size={24} />
        </IconButton>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <IconButton {...args} size="small" selected>
          <DummyIcon size={18} />
        </IconButton>
        <IconButton {...args} size="medium" selected>
          <DummyIcon size={20} />
        </IconButton>
        <IconButton {...args} size="large" selected>
          <DummyIcon size={24} />
        </IconButton>
      </div>
    </div>
  ),
};

/**
 * Tertiary
 */
export const Tertiary: Story = {
  args: {
    ...Normal.args,
    variant: 'tertiary',
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
        <IconButton {...args} size="small">
          <DummyIcon size={18} />
        </IconButton>
        <IconButton {...args} size="medium">
          <DummyIcon size={20} />
        </IconButton>
        <IconButton {...args} size="large">
          <DummyIcon size={24} />
        </IconButton>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <IconButton {...args} size="small" selected>
          <DummyIcon size={18} />
        </IconButton>
        <IconButton {...args} size="medium" selected>
          <DummyIcon size={20} />
        </IconButton>
        <IconButton {...args} size="large" selected>
          <DummyIcon size={24} />
        </IconButton>
      </div>
    </div>
  ),
};

/**
 * Ghost
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
        <IconButton {...args} size="small">
          <DummyIcon size={18} />
        </IconButton>
        <IconButton {...args} size="medium">
          <DummyIcon size={20} />
        </IconButton>
        <IconButton {...args} size="large">
          <DummyIcon size={24} />
        </IconButton>
      </div>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <IconButton {...args} size="small" selected>
          <DummyIcon size={18} />
        </IconButton>
        <IconButton {...args} size="medium" selected>
          <DummyIcon size={20} />
        </IconButton>
        <IconButton {...args} size="large" selected>
          <DummyIcon size={24} />
        </IconButton>
      </div>
    </div>
  ),
};

/**
 * ツールチップなし（title属性にフォールバック）
 */
export const WithoutTooltip: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    'aria-label': 'アクション',
    tooltip: false,
    children: <DummyIcon size={20} />,
  },
};

/**
 * すべてのバリアントとサイズを一覧表示
 */
export const AllVariants: Story = {
  args: {
    ...Normal.args,
  },
  render: () => {
    const sizes = ['small', 'medium', 'large'] as const;
    const iconSizes = { small: 18, medium: 20, large: 24 } as const;

    // 各行: [label, variant, selected?]
    const rows: Array<{
      label: string;
      variant: 'primary' | 'secondary' | 'tertiary' | 'ghost';
      selected?: boolean;
    }> = [
      { label: 'Primary', variant: 'primary' },
      { label: 'Secondary', variant: 'secondary' },
      { label: 'Secondary Selected', variant: 'secondary', selected: true },
      { label: 'Tertiary', variant: 'tertiary' },
      { label: 'Tertiary Selected', variant: 'tertiary', selected: true },
      { label: 'Ghost', variant: 'ghost' },
      { label: 'Ghost Selected', variant: 'ghost', selected: true },
    ];

    return (
      <div
        style={{
          padding: '40px',
          backgroundColor: '#f5f5f5',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, auto)',
            gap: '32px',
          }}
        >
          {sizes.map((size) => (
            <div key={size}>
              <h3
                style={{
                  marginBottom: '16px',
                  color: '#333',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  textTransform: 'capitalize',
                  textAlign: 'center',
                }}
              >
                {size}
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, auto)',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
                {rows.map((row) => (
                  <React.Fragment key={`${row.variant}-${row.selected}`}>
                    {/* Default */}
                    <IconButton
                      key={`${row.variant}-${row.selected}-default`}
                      variant={row.variant}
                      size={size}
                      selected={row.selected}
                      tooltip={false}
                      aria-label="Default"
                    >
                      <DummyIcon size={iconSizes[size]} />
                    </IconButton>

                    {/* Hover */}
                    <div key={`${row.variant}-${row.selected}-hover`}>
                      <IconButton
                        variant={row.variant}
                        size={size}
                        selected={row.selected}
                        tooltip={false}
                        aria-label="Hover"
                      >
                        <DummyIcon size={iconSizes[size]} />
                      </IconButton>
                    </div>

                    {/* Active */}
                    <div key={`${row.variant}-${row.selected}-active`}>
                      <IconButton
                        variant={row.variant}
                        size={size}
                        selected={row.selected}
                        tooltip={false}
                        aria-label="Active"
                      >
                        <DummyIcon size={iconSizes[size]} />
                      </IconButton>
                    </div>

                    {/* Focus */}
                    <div key={`${row.variant}-${row.selected}-focus`}>
                      <IconButton
                        variant={row.variant}
                        size={size}
                        selected={row.selected}
                        tooltip={false}
                        aria-label="Focus"
                      >
                        <DummyIcon size={iconSizes[size]} />
                      </IconButton>
                    </div>

                    {/* Loading */}
                    <IconButton
                      key={`${row.variant}-${row.selected}-loading`}
                      variant={row.variant}
                      size={size}
                      selected={row.selected}
                      loading
                      tooltip={false}
                      aria-label="Loading"
                    >
                      <DummyIcon size={iconSizes[size]} />
                    </IconButton>

                    {/* Disabled */}
                    <IconButton
                      key={`${row.variant}-${row.selected}-disabled`}
                      variant={row.variant}
                      size={size}
                      selected={row.selected}
                      disabled
                      tooltip={false}
                      aria-label="Disabled"
                    >
                      <DummyIcon size={iconSizes[size]} />
                    </IconButton>
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
