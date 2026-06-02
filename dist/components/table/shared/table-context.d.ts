/** テーブルのビューモード */
export type TableView = 'grid' | 'list';
export interface TableContextValue {
    view: TableView;
}
export declare const TableContext: import('react').Context<TableContextValue | null>;
export declare function useTableContext(): TableContextValue;
//# sourceMappingURL=table-context.d.ts.map