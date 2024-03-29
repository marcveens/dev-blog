import type { Meta, StoryObj } from '@storybook/react';
import { OpenSourceBlock } from './open-source-block';

const meta = {
  title: 'Components/OpenSourceBlock',
  component: OpenSourceBlock,
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-96">
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof OpenSourceBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'homebridge-website-change-check',
    downloads: 128,
    stars: 16,
    version: '1.0.0',
    link: 'https://www.npmjs.com/package/homebridge-website-change-check'
  }
};
