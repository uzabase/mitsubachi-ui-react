import { default as React } from 'react';
export interface DialogBodyProps {
    children: React.ReactNode;
}
/**
 * Dialog の本文エリア。Slot として任意のコンテンツを受け取る。
 * スクロール位置に応じて、HeaderとFooterに動的に仕切り線を表示する。
 * - 上部が隠れている（スクロールダウンしている）: Headerの下に仕切り線
 * - 下部が隠れている（まだスクロールできる）: Footerの上に仕切り線
 */
export declare function DialogBody({ children }: DialogBodyProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=dialog-body.d.ts.map