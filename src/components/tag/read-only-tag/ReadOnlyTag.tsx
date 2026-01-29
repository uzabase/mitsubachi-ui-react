import React from 'react';
import styles from './read-only-tag.module.css';

/** Read Only Tagのパターン */
export type ReadOnlyTagPattern =
  | 'neutral'
  | 'information'
  | 'positive'
  | 'negative';

export interface ReadOnlyTagProps {
  /**
   * タグに表示するテキスト
   * @default 'Text'
   */
  text?: string;
  /**
   * アイコンを表示/非表示
   * @default false
   */
  showIcon?: boolean;
  /**
   * カスタムアイコン要素
   * showIconがtrueの場合に表示されます
   */
  icon?: React.ReactNode;
  /**
   * タグのパターン（色の種類）
   * - neutral: グレー（中立的な情報）
   * - information: 青（情報）
   * - positive: 緑（肯定的な情報）
   * - negative: 赤（否定的な情報）
   * @default 'neutral'
   */
  pattern?: ReadOnlyTagPattern;
  'aria-label'?: string;
  role?: 'status' | 'alert' | 'note';
}

/**
 * ReadOnlyTag コンポーネント
 *
 * 情報の分類や属性、状態を示すための表示専用コンポーネントです。
 * ユーザー操作はできず、ラベルとして情報を補足・整理する目的で使用されます。
 *
 */
export const ReadOnlyTag = ({
  text = 'Text',
  showIcon = false,
  icon,
  pattern = 'neutral',
  'aria-label': ariaLabel,
  role = 'status',
}: ReadOnlyTagProps) => {
  return (
    <span
      className={`${styles.tag} ${styles[pattern]}`}
      role={role}
      aria-label={ariaLabel}
    >
      {showIcon && icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.text}>{text}</span>
    </span>
  );
};
