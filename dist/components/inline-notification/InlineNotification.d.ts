import { default as React } from 'react';
/** Inline Notificationのステータス */
export type InlineNotificationStatus = 'information' | 'success' | 'warning' | 'error';
/** Inline Notificationのバリアント */
export type InlineNotificationVariant = 'primary' | 'secondary';
export interface InlineNotificationProps {
    /** 通知のステータス（色・アイコンの種類） */
    status: InlineNotificationStatus;
    /** 通知のバリアント（表示スタイル） */
    variant: InlineNotificationVariant;
    /** 通知メッセージのコンテンツ（テキスト、太字、リンク、改行などを含む） */
    children: React.ReactNode;
}
/**
 * ユーザーの操作に対して即座に理解すべきエラーや時間的制約のある情報を、
 * 画面の文脈の中で提示するためのコンポーネントです。
 * Overlay ではなく、UI の一部として自然に表示されるため、
 * ユーザーは操作を継続しながらメッセージを読み取ることができます。
 *
 * **用途: 失敗・警告・エラーなど、見逃してほしくない重要な情報の通知**
 * - UIの一部として常に表示されるため、ユーザーが見逃すことがない
 * - 成功時の短いフィードバックには Snackbar を使用すること
 */
export declare const InlineNotification: (props: InlineNotificationProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=InlineNotification.d.ts.map