import { Button as BaseButton } from '@base-ui/react/button';
import { SpinnerIcon } from '../../../icons';
import { Tooltip } from '../../tooltip';
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
  /** アクセシビリティラベル（必須：ツールチップのテキストとしても使用） */
  'aria-label': string;
  /** type属性 */
  type?: 'button' | 'submit' | 'reset';
  /**
   * ツールチップの表示/非表示
   * @default true
   */
  tooltip?: boolean;
  /** ref */
  ref?: React.Ref<HTMLButtonElement>;
}

/**
 * テキストを持たず、アイコンのみで操作を表現するコンパクトなボタンコンポーネントです。
 *
 * 検索、閉じる、編集など、意味が広く共有されている操作に向いています。
 * 省スペースで配置できる一方、意味が伝わりにくいため、デフォルトでツールチップが表示されます。
 * ツールチップのテキストは `aria-label` から自動的に取得されます。
 *
 * @example
 * ```tsx
 * // ツールチップ付き（デフォルト）
 * <IconButton variant="primary" size="medium" aria-label="検索">
 *   <SearchIcon />
 * </IconButton>
 *
 * // ツールチップなし（title属性にフォールバック）
 * <IconButton variant="primary" size="medium" aria-label="検索" tooltip={false}>
 *   <SearchIcon />
 * </IconButton>
 * ```
 */
export const IconButton = ({
  variant = 'primary',
  size = 'medium',
  selected = false,
  loading = false,
  disabled = false,
  children,
  onClick,
  'aria-label': ariaLabel,
  type = 'button',
  tooltip = true,
  ref,
  ...rest
}: IconButtonProps) => {
  if (
    process.env.NODE_ENV !== 'production' &&
    variant === 'primary' &&
    selected
  ) {
    console.warn('IconButton: primary variantはselectedをサポートしません');
  }

  const isSelected = variant !== 'primary' && selected;

  const buttonClassName = [
    styles.button,
    styles[variant],
    styles[size],
    isSelected && styles.selected,
    loading && styles.loading,
  ]
    .filter(Boolean)
    .join(' ');

  const button = (
    <BaseButton
      ref={ref}
      className={buttonClassName}
      disabled={disabled || loading}
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={isSelected ? 'true' : undefined}
      aria-busy={loading ? 'true' : undefined}
      type={type}
      title={!tooltip ? ariaLabel : undefined}
      {...rest}
    >
      {loading ? (
        <span className={styles.loadingSpinner} aria-hidden="true">
          <SpinnerIcon />
        </span>
      ) : (
        <span className={styles.iconWrapper}>{children}</span>
      )}
    </BaseButton>
  );

  if (tooltip) {
    return <Tooltip label={ariaLabel}>{button}</Tooltip>;
  }

  return button;
};

IconButton.displayName = 'IconButton';
