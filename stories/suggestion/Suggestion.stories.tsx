import type { Meta, StoryObj } from '@storybook/react-vite';

import { SearchBox } from '../../src/components/search-box';
import {
  Suggestion,
  SuggestionCategory,
  SuggestionItem,
} from '../../src/components/suggestion';
import { DummyIcon, HistoryIcon } from '../../src/icons';

const meta = {
  title: 'Components/Suggestion',
  component: Suggestion,
  subcomponents: { SuggestionItem, SuggestionCategory },
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          '検索ボックスや入力フィールドをクリック、またはキーワードを入力した際に表示される候補リストのコンポーネントです。\n' +
          '入力中の文字列に基づいて候補を提示し、選択による入力の補助やキーワードの補完を通じて、入力の手間を減らし操作効率を高めます。\n\n' +
          '## 種類\n\n' +
          '`SuggestionItem` は2つのコンテンツタイプをサポートします。\n\n' +
          '### 1. Text\n' +
          '`label` を指定すると、テキストとoptionalでアイコンの定型レイアウトで表示します。\n' +
          '```tsx\n' +
          '<SuggestionItem label="Apple" icon={<SearchIcon />} />\n' +
          '```\n\n' +
          '### 2. Slot\n' +
          '`children` を指定すると、任意のカスタムコンテンツを差し込めるスロットモードになります。\n' +
          'Slot 内のレイアウト（横並び・縦並び・複数要素の配置など）は **Suggestion の責務ではなく、利用者が自由に構成** できます。\n' +
          '```tsx\n' +
          '<SuggestionItem>\n' +
          '  <div style={{ display: "flex", gap: "8px" }}>\n' +
          '    <Avatar />\n' +
          '    <span>山田 太郎</span>\n' +
          '    <span>taro@example.com</span>\n' +
          '  </div>\n' +
          '</SuggestionItem>\n' +
          '```',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '480px' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof Suggestion>;

export default meta;
type Story = StoryObj<typeof meta>;

const searchComboStyle = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 'var(--spacing-small, 4px)',
  width: '480px',
};

/* ==============================
   Text バリアント
   ============================== */

/**
 * Text: デフォルト（アイコン + テキスト）
 */
export const TextDefault: Story = {
  render: () => (
    <Suggestion aria-label="検索候補">
      <SuggestionItem label="Apple" icon={<DummyIcon />} />
      <SuggestionItem label="Banana" icon={<DummyIcon />} />
      <SuggestionItem label="Cherry" icon={<DummyIcon />} />
      <SuggestionItem label="Dragonfruit" icon={<DummyIcon />} />
      <SuggestionItem label="Elderberry" icon={<DummyIcon />} />
      <SuggestionItem label="Fig" icon={<DummyIcon />} />
    </Suggestion>
  ),
};

/**
 * Text: アイコンなし
 */
export const TextWithoutIcon: Story = {
  render: () => (
    <Suggestion aria-label="検索候補">
      <SuggestionItem label="日立製作所" />
      <SuggestionItem label="三菱HCキャピタル" />
      <SuggestionItem label="レゾナック・ホールディングス" />
      <SuggestionItem label="日立建機" />
      <SuggestionItem label="カナデビア" />
      <SuggestionItem label="マクセル" />
      <SuggestionItem label="長い名前長い名前長い名前長い名前長い名前長い名前長い名前長い名前長い名前長い名前" />
    </Suggestion>
  ),
};

/**
 * Text: アイコンなし + アイコン分の余白確保（icon={true}）
 */
export const TextWithoutIconIndented: Story = {
  render: () => (
    <Suggestion aria-label="検索候補">
      <SuggestionItem label="Apple" icon={<DummyIcon />} />
      <SuggestionItem label="Banana" icon={true} />
      <SuggestionItem label="Cherry" icon={<DummyIcon />} />
      <SuggestionItem label="Dragonfruit" icon={true} />
    </Suggestion>
  ),
};

/**
 * Text: カテゴリーヘッダー付き
 */
export const TextWithCategory: Story = {
  render: () => (
    <Suggestion aria-label="検索候補">
      <SuggestionCategory label="フルーツ">
        <SuggestionItem label="Apple" icon={<DummyIcon />} />
        <SuggestionItem label="Banana" icon={<DummyIcon />} />
        <SuggestionItem label="Cherry" icon={<DummyIcon />} />
      </SuggestionCategory>
    </Suggestion>
  ),
};

/**
 * Text: 複数カテゴリー
 */
