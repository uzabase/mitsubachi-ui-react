# Lessons Learned

セッション中に得た教訓・改善パターンを記録するファイルです。

## フォーマット

```
### YYYY-MM-DD: [カテゴリ] 教訓タイトル

- **状況**: 何が起きたか
- **学び**: 何を学んだか
- **ルール**: 今後どうするか
```

### 2026-02-24: [アイコン] 既存アイコンの再利用を優先する

- **状況**: TextAreaUnitのエラーメッセージ用に新規`ErrorFillIcon`を作成したが、既存の`ErrorIcon`で十分だった
- **学び**: Figmaのアイコン形状が既存と多少異なっても、デザインシステム内で既に定義されたアイコンコンポーネントがあればそちらを使うべき。不要なアイコンバリアントの増殖を防ぐ
- **ルール**: 新規アイコンを作る前に、必ず`src/icons/`の既存アイコンを確認し、用途が近いものがあればそれを使う。新規作成が必要な場合はユーザーに確認する

### 2026-02-24: [CSS] Figmaのレイアウト指定を鵜呑みにしない

- **状況**: Figmaのカウント表示が`justify-end`（右寄せ）だったのでそのまま実装したが、実際の意図は左寄せだった
- **学び**: Figmaのレイアウト指定はデザイン上の表現であり、実装時の意図と異なる場合がある。特にFigmaのauto-layoutの配置設定は、コンポーネントの実際の使用コンテキストでの意図と一致しないことがある
- **ルール**: Figmaから取得したレイアウト方向（justify-content等）は、実装前にユーザーの意図を確認する。特にカウンターやラベルなど補助的UIの配置は要確認

### 2026-02-24: [コンポーネント設計] disabled状態は合成コンポーネント全体に波及させる

- **状況**: TextAreaUnit（LabelUnit + TextArea の合成）で disabled にしたとき、TextArea部分だけ disabled 表示になり、ラベルは通常の色のまま残った
- **学び**: フォームフィールドの disabled 状態は、入力要素だけでなくラベル・補足テキスト・カウント表示など関連するすべての子要素に視覚的に波及させるべき。部分的な disabled は一貫性を損なう
- **ルール**: 合成コンポーネントを作る際は、disabled / error などの状態が構成要素すべてに伝播するか必ず確認する

### 2026-02-24: [CSS] 子要素が明示的にcolorを持つと親のdisabled色が継承されない

- **状況**: `.countDisabled` で `color: var(--text-disabled)` を設定したが、子要素 `.countCurrent` が自身の `color` を明示的に持っていたため、disabled 色が反映されなかった
- **学び**: CSSの `color` 継承は、子要素が自身で `color` を明示的に宣言している場合は上書きされる。親に disabled 色を設定するだけでは不十分
- **ルール**: disabled 用の親クラスを作る場合、独自に `color` を持つ子要素には `.parentDisabled .child { color: ... }` のセレクタも必ず追加する

### 2026-02-24: [CSS] 生の値ではなくデザイントークンを使う

- **状況**: `.labelRow` の `gap: 8px` が生の値で書かれていた。他のファイルでは `var(--spacing-medium, 8px)` のようにトークンを使っている
- **学び**: 一見同じ `8px` でもデザイントークン経由にしないと、後でトークン値が変更されたときに追従できない
- **ルール**: スペーシング・フォントサイズ・色など、デザインシステムにトークンが存在する値は必ずトークン経由で参照する。フォールバック値を添えて `var(--token, fallback)` の形式を使う

### 2026-02-24: [Storybook] AllStates ストーリーは Standard/Count をセットで並べる

- **状況**: TextArea の AllStates ストーリーが Standard 版のみで、Count 付きバリアントが別の場所に散在していた。disabled + count の状態が可視化されていなかった
- **学び**: カウント表示付きバリアントは disabled / error との組み合わせで固有のスタイル問題が生じやすい。全状態一覧では Standard と Count をセットで並べることで差分が一目でわかる
- **ルール**: AllStates 系のストーリーは、主要なバリアント（Standard / Count など）を列に、状態（Default / Disabled / Error など）を行にしたグリッドで構成する

### 2026-02-24: [アクセシビリティ] aria-describedby でエラーメッセージと入力要素を紐づける

