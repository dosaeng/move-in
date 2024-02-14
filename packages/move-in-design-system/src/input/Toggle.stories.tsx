import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { Toggle } from './Toggle';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Toggle,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Toggle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Toggle {...args} id="check1" />
        <Toggle {...args} id="check2" checked />
        <Toggle {...args} id="check3" defaultChecked />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Toggle {...args} />
        <Toggle {...args} checked />
        <Toggle {...args} defaultChecked />
      </div>
    );
  },
};
