import React from 'react';
import { CheckIcon } from '../../../icons';
import { Chip } from '../chip';
import styles from './filter-chip.module.css';

/** FilterChipの選択肢（Group系コンポーネントで使用） */
export interface FilterChipOption {
  /** 一意の値 */
  value: string;
  /** 表示ラベル */
  label: string;
  /** 無効化状態 */
  disabled?: boolean;
}

export interface FilterChipProps {
  /** 表示するラベルテキスト */
  label: string;
  /** 選択状態 */
  selected?: boolean;
  /** クリック時のコールバック */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** 無効化状態 */
  disabled?: boolean;
  /** role属性（Groupから注入） */
  role?: string;
  /** aria-checked属性（SingleSelectGroupから注入） */
  'aria-checked'?: boolean;
  /** aria-pressed属性（MultiSelectGroupから注入） */
  'aria-pressed'?: boolean;
  /** tabIndex属性（ロービングフォーカスで使用） */
  tabIndex?: number;
}

/**
 * フィルター条件を選択・切り替えるためのChipコンポーネントです。
 * 押しボタンのようにオン／オフを切り替えられ、選択された状態を視覚的に示します。
 */
export const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  (
    {
      label,
      selected = false,
      onClick,
      disabled = false,
      role,
      'aria-checked': ariaChecked,
      'aria-pressed': ariaPressed,
      tabIndex,
    },
    ref
  ) => {
    const chipClassName = [
      styles.filterChip,
      selected ? styles.selected : styles.unselected,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Chip
        ref={ref as React.Ref<HTMLElement>}
        as="button"
        type="button"
        label={label}
        selected={selected}
        disabled={disabled}
        className={chipClassName}
        labelClassName={styles.label}
        onClick={onClick}
        role={role}
        aria-checked={ariaChecked}
        aria-pressed={ariaPressed}
        tabIndex={tabIndex}
        startContent={
          selected ? (
            <span className={styles.checkIcon} aria-hidden="true">
              <CheckIcon />
            </span>
          ) : undefined
        }
      />
    );
  }
);

FilterChip.displayName = 'FilterChip';
