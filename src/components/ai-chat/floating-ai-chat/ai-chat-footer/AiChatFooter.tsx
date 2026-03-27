import React from 'react';
import styles from './ai-chat-footer.module.css';

const DEFAULT_DISCLAIMER =
  '生成AIは不正確な情報を生成する可能性があります。分析・意思決定の際は、必ず情報源をご確認ください。\n本機能はβ版です。今後開発・改善に伴い、仕様の変更や利用上の制限を設ける場合があります。';

export interface AiChatFooterProps {
  /** 免責文テキスト */
  disclaimer?: string;
  /** AiChatArea等のコンテンツ */
  children?: React.ReactNode;
}

export const AiChatFooter = ({
  disclaimer = DEFAULT_DISCLAIMER,
  children,
}: AiChatFooterProps) => {
  return (
    <footer className={styles.footer}>
      {children}
      {disclaimer && <p className={styles.disclaimer}>{disclaimer}</p>}
    </footer>
  );
};