export const TextWithMultipleCategories: Story = {
  render: () => (
    <Suggestion aria-label="検索候補">
      <SuggestionCategory label="フルーツ">
        <SuggestionItem label="Apple" icon={<DummyIcon />} />
        <SuggestionItem label="Banana" icon={<DummyIcon />} />
      </SuggestionCategory>
      <SuggestionCategory label="野菜">
        <SuggestionItem label="Carrot" icon={<DummyIcon />} />
        <SuggestionItem label="Daikon" icon={<DummyIcon />} />
      </SuggestionCategory>
    </Suggestion>
  ),
};

/**
 * Text: 単体アイテム（デフォルト状態）
 */
export const TextItemDefault: Story = {
  render: () => (
    <Suggestion aria-label="検索候補">
      <SuggestionItem label="Apple" icon={<DummyIcon />} />
    </Suggestion>
  ),
};

/**
 * Text: 単体アイテム Hover状態
 */
export const TextItemHover: Story = {
  ...TextItemDefault,
  parameters: {
    pseudo: { hover: ['[role="option"]'] },
  },
};

/**
 * Text: 単体アイテム Focus状態
 */
export const TextItemFocus: Story = {
  ...TextItemDefault,
  parameters: {
    pseudo: { focusVisible: ['[role="option"]'] },
  },
};

/**
 * Text: 単体アイテム Active状態
 */
export const TextItemActive: Story = {
  ...TextItemDefault,
  parameters: {
    pseudo: { active: ['[role="option"]'] },
  },
};

/**
 * Text: SearchBox + Suggestion の組み合わせ
 */
export const TextSearchBoxWithSuggestion: Story = {
  ...TextWithoutIcon,
  decorators: [
    (Story) => (
      <div style={searchComboStyle}>
        <SearchBox
          placeholder="企業を検索"
          variant="secondary"
          defaultValue="日立"
          aria-autocomplete="list"
          aria-expanded={true}
        />
        <Story />
      </div>
    ),
  ],
};

/**
 * Text: SearchBox + カテゴリー付きSuggestion
 */
export const TextSearchBoxWithCategorySuggestion: Story = {
  decorators: [
    () => (
      <div style={searchComboStyle}>
        <SearchBox
          placeholder="企業を検索"
          variant="secondary"
          defaultValue="A"
          aria-autocomplete="list"
          aria-expanded={true}
        />
        <Suggestion aria-label="検索候補">
          <SuggestionCategory label="企業">
            <SuggestionItem label="Apple Inc." icon={<HistoryIcon />} />
            <SuggestionItem label="Amazon.com" icon={<HistoryIcon />} />
            <SuggestionItem label="Alphabet Inc." icon={<HistoryIcon />} />
          </SuggestionCategory>
        </Suggestion>
      </div>
    ),
  ],
};

/**
 * Text: SearchBox + 空のSuggestion
 */
export const TextSearchBoxEmpty: Story = {
  decorators: [
    () => (
      <div style={searchComboStyle}>
        <SearchBox
          placeholder="企業を検索"
          variant="secondary"
          defaultValue="xyz"
          aria-autocomplete="list"
          aria-expanded={true}
        />
        <Suggestion aria-label="検索候補" />
      </div>
    ),
  ],
};

/* ==============================
   Slot バリアント
   ============================== */

/**
 * Slot: デフォルト（カスタムコンテンツ）
 *
 * `children` に任意の要素を渡すことで、自由なレイアウトの候補アイテムを表示できます。
 * Slot 内のレイアウトは Suggestion の責務ではなく、利用者が自由に構成します。
 */
export const SlotDefault: Story = {
  render: () => (
    <Suggestion aria-label="検索候補">
      <SuggestionItem>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>AAPL</span>
          <span style={{ color: 'rgba(0,0,0,0.54)' }}>Apple Inc.</span>
        </div>
      </SuggestionItem>
      <SuggestionItem>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>GOOGL</span>
          <span style={{ color: 'rgba(0,0,0,0.54)' }}>Alphabet Inc.</span>
        </div>
      </SuggestionItem>
      <SuggestionItem>
        <div
          style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <span style={{ fontWeight: 'bold' }}>MSFT</span>
          <span style={{ color: 'rgba(0,0,0,0.54)' }}>Microsoft Corp.</span>
        </div>
      </SuggestionItem>
    </Suggestion>
  ),
};

/**
 * Slot: SearchBox + Suggestion の組み合わせ
 */
export const SlotSearchBoxWithSuggestion: Story = {
  ...SlotDefault,
  decorators: [
    (Story) => (
      <div style={searchComboStyle}>
        <SearchBox
          placeholder="企業を検索"
          variant="secondary"
          defaultValue="A"
          aria-autocomplete="list"
          aria-expanded={true}
        />
        <Story />
      </div>
    ),
  ],
};

