/** Icon Buttonのバリアント */
export type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';
/** Icon Buttonのサイズ */
export type IconButtonSize = 'small' | 'medium' | 'large';
export interface IconButtonProps {
    /** ボタンのバリアント（表示スタイル） */
    variant?: IconButtonVariant;
    /** ボタンのサイズ */
    size?: IconButtonSize;
    /** 選択状態（secondary, tertiary, ghostのみ） */
    selected?: boolean;
    /** ローディング状態 */
    loading?: boolean;
    /** 無効化状態 */
    disabled?: boolean;
    /** ボタン内のアイコン */
    children: React.ReactNode;
    /** クリックイベントハンドラ */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** アクセシビリティラベル（必須：ツールチップのテキストとしても使用） */
    'aria-label': string;
    /** type属性 */
    type?: 'button' | 'submit' | 'reset';
    /**
     * ツールチップの表示/非表示
     * @default true
     */
    tooltip?: boolean;
    /** ref */
    ref?: React.Ref<HTMLButtonElement>;
}
/**
 * テキストを持たず、アイコンのみで操作を表現するコンパクトなボタンコンポーネントです。
 *
 * 検索、閉じる、編集など、意味が広く共有されている操作に向いています。
 * 省スペースで配置できる一方、意味が伝わりにくいため、デフォルトでツールチップが表示されます。
 * ツールチップのテキストは `aria-label` から自動的に取得されます。
 *
 * @example
 * ```tsx
 * // ツールチップ付き（デフォルト）
 * <IconButton variant="primary" size="medium" aria-label="検索">
 *   <SearchIcon />
 * </IconButton>
 *
 * // ツールチップなし（title属性にフォールバック）
 * <IconButton variant="primary" size="medium" aria-label="検索" tooltip={false}>
 *   <SearchIcon />
 * </IconButton>
 * ```
 */
export declare const IconButton: {
    ({ variant, size, selected, loading, disabled, children, onClick, "aria-label": ariaLabel, type, tooltip, ref, ...rest }: IconButtonProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=IconButton.d.ts.map