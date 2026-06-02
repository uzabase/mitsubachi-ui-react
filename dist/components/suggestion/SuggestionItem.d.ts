import { default as React } from 'react';
interface SuggestionItemBaseProps {
    /** 選択状態（aria-activedescendant連携時にtrueを設定） */
    selected?: boolean;
    /** 選択時のコールバック */
    onSelect?: () => void;
    /** オプションのID（aria-activedescendantに使用） */
    id?: string;
}
interface SuggestionItemTextProps extends SuggestionItemBaseProps {
    /** テキストラベル */
    label: string;
    /** アイコン（trueを指定するとアイコン分の余白を確保） */
    icon?: React.ReactNode | true;
    children?: never;
}
interface SuggestionItemSlotProps extends SuggestionItemBaseProps {
    /** カスタムコンテンツ（任意の要素を自由に配置可能。レイアウトは利用者側で構成する） */
    children: React.ReactNode;
    label?: never;
    icon?: never;
}
/** SuggestionItemのProps（テキストモードまたはスロットモードを排他的に指定） */
export type SuggestionItemProps = SuggestionItemTextProps | SuggestionItemSlotProps;
/**
 * Suggestionリスト内の個別の候補アイテムです。
 *
 * ## Content Type: Text
 * `label` を指定するとアイコン + テキストの定型レイアウトで表示します。
 *
 * ## Content Type: Slot
 * `children` を指定すると、任意のカスタムコンテンツを差し込めるスロットモードになります。
 * Slot 内のレイアウトは Suggestion の責務ではなく、利用者が自由に構成できます。
 * 横並び・縦並び・複数要素の配置など、用途に応じた柔軟なレイアウトが可能です。
 *
 * @example
 * ```tsx
 * // Text モード
 * <SuggestionItem label="Apple" icon={<SearchIcon />} />
 *
 * // Slot モード（利用者が任意のコンテンツを差し込む）
 * <SuggestionItem>
 *   <Avatar />
 *   <span>山田 太郎</span>
 *   <span>taro@example.com</span>
 * </SuggestionItem>
 * ```
 */
export declare const SuggestionItem: (props: SuggestionItemProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SuggestionItem.d.ts.map