import { expect } from 'vitest';
import '@testing-library/react';

// Shadow DOM 内の要素を検証するカスタムマッチャー
expect.extend({
  toHaveShadowText(element: Element, expectedText: string) {
    const shadowRoot = element.shadowRoot;
    if (!shadowRoot) {
      return {
        pass: false,
        message: () => `Expected element to have shadowRoot`,
      };
    }
    const text = shadowRoot.textContent || '';
    const pass = text.includes(expectedText);
    return {
      pass,
      message: () =>
        pass
          ? `Expected shadow DOM not to contain "${expectedText}"`
          : `Expected shadow DOM to contain "${expectedText}", but got "${text}"`,
    };
  },
});

// カスタムマッチャーの型定義
declare module 'vitest' {
  interface Assertion<T> {
    toHaveShadowText(expectedText: string): T;
  }
  interface AsymmetricMatchersContaining {
    toHaveShadowText(expectedText: string): unknown;
  }
}
