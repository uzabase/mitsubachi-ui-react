import { default as React } from 'react';
export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** 表示するラベルテキスト */
    label: string;
    /** レンダリングする要素タイプ */
    as?: 'span' | 'button';
    /** 選択状態 */
    selected?: boolean;
    /** 無効化状態 */
    disabled?: boolean;
    /** ラベルの先頭に配置するコンテンツ（例: チェックアイコン） */
    startContent?: React.ReactNode;
    /** ラベルの末尾に配置するコンテンツ（例: 閉じるボタン） */
    endContent?: React.ReactNode;
    /** カスタムクラス名（内部コンポジション用） */
    className?: string;
    /** ラベル要素に追加するクラス名（内部コンポジション用） */
    labelClassName?: string;
}
/**
 * 内部専用ベースChipコンポーネント
 *
 * ピル形状・ラベル表示・スロットベースのcompositionを提供する。
 * InputChipやFilterChipの基盤として使用し、外部にはエクスポートしない。
 */
export declare const Chip: React.ForwardRefExoticComponent<ChipProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=Chip.d.ts.map