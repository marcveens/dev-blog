import type { Meta, StoryObj } from "@storybook/react";
import { PostPreviewBlock } from "./post-preview-block";

const meta = {
  title: "Components/PostPreviewBlock",
  component: PostPreviewBlock,
  decorators: [
    (Story: React.ComponentType) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PostPreviewBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Developing Azure DevOps extensions: Good Practices",
    description:
      "I've spent a good amount of months developing an Azure DevOps extension for a customer, and I'd like to share my learnings so you can have an easy start.",
    slug: "the-slug",
    date: new Date(2024, 3, 12),
  },
};
