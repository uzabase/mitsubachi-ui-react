# AIエージェント向けガイド

mitsubachi-ui-react（React 19ベースのデザインシステムコンポーネントライブラリ）のコーディングガイドです。

## ドキュメント一覧

### プロジェクト基盤
- [プロジェクト構造](./project-structure.md) - ディレクトリ構成、設定ファイル、依存関係
- [コーディング規約](./coding-rules.md) - CSS設計、コンポーネント実装パターン、TypeScript規約

### コンポーネント実装
- [コンポーネント設計](./components.md) - コンポーネントの分類と実装パターン
- [型定義](./types-and-models.md) - TypeScript型とモデル
- [状態管理とHooks](./state-and-hooks.md) - カスタムHooksと状態管理方針
- [スタイリング](./styling.md) - CSS Modules、擬似クラス、アニメーション
- [デザイントークン](./design-tokens.md) - デザイントークン

### テスト
- [テスト](./testing.md) - Vitest + Playwright、Testing Library、Storybook テスト

## クイックスタート

1. **新コンポーネント作成**: project-structure.md → coding-rules.md → components.md
2. **既存コンポーネント修正**: components.md → types-and-models.md → styling.md
3. **型の確認**: types-and-models.md
4. **テスト作成**: testing.md

## 重要な原則

1. **Base UI + CSS Modules** - ヘッドレスUIをラップし、CSS Modulesでスタイルを適用
2. **TypeScript strict mode** - 型安全性を重視
3. **論理プロパティ** - RTL対応のためCSS論理プロパティを使用
4. **アクセシビリティ** - WCAG 2.2準拠、eslint-plugin-jsx-a11yで自動チェック
5. **PCファースト** - ブレイクポイントは720pxの1箇所のみ
