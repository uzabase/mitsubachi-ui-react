import type React from 'react';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import type { MenuRootProps as BaseMenuRootProps } from '@base-ui/react/menu';
import styles from './menu.module.css';

/* ========================================
   Menu (Root)
   ======================================== */

export interface MenuProps {
  /** 制御された開閉状態 */
  open?: boolean;
  /** 非制御の初期開閉状態 */
  defaultOpen?: boolean;
  /** 開閉状態の変更コールバック */
  onOpenChange?: BaseMenuRootProps['onOpenChange'];
  /**
   * モーダル状態。trueの場合、ページスクロールがロックされ外部要素のポインター操作が無効になる
   * @default true
   */
  modal?: boolean;
  children: React.ReactNode;
}

/**
 * メニューのルートコンポーネント
 *
 * トリガー要素のクリックで開き、外側クリックまたはESCで閉じるドロップダウンメニュー。
 * Base UI の Menu.Root をラップし、開閉状態を管理する。
 *
 * @example
 * ```tsx
 * <Menu>
 *   <MenuTrigger>
 *     <MenuButton>Actions</MenuButton>
 *   </MenuTrigger>
 *   <MenuDropdown>
 *     <MenuGroup>
 *       <ActionMenuItem>編集</ActionMenuItem>
 *     </MenuGroup>
 *   </MenuDropdown>
 * </Menu>
 * ```
 */
export const Menu = ({
  open,
  defaultOpen,
  onOpenChange,
  modal,
  children,
}: MenuProps) => {
  return (
    <BaseMenu.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      modal={modal}
    >
      {children}
    </BaseMenu.Root>
  );
};

/* ========================================
   MenuTrigger
   ======================================== */

export interface MenuTriggerProps {
  /** トリガーとなる要素（MenuButton, IconButton など） */
  children: React.ReactElement;
}

/**
 * メニューのトリガーコンポーネント
 *
 * 子要素をクリックするとメニューが開閉する。
 * MenuButton, IconButton などの任意の要素をトリガーとして使用できる。
 */
export const MenuTrigger = ({ children }: MenuTriggerProps) => {
  return <BaseMenu.Trigger render={children} />;
};

/* ========================================
   MenuDropdown
   ======================================== */

/** MenuDropdown の表示方向 */
export type MenuDropdownSide = 'top' | 'bottom' | 'inline-start' | 'inline-end';

/** MenuDropdown の配置調整 */
export type MenuDropdownAlign = 'start' | 'center' | 'end';

export interface MenuDropdownProps {
  /**
   * トリガーに対する表示方向
   * @default 'bottom'
   */
  side?: MenuDropdownSide;
  /**
   * 表示方向の軸に沿った配置
   * @default 'start'
   */
  align?: MenuDropdownAlign;
  /**
   * トリガーからのオフセット（px）
   * @default 4
   */
  sideOffset?: number;
  /**
   * ドロップダウンの幅（px）。'auto' で内容に応じた幅になる
   * @default 200
   */
  width?: number | 'auto';
  /** Portal の描画先コンテナ。指定するとbodyではなくそのコンテナ内に描画される */
  container?: React.RefObject<HTMLElement | null>;
  /**
   * Popupの装飾（shadow, border-radius, background）を無効にする。
   * Storybookでmenu-item単体の表示に使用
   * @default false
   */
  unstyled?: boolean;
  /**
   * Positionerのposition計算を無効にし、インラインに描画する。
   * Storybookの静的表示など、フロー内にPopupを配置したい場合に使用
   * @default false
   */
  positionStatic?: boolean;
  children: React.ReactNode;
}

