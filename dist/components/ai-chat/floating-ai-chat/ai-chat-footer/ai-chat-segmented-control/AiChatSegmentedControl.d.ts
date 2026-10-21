/** セグメントの値 */
export type AiChatSegmentValue = 'flash' | 'deep';
export interface AiChatSegmentedControlProps {
    /** 選択中の値（controlled） */
    value?: AiChatSegmentValue;
    /** 初期値（uncontrolled） @default 'deep' */
    defaultValue?: AiChatSegmentValue;
    /** 値変更時のコールバック */
    onValueChange?: (value: AiChatSegmentValue) => void;
    /** 無効化状態 @default false */
    disabled?: boolean;
}
export declare const AiChatSegmentedControl: ({ value: valueProp, defaultValue, onValueChange, disabled, }: AiChatSegmentedControlProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AiChatSegmentedControl.d.ts.map