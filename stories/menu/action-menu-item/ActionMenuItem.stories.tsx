import { useRef } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from '@base-ui/react/menu';
import { ActionMenuItem } from '../../../src/components/menu';
import { IconButton } from '../../../src/components/button';
import { DummyIcon } from '../../../src/icons';

/** もっと見る（縦3点）アイコン */
const MoreVerticalIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M11.4167 4.75C11.4167 5.53333 10.7833 6.16667 10 6.16667C9.21667 6.16667 8.58333 5.525 8.58333 4.75C8.58333 3.975 9.21667 3.33333 10 3.33333C10.7833 3.33333 11.4167 3.975 11.4167 4.75ZM11.4167 9.99167C11.4167 9.20833 10.7833 8.575 10 8.575C9.21667 8.575 8.58333 9.20833 8.58333 9.99167C8.58333 10.775 9.21667 11.4083 10 11.4083C10.7833 11.4083 11.4167 10.775 11.4167 9.99167ZM11.4167 15.25C11.4167 14.475 10.7833 13.8333 10 13.8333C9.21667 13.8333 8.58333 14.4667 8.58333 15.25C8.58333 16.0333 9.21667 16.6667 10 16.6667C10.7833 16.6667 11.4167 16.0333 11.4167 15.25Z"
      fill="currentColor"
    />
  </svg>
);

/** 編集アイコン */
const PencilIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4.167 15.833h1.178l8.282-8.282-1.178-1.178-8.282 8.282v1.178Zm-1.25 1.25v-2.768l9.591-9.574 2.768 2.75-9.591 9.592H2.917Zm11.18-10.001-1.57-1.57 1.57 1.57Z"
      fill="currentColor"
    />
  </svg>
);

/** コピーアイコン */
const CopyIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M7.5 14.167c-.458 0-.85-.163-1.177-.49a1.605 1.605 0 0 1-.49-1.177V3.333c0-.458.164-.85.49-1.177.327-.326.72-.49 1.177-.49h7.5c.458 0 .851.164 1.178.49.326.327.489.72.489 1.177V12.5c0 .458-.163.851-.49 1.177a1.605 1.605 0 0 1-1.177.49h-7.5ZM5 16.667c-.458 0-.851-.163-1.178-.49a1.605 1.605 0 0 1-.489-1.177V5h1.25v10h8.75v1.25H5v.417Z"
      fill="currentColor"
    />
  </svg>
);

/** 削除アイコン */
const TrashIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M6.25 17.083c-.458 0-.85-.163-1.177-.489a1.605 1.605 0 0 1-.49-1.178V5H3.75V3.75h3.75V2.917h5v.833h3.75V5h-.833v10.417c0 .458-.163.85-.49 1.177a1.605 1.605 0 0 1-1.177.49H6.25ZM8.333 14.167h1.25V6.667h-1.25v7.5Zm2.084 0h1.25V6.667h-1.25v7.5Z"
      fill="currentColor"
    />
  </svg>
);

/** Menu.Popup の幅を指定できるデコレータ生成関数 */
function MenuDecoratorWithWidth(width: number): Decorator {
  const Wrapper: Decorator = (Story) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const anchorRef = useRef<HTMLDivElement>(null);
    return (
      <div
        ref={containerRef}
        style={{ position: 'relative', minHeight: '80px' }}
      >
        <Menu.Root open>
          <div ref={anchorRef} />
          <Menu.Portal container={containerRef}>
            <Menu.Positioner anchor={anchorRef} sideOffset={0}>
              <Menu.Popup
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'white',
                  borderRadius: '6px',
                  boxShadow:
                    '0px 8px 16px 0px rgba(0,0,0,0.13), 0px 0px 6px 0px rgba(0,0,0,0.1)',
                  paddingBlock: '8px',
                  width: `${width}px`,
                }}
              >
                <Story />
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>
    );
  };
  return Wrapper;
}

const MenuDecorator: Decorator = (Story) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} style={{ position: 'relative', minHeight: '80px' }}>
      <Menu.Root open>
        <div ref={anchorRef} />
        <Menu.Portal container={containerRef}>
          <Menu.Positioner anchor={anchorRef} sideOffset={0}>
            <Menu.Popup
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'white',
                borderRadius: '6px',
                boxShadow:
                  '0px 8px 16px 0px rgba(0,0,0,0.13), 0px 0px 6px 0px rgba(0,0,0,0.1)',
                paddingBlock: '8px',
                minWidth: '160px',
              }}
            >
              <Story />
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
};

const meta = {
  title: 'Components/Menu/ActionMenuItem',
  component: ActionMenuItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '画面遷移を伴わずに特定のアクションを実行するメニュー項目です。\n' +
          '選択すると、データの更新、実行、削除などの操作が即座に実行されます。',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [MenuDecorator],
  argTypes: {
    variant: {
      control: 'radio',
      options: ['neutral', 'danger'],
      description: 'バリアント',
    },
    disabled: {
      control: 'boolean',
      description: '無効化状態',
    },
    supportText: {
      control: 'text',
      description: '補助テキスト',
    },
  },
} satisfies Meta<typeof ActionMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ========================================
   Neutral バリアント
   ======================================== */

/** デフォルト状態 */
export const Normal: Story = {
  args: {
    children: 'アクション',
  },
};

/** アイコン付き */
export const WithIcon: Story = {
  args: {
    ...Normal.args,
    icon: <DummyIcon />,
  },
};

/** 補助テキスト付き */
export const WithSupportText: Story = {
  args: {
    ...Normal.args,
    supportText: '補助テキスト',
  },
};

