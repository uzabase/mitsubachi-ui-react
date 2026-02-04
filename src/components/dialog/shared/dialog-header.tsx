import { Dialog as BaseDialog } from '@base-ui/react';
import styles from './dialog.module.css';

export interface DialogHeaderProps {
  /**
   * ヘッダーに表示するタイトルテキスト
   */
  text: string;
}

/**
 * Dialog のヘッダー。Base UI の Dialog.Title を使用し、アクセシビリティを確保する。
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 */
export function DialogHeader({ text }: DialogHeaderProps) {
  return (
    <div className={styles.header}>
      <BaseDialog.Title className={styles.title}>{text}</BaseDialog.Title>
    </div>
  );
}
