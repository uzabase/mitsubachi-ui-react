import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Menu,
  MenuTrigger,
  MenuDropdown,
  MenuGroup,
  MenuSubmenuRoot,
  SubMenuDropdown,
  MenuRadioGroup,
  ActionMenuItem,
  LinkMenuItem,
  SubMenuItem,
  SelectMenuItem,
} from '../../../src/components/menu';
import { MenuButton } from '../../../src/components/button';
import {
  BookmarkIcon,
  CopyIcon,
  ExitIcon,
  GlobeIcon,
  GroupIcon,
  MailForwardIcon,
  PencilSquareIcon,
  PersonIcon,
  PersonGearIcon,
  QuestionCircleIcon,
  ReferenceIcon,
  TrashIcon,
} from '../../../src/icons';

const meta = {
  title: 'Components/Menu/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'トリガー要素をクリックで開閉するドロップダウンメニューです。',
      },
    },
  },
  tags: [],
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ========================================
   基本
   ======================================== */

/** デフォルト: MenuButton トリガー + ActionMenuItem */
export const Default: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <MenuButton>メニュー</MenuButton>
      </MenuTrigger>
      <MenuDropdown>
        <ActionMenuItem icon={<PencilSquareIcon />} onClick={() => {}}>
          編集
        </ActionMenuItem>
        <ActionMenuItem icon={<CopyIcon />} onClick={() => {}}>
          コピー
        </ActionMenuItem>
        <ActionMenuItem
          variant="danger"
          icon={<TrashIcon />}
          onClick={() => {}}
        >
          削除
        </ActionMenuItem>
      </MenuDropdown>
    </Menu>
  ),
};

/* ========================================
   グループ
   ======================================== */

/** 複数の MenuGroup で区切り線を表示 */
export const WithGroups: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <MenuButton>操作</MenuButton>
      </MenuTrigger>
      <MenuDropdown>
        <MenuGroup>
          <ActionMenuItem icon={<PencilSquareIcon />} onClick={() => {}}>
            編集
          </ActionMenuItem>
          <ActionMenuItem icon={<CopyIcon />} onClick={() => {}}>
            コピー
          </ActionMenuItem>
        </MenuGroup>
        <MenuGroup>
          <ActionMenuItem
            variant="danger"
            icon={<TrashIcon />}
            onClick={() => {}}
          >
            削除
          </ActionMenuItem>
        </MenuGroup>
      </MenuDropdown>
    </Menu>
  ),
};

/** ラベル付きグループ */
export const WithGroupLabels: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <MenuButton>設定</MenuButton>
      </MenuTrigger>
      <MenuDropdown width={240}>
        <MenuGroup label="編集">
          <ActionMenuItem icon={<PencilSquareIcon />} onClick={() => {}}>
            名前を変更
          </ActionMenuItem>
          <ActionMenuItem icon={<CopyIcon />} onClick={() => {}}>
            複製
          </ActionMenuItem>
        </MenuGroup>
        <MenuGroup label="その他">
          <LinkMenuItem href="https://example.com" newWindow>
            ヘルプを開く
          </LinkMenuItem>
          <ActionMenuItem
            variant="danger"
            icon={<TrashIcon />}
            onClick={() => {}}
          >
            削除
          </ActionMenuItem>
        </MenuGroup>
      </MenuDropdown>
    </Menu>
  ),
};

/* ========================================
   アイテム種別の混在
   ======================================== */

