import { useRef } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from '@base-ui/react/menu';
import {
  ActionMenuItem,
  SubMenuItem,
  type SubMenuItemProps,
} from '../../../src/components/menu';
import { MenuButton } from '../../../src/components/button';
import { DummyIcon } from '../../../src/icons';

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
  title: 'Components/Menu/SubMenuItem',
  component: SubMenuItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'サブメニューを開くためのメニュー項目です。\n' +
          '選択すると階層化されたメニューが展開され、追加のメニュー項目を表示します。\n\n' +
          '## 開閉仕様\n' +
          '- **非タッチデバイス**: hover でサブメニューを表示し、hover を外すと閉じる\n' +
          '- **タッチデバイス**: tap でサブメニューを表示し、再度 tap すると閉じる。メニュー外側の tap で全メニューを閉じる\n\n' +
          '## サブメニューの表示位置\n' +
          '原則、親メニューの右側に上端を揃えて表示する。右側にスペースがない場合は左側に配置可。下にスペースがない場合は上方向への展開を許容する。\n\n' +
          '## 階層制限\n' +
          'メニューの階層は**最大2階層まで**とする。3階層以上のネストは禁止。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '無効化状態',
    },
  },
} satisfies Meta<typeof SubMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ========================================
   基本
   ======================================== */

/** 単一アイテムストーリー用の共通設定 */
const menuItemStory = {
  decorators: [MenuDecorator],
  render: (args: SubMenuItemProps) => (
    <Menu.SubmenuRoot>
      <SubMenuItem {...args} />
    </Menu.SubmenuRoot>
  ),
};

/** デフォルト状態 */
export const Normal: Story = {
  ...menuItemStory,
  args: {
    children: 'サブメニュー',
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

/** 無効化 */
export const Disabled: Story = {
  ...menuItemStory,
  args: {
    ...Normal.args,
    disabled: true,
  },
};

/* ========================================
   擬似状態
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

/* ========================================
   長い文字列
   ======================================== */

/** 長い文字列は折り返す（省略禁止） */
export const LongText: Story = {
  args: {
    children: 'サブメニュー',
  },
  decorators: [MenuDecoratorWithWidth(200)],
  render: () => (
    <>
      <Menu.SubmenuRoot>
        <SubMenuItem>サブメニュー</SubMenuItem>
      </Menu.SubmenuRoot>
      <Menu.SubmenuRoot>
        <SubMenuItem>長い文字列の場合長い文字列の場合長い文字列</SubMenuItem>
      </Menu.SubmenuRoot>
      <Menu.SubmenuRoot>
        <SubMenuItem>サブメニュー</SubMenuItem>
      </Menu.SubmenuRoot>
    </>
  ),
};

/* ========================================
   全状態一覧
   ======================================== */

/** 全バリアント・状態を一覧表示 */
export const AllStates: Story = {
  args: {
    children: 'サブメニュー',
  },
  decorators: [MenuDecorator],
  render: () => (
    <>
      <Menu.SubmenuRoot>
        <SubMenuItem>サブメニュー</SubMenuItem>
      </Menu.SubmenuRoot>
      <Menu.SubmenuRoot>
        <SubMenuItem icon={<DummyIcon />}>アイコン付き</SubMenuItem>
      </Menu.SubmenuRoot>
      <Menu.SubmenuRoot>
        <SubMenuItem disabled>無効化</SubMenuItem>
      </Menu.SubmenuRoot>
    </>
  ),
};

/**
 * メニューボタンからサブメニューを開く実例
 *
 * Figma: https://www.figma.com/design/kHQNLM1dnk0EhZwOKBEBkL?node-id=8376-4959
 */
export const MenuWithTrigger: Story = {
  args: {
    children: 'サブメニュー',
  },
  decorators: [
    () => (
      <Menu.Root>
        <Menu.Trigger
          render={<MenuButton variant="primary">メニュー</MenuButton>}
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
              <ActionMenuItem>アクション</ActionMenuItem>
              <Menu.SubmenuRoot>
                <SubMenuItem>サブメニュー</SubMenuItem>
                <Menu.Portal>
                  <Menu.Positioner
                    side="inline-end"
                    align="start"
                    sideOffset={0}
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
                      <ActionMenuItem>サブアクション1</ActionMenuItem>
                      <ActionMenuItem>サブアクション2</ActionMenuItem>
                      <ActionMenuItem>サブアクション3</ActionMenuItem>
                    </Menu.Popup>
                  </Menu.Positioner>
                </Menu.Portal>
              </Menu.SubmenuRoot>
              <ActionMenuItem>アクション</ActionMenuItem>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    ),
  ],
};
