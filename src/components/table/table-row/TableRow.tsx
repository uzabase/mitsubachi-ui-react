import type { ReactNode } from 'react';
import { useTableContext } from '../shared';
import styles from './table-row.module.css';

export interface TableRowProps {
  /** 行のコンテンツ */
  children: ReactNode;
  /**
   * 選択状態
   * @default false
   */
  selected?: boolean;
}

/**
 * TableRow
 *
 * `<tr>` をレンダリングするラッパーコンポーネント。
 * 選択状態とホバー状態のスタイルを管理する。
 */
export function TableRow({ children, selected = false }: TableRowProps) {
  const { view } = useTableContext();

  const className = [styles.row, styles[view], selected && styles.selected]
    .filter(Boolean)
    .join(' ');

  return (
    <tr className={className} aria-selected={selected || undefined}>
      {children}
    </tr>
  );
}
