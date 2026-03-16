import React, { type ReactNode } from 'react';
import {
  KebabMenuIcon,
  SortAscendingIcon,
  SortDefaultIcon,
  SortDescendingIcon,
} from '../../../icons';
import { useTableContext } from '../shared';
import styles from './table-header-cell.module.css';

/** ヘッダーセルのコンテンツタイプ */
export type TableHeaderCellContentType = 'text' | 'checkbox' | 'icon-button';

/** ソート状態 */
export type TableSortState = 'default' | 'ascending' | 'descending';

export interface TableHeaderCellProps {
  /**
   * セルのコンテンツタイプ
   * @default 'text'
   */
  contentType?: TableHeaderCellContentType;
  /**
   * ソート可能かどうか
   * @default false
   */
  sort?: boolean;
  /**
   * 現在のソート状態
   * @default 'default'
   */
  sortState?: TableSortState;
  /** ソート状態変更時のコールバック */
  onSortChange?: (state: TableSortState) => void;
  /** カラムアクションメニューの項目 */
  menuItems?: readonly TableHeaderMenuItem[];
  /** セルのコンテンツ */
  children?: ReactNode;
}

export interface TableHeaderMenuItem {
  /** メニュー項目のラベル */
  label: string;
  /** クリック時のコールバック */
  onClick: () => void;
}

/** ソート状態の遷移マップ */
const SORT_NEXT_STATE: Record<TableSortState, TableSortState> = {
  default: 'ascending',
  ascending: 'descending',
  descending: 'default',
};

/** aria-sort に変換 */
function toAriaSortValue(
  sortState: TableSortState
): 'ascending' | 'descending' | 'none' {
  if (sortState === 'ascending') return 'ascending';
  if (sortState === 'descending') return 'descending';
  return 'none';
}

/**
 * TableHeaderCell
 *
 * テーブルのヘッダーセル。`<th>` をレンダリングする。
 * ソート機能、チェックボックス、アイコンボタンなどのコンテンツタイプに対応。
 */
export function TableHeaderCell({
  contentType = 'text',
  sort = false,
  sortState = 'default',
  onSortChange,
  menuItems,
  children,
}: TableHeaderCellProps) {
  const { view } = useTableContext();

  const isSorted = sortState !== 'default';
  const hasMenu = menuItems && menuItems.length > 0;

  const cellClassName = [
    styles.headerCell,
    styles[view],
    styles[contentType],
    sort && styles.sortable,
    isSorted && styles.sorted,
    hasMenu && styles.hasMenu,
  ]
    .filter(Boolean)
    .join(' ');

  const handleSortClick = () => {
    onSortChange?.(SORT_NEXT_STATE[sortState]);
  };

  const ariaSortValue = sort ? toAriaSortValue(sortState) : undefined;

  const menuButton = hasMenu ? <ColumnMenu menuItems={menuItems} /> : null;

  if (contentType === 'text' && sort) {
    return (
      <th className={cellClassName} scope="col" aria-sort={ariaSortValue}>
        <span className={styles.cellContent}>
          <button
            type="button"
            className={styles.sortButton}
            onClick={handleSortClick}
          >
            <span className={styles.sortLabel}>{children}</span>
            <SortIcon sortState={sortState} />
          </button>
          {menuButton}
        </span>
      </th>
    );
  }

  return (
    <th className={cellClassName} scope="col" aria-sort={ariaSortValue}>
      <span className={styles.cellContent}>
        <span className={styles.cellText}>{children}</span>
        {menuButton}
      </span>
    </th>
  );
}

/** カラムアクションメニュー */
function ColumnMenu({
  menuItems,
}: {
  menuItems: readonly TableHeaderMenuItem[];
}) {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <span className={styles.menuWrapper}>
      <button
        ref={buttonRef}
        type="button"
        className={styles.menuButton}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="カラムメニュー"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <KebabMenuIcon />
      </button>
      {open && (
        <div ref={menuRef} className={styles.menuDropdown} role="menu">
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={styles.menuItem}
              role="menuitem"
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </span>
  );
}

/** ソートアイコンのマッピング */
const SORT_ICON_MAP: Record<TableSortState, React.FC> = {
  default: SortDefaultIcon,
  ascending: SortAscendingIcon,
  descending: SortDescendingIcon,
};

/** ソートアイコン */
function SortIcon({ sortState }: { sortState: TableSortState }) {
  const Icon = SORT_ICON_MAP[sortState];
  return (
    <span className={styles.sortIcon} aria-hidden="true">
      <Icon />
    </span>
  );
}
