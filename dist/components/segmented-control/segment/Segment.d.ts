import { ReactNode } from 'react';
export interface SegmentProps {
    /** セグメントの値（SegmentedControl の選択制御に使用） */
    value: string;
    /** セグメントの表示バリアント */
    variant: 'text' | 'icon';
    /** セグメントに表示するコンテンツ（テキストまたはアイコン） */
    children: ReactNode;
    /**
     * 無効化状態
     * @default false
     */
    disabled?: boolean;
    /**
     * アクセシブルラベル
     *
     * icon variant ではアイコンのみが表示されるため、
     * スクリーンリーダー向けのラベルとして必ず指定してください。
     */
    'aria-label'?: string;
}
/**
 * Segment
 *
 * SegmentedControl 内の個別セグメント。
 * SegmentedControl の直接の子として配置して使用する。
 *
 * Base UI の Toggle をベースに実装。
 * @see https://base-ui.com/react/components/toggle-group
 */
export declare function Segment({ value, variant, children, disabled, 'aria-label': ariaLabel, }: SegmentProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Segment.d.ts.map