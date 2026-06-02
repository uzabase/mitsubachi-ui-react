/**
 * Shadow DOM テストユーティリティ
 *
 * Web Components の Shadow DOM 内の要素を操作・検証するためのヘルパー関数群
 */
/**
 * Shadow DOM 内の要素を取得
 * @param host - Shadow Root を持つホスト要素
 * @param selector - CSS セレクター
 * @returns 見つかった要素、または null
 */
export declare function queryShadow<T extends Element>(host: Element, selector: string): T | null;
/**
 * Shadow DOM 内の全要素を取得
 * @param host - Shadow Root を持つホスト要素
 * @param selector - CSS セレクター
 * @returns 見つかった要素の配列
 */
export declare function queryShadowAll<T extends Element>(host: Element, selector: string): T[];
/**
 * 属性の変更を待機
 * @param element - 監視対象の要素
 * @param attributeName - 監視する属性名
 * @param expectedValue - 期待する属性値
 * @param timeout - タイムアウト時間（ミリ秒）
 * @returns Promise
 */
export declare function waitForAttribute(element: Element, attributeName: string, expectedValue: string, timeout?: number): Promise<void>;
/**
 * Shadow DOM 内のテキストコンテンツを取得
 * @param host - Shadow Root を持つホスト要素
 * @returns Shadow DOM 内のテキストコンテンツ
 */
export declare function getShadowTextContent(host: Element): string;
/**
 * Shadow DOM 内の要素が存在するまで待機
 * @param host - Shadow Root を持つホスト要素
 * @param selector - CSS セレクター
 * @param timeout - タイムアウト時間（ミリ秒）
 * @returns 見つかった要素
 */
export declare function waitForShadowElement<T extends Element>(host: Element, selector: string, timeout?: number): Promise<T>;
//# sourceMappingURL=shadow-dom.d.ts.map