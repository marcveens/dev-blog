import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  stories: ['../src/shared/**/*.mdx', '../src/stories/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-onboarding', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  staticDirs: ['../public'],
  webpackFinal(config, options) {
    const fileLoaderRule = config?.module?.rules?.find((rule) => {
      if (rule && typeof rule === 'object' && 'test' in rule) {
        // @ts-ignore
        return rule.test && rule.test.test('.svg');
      }

      return false;
    });
    if (fileLoaderRule && typeof fileLoaderRule === 'object') {
      fileLoaderRule.exclude = /\.svg$/;
    }

    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  }
};
export default config;