const horizontalSlotUsers = [
  { name: '山田 太郎', email: 'taro.yaamda@sample.com' },
  { name: '山口 花子', email: 'taro.yaamda@sample.com' },
  { name: '東山 二郎', email: 'taro.yaamda@sample.com' },
  { name: '田中 山三郎', email: 'taro.yaamda@sample.com' },
  { name: '山田 太郎', email: 'taro.yaamda@sample.com' },
  { name: '山田 太郎', email: 'taro.yaamda@sample.com' },
  {
    name: '長い名前長い名前長い名前長い名前長い名前長い名前',
    email: 'taro.yaamda@sample.comtaro.yaamda@sample.com',
  },
];

const verticalSlotUsers = [
  { name: '山田 太郎', email: 'taro.yaamda@sample.com' },
  { name: '山口 花子', email: 'taro.yaamda@sample.com' },
  { name: '東山 二郎', email: 'taro.yaamda@sample.com' },
  { name: '田中 山三郎', email: 'taro.yaamda@sample.com' },
  {
    name: '長い名前長い名前長い名前長い名前長い名前長い名前',
    email: 'taro.yaamda@sample.comtaro.yaamda@sample.com',
  },
];

/**
 * Slot: 横並びレイアウト（SearchBox + アバター + 名前 + メールアドレス）
 *
 * Slot に複数の要素を横並びで配置した例です。
 * レイアウトは利用者側で自由に構成できます。
 */
export const SlotHorizontalLayout: Story = {
  decorators: [
    () => (
      <div style={searchComboStyle}>
        <SearchBox
          placeholder="ユーザーを検索"
          variant="secondary"
          defaultValue="山"
          aria-autocomplete="list"
          aria-expanded={true}
        />
        <Suggestion aria-label="ユーザー候補">
          {horizontalSlotUsers.map((user, i) => (
            <SuggestionItem key={i}>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '9999px',
                    backgroundColor: '#910091',
                    color: 'white',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    flexShrink: 0,
                  }}
                >
                  {user.name.slice(0, 1)}
                </span>
                <span
                  style={{
                    flex: '1 0 0',
                    fontSize: '14px',
                    lineHeight: 1.5,
                    letterSpacing: '0.02em',
                    color: 'rgba(0,0,0,0.84)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {user.name}
                </span>
                <span
                  style={{
                    flex: '1 0 0',
                    minWidth: '160px',
                    maxWidth: '240px',
                    fontSize: '12px',
                    lineHeight: 1.5,
                    letterSpacing: '0.02em',
                    color: 'rgba(0,0,0,0.54)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {user.email}
                </span>
              </div>
            </SuggestionItem>
          ))}
        </Suggestion>
      </div>
    ),
  ],
};

/**
 * Slot: 縦並びレイアウト（SearchBox + アバター + 名前・メールアドレスが縦に積まれる）
 *
 * Slot に複数の要素を縦並びで配置した例です。
 * レイアウトは利用者側で自由に構成できます。
 */
export const SlotVerticalLayout: Story = {
  decorators: [
    () => (
      <div style={searchComboStyle}>
        <SearchBox
          placeholder="ユーザーを検索"
          variant="secondary"
          defaultValue="山"
          aria-autocomplete="list"
          aria-expanded={true}
        />
        <Suggestion aria-label="ユーザー候補">
          {verticalSlotUsers.map((user, i) => (
            <SuggestionItem key={i}>
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    borderRadius: '9999px',
                    backgroundColor: '#910091',
                    color: 'white',
                    fontSize: '14px',
                    lineHeight: 1.3,
                    flexShrink: 0,
                  }}
                >
                  {user.name.slice(0, 1)}
                </span>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: '1 0 0',
                    minWidth: 0,
                  }}
                >
                  <span
                    style={{
                      fontSize: '14px',
                      lineHeight: 1.5,
                      letterSpacing: '0.02em',
                      color: 'rgba(0,0,0,0.84)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user.name}
                  </span>
                  <span
                    style={{
                      fontSize: '12px',
                      lineHeight: 1.5,
                      letterSpacing: '0.02em',
                      color: 'rgba(0,0,0,0.54)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {user.email}
                  </span>
                </div>
              </div>
            </SuggestionItem>
          ))}
        </Suggestion>
      </div>
    ),
  ],
};

/* ==============================
   空状態
   ============================== */

/**
 * 空状態（一致する候補なし）
 */
export const Empty: Story = {
  render: () => <Suggestion aria-label="検索候補" />,
};

/**
 * カスタム空メッセージ
 */
export const EmptyCustomMessage: Story = {
  render: () => (
    <Suggestion
      aria-label="検索候補"
      emptyMessage="該当する企業が見つかりませんでした"
    />
  ),
};
