export interface LabelUnitProps {
    /** ラベルテキスト */
    text: string;
    /** 必須表示 */
    required?: boolean;
    /** 補足テキスト */
    supportText?: string;
    /** htmlFor（対応する入力要素のid） */
    htmlFor?: string;
    /** 無効化状態 */
    disabled?: boolean;
}
/**
 * フォーム用コンポーネントが「何を入力・選択するためのものか」を
 * 明確に伝えるためのラベルコンポーネントです。
 */
export declare const LabelUnit: ({ text, required, supportText, htmlFor, disabled, }: LabelUnitProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LabelUnit.d.ts.map