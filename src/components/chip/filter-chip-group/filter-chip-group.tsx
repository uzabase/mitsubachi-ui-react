import React, { useState } from 'react';
import type { FilterChipProps } from '../filter-chip/filter-chip';
import styles from './filter-chip-group.module.css';

/** FilterChipGroupの共通Props */
type FilterChipGroupPropsBase = {
  /** グループ内のFilterChip要素 */
  children:
    | React.ReactElement<FilterChipProps>
    | React.ReactElement<FilterChipProps>[];
  /** 追加のクラス名 */
  className?: string;
};

/** 単一選択モードのProps */
type FilterChipGroupPropsSingle = FilterChipGroupPropsBase & {
  /** 選択モード（デフォルト: 'single'） */
  selectionMode?: 'single';
  /** 選択された値（controlled） */
  value?: string | null;
  /** 初期選択値（uncontrolled） */
  defaultValue?: string | null;
  /** 選択変更時のハンドラ */
  onChange?: (value: string | null) => void;
};

/** 複数選択モードのProps */
type FilterChipGroupPropsMultiple = FilterChipGroupPropsBase & {
  /** 選択モード */
  selectionMode: 'multiple';
  /** 選択された値（controlled） */
  value?: string[];
  /** 初期選択値（uncontrolled） */
  defaultValue?: string[];
  /** 選択変更時のハンドラ */
  onChange?: (value: string[]) => void;
};

/** FilterChipGroupのProps */
export type FilterChipGroupProps =
  | FilterChipGroupPropsSingle
  | FilterChipGroupPropsMultiple;

/**
 * FilterChipをグループ化し、単一選択または複数選択を管理します。<br/>
 * 折り返しを許容します。
 *
 * @remarks <br/>
 * FilterChipGroup内で使用するFilterChipには、必ず一意な`value` を指定してください。<br/>
 * （`value`が指定されていない場合、開発時にエラーが出力されます）
 */
export const FilterChipGroup = (props: FilterChipGroupProps) => {
  const { children, className } = props;
  const selectionMode = props.selectionMode ?? 'single';

  // Uncontrolled state
  const [internalValueSingle, setInternalValueSingle] = useState<string | null>(
    selectionMode === 'single'
      ? ((props as FilterChipGroupPropsSingle).defaultValue ?? null)
      : null
  );
  const [internalValueMultiple, setInternalValueMultiple] = useState<string[]>(
    selectionMode === 'multiple'
      ? ((props as FilterChipGroupPropsMultiple).defaultValue ?? [])
      : []
  );

  // Controlled/Uncontrolled の判定
  const isControlled =
    (selectionMode === 'single' && props.value !== undefined) ||
    (selectionMode === 'multiple' && props.value !== undefined);

  // 現在の値を取得
  const currentValue =
    selectionMode === 'single'
      ? isControlled
        ? ((props as FilterChipGroupPropsSingle).value ?? null)
        : internalValueSingle
      : isControlled
        ? ((props as FilterChipGroupPropsMultiple).value ?? [])
        : internalValueMultiple;

  const handleChipClick = (chipValue: string) => {
    if (selectionMode === 'single') {
      const newValue = currentValue === chipValue ? null : chipValue;

      if (!isControlled) {
        setInternalValueSingle(newValue);
      }

      if (props.onChange) {
        (props.onChange as (value: string | null) => void)(newValue);
      }
    } else {
      const currentValues = currentValue as string[];
      const newValues = currentValues.includes(chipValue)
        ? currentValues.filter((v) => v !== chipValue)
        : [...currentValues, chipValue];

      if (!isControlled) {
        setInternalValueMultiple(newValues);
      }

      if (props.onChange) {
        (props.onChange as (value: string[]) => void)(newValues);
      }
    }
  };

  // childrenを配列化して処理
  const chips = React.Children.toArray(children).map((child, index) => {
    // 型で保証されているので、React.ReactElement<FilterChipProps>として扱える
    const chipElement = child as React.ReactElement<FilterChipProps>;
    const chipValue = chipElement.props.value;

    // FilterChipGroup内ではvalueが必須
    if (!chipValue) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(
          `FilterChipGroup: FilterChip at index ${index} is missing required "value" prop. ` +
            `Each FilterChip within FilterChipGroup must have a unique "value" prop.`
        );
      }
      return child;
    }

    const isSelected =
      selectionMode === 'single'
        ? currentValue === chipValue
        : (currentValue as string[]).includes(chipValue);

    // 元のonClickと新しいonClickを合成（eventを透過）
    const originalOnClick = chipElement.props.onClick;
    const composedOnClick: React.MouseEventHandler<HTMLButtonElement> = (
      event
    ) => {
      // 元のonClickがあれば先に実行（analytics等の副作用）
      originalOnClick?.(event);
      // Groupの選択ロジックを実行
      handleChipClick(chipValue);
    };

    return React.cloneElement(chipElement, {
      selected: isSelected,
      onClick: composedOnClick,
    });
  });

  return (
    <div
      className={`${styles.filterChipGroup} ${className || ''}`}
      role="group"
      aria-label={`フィルターチップグループ（${
        selectionMode === 'single' ? '単一選択' : '複数選択'
      }）`}
    >
      {chips}
    </div>
  );
};
