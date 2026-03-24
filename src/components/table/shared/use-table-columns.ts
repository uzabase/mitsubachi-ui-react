import { useCallback, useState } from 'react';
import type { TableHeaderMenuItem } from '../table-header-cell';

export interface ColumnOption<K extends string = string> {
  /** データキー */
  key: K;
  /** 表示ラベル */
  label: string;
}

export interface ColumnConfig<K extends string = string> {
  /** 切り替え可能な項目一覧 */
  options: readonly ColumnOption<K>[];
  /** 初期選択キー（省略時は最初の項目） */
  defaultKey?: K;
}

export interface ColumnState<K extends string = string> {
  /** 現在のデータキー */
  currentKey: K;
  /** 現在のヘッダーラベル */
  currentLabel: string;
  /** TableHeaderCell の menuItems に渡す項目（選択中にチェック付き） */
  menuItems: TableHeaderMenuItem[];
}

/** ColumnConfig からオプションキーの型を抽出 */
export type OptionKeysOf<C> = C extends ColumnConfig<infer K> ? K : string;

/** Hook の戻り値型：各カラムIDに対応する ColumnState（キー型推論付き） */
export type UseTableColumnsReturn<
  Config extends Record<string, ColumnConfig<string>>,
> = {
  [P in keyof Config]: ColumnState<OptionKeysOf<Config[P]>>;
};

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
 *   } as const,
 * });
 *
 * // columns.revenue.currentKey は 'revenue' | 'ebitda' 型
 * <TableHeaderCell menuItems={columns.revenue.menuItems}>
 *   {columns.revenue.currentLabel}
 * </TableHeaderCell>
 * <TableBodyCell>{row[columns.revenue.currentKey]}</TableBodyCell>
 * ```
 */
export function useTableColumns<
  Config extends Record<string, ColumnConfig<string>>,
>(config: Config): UseTableColumnsReturn<Config> {
  const keys = Object.keys(config) as (keyof Config & string)[];

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

  const result = {} as UseTableColumnsReturn<Config>;

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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (result as any)[columnId] = {
      currentKey,
      currentLabel,
      menuItems,
    };
  }

  return result;
}