/** アイコン + 補助テキスト付き */
export const WithIconAndSupportText: Story = {
  args: {
    ...Normal.args,
    icon: <DummyIcon />,
    supportText: '補助テキスト',
  },
};

/* ========================================
   Neutral 擬似状態
   ======================================== */

/** Hover 状態 */
export const Hover: Story = {
  args: { ...Normal.args },
  parameters: { pseudo: { hover: true } },
};

/** Active 状態 */
export const Active: Story = {
  args: { ...Normal.args },
  parameters: { pseudo: { active: true } },
};

/** Focus 状態 */
export const Focus: Story = {
  args: { ...Normal.args },
  parameters: { pseudo: { focusVisible: true } },
};

/** Disabled 状態 */
export const Disabled: Story = {
  args: {
    ...Normal.args,
    disabled: true,
  },
};

/** Disabled + アイコン + 補助テキスト */
export const DisabledWithIconAndSupportText: Story = {
  args: {
    ...WithIconAndSupportText.args,
    disabled: true,
  },
};

/* ========================================
   Danger バリアント
   ======================================== */

/** Danger デフォルト */
export const Danger: Story = {
  args: {
    children: '削除',
    variant: 'danger',
  },
};

/** Danger + アイコン */
export const DangerWithIcon: Story = {
  args: {
    ...Danger.args,
    icon: <DummyIcon />,
  },
};

/** Danger + 補助テキスト */
export const DangerWithSupportText: Story = {
  args: {
    ...Danger.args,
    supportText: '元に戻せません',
  },
};

/** Danger - Hover */
export const DangerHover: Story = {
  args: { ...Danger.args },
  parameters: { pseudo: { hover: true } },
};

/** Danger - Active */
export const DangerActive: Story = {
  args: { ...Danger.args },
  parameters: { pseudo: { active: true } },
};

/** Danger - Focus */
export const DangerFocus: Story = {
  args: { ...Danger.args },
  parameters: { pseudo: { focusVisible: true } },
};

/** Danger - Disabled */
export const DangerDisabled: Story = {
  args: {
    ...Danger.args,
    disabled: true,
  },
};

/* ========================================
   長い文字列
   ======================================== */

/** 長い文字列は折り返す（省略禁止） */
export const LongText: Story = {
  args: {
    children: 'アクション',
  },
  decorators: [
    MenuDecoratorWithWidth(200),
    () => (
      <>
        <ActionMenuItem>Action</ActionMenuItem>
        <ActionMenuItem>
          長い文字列の場合長い文字列の場合長い文字列
        </ActionMenuItem>
        <ActionMenuItem>Action</ActionMenuItem>
        <ActionMenuItem>Action</ActionMenuItem>
      </>
    ),
  ],
};

/** 長い文字列 + サポートテキスト */
export const LongTextWithSupportText: Story = {
  args: {
    children: 'アクション',
  },
  decorators: [
    MenuDecoratorWithWidth(200),
    () => (
      <>
        <ActionMenuItem supportText="Support text">Action</ActionMenuItem>
        <ActionMenuItem supportText="長い文字列のサポートテキストが入る場合のサポートテキスト">
          長い文字列の場合長い文字列の場合長い文字列
        </ActionMenuItem>
        <ActionMenuItem supportText="Support text">Action</ActionMenuItem>
      </>
    ),
  ],
};

/* ========================================
   全状態一覧
   ======================================== */

/** 全バリアント・状態を一覧表示 */
export const AllStates: Story = {
  args: {
    children: 'アクション',
  },
  decorators: [
    () => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
        <ActionMenuItem>編集</ActionMenuItem>
        <ActionMenuItem icon={<DummyIcon />}>アイコン付き</ActionMenuItem>
        <ActionMenuItem supportText="補助テキスト">
          補助テキスト付き
        </ActionMenuItem>
        <ActionMenuItem icon={<DummyIcon />} supportText="補助テキスト">
          アイコン + 補助テキスト
        </ActionMenuItem>
        <ActionMenuItem disabled>無効化</ActionMenuItem>
        <ActionMenuItem variant="danger">削除</ActionMenuItem>
        <ActionMenuItem variant="danger" icon={<DummyIcon />}>
          削除（アイコン付き）
        </ActionMenuItem>
        <ActionMenuItem variant="danger" disabled>
          削除（無効化）
        </ActionMenuItem>
      </div>
    ),
  ],
};

/**
 * もっと見るボタンから開くメニューの実例
 *
 * Figma: https://www.figma.com/design/kHQNLM1dnk0EhZwOKBEBkL?node-id=8589-3821
 */
export const MenuWithTrigger: Story = {
  args: {
    children: 'アクション',
  },
  decorators: [
    () => (
      <Menu.Root>
        <Menu.Trigger
          render={
            <IconButton variant="ghost" size="medium" aria-label="もっと見る">
              <MoreVerticalIcon />
            </IconButton>
          }
        />
        <Menu.Portal>
          <Menu.Positioner side="bottom" align="start" sideOffset={4}>
            <Menu.Popup
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'white',
                borderRadius: '6px',
                boxShadow:
                  '0px 8px 16px 0px rgba(0,0,0,0.13), 0px 0px 6px 0px rgba(0,0,0,0.1)',
                paddingBlock: '8px',
                minWidth: '144px',
              }}
            >
              <ActionMenuItem icon={<PencilIcon />}>編集</ActionMenuItem>
              <ActionMenuItem icon={<CopyIcon />}>複製</ActionMenuItem>
              <ActionMenuItem variant="danger" icon={<TrashIcon />}>
                削除
              </ActionMenuItem>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    ),
  ],
};
