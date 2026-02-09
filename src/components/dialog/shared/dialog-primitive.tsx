import React from 'react';
import { Dialog as BaseDialog } from '@base-ui/react';
import { useDialogContext } from './dialog-context';
import styles from './dialog.module.css';

const sizeClassMap = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
} as const;

const variantClassMap = {
  action: styles.variantAction,
  information: styles.variantInformation,
  form: styles.variantForm,
} as const;

export interface DialogPrimitiveRootProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  /** Variant固有のCSSモジュール */
  variantClassName?: Record<string, string>;
}

/**
 * Base UI Dialog をラップし、共通スタイルと size/variant を適用するルート。
 * DialogContext を消費するため、ActionDialog / InformationDialog / FormDialog の直下で使用すること。
 */
export function DialogPrimitiveRoot({
  open,
  defaultOpen,
  onOpenChange,
  children,
  variantClassName,
}: DialogPrimitiveRootProps) {
  const { size, variant } = useDialogContext();
  const popupClassName = [
    styles.popup,
    sizeClassMap[size],
    variantClassMap[variant],
    variantClassName?.popup,
  ]
    .filter(Boolean)
    .join(' ');
  const viewportClassName = [
    styles.viewport,
    variantClassMap[variant],
    variantClassName?.viewport,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <BaseDialog.Root
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      disablePointerDismissal={true}
    >
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Viewport className={viewportClassName}>
          <BaseDialog.Popup className={popupClassName}>
            {children}
          </BaseDialog.Popup>
        </BaseDialog.Viewport>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
