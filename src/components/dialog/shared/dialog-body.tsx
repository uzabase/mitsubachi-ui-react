import React, { useEffect, useRef, useState } from 'react';
import styles from './dialog.module.css';

export interface DialogBodyProps {
  children?: React.ReactNode;
}

/**
 * Dialog の本文エリア。Slot として任意のコンテンツを受け取る。
 * スクロール位置に応じて、HeaderとFooterに動的に仕切り線を表示する。
 * - 上部が隠れている（スクロールダウンしている）: Headerの下に仕切り線
 * - 下部が隠れている（まだスクロールできる）: Footerの上に仕切り線
 */
export function DialogBody({ children }: DialogBodyProps) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [isScrolledFromTop, setIsScrolledFromTop] = useState(false);
  const [isScrolledFromBottom, setIsScrolledFromBottom] = useState(false);

  useEffect(() => {
    const element = bodyRef.current;
    if (!element) return;

    const checkScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = element;

      // 上部が隠れているか（スクロールダウンしている）
      setIsScrolledFromTop(scrollTop > 0);

      // 下部が隠れているか（まだスクロールできる余地がある）
      // 1px の誤差を許容
      setIsScrolledFromBottom(scrollTop + clientHeight < scrollHeight - 1);
    };

    // 初回チェック
    checkScroll();

    // スクロールイベントを監視
    element.addEventListener('scroll', checkScroll);

    // ResizeObserver でリサイズ時にもチェック
    const resizeObserver = new ResizeObserver(checkScroll);
    resizeObserver.observe(element);

    return () => {
      element.removeEventListener('scroll', checkScroll);
      resizeObserver.disconnect();
    };
  }, [children]);

  return (
    <div
      ref={bodyRef}
      className={styles.body}
      data-scrolled-from-top={isScrolledFromTop ? 'true' : 'false'}
      data-scrolled-from-bottom={isScrolledFromBottom ? 'true' : 'false'}
    >
      {children}
    </div>
  );
}