/** グローバルメニュー: 全 menu-item 種別を混在させた例 */
export const MixedItems: Story = {
  render: function MixedItemsRender() {
    const [language, setLanguage] = useState('ja');
    return (
      <Menu>
        <MenuTrigger>
          <MenuButton>すべての項目</MenuButton>
        </MenuTrigger>
        <MenuDropdown width={240}>
          {/* ユーザー情報 */}
          <MenuGroup>
            <LinkMenuItem
              href="/profile"
              icon={
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    inlineSize: '40px',
                    blockSize: '40px',
                    borderRadius: '9999px',
                    backgroundColor: '#910091',
                    color: '#fff',
                    fontSize: '16px',
                    fontWeight: 400,
                    lineHeight: 1.5,
                    letterSpacing: '0.32px',
                    flexShrink: 0,
                  }}
                >
                  TA
                </span>
              }
              supportText="taro.yamada@uzabase.com"
            >
              山田 太郎
            </LinkMenuItem>
          </MenuGroup>

          {/* マイページ系 */}
          <MenuGroup>
            <LinkMenuItem href="/my-speeda" icon={<PersonIcon />}>
              マイスピーダ
            </LinkMenuItem>
            <LinkMenuItem href="/bookmarks" icon={<BookmarkIcon />}>
              ブックマーク
            </LinkMenuItem>
          </MenuGroup>

          {/* 設定系 */}
          <MenuGroup>
            <LinkMenuItem href="/account" icon={<PersonGearIcon />}>
              アカウント設定
            </LinkMenuItem>
            <LinkMenuItem href="/mail-settings" icon={<MailForwardIcon />}>
              メール通知設定
            </LinkMenuItem>
            <MenuSubmenuRoot>
              <SubMenuItem icon={<GlobeIcon />}>
                Language：
                {language === 'ja'
                  ? '日本語'
                  : language === 'en'
                    ? 'English'
                    : '中文'}
              </SubMenuItem>
              <SubMenuDropdown>
                <MenuRadioGroup value={language} onValueChange={setLanguage}>
                  <SelectMenuItem value="ja">日本語</SelectMenuItem>
                  <SelectMenuItem value="en">English</SelectMenuItem>
                  <SelectMenuItem value="zh">中文</SelectMenuItem>
                </MenuRadioGroup>
              </SubMenuDropdown>
            </MenuSubmenuRoot>
          </MenuGroup>

          {/* 管理系 */}
          <MenuGroup>
            <LinkMenuItem href="/users" icon={<GroupIcon />}>
              ユーザー管理
            </LinkMenuItem>
            <LinkMenuItem href="/groups" icon={<GroupIcon />}>
              グループ設定
            </LinkMenuItem>
          </MenuGroup>

          {/* 情報系 */}
          <MenuGroup>
            <MenuSubmenuRoot>
              <SubMenuItem icon={<ReferenceIcon />}>定義</SubMenuItem>
              <SubMenuDropdown>
                <LinkMenuItem href="/glossary/finance">
                  財務・会計用語
                </LinkMenuItem>
                <LinkMenuItem href="/glossary/industry">業界用語</LinkMenuItem>
              </SubMenuDropdown>
            </MenuSubmenuRoot>
            <LinkMenuItem
              href="https://help.example.com"
              icon={<QuestionCircleIcon />}
              newWindow
            >
              ヘルプセンター
            </LinkMenuItem>
            <MenuSubmenuRoot>
              <SubMenuItem>利用規約と個人情報保護方針</SubMenuItem>
              <SubMenuDropdown width={280}>
                <LinkMenuItem href="/terms">利用規約</LinkMenuItem>
                <LinkMenuItem href="/disclaimer">免責事項</LinkMenuItem>
                <LinkMenuItem href="/privacy">個人情報保護方針</LinkMenuItem>
                <LinkMenuItem href="/external-transmission">
                  利用者に関する情報の外部送信について
                </LinkMenuItem>
                <LinkMenuItem href="https://about.example.com" newWindow>
                  スピーダについて
                </LinkMenuItem>
                <LinkMenuItem href="https://company.example.com" newWindow>
                  運営会社
                </LinkMenuItem>
              </SubMenuDropdown>
            </MenuSubmenuRoot>
          </MenuGroup>

          {/* ログアウト */}
          <MenuGroup>
            <ActionMenuItem icon={<ExitIcon />} onClick={() => {}}>
              ログアウト
            </ActionMenuItem>
          </MenuGroup>
        </MenuDropdown>
      </Menu>
    );
  },
};

/* ========================================
   SubMenu
   ======================================== */

/** SubMenuItem でネストメニューを表示 */
export const WithSubMenu: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <MenuButton>操作</MenuButton>
      </MenuTrigger>
      <MenuDropdown>
        <MenuGroup>
          <ActionMenuItem onClick={() => {}}>編集</ActionMenuItem>
          <MenuSubmenuRoot>
            <SubMenuItem>移動先</SubMenuItem>
            <SubMenuDropdown>
              <ActionMenuItem onClick={() => {}}>フォルダA</ActionMenuItem>
              <ActionMenuItem onClick={() => {}}>フォルダB</ActionMenuItem>
              <ActionMenuItem onClick={() => {}}>フォルダC</ActionMenuItem>
            </SubMenuDropdown>
          </MenuSubmenuRoot>
        </MenuGroup>
        <MenuGroup>
          <ActionMenuItem
            variant="danger"
            icon={<TrashIcon />}
            onClick={() => {}}
          >
            削除
          </ActionMenuItem>
        </MenuGroup>
      </MenuDropdown>
    </Menu>
  ),
};

