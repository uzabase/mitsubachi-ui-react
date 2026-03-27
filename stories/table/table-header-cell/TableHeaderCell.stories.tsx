import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

import { TableHeaderCell } from '../../../src/components/table/table-header-cell';
import { Table } from '../../../src/components/table/table';
import { TableHead } from '../../../src/components/table/table-head';
import { TableRow } from '../../../src/components/table/table-row';
import { Checkbox } from '../../../src/components/checkbox';
import { IconButton } from '../../../src/components/button/icon-button';
import { DummyIcon } from '../../../src/icons';

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
        component: 'テーブルのヘッダーセルを表示するコンポーネントです。',
      },
    },
  },
  argTypes: {
    contentType: {
      control: 'select',
      options: ['text', 'checkbox', 'icon-button'],
      description: 'セルのコンテンツタイプ',
    },
    sortState: {
      control: 'select',
      options: ['default', 'ascending', 'descending'],
      description: '現在のソート状態',
    },
    resizable: {
      control: 'boolean',
      description: 'カラム幅のリサイズを許可するかどうか',
    },
  },
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
    sortState: 'default',
    onSortChange: () => {},
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
    sortState: 'default',
    onSortChange: () => {},
    children: 'Title',
  },
};

/**
 * Grid: ソート昇順
 */
export const GridSortAscending: Story = {
  args: {
    sortState: 'ascending',
    onSortChange: () => {},
    children: 'Title',
  },
};

/**
 * Grid: ソート降順
 */
export const GridSortDescending: Story = {
  args: {
    sortState: 'descending',
    onSortChange: () => {},
    children: 'Title',
  },
};

/**
 * Grid: ソートボタン（Focus Visible 状態）
 */
export const GridSortFocusVisible: Story = {
  args: {
    sortState: 'default',
    onSortChange: () => {},
    children: 'Title',
  },
  parameters: {
    pseudo: {
      focusVisible: ['button'],
    },
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
    children: <Checkbox />,
  },
};

/* ==============================
   Grid ビュー: アイコンボタン
   ============================== */

/**
 * Grid: アイコンボタン
 */
export const GridIconButton: Story = {
  args: {
    contentType: 'icon-button',
    children: (
      <IconButton variant="ghost" size="small" aria-label="編集">
        <DummyIcon />
      </IconButton>
    ),
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
    sortState: 'default',
    onSortChange: () => {},
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
    sortState: 'default',
    onSortChange: () => {},
    children: 'Title',
  },
};

/**
 * List: ソート昇順
 */
export const ListSortAscending: Story = {
  decorators: [listDecorator],
  args: {
    sortState: 'ascending',
    onSortChange: () => {},
    children: 'Title',
  },
};

/**
 * List: ソート降順
 */
export const ListSortDescending: Story = {
  decorators: [listDecorator],
  args: {
    sortState: 'descending',
    onSortChange: () => {},
    children: 'Title',
  },
};

/**
 * List: ソートボタン（Focus Visible 状態）
 */
export const ListSortFocusVisible: Story = {
  decorators: [listDecorator],
  args: {
    sortState: 'default',
    onSortChange: () => {},
    children: 'Title',
  },
  parameters: {
    pseudo: {
      focusVisible: ['button'],
    },
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
    children: <Checkbox />,
  },
};

/* ==============================
   List ビュー: アイコンボタン
   ============================== */

/**
 * List: アイコンボタン
 */
export const ListIconButton: Story = {
  decorators: [listDecorator],
  args: {
    contentType: 'icon-button',
    children: (
      <IconButton variant="ghost" size="small" aria-label="編集">
        <DummyIcon />
      </IconButton>
    ),
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
 * Grid: カラムアクションメニュー（Focus Visible）
 */
export const GridWithMenuFocusVisible: Story = {
  args: {
    children: 'Title',
    menuItems: sampleMenuItems,
  },
  parameters: {
    pseudo: {
      focusVisible: ['button'],
    },
  },
};

/**
 * Grid: ソート + カラムアクションメニュー
 */
export const GridSortWithMenu: Story = {
  args: {
    sortState: 'ascending',
    onSortChange: () => {},
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
              sortState="default"
              onSortChange={() => {}}
              menuItems={sampleMenuItems}
            >
              ソート+メニュー
            </TableHeaderCell>
            <TableHeaderCell
              sortState="ascending"
              onSortChange={() => {}}
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
