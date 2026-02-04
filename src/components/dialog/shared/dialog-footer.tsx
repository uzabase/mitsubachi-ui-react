import React from 'react';
import { Dialog as BaseDialog } from '@base-ui/react';
import styles from './dialog.module.css';

/** アクションボタンの種類（通常・破壊的） */
export type DialogFooterActionVariant = 'default' | 'destructive';

export interface DialogFooterProps {
  /** キャンセル・閉じるボタンのラベル。省略時はキャンセルボタンを表示しない */
  cancelLabel?: string;
  /** キャンセルボタンクリック時のコールバック */
  onCancel?: () => void;
  /** アクションボタンのラベル */
  actionLabel: string;
  /** アクションボタンクリック時のコールバック（ダイアログは Base UI により閉じる） */
  onAction?: () => void;
  /** アクションボタンの種類（破壊的変更の場合は 'destructive'） */
  actionVariant?: DialogFooterActionVariant;
}

/**
 * Dialog のフッター。キャンセルとアクションの 2 種類のボタンを持つ。
 * キャンセルなしのパターンは cancelLabel を省略する。
 */
export function DialogFooter({
  cancelLabel,
  onCancel,
  actionLabel,
  onAction,
  actionVariant = 'default',
}: DialogFooterProps) {
  const actionClassName =
    actionVariant === 'destructive'
      ? `${styles.footerAction} ${styles.footerActionDestructive}`
      : styles.footerAction;

  return (
    <div className={styles.footer}>
      {cancelLabel != null && (
        <BaseDialog.Close
          className={styles.footerCancel}
          onClick={onCancel}
          render={<button type="button" />}
        >
          {cancelLabel}
        </BaseDialog.Close>
      )}
      <BaseDialog.Close
        className={actionClassName}
        render={(props) => {
          const baseOnClick = props.onClick as
            | ((e: React.MouseEvent<HTMLButtonElement>) => void)
            | undefined;
          return (
            <button
              {...props}
              type="button"
              onClick={(e) => {
                onAction?.();
                baseOnClick?.(e);
              }}
            >
              {actionLabel}
            </button>
          );
        }}
      />
    </div>
  );
}
