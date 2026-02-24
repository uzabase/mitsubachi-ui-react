import React, { useState, useCallback, useId, useRef } from 'react';
import { ErrorIcon } from '../../../icons';
import styles from './text-area.module.css';

/** TextAreaのサイズ */
export type TextAreaSize = 'medium' | 'large';

/** ビューポート */
export type Viewport = 'desktop' | 'phone';

export interface TextAreaProps extends Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  'size'
> {
  /** テキストエリアのサイズ */
  size?: TextAreaSize;
  /** ビューポート */
  viewport?: Viewport;
  /** エラー状態 */
  error?: boolean;
  /** エラーメッセージ一覧 */
  errorMessages?: string[];
  /** 文字数カウント表示（maxCount 設定時は自動表示） */
  showCount?: boolean;
  /** 最大文字数 */
  maxCount?: number;
}

/**
 * 複数行のテキストを入力・編集するためのコンポーネントです。
 * 1行の場合は、TextFieldを使用してください。
 */
export const TextArea = ({
  size = 'medium',
  viewport = 'desktop',
  error = false,
  errorMessages,
  showCount,
  maxCount,
  className,
  value,
  defaultValue,
  onChange,
  onScroll,
  disabled,
  ...props
}: TextAreaProps) => {
  const [internalValue, setInternalValue] = useState(() =>
    defaultValue != null ? String(defaultValue) : ''
  );

  const isControlled = value !== undefined;
  const currentValue = isControlled ? String(value) : internalValue;
  const currentLength = currentValue.length;
  const isCountOver = maxCount !== undefined && currentLength > maxCount;
  const showHighlight = isCountOver && !disabled;
  const shouldShowCount = showCount !== false && maxCount !== undefined;
  const hasError = error && errorMessages != null && errorMessages.length > 0;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const errorListId = useId();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    },
    [isControlled, onChange]
  );

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLTextAreaElement>) => {
      if (highlightRef.current && textareaRef.current) {
        highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      }
      onScroll?.(e);
    },
    [onScroll]
  );

  const textareaClassName = [
    styles.textarea,
    styles[size],
    error && styles.error,
    showHighlight && styles.textTransparent,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const containerClassName = [
    styles.container,
    viewport === 'phone' && styles.phone,
  ]
    .filter(Boolean)
    .join(' ');

  const countClassName = [
    styles.count,
    isCountOver && styles.countOver,
    disabled && styles.countDisabled,
  ]
    .filter(Boolean)
    .join(' ');

  const highlightClassName = [
    styles.highlight,
    size === 'large' ? styles.highlightLarge : styles.highlightMedium,
  ].join(' ');

  return (
    <div className={containerClassName}>
      <div className={styles.textareaWrapper}>
        {showHighlight && (
          <div
            className={highlightClassName}
            ref={highlightRef}
            aria-hidden="true"
          >
            <span>{currentValue.slice(0, maxCount)}</span>
            <span className={styles.overflowText}>
              {currentValue.slice(maxCount)}
            </span>
          </div>
        )}
        <textarea
          ref={textareaRef}
          className={textareaClassName}
          value={isControlled ? value : undefined}
          defaultValue={!isControlled ? defaultValue : undefined}
          onChange={handleChange}
          onScroll={handleScroll}
          disabled={disabled}
          aria-invalid={error || undefined}
          aria-describedby={hasError ? errorListId : undefined}
          {...props}
        />
      </div>
      {shouldShowCount && (
        <div className={countClassName}>
          <span className={styles.countCurrent}>{currentLength}</span>
          <span>/</span>
          <span>{maxCount}</span>
        </div>
      )}
      {hasError && (
        <div id={errorListId} className={styles.errorList} role="alert">
          {errorMessages.map((message, index) => (
            <div key={index} className={styles.errorItem}>
              <span className={styles.errorIcon}>
                <ErrorIcon />
              </span>
              <span className={styles.errorText}>{message}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
