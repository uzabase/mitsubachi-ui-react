import { useCallback, useState } from 'react';
import type { TableHeaderMenuItem } from '../table-header-cell';

export interface ColumnOption {
  /** データキー */
  key: string;
  /** 表示ラベル */
  label: string;
}

export interface ColumnConfig {
  /** 切り替え可能な項目一覧 */
  options: readonly ColumnOption[];
  /** 初期選択キー（省略時は最初の項目） */
  defaultKey?: string;
}

export interface ColumnState {
  /** 現在のデータキー */
  currentKey: string;
  /** 現在のヘッダーラベル */
  currentLabel: string;
  /** TableHeaderCell の menuItems に渡す項目（選択中にチェック付き） */
  menuItems: TableHeaderMenuItem[];
}

export type UseTableColumnsReturn<K extends string> = Record<K, ColumnState>;

/**
 * useTableColumns
 *
 * カラムの表示項目切り替えを管理するカスタムHook。
 * メニューで項目を選択すると、ヘッダーラベルとデータキーが連動して切り替わる。
 *
 * @example
 * ```tsx
 * const columns = useTableColumns({
 *   revenue: {
 *     options: [
 *       { key: 'revenue', label: '営業利益' },
 *       { key: 'ebitda', label: 'EBITDA' },
 *     ],
 *   },
 * });
 *
 * <TableHeaderCell menuItems={columns.revenue.menuItems}>
 *   {columns.revenue.currentLabel}
 * </TableHeaderCell>
 * <TableBodyCell>{row[columns.revenue.currentKey]}</TableBodyCell>
 * ```
 */
export function useTableColumns<K extends string>(
  config: Record<K, ColumnConfig>
): UseTableColumnsReturn<K> {
  const keys = Object.keys(config) as K[];

  const initialState = () => {
    const state: Record<string, string> = {};
    for (const key of keys) {
      const col = config[key];
      state[key] = col.defaultKey ?? col.options[0].key;
    }
    return state;
  };

  const [selectedKeys, setSelectedKeys] = useState(initialState);

  const selectOption = useCallback((columnId: string, optionKey: string) => {
    setSelectedKeys((prev) => ({ ...prev, [columnId]: optionKey }));
  }, []);

  const result = {} as Record<K, ColumnState>;

  for (const columnId of keys) {
    const col = config[columnId];
    const currentKey = selectedKeys[columnId];
    const currentOption = col.options.find((o) => o.key === currentKey);
    const currentLabel = currentOption?.label ?? col.options[0].label;

    const menuItems: TableHeaderMenuItem[] = col.options.map((option) => ({
      label: option.label,
      selected: option.key === currentKey,
      onClick: () => selectOption(columnId, option.key),
    }));

    result[columnId] = {
      currentKey,
      currentLabel,
      menuItems,
    };
  }

  return result;
}
