import React from 'react';
import styles from './input-chip.module.css';
import CrossSmallIcon from '../icons/cross-small.svg';
import SpinnerIcon from '../icons/spinner.svg';
import type { ChipViewport } from '../types';

/** InputChipの状態 */
export type InputChipState =
  | 'default'
  | 'hover'
  | 'active'
  | 'focus'
  | 'loading'
  | 'disabled';

/** InputChipのProps */
export interface InputChipProps {
  /** チップに表示するテキスト */
  label: React.ReactNode;
  /** ビューポート（デスクトップ/モバイル） */
  viewport?: ChipViewport;
  /** チップの状態 */
  state?: InputChipState;
  /** チップの値（InputChipGroupで使用） */
  value?: string;
  /** 削除ボタンクリック時のハンドラ */
  onDelete?: () => void;
  /** 無効化 */
  disabled?: boolean;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * InputChipコンポーネント
 *
 * 入力値の表示と削除に使用するチップコンポーネント。
 * 削除ボタンでチップを削除できます。
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
export const InputChip = ({
  label,
  viewport = 'desktop',
  state = 'default',
  onDelete,
  disabled = false,
  className,
}: InputChipProps) => {
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled && onDelete) {
      onDelete();
    }
  };

  return (
    <div
      className={`${styles.inputChip} ${styles[`inputChip--${viewport}`]} ${
        styles[`inputChip--${state}`]
      } ${disabled ? styles['inputChip--disabled'] : ''} ${className || ''}`}
    >
      <span className={styles.inputChipText}>{label}</span>
      {onDelete && state !== 'loading' && (
        <button
          type="button"
          className={styles.inputChipDelete}
          onClick={handleDeleteClick}
          aria-label="削除"
          disabled={disabled}
        >
          <img src={CrossSmallIcon} alt="" />
        </button>
      )}
      {state === 'loading' && (
        <span className={styles.inputChipLoading} aria-hidden="true">
          <img src={SpinnerIcon} alt="" />
        </span>
      )}
    </div>
  );
};

InputChip.displayName = 'InputChip';
