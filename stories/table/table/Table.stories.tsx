import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Table } from '../../../src/components/table/table';
import { TableHead } from '../../../src/components/table/table-head';
import { TableBody } from '../../../src/components/table/table-body';
import { TableRow } from '../../../src/components/table/table-row';
import { TableHeaderCell } from '../../../src/components/table/table-header-cell';
import { TableBodyCell } from '../../../src/components/table/table-body-cell';
import { useTableSort } from '../../../src/components/table/shared';

const meta = {
  title: 'Components/Table/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'テーブルコンポーネント。グリッドビューとリストビューの2つのビューモードを持つ。\n\n' +
          '- **グリッドビュー**: 行×列の二次元構造。比較・分析向け（例: 財務諸表、競合比較）\n' +
          '- **リストビュー**: 一覧形式。閲覧・把握向け（例: ユーザー一覧、人物一覧）\n\n' +
          '## 使用例\n\n' +
          '```tsx\n' +
          '<Table view="grid" aria-label="財務データ">\n' +
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
          '> **注意:** チェックボックスの選択状態と行の背景色（青色）は自動では連動しません。\n' +
          '> チェックボックスの状態を管理し、`TableRow` の `selected` prop に反映する必要があります。\n\n' +
          '```tsx\n' +
          'const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());\n\n' +
          '<TableRow selected={selectedIds.has(row.id)}>\n' +
          '  <TableBodyCell contentType="checkbox">\n' +
          '    <input\n' +
          '      type="checkbox"\n' +
          '      checked={selectedIds.has(row.id)}\n' +
          '      onChange={() => toggleRow(row.id)}\n' +
          '    />\n' +
          '  </TableBodyCell>\n' +
          '</TableRow>\n' +
          '```\n\n' +
          '詳しくは下記の **Checkbox Selection Interaction** ストーリーを参照してください。',
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

const sampleData = [
  {
    id: 1,
    name: 'Label',
    text: 'Text',
    revenue: 99,
    ratio: '99.00%',
    date: '2025/00/00',
    description: 'Text',
  },
  {
    id: 2,
    name: 'Text',
    text: 'Text',
    revenue: 999,
    ratio: '99.00%',
    date: '2025/00/00',
    description: 'Text',
  },
  {
    id: 3,
    name: 'Text',
    text: 'Text',
    revenue: 999,
    ratio: '99.00%',
    date: '2025/00/00',
    description: 'Text',
  },
  {
    id: 4,
    name: 'Label',
    text: null,
    revenue: 9999,
    ratio: '99.00%',
    date: '2025/00/00',
    description: 'Text',
  },
  {
    id: 5,
    name: 'Label',
    text: null,
    revenue: 9999,
    ratio: '99.00%',
    date: '2025/00/00',
    description: 'Text',
  },
];

const defaultMenuItems = [
  { label: '昇順でソート', onClick: () => {} },
  { label: '降順でソート', onClick: () => {} },
  { label: 'カラムを非表示', onClick: () => {} },
];

const revenueMenuItems = [
  { label: '売上高合計', onClick: () => {} },
  { label: 'EBITDA', onClick: () => {} },
  { label: '営業利益', onClick: () => {} },
  { label: '経常利益', onClick: () => {} },
  { label: '資産合計', onClick: () => {} },
  { label: '売上高増加率', onClick: () => {} },
  { label: '期末従業員数', onClick: () => {} },
  { label: '時価総額', onClick: () => {} },
];

const longTextData = [
  {
    id: 1,
    name: 'Label',
    text: 'Text',
    revenue: 99,
    ratio: '99.00%',
    date: '2025/00/00',
    description: 'Text',
  },
  {
    id: 2,
    name: 'Text',
    text: 'Text',
    revenue: 999,
    ratio: '99.00%',
    date: '2025/00/00',
    description: 'Text',
  },
  {
    id: 3,
    name: 'Text',
    text: 'Text',
    revenue: 999,
    ratio: '99.00%',
    date: '2025/00/00',
    description: 'Text',
  },
  {
    id: 4,
    name: 'Label',
    text: null,
    revenue: 9999,
    ratio: '99.00%',
    date: '2025/00/00',
    description: 'Text',
  },
  {
    id: 5,
    name: 'Label',
    text: null,
    revenue: 9999,
    ratio: '99.00%',
    date: '2025/00/00',
    description: 'Text',
  },
  {
    id: 6,
    name: 'Label',
    text: null,
    revenue: 99999,
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
    ratio: '99.00%',
    date: '2025/00/00',
    description:
      'TextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextTextText',
  },
];

/* ==============================
   グリッドビュー
   ============================== */

/**
 * グリッドビュー
 *
 * 表形式：行×列の二次元構造で、比較・分析に適したビュー。
 */
export const GridView: Story = {
  args: {
    view: 'grid',
    'aria-label': 'グリッドビュー デモ',
  },
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell contentType="checkbox">
            <input type="checkbox" aria-label="全選択" />
          </TableHeaderCell>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>文字列</TableHeaderCell>
          <TableHeaderCell sort sortState="descending">
            営業利益
          </TableHeaderCell>
          <TableHeaderCell sort sortState="default">
            数字
          </TableHeaderCell>
          <TableHeaderCell sort sortState="default">
            日付
          </TableHeaderCell>
          <TableHeaderCell>長い文字列</TableHeaderCell>
          <TableHeaderCell>ボタン等</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableBodyCell contentType="checkbox">
              <input type="checkbox" aria-label={`${row.name}を選択`} />
            </TableBodyCell>
            <TableBodyCell>{row.name}</TableBodyCell>
            <TableBodyCell>{row.text}</TableBodyCell>
            <TableBodyCell contentType="number">
              {row.revenue.toLocaleString()}
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
  ),
};

