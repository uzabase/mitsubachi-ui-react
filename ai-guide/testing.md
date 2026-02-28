# テスト

## 1. テスト戦略

### 2 つのテストプロジェクト

Vitest で 2 つのテストプロジェクトを 1 つの設定で管理する。

| プロジェクト | 対象 | コマンド |
|---|---|---|
| `storybook` | 各 Story を Vitest テストとして実行 | `pnpm test:storybook` |
| `unit` | `src/**/*.test.{ts,tsx}` | `pnpm test:unit` |

両プロジェクトとも **Playwright headless Chromium**（実ブラウザ）で実行する。jsdom は使用しない。

```bash
pnpm test              # 全テスト
pnpm test:unit         # ユニットテストのみ
pnpm test:storybook    # Storybook テストのみ
pnpm test:coverage     # カバレッジ付き
```

### なぜ実ブラウザか

- Web Components（Shadow DOM）のテストに jsdom では対応できない
- CSS の計算値や擬似クラスの挙動を正確に検証できる
- Playwright が提供するブラウザ API をそのまま使える

---

## 2. テストファイルの配置

### ユニットテスト

コンポーネントディレクトリ内に `.test.tsx` を配置する。

```
src/components/icon-button/
├── IconButton.tsx
├── icon-button.module.css
├── IconButton.test.tsx       # テストファイル
└── index.ts
```

### Storybook テスト

ストーリーファイルは `stories/` ディレクトリに配置する（[project-structure.md](./project-structure.md) §5 参照）。`@storybook/addon-vitest` がストーリーを自動的にテストとして実行する。

---

## 3. テスト環境

### Vitest 設定（vitest.config.ts）

```typescript
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  test: {
    projects: [
      // Storybook テスト
      {
        extends: true,
        plugins: [
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
      // ユニットテスト
      {
        extends: true,
        test: {
          name: 'unit',
          include: ['src/**/*.test.{ts,tsx}'],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
          setupFiles: ['./vitest.setup.ts'],
        },
      },
    ],
  },
});
```

### セットアップファイル

**vitest.setup.ts** — ユニットテスト用。Shadow DOM テスト用のカスタムマッチャーを登録する。

```typescript
import { expect } from 'vitest';

expect.extend({
  toHaveShadowText(element: Element, expectedText: string) {
    const shadowRoot = element.shadowRoot;
    if (!shadowRoot) {
      return { pass: false, message: () => 'Expected element to have shadowRoot' };
    }
    const text = shadowRoot.textContent || '';
    const pass = text.includes(expectedText);
    return {
      pass,
      message: () =>
        pass
          ? `Expected shadow DOM not to contain "${expectedText}"`
          : `Expected shadow DOM to contain "${expectedText}", but got "${text}"`,
    };
  },
});
```

**.storybook/vitest.setup.ts** — Storybook テスト用。a11y アドオンとプレビュー設定を適用する。

```typescript
import * as a11yAddonAnnotations from '@storybook/addon-a11y/preview';
import { setProjectAnnotations } from '@storybook/react-vite';
import * as projectAnnotations from './preview';

setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);
```

---

## 4. Testing Library

### 利用可能なパッケージ

| パッケージ | バージョン | 用途 |
|---|---|---|
| `@testing-library/react` | ^16.3.1 | コンポーネントのレンダリング・クエリ |
| `@testing-library/dom` | ^10.4.1 | DOM クエリ API |
| `@testing-library/user-event` | ^14.6.1 | ユーザー操作のシミュレーション |

### 基本的な使い方

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  it('aria-label がボタンに適用される', () => {
    render(
      <IconButton aria-label="検索">
        <SearchIcon />
      </IconButton>
    );
    expect(screen.getByRole('button', { name: '検索' })).toBeTruthy();
  });

  it('disabled 時にクリックイベントが発火しない', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <IconButton aria-label="検索" disabled onClick={onClick}>
        <SearchIcon />
      </IconButton>
    );
    await user.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
