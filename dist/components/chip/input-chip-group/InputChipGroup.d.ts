export interface InputChipItem {
    /** 一意のID */
    id: string;
    /** ラベルテキスト */
    label: string;
}
export interface InputChipGroupProps {
    /** 表示するチップの配列 */
    items: InputChipItem[];
    /** チップ削除時のコールバック */
    onRemove: (id: string) => void;
    /** 無効化状態 */
    disabled?: boolean;
    /** アクセシビリティラベル（必須） */
    'aria-label': string;
}
/**
 * InputChipを横並び・折り返しでレイアウトするWrapperコンポーネントです。
 */
export declare const InputChipGroup: ({ items, onRemove, disabled, "aria-label": ariaLabel, }: InputChipGroupProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=InputChipGroup.d.ts.map