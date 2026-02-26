import { useState, useCallback, useRef, useMemo } from 'react';
import type { ChipViewport } from '../chip';
import type { FilterChipOption } from '../filter-chip';
import { FilterChip } from '../filter-chip';
import styles from './filter-chip-single-select-group.module.css';

export interface FilterChipSingleSelectGroupProps {
  /** 選択肢の配列 */
  options: FilterChipOption[];
  /** ビューポート */
  viewport?: ChipViewport;
  /** 選択中の値（制御モード） */
  value?: string;
  /** 初期選択値（非制御モード） */
  defaultValue?: string;
  /** 選択変更時のコールバック */
  onChange?: (value: string) => void;
  /** グループ全体の無効化 */
  disabled?: boolean;
  /** アクセシビリティラベル（必須） */
  'aria-label': string;
}

/**
 * FilterChipを横並び・折り返しでレイアウトするWrapperコンポーネントです。
 * 単一選択の排他制御を担います。
 */
export const FilterChipSingleSelectGroup = ({
  options,
  viewport = 'desktop',
  value,
  defaultValue = '',
  onChange,
  disabled = false,
  'aria-label': ariaLabel,
}: FilterChipSingleSelectGroupProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const chipRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const enabledIndices = useMemo(
    () =>
      options.reduce<number[]>((acc, option, index) => {
        if (!option.disabled && !disabled) {
          acc.push(index);
        }
        return acc;
      }, []),
    [options, disabled]
  );

  const handleSelect = useCallback(
    (optionValue: string) => {
      if (!isControlled) {
        setInternalValue(optionValue);
      }
      onChange?.(optionValue);
    },
    [isControlled, onChange]
  );

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      const currentIndex = chipRefs.current.findIndex((ref) => ref === target);
      if (currentIndex === -1) return;

      const currentEnabledIndex = enabledIndices.indexOf(currentIndex);
      if (currentEnabledIndex === -1) return;

      let nextEnabledIndex: number | undefined;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown': {
          event.preventDefault();
          nextEnabledIndex =
            currentEnabledIndex < enabledIndices.length - 1
              ? enabledIndices[currentEnabledIndex + 1]
              : enabledIndices[0];
          break;
        }
        case 'ArrowLeft':
        case 'ArrowUp': {
          event.preventDefault();
          nextEnabledIndex =
            currentEnabledIndex > 0
              ? enabledIndices[currentEnabledIndex - 1]
              : enabledIndices[enabledIndices.length - 1];
          break;
        }
        case 'Home': {
          event.preventDefault();
          nextEnabledIndex = enabledIndices[0];
          break;
        }
        case 'End': {
          event.preventDefault();
          nextEnabledIndex = enabledIndices[enabledIndices.length - 1];
          break;
        }
      }

      if (nextEnabledIndex !== undefined) {
        chipRefs.current[nextEnabledIndex]?.focus();
        handleSelect(options[nextEnabledIndex].value);
      }
    },
    [enabledIndices, handleSelect, options]
  );

  const selectedEnabledIndex = enabledIndices.findIndex(
    (i) => options[i].value === currentValue
  );
  const tabbableIndex =
    selectedEnabledIndex !== -1
      ? enabledIndices[selectedEnabledIndex]
      : enabledIndices[0];

  return (
    <div
      className={styles.container}
      role="radiogroup"
      aria-label={ariaLabel}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {options.map((option, index) => {
        const isDisabled = disabled || option.disabled;
        return (
          <FilterChip
            key={option.value}
            ref={(el) => {
              chipRefs.current[index] = el;
            }}
            label={option.label}
            viewport={viewport}
            selected={currentValue === option.value}
            disabled={isDisabled}
            onClick={() => handleSelect(option.value)}
            role="radio"
            aria-checked={currentValue === option.value}
            tabIndex={index === tabbableIndex ? 0 : -1}
          />
        );
      })}
    </div>
  );
};
