import { ReactNode } from 'react';
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
export declare function TableRow({ children, selected }: TableRowProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TableRow.d.ts.map