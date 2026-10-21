import { default as React } from 'react';
import { DialogHeader, DialogBody, DialogFooter } from '../shared';
/** Information Dialog のサイズ（Desktop 時） */
export type InformationDialogSize = 'small' | 'medium' | 'large';
export interface InformationDialogRootProps {
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
    size?: InformationDialogSize;
    children: React.ReactNode;
}
export interface InformationDialogHeaderProps {
    /** ヘッダーに表示するタイトルテキスト */
    text: string;
}
export interface InformationDialogBodyProps {
    children: React.ReactNode;
}
export interface InformationDialogFooterProps {
    /** キャンセル・閉じるボタンのラベル。省略時はキャンセルボタンを表示しない */
    cancelLabel?: string;
    /** キャンセルボタンクリック時のコールバック */
    onCancel?: () => void;
    /** アクションボタンのラベル（例: 閉じる） */
    actionLabel: string;
    /** アクションボタンクリック時のコールバック */
    onAction?: () => void;
}
declare function InformationDialogRoot({ open, defaultOpen, onOpenChange, size, children, }: InformationDialogRootProps): import("react/jsx-runtime").JSX.Element;
/**
 * Information Dialog
 *
 * 利用規約など、重要な情報を表示するダイアログ。
 * Desktop: size=small / medium / large、Phone: 横余白なし・画面端まで、高さも広がる。
 *
 * Base UI の Dialog をベースに実装しています。
 * @see https://base-ui.com/react/components/dialog
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 */
export declare const InformationDialog: typeof InformationDialogRoot & {
    Header: typeof DialogHeader;
    Body: typeof DialogBody;
    Footer: typeof DialogFooter;
};
export {};
//# sourceMappingURL=InformationDialog.d.ts.map