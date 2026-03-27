import type React from 'react';
import styles from './user-message.module.css';

export interface UserMessageProps {
  /** メッセージの内容 */
  children: React.ReactNode;
}

export const UserMessage = ({ children }: UserMessageProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.bubble}>
        <div className={styles.text}>{children}</div>
      </div>
    </div>
  );
};