/* ========================================
   RadioGroup (SelectMenuItem)
   ======================================== */

/** SelectMenuItem を RadioGroup で使用 */
export const WithRadioGroup: Story = {
  render: function WithRadioGroupRender() {
    const [value, setValue] = useState('sales');
    return (
      <Menu>
        <MenuTrigger>
          <MenuButton>部署を選択</MenuButton>
        </MenuTrigger>
        <MenuDropdown width={220}>
          <MenuRadioGroup value={value} onValueChange={setValue}>
            <SelectMenuItem value="sales">営業</SelectMenuItem>
            <SelectMenuItem value="marketing">
              マーケティング・広報
            </SelectMenuItem>
            <SelectMenuItem value="engineering">
              エンジニアリング
            </SelectMenuItem>
            <SelectMenuItem value="design">デザイン</SelectMenuItem>
          </MenuRadioGroup>
        </MenuDropdown>
      </Menu>
    );
  },
};

/** 任意選択（「指定なし」付き） */
export const WithOptionalRadioGroup: Story = {
  render: function WithOptionalRadioGroupRender() {
    const [value, setValue] = useState('');
    return (
      <Menu>
        <MenuTrigger>
          <MenuButton>フィルター</MenuButton>
        </MenuTrigger>
        <MenuDropdown width={220}>
          <MenuRadioGroup value={value} onValueChange={setValue}>
            <SelectMenuItem value="">指定なし</SelectMenuItem>
            <SelectMenuItem value="active">アクティブ</SelectMenuItem>
            <SelectMenuItem value="inactive">非アクティブ</SelectMenuItem>
            <SelectMenuItem value="pending">保留中</SelectMenuItem>
          </MenuRadioGroup>
        </MenuDropdown>
      </Menu>
    );
  },
};

/* ========================================
   スクロール
   ======================================== */

/** 多数のアイテムでスクロール動作を確認 */
export const LongList: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <MenuButton>長いリスト</MenuButton>
      </MenuTrigger>
      <MenuDropdown>
        {Array.from({ length: 20 }, (_, i) => (
          <ActionMenuItem key={i} onClick={() => {}}>
            メニュー項目 {i + 1}
          </ActionMenuItem>
        ))}
      </MenuDropdown>
    </Menu>
  ),
};

/* ========================================
   幅のカスタマイズ
   ======================================== */

/** カスタム幅 */
export const CustomWidth: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <MenuButton>幅の広いメニュー</MenuButton>
      </MenuTrigger>
      <MenuDropdown width={320}>
        <MenuGroup>
          <ActionMenuItem
            icon={<PencilSquareIcon />}
            supportText="この項目の名前やプロパティを変更します"
            onClick={() => {}}
          >
            編集
          </ActionMenuItem>
          <ActionMenuItem
            icon={<CopyIcon />}
            supportText="この項目をクリップボードにコピーします"
            onClick={() => {}}
          >
            コピー
          </ActionMenuItem>
        </MenuGroup>
        <MenuGroup>
          <ActionMenuItem
            variant="danger"
            icon={<TrashIcon />}
            supportText="この操作は取り消しできません"
            onClick={() => {}}
          >
            削除
          </ActionMenuItem>
        </MenuGroup>
      </MenuDropdown>
    </Menu>
  ),
};

/** 自動幅 */
export const AutoWidth: Story = {
  render: () => (
    <Menu>
      <MenuTrigger>
        <MenuButton>自動幅</MenuButton>
      </MenuTrigger>
      <MenuDropdown width="auto">
        <ActionMenuItem onClick={() => {}}>短い</ActionMenuItem>
        <ActionMenuItem onClick={() => {}}>
          とても長いメニュー項目のラベルテキスト
        </ActionMenuItem>
      </MenuDropdown>
    </Menu>
  ),
};
