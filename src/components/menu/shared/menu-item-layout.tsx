import type React from 'react';
import styles from './menu-item-layout.module.css';

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
export const MenuItemLayout = ({
  icon,
  supportText,
  children,
}: MenuItemLayoutProps) => {
  return (
    <span className={styles.container}>
      {icon && (
        <span className={styles.iconWrapper} aria-hidden="true">
          {icon}
        </span>
      )}
      <span className={styles.textArea}>
        <span className={styles.label}>{children}</span>
        {supportText && (
          <span className={styles.supportText}>{supportText}</span>
        )}
      </span>
    </span>
  );
};
