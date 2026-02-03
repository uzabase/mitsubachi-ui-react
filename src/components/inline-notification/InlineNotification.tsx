import React from 'react';
import styles from './inline-notification.module.css';
import {
  InformationIcon,
  SuccessIcon,
  WarningIcon,
  ErrorIcon,
} from '../../icons';

/** Inline Notificationのステータス */
export type InlineNotificationStatus =
  | 'information'
  | 'success'
  | 'warning'
  | 'error';

/** Inline Notificationのバリアント */
export type InlineNotificationVariant = 'primary' | 'secondary';

export interface InlineNotificationProps {
  /** 通知メッセージのテキスト */
  text: string;
  /** 通知のステータス（色・アイコンの種類） */
  status: InlineNotificationStatus;
  /** 通知のバリアント（表示スタイル） */
  variant: InlineNotificationVariant;
  /** 追加のCSSクラス名 */
  className?: string;
}

/** ステータスごとのデフォルトアイコン */
const defaultIcons: Record<InlineNotificationStatus, React.ReactNode> = {
  information: <InformationIcon />,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
};

/**
 * ユーザーの操作に対して即座に理解すべきエラーや時間的制約のある情報を、
 * 画面の文脈の中で提示するためのコンポーネントです。
 * Overlay ではなく、UI の一部として自然に表示されるため、
 * ユーザーは操作を継続しながらメッセージを読み取ることができます。
 *
 */
export const InlineNotification = (props: InlineNotificationProps) => {
  const { text, status, variant, className } = props;

  const displayIcon = defaultIcons[status];

  const containerClassName = [
    styles.container,
    styles[status],
    styles[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      className={containerClassName}
      aria-live={status === 'error' ? 'assertive' : 'polite'}
    >
      <span className={styles.icon}>{displayIcon}</span>
      <span className={styles.text}>{text}</span>
    </div>
  );
};
