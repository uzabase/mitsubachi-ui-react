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

このリポジトリを開発する場合は、依存関係をインストールした後にGitフックを設定してください。

```bash
npm ci
npm run setup:hooks
```

pnpmを使う場合は、`pnpm install --frozen-lockfile`と`pnpm run setup:hooks`を実行してください。
Gitフックの設定は明示的に実行するため、このライブラリを依存パッケージとしてインストールしても実行されません。

GitHub経由で配布するビルド成果物は`dist`にコミットしています。ライブラリを変更した場合は、`npm run build`を実行して成果物も更新してください。

## 開発コマンド

```bash
# Storybook起動
npm run storybook

# テスト実行
npm run test              # 全テスト
npm run test:unit         # ユニットテストのみ
npm run test:storybook    # Storybookテストのみ
npm run test:coverage     # カバレッジ付き

# リント・フォーマット
npm run lint              # ESLintチェック
npm run lint:fix          # ESLint自動修正
npm run format            # Prettier適用
npm run format:check      # フォーマットチェック
```
