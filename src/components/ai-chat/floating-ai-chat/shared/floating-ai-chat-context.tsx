import React from 'react';

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

const FloatingAiChatContext =
  React.createContext<FloatingAiChatContextValue | null>(null);

export const FloatingAiChatProvider = FloatingAiChatContext;

export function useFloatingAiChatContext(): FloatingAiChatContextValue {
  const ctx = React.useContext(FloatingAiChatContext);
  if (!ctx) {
    throw new Error(
      'FloatingAiChat サブコンポーネントは FloatingAiChat 内で使用してください'
    );
  }
  return ctx;
}
