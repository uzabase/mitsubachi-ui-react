import { default as React } from 'react';
/** SubMenuItem の Props */
export interface SubMenuItemProps {
    /**
     * 無効化状態。クリック操作が無効になり、テキストとアイコンが淡色表示になる
     * @default false
     */
    disabled?: boolean;
    /** ラベルの先頭に表示するアイコン */
    icon?: React.ReactNode;
    /** メニュー項目のラベル */
    children: React.ReactNode;
}
/**
 * サブメニューを開くためのメニュー項目
 *
 * 選択するとネストされたサブメニューが表示される。
 * 右端にシェブロンアイコンが常に表示される。
 *
 * ## 開閉仕様
 * - **非タッチデバイス**: hover でサブメニューを表示し、hover を外すと閉じる
 * - **タッチデバイス**: tap でサブメニューを表示し、再度 tap すると閉じる。メニュー外側の tap で全メニューを閉じる
 *
 * ## サブメニューの表示位置
 * 原則、親メニューの右側に上端を揃えて表示する。
 * 右側にスペースがない場合は左側、下にスペースがない場合は上方向への展開を許容する。
 *
 * ## 階層制限
 * メニューの階層は**最大2階層まで**とする。3階層以上のネストは禁止。
 *
 * @example
 * ```tsx
 * <Menu.SubmenuRoot>
 *   <SubMenuItem>サブメニュー</SubMenuItem>
 *   <Menu.Portal>
 *     <Menu.Positioner side="inline-end" align="start">
 *       <Menu.Popup>
 *         <ActionMenuItem>アクション</ActionMenuItem>
 *       </Menu.Popup>
 *     </Menu.Positioner>
 *   </Menu.Portal>
 * </Menu.SubmenuRoot>
 * ```
 */
export declare const SubMenuItem: ({ disabled, icon, children, }: SubMenuItemProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SubMenuItem.d.ts.map