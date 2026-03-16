import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

import { TableHeaderCell } from '../../../src/components/table/table-header-cell';
import { Table } from '../../../src/components/table/table';
import { TableHead } from '../../../src/components/table/table-head';
import { TableRow } from '../../../src/components/table/table-row';

/** Grid ビューでラップするデコレーター */
const gridDecorator: Decorator = (Story) => (
  <Table view="grid" aria-label="Header cell demo">
    <TableHead>
      <TableRow>
        <Story />
      </TableRow>
    </TableHead>
  </Table>
);

/** List ビューでラップするデコレーター */
const listDecorator: Decorator = (Story) => (
  <Table view="list" aria-label="Header cell demo">
    <TableHead>
      <TableRow>
        <Story />
      </TableRow>
    </TableHead>
  </Table>
);

const meta = {
  title: 'Components/Table/TableHeaderCell',
  component: TableHeaderCell,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'テーブルのヘッダーセルを表示するコンポーネントです。\n' +
          'ソート機能やカラムアクションメニューを提供します。\n\n' +
          '> **⚠️注意:** このコンポーネントを単独で使用しないでください。\n' +
          '> Table, TableHead, TableRow 内に配置して利用してください。\n\n' +
          '## 使用例\n\n' +
          '```tsx\n' +
          '<Table view="grid" aria-label="データ">\n' +
          '  <TableHead>\n' +
          '    <TableRow>\n' +
          '      <TableHeaderCell>タイトル</TableHeaderCell>\n' +
          '      <TableHeaderCell sort sortState="ascending" onSortChange={fn}>\n' +
          '        ソート列\n' +
          '      </TableHeaderCell>\n' +
          '    </TableRow>\n' +
          '  </TableHead>\n' +
          '</Table>\n' +
          '```',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [gridDecorator],
} satisfies Meta<typeof TableHeaderCell>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==============================
   Grid ビュー: テキスト
   ============================== */

/**
 * Grid: テキスト（デフォルト状態）
 */
export const GridTextDefault: Story = {
  args: {
    children: 'Title',
  },
};

/**
 * Grid: テキスト（Hover 状態）
 */
