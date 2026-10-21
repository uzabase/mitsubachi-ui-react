export interface AiChatHeaderProps {
    /** 表示タイトル @default 'AI Research β版' */
    title?: string;
    /** 新規セッションかどうか @default true */
    newSession?: boolean;
    /** 新規チャットボタンクリック時のコールバック */
    onNewChatClick?: () => void;
    /** サイズ切り替えボタンクリック時のコールバック */
    onToggleSizeClick?: () => void;
    /** 最小化ボタンクリック時のコールバック */
    onMinimizeClick?: () => void;
}
export declare const AiChatHeader: ({ title, newSession, onNewChatClick, onToggleSizeClick, onMinimizeClick, }: AiChatHeaderProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=AiChatHeader.d.ts.map