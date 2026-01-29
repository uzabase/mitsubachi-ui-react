import React from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react';
import styles from './tooltip.module.css';

/** ツールチップの表示方向 */
export type TooltipSide = 'top' | 'bottom' | 'inline-start' | 'inline-end';

/** ツールチップの配置調整 */
export type TooltipAlign = 'start' | 'center' | 'end';

export interface TooltipProps {
  /**
   * ツールチップに表示するラベルテキスト
   * @default 'ここにヒントを表示'
   */
  label?: string;
  /** ツールチップのトリガーとなる要素（単一のReact要素） */
  children: React.ReactElement;
  /**
   * ツールチップの表示方向
   * @default 'top'
   */
  side?: TooltipSide;
  /**
   * ツールチップの配置調整
   * @default 'center'
   */
  align?: TooltipAlign;
}

/**
 * Tooltipコンポーネント
 *
 * 要素にホバーまたはフォーカスした際に追加情報を表示するコンポーネント。
 * Base UIのTooltipをベースに、アクセシビリティを考慮した実装となっています。
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
 */
export const Tooltip = ({
  label = 'ここにヒントを表示',
  children,
  side = 'top',
  align = 'center',
}: TooltipProps) => {
  // 固定値: sideOffset 8px, delay 200ms, closeDelay 0ms
  const SIDE_OFFSET = 8;
  const DELAY = 200;
  const CLOSE_DELAY = 0;

  return (
    <BaseTooltip.Provider delay={DELAY} closeDelay={CLOSE_DELAY}>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger render={children} />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner
            side={side}
            align={align}
            sideOffset={SIDE_OFFSET}
            className={styles.positioner}
          >
            <BaseTooltip.Popup className={styles.popup}>
              {label}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
};