export const GridTextHover: Story = {
  args: {
    children: 'Title',
    sort: true,
    sortState: 'default',
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/* ==============================
   Grid ビュー: ソート
   ============================== */

/**
 * Grid: ソート可能（未ソート）
 */
export const GridSortDefault: Story = {
  args: {
    sort: true,
    sortState: 'default',
    children: 'Title',
  },
};

/**
 * Grid: ソート昇順
 */
export const GridSortAscending: Story = {
  args: {
    sort: true,
    sortState: 'ascending',
    children: 'Title',
  },
};

/**
 * Grid: ソート降順
 */
export const GridSortDescending: Story = {
  args: {
    sort: true,
    sortState: 'descending',
    children: 'Title',
  },
};

/**
 * Grid: ソート昇順（Hover）
 */
export const GridSortAscendingHover: Story = {
  args: {
    sort: true,
    sortState: 'ascending',
    children: 'Title',
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * Grid: ソート降順（Hover）
 */
export const GridSortDescendingHover: Story = {
  args: {
    sort: true,
    sortState: 'descending',
    children: 'Title',
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/* ==============================
   Grid ビュー: ソート全状態一覧
   ============================== */

/**
 * Grid: ソート全状態（default / ascending / descending × normal / hover）
 */
export const GridSortAllStates: Story = {
  decorators: [
    () => (
      <Table view="grid" aria-label="ソート全状態">
        <TableHead>
          <TableRow>
            <TableHeaderCell sort sortState="default">
              未ソート
            </TableHeaderCell>
            <TableHeaderCell sort sortState="ascending">
              昇順
            </TableHeaderCell>
            <TableHeaderCell sort sortState="descending">
              降順
            </TableHeaderCell>
          </TableRow>
        </TableHead>
      </Table>
    ),
  ],
  args: {
    sort: true,
    children: 'Title',
  },
};

/* ==============================
   Grid ビュー: チェックボックス
   ============================== */

/**
 * Grid: チェックボックス
 */
export const GridCheckbox: Story = {
  args: {
    contentType: 'checkbox',
    children: <input type="checkbox" aria-label="全選択" />,
  },
};

/* ==============================
   List ビュー: テキスト
   ============================== */

/**
 * List: テキスト（デフォルト状態）
 */
export const ListTextDefault: Story = {
  decorators: [listDecorator],
  args: {
    children: 'Title',
  },
};

/**
 * List: テキスト（Hover 状態）
 */
export const ListTextHover: Story = {
  decorators: [listDecorator],
  args: {
    children: 'Title',
    sort: true,
    sortState: 'default',
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/* ==============================
   List ビュー: ソート
   ============================== */

/**
 * List: ソート可能（未ソート）
 */
export const ListSortDefault: Story = {
  decorators: [listDecorator],
  args: {
    sort: true,
    sortState: 'default',
    children: 'Title',
  },
};

/**
 * List: ソート昇順
 */
export const ListSortAscending: Story = {
  decorators: [listDecorator],
  args: {
    sort: true,
    sortState: 'ascending',
    children: 'Title',
  },
};

/**
 * List: ソート降順
 */
export const ListSortDescending: Story = {
  decorators: [listDecorator],
  args: {
    sort: true,
    sortState: 'descending',
    children: 'Title',
  },
};

/* ==============================
   List ビュー: ソート全状態一覧
   ============================== */

/**
 * List: ソート全状態（default / ascending / descending）
 */
export const ListSortAllStates: Story = {
  decorators: [
    () => (
      <Table view="list" aria-label="ソート全状態">
        <TableHead>
          <TableRow>
            <TableHeaderCell sort sortState="default">
              未ソート
            </TableHeaderCell>
            <TableHeaderCell sort sortState="ascending">
              昇順
            </TableHeaderCell>
            <TableHeaderCell sort sortState="descending">
              降順
            </TableHeaderCell>
          </TableRow>
        </TableHead>
      </Table>
    ),
  ],
  args: {
    sort: true,
    children: 'Title',
  },
};

/* ==============================
   List ビュー: チェックボックス
   ============================== */

/**
 * List: チェックボックス
 */
export const ListCheckbox: Story = {
  decorators: [listDecorator],
  args: {
    contentType: 'checkbox',
    children: <input type="checkbox" aria-label="全選択" />,
  },
};

/* ==============================
   カラムアクションメニュー
   ============================== */

const sampleMenuItems = [
  { label: '昇順でソート', onClick: () => {} },
  { label: '降順でソート', onClick: () => {} },
  { label: 'カラムを非表示', onClick: () => {} },
];

/**
 * Grid: カラムアクションメニュー
 *
 * ホバーで三点リーダーが表示され、クリックでメニューが展開される。
 */
export const GridWithMenu: Story = {
  args: {
    children: 'Title',
    menuItems: sampleMenuItems,
  },
};

/**
 * Grid: カラムアクションメニュー（Hover）
 */
export const GridWithMenuHover: Story = {
  args: {
    children: 'Title',
    menuItems: sampleMenuItems,
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * Grid: ソート + カラムアクションメニュー
 */
export const GridSortWithMenu: Story = {
  args: {
    sort: true,
    sortState: 'ascending',
    children: 'Title',
    menuItems: sampleMenuItems,
  },
};

/**
 * List: カラムアクションメニュー
 */
export const ListWithMenu: Story = {
  decorators: [listDecorator],
  args: {
    children: 'Title',
    menuItems: sampleMenuItems,
  },
};

/**
 * List: カラムアクションメニュー（Hover）
 */
export const ListWithMenuHover: Story = {
  decorators: [listDecorator],
  args: {
    children: 'Title',
    menuItems: sampleMenuItems,
  },
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

/**
 * カラムアクション一覧（メニュー付きヘッダーの比較）
 */
export const ColumnActionAllStates: Story = {
  decorators: [
    () => (
      <Table view="grid" aria-label="カラムアクション一覧">
        <TableHead>
          <TableRow>
            <TableHeaderCell menuItems={sampleMenuItems}>
              メニュー付き
            </TableHeaderCell>
            <TableHeaderCell
              sort
              sortState="default"
              menuItems={sampleMenuItems}
            >
              ソート+メニュー
            </TableHeaderCell>
            <TableHeaderCell
              sort
              sortState="ascending"
              menuItems={sampleMenuItems}
            >
              昇順+メニュー
            </TableHeaderCell>
            <TableHeaderCell>メニューなし</TableHeaderCell>
          </TableRow>
        </TableHead>
      </Table>
    ),
  ],
  args: {
    children: 'Title',
  },
};
