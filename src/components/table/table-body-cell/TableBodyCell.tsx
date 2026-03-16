import type { ReactNode } from 'react';
import { useTableContext } from '../shared';
import styles from './table-body-cell.module.css';

/** ボディセルのコンテンツタイプ */
export type TableBodyCellContentType =
  | 'text'
  | 'number'
  | 'date'
  | 'checkbox'
  | 'slot';

export interface TableBodyCellProps {
  /**
   * セルのコンテンツタイプ
   * @default 'text'
   */
  contentType?: TableBodyCellContentType;
  /** セルのコンテンツ */
  children?: ReactNode;
}

/** null 表示用のダッシュ */
const NULL_DISPLAY = '–';

/**
 * TableBodyCell
 *
 * テーブルのボディセル。`<td>` をレンダリングする。
 * children が空の場合は null 表示（`–`）を自動適用する。
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
    <td className={cellClassName}>{hasContent ? children : NULL_DISPLAY}</td>
  );
}
