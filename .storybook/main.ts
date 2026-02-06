import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    './*.mdx',
    '../src/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    'storybook-addon-pseudo-states',
  ],
  framework: '@storybook/react-vite',
  viteFinal: async (config) => {
    config.base = process.env.REPOSITORY_NAME
      ? `/${process.env.REPOSITORY_NAME}/`
      : '/';
    return config;
  },
};
export default config;
