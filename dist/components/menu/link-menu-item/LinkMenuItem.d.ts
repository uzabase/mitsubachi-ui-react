import { default as React } from 'react';
/** LinkMenuItem の Props */
export interface LinkMenuItemProps {
    /**
     * リンク先URL
     */
    href: string;
    /**
     * 新しいウィンドウで開くかどうか。trueの場合、open-in-newアイコンが表示される
     * @default false
     */
    newWindow?: boolean;
    /** ラベルの先頭に表示するアイコン */
    icon?: React.ReactNode;
    /** ラベル下に表示する補助テキスト */
    supportText?: string;
    /** メニュー項目のラベル */
    children: React.ReactNode;
}
/**
 * 別のページや画面に遷移するためのメニュー項目
 *
 * 選択すると指定されたリンク先へ移動する。
 * menu コンポーネント内でナビゲーション目的の操作に使用する。
 * newWindow=true で新しいウィンドウで開くアイコンが表示される。
 *
 * @example
 * ```tsx
 * <LinkMenuItem href="/settings">設定</LinkMenuItem>
 * <LinkMenuItem href="https://example.com" newWindow>外部リンク</LinkMenuItem>
 * ```
 */
export declare const LinkMenuItem: ({ href, newWindow, icon, supportText, children, }: LinkMenuItemProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LinkMenuItem.d.ts.map