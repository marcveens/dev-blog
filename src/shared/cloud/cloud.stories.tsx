import type { Meta, StoryObj } from '@storybook/react';
import { Cloud } from './cloud';

const meta = {
  title: 'Components/Cloud',
  component: Cloud,
  parameters: {}
} satisfies Meta<typeof Cloud>;

export default meta;
type Story = StoryObj<typeof Cloud>;

export const Default: Story = {
  args: {}
};
