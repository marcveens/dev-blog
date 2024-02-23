import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { Alien, ArrowRight, Play } from '@phosphor-icons/react';

const meta = {
  title: 'Components/Buttons/Button',
  component: Button,
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Contained: Story = {
  args: {
    children: 'Button',
    variant: 'contained'
  }
};

export const Outlined: Story = {
  args: {
    children: 'Button',
    variant: 'outlined'
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
