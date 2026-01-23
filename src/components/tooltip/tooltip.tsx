import React from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react';
import styles from './tooltip.module.css';

/** ツールチップの表示方向 */
export type TooltipSide = 'top' | 'bottom' | 'start' | 'end';

/** ツールチップの配置調整*/
export type TooltipAlign = 'start' | 'center' | 'end';

/** ユーザー向けの side を Base UI の side にマッピング */
const mapSide = (
  side: TooltipSide
): 'top' | 'bottom' | 'inline-start' | 'inline-end' => {
  switch (side) {
    case 'start':
      return 'inline-start';
    case 'end':
      return 'inline-end';
    default:
      return side;
  }
};

export interface TooltipProps {
  /**
   * ツールチップに表示するテキスト
   * @default 'ここにヒントを表示'
   */
  content?: string;
  /** ツールチップのトリガーとなる要素（単一のReact要素） */
  children: React.ReactElement;
  /**
   * ツールチップの表示方向（論理的プロパティ）
   * @default 'top'
   */
  side?: TooltipSide;
  /**
   * ツールチップの配置調整
   * @default 'center'
   */
  align?: TooltipAlign;
  /** トリガーからの距離（px） */
  sideOffset?: number;
  /** ホバーから表示までの遅延時間（ms） */
  delay?: number;
  /** ホバー解除から非表示までの遅延時間（ms） */
  closeDelay?: number;
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
  content = 'ここにヒントを表示',
  children,
  side = 'top',
  align = 'center',
  sideOffset = 4,
  delay = 200,
  closeDelay = 0,
}: TooltipProps) => {
  const mappedSide = mapSide(side);

  return (
    <BaseTooltip.Provider delay={delay} closeDelay={closeDelay}>
      <BaseTooltip.Root>
        <BaseTooltip.Trigger render={children} />
        <BaseTooltip.Portal>
          <BaseTooltip.Positioner
            side={mappedSide}
            align={align}
            sideOffset={sideOffset}
            className={styles.positioner}
          >
            <BaseTooltip.Popup className={styles.popup}>
              {content}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  );
};
