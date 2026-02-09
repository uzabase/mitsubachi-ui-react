import { Dialog as BaseDialog } from '@base-ui/react';
import styles from './dialog.module.css';

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
export function DialogFooter({
  cancelLabel,
  onCancel,
  actionLabel,
  onAction,
}: DialogFooterProps) {
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
        className={styles.footerAction}
        onClick={onAction}
        render={<button type="button" />}
      >
        {actionLabel}
      </BaseDialog.Close>
    </div>
  );
}
