import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import { Alien, ArrowRight, Play } from '@phosphor-icons/react';

const meta = {
  title: 'Components/Button',
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
        ArrowRight: <ArrowRight size={22} weight="light" />,
        Play: <Play size={22} weight="light" />,
        Alien: <Alien size={22} weight="light" />
      }
    },
    endIcon: {
      options: ['none', 'ArrowRight', 'Play', 'Alien'],
      mapping: {
        none: [],
        ArrowRight: <ArrowRight size={22} weight="light" />,
        Play: <Play size={22} weight="light" />,
        Alien: <Alien size={22} weight="light" />
      }
    }
  }
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Button'
  }
};

export const StartIcon: Story = {
  args: {
    children: 'Button',
    startIcon: <Play size={22} weight="light" />
  }
};

export const EndIcon: Story = {
  args: {
    children: 'Button',
    endIcon: <ArrowRight size={22} weight="light" />
  }
};
