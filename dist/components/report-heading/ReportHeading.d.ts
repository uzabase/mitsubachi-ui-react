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
/**
 * レポートや記事などの読み物コンテンツにおいて、
 * 内容の区切りや構造を示すための見出しコンポーネント
 */
export declare const ReportHeading: ({ children, level, action, ref, }: ReportHeadingProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ReportHeading.d.ts.map