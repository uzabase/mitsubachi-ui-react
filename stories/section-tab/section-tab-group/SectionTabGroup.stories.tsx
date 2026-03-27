import type { Meta, StoryObj } from '@storybook/react-vite';

import { SectionTab } from '../../../src/components/section-tab/section-tab';
import { SectionTabGroup } from '../../../src/components/section-tab/section-tab-group';

/**
 * ダミーの国旗コンポーネント（ストーリー用）
 */
function JpnFlag() {
  return (
    <svg
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18" height="11" rx="1" fill="white" />
      <rect
        x="0.25"
        y="0.25"
        width="17.5"
        height="10.5"
        rx="0.75"
        stroke="black"
        strokeOpacity="0.1"
        strokeWidth="0.5"
      />
      <circle cx="9" cy="5.5" r="3" fill="#BC002D" />
    </svg>
  );
}

function ChnFlag() {
  return (
    <svg
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18" height="11" rx="1" fill="#DE2910" />
      <polygon points="3.5,2 4.1,3.8 2,2.8 5,2.8 2.9,3.8" fill="#FFDE00" />
      <polygon points="6.2,1.2 6.5,1.8 6,1.5 6.8,1.5 6.3,1.8" fill="#FFDE00" />
      <polygon points="7.2,2.5 7.5,3.1 7,2.8 7.8,2.8 7.3,3.1" fill="#FFDE00" />
      <polygon points="7.2,4.2 7.5,4.8 7,4.5 7.8,4.5 7.3,4.8" fill="#FFDE00" />
      <polygon points="6.2,5.3 6.5,5.9 6,5.6 6.8,5.6 6.3,5.9" fill="#FFDE00" />
    </svg>
  );
}

function TwnFlag() {
  return (
    <svg
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18" height="11" rx="1" fill="#FE0000" />
      <rect width="9" height="5.5" fill="#000095" />
      <circle cx="4.5" cy="2.75" r="1.8" fill="white" />
      <circle cx="4.5" cy="2.75" r="1.2" fill="#000095" />
    </svg>
  );
}

function KorFlag() {
  return (
    <svg
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18" height="11" rx="1" fill="white" />
      <rect
        x="0.25"
        y="0.25"
        width="17.5"
        height="10.5"
        rx="0.75"
        stroke="black"
        strokeOpacity="0.1"
        strokeWidth="0.5"
      />
      <circle cx="9" cy="5.5" r="2.8" fill="#CD2E3A" />
      <path
        d="M9,5.5 a1.4,1.4 0 0,1 0,-2.8 a1.4,1.4 0 0,0 0,2.8z"
        fill="#CD2E3A"
      />
      <path
        d="M9,5.5 a1.4,1.4 0 0,0 0,2.8 a1.4,1.4 0 0,1 0,-2.8z"
        fill="#0047A0"
      />
      <path
        d="M9,5.5 a1.4,1.4 0 0,1 0,2.8 a2.8,2.8 0 0,1 0,-5.6 a1.4,1.4 0 0,0 0,2.8z"
        fill="#0047A0"
      />
    </svg>
  );
}

function SgpFlag() {
  return (
    <svg
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18" height="5.5" rx="1" fill="#ED2939" />
      <rect y="5.5" width="18" height="5.5" rx="1" fill="white" />
      <rect
        x="0.25"
        y="0.25"
        width="17.5"
        height="10.5"
        rx="0.75"
        stroke="black"
        strokeOpacity="0.1"
        strokeWidth="0.5"
      />
      <path
        d="M4.5,1.2 a1.6,1.6 0 1,0 0,3.2 a1.2,1.2 0 1,1 0,-3.2z"
        fill="white"
      />
    </svg>
  );
}

function MysFlag() {
  return (
    <svg
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18" height="11" rx="1" fill="white" />
      <rect width="18" height="0.786" fill="#CC0001" />
      <rect y="1.571" width="18" height="0.786" fill="#CC0001" />
      <rect y="3.143" width="18" height="0.786" fill="#CC0001" />
      <rect y="4.714" width="18" height="0.786" fill="#CC0001" />
      <rect y="6.286" width="18" height="0.786" fill="#CC0001" />
      <rect y="7.857" width="18" height="0.786" fill="#CC0001" />
      <rect y="9.429" width="18" height="0.786" fill="#CC0001" />
      <rect width="9" height="5.5" fill="#010066" />
    </svg>
  );
}

function IdnFlag() {
  return (
    <svg
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18" height="5.5" rx="1" fill="#FF0000" />
      <rect y="5.5" width="18" height="5.5" rx="1" fill="white" />
      <rect
        x="0.25"
        y="0.25"
        width="17.5"
        height="10.5"
        rx="0.75"
        stroke="black"
        strokeOpacity="0.1"
        strokeWidth="0.5"
      />
    </svg>
  );
}

function ThaFlag() {
  return (
    <svg
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18" height="11" rx="1" fill="#A51931" />
      <rect y="1.833" width="18" height="7.333" fill="#F4F5F8" />
      <rect y="3.667" width="18" height="3.667" fill="#2D2A4A" />
    </svg>
  );
}

function PhlFlag() {
  return (
    <svg
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18" height="5.5" rx="1" fill="#0038A8" />
      <rect y="5.5" width="18" height="5.5" rx="1" fill="#CE1126" />
      <polygon points="0,0 7,5.5 0,11" fill="white" />
      <circle cx="2.5" cy="5.5" r="1" fill="#FCD116" />
    </svg>
  );
}

