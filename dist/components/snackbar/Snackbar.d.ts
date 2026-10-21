import { ReactNode } from 'react';
/** Snackbarのサイズ */
export type SnackbarSize = 'small' | 'medium';
/** useSnackbar の show メソッドに渡すオプション */
export interface SnackbarShowOptions {
    /** @default 'small' */
    size?: SnackbarSize;
}
/**
 * Snackbar を表示・管理するためのhook。
 * Snackbar.Provider の内部で使用する。
 *
 * **用途: 成功フィードバック専用**
 * - Snackbar は成功時の短いフィードバックにのみ使用する
 * - 短時間で自動消去されるため、見逃してほしくない重要な情報には使わない
 * - 失敗・警告・エラーなどは InlineNotification 等の別コンポーネントで伝えること
 *
 * @example
 * ```tsx
 * const snackbar = useSnackbar();
 * snackbar.show('保存しました');
 * snackbar.show('完了しました', { size: 'medium' });
 * ```
 */
export declare function useSnackbar(): {
    /** Snackbar を表示する */
    show: (description: string, options?: SnackbarShowOptions) => string;
    /** 指定IDの Snackbar を閉じる */
    close: (toastId: string) => void;
};
export interface SnackbarProviderProps {
    children: ReactNode;
    /**
     * 自動消去までの時間（ミリ秒）
     * @default 5000
     */
    timeout?: number;
    /**
     * 同時に表示できるSnackbarの最大数。
     * 上限を超えると古いものから自動的に削除される。
     * @default 5
     */
    limit?: number;
}
/**
 * Snackbar のコンテキストを提供するプロバイダー。
 * アプリのルート付近に配置する。
 */
declare function SnackbarProvider({ children, timeout, limit, }: SnackbarProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * Snackbar の表示領域。
 * デスクトップでは画面右上、スマホでは画面下中央に配置される。
 */
declare function SnackbarViewport(): import("react/jsx-runtime").JSX.Element;
export declare const Snackbar: {
    Provider: typeof SnackbarProvider;
    Viewport: typeof SnackbarViewport;
};
export {};
//# sourceMappingURL=Snackbar.d.ts.map