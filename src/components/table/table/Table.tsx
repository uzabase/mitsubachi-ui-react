import React, { type ReactNode } from 'react';
import { TableContext } from '../shared';
import type { TableView } from '../shared';
import { TableCol } from '../table-col';
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
 *
 * `TableCol` を直接の子として配置すると、自動的に `<colgroup>` にまとめてレンダリングする。
 */
export function Table({ view, children, 'aria-label': ariaLabel }: TableProps) {
  const tableClassName = [styles.container, styles[view]].join(' ');

  const colElements: ReactNode[] = [];
  const otherChildren: ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === TableCol) {
      colElements.push(child);
    } else {
      otherChildren.push(child);
    }
  });

  return (
    <TableContext value={{ view }}>
      <div className={tableClassName}>
        <table className={styles.table} aria-label={ariaLabel}>
          {colElements.length > 0 && <colgroup>{colElements}</colgroup>}
          {otherChildren}
        </table>
      </div>
    </TableContext>
  );
}