/** Portal + Positioner + Popup の内部共通ベース */
const DropdownBase = ({
  side,
  align,
  sideOffset,
  width,
  container,
  unstyled = false,
  positionStatic = false,
  children,
}: {
  side: MenuDropdownSide;
  align: MenuDropdownAlign;
  sideOffset: number;
  width: number | 'auto';
  container?: React.RefObject<HTMLElement | null>;
  unstyled?: boolean;
  positionStatic?: boolean;
  children: React.ReactNode;
}) => {
  const inlineSize = width === 'auto' ? 'fit-content' : `${width}px`;

  return (
    <BaseMenu.Portal container={container}>
      <BaseMenu.Positioner
        className={unstyled ? undefined : styles.positioner}
        side={side}
        align={align}
        sideOffset={sideOffset}
        collisionPadding={16}
        style={positionStatic ? { position: 'static' } : undefined}
      >
        <BaseMenu.Popup
          className={unstyled ? undefined : styles.popup}
          style={unstyled ? { outline: 'none', inlineSize } : { inlineSize }}
        >
          {children}
        </BaseMenu.Popup>
      </BaseMenu.Positioner>
    </BaseMenu.Portal>
  );
};

/**
 * メニューのドロップダウンコンポーネント
 *
 * Portal + Positioner + Popup をまとめたコンポーネント。
 * ビューポート端から16pxの余白を確保し、収まりきらない場合はスクロールバーを表示する。
 * 表示位置はビューポートに応じて自動調整される。
 */
export const MenuDropdown = ({
  side = 'bottom',
  align = 'start',
  sideOffset = 4,
  width = 200,
  container,
  unstyled = false,
  positionStatic = false,
  children,
}: MenuDropdownProps) => (
  <DropdownBase
    side={side}
    align={align}
    sideOffset={sideOffset}
    width={width}
    container={container}
    unstyled={unstyled}
    positionStatic={positionStatic}
  >
    {children}
  </DropdownBase>
);

/* ========================================
   MenuGroup
   ======================================== */

export interface MenuGroupProps {
  /** グループのラベル */
  label?: string;
  children: React.ReactNode;
}

/**
 * メニューアイテムをグルーピングするコンポーネント
 *
 * 複数のMenuGroupを並べると、グループ間に区切り線が表示される。
 * オプションの label でグループにラベルを付けられる。
 */
export const MenuGroup = ({ label, children }: MenuGroupProps) => {
  return (
    <BaseMenu.Group className={styles.group}>
      {label && (
        <BaseMenu.GroupLabel className={styles.groupLabel}>
          {label}
        </BaseMenu.GroupLabel>
      )}
      {children}
    </BaseMenu.Group>
  );
};

/* ========================================
   SubMenuDropdown
   ======================================== */

export interface SubMenuDropdownProps {
  /**
   * トリガーに対する表示方向
   * @default 'inline-end'
   */
  side?: MenuDropdownSide;
  /**
   * 表示方向の軸に沿った配置
   * @default 'start'
   */
  align?: MenuDropdownAlign;
  /**
   * トリガーからのオフセット（px）
   * @default 0
   */
  sideOffset?: number;
  /**
   * サブメニューの幅（px）。'auto' で内容に応じた幅になる
   * @default 160
   */
  width?: number | 'auto';
  children: React.ReactNode;
}

/**
 * サブメニューのドロップダウンコンポーネント
 *
 * MenuSubmenuRoot 内で SubMenuItem と組み合わせて使用する。
 * MenuDropdown と同じスタイルを共有し、デフォルト値のみ異なる。
 *
 * @example
 * ```tsx
 * <MenuSubmenuRoot>
 *   <SubMenuItem>移動先</SubMenuItem>
 *   <SubMenuDropdown>
 *     <ActionMenuItem>フォルダA</ActionMenuItem>
 *     <ActionMenuItem>フォルダB</ActionMenuItem>
 *   </SubMenuDropdown>
 * </MenuSubmenuRoot>
 * ```
 */
export const SubMenuDropdown = ({
  side = 'inline-end',
  align = 'start',
  sideOffset = 0,
  width = 160,
  children,
}: SubMenuDropdownProps) => (
  <DropdownBase side={side} align={align} sideOffset={sideOffset} width={width}>
    {children}
  </DropdownBase>
);

/* ========================================
   Base UI 再エクスポート（SubMenu / RadioGroup 用）
   ======================================== */

export const MenuSubmenuRoot = BaseMenu.SubmenuRoot;
export const MenuRadioGroup = BaseMenu.RadioGroup;
