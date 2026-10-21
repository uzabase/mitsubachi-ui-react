import { FilterChipOption } from '../filter-chip';
export interface FilterChipSingleSelectGroupProps {
    /** 選択肢の配列 */
    options: FilterChipOption[];
    /** 選択中の値（制御モード） */
    value?: string;
    /** 初期選択値（非制御モード） */
    defaultValue?: string;
    /** 選択変更時のコールバック */
    onChange?: (value: string) => void;
    /** グループ全体の無効化 */
    disabled?: boolean;
    /** アクセシビリティラベル（必須） */
    'aria-label': string;
}
/**
 * FilterChipを横並び・折り返しでレイアウトするWrapperコンポーネントです。
 * 単一選択の排他制御を担います。
 */
export declare const FilterChipSingleSelectGroup: ({ options, value, defaultValue, onChange, disabled, "aria-label": ariaLabel, }: FilterChipSingleSelectGroupProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FilterChipSingleSelectGroup.d.ts.map