import type { ReactNode } from 'react';
import { TableContext } from '../shared';
import type { TableView } from '../shared';
import styles from './table.module.css';

export interface TableProps {
  /** テーブルのビューモード */
  view: TableView;
  /** テーブルのコンテンツ */
  children: ReactNode;
  /** テーブルのアクセシブルラベル */
  'aria-label'?: string;
}

/**
 * Table
 *
 * テーブルのルートコンポーネント。
 * ネイティブ `<table>` 要素をラップし、`view` をコンテキスト経由で子コンポーネントに配信する。
 */
export function Table({ view, children, 'aria-label': ariaLabel }: TableProps) {
  const tableClassName = [styles.container, styles[view]].join(' ');

  return (
    <TableContext value={{ view }}>
      <div className={tableClassName}>
        <table className={styles.table} aria-label={ariaLabel}>
          {children}
        </table>
      </div>
    </TableContext>
  );
}
