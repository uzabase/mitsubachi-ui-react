import { useState } from 'react';
import { SearchIcon, CheckIcon } from '../../../../../icons';
import styles from './ai-chat-segmented-control.module.css';

/** セグメントの値 */
export type AiChatSegmentValue = 'flash' | 'deep';

export interface AiChatSegmentedControlProps {
  /** 選択中の値（controlled） */
  value?: AiChatSegmentValue;
  /** 初期値（uncontrolled） @default 'deep' */
  defaultValue?: AiChatSegmentValue;
  /** 値変更時のコールバック */
  onValueChange?: (value: AiChatSegmentValue) => void;
  /** 無効化状態 @default false */
  disabled?: boolean;
}

export const AiChatSegmentedControl = ({
  value: valueProp,
  defaultValue = 'deep',
  onValueChange,
  disabled = false,
}: AiChatSegmentedControlProps) => {
  const [internalValue, setInternalValue] =
    useState<AiChatSegmentValue>(defaultValue);
  const value = valueProp ?? internalValue;

  const handleSelect = (next: AiChatSegmentValue) => {
    if (disabled || next === value) return;
    if (valueProp === undefined) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  };

  const containerClassName = [styles.container, disabled && styles.disabled]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClassName}
      role="radiogroup"
      aria-label="リサーチモード"
    >
      <button
        type="button"
        role="radio"
        aria-checked={value === 'flash'}
        aria-label="Flash Research"
        className={[styles.segment, value === 'flash' && styles.selected]
          .filter(Boolean)
          .join(' ')}
        onClick={() => handleSelect('flash')}
        disabled={disabled}
      >
        <span className={styles.icon}>
          <SearchIcon />
        </span>
        <span className={styles.label}>Flash Research</span>
      </button>
      <button
        type="button"
        role="radio"
        aria-checked={value === 'deep'}
        aria-label="Deep Research"
        className={[styles.segment, value === 'deep' && styles.selected]
          .filter(Boolean)
          .join(' ')}
        onClick={() => handleSelect('deep')}
        disabled={disabled}
      >
        <span className={styles.icon}>
          <CheckIcon />
        </span>
        <span className={styles.label}>Deep Research</span>
      </button>
    </div>
  );
};
