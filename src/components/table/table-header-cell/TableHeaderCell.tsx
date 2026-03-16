import React, { type ReactNode } from 'react';
import {
  CheckIcon,
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
  /**
   * カラム幅のリサイズを許可
   * @default false
   */
  resizable?: boolean;
  /** セルのコンテンツ */
  children?: ReactNode;
}

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
  resizable = false,
  children,
}: TableHeaderCellProps) {
  const { view } = useTableContext();
  const thRef = React.useRef<HTMLTableCellElement>(null);

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
  const resizer = resizable ? <ColumnResizer thRef={thRef} /> : null;

  if (contentType === 'text' && sort) {
    return (
      <th
        ref={thRef}
        className={cellClassName}
        scope="col"
        aria-sort={ariaSortValue}
      >
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
        {resizer}
      </th>
    );
  }

  return (
    <th
      ref={thRef}
      className={cellClassName}
      scope="col"
      aria-sort={ariaSortValue}
    >
      <span className={styles.cellContent}>
        <span className={styles.cellText}>{children}</span>
        {menuButton}
      </span>
      {resizer}
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
              role={item.selected !== undefined ? 'menuitemradio' : 'menuitem'}
              aria-checked={
                item.selected !== undefined ? item.selected : undefined
              }
              onClick={() => {
                item.onClick();
                setOpen(false);
              }}
            >
              <span className={styles.menuItemLabel}>{item.label}</span>
              {item.selected && (
                <span className={styles.menuItemCheck} aria-hidden="true">
                  <CheckIcon />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </span>
  );
}

/** カラムリサイザー */
function ColumnResizer({
  thRef,
}: {
  thRef: React.RefObject<HTMLTableCellElement | null>;
}) {
  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const th = thRef.current;
      if (!th) return;

      const startX = e.clientX;
      const startWidth = th.offsetWidth;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const delta = moveEvent.clientX - startX;
        const newWidth = Math.max(40, startWidth + delta);
        th.style.inlineSize = `${newWidth}px`;
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };

      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [thRef]
  );

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span className={styles.resizer} onMouseDown={handleMouseDown} />
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
