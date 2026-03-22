import React from 'react';
import styles from './suggestion.module.css';

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
  /** カスタムコンテンツ */
  children: React.ReactNode;
  label?: never;
  icon?: never;
}

/** SuggestionItemのProps（テキストモードまたはスロットモードを排他的に指定） */
export type SuggestionItemProps =
  | SuggestionItemTextProps
  | SuggestionItemSlotProps;

/**
 * サジェッションリスト内の個別の候補アイテムです。
 *
 * - `label` を指定するとアイコン + テキストのテキストモードで表示
 * - `children` を指定するとカスタムコンテンツのスロットモードで表示
 */
export const SuggestionItem = (props: SuggestionItemProps) => {
  const { selected = false, onSelect, id } = props;
  const isSlot = 'children' in props && props.children != null;

  const handleClick = () => {
    onSelect?.();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect?.();
    }
  };

  const itemClassName = [styles.item, isSlot && styles.slot]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      role="option"
      aria-selected={selected}
      id={id}
      className={itemClassName}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      {isSlot ? (
        props.children
      ) : (
        <>
          {'icon' in props && props.icon != null && (
            <span className={styles.icon} aria-hidden="true">
              {props.icon === true ? null : props.icon}
            </span>
          )}
          <span className={styles.label}>
            {'label' in props && props.label}
          </span>
        </>
      )}
    </div>
  );
};
