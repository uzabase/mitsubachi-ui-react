import type { Meta, StoryObj } from '@storybook/react-vite';

import { ReadOnlyTag } from '../../src/components/tag/read-only-tag';
import { Timeline } from '../../src/components/timeline/timeline';

/* ---------- Story helpers ---------- */

const textStyle: React.CSSProperties = {
  fontSize: '14px',
  letterSpacing: '0.02em',
};

const rowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'nowrap',
  gap: 'var(--spacing-medium, 8px)',
  alignItems: 'baseline',
};

const dateStyle: React.CSSProperties = {
  flexShrink: 0,
};

function NewsDate({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: '12px',
        color: 'var(--text-weak-default, rgba(0,0,0,0.54))',
        letterSpacing: '0.02em',
      }}
    >
      {children}
    </div>
  );
}

function NewsTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: '14px',
        fontWeight: 700,
        letterSpacing: '0.02em',
        marginBlockStart: '2px',
      }}
    >
      {children}
    </div>
  );
}

function NewsSource({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: '12px',
        color: 'var(--text-weak-default, rgba(0,0,0,0.54))',
        letterSpacing: '0.02em',
        marginBlockStart: '4px',
      }}
    >
      {children}
    </div>
  );
}

const meta = {
  title: 'Components/Timeline/Timeline',
  component: Timeline,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          '出来事や状態の変化を時系列に沿って表示するコンポーネントです。',
      },
    },
  },
  args: {
    children: undefined,
  },
  argTypes: {
    itemSpacing: {
      control: 'select',
      options: ['normal', 'loose'],
    },
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

/* ==============================
   Normal（職歴の例）
   ============================== */

/**
 * Normal スペーシングの使用例（職歴）
 *
 * コンパクトな表示が適している場合に使用します。
 */
export const Normal: Story = {
  args: {
    itemSpacing: 'normal',
  },
  render: (args) => (
    <div>
      <Timeline {...args}>
        <Timeline.Item>
          <span style={{ ...textStyle, ...rowStyle }}>
            <span style={dateStyle}>2018年07月</span>
            <span>常務執行役員</span>
          </span>
        </Timeline.Item>
        <Timeline.Item>
          <span style={{ ...textStyle, ...rowStyle }}>
            <span style={dateStyle}>2018年07月</span>
            <span>法人事業統括</span>
          </span>
        </Timeline.Item>
        <Timeline.Item>
          <span style={{ ...textStyle, ...rowStyle }}>
            <span style={dateStyle}>2018年07月</span>
            <span>事業戦略・マーケティング担当</span>
          </span>
        </Timeline.Item>
        <Timeline.Item>
          <span style={{ ...textStyle, ...rowStyle }}>
            <span style={dateStyle}>2018年07月</span>
            <span>法人事業統括副統括</span>
          </span>
        </Timeline.Item>
        <Timeline.Item emphasized>
          <span style={{ ...textStyle, ...rowStyle }}>
            <span style={dateStyle}>2018年07月</span>
            <span style={rowStyle}>
              <span>専務執行役員</span>
              <ReadOnlyTag text="現任" pattern="information" />
            </span>
          </span>
        </Timeline.Item>
        <Timeline.Item>
          <span style={{ ...textStyle, ...rowStyle }}>
            <span style={dateStyle}>2018年07月</span>
            <span>
              法人事業統括(エンタープライズ営業・デジタルマーケティング・カスタマーケア担当)
            </span>
          </span>
        </Timeline.Item>
        <Timeline.Item emphasized>
          <span style={{ ...textStyle, ...rowStyle }}>
            <span style={dateStyle}>2018年07月</span>
            <span style={rowStyle}>
              <span>法人副統括</span>
              <ReadOnlyTag text="現任" pattern="information" />
            </span>
          </span>
        </Timeline.Item>
      </Timeline>
    </div>
  ),
};

/* ==============================
   Loose（ニュースタイムラインの例）
   ============================== */

/**
 * Loose スペーシングの使用例（ニュースタイムライン）
 *
 * 各アイテムの情報量が多く、余白を広くとりたい場合に使用します。
 */
export const Loose: Story = {
  args: {
    itemSpacing: 'loose',
  },
  render: (args) => (
    <div>
      <Timeline {...args}>
        <Timeline.Item emphasized>
          <div>
            <NewsDate>2025/08/08</NewsDate>
            <NewsTitle>
              豪華キャストを起用したクライムアクション『クライム101』の日米同時公開を発表
            </NewsTitle>
            <NewsSource>
              企業リリース：(株)ソニー・ピクチャーズ エンタテインメント
            </NewsSource>
          </div>
        </Timeline.Item>
        <Timeline.Item>
          <div>
            <NewsDate>2025/08/08</NewsDate>
            <NewsTitle>
              世界的に評価の高い細田守監督の最新作『果てしなきスカーレット』の全世界共同配給を発表
            </NewsTitle>
            <NewsSource>
              企業リリース：(株)ソニー・ピクチャーズ エンタテインメント
            </NewsSource>
          </div>
        </Timeline.Item>
        <Timeline.Item>
          <div>
            <NewsDate>2025/08/08</NewsDate>
            <NewsTitle>
              ベストセラーSF小説を原作とする映画『プロジェクト・ヘイル・メアリー』の2026年日本公開を発表
            </NewsTitle>
            <NewsSource>
              企業リリース：(株)ソニー・ピクチャーズ エンタテインメント
            </NewsSource>
          </div>
        </Timeline.Item>
        <Timeline.Item>
          <div>
            <NewsDate>2025/08/08</NewsDate>
            <NewsTitle>
              人気サバイバル・スリラーシリーズの続編『28年後...』の日米同時公開を発表
            </NewsTitle>
            <NewsSource>
              企業リリース：映画『28年後...』 6月20日（金）日米同時公開決定!
            </NewsSource>
          </div>
        </Timeline.Item>
        <Timeline.Item>
          <div>
            <NewsDate>2025/05/08</NewsDate>
            <NewsTitle>
              1980年代からの人気シリーズ最新作『ベスト・キッド：レジェンズ』の日本公開を発表
            </NewsTitle>
            <NewsSource>
              企業リリース：(株)ソニー・ピクチャーズ エンタテインメント
            </NewsSource>
          </div>
        </Timeline.Item>
      </Timeline>
    </div>
  ),
};

/* ==============================
   強調アイテムを含むタイムライン
   ============================== */

/**
 * 複数の強調アイテムを含むタイムライン
 */
export const WithEmphasized: Story = {
  args: {
    itemSpacing: 'normal',
  },
  render: (args) => (
    <div>
      <Timeline {...args}>
        <Timeline.Item>
          <span style={textStyle}>通常のアイテム</span>
        </Timeline.Item>
        <Timeline.Item emphasized>
          <span style={textStyle}>強調されたアイテム（要点）</span>
        </Timeline.Item>
        <Timeline.Item>
          <span style={textStyle}>通常のアイテム</span>
        </Timeline.Item>
        <Timeline.Item emphasized>
          <span style={textStyle}>強調されたアイテム（現在地）</span>
        </Timeline.Item>
        <Timeline.Item>
          <span style={textStyle}>通常のアイテム</span>
        </Timeline.Item>
      </Timeline>
    </div>
  ),
};

/* ==============================
   アイテム1つだけ
   ============================== */

/**
 * アイテムが1つだけの場合
 *
 * ラインは表示されず、ドット + コンテンツのみになります。
 */
export const SingleItem: Story = {
  args: {
    itemSpacing: 'normal',
  },
  render: (args) => (
    <div>
      <Timeline {...args}>
        <Timeline.Item emphasized>
          <span style={{ ...textStyle, ...rowStyle }}>
            <span style={dateStyle}>2024年05月</span>
            <span style={rowStyle}>
              <span>CEO室 マネジャー</span>
              <ReadOnlyTag text="現任" pattern="information" />
            </span>
          </span>
        </Timeline.Item>
      </Timeline>
    </div>
  ),
};

/* ==============================
   アイテム2つ
   ============================== */

/**
 * アイテムが2つの場合（最小の接続パターン）
 */
export const TwoItems: Story = {
  args: {
    itemSpacing: 'normal',
  },
  render: (args) => (
    <div>
      <Timeline {...args}>
        <Timeline.Item>
          <span style={{ ...textStyle, ...rowStyle }}>
            <span style={dateStyle}>2023年04月</span>
            <span>入社</span>
          </span>
        </Timeline.Item>
        <Timeline.Item emphasized>
          <span style={{ ...textStyle, ...rowStyle }}>
            <span style={dateStyle}>2024年05月</span>
            <span style={rowStyle}>
              <span>CEO室 マネジャー</span>
              <ReadOnlyTag text="現任" pattern="information" />
            </span>
          </span>
        </Timeline.Item>
      </Timeline>
    </div>
  ),
};

/**
 * すべての状態を一覧表示
 */
export const AllStates: Story = {
  args: {
    ...Normal.args,
  },
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        padding: '40px',
      }}
    >
      <div>
        <h3>Normal</h3>
        <Timeline itemSpacing="normal">
          <Timeline.Item>
            <span style={{ ...textStyle, ...rowStyle }}>
              <span style={dateStyle}>2018年07月</span>
              <span>常務執行役員</span>
            </span>
          </Timeline.Item>
          <Timeline.Item>
            <span style={{ ...textStyle, ...rowStyle }}>
              <span style={dateStyle}>2018年07月</span>
              <span>法人事業統括</span>
            </span>
          </Timeline.Item>
          <Timeline.Item emphasized>
            <span style={{ ...textStyle, ...rowStyle }}>
              <span style={dateStyle}>2018年07月</span>
              <span style={rowStyle}>
                <span>専務執行役員</span>
                <ReadOnlyTag text="現任" pattern="information" />
              </span>
            </span>
          </Timeline.Item>
        </Timeline>
      </div>
      <div>
        <h3>Loose</h3>
        <Timeline itemSpacing="loose">
          <Timeline.Item>
            <span style={{ ...textStyle, ...rowStyle }}>
              <span style={dateStyle}>2018年07月</span>
              <span>常務執行役員</span>
            </span>
          </Timeline.Item>
          <Timeline.Item>
            <span style={{ ...textStyle, ...rowStyle }}>
              <span style={dateStyle}>2018年07月</span>
              <span>法人事業統括</span>
            </span>
          </Timeline.Item>
          <Timeline.Item emphasized>
            <span style={{ ...textStyle, ...rowStyle }}>
              <span style={dateStyle}>2018年07月</span>
              <span style={rowStyle}>
                <span>専務執行役員</span>
                <ReadOnlyTag text="現任" pattern="information" />
              </span>
            </span>
          </Timeline.Item>
        </Timeline>
      </div>
    </div>
  ),
};
