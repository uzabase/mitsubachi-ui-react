import { TextAreaProps } from '../text-area';
export interface TextAreaUnitProps extends TextAreaProps {
    /** ラベルテキスト */
    label: string;
    /** 補足テキスト */
    supportText?: string;
}
/**
 * LabelUnit + TextArea を組み合わせたフォームフィールドコンポーネントです。
 */
export declare const TextAreaUnit: ({ label, supportText, id, ...textAreaProps }: TextAreaUnitProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TextAreaUnit.d.ts.map