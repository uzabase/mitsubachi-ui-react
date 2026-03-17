import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Table } from '../../../src/components/table/table';
import { TableHead } from '../../../src/components/table/table-head';
import { TableBody } from '../../../src/components/table/table-body';
import { TableRow } from '../../../src/components/table/table-row';
import { TableHeaderCell } from '../../../src/components/table/table-header-cell';
import { TableBodyCell } from '../../../src/components/table/table-body-cell';
import {
  useTableSort,
  useTableColumns,
} from '../../../src/components/table/shared';
import { TableCol } from '../../../src/components/table/table-col';
import { DummyIcon } from '../../../src/icons';
import { Checkbox } from '../../../src/components/checkbox';

const meta = {
  title: 'Components/Table/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'データを行と列で表示するテーブルコンポーネントです。\n' +
          'グリッドビューとリストビューの2つのビューモードを持ちます。\n\n' +
          '- **グリッドビュー**: 行×列の二次元構造で、比較・分析に適しています（例: 財務諸表、競合比較）\n' +
          '- **リストビュー**: 一覧形式で、閲覧・把握に適しています（例: ユーザー一覧、人物一覧）\n\n' +
          'ソート機能は `useTableSort` Hook で提供しています。\n' +
          'カラムアクションメニューは `menuItems` prop で表示できます。\n\n' +
          '## 使用例\n\n' +
          '```tsx\n' +
          '<Table view="grid" aria-label="財務データ">\n' +
          '  <TableCol width="40%" />\n' +
          '  <TableCol width="30%" />\n' +
          '  <TableHead>\n' +
          '    <TableRow>\n' +
          '      <TableHeaderCell>企業名</TableHeaderCell>\n' +
          '      <TableHeaderCell sort sortState="ascending" onSortChange={fn}>\n' +
          '        売上\n' +
          '      </TableHeaderCell>\n' +
          '    </TableRow>\n' +
          '  </TableHead>\n' +
          '  <TableBody>\n' +
          '    <TableRow>\n' +
          '      <TableBodyCell>株式会社A</TableBodyCell>\n' +
          '      <TableBodyCell contentType="number">99,999</TableBodyCell>\n' +
          '    </TableRow>\n' +
          '  </TableBody>\n' +
          '</Table>\n' +
          '```\n\n' +
          '## 行の選択状態について\n\n' +
          '> **⚠️注意:** チェックボックスの選択状態と行の背景色（青色）は自動では連動しません。\n' +
          '> チェックボックスの状態を管理し、`TableRow` の `selected` prop に反映してください。\n\n' +
          '```tsx\n' +
          'const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());\n\n' +
          '<TableRow selected={selectedIds.has(row.id)}>\n' +
          '  <TableBodyCell contentType="checkbox">\n' +
          '    <Checkbox\n' +
          '      checked={selectedIds.has(row.id)}\n' +
          '      onCheckedChange={() => toggleRow(row.id)}\n' +
          '    />\n' +
          '  </TableBodyCell>\n' +
          '</TableRow>\n' +
          '```',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==============================
   サンプルデータ
   ============================== */

const defaultMenuItems = [
  { label: '昇順でソート', onClick: () => {} },
  { label: '降順でソート', onClick: () => {} },
  { label: 'カラムを非表示', onClick: () => {} },
];

const revenueColumnConfig = {
  options: [
    { key: 'revenue', label: '営業利益' },
    { key: 'totalRevenue', label: '売上高合計' },
    { key: 'ebitda', label: 'EBITDA' },
    { key: 'ordinaryIncome', label: '経常利益' },
    { key: 'totalAssets', label: '資産合計' },
    { key: 'revenueGrowth', label: '売上高増加率' },
    { key: 'employees', label: '期末従業員数' },
    { key: 'marketCap', label: '時価総額' },
  ],
};

const sampleData = [
  {
    id: 1,
    name: 'Label',
    text: 'Text',
    revenue: 99,
    totalRevenue: 1200,
    ebitda: 150,
    ordinaryIncome: 80,
    totalAssets: 5000,
    revenueGrowth: 3.2,
    employees: 120,
    marketCap: 8000,
    ratio: '99.00%',
    date: '2025/00/00',
    description: 'Text',
  },
  {
    id: 2,
    name: 'Text',
    text: 'Text',
    revenue: 999,
    totalRevenue: 15000,
    ebitda: 2100,
    ordinaryIncome: 1800,
    totalAssets: 42000,
    revenueGrowth: 5.8,
    employees: 850,
    marketCap: 62000,
    ratio: '99.00%',
    date: '2025/00/00',
    description: 'Text',
  },
  {
    id: 3,
    name: 'Text',
    text: 'Text',
    revenue: 999,
    totalRevenue: 15000,
    ebitda: 1900,
    ordinaryIncome: 1600,
    totalAssets: 38000,
    revenueGrowth: 4.1,
    employees: 720,
    marketCap: 55000,
    ratio: '99.00%',
    date: '2025/00/00',
    description: 'Text',
  },
  {
    id: 4,
    name: 'Label',
    text: null,
    revenue: 9999,
    totalRevenue: 120000,
    ebitda: 18000,
    ordinaryIncome: 15000,
    totalAssets: 350000,
    revenueGrowth: 8.5,
    employees: 3200,
    marketCap: 480000,
    ratio: '99.00%',
    date: '2025/00/00',
    description: 'Text',
  },
  {
    id: 5,
    name: 'Label',
    text: null,
    revenue: 9999,
    totalRevenue: 120000,
    ebitda: 17500,
    ordinaryIncome: 14200,
    totalAssets: 320000,
    revenueGrowth: 7.3,
    employees: 2800,
    marketCap: 450000,
    ratio: '99.00%',
    date: '2025/00/00',
    description: 'Text',
  },
  {
    id: 6,
    name: 'Label',
    text: null,
    revenue: 99999,
    totalRevenue: 980000,
    ebitda: 150000,
    ordinaryIncome: 130000,
    totalAssets: 2800000,
    revenueGrowth: 12.4,
    employees: 15000,
    marketCap: 3500000,
    ratio: '99.00%',
    date: '2025/00/00',
    description:
      'TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText',
  },
  {
    id: 7,
    name: 'Label',
    text: null,
    revenue: 99999,
    totalRevenue: 950000,
    ebitda: 140000,
    ordinaryIncome: 125000,
    totalAssets: 2600000,
    revenueGrowth: 11.1,
    employees: 14000,
    marketCap: 3200000,
    ratio: '99.00%',
    date: '2025/00/00',
    description:
      'TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText',
  },
];

/* ==============================
   共通のステートフルテーブルロジック
   ============================== */

function useTableInteraction() {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set([5]));
  const { sortedData, getSortState, createSortHandler } = useTableSort({
    data: sampleData,
  });
  const columns = useTableColumns({
    revenue: revenueColumnConfig,
  });

  const allSelected =
    sampleData.length > 0 && selectedIds.size === sampleData.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  const toggleRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(sampleData.map((row) => row.id)));
    }
  };

  return {
    sortedData,
    getSortState,
    createSortHandler,
    columns,
    selectedIds,
    allSelected,
    someSelected,
    toggleRow,
    toggleAll,
  };
}

