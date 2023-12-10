import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { CheckBox } from './CheckBox';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: CheckBox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    label: '(필수) 개인정보 처리방침 동의',
  },
} satisfies Meta<typeof CheckBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <CheckBox {...args} id="check1" />
        <CheckBox {...args} id="check2" defaultChecked />
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
        <CheckBox {...args} />
        <CheckBox {...args} defaultChecked />
      </>
    );
  },
};
