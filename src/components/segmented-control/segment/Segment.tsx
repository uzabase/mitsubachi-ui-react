import type { ReactNode } from 'react';
import { Toggle } from '@base-ui/react/toggle';
import { CheckIcon } from '../../../icons';
import styles from './segment.module.css';

export interface SegmentProps {
  /** セグメントの値（SegmentedControl の選択制御に使用） */
  value: string;
  /** セグメントの表示バリアント */
  variant: 'text' | 'icon';
  /** セグメントに表示するコンテンツ（テキストまたはアイコン） */
  children: ReactNode;
  /**
   * 無効化状態
   * @default false
   */
  disabled?: boolean;
  /**
   * アクセシブルラベル
   *
   * icon variant ではアイコンのみが表示されるため、
   * スクリーンリーダー向けのラベルとして必ず指定してください。
   */
  'aria-label'?: string;
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
export function Segment({
  value,
  variant,
  children,
  disabled = false,
  'aria-label': ariaLabel,
}: SegmentProps) {
  const segmentClassName = [
    styles.segment,
    variant === 'icon' ? styles.iconVariant : styles.textVariant,
  ].join(' ');

  return (
    <Toggle
      value={value}
      disabled={disabled}
      className={segmentClassName}
      aria-label={ariaLabel}
    >
      <span className={styles.checkIcon} aria-hidden="true">
        <CheckIcon />
      </span>
      <span className={styles.label}>{children}</span>
    </Toggle>
  );
}
