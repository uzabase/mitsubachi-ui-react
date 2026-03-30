import { useRef } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import {
  ActionMenuItem,
  SubMenuItem,
  type SubMenuItemProps,
  Menu as MenuComponent,
  MenuTrigger,
  MenuDropdown,
  SubMenuDropdown,
  MenuSubmenuRoot,
} from '../../../src/components/menu';
import { MenuButton } from '../../../src/components/button';
import { DummyIcon } from '../../../src/icons';

/** Menu.Popup の幅を指定できるデコレータ生成関数 */
function MenuDecoratorWithWidth(width: number): Decorator {
  const Wrapper: Decorator = (Story) => {
    const containerRef = useRef<HTMLDivElement>(null);
    return (
      <div ref={containerRef}>
        <MenuComponent open modal={false}>
          <MenuDropdown
            sideOffset={0}
            width={width}
            unstyled
            positionStatic
            container={containerRef}
          >
            <Story />
          </MenuDropdown>
        </MenuComponent>
      </div>
    );
  };
  return Wrapper;
}

const MenuDecorator: Decorator = (Story) => {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef}>
      <MenuComponent open modal={false}>
        <MenuDropdown
          sideOffset={0}
          unstyled
          positionStatic
          container={containerRef}
        >
          <Story />
        </MenuDropdown>
      </MenuComponent>
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
        component: 'サブメニューを開くためのメニュー項目です。最大2階層まで。',
      },
    },
  },
  tags: [],
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
    <MenuSubmenuRoot>
      <SubMenuItem {...args} />
    </MenuSubmenuRoot>
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
      <MenuSubmenuRoot>
        <SubMenuItem>サブメニュー</SubMenuItem>
      </MenuSubmenuRoot>
      <MenuSubmenuRoot>
        <SubMenuItem>長い文字列の場合長い文字列の場合長い文字列</SubMenuItem>
      </MenuSubmenuRoot>
      <MenuSubmenuRoot>
        <SubMenuItem>サブメニュー</SubMenuItem>
      </MenuSubmenuRoot>
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
      <MenuSubmenuRoot>
        <SubMenuItem>サブメニュー</SubMenuItem>
      </MenuSubmenuRoot>
      <MenuSubmenuRoot>
        <SubMenuItem icon={<DummyIcon />}>アイコン付き</SubMenuItem>
      </MenuSubmenuRoot>
      <MenuSubmenuRoot>
        <SubMenuItem disabled>無効化</SubMenuItem>
      </MenuSubmenuRoot>
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
      <MenuComponent>
        <MenuTrigger>
          <MenuButton variant="primary">メニュー</MenuButton>
        </MenuTrigger>
        <MenuDropdown width={144}>
          <ActionMenuItem>アクション</ActionMenuItem>
          <MenuSubmenuRoot>
            <SubMenuItem>サブメニュー</SubMenuItem>
            <SubMenuDropdown width={144}>
              <ActionMenuItem>サブアクション1</ActionMenuItem>
              <ActionMenuItem>サブアクション2</ActionMenuItem>
              <ActionMenuItem>サブアクション3</ActionMenuItem>
            </SubMenuDropdown>
          </MenuSubmenuRoot>
          <ActionMenuItem>アクション</ActionMenuItem>
        </MenuDropdown>
      </MenuComponent>
    ),
  ],
};
