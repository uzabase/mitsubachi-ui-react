import { InputChip } from '../input-chip';
import styles from './input-chip-group.module.css';

export interface InputChipItem {
  /** 一意のID */
  id: string;
  /** ラベルテキスト */
  label: string;
}

export interface InputChipGroupProps {
  /** 表示するチップの配列 */
  items: InputChipItem[];
  /** チップ削除時のコールバック */
  onRemove: (id: string) => void;
  /** 無効化状態 */
  disabled?: boolean;
  /** アクセシビリティラベル（必須） */
  'aria-label': string;
}

/**
 * InputChipを横並び・折り返しでレイアウトするWrapperコンポーネントです。
 */
export const InputChipGroup = ({
  items,
  onRemove,
  disabled = false,
  'aria-label': ariaLabel,
}: InputChipGroupProps) => {
  return (
    <div className={styles.container} role="list" aria-label={ariaLabel}>
      {items.map((item) => (
        <div key={item.id} role="listitem" className={styles.item}>
          <InputChip
            label={item.label}
            onRemove={() => onRemove(item.id)}
            disabled={disabled}
          />
        </div>
      ))}
    </div>
  );
};
