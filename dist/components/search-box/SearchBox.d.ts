import { default as React } from 'react';
/** SearchBoxのバリアント */
export type SearchBoxVariant = 'primary' | 'secondary';
export interface SearchBoxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    /** 見た目のバリアント */
    variant?: SearchBoxVariant;
    /** クリアボタン押下時のコールバック */
    onClear?: () => void;
}
/**
 * ユーザーが必要な情報を素早く見つけるための入力コンポーネントです。
 * キーワードの入力に応じて、候補表示や検索実行を行い、コンテンツ探索の効率を高めます。
 *
 * ラベル（LabelUnit）と併用して「何を」検索するのかを明示することが望ましいです。
 * ラベルの併用が難しい場合は、プレースホルダーで補足してください。
 *
 * ### 使用例
 * ```tsx
 * <LabelUnit text="競合企業" htmlFor="search-competitor" />
 * <SearchBox id="search-competitor" placeholder="企業を検索" variant="secondary" />
 * ```
 */
export declare const SearchBox: ({ variant, onClear, value, defaultValue, onChange, disabled, ...rest }: SearchBoxProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SearchBox.d.ts.map