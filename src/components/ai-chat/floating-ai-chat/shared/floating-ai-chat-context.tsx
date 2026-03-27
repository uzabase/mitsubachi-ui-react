import React from 'react';

/** FloatingAiChatのサイズ */
export type FloatingAiChatSize = 'collapsed' | 'expanded';

export interface FloatingAiChatContextValue {
  size: FloatingAiChatSize;
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
