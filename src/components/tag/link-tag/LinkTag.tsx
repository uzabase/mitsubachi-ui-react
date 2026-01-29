import React from 'react';
import styles from './link-tag.module.css';

/** Link Tagのサイズ */
export type LinkTagSize = 'x-small' | 'small' | 'medium';

/** Link Tagの状態 */
export type LinkTagState = 'default' | 'hover' | 'active' | 'focus';

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
   * タグの状態
   * - default: デフォルト状態
   * - hover: ホバー状態
   * - active: アクティブ状態
   * - focus: フォーカス状態
   * @default 'default'
   */
  state?: LinkTagState;
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
   * タグの状態
   * - default: デフォルト状態
   * - hover: ホバー状態
   * - active: アクティブ状態
   * - focus: フォーカス状態
   * @default 'default'
   */
  state?: LinkTagState;
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
export const LinkTag = ({
  text = 'Text',
  size = 'medium',
  state = 'default',
  className,
  ...props
}: LinkTagProps) => {
  const classes = `${styles.tag} ${styles[size]} ${styles[state]} ${className || ''}`;

  if ('href' in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <a href={href} className={classes} {...anchorProps}>
        <span className={styles.text}>{text}</span>
      </a>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type="button" className={classes} {...buttonProps}>
      <span className={styles.text}>{text}</span>
    </button>
  );
};