function VnmFlag() {
  return (
    <svg
      width="18"
      height="11"
      viewBox="0 0 18 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="18" height="11" rx="1" fill="#DA251D" />
      <polygon
        points="9,2 10,4.2 12.4,4.2 10.5,5.8 11.2,8 9,6.5 6.8,8 7.5,5.8 5.6,4.2 8,4.2"
        fill="#FFFF00"
      />
    </svg>
  );
}

const meta = {
  title: 'Components/SectionTab/SectionTabGroup',
  component: SectionTabGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'ページ内セクションの表示内容を切り替えるタブグループです。',
      },
    },
  },
  argTypes: {
    value: {
      control: 'text',
      description:
        '現在選択されているタブの値（制御モード）。`null` を渡すとどのタブも選択されない',
    },
    defaultValue: {
      control: 'text',
      description: '初期選択タブの値（非制御モード）',
    },
    onValueChange: {
      description: 'タブ切り替え時のコールバック',
    },
    children: {
      control: false,
      description: '子要素（SectionTabGroup.List + SectionTabGroup.Panel）',
    },
  },
} satisfies Meta<typeof SectionTabGroup>;

export default meta;

/* ==============================
   基本
   ============================== */

/**
 * タブグループの基本的なインタラクション
 */
export const Default: StoryObj = {
  render: () => (
    <SectionTabGroup defaultValue="gns">
      <SectionTabGroup.List>
        <SectionTab value="gns">ゲーム＆ネットワークサービス</SectionTab>
        <SectionTab value="iss">
          イメージング＆センシングソリューション
        </SectionTab>
        <SectionTab value="ets">
          エンターテイメント・テクノロジー＆サービス
        </SectionTab>
        <SectionTab value="eps">
          エレクトロニクスプロダクツ＆ソリューション
        </SectionTab>
        <SectionTab value="movie">映画</SectionTab>
        <SectionTab value="finance">金融</SectionTab>
        <SectionTab value="music">音楽</SectionTab>
        <SectionTab value="other">その他</SectionTab>
      </SectionTabGroup.List>
      <SectionTabGroup.Panel value="gns">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内にゲーム＆ネットワークサービスのコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="iss">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内にイメージング＆センシングソリューションのコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="ets">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内にエンターテイメント・テクノロジー＆サービスのコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="eps">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内にエレクトロニクスプロダクツ＆ソリューションのコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="movie">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内に映画のコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="finance">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内に金融のコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="music">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内に音楽のコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="other">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内にその他のコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
    </SectionTabGroup>
  ),
};

/* ==============================
   国旗付き
   ============================== */

/**
 * 国旗付き国タブ + 地域タブの混在
 *
 * 国旗のある国には flag を渡し、地域名（アジア等）には渡しません。
 */
export const WithFlags: StoryObj = {
  render: () => (
    <SectionTabGroup defaultValue="asia">
      <SectionTabGroup.List>
        <SectionTab value="asia">アジア</SectionTab>
        <SectionTab value="jpn" flag={<JpnFlag />}>
          日本
        </SectionTab>
        <SectionTab value="chn" flag={<ChnFlag />}>
          中華人民共和国
        </SectionTab>
        <SectionTab value="twn" flag={<TwnFlag />}>
          台湾
        </SectionTab>
        <SectionTab value="kor" flag={<KorFlag />}>
          韓国
        </SectionTab>
        <SectionTab value="sgp" flag={<SgpFlag />}>
          シンガポール
        </SectionTab>
        <SectionTab value="mys" flag={<MysFlag />}>
          マレーシア
        </SectionTab>
        <SectionTab value="idn" flag={<IdnFlag />}>
          インドネシア
        </SectionTab>
        <SectionTab value="tha" flag={<ThaFlag />}>
          タイ
        </SectionTab>
        <SectionTab value="phl" flag={<PhlFlag />}>
          フィリピン
        </SectionTab>
        <SectionTab value="vnm" flag={<VnmFlag />}>
          ベトナム
        </SectionTab>
      </SectionTabGroup.List>
      <SectionTabGroup.Panel value="asia">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内にアジアのコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="jpn">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内に日本のコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="chn">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内に中華人民共和国のコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="twn">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内に台湾のコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="kor">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内に韓国のコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="sgp">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内にシンガポールのコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="mys">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内にマレーシアのコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="idn">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内にインドネシアのコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="tha">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内にタイのコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="phl">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内にフィリピンのコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
      <SectionTabGroup.Panel value="vnm">
        <p style={{ padding: '16px 0', fontSize: '14px' }}>
          （Panel内にベトナムのコンテンツが表示されています）
        </p>
      </SectionTabGroup.Panel>
    </SectionTabGroup>
  ),
};

/* ==============================
   Disabled
   ============================== */

/**
 * 無効化タブを含むグループ
 */
export const WithDisabled: StoryObj = {
  render: () => (
    <SectionTabGroup defaultValue="tab1">
      <SectionTabGroup.List>
        <SectionTab value="tab1">有効なタブ</SectionTab>
        <SectionTab value="tab2" disabled>
          無効なタブ
        </SectionTab>
        <SectionTab value="tab3">有効なタブ</SectionTab>
      </SectionTabGroup.List>
    </SectionTabGroup>
  ),
};
