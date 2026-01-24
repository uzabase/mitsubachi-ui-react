import React from 'react';
import styles from './filter-chip.module.css';

/** チップのサイズ */
export type ChipSize = 'desktop' | 'phone';

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
  children: React.ReactNode;
  /** チップのサイズ */
  size?: ChipSize;
  /** チップの状態 */
  state?: FilterChipState;
  /** 選択状態 */
  selected?: boolean;
  /** クリック時のハンドラ */
  onClick?: () => void;
  /** 無効化 */
  disabled?: boolean;
  /** 追加のクラス名 */
  className?: string;
}

/** FilterChipGroupのProps */
export interface FilterChipGroupProps {
  /** グループ内のFilterChip要素 */
  children: React.ReactNode;
  /** 単一選択か複数選択か */
  multiple?: boolean;
  /** 選択された値（controlled） */
  value?: string | string[];
  /** 選択変更時のハンドラ */
  onChange?: (value: string | string[]) => void;
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
  children,
  size = 'desktop',
  state = 'default',
  selected = false,
  onClick,
  disabled = false,
  className,
}: FilterChipProps) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!disabled && onClick) {
        onClick();
      }
    }
  };

  return (
    <button
      type="button"
      className={`${styles.filterChip} ${styles[`filterChip--${size}`]} ${
        styles[`filterChip--${state}`]
      } ${selected ? styles['filterChip--selected'] : ''} ${
        disabled ? styles['filterChip--disabled'] : ''
      } ${className || ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-pressed={selected}
      aria-disabled={disabled}
    >
      {selected && (
        <span className={styles.filterChipIcon} aria-hidden="true">
          ✓
        </span>
      )}
      <span className={styles.filterChipText}>{children}</span>
    </button>
  );
};

/**
 * FilterChipGroupコンポーネント
 *
 * FilterChipをグループ化し、単一選択または複数選択を管理します。
 * 折り返しを許容します。
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/button/
 */
export const FilterChipGroup = ({
  children,
  multiple = false,
  value,
  onChange,
  className,
}: FilterChipGroupProps) => {
  const handleChipClick = (chipValue: string) => {
    if (!onChange) return;

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(chipValue)
        ? currentValues.filter((v) => v !== chipValue)
        : [...currentValues, chipValue];
      onChange(newValues);
    } else {
      onChange(value === chipValue ? '' : chipValue);
    }
  };

  // childrenを配列化して処理
  const chips = React.Children.toArray(children).map((child, index) => {
    if (React.isValidElement(child) && child.type === FilterChip) {
      const chipValue = child.key?.toString() || `chip-${index}`;
      const isSelected = multiple
        ? Array.isArray(value) && value.includes(chipValue)
        : value === chipValue;

      return React.cloneElement(child as React.ReactElement<FilterChipProps>, {
        selected: isSelected,
        onClick: () => handleChipClick(chipValue),
      });
    }
    return child;
  });

  return (
    <div
      className={`${styles.filterChipGroup} ${className || ''}`}
      role="group"
      aria-label="フィルターチップグループ"
    >
      {chips}
    </div>
  );
};
