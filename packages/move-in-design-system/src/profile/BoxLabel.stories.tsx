import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { BoxLabel } from './BoxLabel';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: BoxLabel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    children: '박스 라벨',
  },
} satisfies Meta<typeof BoxLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <BoxLabel {...args} />;
  },
};
