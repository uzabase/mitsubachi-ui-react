import { default as React } from 'react';
/** TextAreaのサイズ */
export type TextAreaSize = 'medium' | 'large';
/** ビューポート */
export type Viewport = 'desktop' | 'phone';
export interface TextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    /** テキストエリアのサイズ */
    size?: TextAreaSize;
    /** ビューポート */
    viewport?: Viewport;
    /** エラー状態 */
    error?: boolean;
    /** エラーメッセージ一覧 */
    errorMessages?: string[];
    /** 文字数カウント表示（maxCount 設定時は自動表示） */
    showCount?: boolean;
    /** 最大文字数 */
    maxCount?: number;
}
/**
 * 複数行のテキストを入力・編集するためのコンポーネントです。
 * 1行の場合は、TextFieldを使用してください。
 */
export declare const TextArea: ({ size, viewport, error, errorMessages, showCount, maxCount, className, value, defaultValue, onChange, onScroll, disabled, ...props }: TextAreaProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TextArea.d.ts.map