import { ChevronDownIcon, SpinnerIcon } from '../../../icons';
import styles from './menu-button.module.css';

/** MenuButton のバリアント */
export type MenuButtonVariant = 'primary' | 'secondary' | 'ghost';

/** MenuButton のサイズ */
export type MenuButtonSize = 'medium' | 'large' | 'x-large';

/** MenuButton の Props */
export interface MenuButtonProps extends Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  | 'type'
  | 'form'
  | 'formAction'
  | 'formEncType'
  | 'formMethod'
  | 'formNoValidate'
  | 'formTarget'
  | 'name'
  | 'value'
  | 'className'
> {
  /**
   * ボタンの表示スタイル
   * @default 'primary'
   */
  variant?: MenuButtonVariant;
  /**
   * ボタンのサイズ
   * @default 'medium'
   */
  size?: MenuButtonSize;
  /**
   * ローディング状態。アイコンがスピナーに置き換わり、ボタンは無効化される
   * @default false
   */
  loading?: boolean;
  /** ボタンのラベルテキスト */
  children: React.ReactNode;
  /** ラベルの先頭に表示するアイコン */
  icon?: React.ReactNode;
  /** Menu コンポーネントとの連携用 ref。ドロップダウンの位置決めやフォーカス管理に使用 */
  ref?: React.Ref<HTMLButtonElement>;
}

const sizeClassMap: Record<MenuButtonSize, string> = {
  medium: styles.medium,
  large: styles.large,
  'x-large': styles.xLarge,
};

export const MenuButton = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  children,
  icon,
  ref,
  ...rest
}: MenuButtonProps) => {
  const buttonClassName = [
    styles.button,
    styles[variant],
    sizeClassMap[size],
    loading && styles.loading,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      className={buttonClassName}
      disabled={disabled || loading}
      aria-haspopup="true"
      aria-busy={loading ? 'true' : undefined}
      type="button"
      {...rest}
    >
      {loading ? (
        <span className={styles.loadingSpinner} aria-hidden="true">
          <SpinnerIcon />
        </span>
      ) : (
        icon && (
          <span className={styles.iconWrapper} aria-hidden="true">
            {icon}
          </span>
        )
      )}
      <span className={styles.label}>{children}</span>
      <span className={styles.chevron} aria-hidden="true">
        <ChevronDownIcon />
      </span>
    </button>
  );
};

MenuButton.displayName = 'MenuButton';
