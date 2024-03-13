import type { Meta, StoryObj } from '@storybook/react';

import { IconButton } from './icon-button';
import { Alien, ArrowRight, Play } from '@phosphor-icons/react';

const meta = {
  title: 'Components/Buttons/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      options: ['none', 'ArrowRight', 'Play', 'Alien'],
      mapping: {
        none: [],
        ArrowRight: <ArrowRight />,
        Play: <Play />,
        Alien: <Alien />
      }
    }
  }
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    icon: <Play />
  }
};

export const Simple: Story = {
  args: {
    variant: 'icon',
    icon: <Play />
  }
};