- **状況**: TextArea のエラーメッセージに `role="alert"` はあったが、textarea 要素との `aria-describedby` 紐づけがなかった。フォーカス時にスクリーンリーダーがエラー内容を伝えられない状態だった
- **学び**: `role="alert"` はエラー出現時に読み上げるが、入力要素との**関連付け**は別途 `aria-describedby` で行う必要がある。フォーカス中のユーザーがエラー内容を知るために不可欠
- **ルール**: フォームコンポーネントでエラーメッセージを表示する場合、必ず `aria-describedby` で入力要素とエラーメッセージ要素を紐づける。`useId()` でIDを生成し、エラー有無で `aria-describedby` を動的に設定する

### 2026-02-24: [API設計] 合成コンポーネントでHTML属性を二重定義しない

- **状況**: TextAreaUnit が `required?: boolean` を独自propsで再宣言し destructure していたため、ネイティブの `<textarea required>` に渡らなかった。視覚的に「必須」バッジは表示されるが、スクリーンリーダーには伝わらない状態
- **学び**: `extends HTMLAttributes` で既に持っている属性を合成コンポーネントで再宣言すると、destructure 時に `...rest` から消えてネイティブ要素に到達しなくなる。型の重複も混乱を招く
- **ルール**: 合成コンポーネントでは HTML 由来の属性（required, disabled 等）を再宣言せず、`...rest` 経由でネイティブ要素に渡す。ラベル等にも渡す必要がある場合は `rest.required` で参照する

### 2026-02-24: [API設計] 表示制御ブール値は値の有無で代替できないか検討する

- **状況**: `showSupportText` + `supportText` や `showCount` + `maxCount` のように、表示制御ブール値と値がセットで必要なAPIだった。利用者は常に2つをセットで指定する必要があり冗長
- **学び**: 「値が存在すれば表示」というパターンが最も直感的。別途ブール値が必要なのは「値があっても非表示にしたい」ケースのみ。その場合もデフォルトを「表示」にして、opt-out 型にするほうがDXが良い
- **ルール**: props 設計時に `showXxx` ブール値を追加する前に、対応する値（`xxx`）の有無で判定できないか検討する。opt-out が必要な場合は `showXxx` のデフォルトを `true` に相当する動作にする

### 2026-02-24: [CSS] padding ショートハンドではなく論理プロパティを使用する

- **状況**: `.textarea.medium` で `padding: 8px`（物理ショートハンド）を使用し、`.textarea.large` では `padding-block / padding-inline` を使用しており不統一だった
- **学び**: 全辺が同じ値でも `padding` ショートハンドは物理プロパティ。CLAUDE.md が論理プロパティを「強く推奨」している以上、一貫して `padding-block` + `padding-inline` を使うべき
- **ルール**: `padding`, `margin` 等のショートハンドは使わず、常に `padding-block` / `padding-inline`（または `margin-block` / `margin-inline`）の論理プロパティで書く。全辺同値でも例外なし

---

### 2026-02-24: [コンポーネント設計] classNameプロパティを安易に追加しない

- **状況**: IconButtonコンポーネントに `className?: string` を追加したが、プロジェクト方針として外部からの任意className受け付けを行わないで統一する方針を立てた。
- **学び**: このプロジェクトではコンポーネントのスタイルはCSS Modulesで完結させ、外部からclassNameを注入するAPIは提供しない方針。既存コンポーネント（Button等）もclassNameを受け付けていない
- **ルール**: 新規コンポーネント作成時、`className` プロパティを追加しない。既存コンポーネントのprops設計を確認し、プロジェクト方針と一貫させる

### 2026-02-27: [CSS] background ショートハンドと background-color ロングハンドを混在させない

- **状況**: `.clearButton` のベーススタイルで `background: transparent`（ショートハンド）を使い、`:hover` 状態で `background-color`（ロングハンド）を使ったところ、hover時の背景色変化がStorybookで視覚的に確認できなかった
- **学び**: `background` ショートハンドは `background-color` を含む全サブプロパティをリセットする。後から `background-color` だけを変更しても、ショートハンドの他のプロパティ（image, position等）の初期値が残り、期待通りに動かない場合がある。同じプロパティ軸で統一すべき
- **ルール**: `background-color` を状態（hover, active, focus等）で変更する場合、ベーススタイルも `background-color: transparent` と書く。ショートハンド `background` とロングファンド `background-color` を同一要素で混在させない

### 2026-02-27: [CSS] :has() セレクタで親のフォーカスリングを制御する場合、対象子要素を明示する

