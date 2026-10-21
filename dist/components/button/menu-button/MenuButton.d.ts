/** MenuButton のバリアント */
export type MenuButtonVariant = 'primary' | 'secondary' | 'ghost';
/** MenuButton のサイズ */
export type MenuButtonSize = 'medium' | 'large' | 'x-large';
/** MenuButton の Props */
export interface MenuButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'form' | 'formAction' | 'formEncType' | 'formMethod' | 'formNoValidate' | 'formTarget' | 'name' | 'value' | 'className'> {
    /**
     * ボタンの表示スタイル
     * @default 'primary'
     */
    variant?: MenuButtonVariant;
    /**
     * ボタンのサイズ
     * @default 'medium'
     */
    size?: MenuButtonSize;
    /**
     * ローディング状態。アイコンがスピナーに置き換わり、ボタンは無効化される
     * @default false
     */
    loading?: boolean;
    /** ボタンのラベルテキスト */
    children: React.ReactNode;
    /** ラベルの先頭に表示するアイコン */
    icon?: React.ReactNode;
    /** Menu コンポーネントとの連携用 ref。ドロップダウンの位置決めやフォーカス管理に使用 */
    ref?: React.Ref<HTMLButtonElement>;
}
export declare const MenuButton: {
    ({ variant, size, loading, disabled, children, icon, ref, ...rest }: MenuButtonProps): import("react/jsx-runtime").JSX.Element;
    displayName: string;
};
//# sourceMappingURL=MenuButton.d.ts.map