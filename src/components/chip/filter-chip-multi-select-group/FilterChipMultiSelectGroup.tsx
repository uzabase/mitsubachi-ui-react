import { useState, useCallback } from 'react';
import type { FilterChipOption } from '../filter-chip';
import { FilterChip } from '../filter-chip';
import styles from './filter-chip-multi-select-group.module.css';

export interface FilterChipMultiSelectGroupProps {
  /** 選択肢の配列 */
  options: FilterChipOption[];
  /** 選択中の値の配列（制御モード） */
  value?: string[];
  /** 初期選択値の配列（非制御モード） */
  defaultValue?: string[];
  /** 選択変更時のコールバック */
  onChange?: (values: string[]) => void;
  /** グループ全体の無効化 */
  disabled?: boolean;
  /** アクセシビリティラベル（必須） */
  'aria-label': string;
}

/**
 * FilterChipを横並び・折り返しでレイアウトするWrapperコンポーネントです。
 * 複数選択を担います。
 */
export const FilterChipMultiSelectGroup = ({
  options,
  value,
  defaultValue = [],
  onChange,
  disabled = false,
  'aria-label': ariaLabel,
}: FilterChipMultiSelectGroupProps) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleToggle = useCallback(
    (optionValue: string) => {
      const next = currentValue.includes(optionValue)
        ? currentValue.filter((v) => v !== optionValue)
        : [...currentValue, optionValue];

      if (!isControlled) {
        setInternalValue(next);
      }
      onChange?.(next);
    },
    [currentValue, isControlled, onChange]
  );

  return (
    <div className={styles.container} role="group" aria-label={ariaLabel}>
      {options.map((option) => {
        const isSelected = currentValue.includes(option.value);
        const isDisabled = disabled || option.disabled;

        return (
          <FilterChip
            key={option.value}
            label={option.label}
            selected={isSelected}
            disabled={isDisabled}
            onClick={() => handleToggle(option.value)}
            aria-pressed={isSelected}
          />
        );
      })}
    </div>
  );
};
