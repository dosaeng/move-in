import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { AgentScoreBar } from './AgentScoreBar';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: AgentScoreBar,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    reviewCount: 100,
    reviewScore: 4.5,
  },
} satisfies Meta<typeof AgentScoreBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <AgentScoreBar {...args} />;
  },
};
