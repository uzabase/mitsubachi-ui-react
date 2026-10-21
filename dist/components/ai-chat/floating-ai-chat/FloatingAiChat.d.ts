import { default as React } from 'react';
import { FloatingAiChatSize, AiChatHistoryItem } from './shared';
interface FloatingAiChatBodyProps {
    children: React.ReactNode;
}
export interface FloatingAiChatProps {
    /** チャットウィンドウのサイズ @default 'collapsed' */
    size?: FloatingAiChatSize;
    /** 履歴メニューに表示するアイテム一覧 @default [] */
    histories?: AiChatHistoryItem[];
    children: React.ReactNode;
}
declare function FloatingAiChatRoot({ size, histories, children, }: FloatingAiChatProps): import("react/jsx-runtime").JSX.Element;
export declare const FloatingAiChat: typeof FloatingAiChatRoot & {
    Header: ({ title, newSession, onNewChatClick, onToggleSizeClick, onMinimizeClick, }: import('./ai-chat-header').AiChatHeaderProps) => import("react/jsx-runtime").JSX.Element;
    Body: ({ children }: FloatingAiChatBodyProps) => import("react/jsx-runtime").JSX.Element;
    Footer: ({ disclaimer, children, }: import('./ai-chat-footer').AiChatFooterProps) => import("react/jsx-runtime").JSX.Element;
};
export {};
//# sourceMappingURL=FloatingAiChat.d.ts.map