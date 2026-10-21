import { default as React } from 'react';
export interface SuggestionProps {
    /** 候補が空のときに表示するメッセージ @default '一致する候補が見つかりません' */
    emptyMessage?: string;
    /** 子要素（SuggestionItem, SuggestionCategory） */
    children?: React.ReactNode;
    /** listboxのアクセシブルラベル */
    'aria-label'?: string;
    /** listboxのID（comboboxのaria-controlsに使用） */
    id?: string;
}
/**
 * 検索ボックスや入力フィールドをクリック、またはキーワードを入力した際に
 * 表示される候補リストのコンポーネントです。
 *
 * 入力中の文字列に基づいて候補を提示し、選択による入力の補助や、
 * キーワードの補完（autocomplete）を通じて、入力の手間を減らし操作効率を高めます。
 */
export declare const Suggestion: ({ emptyMessage, children, "aria-label": ariaLabel, id, }: SuggestionProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Suggestion.d.ts.map