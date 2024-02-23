import type { Meta, StoryObj } from '@storybook/react';

import { LinkButton } from './LinkButton';
import { Alien, ArrowRight, Play } from '@phosphor-icons/react';

const meta = {
  title: 'Components/Buttons/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    startIcon: {
      options: ['none', 'ArrowRight', 'Play', 'Alien'],
      mapping: {
        none: [],
        ArrowRight: <ArrowRight />,
        Play: <Play />,
        Alien: <Alien />
      }
    },
    endIcon: {
      options: ['none', 'ArrowRight', 'Play', 'Alien'],
      mapping: {
        none: [],
        ArrowRight: <ArrowRight />,
        Play: <Play />,
        Alien: <Alien />
      }
    }
  }
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'LinkButton'
  }
};

export const StartIcon: Story = {
  args: {
    children: 'Button',
    startIcon: <Play />
  }
};

export const EndIcon: Story = {
  args: {
    children: 'Button',
    endIcon: <ArrowRight />
  }
};
