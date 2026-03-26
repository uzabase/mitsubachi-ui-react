import type { ReactNode } from 'react';

export interface TableBodyProps {
  /** テーブルボディのコンテンツ */
  children: ReactNode;
}

/**
 * TableBody
 *
 * `<tbody>` をレンダリングするラッパーコンポーネント。
 */
export function TableBody({ children }: TableBodyProps) {
  return <tbody>{children}</tbody>;
}
