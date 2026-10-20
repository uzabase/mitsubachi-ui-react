# mitsubachi-ui-react

React 19ベースのデザインシステムコンポーネントライブラリ

## 技術スタック

- **フレームワーク**: React 19
- **UIライブラリ**: [Base UI](https://base-ui.com/) - ヘッドレスUIコンポーネント
- **言語**: TypeScript
- **ビルドツール**: Vite
- **UIドキュメント**: Storybook 10
- **テスト**: Vitest + Testing Library + Playwright

## Base UIについて

Base UIは、アクセシブルでスタイルが適用されていない（ヘッドレス）Reactコンポーネントライブラリです。

### 特徴

- 完全なアクセシビリティサポート
- スタイリング方法に依存しない（CSS Modules、CSS-in-JS、Tailwindなど任意の方法が使用可能）
- ツリーシェイキング対応（使用したコンポーネントのみバンドルに含まれる）
- React 17+対応

### 使用方法

```tsx
import { Button } from '@base-ui/react';

function MyComponent() {
  return <Button>クリック</Button>;
}
```

詳細は [Base UI公式ドキュメント](https://base-ui.com/) を参照してください。

## 開発環境のセットアップ

このリポジトリではNode.js 24または26とpnpmを使用します。`package.json`の`packageManager`に指定されたバージョンを用意し、依存関係をインストールした後にGitフックを設定してください。

```bash
pnpm install --frozen-lockfile
pnpm run setup:hooks
```

Gitフックの設定は明示的に実行するため、このライブラリを依存パッケージとしてインストールしても実行されません。

GitHub経由で配布するビルド成果物は`dist`にコミットしています。ライブラリを変更した場合は、`pnpm run build`を実行して成果物も更新してください。

## 開発コマンド

```bash
# Storybook起動
pnpm run storybook

# テスト実行
pnpm run test              # 全テスト
pnpm run test:unit         # ユニットテストのみ
pnpm run test:storybook    # Storybookテストのみ
pnpm run test:coverage     # カバレッジ付き

# リント・フォーマット
pnpm run lint              # ESLintチェック
pnpm run lint:fix          # ESLint自動修正
pnpm run format            # Prettier適用
pnpm run format:check      # フォーマットチェック
```
