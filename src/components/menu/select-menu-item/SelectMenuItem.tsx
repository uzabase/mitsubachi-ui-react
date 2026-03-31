import type React from 'react';
import { Menu } from '@base-ui/react/menu';
import { MenuItemLayout } from '../shared';
import { CheckIcon } from '../../../icons';
import styles from './select-menu-item.module.css';

/** SelectMenuItem の Props */
export interface SelectMenuItemProps {
  /**
   * Menu.RadioGroupのvalueとして使われる識別子
   */
  value: string;
  /**
   * 無効化状態。クリック操作が無効になり、テキストとアイコンが淡色表示になる
   * @default false
   */
  disabled?: boolean;
  /** ラベルの先頭に表示するアイコン */
  icon?: React.ReactNode;
  /** ラベル下に表示する補助テキスト */
  supportText?: string;
  /** メニュー項目のラベル */
  children: React.ReactNode;
}

/**
 * 選択状態を持つメニュー項目
 *
 * 設定値やフィルター条件などの切り替えに使用する。
 * `Menu.RadioGroup` 内に配置し、グループ内で1つだけ選択できる（Single-select）。
 * 新しい項目を選択すると、これまでの選択は自動的に解除される。
 *
 * ## 選択必須 / 任意選択
 * - **選択必須**: 選択肢のみを並べる
 * - **任意選択**: 先頭に `<SelectMenuItem value="">指定なし</SelectMenuItem>` を配置し、
 *   未選択状態を表現する
 *
 * ## Don't
 * - **複数選択（Multi-select / Checkbox）には対応しない。**
 *   このコンポーネントは単一選択（Radio）専用。
 *
 * @example
 * ```tsx
 * // 選択必須
 * <Menu.RadioGroup value={value} onValueChange={setValue}>
 *   <SelectMenuItem value="sales">営業</SelectMenuItem>
 *   <SelectMenuItem value="marketing">マーケティング・広報</SelectMenuItem>
 * </Menu.RadioGroup>
 *
 * // 任意選択（「指定なし」付き）
 * <Menu.RadioGroup value={value} onValueChange={setValue}>
 *   <SelectMenuItem value="">指定なし</SelectMenuItem>
 *   <SelectMenuItem value="sales">営業</SelectMenuItem>
 *   <SelectMenuItem value="marketing">マーケティング・広報</SelectMenuItem>
 * </Menu.RadioGroup>
 * ```
 */
export const SelectMenuItem = ({
  value,
  disabled = false,
  icon,
  supportText,
  children,
}: SelectMenuItemProps) => {
  return (
    <Menu.RadioItem className={styles.root} value={value} disabled={disabled}>
      <MenuItemLayout icon={icon} supportText={supportText}>
        {children}
      </MenuItemLayout>
      <Menu.RadioItemIndicator className={styles.checkIcon}>
        <span className={styles.checkIconSvg}>
          <CheckIcon />
        </span>
      </Menu.RadioItemIndicator>
    </Menu.RadioItem>
  );
};
