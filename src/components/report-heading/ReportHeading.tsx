import styles from './report-heading.module.css';

export type ReportHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface ReportHeadingProps {
  /** 見出しテキスト */
  children: React.ReactNode;
  /** 見出しレベル（h1〜h6） @default 2 */
  level?: ReportHeadingLevel;
  /** アクションスロット（ボタンなどのコンポーネントを配置） */
  action?: React.ReactNode;
  /** ルートDOM要素への参照 */
  ref?: React.Ref<HTMLDivElement>;
}

const levelClassMap = {
  1: styles.level1,
  2: styles.level2,
  3: styles.level3,
  4: styles.level4,
  5: styles.level5,
  6: styles.level6,
} as const;

/**
 * レポートや記事などの読み物コンテンツにおいて、
 * 内容の区切りや構造を示すための見出しコンポーネント
 */
export const ReportHeading = ({
  children,
  level = 2,
  action,
  ref,
}: ReportHeadingProps) => {
  const HeadingTag = `h${level}` as const;

  const containerClassName = [styles.container, levelClassMap[level]].join(' ');

  return (
    <div ref={ref} className={containerClassName}>
      <div className={styles.textArea}>
        {level === 3 && <span className={styles.divider} aria-hidden="true" />}
        <HeadingTag className={styles.heading}>{children}</HeadingTag>
      </div>
      {action && <div className={styles.actionSlot}>{action}</div>}
    </div>
  );
};
