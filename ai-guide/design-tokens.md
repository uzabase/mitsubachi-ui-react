# デザイントークン規約

## トークンカテゴリ一覧

### Surface（背景）

| トークン | フォールバック | 用途 |
|---------|-------------|------|
| `--surface-strong-default` | `#282828` | プライマリボタン背景、ツールチップ背景 |
| `--surface-strong-hover` | `#191919` | プライマリボタン hover |
| `--surface-strong-active` | `black` | プライマリボタン active |
| `--surface-semi-strong-default` | `#ededed` | LinkTag 背景、ReadOnlyTag neutral |
| `--surface-semi-strong-hover` | `#e5e5e5` | LinkTag hover |
| `--surface-semi-strong-active` | `#dfdfdf` | LinkTag active |
| `--surface-semi-strong-disabled` | `rgba(0,0,0,0.07)` | disabled 背景 |
| `--surface-regular-default` | `#ffffff` | Dialog 背景、フォーカスリング内側 |
| `--surface-regular-disabled` | `rgba(0,0,0,0.03)` | TextArea disabled 背景 |
| `--surface-overlay-hover` | `rgba(0,0,0,0.07)` | secondary/tertiary/ghost hover |
| `--surface-overlay-active` | `rgba(0,0,0,0.1)` | secondary/tertiary/ghost active |
| `--surface-selected-default` | `#e8edff` | 選択状態背景 |
| `--surface-selected-hover` | `#dbe4ff` | 選択状態 hover |
| `--surface-selected-active` | `#d5dfff` | 選択状態 active |
| `--surface-information` | `#edf1ff` | 情報カラー背景 |
| `--surface-success` | `#dff5ea` | 成功カラー背景 |
| `--surface-error-default` | `#ffedeb` | エラーカラー背景 |
| `--surface-warning` | `#fcf6d4` | 警告カラー背景 |
| `--surface-required` | `#ffedeb` | 必須バッジ背景 |

### Text（テキスト）

| トークン | フォールバック | 用途 |
|---------|-------------|------|
| `--text-regular-default` | `rgba(0,0,0,0.84)` | 本文テキスト |
| `--text-inverse` | `#ffffff` | プライマリボタン上のテキスト |
| `--text-weak-default` | `rgba(0,0,0,0.54)` | プレースホルダ、サポートテキスト |
| `--text-disabled` | `rgba(0,0,0,0.35)` | disabled テキスト |
| `--text-error` | `#c92812` | エラーメッセージ |
| `--text-required` | `#c92812` | 必須バッジテキスト |
| `--text-information` | `#315ce8` | 情報カラーテキスト |
| `--text-positive` | `#00783c` | ポジティブカラーテキスト |
| `--text-negative` | `#c92812` | ネガティブカラーテキスト |

### Border（ボーダー）

| トークン | フォールバック | 用途 |
|---------|-------------|------|
| `--border-regular-default` | `rgba(0,0,0,0.1)` | Dialog ボーダー、区切り線 |
| `--border-semi-strong-default` | `rgba(0,0,0,0.2)` | TextArea ボーダー |
| `--border-semi-strong-hover` | `rgba(0,0,0,0.35)` | TextArea hover ボーダー |
| `--border-strong-default` | `rgba(0,0,0,0.84)` | secondary ボタンボーダー |
| `--border-disabled` | `rgba(0,0,0,0.07)` | disabled ボーダー |
| `--border-selected` | `#3f69f2` | 選択状態ボーダー |
| `--border-error-default` | `#db351f` | エラーボーダー |

### Icon（アイコン）

| トークン | フォールバック | 用途 |
|---------|-------------|------|
| `--icon-on-strong` | `white` | プライマリボタンアイコン |
| `--icon-regular-default` | `rgba(0,0,0,0.84)` | 通常アイコン |
| `--icon-disabled` | `rgba(0,0,0,0.25)` | disabled アイコン |
| `--icon-selected` | `#3f69f2` | 選択状態アイコン |

### Typography（タイポグラフィ）

| トークン | フォールバック | 用途 |
|---------|-------------|------|
| `--typography-font-family` | `Arial, sans-serif` | 全コンポーネント |
| `--typography-font-weight-regular` | `400` | 通常ウェイト |
| `--typography-font-weight-bold` | `700` | ラベル太字 |
| `--font-scale-20` | `11px` | 必須バッジ、小タグ |
| `--font-scale-30` | `12px` | サポートテキスト、文字数カウント、ツールチップ |
| `--font-scale-40` | `14px` | 本文テキスト、Snackbar |
| `--font-scale-50` | `16px` | TextArea（large / phone） |

### Spacing（スペーシング）

| トークン | フォールバック | 用途 |
|---------|-------------|------|
| `--spacing-x-small` | `4px` | 小さいギャップ |
| `--spacing-small` | `4px` | 小さなパディング・ギャップ |
| `--spacing-medium` | `8px` | 標準的なパディング・ギャップ |
| `--spacing-large` | `12px` | Snackbar パディング |
| `--spacing-x-large` | `16px` | Dialog セクションパディング |
| `--spacing-2x-large` | `24px` | Dialog 外側パディング |

### Border Radius

| トークン | フォールバック | 用途 |
|---------|-------------|------|
| `--border-radius-full` | `9999px` | ピル型（ボタン、IconButton） |
| `--border-radius-x-large` | `12px` | Dialog |
| `--border-radius-medium` | `6px` | Snackbar、InlineNotification、TextArea |
| `--border-radius-small` | `4px` | Tooltip、ReadOnlyTag |

### Elevation / Shadow

| トークン | フォールバック | 用途 |
|---------|-------------|------|
| `--neutral-neutral-50-alpha` | `rgba(0,0,0,0.29)` | シャドウ濃い層、バックドロップ |
| `--neutral-neutral-30-alpha` | `rgba(0,0,0,0.13)` | シャドウ薄い層 |
| `--elevation-regular` | `rgba(0,0,0,0.13)` | Snackbar シャドウ |
| `--elevation-semi-weak` | `rgba(0,0,0,0.1)` | Snackbar シャドウ |

### Focus

| トークン | フォールバック | 用途 |
|---------|-------------|------|
| `--focus-ring-default` | `#191919` | フォーカスリング外側 |