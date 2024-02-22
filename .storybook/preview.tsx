import React from 'react';
import type { Preview } from '@storybook/react';
import { Providers } from '../src/shared/Layout/providers';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../tailwind.config.js';
import '../src/styles/globals.css';

export const fullConfig = resolveConfig(tailwindConfig) as any;

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: fullConfig.theme.colors.background
        }
      ]
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <Providers>
        <Story />
      </Providers>
    )
  ]
};

export default preview;
