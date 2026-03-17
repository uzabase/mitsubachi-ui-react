import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

import { TableBodyCell } from '../../../src/components/table/table-body-cell';
import { Table } from '../../../src/components/table/table';
import { TableBody } from '../../../src/components/table/table-body';
import { TableRow } from '../../../src/components/table/table-row';
import { Checkbox } from '../../../src/components/checkbox';

/** Grid ビューでラップするデコレーター */
const gridDecorator: Decorator = (Story) => (
  <Table view="grid" aria-label="Body cell demo">
    <TableBody>
      <TableRow>
        <Story />
      </TableRow>
    </TableBody>
  </Table>
);

/** List ビューでラップするデコレーター */
const listDecorator: Decorator = (Story) => (
  <Table view="list" aria-label="Body cell demo">
    <TableBody>
      <TableRow>
        <Story />
      </TableRow>
    </TableBody>
  </Table>
);

const meta = {
  title: 'Components/Table/TableBodyCell',
  component: TableBodyCell,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'テーブルのボディセルを表示するコンポーネントです。\n' +
          'テキスト、数値、日付、チェックボックス、カスタムコンテンツなど、さまざまなコンテンツタイプに対応しています。\n' +
          'children が空の場合はダッシュ（–）を自動表示します。\n\n' +
          '> **⚠️注意:** このコンポーネントを単独で使用しないでください。\n' +
          '> Table, TableBody, TableRow 内に配置して利用してください。\n\n' +
          '## 使用例\n\n' +
          '```tsx\n' +
          '<Table view="grid" aria-label="データ">\n' +
          '  <TableBody>\n' +
          '    <TableRow>\n' +
          '      <TableBodyCell>テキスト</TableBodyCell>\n' +
          '      <TableBodyCell contentType="number">99,999</TableBodyCell>\n' +
          '    </TableRow>\n' +
          '  </TableBody>\n' +
          '</Table>\n' +
          '```',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [gridDecorator],
} satisfies Meta<typeof TableBodyCell>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==============================
   Grid ビュー: テキスト
   ============================== */

/**
 * Grid: テキスト
 */
export const GridText: Story = {
  args: {
    children: 'Label',
  },
};

/**
 * Grid: テキスト（Hover 状態）
 */
export const GridTextHover: Story = {
  args: {
    children: 'Label',
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/* ==============================
   Grid ビュー: 数値
   ============================== */

/**
 * Grid: 数値
 */
export const GridNumber: Story = {
  args: {
    contentType: 'number',
    children: '99,999',
  },
};

/* ==============================
   Grid ビュー: 日付
   ============================== */

/**
 * Grid: 日付
 */
export const GridDate: Story = {
  args: {
    contentType: 'date',
    children: '2025/01/01',
  },
};

/* ==============================
   Grid ビュー: Null
   ============================== */

/**
 * Grid: Null 値（children なし）
 */
export const GridNull: Story = {
  args: {},
};

/* ==============================
   Grid ビュー: チェックボックス
   ============================== */

/**
 * Grid: チェックボックス（未チェック）
 */
export const GridCheckboxUnchecked: Story = {
  args: {
    contentType: 'checkbox',
    children: <Checkbox />,
  },
};

/**
 * Grid: チェックボックス（チェック済み）
 */
export const GridCheckboxChecked: Story = {
  args: {
    contentType: 'checkbox',
    children: <Checkbox checked />,
  },
};

/* ==============================
   Grid ビュー: スロット
   ============================== */

/**
 * Grid: スロット（カスタムコンテンツ）
 */
export const GridSlot: Story = {
  args: {
    contentType: 'slot',
    children: (
      <button type="button" style={{ fontSize: 12 }}>
        アクション
      </button>
    ),
  },
};

/* ==============================
   Grid ビュー: 選択行
   ============================== */

/**
 * Grid: 選択行内のセル
 */
export const GridSelected: Story = {
  decorators: [
    (Story) => (
      <Table view="grid" aria-label="Body cell demo">
        <TableBody>
          <TableRow selected>
            <Story />
          </TableRow>
        </TableBody>
      </Table>
    ),
  ],
  args: {
    children: 'Label',
  },
};

/* ==============================
   List ビュー
   ============================== */

/**
 * List: テキスト
 */
export const ListText: Story = {
  decorators: [listDecorator],
  args: {
    children: 'Label',
  },
};

/**
 * List: 数値
 */
export const ListNumber: Story = {
  decorators: [listDecorator],
  args: {
    contentType: 'number',
    children: '99,999',
  },
};

/**
 * List: Null 値
 */
export const ListNull: Story = {
  decorators: [listDecorator],
  args: {},
};

/**
 * List: 選択行内のセル
 */
export const ListSelected: Story = {
  decorators: [
    (Story) => (
      <Table view="list" aria-label="Body cell demo">
        <TableBody>
          <TableRow selected>
            <Story />
          </TableRow>
        </TableBody>
      </Table>
    ),
  ],
  args: {
    children: 'Label',
  },
};
