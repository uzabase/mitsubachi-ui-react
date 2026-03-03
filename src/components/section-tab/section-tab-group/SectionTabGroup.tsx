import type { ReactNode } from 'react';
import { Tabs } from '@base-ui/react/tabs';
import type { TabsTab, TabsRoot } from '@base-ui/react/tabs';
import styles from './section-tab-group.module.css';

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
  onValueChange?: (
    value: TabsTab.Value,
    eventDetails: TabsRoot.ChangeEventDetails
  ) => void;
  /** 子要素（SectionTabGroup.List + SectionTabGroup.Panel） */
  children: ReactNode;
  /** 追加のクラス名 */
  className?: string;
}

export interface SectionTabListProps {
  /** SectionTab コンポーネント群 */
  children: ReactNode;
  /** タブリストのアクセシブルラベル */
  'aria-label'?: string;
  /** 追加のクラス名 */
  className?: string;
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
  /** 追加のクラス名 */
  className?: string;
}

function SectionTabGroupRoot({
  value,
  defaultValue,
  onValueChange,
  children,
  className,
}: SectionTabGroupRootProps) {
  return (
    <Tabs.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      className={className}
    >
      {children}
    </Tabs.Root>
  );
}

function SectionTabList({
  children,
  'aria-label': ariaLabel,
  className,
}: SectionTabListProps) {
  const listClassName = [styles.list, className].filter(Boolean).join(' ');

  return (
    <Tabs.List className={listClassName} aria-label={ariaLabel} activateOnFocus>
      {children}
    </Tabs.List>
  );
}

function SectionTabPanel({
  value,
  children,
  keepMounted = false,
  className,
}: SectionTabPanelProps) {
  return (
    <Tabs.Panel value={value} keepMounted={keepMounted} className={className}>
      {children}
    </Tabs.Panel>
  );
}

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
export const SectionTabGroup = Object.assign(SectionTabGroupRoot, {
  List: SectionTabList,
  Panel: SectionTabPanel,
});
