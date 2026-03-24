import React, { useId } from 'react';
import styles from './suggestion.module.css';

export interface SuggestionCategoryProps {
  /** カテゴリーラベル */
  label: string;
  /** 子要素（SuggestionItem） */
  children: React.ReactNode;
}

/**
 * サジェッションリスト内のカテゴリーグループです。
 * カテゴリーラベルの下に候補アイテムをグループ化して表示します。
 */
export const SuggestionCategory = ({
  label,
  children,
}: SuggestionCategoryProps) => {
  const labelId = useId();

  return (
    <div
      role="group"
      aria-labelledby={labelId}
      className={styles.categoryGroup}
    >
      <div id={labelId} className={styles.categoryLabel}>
        {label}
      </div>
      {children}
    </div>
  );
};
