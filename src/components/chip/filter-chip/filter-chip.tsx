import React from 'react';
import styles from './filter-chip.module.css';
import type { ChipViewport } from '../types';

/** FilterChipの状態 */
export type FilterChipState =
  | 'default'
  | 'hover'
  | 'active'
  | 'focus'
  | 'disabled';

/** FilterChipのProps */
export interface FilterChipProps {
  /** チップに表示するテキスト */
  label: React.ReactNode;
  /** ビューポート（デスクトップ/モバイル） */
  viewport?: ChipViewport;
  /** チップの状態 */
  state?: FilterChipState;
  /** 選択状態 */
  selected?: boolean;
  /** チップの値（FilterChipGroupで使用） */
  value?: string;
  /** クリック時のハンドラ */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** 無効化 */
  disabled?: boolean;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * FilterChipコンポーネント
 *
 * フィルター選択に使用するチップコンポーネント。
 * 選択状態を表示し、クリックで選択/非選択を切り替えられます。
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
export const FilterChip = ({
  label,
  viewport = 'desktop',
  state = 'default',
  selected = false,
  onClick,
  disabled = false,
  className,
}: FilterChipProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  return (
    <button
      type="button"
      className={`${styles.filterChip} ${styles[`filterChip--${viewport}`]} ${
        styles[`filterChip--${state}`]
      } ${selected ? styles['filterChip--selected'] : ''} ${
        disabled ? styles['filterChip--disabled'] : ''
      } ${className || ''}`}
      onClick={handleClick}
      disabled={disabled}
      aria-pressed={selected}
    >
      {selected && (
        <span className={styles.filterChipIcon} aria-hidden="true">
          ✓
        </span>
      )}
      <span className={styles.filterChipText}>{label}</span>
    </button>
  );
};

FilterChip.displayName = 'FilterChip';
