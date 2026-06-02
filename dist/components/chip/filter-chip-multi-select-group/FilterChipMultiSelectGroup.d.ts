import { FilterChipOption } from '../filter-chip';
export interface FilterChipMultiSelectGroupProps {
    /** 選択肢の配列 */
    options: FilterChipOption[];
    /** 選択中の値の配列（制御モード） */
    value?: string[];
    /** 初期選択値の配列（非制御モード） */
    defaultValue?: string[];
    /** 選択変更時のコールバック */
    onChange?: (values: string[]) => void;
    /** グループ全体の無効化 */
    disabled?: boolean;
    /** アクセシビリティラベル（必須） */
    'aria-label': string;
}
/**
 * FilterChipを横並び・折り返しでレイアウトするWrapperコンポーネントです。
 * 複数選択を担います。
 */
export declare const FilterChipMultiSelectGroup: ({ options, value, defaultValue, onChange, disabled, "aria-label": ariaLabel, }: FilterChipMultiSelectGroupProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FilterChipMultiSelectGroup.d.ts.map