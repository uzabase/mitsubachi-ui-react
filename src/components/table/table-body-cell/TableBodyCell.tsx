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
   * セルの先頭に表示するアイコン。
   *
   * アイコンとテキストの垂直配置は view に応じて自動で切り替わる:
   * - grid: 上揃え（`flex-start`）
   * - list: 中央揃え（`center`）
   *
   * テキスト系の contentType（`text` など）での使用を想定。
   * `checkbox` や `slot` など他の contentType との併用は非推奨。
   */
  icon?: ReactNode;
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
  icon,
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

  const cellContentClassName = [styles.cellContent, icon && styles.withIcon]
    .filter(Boolean)
    .join(' ');

  const content = hasContent ? children : NULL_DISPLAY;

  return (
    <td className={cellClassName}>
      <span className={cellContentClassName}>
        {icon ? (
          <>
            <span className={styles.icon}>{icon}</span>
            <span className={styles.label}>{content}</span>
          </>
        ) : (
          content
        )}
      </span>
    </td>
  );
}