- **状況**: `.container:has(:focus-visible)` でコンテナにフォーカスリングを表示していたが、input とクリアボタンの両方にマッチしてしまい、クリアボタンにフォーカスが移ってもコンテナのフォーカスリングが残り続けた。WCAG 2.4.7 違反の状態
- **学び**: `:has(:focus-visible)` は子孫のいずれかがフォーカスされるとマッチする。複合コンポーネントで複数のフォーカス可能要素がある場合、どの要素のフォーカスで親スタイルを変更するか明示しないと、フォーカスの所在が曖昧になりアクセシビリティ上の問題になる
- **ルール**: `:has(:focus-visible)` を使う際は、対象クラスを明示する（例: `.container:has(.input:focus-visible)`）。複数のインタラクティブ要素を持つコンテナでは、各要素のフォーカスリングを個別に管理する

### 2026-02-27: [React] Uncontrolled input のプログラマティックなクリアには nativeInputValueSetter を使う

- **状況**: uncontrolled モード（`defaultValue` 使用）の `<input>` で、クリアボタン押下時に `setInternalValue('')` でReact stateを更新したが、DOMの入力値はクリアされなかった
- **学び**: `value={undefined}` の uncontrolled input は React が DOM の value を管理しないため、React state を更新しても DOM に反映されない。DOM を直接操作する必要がある。さらに、React は synthetic event を通じて onChange を発火するため、`input.value = ''` の直接代入では onChange が呼ばれない
- **ルール**: uncontrolled input のプログラマティックなクリアには `Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set` で native setter を取得し、`dispatchEvent(new Event('input', { bubbles: true }))` でイベントを発火する。これにより親コンポーネントの onChange も正しく通知される

### 2026-02-25: [デザイントークン] Figmaの指定値を一般的な慣習より優先する

- **状況**: Figmaでアイコンサイズが `width: 20, height: 20` と指定されていたにもかかわらず、`24px` で実装してしまった
- **学び**: Material Design等で広く使われるアイコンのデフォルトサイズ（24px）を無意識に適用してしまった。一般的な慣習やフレームワークのデフォルト値よりも、Figmaで明示的に指定された値が常に正しい情報源である
- **ルール**: サイズ・色・スペーシング等のデザイン値は、Figmaの指定値をそのまま忠実に反映する。「よくある値」「一般的なデフォルト」に引っ張られて丸めたり置き換えたりしない。Figmaの値と一般的な慣習が異なる場合は、必ずFigmaを優先する

### 2026-02-26: [デザイントークン] disabled状態は全構成要素のアイコン色にも適用する

- **状況**: FilterChipのdisabled状態でチェックアイコンの色が通常のままだった。InputChipでも閉じるボタンのアイコン色がdisabled時に変わっていなかった
- **学び**: disabled状態ではテキスト色だけでなく、アイコン色も `object/regular-disabled` トークンに切り替える必要がある。特にcompositionパターンで子コンポーネント（IconButton等）のアイコン色を制御する場合、CSS変数のオーバーライドが有効（例: `--icon-disabled: var(--object-regular-disabled)`）
- **ルール**: disabled状態を実装する際は、テキスト・アイコン・ボーダーなど全視覚要素にdisabledトークンが適用されているか確認する。子コンポーネントのアイコン色はCSS変数オーバーライドで制御する

### 2026-02-26: [CSS] letter-spacingは相対値（em）で指定する

- **状況**: `letter-spacing: 0.24px` / `0.28px` と固定px値で実装したが、デザイン意図は `0.02em`（フォントサイズの2%）だった
- **学び**: letter-spacingをpxで固定すると、フォントサイズが変わったときに比率が崩れる。デザインで「2%」のような比率指定の場合は `em` 単位を使うべき
- **ルール**: letter-spacingはpx固定値ではなく `em` 単位（相対値）で指定する。Figmaで `letterSpacing: 2%` のような指定があれば `0.02em` に変換する

### 2026-02-26: [アイコン] SVGパスは推測せずデザイナーから提供されたベクターを使う

- **状況**: CheckSmallIconを自前でstrokeベースのパスで作成したが、デザイナーから正確なfillベースのSVGベクターが提供された
- **学び**: アイコンのSVGパスを推測や近似で作成すると、デザインとの微妙な差異が生まれる。stroke vs fill、線幅、角の処理など、見た目の印象が変わる要素が多い
- **ルール**: アイコンのSVGパスは自分で推測せず、必ずデザイナーから提供されたベクターデータを使用する。`fill="black"` 等のハードコードは `currentColor` に置き換え、viewBox内の位置調整のみ行う

### 2026-02-26: [デザイントークン] トークン名とフォールバック値の対応を思い込まない

