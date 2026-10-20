import { default as React, ReactNode } from 'react';
import { TableView } from '../shared';
export interface TableProps {
    /** テーブルのビューモード */
    view: TableView;
    /** テーブルのコンテンツ */
    children?: ReactNode;
    /** テーブルのアクセシブルラベル（`aria-label` または `aria-labelledby` のいずれかを指定） */
    'aria-label': string;
}
/**
 * Table
 *
 * テーブルのルートコンポーネント。
 * ネイティブ `<table>` 要素をラップし、`view` をコンテキスト経由で子コンポーネントに配信する。
 *
 * `TableCol` を直接の子として配置すると、自動的に `<colgroup>` にまとめてレンダリングする。
 */
export declare function Table({ view, children, 'aria-label': ariaLabel }: TableProps): React.JSX.Element;
//# sourceMappingURL=Table.d.ts.map