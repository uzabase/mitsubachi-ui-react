import type { ReactNode } from 'react';
import {
  TimelineProvider,
  type TimelineItemSpacing,
} from '../shared/TimelineContext';
import { TimelineItem } from '../timeline-item/TimelineItem';
import styles from './timeline.module.css';

export interface TimelineProps {
  /**
   * アイテム間のスペーシング
   * @default 'normal'
   */
  itemSpacing?: TimelineItemSpacing;
  /** Timeline.Item を配置 */
  children: ReactNode;
}

/**
 * Timeline
 *
 * 出来事や状態の変化を時系列に沿って表示するコンテナ。
 * Timeline.Item を子要素として配置して使用する。
 */
function TimelineRoot({ itemSpacing = 'normal', children }: TimelineProps) {
  return (
    <TimelineProvider value={{ itemSpacing }}>
      <ol className={styles.timeline}>{children}</ol>
    </TimelineProvider>
  );
}

export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
});
