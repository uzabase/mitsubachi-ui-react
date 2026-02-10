import React from 'react';
import { Button as BaseButton } from '@base-ui/react/button';
import styles from './icon-button.module.css';

/** Icon Buttonのバリアント */
export type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';

/** Icon Buttonのサイズ */
export type IconButtonSize = 'small' | 'medium' | 'large';

export interface IconButtonProps {
  /** ボタンのバリアント（表示スタイル） */
  variant?: IconButtonVariant;
  /** ボタンのサイズ */
  size?: IconButtonSize;
  /** 選択状態（secondary, tertiary, ghostのみ） */
  selected?: boolean;
  /** ローディング状態 */
  loading?: boolean;
  /** 無効化状態 */
  disabled?: boolean;
  /** ボタン内のアイコン */
  children: React.ReactNode;
  /** クリックイベントハンドラ */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** アクセシビリティラベル（必須：ツールチップと併用） */
  'aria-label': string;
  /** type属性 */
  type?: 'button' | 'submit' | 'reset';
  /** 追加のクラス名 */
  className?: string;
}

/**
 * テキストを持たず、アイコンのみで操作を表現するコンパクトなボタンコンポーネントです。
 *
 * 検索、閉じる、編集など、意味が広く共有されている操作に向いています。
 * 省スペースで配置できる一方、意味が伝わりにくいため、**必ずツールチップで意味を補完してください**。
 *
 * @example
 * ```tsx
 * <Tooltip content="検索">
 *   <IconButton variant="primary" size="medium" aria-label="検索">
 *     <SearchIcon />
 *   </IconButton>
 * </Tooltip>
 * ```
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const {
      variant = 'primary',
      size = 'medium',
      selected = false,
      loading = false,
      disabled = false,
      children,
      onClick,
      'aria-label': ariaLabel,
      type = 'button',
      className,
      ...rest
    } = props;

    // primary variantはselectedをサポートしない
    const isSelected = variant !== 'primary' && selected;

    const buttonClassName = [
      styles.button,
      styles[variant],
      styles[size],
      isSelected && styles.selected,
      loading && styles.loading,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <BaseButton
        ref={ref}
        className={buttonClassName}
        disabled={disabled || loading}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-pressed={isSelected ? 'true' : undefined}
        aria-busy={loading ? 'true' : undefined}
        type={type}
        {...rest}
      >
        {loading ? (
          <span className={styles.loadingSpinner} aria-hidden="true">
            {/* Loading spinner will be styled in CSS */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.spinner}
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="50 50"
              />
            </svg>
          </span>
        ) : (
          <span className={styles.iconWrapper}>{children}</span>
        )}
      </BaseButton>
    );
  }
);

IconButton.displayName = 'IconButton';
