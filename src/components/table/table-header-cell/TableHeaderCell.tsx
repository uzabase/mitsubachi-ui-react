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

/** メニュー項目の要素を取得する */
function getMenuItems(menuRef: React.RefObject<HTMLDivElement | null>) {
  return Array.from(
    menuRef.current?.querySelectorAll<HTMLButtonElement>(
      '[role="menuitem"], [role="menuitemradio"]'
    ) ?? []
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

  // メニュー展開時に最初の項目にフォーカス
  React.useEffect(() => {
    if (!open) return;

    const items = getMenuItems(menuRef);
    items[0]?.focus();
  }, [open]);

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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleMenuKeyDown = (e: React.KeyboardEvent) => {
    const items = getMenuItems(menuRef);
    const currentIndex = items.indexOf(e.target as HTMLButtonElement);

    switch (e.key) {
      case 'ArrowDown': {
        e.preventDefault();
        const next = currentIndex + 1 < items.length ? currentIndex + 1 : 0;
        items[next]?.focus();
        break;
      }
      case 'ArrowUp': {
        e.preventDefault();
        const prev =
          currentIndex - 1 >= 0 ? currentIndex - 1 : items.length - 1;
        items[prev]?.focus();
        break;
      }
      case 'Home':
        e.preventDefault();
        items[0]?.focus();
        break;
      case 'End':
        e.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        buttonRef.current?.focus();
        break;
    }
  };

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
        <div
          ref={menuRef}
          className={styles.menuDropdown}
          role="menu"
          tabIndex={-1}
          onKeyDown={handleMenuKeyDown}
        >
          {menuItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={styles.menuItem}
              role={item.selected !== undefined ? 'menuitemradio' : 'menuitem'}
              aria-checked={
                item.selected !== undefined ? item.selected : undefined
              }
              tabIndex={-1}
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

      // 対応する <col> 要素を探す
      const colIndex = th.cellIndex;
      const table = th.closest('table');
      const colgroup = table?.querySelector('colgroup');
      const col = colgroup?.querySelector(
        `col:nth-child(${colIndex + 1})`
      ) as HTMLTableColElement | null;

      // ドラッグ開始時に全 <col> のパーセンテージ幅をピクセル値に固定する
      // これにより、1カラムの変更で他カラムの幅が再計算されるのを防ぐ
      if (colgroup && table) {
        const headerCells = table.querySelectorAll('thead th');
        const cols = colgroup.querySelectorAll('col');
        cols.forEach((c, i) => {
          const headerCell = headerCells[i] as HTMLTableCellElement | undefined;
          if (headerCell) {
            (c as HTMLTableColElement).style.width =
              `${headerCell.offsetWidth}px`;
          }
        });
      }

      // <col> の data-min-width から最小幅を取得（未指定時は 40px）
      const DEFAULT_MIN_WIDTH = 40;
      const minWidth = col
        ? Number(col.dataset.minWidth) || DEFAULT_MIN_WIDTH
        : DEFAULT_MIN_WIDTH;

      const handleMouseMove = (moveEvent: MouseEvent) => {
        const delta = moveEvent.clientX - startX;
        const newWidth = Math.max(minWidth, startWidth + delta);
        const widthPx = `${newWidth}px`;
        if (col) {
          col.style.width = widthPx;
        } else {
          th.style.width = widthPx;
        }
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
