import { IconButton } from '../../../button/icon-button';
import { Menu, MenuTrigger, MenuDropdown, LinkMenuItem } from '../../../menu';
import {
  HistoryIcon,
  PencilSquareIcon,
  MaximizeIcon,
  MinimizeIcon,
  MinusIcon,
} from '../../../../icons';
import { useFloatingAiChatContext } from '../shared';
import styles from './ai-chat-header.module.css';

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

export const AiChatHeader = ({
  title = 'AI Research β版',
  newSession = true,
  onNewChatClick,
  onToggleSizeClick,
  onMinimizeClick,
}: AiChatHeaderProps) => {
  const { size, histories } = useFloatingAiChatContext();

  const titleClassName = [
    styles.titleText,
    newSession ? styles.titleNewSession : styles.titleExistingSession,
  ].join(' ');

  return (
    <header className={styles.header}>
      <div className={styles.titleArea}>
        <span className={titleClassName}>{title}</span>
        <Menu>
          <MenuTrigger>
            <IconButton variant="ghost" size="medium" aria-label="履歴">
              <HistoryIcon size={20} />
            </IconButton>
          </MenuTrigger>
          <MenuDropdown side="bottom" align="end">
            {histories.map((h) => (
              <LinkMenuItem key={h.id} href={h.url}>
                {h.title}
              </LinkMenuItem>
            ))}
          </MenuDropdown>
        </Menu>
      </div>
      <div className={styles.actionArea}>
        <IconButton
          variant="ghost"
          size="medium"
          aria-label="新規チャット"
          onClick={onNewChatClick}
        >
          <PencilSquareIcon size={20} />
        </IconButton>
        <IconButton
          variant="ghost"
          size="medium"
          aria-label={size === 'collapsed' ? '最大化' : '最小化'}
          onClick={onToggleSizeClick}
        >
          {size === 'collapsed' ? (
            <MaximizeIcon size={20} />
          ) : (
            <MinimizeIcon size={20} />
          )}
        </IconButton>
        <IconButton
          variant="ghost"
          size="medium"
          aria-label="閉じる"
          onClick={onMinimizeClick}
        >
          <MinusIcon size={20} />
        </IconButton>
      </div>
    </header>
  );
};
