import React, { useState, useCallback, useRef } from 'react';
import { CrossIcon, SearchIcon } from '../../icons';
import styles from './search-box.module.css';

/** SearchBoxのバリアント */
export type SearchBoxVariant = 'primary' | 'secondary';

export interface SearchBoxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size'
> {
  /** 見た目のバリアント */
  variant?: SearchBoxVariant;
  /** クリアボタン押下時のコールバック */
  onClear?: () => void;
}

/**
 * ユーザーが必要な情報を素早く見つけるための入力コンポーネントです。
 * キーワードの入力に応じて、候補表示や検索実行を行い、コンテンツ探索の効率を高めます。
 *
 * ラベル（LabelUnit）と併用して「何を」検索するのかを明示することが望ましいです。
 * ラベルの併用が難しい場合は、プレースホルダーで補足してください。
 *
 * ### 使用例
 * ```tsx
 * <LabelUnit text="競合企業" htmlFor="search-competitor" />
 * <SearchBox id="search-competitor" placeholder="企業を検索" variant="secondary" />
 * ```
 */
export const SearchBox = ({
  variant = 'primary',
  onClear,
  value,
  defaultValue,
  onChange,
  disabled,
  ...rest
}: SearchBoxProps) => {
  const [internalValue, setInternalValue] = useState(() =>
    defaultValue != null ? String(defaultValue) : ''
  );

  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value) : internalValue;
  const hasValue = currentValue.length > 0;

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    },
    [isControlled, onChange]
  );

  const handleClear = useCallback(() => {
    if (!isControlled) {
      setInternalValue('');
      if (inputRef.current) {
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          'value'
        )?.set;
        nativeInputValueSetter?.call(inputRef.current, '');
        inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }
    onClear?.();
    inputRef.current?.focus();
  }, [isControlled, onClear]);

  const containerClassName = [
    styles.container,
    styles[variant],
    hasValue && styles.hasValue,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <search className={containerClassName}>
      <span className={styles.searchIcon} aria-hidden="true">
        <SearchIcon />
      </span>
      <input
        ref={inputRef}
        type="search"
        className={styles.input}
        value={isControlled ? value : undefined}
        defaultValue={!isControlled ? defaultValue : undefined}
        onChange={handleChange}
        disabled={disabled}
        {...rest}
      />
      {hasValue && !disabled && (
        <button
          type="button"
          className={styles.clearButton}
          onClick={handleClear}
          aria-label="クリア"
        >
          <CrossIcon />
        </button>
      )}
    </search>
  );
};
