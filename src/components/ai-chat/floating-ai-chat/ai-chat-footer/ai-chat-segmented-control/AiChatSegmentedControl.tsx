import { useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { SearchIcon, CheckIcon } from '../../../../../icons';
import styles from './ai-chat-segmented-control.module.css';

/** セグメントの値 */
export type AiChatSegmentValue = 'flash' | 'deep';

const SEGMENTS: AiChatSegmentValue[] = ['flash', 'deep'];

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
  const segmentRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleSelect = (next: AiChatSegmentValue) => {
    if (disabled || next === value) return;
    if (valueProp === undefined) {
      setInternalValue(next);
    }
    onValueChange?.(next);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = SEGMENTS.indexOf(value);
    let nextIndex: number | undefined;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      nextIndex = (currentIndex + 1) % SEGMENTS.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      nextIndex = (currentIndex - 1 + SEGMENTS.length) % SEGMENTS.length;
    }

    if (nextIndex !== undefined) {
      const next = SEGMENTS[nextIndex];
      handleSelect(next);
      segmentRefs.current[nextIndex]?.focus();
    }
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
      {SEGMENTS.map((segment, index) => (
        <button
          key={segment}
          ref={(el) => {
            segmentRefs.current[index] = el;
          }}
          type="button"
          role="radio"
          aria-checked={value === segment}
          aria-label={segment === 'flash' ? 'Flash Research' : 'Deep Research'}
          tabIndex={value === segment ? 0 : -1}
          className={[styles.segment, value === segment && styles.selected]
            .filter(Boolean)
            .join(' ')}
          onClick={() => handleSelect(segment)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
        >
          <span className={styles.icon}>
            {segment === 'flash' ? (
              <SearchIcon size={18} />
            ) : (
              <CheckIcon size={18} />
            )}
          </span>
          <span className={styles.label}>
            {segment === 'flash' ? 'Flash Research' : 'Deep Research'}
          </span>
        </button>
      ))}
    </div>
  );
};
