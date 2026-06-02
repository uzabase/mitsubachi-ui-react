import { default as React } from 'react';
import { Menu as BaseMenu, MenuRootProps as BaseMenuRootProps } from '@base-ui/react/menu';
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
export declare const Menu: ({ open, defaultOpen, onOpenChange, modal, children, }: MenuProps) => import("react/jsx-runtime").JSX.Element;
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
export declare const MenuTrigger: ({ children }: MenuTriggerProps) => import("react/jsx-runtime").JSX.Element;
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
/**
 * メニューのドロップダウンコンポーネント
 *
 * Portal + Positioner + Popup をまとめたコンポーネント。
 * ビューポート端から16pxの余白を確保し、収まりきらない場合はスクロールバーを表示する。
 * 表示位置はビューポートに応じて自動調整される。
 */
export declare const MenuDropdown: ({ side, align, sideOffset, width, container, unstyled, positionStatic, children, }: MenuDropdownProps) => import("react/jsx-runtime").JSX.Element;
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
export declare const MenuGroup: ({ label, children }: MenuGroupProps) => import("react/jsx-runtime").JSX.Element;
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
export declare const SubMenuDropdown: ({ side, align, sideOffset, width, children, }: SubMenuDropdownProps) => import("react/jsx-runtime").JSX.Element;
export declare const MenuSubmenuRoot: typeof BaseMenu.SubmenuRoot;
export declare const MenuRadioGroup: React.NamedExoticComponent<Omit<import('@base-ui/react').ContextMenuRadioGroupProps, "ref"> & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Menu.d.ts.map