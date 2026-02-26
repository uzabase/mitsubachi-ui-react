import { CloseIcon } from '../../../icons';
import { IconButton } from '../../icon-button';
import type { ChipViewport } from '../chip';
import { Chip } from '../chip';
import styles from './input-chip.module.css';

export interface InputChipProps {
  /** 表示するラベルテキスト */
  label: string;
  /** ビューポート */
  viewport?: ChipViewport;
  /** 削除ボタンクリック時のコールバック */
  onRemove: () => void;
  /** 無効化状態 */
  disabled?: boolean;
}

/**
 * ユーザーが入力した内容を要素ごとに整理して表示するためのChipコンポーネントです。
 * Chipの削除操作（×ボタン）で、ユーザーが入力内容を簡単に削除することができます。
 */
export const InputChip = ({
  label,
  viewport = 'desktop',
  onRemove,
  disabled = false,
}: InputChipProps) => {
  const chipClassName = [
    styles.inputChip,
    viewport === 'phone' ? styles.phone : styles.desktop,
    disabled && styles.disabled,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Chip
      label={label}
      viewport={viewport}
      disabled={disabled}
      className={chipClassName}
      endContent={
        <IconButton
          variant="ghost"
          size="small"
          aria-label={`${label}を削除`}
          tooltip={false}
          onClick={onRemove}
          disabled={disabled}
        >
          <CloseIcon />
        </IconButton>
      }
    />
  );
};
