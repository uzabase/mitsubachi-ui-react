import type { ReactNode } from 'react';

export interface TableHeadProps {
  /** テーブルヘッダーのコンテンツ */
  children: ReactNode;
}

/**
 * TableHead
 *
 * `<thead>` をレンダリングするラッパーコンポーネント。
 */
export function TableHead({ children }: TableHeadProps) {
  return <thead>{children}</thead>;
}
