import { useCallback, useMemo, useState } from 'react';
import type { TableSortState } from '../table-header-cell';

export interface UseTableSortOptions<T> {
  /** ソート対象のデータ配列 */
  data: T[];
  /**
   * カスタム比較関数
   *
   * 指定しない場合、数値は数値比較、その他は文字列比較を行う。
   */
  compareFn?: (
    a: T,
    b: T,
    key: keyof T,
    direction: 'ascending' | 'descending'
  ) => number;
}

export interface UseTableSortReturn<T> {
  /** ソート済みデータ */
  sortedData: T[];
  /** 指定カラムの現在のソート状態を取得 */
  getSortState: (key: keyof T) => TableSortState;
  /** ソート変更ハンドラを生成（TableHeaderCell の onSortChange に渡す） */
  createSortHandler: (key: keyof T) => (nextState: TableSortState) => void;
  /** 現在のソートカラム（未ソート時は null） */
  sortKey: keyof T | null;
  /** 現在のソート方向 */
  sortState: TableSortState;
  /** ソートをリセット */
  resetSort: () => void;
}

/**
 * useTableSort
 *
 * テーブルのソート状態管理とデータ並び替えを提供するカスタムHook。
 *
 * @example
 * ```tsx
 * const { sortedData, getSortState, createSortHandler } = useTableSort({ data: rows });
 *
 * <TableHeaderCell sortState={getSortState('name')} onSortChange={createSortHandler('name')}>
 *   企業名
 * </TableHeaderCell>
 * ```
 */
export function useTableSort<T extends Record<string, unknown>>({
  data,
  compareFn,
}: UseTableSortOptions<T>): UseTableSortReturn<T> {
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortState, setSortState] = useState<TableSortState>('default');

  const createSortHandler = useCallback(
    (key: keyof T) => (nextState: TableSortState) => {
      if (nextState === 'default') {
        setSortKey(null);
        setSortState('default');
      } else {
        setSortKey(key);
        setSortState(nextState);
      }
    },
    []
  );

  const getSortState = useCallback(
    (key: keyof T): TableSortState => (sortKey === key ? sortState : 'default'),
    [sortKey, sortState]
  );

  const resetSort = useCallback(() => {
    setSortKey(null);
    setSortState('default');
  }, []);

  const sortedData = useMemo(() => {
    if (!sortKey || sortState === 'default') return data;

    const direction = sortState === 'ascending' ? 1 : -1;

    return [...data].sort((a, b) => {
      if (compareFn) {
        return compareFn(a, b, sortKey, sortState);
      }

      const valA = a[sortKey];
      const valB = b[sortKey];

      if (valA == null && valB == null) return 0;
      if (valA == null) return 1;
      if (valB == null) return -1;

      if (typeof valA === 'number' && typeof valB === 'number') {
        return (valA - valB) * direction;
      }

      return String(valA).localeCompare(String(valB)) * direction;
    });
  }, [data, sortKey, sortState, compareFn]);

  return {
    sortedData,
    getSortState,
    createSortHandler,
    sortKey,
    sortState,
    resetSort,
  };
}
