import { ReactNode } from 'react';
/** ボディセルのコンテンツタイプ */
export type TableBodyCellContentType = 'text' | 'number' | 'date' | 'checkbox' | 'icon-button' | 'slot';
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
export declare function TableBodyCell({ contentType, icon, children, }: TableBodyCellProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TableBodyCell.d.ts.map