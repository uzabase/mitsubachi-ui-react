import React from 'react';
import { IconButton } from '../../../../button/icon-button';
import { ArrowUpSmallIcon, StopFillIcon } from '../../../../../icons';
import { AiChatSegmentedControl } from '../ai-chat-segmented-control';
import type { AiChatSegmentValue } from '../ai-chat-segmented-control';
import styles from './ai-chat-area.module.css';

/** AiChatAreaの状態 */
export type AiChatAreaState = 'default' | 'in-progress' | 'disabled';

export interface AiChatAreaProps {
  /** プレースホルダーテキスト @default '質問を入力...' */
  placeholder?: string;
  /** 入力値（controlled） */
  value?: string;
  /** 入力値変更時のコールバック */
  onValueChange?: (value: string) => void;
  /** 送信時のコールバック */
  onSubmit?: () => void;
  /** 停止時のコールバック（in-progress状態で使用） */
  onStop?: () => void;
  /** コンポーネントの状態 @default 'default' */
  state?: AiChatAreaState;
  /** デフォルトのAiChatSegmentedControlの選択値（controlled）。childrenで上書き時は無視される */
  segmentValue?: AiChatSegmentValue;
  /** デフォルトのAiChatSegmentedControlの初期値（uncontrolled）。childrenで上書き時は無視される @default 'deep' */
  defaultSegmentValue?: AiChatSegmentValue;
  /** デフォルトのAiChatSegmentedControlの値変更時コールバック。childrenで上書き時は無視される */
  onSegmentValueChange?: (value: AiChatSegmentValue) => void;
  /** オプションスロットを上書きする場合に使用（デフォルトはAiChatSegmentedControl） */
  children?: React.ReactNode;
}

export const AiChatArea = ({
  placeholder = '質問を入力...',
  value,
  onValueChange,
  onSubmit,
  onStop,
  state = 'default',
  segmentValue,
  defaultSegmentValue,
  onSegmentValueChange,
  children,
}: AiChatAreaProps) => {
  const isDisabled = state === 'disabled';
  const isInProgress = state === 'in-progress';
  const isEmpty = !value || value.trim() === '';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      onSubmit?.();
    }
  };

  const containerClassName = [styles.container, isDisabled && styles.disabled]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClassName}>
      <div className={styles.inputField}>
        <textarea
          className={styles.textarea}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onValueChange?.(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          rows={1}
        />
      </div>
      <div className={styles.actionArea}>
        <div className={styles.optionSlot}>
          {children ?? (
            <AiChatSegmentedControl
              value={segmentValue}
              defaultValue={defaultSegmentValue}
              onValueChange={onSegmentValueChange}
              disabled={isDisabled}
            />
          )}
        </div>
        {isInProgress ? (
          <IconButton
            variant="primary"
            size="medium"
            aria-label="停止"
            onClick={onStop}
          >
            <StopFillIcon size={20} />
          </IconButton>
        ) : (
          <IconButton
            variant="primary"
            size="medium"
            aria-label="送信"
            onClick={onSubmit}
            disabled={isDisabled || isEmpty}
          >
            <ArrowUpSmallIcon size={20} />
          </IconButton>
        )}
      </div>
    </div>
  );
};
