import { ReactNode } from 'react';
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
export declare function TimelineItem({ emphasized, children, }: TimelineItemProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TimelineItem.d.ts.map