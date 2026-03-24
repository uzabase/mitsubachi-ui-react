import { createContext, useContext } from 'react';

/** テーブルのビューモード */
export type TableView = 'grid' | 'list';

export interface TableContextValue {
  view: TableView;
}

export const TableContext = createContext<TableContextValue | null>(null);

export function useTableContext(): TableContextValue {
  const ctx = useContext(TableContext);
  if (!ctx) {
    throw new Error(
      'Table subcomponents must be used within a Table component.'
    );
  }
  return ctx;
}