/* ==============================
   Grid View
   ============================== */

/**
 * Grid View
 *
 * グリッドビュー：行×列の二次元構造で、比較・分析に適したビュー。
 * チェックボックス、ソート、カラムメニュー、長い文字列の折り返し、
 * Slot、選択行を含むフル機能デモ。
 */
export const GridView: Story = {
  args: {
    view: 'grid',
    'aria-label': 'グリッドビュー',
  },
  render: function GridViewStory(args) {
    const {
      sortedData,
      getSortState,
      createSortHandler,
      columns,
      selectedIds,
      allSelected,
      someSelected,
      toggleRow,
      toggleAll,
    } = useTableInteraction();

    return (
      <Table {...args}>
        <TableCol width="40px" minWidth={40} />
        <TableCol width="15%" />
        <TableCol width="10%" />
        <TableCol width="15%" />
        <TableCol width="10%" />
        <TableCol width="12%" />
        <TableCol />
        <TableCol width="80px" />
        <TableHead>
          <TableRow>
            <TableHeaderCell contentType="checkbox" resizable>
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onCheckedChange={toggleAll}
                aria-label="すべての行を選択"
              />
            </TableHeaderCell>
            <TableHeaderCell resizable>Title</TableHeaderCell>
            <TableHeaderCell resizable menuItems={defaultMenuItems}>
              文字列
            </TableHeaderCell>
            <TableHeaderCell
              sort
              sortState={getSortState(columns.revenue.currentKey)}
              onSortChange={createSortHandler(columns.revenue.currentKey)}
              menuItems={columns.revenue.menuItems}
              resizable
            >
              {columns.revenue.currentLabel}
            </TableHeaderCell>
            <TableHeaderCell
              sort
              resizable
              sortState={getSortState('ratio')}
              onSortChange={createSortHandler('ratio')}
            >
              数字
            </TableHeaderCell>
            <TableHeaderCell
              sort
              sortState={getSortState('date')}
              onSortChange={createSortHandler('date')}
              resizable
            >
              日付
            </TableHeaderCell>
            <TableHeaderCell resizable>
              長い文字列長い文字列長い文字列長い文字列長い文字列長い文字列
            </TableHeaderCell>
            <TableHeaderCell resizable>
              ボタンなどのコンポーネントやリッチテキスト
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.id} selected={selectedIds.has(row.id)}>
              <TableBodyCell contentType="checkbox">
                <Checkbox
                  checked={selectedIds.has(row.id)}
                  onCheckedChange={() => toggleRow(row.id)}
                  aria-label={`${row.name}を選択`}
                />
              </TableBodyCell>
              <TableBodyCell>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-small, 4px)',
                  }}
                >
                  <DummyIcon size={18} />
                  {row.name}
                </span>
              </TableBodyCell>
              <TableBodyCell>{row.text}</TableBodyCell>
              <TableBodyCell contentType="number">
                {(
                  row[columns.revenue.currentKey as keyof typeof row] as number
                )?.toLocaleString()}
              </TableBodyCell>
              <TableBodyCell contentType="number">{row.ratio}</TableBodyCell>
              <TableBodyCell contentType="date">{row.date}</TableBodyCell>
              <TableBodyCell>{row.description}</TableBodyCell>
              <TableBodyCell contentType="slot">
                <button type="button" style={{ fontSize: 12 }}>
                  Slot
                </button>
              </TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/* ==============================
   List View
   ============================== */

