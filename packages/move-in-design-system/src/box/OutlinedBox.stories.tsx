import type { Meta, StoryObj } from '@storybook/react';
import { OutlinedBox } from './OutlinedBox';
import React from 'react';

const meta = {
  component: OutlinedBox,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof OutlinedBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <OutlinedBox {...args} />
      </>
    );
  },
};
