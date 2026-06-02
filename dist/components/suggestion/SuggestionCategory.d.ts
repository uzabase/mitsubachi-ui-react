import { default as React } from 'react';
export interface SuggestionCategoryProps {
    /** カテゴリーラベル */
    label: string;
    /** 子要素（SuggestionItem） */
    children: React.ReactNode;
}
/**
 * サジェッションリスト内のカテゴリーグループです。
 * カテゴリーラベルの下に候補アイテムをグループ化して表示します。
 */
export declare const SuggestionCategory: ({ label, children, }: SuggestionCategoryProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SuggestionCategory.d.ts.map