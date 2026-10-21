import { default as React } from 'react';
import { DialogHeader, DialogBody, DialogFooter } from '../shared';
/** Form Dialog のサイズ（Desktop 時は medium のみ） */
export type FormDialogSize = 'medium';
export interface FormDialogRootProps {
    /** 開閉状態（制御用） */
    open?: boolean;
    /** 初期の開閉状態（非制御用） */
    defaultOpen?: boolean;
    /** 開閉状態が変わったときのコールバック */
    onOpenChange?: (open: boolean) => void;
    /**
     * ダイアログのサイズ（Desktop 時）
     * @default 'medium'
     */
    size?: FormDialogSize;
    children: React.ReactNode;
}
export interface FormDialogHeaderProps {
    /** ヘッダーに表示するタイトルテキスト */
    text: string;
}
export interface FormDialogBodyProps {
    children: React.ReactNode;
}
export interface FormDialogFooterProps {
    /** キャンセル・閉じるボタンのラベル。省略時はキャンセルボタンを表示しない */
    cancelLabel?: string;
    /** キャンセルボタンクリック時のコールバック */
    onCancel?: () => void;
    /** アクションボタンのラベル */
    actionLabel: string;
    /** アクションボタンクリック時のコールバック */
    onAction?: () => void;
}
declare function FormDialogRoot({ open, defaultOpen, onOpenChange, size, children, }: FormDialogRootProps): import("react/jsx-runtime").JSX.Element;
/**
 * Form Dialog
 *
 * フォーム入力を行うダイアログ。
 * Desktop: size=medium、Phone: 横余白なし・画面端まで、高さも広がる。
 *
 * Base UI の Dialog をベースに実装しています。
 * @see https://base-ui.com/react/components/dialog
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 */
export declare const FormDialog: typeof FormDialogRoot & {
    Header: typeof DialogHeader;
    Body: typeof DialogBody;
    Footer: typeof DialogFooter;
};
export {};
//# sourceMappingURL=FormDialog.d.ts.map