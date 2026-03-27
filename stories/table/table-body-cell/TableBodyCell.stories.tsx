import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';

import { TableBodyCell } from '../../../src/components/table/table-body-cell';
import { Table } from '../../../src/components/table/table';
import { TableBody } from '../../../src/components/table/table-body';
import { TableRow } from '../../../src/components/table/table-row';
import { Checkbox } from '../../../src/components/checkbox';
import { IconButton } from '../../../src/components/button/icon-button';
import { DummyIcon } from '../../../src/icons';

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
        component: 'テーブルのボディセルを表示するコンポーネントです。',
      },
    },
  },
  argTypes: {
    contentType: {
      control: 'select',
      options: ['text', 'number', 'date', 'checkbox', 'icon-button', 'slot'],
      description: 'セルのコンテンツタイプ。表示の配置やスタイルが変わる',
    },
  },
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
   Grid ビュー: テキスト + アイコン
   ============================== */

/**
 * Grid: テキスト + アイコン
 */
export const GridTextWithIcon: Story = {
  args: {
    icon: <DummyIcon />,
    children: 'Label',
  },
};

/**
 * Grid: テキスト + アイコン（長いテキスト・上揃え確認用）
 */
export const GridTextWithIconLongText: Story = {
  args: {
    icon: <DummyIcon />,
    children:
      'LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel',
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

/**
 * List: Null 値
 */
export const ListNull: Story = {
  decorators: [listDecorator],
  args: {},
};

/* ==============================
   List ビュー: テキスト + アイコン
   ============================== */

/**
 * List: テキスト + アイコン
 */
export const ListTextWithIcon: Story = {
  decorators: [listDecorator],
  args: {
    icon: <DummyIcon />,
    children: 'Label',
  },
};

/**
 * List: テキスト + アイコン（長いテキスト・中央揃え確認用）
 */
export const ListTextWithIconLongText: Story = {
  decorators: [listDecorator],
  args: {
    icon: <DummyIcon />,
    children:
      'LabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabelLabel',
  },
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
