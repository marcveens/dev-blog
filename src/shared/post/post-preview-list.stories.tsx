import type { Meta, StoryObj } from '@storybook/react';
import { PostPreviewList } from './post-preview-list';

const meta = {
  title: 'Components/PostPreviewList',
  component: PostPreviewList,
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-96">
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof PostPreviewList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Developing Azure DevOps extensions: Good Practices',
    description:
      "I've spent a good amount of months developing an Azure DevOps extension for a customer, and I'd like to share my learnings so you can have an easy start.",
    slug: 'the-slug',
    date: '2024-03-12',
    category: 'The category'
  }
};
