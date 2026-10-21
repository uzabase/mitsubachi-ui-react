import { default as React } from 'react';
/** Link Tagのサイズ */
export type LinkTagSize = 'x-small' | 'small' | 'medium';
/** a要素としてのProps */
interface LinkTagAsLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * タグに表示するテキスト
     * @default 'Text'
     */
    text?: string;
    /**
     * タグのサイズ
     * - x-small: 10px（最小サイズ）
     * - small: 11px
     * - medium: 12px（デフォルト）
     * @default 'medium'
     */
    size?: LinkTagSize;
    /**
     * リンク先のURL
     * hrefを指定するとa要素として動作します
     */
    href: string;
    'aria-label'?: string;
}
/** button要素としてのProps */
interface LinkTagAsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * タグに表示するテキスト
     * @default 'Text'
     */
    text?: string;
    /**
     * タグのサイズ
     * - x-small: 10px（最小サイズ）
     * - small: 11px
     * - medium: 12px（デフォルト）
     * @default 'medium'
     */
    size?: LinkTagSize;
    /**
     * hrefを指定しない場合はbutton要素として動作します
     */
    href?: never;
    'aria-label'?: string;
}
export type LinkTagProps = LinkTagAsLinkProps | LinkTagAsButtonProps;
/**
 * LinkTag コンポーネント
 *
 * コンテンツの属性や分類を簡潔に示すためのコンポーネント。
 * 関連するカテゴリや項目へのナビゲーションリンクとして機能します。
 * タグ自体がクリック可能で、関連コンテンツへの移動をスムーズにします。
 *
 * @example
 * // リンクとして使用
 * <LinkTag text="カテゴリ" href="/category" />
 *
 * // ボタンとして使用
 * <LinkTag text="タグ" onClick={() => console.log('clicked')} />
 */
export declare const LinkTag: ({ text, size, className, ...props }: LinkTagProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=LinkTag.d.ts.map