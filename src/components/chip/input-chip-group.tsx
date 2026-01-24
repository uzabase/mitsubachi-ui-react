import React from 'react';
import styles from './input-chip.module.css';

/** InputChipGroupのProps */
export interface InputChipGroupProps {
  /** グループ内のInputChip要素 */
  children: React.ReactNode;
  /** グループのアクセシブル名 */
  ariaLabel?: string;
  /** 追加のクラス名 */
  className?: string;
}

/**
 * InputChipをグループ化します。<br/>
 * 折り返しあり、水平スクロールを禁止します。
 */
export const InputChipGroup = ({
  children,
  ariaLabel = '入力チップグループ',
  className,
}: InputChipGroupProps) => {
  return (
    <div
      className={`${styles.inputChipGroup} ${className || ''}`}
      role="group"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
};
