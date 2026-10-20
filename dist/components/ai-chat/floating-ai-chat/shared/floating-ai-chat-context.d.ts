import { default as React } from 'react';
/** FloatingAiChatのサイズ */
export type FloatingAiChatSize = 'collapsed' | 'expanded';
/** 履歴アイテム */
export interface AiChatHistoryItem {
    /** 一意な識別子 */
    id: string;
    /** 履歴のタイトル */
    title: string;
    /** 履歴のリンク先URL */
    url: string;
}
export interface FloatingAiChatContextValue {
    size: FloatingAiChatSize;
    /** 履歴メニューに表示するアイテム一覧 */
    histories: AiChatHistoryItem[];
}
export declare const FloatingAiChatProvider: React.Context<FloatingAiChatContextValue | null>;
export declare function useFloatingAiChatContext(): FloatingAiChatContextValue;
//# sourceMappingURL=floating-ai-chat-context.d.ts.map