import { default as React } from 'react';
/** FilterChipの選択肢（Group系コンポーネントで使用） */
export interface FilterChipOption {
    /** 一意の値 */
    value: string;
    /** 表示ラベル */
    label: string;
    /** 無効化状態 */
    disabled?: boolean;
}
export interface FilterChipProps {
    /** 表示するラベルテキスト */
    label: string;
    /** 選択状態 */
    selected?: boolean;
    /** クリック時のコールバック */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** 無効化状態 */
    disabled?: boolean;
    /** role属性（Groupから注入） */
    role?: string;
    /** aria-checked属性（SingleSelectGroupから注入） */
    'aria-checked'?: boolean;
    /** aria-pressed属性（MultiSelectGroupから注入） */
    'aria-pressed'?: boolean;
    /** tabIndex属性（ロービングフォーカスで使用） */
    tabIndex?: number;
}
/**
 * フィルター条件を選択・切り替えるためのChipコンポーネントです。
 * 押しボタンのようにオン／オフを切り替えられ、選択された状態を視覚的に示します。
 */
export declare const FilterChip: React.ForwardRefExoticComponent<FilterChipProps & React.RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=FilterChip.d.ts.map