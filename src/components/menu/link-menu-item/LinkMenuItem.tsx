import type React from 'react';
import { Menu } from '@base-ui/react/menu';
import { MenuItemLayout } from '../shared';
import { OpenInNewIcon } from '../../../icons';
import styles from './link-menu-item.module.css';

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
export const LinkMenuItem = ({
  href,
  newWindow = false,
  icon,
  supportText,
  children,
}: LinkMenuItemProps) => {
  return (
    <Menu.Item
      className={styles.root}
      render={
        // eslint-disable-next-line jsx-a11y/anchor-has-content -- content is provided by Menu.Item children
        <a
          href={href}
          {...(newWindow
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {})}
        />
      }
    >
      <MenuItemLayout icon={icon} supportText={supportText}>
        {children}
      </MenuItemLayout>
      {newWindow && (
        <span className={styles.newWindowIcon} aria-hidden="true">
          <OpenInNewIcon />
        </span>
      )}
    </Menu.Item>
  );
};
