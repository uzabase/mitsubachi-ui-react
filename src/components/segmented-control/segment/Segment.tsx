import type { ReactNode } from 'react';
import { Toggle } from '@base-ui/react/toggle';
import { CheckIcon } from '../../../icons';
import styles from './segment.module.css';

export interface SegmentProps {
  /** セグメントの値（SegmentedControl の選択制御に使用） */
  value: string;
  /** セグメントに表示するテキスト */
  children: ReactNode;
  /**
   * 無効化状態
   * @default false
   */
  disabled?: boolean;
}

/**
 * Segment
 *
 * SegmentedControl 内の個別セグメント。
 * SegmentedControl の直接の子として配置して使用する。
 *
 * Base UI の Toggle をベースに実装。
 * @see https://base-ui.com/react/components/toggle-group
 */
export function Segment({ value, children, disabled = false }: SegmentProps) {
  return (
    <Toggle value={value} disabled={disabled} className={styles.segment}>
      <span className={styles.checkIcon} aria-hidden="true">
        <CheckIcon />
      </span>
      <span className={styles.label}>{children}</span>
    </Toggle>
  );
}
