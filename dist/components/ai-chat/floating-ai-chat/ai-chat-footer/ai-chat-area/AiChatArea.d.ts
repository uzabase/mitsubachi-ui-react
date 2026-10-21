import { default as React } from 'react';
import { AiChatSegmentValue } from '../ai-chat-segmented-control';
/** AiChatAreaの状態 */
export type AiChatAreaState = 'default' | 'in-progress' | 'disabled';
export interface AiChatAreaProps {
    /** プレースホルダーテキスト @default '質問を入力...' */
    placeholder?: string;
    /** 入力値（controlled） */
    value?: string;
    /** 入力値変更時のコールバック */
    onValueChange?: (value: string) => void;
    /** 送信時のコールバック */
    onSubmit?: () => void;
    /** 停止時のコールバック（in-progress状態で使用） */
    onStop?: () => void;
    /** コンポーネントの状態 @default 'default' */
    state?: AiChatAreaState;
    /** デフォルトのAiChatSegmentedControlの選択値（controlled）。childrenで上書き時は無視される */
    segmentValue?: AiChatSegmentValue;
    /** デフォルトのAiChatSegmentedControlの初期値（uncontrolled）。childrenで上書き時は無視される @default 'deep' */
    defaultSegmentValue?: AiChatSegmentValue;
    /** デフォルトのAiChatSegmentedControlの値変更時コールバック。childrenで上書き時は無視される */
    onSegmentValueChange?: (value: AiChatSegmentValue) => void;
    /** オプションスロットを上書きする場合に使用（デフォルトはAiChatSegmentedControl） */
    children?: React.ReactNode;
}
export declare const AiChatArea: ({ placeholder, value, onValueChange, onSubmit, onStop, state, segmentValue, defaultSegmentValue, onSegmentValueChange, children, }: AiChatAreaProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AiChatArea.d.ts.map