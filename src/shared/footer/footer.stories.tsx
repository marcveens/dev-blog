import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './footer';

const meta = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen'
  }
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {}
};
