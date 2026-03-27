import { useRef, useState } from 'react';
import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { Menu } from '@base-ui/react/menu';
import {
  SelectMenuItem,
  type SelectMenuItemProps,
} from '../../../src/components/menu';
import { MenuButton } from '../../../src/components/button';
import { DummyIcon } from '../../../src/icons';

/** Menu.Popup のスタイル */
const popupStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  background: 'white',
  borderRadius: '6px',
  boxShadow:
    '0px 8px 16px 0px rgba(0,0,0,0.13), 0px 0px 6px 0px rgba(0,0,0,0.1)',
  paddingBlock: '8px',
  minWidth: '160px',
};

/**
 * 単一アイテム表示用デコレータ生成関数
 * selected=true の場合、RadioGroupのdefaultValueをアイテムのvalueに一致させる
 */
function createMenuDecorator(selected: boolean): Decorator {
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
              <Menu.Popup style={popupStyle}>
                <Menu.RadioGroup defaultValue={selected ? 'item' : '__none__'}>
                  <Story />
                </Menu.RadioGroup>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      </div>
    );
  };
  return Wrapper;
}

/** RadioGroupなしのデコレータ（render側でRadioGroupを制御する場合に使用） */
function MenuDecorator(): Decorator {
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
              <Menu.Popup style={popupStyle}>
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

/** RadioGroupなし + 幅指定付きデコレータ */
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
              <Menu.Popup style={{ ...popupStyle, width: `${width}px` }}>
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

const meta = {
  title: 'Components/Menu/SelectMenuItem',
  component: SelectMenuItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '選択状態を持つメニュー項目です。\n' +
          '設定値やフィルター条件などの切り替えに使用します。\n' +
          '`Menu.RadioGroup` 内に配置し、グループ内で1つだけ選択できます（Single-select）。\n\n' +
          '## 選択必須 / 任意選択\n' +
          '- **選択必須**: 選択肢のみを並べる\n' +
          '- **任意選択**: 先頭に `value=""` の「指定なし」を配置し、未選択状態を表現する\n\n' +
          "## Don't\n" +
          '- **複数選択（Multi-select / Checkbox）には対応しない。** 単一選択（Radio）専用。',
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
} satisfies Meta<typeof SelectMenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ========================================
   基本
   ======================================== */

/** 単一アイテム（未選択）用の共通設定 */
const unselectedStory = {
  decorators: [createMenuDecorator(false)],
  render: (args: SelectMenuItemProps) => <SelectMenuItem {...args} />,
};

/** 単一アイテム（選択）用の共通設定 */
const selectedStory = {
  decorators: [createMenuDecorator(true)],
  render: (args: SelectMenuItemProps) => <SelectMenuItem {...args} />,
};

/** デフォルト状態（未選択） */
export const Normal: Story = {
  ...unselectedStory,
  args: {
    value: 'item',
    children: '選択肢',
  },
};

/** 選択状態 */
export const Selected: Story = {
  ...selectedStory,
  args: {
    value: 'item',
    children: '選択肢',
  },
};

/** アイコン付き */
export const WithIcon: Story = {
  ...unselectedStory,
  args: {
    ...Normal.args,
    icon: <DummyIcon />,
  },
};

/** サポートテキスト付き */
export const WithSupportText: Story = {
  ...unselectedStory,
  args: {
    ...Normal.args,
    supportText: '補助テキスト',
  },
};

/** 無効化（未選択） */
export const Disabled: Story = {
  ...unselectedStory,
  args: {
    ...Normal.args,
    disabled: true,
  },
};

/** 無効化（選択状態） */
export const DisabledSelected: Story = {
  ...selectedStory,
  args: {
    ...Normal.args,
    disabled: true,
  },
};

/* ========================================
   擬似状態（未選択）
   ======================================== */

/** Hover 状態 */
export const Hover: Story = {
  ...unselectedStory,
  args: { ...Normal.args },
  parameters: { pseudo: { hover: true } },
};

/** Active 状態 */
export const Active: Story = {
  ...unselectedStory,
  args: { ...Normal.args },
  parameters: { pseudo: { active: true } },
};

/** Focus 状態 */
export const Focus: Story = {
  ...unselectedStory,
  args: { ...Normal.args },
  parameters: { pseudo: { focusVisible: true } },
};

/* ========================================
   擬似状態（選択）
   ======================================== */

/** 選択 + Hover 状態 */
export const SelectedHover: Story = {
  ...selectedStory,
  args: { ...Normal.args },
  parameters: { pseudo: { hover: true } },
};

/** 選択 + Active 状態 */
export const SelectedActive: Story = {
  ...selectedStory,
  args: { ...Normal.args },
  parameters: { pseudo: { active: true } },
};

/** 選択 + Focus 状態 */
export const SelectedFocus: Story = {
  ...selectedStory,
  args: { ...Normal.args },
  parameters: { pseudo: { focusVisible: true } },
};

/* ========================================
   長い文字列
   ======================================== */

/** 長い文字列は折り返す（省略禁止） */
export const LongText: Story = {
  args: {
    value: 'item',
    children: '選択肢',
  },
  decorators: [MenuDecoratorWithWidth(200)],
  render: () => (
    <Menu.RadioGroup defaultValue="long">
      <SelectMenuItem value="short">選択肢</SelectMenuItem>
      <SelectMenuItem value="long">
        長い文字列の場合長い文字列の場合長い文字列
      </SelectMenuItem>
      <SelectMenuItem value="short2">選択肢</SelectMenuItem>
    </Menu.RadioGroup>
  ),
};

/* ========================================
   全状態一覧
   ======================================== */

/** 全バリアント・状態を一覧表示 */
export const AllStates: Story = {
  args: {
    value: 'item',
    children: '選択肢',
  },
  decorators: [MenuDecorator()],
  render: () => (
    <>
      <Menu.RadioGroup defaultValue="__none__">
        <SelectMenuItem value="normal">未選択</SelectMenuItem>
      </Menu.RadioGroup>
      <Menu.RadioGroup defaultValue="selected">
        <SelectMenuItem value="selected">選択</SelectMenuItem>
      </Menu.RadioGroup>
      <Menu.RadioGroup defaultValue="__none__">
        <SelectMenuItem value="icon" icon={<DummyIcon />}>
          アイコン付き
        </SelectMenuItem>
      </Menu.RadioGroup>
      <Menu.RadioGroup defaultValue="__none__">
        <SelectMenuItem value="support" supportText="補助テキスト">
          サポートテキスト付き
        </SelectMenuItem>
      </Menu.RadioGroup>
      <Menu.RadioGroup defaultValue="__none__">
        <SelectMenuItem value="disabled" disabled>
          無効化
        </SelectMenuItem>
      </Menu.RadioGroup>
      <Menu.RadioGroup defaultValue="disabled-selected">
        <SelectMenuItem value="disabled-selected" disabled>
          無効化（選択）
        </SelectMenuItem>
      </Menu.RadioGroup>
    </>
  ),
};

/* ========================================
   選択必須パターン
   ======================================== */

/**
 * 選択必須パターン
 *
 * 「指定なし」がなく、いずれかの選択肢を必ず選択する。
 *
 * Figma: https://www.figma.com/design/kHQNLM1dnk0EhZwOKBEBkL?node-id=9029-21411
 */
export const RequiredSelection: Story = {
  args: {
    value: 'item',
    children: '選択肢',
  },
  decorators: [
    () => {
      const [value, setValue] = useState('');
      return (
        <Menu.Root>
          <Menu.Trigger
            render={<MenuButton variant="primary">職種（必須）</MenuButton>}
          />
          <Menu.Portal>
            <Menu.Positioner
              side="bottom"
              align="start"
              sideOffset={4}
              style={{ outline: 'none' }}
            >
              <Menu.Popup style={popupStyle}>
                <Menu.RadioGroup value={value} onValueChange={setValue}>
                  <SelectMenuItem value="sales">営業</SelectMenuItem>
                  <SelectMenuItem value="marketing">
                    マーケティング・広報
                  </SelectMenuItem>
                  <SelectMenuItem value="planning">
                    企画・経営企画
                  </SelectMenuItem>
                  <SelectMenuItem value="engineering">
                    エンジニア・IT
                  </SelectMenuItem>
                  <SelectMenuItem value="admin">
                    管理部門（人事・総務・経理）
                  </SelectMenuItem>
                </Menu.RadioGroup>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );
    },
  ],
};

/* ========================================
   任意選択パターン
   ======================================== */

/**
 * 任意選択パターン
 *
 * 先頭に「指定なし」（value=""）を配置し、未選択状態を表現する。
 *
 * Figma: https://www.figma.com/design/kHQNLM1dnk0EhZwOKBEBkL?node-id=8938-8212
 */
export const OptionalSelection: Story = {
  args: {
    value: 'item',
    children: '選択肢',
  },
  decorators: [
    () => {
      const [value, setValue] = useState('');
      return (
        <Menu.Root>
          <Menu.Trigger
            render={<MenuButton variant="primary">職種</MenuButton>}
          />
          <Menu.Portal>
            <Menu.Positioner
              side="bottom"
              align="start"
              sideOffset={4}
              style={{ outline: 'none' }}
            >
              <Menu.Popup style={popupStyle}>
                <Menu.RadioGroup value={value} onValueChange={setValue}>
                  <SelectMenuItem value="">指定なし</SelectMenuItem>
                  <SelectMenuItem value="sales">営業</SelectMenuItem>
                  <SelectMenuItem value="marketing">
                    マーケティング・広報
                  </SelectMenuItem>
                  <SelectMenuItem value="planning">
                    企画・経営企画
                  </SelectMenuItem>
                  <SelectMenuItem value="engineering">
                    エンジニア・IT
                  </SelectMenuItem>
                  <SelectMenuItem value="admin">
                    管理部門（人事・総務・経理）
                  </SelectMenuItem>
                </Menu.RadioGroup>
              </Menu.Popup>
            </Menu.Positioner>
          </Menu.Portal>
        </Menu.Root>
      );
    },
  ],
};
