import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { TextField } from './TextField';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: TextField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    label: 'Label',
  },
} satisfies Meta<typeof TextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <TextField {...args} />
        <TextField {...args} defaultValue={'Default Value'} />
      </>
    );
  },
};

export const HelperText: Story = {
  args: {
    helperText: 'Helper Label',
  },
  render: (args) => {
    return (
      <>
        <TextField {...args} />
        <TextField {...args} defaultValue={'Default Value'} />
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
        <TextField {...args} />
        <TextField {...args} defaultValue={'Default Value'} />
      </>
    );
  },
};
