import { default as React } from 'react';
export interface MenuItemLayoutProps {
    /** ラベルの先頭に表示するアイコン */
    icon?: React.ReactNode;
    /** ラベル下に表示する補助テキスト */
    supportText?: string;
    /** メニュー項目のラベル */
    children: React.ReactNode;
}
/**
 * menu-item共通のレイアウトコンポーネント
 *
 * icon + text area（label + supportText）の構造を提供する。
 * 色はCSS custom propertiesで親コンポーネントから制御される。
 * レスポンシブ対応はメディアクエリ（720px）で自動切り替え。
 */
export declare const MenuItemLayout: ({ icon, supportText, children, }: MenuItemLayoutProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=menu-item-layout.d.ts.map