import type { ReactNode } from 'react';
import { Toast } from '@base-ui/react';
import { SuccessIcon, CloseIcon } from '../../icons';
import { IconButton } from '../button/icon-button';
import styles from './snackbar.module.css';

/** Snackbarのサイズ */
export type SnackbarSize = 'small' | 'medium';

const SNACKBAR_SIZES = new Set<string>(['small', 'medium']);

function toSnackbarSize(value: unknown): SnackbarSize {
  return typeof value === 'string' && SNACKBAR_SIZES.has(value)
    ? (value as SnackbarSize)
    : 'small';
}

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
export function useSnackbar() {
  const manager = Toast.useToastManager();
  return {
    /** Snackbar を表示する */
    show: (description: string, options?: SnackbarShowOptions) => {
      return manager.add({
        description,
        data: { size: options?.size ?? 'small' },
      });
    },
    /** 指定IDの Snackbar を閉じる */
    close: manager.close,
  };
}

/* ==============================
   Snackbar.Provider
   ============================== */

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
function SnackbarProvider({
  children,
  timeout = 5000,
  limit = 5,
}: SnackbarProviderProps) {
  return (
    <Toast.Provider timeout={timeout} limit={limit}>
      {children}
    </Toast.Provider>
  );
}

/* ==============================
   Snackbar.Viewport
   ============================== */

/**
 * Snackbar の表示領域。
 * デスクトップでは画面右上、スマホでは画面下中央に配置される。
 */
function SnackbarViewport() {
  return (
    <Toast.Portal>
      <Toast.Viewport className={styles.viewport}>
        <SnackbarList />
      </Toast.Viewport>
    </Toast.Portal>
  );
}

/** Viewport内部で全Snackbarをレンダリングする */
function SnackbarList() {
  const { toasts } = Toast.useToastManager();
  return (
    <>
      {toasts.map((toast) => (
        <SnackbarRoot
          key={toast.id}
          toast={toast}
          size={toSnackbarSize(toast.data?.size)}
        />
      ))}
    </>
  );
}

/* ==============================
   SnackbarRoot（内部コンポーネント）
   ============================== */

interface SnackbarRootProps {
  /** Base UI Toast オブジェクト */
  toast: Toast.Root.ToastObject;
  /**
   * Snackbar のサイズ
   * @default 'small'
   */
  size?: SnackbarSize;
}

/**
 * 個別の Snackbar コンポーネント。
 * 成功ステータスのアイコン・テキスト・閉じるボタンを表示する。
 *
 * **成功フィードバック専用** — 失敗・警告には InlineNotification 等を使用すること。
 */
function SnackbarRoot({ toast, size = 'small' }: SnackbarRootProps) {
  const rootClassName = [styles.root, styles[size]].join(' ');

  return (
    <Toast.Root toast={toast} className={rootClassName}>
      <div className={styles.textArea}>
        <span className={styles.icon}>
          <SuccessIcon />
        </span>
        <Toast.Description className={styles.text} />
      </div>
      <Toast.Close
        render={
          <IconButton
            variant="ghost"
            size={size}
            aria-label="閉じる"
            tooltip={false}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </Toast.Root>
  );
}

/* ==============================
   エクスポート
   ============================== */

export const Snackbar = Object.assign(
  {},
  {
    Provider: SnackbarProvider,
    Viewport: SnackbarViewport,
  }
);
