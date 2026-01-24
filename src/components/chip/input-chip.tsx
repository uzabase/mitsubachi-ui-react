import React from 'react';
import styles from './input-chip.module.css';
import CrossSmallIcon from './icons/cross-small.svg';
import SpinnerIcon from './icons/spinner.svg';

/** チップのサイズ */
export type ChipSize = 'desktop' | 'phone';

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
  children: React.ReactNode;
  /** チップのサイズ */
  size?: ChipSize;
  /** チップの状態 */
  state?: InputChipState;
  /** 削除ボタンクリック時のハンドラ */
  onDelete?: () => void;
  /** 無効化 */
  disabled?: boolean;
  /** 追加のクラス名 */
  className?: string;
}

/** InputChipGroupのProps */
export interface InputChipGroupProps {
  /** グループ内のInputChip要素 */
  children: React.ReactNode;
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
  children,
  size = 'desktop',
  state = 'default',
  onDelete,
  disabled = false,
  className,
}: InputChipProps) => {
  const handleDelete = () => {
    if (!disabled && onDelete) {
      onDelete();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleDelete();
    }
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleDelete();
  };

  return (
    <div
      className={`${styles.inputChip} ${styles[`inputChip--${size}`]} ${
        styles[`inputChip--${state}`]
      } ${disabled ? styles['inputChip--disabled'] : ''} ${className || ''}`}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={`${children}を削除`}
      onKeyDown={onDelete && !disabled ? handleKeyDown : undefined}
      aria-disabled={disabled}
    >
      <span className={styles.inputChipText}>{children}</span>
      {onDelete && state !== 'loading' && (
        <button
          type="button"
          className={styles.inputChipDelete}
          onClick={handleDeleteClick}
          tabIndex={-1}
          aria-hidden="true"
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

/**
 * InputChipGroupコンポーネント
 *
 * InputChipをグループ化します。
 * 折り返しあり、水平スクロールを禁止します。
 */
export const InputChipGroup = ({
  children,
  className,
}: InputChipGroupProps) => {
  return (
    <div
      className={`${styles.inputChipGroup} ${className || ''}`}
      role="group"
      aria-label="入力チップグループ"
    >
      {children}
    </div>
  );
};
