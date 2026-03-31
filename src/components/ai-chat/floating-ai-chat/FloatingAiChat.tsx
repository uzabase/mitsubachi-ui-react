import React from 'react';
import type { FloatingAiChatSize, AiChatHistoryItem } from './shared';
import { FloatingAiChatProvider } from './shared';
import { AiChatHeader } from './ai-chat-header';
import { AiChatFooter } from './ai-chat-footer';
import styles from './floating-ai-chat.module.css';

interface FloatingAiChatBodyProps {
  children: React.ReactNode;
}

const FloatingAiChatBody = ({ children }: FloatingAiChatBodyProps) => {
  return <div className={styles.body}>{children}</div>;
};

export interface FloatingAiChatProps {
  /** チャットウィンドウのサイズ @default 'collapsed' */
  size?: FloatingAiChatSize;
  /** 履歴メニューに表示するアイテム一覧 @default [] */
  histories?: AiChatHistoryItem[];
  children: React.ReactNode;
}

function FloatingAiChatRoot({
  size = 'collapsed',
  histories = [],
  children,
}: FloatingAiChatProps) {
  const containerClassName = [styles.container, styles[size]].join(' ');
  const contextValue = React.useMemo(
    () => ({ size, histories }),
    [size, histories]
  );

  return (
    <FloatingAiChatProvider value={contextValue}>
      <div className={containerClassName}>{children}</div>
    </FloatingAiChatProvider>
  );
}

export const FloatingAiChat = Object.assign(FloatingAiChatRoot, {
  Header: AiChatHeader,
  Body: FloatingAiChatBody,
  Footer: AiChatFooter,
});
