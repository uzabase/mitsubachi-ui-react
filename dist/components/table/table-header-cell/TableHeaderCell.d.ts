import { ReactNode } from 'react';
/** ヘッダーセルのコンテンツタイプ */
export type TableHeaderCellContentType = 'text' | 'checkbox' | 'icon-button';
/** ソート状態 */
export type TableSortState = 'default' | 'ascending' | 'descending';
interface TableHeaderCellCommonProps {
    /**
     * セルのコンテンツタイプ
     * @default 'text'
     */
    contentType?: TableHeaderCellContentType;
    /** カラムアクションメニューの項目 */
    menuItems?: readonly TableHeaderMenuItem[];
    /**
     * カラム幅のリサイズを許可
     * @default false
     */
    resizable?: boolean;
    /** カラムリサイズ完了時のコールバック */
    onResize?: (width: number) => void;
    /** セルのコンテンツ */
    children?: ReactNode;
}
export type TableHeaderCellProps = TableHeaderCellCommonProps & ({
    sortState?: undefined;
    onSortChange?: undefined;
} | {
    /** 現在のソート状態 */
    sortState: TableSortState;
    /** ソート状態変更時のコールバック */
    onSortChange: (state: TableSortState) => void;
});
export interface TableHeaderMenuItem {
    /** メニュー項目のラベル */
    label: string;
    /** クリック時のコールバック */
    onClick: () => void;
    /**
     * 選択状態（チェックアイコンを表示）
     * @default false
     */
    selected?: boolean;
}
/**
 * TableHeaderCell
 *
 * テーブルのヘッダーセル。`<th>` をレンダリングする。
 * ソート機能、チェックボックス、アイコンボタンなどのコンテンツタイプに対応。
 */
export declare function TableHeaderCell({ contentType, sortState, onSortChange, menuItems, resizable, onResize, children, }: TableHeaderCellProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=TableHeaderCell.d.ts.map