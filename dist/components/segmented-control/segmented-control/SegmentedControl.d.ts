import { ReactNode } from 'react';
export interface SegmentedControlProps {
    /**
     * 現在選択されているセグメントの値（制御モード）
     *
     * 排他的な単一選択（ラジオボタン相当）のUIとして使用します。
     * 複数選択が必要な場合は、チェックボックスグループの使用を検討してください。
     */
    value?: string;
    /** 初期選択セグメントの値（非制御モード） */
    defaultValue?: string;
    /**
     * セグメント切り替え時のコールバック
     */
    onValueChange?: (value: string) => void;
    /**
     * 無効化状態（全セグメントを無効化）
     * @default false
     */
    disabled?: boolean;
    /** Segment コンポーネント群 */
    children: ReactNode;
    /** アクセシブルラベル */
    'aria-label'?: string;
}
/**
 * SegmentedControl
 *
 * 排他的な単一選択（ラジオボタン相当）のセグメントグループ。
 * Segment コンポーネントを子として配置して使用する。
 *
 * 複数選択が必要な場合は、チェックボックスグループの使用を検討してください。
 *
 * Base UI の ToggleGroup をベースに実装。
 * @see https://base-ui.com/react/components/toggle-group
 *
 * @example
 * ```tsx
 * <SegmentedControl defaultValue="tab1" aria-label="表示切り替え">
 *   <Segment variant="text" value="tab1">タブ1</Segment>
 *   <Segment variant="text" value="tab2">タブ2</Segment>
 *   <Segment variant="text" value="tab3">タブ3</Segment>
 * </SegmentedControl>
 * ```
 */
export declare function SegmentedControl({ value, defaultValue, onValueChange, disabled, children, 'aria-label': ariaLabel, }: SegmentedControlProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SegmentedControl.d.ts.map