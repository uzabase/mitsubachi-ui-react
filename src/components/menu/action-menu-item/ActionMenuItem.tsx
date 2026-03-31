import type React from 'react';
import { Menu } from '@base-ui/react/menu';
import { MenuItemLayout } from '../shared';
import styles from './action-menu-item.module.css';

/** ActionMenuItem のバリアント */
export type ActionMenuItemVariant = 'neutral' | 'danger';

/** ActionMenuItem の Props */
export interface ActionMenuItemProps {
  /**
   * バリアント。dangerは削除などの破壊的操作に使用
   * @default 'neutral'
   */
  variant?: ActionMenuItemVariant;
  /**
   * 無効化状態。クリック操作が無効になり、テキストとアイコンが淡色表示になる
   * @default false
   */
  disabled?: boolean;
  /** ラベルの先頭に表示するアイコン */
  icon?: React.ReactNode;
  /** ラベル下に表示する補助テキスト */
  supportText?: string;
  /** クリック時のコールバック */
  onClick?: (event: React.MouseEvent) => void;
  /** メニュー項目のラベル */
  children: React.ReactNode;
}

/**
 * 画面遷移を伴わずに特定のアクションを実行するメニュー項目
 *
 * 選択すると、データの更新、実行、削除などの操作が即座に実行される。
 * データの削除や取り消し困難な変更など、不可逆的な操作にはvariant="danger"を使用する。
 *
 * @example
 * ```tsx
 * <ActionMenuItem onClick={handleEdit}>編集</ActionMenuItem>
 * <ActionMenuItem variant="danger" onClick={handleDelete}>削除</ActionMenuItem>
 * ```
 */
export const ActionMenuItem = ({
  variant = 'neutral',
  disabled = false,
  icon,
  supportText,
  onClick,
  children,
}: ActionMenuItemProps) => {
  const rootClassName = [styles.root, styles[variant]].join(' ');

  return (
    <Menu.Item className={rootClassName} disabled={disabled} onClick={onClick}>
      <MenuItemLayout icon={icon} supportText={supportText}>
        {children}
      </MenuItemLayout>
    </Menu.Item>
  );
};
