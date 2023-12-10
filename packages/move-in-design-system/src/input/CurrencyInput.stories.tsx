import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { CurrencyInput } from './CurrencyInput';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: CurrencyInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    minLength: 4,
    maxLength: 8,
  },
} satisfies Meta<typeof CurrencyInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <CurrencyInput {...args} id="currency1" />
        <CurrencyInput {...args} id="currency2" defaultValue={1000000} />
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
        <CurrencyInput {...args} id="currency3" />
        <CurrencyInput {...args} id="currency4" defaultValue={1000} />
      </>
    );
  },
};
