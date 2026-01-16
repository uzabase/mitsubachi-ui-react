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
export function queryShadow<T extends Element>(
  host: Element,
  selector: string
): T | null {
  return host.shadowRoot?.querySelector<T>(selector) ?? null;
}

/**
 * Shadow DOM 内の全要素を取得
 * @param host - Shadow Root を持つホスト要素
 * @param selector - CSS セレクター
 * @returns 見つかった要素の配列
 */
export function queryShadowAll<T extends Element>(
  host: Element,
  selector: string
): T[] {
  return Array.from(host.shadowRoot?.querySelectorAll<T>(selector) ?? []);
}

/**
 * 属性の変更を待機
 * @param element - 監視対象の要素
 * @param attributeName - 監視する属性名
 * @param expectedValue - 期待する属性値
 * @param timeout - タイムアウト時間（ミリ秒）
 * @returns Promise
 */
export function waitForAttribute(
  element: Element,
  attributeName: string,
  expectedValue: string,
  timeout = 1000
): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      observer.disconnect();
      reject(
        new Error(
          `Timeout waiting for attribute "${attributeName}" to be "${expectedValue}"`
        )
      );
    }, timeout);

    const observer = new MutationObserver(() => {
      if (element.getAttribute(attributeName) === expectedValue) {
        clearTimeout(timeoutId);
        observer.disconnect();
        resolve();
      }
    });

    observer.observe(element, { attributes: true });

    // 既に期待値になっている場合
    if (element.getAttribute(attributeName) === expectedValue) {
      clearTimeout(timeoutId);
      observer.disconnect();
      resolve();
    }
  });
}

/**
 * Shadow DOM 内のテキストコンテンツを取得
 * @param host - Shadow Root を持つホスト要素
 * @returns Shadow DOM 内のテキストコンテンツ
 */
export function getShadowTextContent(host: Element): string {
  return host.shadowRoot?.textContent ?? '';
}

/**
 * Shadow DOM 内の要素が存在するまで待機
 * @param host - Shadow Root を持つホスト要素
 * @param selector - CSS セレクター
 * @param timeout - タイムアウト時間（ミリ秒）
 * @returns 見つかった要素
 */
export function waitForShadowElement<T extends Element>(
  host: Element,
  selector: string,
  timeout = 1000
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      observer.disconnect();
      reject(
        new Error(`Timeout waiting for element "${selector}" in shadow DOM`)
      );
    }, timeout);

    // 既に存在する場合
    const existing = queryShadow<T>(host, selector);
    if (existing) {
      clearTimeout(timeoutId);
      resolve(existing);
      return;
    }

    const observer = new MutationObserver(() => {
      const element = queryShadow<T>(host, selector);
      if (element) {
        clearTimeout(timeoutId);
        observer.disconnect();
        resolve(element);
      }
    });

    if (host.shadowRoot) {
      observer.observe(host.shadowRoot, {
        childList: true,
        subtree: true,
      });
    } else {
      clearTimeout(timeoutId);
      reject(new Error('Element does not have a shadowRoot'));
    }
  });
}
