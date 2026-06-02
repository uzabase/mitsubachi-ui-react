import { TableSortState } from '../table-header-cell';
export interface UseTableSortOptions<T> {
    /** ソート対象のデータ配列 */
    data: T[];
    /**
     * カスタム比較関数
     *
     * 指定しない場合、数値は数値比較、その他は文字列比較を行う。
     */
    compareFn?: (a: T, b: T, key: keyof T, direction: 'ascending' | 'descending') => number;
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
export declare function useTableSort<T extends Record<string, unknown>>({ data, compareFn, }: UseTableSortOptions<T>): UseTableSortReturn<T>;
//# sourceMappingURL=use-table-sort.d.ts.map