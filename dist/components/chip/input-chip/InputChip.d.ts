export interface InputChipProps {
    /** 表示するラベルテキスト */
    label: string;
    /** 削除ボタンクリック時のコールバック */
    onRemove: () => void;
    /** 無効化状態 */
    disabled?: boolean;
}
/**
 * ユーザーが入力した内容を要素ごとに整理して表示するためのChipコンポーネントです。
 * Chipの削除操作（×ボタン）で、ユーザーが入力内容を簡単に削除することができます。
 */
export declare const InputChip: ({ label, onRemove, disabled, }: InputChipProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=InputChip.d.ts.map