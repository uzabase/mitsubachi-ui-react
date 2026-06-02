import { ReactNode } from 'react';
import { TabsTab, TabsRoot } from '@base-ui/react/tabs';
export interface SectionTabGroupRootProps {
    /**
     * 現在選択されているタブの値（制御モード）
     *
     * `null` を渡すとどのタブも選択されない。
     */
    value?: TabsTab.Value;
    /** 初期選択タブの値（非制御モード） */
    defaultValue?: TabsTab.Value;
    /** タブ切り替え時のコールバック */
    onValueChange?: (value: TabsTab.Value, eventDetails: TabsRoot.ChangeEventDetails) => void;
    /** 子要素（SectionTabGroup.List + SectionTabGroup.Panel） */
    children: ReactNode;
}
export interface SectionTabListProps {
    /** SectionTab コンポーネント群 */
    children: ReactNode;
    /** タブリストのアクセシブルラベル */
    'aria-label'?: string;
}
export interface SectionTabPanelProps {
    /** パネルに対応するタブの値 */
    value: TabsTab.Value;
    /** パネルのコンテンツ */
    children: ReactNode;
    /**
     * 非表示時も DOM 内に HTML 要素を保持するか
     * @default false
     */
    keepMounted?: boolean;
}
declare function SectionTabGroupRoot({ value, defaultValue, onValueChange, children, }: SectionTabGroupRootProps): import("react/jsx-runtime").JSX.Element;
declare function SectionTabList({ children, 'aria-label': ariaLabel, }: SectionTabListProps): import("react/jsx-runtime").JSX.Element;
declare function SectionTabPanel({ value, children, keepMounted, }: SectionTabPanelProps): import("react/jsx-runtime").JSX.Element;
/**
 * SectionTabGroup
 *
 * ページ内セクションの切り替えに使用するタブグループ。
 * SectionTabGroup.List 内に SectionTab を配置し、
 * SectionTabGroup.Panel でコンテンツを表示する。
 *
 * Base UI の Tabs をベースに実装。
 * @see https://base-ui.com/react/components/tabs
 */
export declare const SectionTabGroup: typeof SectionTabGroupRoot & {
    List: typeof SectionTabList;
    Panel: typeof SectionTabPanel;
};
export {};
//# sourceMappingURL=SectionTabGroup.d.ts.map