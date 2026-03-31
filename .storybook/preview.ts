import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },

    options: {
      storySort: {
        method: 'alphabetical',
        order: [
          'Docs',
          [
            'はじめに',
            'デザイントークン',
            'コントリビューション',
            'Claude Code の使い方',
          ],
          'Components',
        ],
        locales: 'en-US',
      },
    },
  },
};

export default preview;
