import { default as React } from 'react';
import { DialogHeader, DialogBody, DialogFooter } from '../shared';
/** Action Dialog のサイズ（Desktop 時は small のみ） */
export type ActionDialogSize = 'small';
export interface ActionDialogRootProps {
    /** 開閉状態（制御用） */
    open?: boolean;
    /** 初期の開閉状態（非制御用） */
    defaultOpen?: boolean;
    /** 開閉状態が変わったときのコールバック */
    onOpenChange?: (open: boolean) => void;
    /**
     * ダイアログのサイズ（Desktop 時）
     * @default 'small'
     */
    size?: ActionDialogSize;
    children: React.ReactNode;
}
export interface ActionDialogHeaderProps {
    /** ヘッダーに表示するタイトルテキスト */
    text: string;
}
export interface ActionDialogBodyProps {
    children: React.ReactNode;
}
export interface ActionDialogFooterProps {
    /** キャンセル・閉じるボタンのラベル。省略時はキャンセルボタンを表示しない */
    cancelLabel?: string;
    /** キャンセルボタンクリック時のコールバック */
    onCancel?: () => void;
    /** アクションボタンのラベル */
    actionLabel: string;
    /** アクションボタンクリック時のコールバック */
    onAction?: () => void;
}
declare function ActionDialogRoot({ open, defaultOpen, onOpenChange, size, children, }: ActionDialogRootProps): import("react/jsx-runtime").JSX.Element;
/**
 * Action Dialog
 *
 * 確認や削除など、ユーザーの意思決定を求めるダイアログ。
 * Desktop: size=small、Phone: 横に余白を持ち、高さは広がらない。
 *
 * Base UI の Dialog をベースに実装しています。
 * @see https://base-ui.com/react/components/dialog
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 */
export declare const ActionDialog: typeof ActionDialogRoot & {
    Header: typeof DialogHeader;
    Body: typeof DialogBody;
    Footer: typeof DialogFooter;
};
export {};
//# sourceMappingURL=ActionDialog.d.ts.map