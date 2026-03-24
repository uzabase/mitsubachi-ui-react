import React, { useRef } from 'react';
import styles from './suggestion.module.css';

export interface SuggestionProps {
  /** 候補が空のときに表示するメッセージ @default '一致する候補が見つかりません' */
  emptyMessage?: string;
  /** 子要素（SuggestionItem, SuggestionCategory） */
  children?: React.ReactNode;
  /** listboxのアクセシブルラベル */
  'aria-label'?: string;
  /** listboxのID（comboboxのaria-controlsに使用） */
  id?: string;
}

/**
 * 検索ボックスや入力フィールドをクリック、またはキーワードを入力した際に
 * 表示される候補リストのコンポーネントです。
 *
 * 入力中の文字列に基づいて候補を提示し、選択による入力の補助や、
 * キーワードの補完（autocomplete）を通じて、入力の手間を減らし操作効率を高めます。
 */
export const Suggestion = ({
  emptyMessage = '一致する候補が見つかりません',
  children,
  'aria-label': ariaLabel,
  id,
}: SuggestionProps) => {
  const listboxRef = useRef<HTMLDivElement>(null);
  const isEmpty = React.Children.toArray(children).length === 0;

  const getOptions = (): HTMLElement[] => {
    if (!listboxRef.current) return [];
    return Array.from(
      listboxRef.current.querySelectorAll<HTMLElement>('[role="option"]')
    );
  };

  const handleFocus = (e: React.FocusEvent) => {
    if (e.target !== listboxRef.current) return;
    const options = getOptions();
    if (options.length === 0) return;
    const selected = options.find(
      (el) => el.getAttribute('aria-selected') === 'true'
    );
    (selected ?? options[0]).focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const options = getOptions();
    if (options.length === 0) return;

    const currentIndex = options.findIndex(
      (el) => el === document.activeElement
    );

    let nextIndex: number | null = null;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
        break;
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
        e.preventDefault();
        nextIndex = options.length - 1;
        break;
    }

    if (nextIndex != null) {
      options[nextIndex].focus();
    }
  };

  return (
    <div
      ref={listboxRef}
      role="listbox"
      aria-label={ariaLabel}
      id={id}
      className={styles.container}
      tabIndex={0}
      onFocus={isEmpty ? undefined : handleFocus}
      onKeyDown={isEmpty ? undefined : handleKeyDown}
    >
      {isEmpty ? (
        <div role="status" className={styles.emptyState}>
          {emptyMessage}
        </div>
      ) : (
        children
      )}
    </div>
  );
};
