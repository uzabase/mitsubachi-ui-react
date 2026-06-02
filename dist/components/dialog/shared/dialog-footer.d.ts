export interface DialogFooterProps {
    /** キャンセル・閉じるボタンのラベル。省略時はキャンセルボタンを表示しない */
    cancelLabel?: string;
    /** キャンセルボタンクリック時のコールバック */
    onCancel?: () => void;
    /** アクションボタンのラベル */
    actionLabel: string;
    /** アクションボタンクリック時のコールバック（ダイアログは Base UI により閉じる） */
    onAction?: () => void;
}
/**
 * Dialog のフッター。キャンセルとアクションの 2 種類のボタンを持つ。
 * キャンセルなしのパターンは cancelLabel を省略する。
 */
export declare function DialogFooter({ cancelLabel, onCancel, actionLabel, onAction, }: DialogFooterProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=dialog-footer.d.ts.map