import React from 'react';

/** Dialog のサイズ（Desktop 時の max-width を制御） */
export type DialogSize = 'small' | 'medium' | 'large';

/** Dialog のパターン（Phone 時のレイアウトを制御） */
export type DialogVariant = 'action' | 'information' | 'form';

export interface DialogContextValue {
  size: DialogSize;
  variant: DialogVariant;
}

export const DialogContext = React.createContext<DialogContextValue | null>(
  null
);

export function useDialogContext(): DialogContextValue {
  const ctx = React.useContext(DialogContext);
  if (!ctx) {
    throw new Error(
      'Dialog subcomponents must be used within ActionDialog, InformationDialog, or FormDialog.'
    );
  }
  return ctx;
}
