import { useRef } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import {
  LinkMenuItem,
  Menu as MenuComponent,
  MenuTrigger,
  MenuDropdown,
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
  title: 'Components/Menu/LinkMenuItem',
  component: LinkMenuItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '別のページや画面に遷移するためのメニュー項目です。',
      },
    },
  },
  tags: [],
  argTypes: {
    href: {
      control: 'text',
      description: 'リンク先URL',
    },
    newWindow: {
      control: 'boolean',
      description: '新しいウィンドウで開く',
    },
    supportText: {
      control: 'text',
      description: '補助テキスト',
    },
  },
} satisfies Meta<typeof LinkMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ========================================
   基本
   ======================================== */

/** 単一アイテムストーリー用の共通設定 */
const menuItemStory = { decorators: [MenuDecorator] };

/** デフォルト状態 */
export const Normal: Story = {
  ...menuItemStory,
  args: {
    href: '#',
    children: 'リンク',
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

/** 新しいウィンドウで開く */
export const NewWindow: Story = {
  ...menuItemStory,
  args: {
    href: 'https://example.com',
    children: '外部リンク',
    newWindow: true,
  },
};

/** 新しいウィンドウ + アイコン付き */
export const NewWindowWithIcon: Story = {
  ...menuItemStory,
  args: {
    ...NewWindow.args,
    icon: <DummyIcon />,
  },
};

/** 新しいウィンドウ + 補助テキスト付き */
export const NewWindowWithSupportText: Story = {
  ...menuItemStory,
  args: {
    ...NewWindow.args,
    supportText: '補助テキスト',
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
    href: '#',
    children: 'リンク',
  },
  decorators: [MenuDecoratorWithWidth(200)],
  render: () => (
    <>
      <LinkMenuItem href="#">リンク</LinkMenuItem>
      <LinkMenuItem href="#">
        長い文字列の場合長い文字列の場合長い文字列
      </LinkMenuItem>
      <LinkMenuItem href="#">リンク</LinkMenuItem>
    </>
  ),
};

/** 長い文字列 + サポートテキスト */
export const LongTextWithSupportText: Story = {
  args: {
    href: '#',
    children: 'リンク',
  },
  decorators: [MenuDecoratorWithWidth(200)],
  render: () => (
    <>
      <LinkMenuItem href="#" supportText="Support text">
        リンク
      </LinkMenuItem>
      <LinkMenuItem
        href="#"
        supportText="長い文字列のサポートテキストが入る場合のサポートテキスト"
      >
        長い文字列の場合長い文字列の場合長い文字列
      </LinkMenuItem>
      <LinkMenuItem href="#" supportText="Support text">
        リンク
      </LinkMenuItem>
    </>
  ),
};

/* ========================================
   全状態一覧
   ======================================== */

/** 全バリアント・状態を一覧表示 */
export const AllStates: Story = {
  args: {
    href: '#',
    children: 'リンク',
  },
  decorators: [MenuDecorator],
  render: () => (
    <>
      <LinkMenuItem href="#">リンク</LinkMenuItem>
      <LinkMenuItem href="#" icon={<DummyIcon />}>
        アイコン付き
      </LinkMenuItem>
      <LinkMenuItem href="#" supportText="補助テキスト">
        補助テキスト付き
      </LinkMenuItem>
      <LinkMenuItem href="#" icon={<DummyIcon />} supportText="補助テキスト">
        アイコン + 補助テキスト
      </LinkMenuItem>
      <LinkMenuItem href="https://example.com" newWindow>
        新しいウィンドウ
      </LinkMenuItem>
      <LinkMenuItem href="https://example.com" newWindow icon={<DummyIcon />}>
        新しいウィンドウ + アイコン
      </LinkMenuItem>
      <LinkMenuItem
        href="https://example.com"
        newWindow
        icon={<DummyIcon />}
        supportText="補助テキスト"
      >
        全部入り
      </LinkMenuItem>
    </>
  ),
};

/**
 * メニューボタンから開くリンクメニューの実例
 *
 * Figma: https://www.figma.com/design/kHQNLM1dnk0EhZwOKBEBkL?node-id=8376-4985
 */
export const MenuWithTrigger: Story = {
  args: {
    href: '#',
    children: 'リンク',
  },
  decorators: [
    () => (
      <MenuComponent>
        <MenuTrigger>
          <MenuButton variant="primary">メニュー</MenuButton>
        </MenuTrigger>
        <MenuDropdown width={144}>
          <LinkMenuItem href="/settings">設定</LinkMenuItem>
          <LinkMenuItem href="/profile" icon={<DummyIcon />}>
            プロフィール
          </LinkMenuItem>
          <LinkMenuItem href="https://example.com" newWindow>
            ヘルプ
          </LinkMenuItem>
        </MenuDropdown>
      </MenuComponent>
    ),
  ],
};