/**
 * List View
 *
 * リストビュー：一覧形式で、閲覧・把握に適したビュー。
 * チェックボックス、ソート、カラムメニュー、選択行を含むフル機能デモ。
 */
export const ListView: Story = {
  args: {
    view: 'list',
    'aria-label': 'リストビュー',
  },
  render: function ListViewStory(args) {
    const {
      sortedData,
      getSortState,
      createSortHandler,
      columns,
      selectedIds,
      allSelected,
      someSelected,
      toggleRow,
      toggleAll,
    } = useTableInteraction();

    return (
      <Table {...args}>
        <TableCol width="40px" minWidth={40} />
        <TableCol width="20%" />
        <TableCol width="10%" />
        <TableCol width="15%" />
        <TableCol width="10%" />
        <TableCol width="12%" />
        <TableCol />
        <TableHead>
          <TableRow>
            <TableHeaderCell contentType="checkbox" resizable>
              <Checkbox
                checked={allSelected}
                indeterminate={someSelected}
                onCheckedChange={toggleAll}
              />
            </TableHeaderCell>
            <TableHeaderCell resizable>Title</TableHeaderCell>
            <TableHeaderCell resizable menuItems={defaultMenuItems}>
              文字列
            </TableHeaderCell>
            <TableHeaderCell
              sort
              sortState={getSortState(columns.revenue.currentKey)}
              onSortChange={createSortHandler(columns.revenue.currentKey)}
              menuItems={columns.revenue.menuItems}
              resizable
            >
              {columns.revenue.currentLabel}
            </TableHeaderCell>
            <TableHeaderCell
              sort
              resizable
              sortState={getSortState('ratio')}
              onSortChange={createSortHandler('ratio')}
            >
              数字
            </TableHeaderCell>
            <TableHeaderCell
              sort
              sortState={getSortState('date')}
              onSortChange={createSortHandler('date')}
              resizable
            >
              日付
            </TableHeaderCell>
            <TableHeaderCell resizable>説明</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.id} selected={selectedIds.has(row.id)}>
              <TableBodyCell contentType="checkbox">
                <Checkbox
                  checked={selectedIds.has(row.id)}
                  onCheckedChange={() => toggleRow(row.id)}
                  aria-label={`${row.name}を選択`}
                />
              </TableBodyCell>
              <TableBodyCell>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 'var(--spacing-small, 4px)',
                  }}
                >
                  <DummyIcon size={18} />
                  {row.name}
                </span>
              </TableBodyCell>
              <TableBodyCell>{row.text}</TableBodyCell>
              <TableBodyCell contentType="number">
                {(
                  row[columns.revenue.currentKey as keyof typeof row] as number
                )?.toLocaleString()}
              </TableBodyCell>
              <TableBodyCell contentType="number">{row.ratio}</TableBodyCell>
              <TableBodyCell contentType="date">{row.date}</TableBodyCell>
              <TableBodyCell>{row.description}</TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};
