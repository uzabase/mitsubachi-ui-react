import { default as React } from 'react';
/** Dialog のサイズ（Desktop 時の max-width を制御） */
export type DialogSize = 'small' | 'medium' | 'large';
/** Dialog のパターン（Phone 時のレイアウトを制御） */
export type DialogVariant = 'action' | 'information' | 'form';
export interface DialogContextValue {
    size: DialogSize;
    variant: DialogVariant;
}
export declare const DialogContext: React.Context<DialogContextValue | null>;
export declare function useDialogContext(): DialogContextValue;
//# sourceMappingURL=dialog-context.d.ts.map