import type { ReactNode } from 'react';
import { Tabs } from '@base-ui/react/tabs';
import type { TabsTab } from '@base-ui/react/tabs';
import styles from './section-tab.module.css';

export interface SectionTabProps {
  /** タブの値（SectionTabGroup の選択制御に使用） */
  value: TabsTab.Value;
  /** タブに表示するテキスト */
  children: ReactNode;
  /**
   * 国旗アイコン（テキストの前に表示）
   *
   * 国・地域タブで使用。国旗のない地域名（ヨーロッパ、アジア等）には渡しません。
   */
  flag?: ReactNode;
  /**
   * 無効化状態
   * @default false
   */
  disabled?: boolean;
}

/**
 * SectionTab
 *
 * ページ内セクションの切り替えに使用する個別タブ。
 * SectionTabGroup.List 内に配置して使用する。
 *
 * Base UI の Tabs.Tab をベースに実装。
 * @see https://base-ui.com/react/components/tabs
 */
export function SectionTab({
  value,
  children,
  flag,
  disabled = false,
}: SectionTabProps) {
  return (
    <Tabs.Tab value={value} disabled={disabled} className={styles.tab}>
      {flag && (
        <span className={styles.flag} aria-hidden="true">
          {flag}
        </span>
      )}
      <span className={styles.label}>{children}</span>
    </Tabs.Tab>
  );
}
