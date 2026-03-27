import { useRef } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from '@base-ui/react/menu';
import { ActionMenuItem } from '../../../src/components/menu';
import { MenuButton } from '../../../src/components/button';
import {
  CopyIcon,
  DummyIcon,
  PencilSquareIcon,
  TrashIcon,
} from '../../../src/icons';

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
        <Menu.Root open modal={false}>
          <div ref={anchorRef} />
          <Menu.Portal container={containerRef}>
            <Menu.Positioner
              anchor={anchorRef}
              sideOffset={0}
              style={{ outline: 'none' }}
            >
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
      <Menu.Root open modal={false}>
        <div ref={anchorRef} />
        <Menu.Portal container={containerRef}>
          <Menu.Positioner
            anchor={anchorRef}
            sideOffset={0}
            style={{ outline: 'none' }}
          >
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

/** 単一アイテムストーリー用の共通設定 */
const menuItemStory = { decorators: [MenuDecorator] };

/** デフォルト状態 */
export const Normal: Story = {
  ...menuItemStory,
  args: {
    children: 'アクション',
  },
};

/** アイコン付き */
export const WithIcon: Story = {
  ...menuItemStory,
  args: {
    ...Normal.args,
    icon: <DummyIcon />,
  },
};

/** 補助テキスト付き */
export const WithSupportText: Story = {
  ...menuItemStory,
  args: {
    ...Normal.args,
    supportText: '補助テキスト',
  },
};

/** アイコン + 補助テキスト付き */
export const WithIconAndSupportText: Story = {
  ...menuItemStory,
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
  ...menuItemStory,
  args: { ...Normal.args },
  parameters: { pseudo: { hover: true } },
};

/** Active 状態 */
export const Active: Story = {
  ...menuItemStory,
  args: { ...Normal.args },
  parameters: { pseudo: { active: true } },
};

/** Focus 状態 */
export const Focus: Story = {
  ...menuItemStory,
  args: { ...Normal.args },
  parameters: { pseudo: { focusVisible: true } },
};

/** Disabled 状態 */
export const Disabled: Story = {
  ...menuItemStory,
  args: {
    ...Normal.args,
    disabled: true,
  },
};

/** Disabled + アイコン + 補助テキスト */
export const DisabledWithIconAndSupportText: Story = {
  ...menuItemStory,
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
  ...menuItemStory,
  args: {
    children: '削除',
    variant: 'danger',
  },
};

/** Danger + アイコン */
export const DangerWithIcon: Story = {
  ...menuItemStory,
  args: {
    ...Danger.args,
    icon: <DummyIcon />,
  },
};

/** Danger + 補助テキスト */
export const DangerWithSupportText: Story = {
  ...menuItemStory,
  args: {
    ...Danger.args,
    supportText: '元に戻せません',
  },
};

/** Danger - Hover */
export const DangerHover: Story = {
  ...menuItemStory,
  args: { ...Danger.args },
  parameters: { pseudo: { hover: true } },
};

/** Danger - Active */
export const DangerActive: Story = {
  ...menuItemStory,
  args: { ...Danger.args },
  parameters: { pseudo: { active: true } },
};

/** Danger - Focus */
export const DangerFocus: Story = {
  ...menuItemStory,
  args: { ...Danger.args },
  parameters: { pseudo: { focusVisible: true } },
};

/** Danger - Disabled */
export const DangerDisabled: Story = {
  ...menuItemStory,
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
  decorators: [MenuDecoratorWithWidth(200)],
  render: () => (
    <>
      <ActionMenuItem>Action</ActionMenuItem>
      <ActionMenuItem>
        長い文字列の場合長い文字列の場合長い文字列
      </ActionMenuItem>
      <ActionMenuItem>Action</ActionMenuItem>
      <ActionMenuItem>Action</ActionMenuItem>
    </>
  ),
};

/** 長い文字列 + サポートテキスト */
export const LongTextWithSupportText: Story = {
  args: {
    children: 'アクション',
  },
  decorators: [MenuDecoratorWithWidth(200)],
  render: () => (
    <>
      <ActionMenuItem supportText="Support text">Action</ActionMenuItem>
      <ActionMenuItem supportText="長い文字列のサポートテキストが入る場合のサポートテキスト">
        長い文字列の場合長い文字列の場合長い文字列
      </ActionMenuItem>
      <ActionMenuItem supportText="Support text">Action</ActionMenuItem>
    </>
  ),
};

/* ========================================
   全状態一覧
   ======================================== */

/** 全バリアント・状態を一覧表示 */
export const AllStates: Story = {
  args: {
    children: 'アクション',
  },
  decorators: [MenuDecorator],
  render: () => (
    <>
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
    </>
  ),
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
          render={<MenuButton variant="primary">もっと見る</MenuButton>}
        />
        <Menu.Portal>
          <Menu.Positioner
            side="bottom"
            align="start"
            sideOffset={4}
            style={{ outline: 'none' }}
          >
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
              <ActionMenuItem icon={<PencilSquareIcon />}>編集</ActionMenuItem>
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