/* ==============================
   リストビュー
   ============================== */

/**
 * リストビュー
 *
 * 一覧形式：行のまとまりを視覚的に伝えやすいビュー。閲覧・把握向け。
 */
export const ListView: Story = {
  args: {
    view: 'list',
    'aria-label': 'リストビュー デモ',
  },
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell contentType="checkbox">
            <input type="checkbox" aria-label="全選択" />
          </TableHeaderCell>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>文字列</TableHeaderCell>
          <TableHeaderCell sort sortState="default">
            営業利益
          </TableHeaderCell>
          <TableHeaderCell sort sortState="default">
            数字
          </TableHeaderCell>
          <TableHeaderCell sort sortState="default">
            日付
          </TableHeaderCell>
          <TableHeaderCell>説明</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sampleData.map((row) => (
          <TableRow key={row.id}>
            <TableBodyCell contentType="checkbox">
              <input type="checkbox" aria-label={`${row.name}を選択`} />
            </TableBodyCell>
            <TableBodyCell>{row.name}</TableBodyCell>
            <TableBodyCell>{row.text}</TableBodyCell>
            <TableBodyCell contentType="number">
              {row.revenue.toLocaleString()}
            </TableBodyCell>
            <TableBodyCell contentType="number">{row.ratio}</TableBodyCell>
            <TableBodyCell contentType="date">{row.date}</TableBodyCell>
            <TableBodyCell>{row.description}</TableBodyCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

/* ==============================
   選択行付きグリッドビュー
   ============================== */

/**
 * グリッドビュー（選択行あり・静的）
 *
 * 5行目が選択状態のグリッドビュー。
 */
export const GridViewWithSelection: Story = {
  args: {
    view: 'grid',
    'aria-label': '選択行付きグリッドビュー',
  },
  render: (args) => (
    <Table {...args}>
      <TableHead>
        <TableRow>
          <TableHeaderCell contentType="checkbox">
            <input type="checkbox" aria-label="全選択" />
          </TableHeaderCell>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>文字列</TableHeaderCell>
          <TableHeaderCell sort sortState="default">
            数値
          </TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {sampleData.slice(0, 3).map((row) => (
          <TableRow key={row.id}>
            <TableBodyCell contentType="checkbox">
              <input type="checkbox" aria-label={`${row.name}を選択`} />
            </TableBodyCell>
            <TableBodyCell>{row.name}</TableBodyCell>
            <TableBodyCell>{row.text}</TableBodyCell>
            <TableBodyCell contentType="number">
              {row.revenue.toLocaleString()}
            </TableBodyCell>
          </TableRow>
        ))}
        <TableRow selected>
          <TableBodyCell contentType="checkbox">
            <input type="checkbox" checked readOnly aria-label="Labelを選択" />
          </TableBodyCell>
          <TableBodyCell>Label</TableBodyCell>
          <TableBodyCell />
          <TableBodyCell contentType="number">9,999</TableBodyCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

/* ==============================
   チェックボックス選択インタラクション
   ============================== */

/**
 * チェックボックス選択インタラクション
 *
 * チェックボックスをクリックすると行が青色の選択状態になる。
 * ヘッダーのチェックボックスで全選択・全解除が可能。
 */
export const CheckboxSelectionInteraction: Story = {
  args: {
    view: 'grid',
    'aria-label': 'チェックボックス選択インタラクション',
  },
  render: function CheckboxSelectionStory(args) {
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());

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

    return (
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableHeaderCell contentType="checkbox">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={toggleAll}
                aria-label="全選択"
              />
            </TableHeaderCell>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>文字列</TableHeaderCell>
            <TableHeaderCell>数値</TableHeaderCell>
            <TableHeaderCell>日付</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sampleData.map((row) => (
            <TableRow key={row.id} selected={selectedIds.has(row.id)}>
              <TableBodyCell contentType="checkbox">
                <input
                  type="checkbox"
                  checked={selectedIds.has(row.id)}
                  onChange={() => toggleRow(row.id)}
                  aria-label={`${row.name}を選択`}
                />
              </TableBodyCell>
              <TableBodyCell>{row.name}</TableBodyCell>
              <TableBodyCell>{row.text}</TableBodyCell>
              <TableBodyCell contentType="number">
                {row.revenue.toLocaleString()}
              </TableBodyCell>
              <TableBodyCell contentType="date">{row.date}</TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/* ==============================
   ソートインタラクション
   ============================== */

/**
 * ソートインタラクション
 *
 * ヘッダーをクリックしてソート状態を切り替えるインタラクティブなデモ。
 */
export const SortInteraction: Story = {
  args: {
    view: 'grid',
    'aria-label': 'ソートインタラクション',
  },
  render: function SortInteractionStory(args) {
    const { sortedData, getSortState, createSortHandler } = useTableSort({
      data: sampleData,
    });

    return (
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableHeaderCell
              sort
              sortState={getSortState('name')}
              onSortChange={createSortHandler('name')}
            >
              企業名
            </TableHeaderCell>
            <TableHeaderCell
              sort
              sortState={getSortState('revenue')}
              onSortChange={createSortHandler('revenue')}
            >
              売上
            </TableHeaderCell>
            <TableHeaderCell
              sort
              sortState={getSortState('date')}
              onSortChange={createSortHandler('date')}
            >
              日付
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.id}>
              <TableBodyCell>{row.name}</TableBodyCell>
              <TableBodyCell contentType="number">
                {row.revenue.toLocaleString()}
              </TableBodyCell>
              <TableBodyCell contentType="date">{row.date}</TableBodyCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  },
};

/* ==============================
   Figma 再現: フル機能グリッドビュー
   ============================== */

/**
 * フル機能グリッドビュー
 *
 * Figma仕様を再現したテーブル。チェックボックス、ソート、カラムメニュー、
 * 長い文字列の折り返し、Slot、選択行を含む。
 */
export const FullFeaturedGridView: Story = {
  args: {
    view: 'grid',
    'aria-label': 'フル機能グリッドビュー',
  },
  render: function FullFeaturedGridViewStory(args) {
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set([5]));
    const { sortedData, getSortState, createSortHandler } = useTableSort({
      data: longTextData,
    });

    const allSelected =
      longTextData.length > 0 && selectedIds.size === longTextData.length;
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
        setSelectedIds(new Set(longTextData.map((row) => row.id)));
      }
    };

    return (
      <Table {...args}>
        <TableHead>
          <TableRow>
            <TableHeaderCell contentType="checkbox">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => {
                  if (el) el.indeterminate = someSelected;
                }}
                onChange={toggleAll}
                aria-label="全選択"
              />
            </TableHeaderCell>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell menuItems={defaultMenuItems}>
              文字列
            </TableHeaderCell>
            <TableHeaderCell
              sort
              sortState={getSortState('revenue')}
              onSortChange={createSortHandler('revenue')}
              menuItems={revenueMenuItems}
            >
              営業利益
            </TableHeaderCell>
            <TableHeaderCell
              sort
              sortState={getSortState('ratio')}
              onSortChange={createSortHandler('ratio')}
            >
              数字
            </TableHeaderCell>
            <TableHeaderCell
              sort
              sortState={getSortState('date')}
              onSortChange={createSortHandler('date')}
            >
              日付
            </TableHeaderCell>
            <TableHeaderCell>
              長い文字列長い文字列長い文字列長い文字列長い文字列長い文字列
            </TableHeaderCell>
            <TableHeaderCell>
              ボタンなどのコンポーネントやリッチテキスト
            </TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row) => (
            <TableRow key={row.id} selected={selectedIds.has(row.id)}>
              <TableBodyCell contentType="checkbox">
                <input
                  type="checkbox"
                  checked={selectedIds.has(row.id)}
                  onChange={() => toggleRow(row.id)}
                  aria-label={`${row.name}を選択`}
                />
              </TableBodyCell>
              <TableBodyCell>{row.name}</TableBodyCell>
              <TableBodyCell>{row.text}</TableBodyCell>
              <TableBodyCell contentType="number">
                {row.revenue.toLocaleString()}
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
