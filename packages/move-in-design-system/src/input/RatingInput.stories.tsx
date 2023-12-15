import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { RatingInput } from './RatingInput';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: RatingInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          width: '320px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RatingInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <RatingInput {...args} />
        <RatingInput {...args} defaultValue={4.5} />
      </>
    );
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
  render: (args) => {
    return (
      <>
        <RatingInput {...args} />
        <RatingInput {...args} defaultValue={4.5} />
      </>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    return (
      <>
        <RatingInput {...args} />
        <RatingInput {...args} defaultValue={4.5} />
      </>
    );
  },
};
