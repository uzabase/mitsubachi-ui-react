import React from 'react';
import styles from './chip.module.css';

export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 表示するラベルテキスト */
  label: string;
  /** レンダリングする要素タイプ */
  as?: 'span' | 'button';
  /** 選択状態 */
  selected?: boolean;
  /** 無効化状態 */
  disabled?: boolean;
  /** ラベルの先頭に配置するコンテンツ（例: チェックアイコン） */
  startContent?: React.ReactNode;
  /** ラベルの末尾に配置するコンテンツ（例: 閉じるボタン） */
  endContent?: React.ReactNode;
  /** カスタムクラス名（内部コンポジション用） */
  className?: string;
  /** ラベル要素に追加するクラス名（内部コンポジション用） */
  labelClassName?: string;
}

/**
 * 内部専用ベースChipコンポーネント
 *
 * ピル形状・ラベル表示・スロットベースのcompositionを提供する。
 * InputChipやFilterChipの基盤として使用し、外部にはエクスポートしない。
 */
export const Chip = React.forwardRef<HTMLElement, ChipProps>(
  (
    {
      label,
      as: Component = 'span',
      selected = false,
      disabled = false,
      startContent,
      endContent,
      className,
      labelClassName,
      ...rest
    },
    ref
  ) => {
    const chipClassName = [
      styles.chip,
      selected ? styles.selected : styles.unselected,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <Component
        ref={ref as React.Ref<HTMLButtonElement & HTMLSpanElement>}
        className={chipClassName}
        disabled={Component === 'button' ? disabled : undefined}
        {...rest}
      >
        {startContent}
        <span
          className={[styles.label, labelClassName].filter(Boolean).join(' ')}
        >
          {label}
        </span>
        {endContent}
      </Component>
    );
  }
);

Chip.displayName = 'Chip';