- **状況**: `--spacing-small` というトークン名から「8px」だと思い込んでフォールバック値を `8px` にしたが、実際は `4px` だった
- **学び**: トークン名から値を推測してはいけない。`--spacing-small` が他のコンポーネントで `8px` のフォールバックで使われていても、デザイナーがトークンの実際の値を変更している可能性がある。また、同じトークン名でもコンテキストによって期待されるフォールバック値が異なる場合がある
- **ルール**: デザイントークンのフォールバック値は、ユーザー（デザイナー）が指定した値をそのまま使う。既存コードで同じトークンが別の値で使われていても、新しい指示が優先される

### 2026-02-26: [CSS] ベースコンポーネントに全バリアント共通でないスタイルを入れない

- **状況**: ベースの `.chip` に `gap: 2px` を定義していたが、実際は input-chip のみ `gap: 2px` が必要で、filter-chip には gap が不要だった
- **学び**: ベースコンポーネントに書いたスタイルは全バリアントに適用される。一部のバリアントにしか必要ないスタイルをベースに入れると、不要なバリアントで意図しない余白やレイアウトが生まれる
- **ルール**: ベースコンポーネントのCSSには全バリアント共通のスタイルのみ定義する。バリアント固有のスタイル（gap、padding等）は各バリアントのCSS側で定義する

### 2026-02-26: [CSS] アイコンサイズはviewport別に指定する

- **状況**: filter-chipのチェックアイコンにサイズ指定がなかった。desktopは18px（`--icon-size-small`）、phoneは20px（`--icon-size-medium`）が必要だった
- **学び**: アイコンのサイズはviewportによって異なることが多い。サイズ指定なしだとSVGの固有サイズに依存し、viewport別のデザイン意図が反映されない
- **ルール**: アイコンを含むコンポーネントでは、viewport別（desktop / phone）にアイコンサイズ（`inline-size` / `block-size`）を明示的に指定する。デザイントークン（`--icon-size-small` 等）を使用する

### 2026-02-26: [命名] アイコン名にサイズ情報を含めない

- **状況**: `CheckSmallIcon` という名前でアイコンを定義していたが、サイズはCSS側で制御するものであり、アイコン名に「Small」を含める必要はなかった
- **学び**: アイコンコンポーネントのサイズは使用箇所のCSSで決まる。アイコン名にサイズ（Small / Medium / Large等）を含めると、特定サイズ専用という誤解を招き、別サイズで使いたいときに名前と実態が乖離する
- **ルール**: アイコンコンポーネント名にはサイズ情報を含めない。`CheckSmallIcon` → `CheckIcon` のように、アイコンの意味（役割）のみで命名する。サイズ制御はCSS側の責務とする

### 2026-02-27: [TypeScript] ポリモーフィックコンポーネントのref型キャストでスーパータイプを使わない

- **状況**: レビューで `ref={ref as React.Ref<HTMLButtonElement & HTMLSpanElement>}` を `ref={ref as React.Ref<HTMLElement>}` に変更するよう提案したが、TSエラー `Type 'Ref<HTMLElement>' is not assignable to type 'Ref<HTMLButtonElement>'` が発生した
- **原因**: 「HTMLElementは両方の共通基底型だから安全」と安易に判断した。Ref<T>のTは共変ではなく、スーパータイプ（HTMLElement）からサブタイプ（HTMLButtonElement）への代入は型安全でないためTSが拒否する
- **学び**: `Ref<スーパータイプ>` は `Ref<サブタイプ>` に代入できない。ポリモーフィックコンポーネント（`as` propで要素タイプが変わる）では、intersection型（`HTMLButtonElement & HTMLSpanElement`）へのキャストが正しい。intersection型は両方のサブタイプとして扱われるため、どちらの要素型にも代入可能
- **ルール**: ポリモーフィックコンポーネントのrefキャストでは `Ref<HTMLElement>` ではなく `Ref<ElementA & ElementB>` のintersection型を使う。型の方向（スーパータイプ vs サブタイプ）を必ず確認してからレビュー指摘する

### 2026-02-28: [ドキュメント] JSDocはですます調で統一し、使用例を含める

- **状況**: SearchBoxのJSDocで「〜が望ましい。」「〜で補足する。」と体言止め・である調が混在していた
- **学び**: デザインシステムのドキュメントは利用者向けなので、ですます調で統一すべき。また、コンポーネントの説明だけでなく `@example` で具体的な使用例を含めることで、利用者がすぐにコピペで使い始められる
- **ルール**: JSDocは①ですます調で統一 ②コンポーネント説明の下に `@example`（または `### 使用例`）で利用者向けのコード例を含める
