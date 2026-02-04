import React from 'react';
import styles from './dialog.module.css';

export interface DialogBodyProps {
  children?: React.ReactNode;
}

/**
 * Dialog の本文エリア。Slot として任意のコンテンツを受け取る。
 */
export function DialogBody({ children }: DialogBodyProps) {
  return <div className={styles.body}>{children}</div>;
}