```

### クエリの優先順位

Testing Library の推奨順序に従う。

1. **`getByRole`** — アクセシビリティロールで取得（最優先）
2. **`getByLabelText`** — ラベルで取得
3. **`getByText`** — テキストで取得
4. **`getByTestId`** — 最終手段

---

## 5. Shadow DOM テスト

Web Components テスト用のユーティリティが `src/test-utils/shadow-dom.ts` に用意されている。

### ユーティリティ関数

| 関数 | 用途 |
|---|---|
| `queryShadow<T>(host, selector)` | Shadow DOM 内の単一要素を取得 |
| `queryShadowAll<T>(host, selector)` | Shadow DOM 内の全要素を取得 |
| `getShadowTextContent(host)` | Shadow DOM 内のテキストを取得 |
| `waitForShadowElement<T>(host, selector, timeout?)` | 要素の出現を待機 |
| `waitForAttribute(element, name, value, timeout?)` | 属性の変更を待機 |

### カスタムマッチャー

```tsx
// vitest.setup.ts で登録済み
expect(element).toHaveShadowText('期待するテキスト');
```

### 使用例

```tsx
import { queryShadow, waitForShadowElement } from '../../test-utils';

it('Shadow DOM 内にテキストが表示される', async () => {
  const host = document.querySelector('my-component')!;
  const label = await waitForShadowElement<HTMLSpanElement>(host, '.label');
  expect(label.textContent).toBe('ラベル');
});
```

---

## 6. Storybook テスト

### アクセシビリティテスト

`@storybook/addon-a11y` が各ストーリーに対してアクセシビリティチェックを実行する。

```typescript
// .storybook/preview.ts
parameters: {
  a11y: {
    // 'todo'  — テスト UI に表示のみ（CI では失敗しない）
    // 'error' — 違反があれば CI で失敗
    // 'off'   — チェックをスキップ
    test: 'todo',
  },
},
```

### 擬似状態テスト

`storybook-addon-pseudo-states` で CSS 擬似クラスの状態をシミュレートする。

```tsx
export const Hover: Story = {
  args: { variant: 'primary' },
  parameters: { pseudo: { hover: true } },
};

export const Focus: Story = {
  args: { variant: 'primary' },
  parameters: { pseudo: { focusVisible: true } },
};

export const Active: Story = {
  args: { variant: 'primary' },
  parameters: { pseudo: { active: true } },
};
```

---

## 7. テスト作成チェックリスト

### コンポーネントのユニットテスト

1. **レンダリング** — デフォルト props で正常にレンダリングされる
2. **Props の反映** — 各 props が DOM に正しく反映される（className、属性値）
3. **イベントハンドラ** — onClick、onChange 等が正しく呼び出される
4. **disabled 状態** — disabled 時にインタラクションが無効化される
5. **アクセシビリティ** — aria 属性、role、ラベルの紐付けが正しい
6. **Controlled / Uncontrolled** — フォーム要素は両モードをテスト

### Storybook ストーリー

1. **Normal** — デフォルト状態
2. **Hover** — `pseudo: { hover: true }`
3. **Focus** — `pseudo: { focusVisible: true }`
4. **Active** — `pseudo: { active: true }`
5. **Disabled** — `disabled: true`
6. **全バリアント** — バリアント × サイズの組み合わせを一覧表示

---

## 8. アンチパターン

```tsx
// ❌ jsdom 前提のテスト（このプロジェクトは実ブラウザ）
// @vitest-environment jsdom

// ❌ getByTestId を最初に使う（getByRole を優先）
screen.getByTestId('submit-button');

// ❌ 実装の詳細に依存するテスト
expect(container.querySelector('.styles_button__xxx')).toBeTruthy();

// ❌ タイマーに依存する不安定なテスト
await new Promise(resolve => setTimeout(resolve, 1000));

// ❌ スナップショットテストの多用（変更に弱い）
expect(container).toMatchSnapshot();
```
