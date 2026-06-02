import { ReactNode } from 'react';
import { TimelineItemSpacing } from '../shared/TimelineContext';
import { TimelineItem } from '../timeline-item/TimelineItem';
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
declare function TimelineRoot({ itemSpacing, children }: TimelineProps): import("react/jsx-runtime").JSX.Element;
export declare const Timeline: typeof TimelineRoot & {
    Item: typeof TimelineItem;
};
export {};
//# sourceMappingURL=Timeline.d.ts.map