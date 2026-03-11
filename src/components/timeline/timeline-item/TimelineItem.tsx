import type { ReactNode } from 'react';
import { useTimelineContext } from '../shared/TimelineContext';
import styles from './timeline-item.module.css';

export interface TimelineItemProps {
  /**
   * 強調表示（ドットが有彩色になる）
   *
   * 最も重要な出来事や、文脈の起点、現在のステータスなどに使用します。
   * @default false
   */
  emphasized?: boolean;
  /** コンテンツ */
  children: ReactNode;
}

/**
 * TimelineItem
 *
 * 時系列の個別アイテム。Timeline 内に配置して使用する。
 * 自動的にラインで接続される。
 */
export function TimelineItem({
  emphasized = false,
  children,
}: TimelineItemProps) {
  const { itemSpacing } = useTimelineContext();

  const itemClassName = [
    styles.item,
    emphasized && styles.emphasized,
    styles[itemSpacing],
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <li className={itemClassName}>
      <div className={styles.flow}>
        <span className={styles.topLine} aria-hidden="true" />
        <span className={styles.dot} aria-hidden="true" />
        <span className={styles.bottomLine} aria-hidden="true" />
      </div>
      <div className={styles.contents}>{children}</div>
    </li>
  );
}
