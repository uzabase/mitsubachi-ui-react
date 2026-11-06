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

## Gitフックの設定

このリポジトリを開発する場合は、依存関係のインストール後に一度実行してください。

```bash
npm run setup:hooks
```

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

## npm パッケージの利用

```bash
npm install @uzabase/mitsubachi-ui-react @base-ui/react react react-dom
```

アプリケーションのエントリーポイントでスタイルを読み込んでください。

```ts
import '@uzabase/mitsubachi-ui-react/style.css';
```

## npm への公開

`mitsubachi-ui` と同じく、[release-please](https://github.com/googleapis/release-please) と
[npm Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) を使用します。
設定は `.github/workflows/publish.yml`、`release-please-config.json`、
`.release-please-manifest.json` で管理しています。

### 通常のリリース

1. `feat: ...`（minor）、`fix: ...`（patch）、`feat!: ...`（major）などの Conventional Commits 形式で変更を `main` にマージします。Squash merge の場合は PR タイトルをこの形式にします。
2. release-please がバージョンと CHANGELOG を更新するリリース PR を作成・更新します。
3. リリース PR をマージすると GitHub Release とタグが作られます。
4. タグのソースからビルドし、依存関係の署名・脆弱性検査、全テスト、公開パッケージの秘密情報検査を実行します。
5. 検査済みの tarball を別ジョブで取得し、OIDC 認証で npm に公開します。

初期バージョンは既存の `package.json` に合わせて `1.0.0` とし、導入前のコミットを
`bootstrap-sha` で区切っています。以後のバージョン更新は release-please に任せてください。
公開ジョブが失敗した場合は、原因を解消して同じ workflow run の失敗したジョブを再実行します。
GitHub Release が作成済みなので、新しいコミットの push だけではそのバージョンは再公開されません。

公開内容をローカルで確認する場合は、次を実行します。

```bash
npm run build
npm pack --dry-run --ignore-scripts
```
