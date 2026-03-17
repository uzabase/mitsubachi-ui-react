import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import type { CheckboxRoot } from '@base-ui/react/checkbox';
import styles from './checkbox.module.css';

export interface CheckboxProps extends Omit<
  React.ComponentPropsWithoutRef<'span'>,
  'checked' | 'defaultChecked' | 'children' | 'onChange'
> {
  /** チェック状態（制御コンポーネント用） */
  checked?: boolean;
  /** 初期チェック状態（非制御コンポーネント用） @default false */
  defaultChecked?: boolean;
  /** 中間状態（親子チェックボックスなど） @default false */
  indeterminate?: boolean;
  /** 無効化状態 @default false */
  disabled?: boolean;
  /** チェック状態の変更ハンドラ */
  onCheckedChange?: (
    checked: boolean,
    eventDetails: CheckboxRoot.ChangeEventDetails
  ) => void;
  /** フォーム送信時のname属性 */
  name?: string;
  /** フォーム送信時のvalue属性 */
  value?: string;
  /** 必須入力 @default false */
  required?: boolean;
  /** 読み取り専用 @default false */
  readOnly?: boolean;
  /** input要素のid */
  id?: string;
  /** 隠し<input>要素へのref。フォームライブラリとの連携に使用する */
  inputRef?: React.Ref<HTMLInputElement>;
  /** ルート要素へのref。外部からのフォーカス制御に使用する */
  ref?: React.Ref<HTMLElement>;
}

const CheckmarkIcon = () => (
  <svg
    width="10"
    height="8"
    viewBox="0 0 10 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M9.41406 1.41406L3.70703 7.12109L0 3.41406L1.41406 2L3.70703 4.29297L8 0L9.41406 1.41406Z"
      fill="currentColor"
    />
  </svg>
);

const IndeterminateIcon = () => (
  <svg
    width="8"
    height="2"
    viewBox="0 0 8 2"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <rect width="8" height="2" rx="1" fill="currentColor" />
  </svg>
);

/**
 * 項目の選択・解除を行うためのコンポーネントです。
 * 有効（チェックなし）、有効（チェックあり）、一部有効（中間状態）の3つの選択状態があります。
 *
 * 複数選択が可能です。複数の選択肢から1つを選択する場合は、RadioButtonを使用してください。
 *
 * @example
 * ```tsx
 * // 非制御
 * <Checkbox defaultChecked={false} />
 *
 * // 制御
 * <Checkbox checked={checked} onCheckedChange={(value) => setChecked(value)} />
 *
 * // 中間状態
 * <Checkbox indeterminate={true} />
 * ```
 */
export const Checkbox = ({
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  onCheckedChange,
  name,
  value,
  required,
  readOnly,
  id,
  inputRef,
  ref,
  ...rest
}: CheckboxProps) => {
  return (
    <BaseCheckbox.Root
      ref={ref}
      className={styles.checkbox}
      checked={checked}
      defaultChecked={defaultChecked}
      indeterminate={indeterminate}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
      name={name}
      value={value}
      required={required}
      readOnly={readOnly}
      id={id}
      inputRef={inputRef}
      {...rest}
    >
      <span className={styles.box}>
        <BaseCheckbox.Indicator className={styles.indicator} keepMounted>
          {indeterminate ? <IndeterminateIcon /> : <CheckmarkIcon />}
        </BaseCheckbox.Indicator>
      </span>
    </BaseCheckbox.Root>
  );
};
