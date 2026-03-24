export interface TableColProps {
  /** カラム幅（CSS値: "40px", "20%" など）。省略時はブラウザに委ねる */
  width?: string;
  /** リサイズ時の最小幅（px）。省略時は 40 */
  minWidth?: number;
}

/**
 * TableCol
 *
 * テーブルのカラム幅を指定する `<col>` 要素をレンダリングする。
 * Table の直接の子として配置すると、自動的に `<colgroup>` 内にまとめられる。
 */
export function TableCol({ width, minWidth }: TableColProps) {
  return (
    <col style={width ? { width } : undefined} data-min-width={minWidth} />
  );
}
