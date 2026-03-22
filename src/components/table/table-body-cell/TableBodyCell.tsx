import type { ReactNode } from 'react';
import { useTableContext } from '../shared';
import styles from './table-body-cell.module.css';

/** ボディセルのコンテンツタイプ */
export type TableBodyCellContentType =
  | 'text'
  | 'number'
  | 'date'
  | 'checkbox'
  | 'icon-button'
  | 'slot';

export interface TableBodyCellProps {
  /**
   * セルのコンテンツタイプ
   * @default 'text'
   */
  contentType?: TableBodyCellContentType;
  /**
   * セルのコンテンツ。
   *
   * `null`・`undefined`・`''`・`false` の場合はダッシュ（`–`）を
   * セル中央に自動表示する（null 表示）。
   * `0` は有効な値として表示される。
   */
  children?: ReactNode;
}

/** null 表示用のダッシュ */
const NULL_DISPLAY = '–';

/**
 * TableBodyCell
 *
 * テーブルのボディセル。`<td>` をレンダリングする。
 *
 * ## null 表示
 * `children` が空（`null`・`undefined`・`''`・`false`）の場合、
 * セル中央にダッシュ（`–`）を自動表示する。
 * `0` は有効な値として通常表示される。
 */
export function TableBodyCell({
  contentType = 'text',
  children,
}: TableBodyCellProps) {
  const { view } = useTableContext();

  const hasContent = children != null && children !== '' && children !== false;

  const cellClassName = [
    styles.bodyCell,
    styles[view],
    styles[contentType],
    !hasContent && styles.nullValue,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <td className={cellClassName}>
      <span className={styles.cellContent}>
        {hasContent ? children : NULL_DISPLAY}
      </span>
    </td>
  );
}
