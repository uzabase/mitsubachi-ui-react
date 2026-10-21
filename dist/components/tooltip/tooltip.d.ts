import { default as React } from 'react';
/** ツールチップの表示方向 */
export type TooltipSide = 'top' | 'bottom' | 'inline-start' | 'inline-end';
/** ツールチップの配置調整 */
export type TooltipAlign = 'start' | 'center' | 'end';
export interface TooltipProps {
    /**
     * ツールチップに表示するラベルテキスト
     * @default 'ここにヒントを表示'
     */
    label?: string;
    /** ツールチップのトリガーとなる要素（単一のReact要素） */
    children: React.ReactElement;
    /**
     * ツールチップの表示方向
     * @default 'top'
     */
    side?: TooltipSide;
    /**
     * ツールチップの配置調整
     * @default 'center'
     */
    align?: TooltipAlign;
}
/**
 * Tooltipコンポーネント
 *
 * 要素にホバーまたはフォーカスした際に追加情報を表示するコンポーネント。
 * Base UIのTooltipをベースに、アクセシビリティを考慮した実装となっています。
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
 */
export declare const Tooltip: ({ label, children, side, align, }: TooltipProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=tooltip.d.ts.map