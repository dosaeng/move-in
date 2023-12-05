import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { Divider } from './Divider';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Divider,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'radio', options: ['l', 'm', 's'], description: 'Size of the divider. l(24px), m(16px), s(8px)' },
    color: { control: 'radio', options: ['fill_2', 'fill_3'] },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(34, 34, 34, 0.30)',
          padding: '24px',
        }}
      >
        <div style={{ width: '360px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interaction: Story = {
  render: (args) => {
    return <Divider {...args} />;
  },
};

export const Fill02: Story = {
  args: {
    color: 'fill_2',
  },
  render: (args) => {
    return (
      <>
        <Divider {...args} size="l" />
        <Divider {...args} size="m" />
        <Divider {...args} size="s" />
      </>
    );
  },
};

export const Fill03: Story = {
  args: {
    color: 'fill_3',
  },
  render: (args) => {
    return (
      <>
        <Divider {...args} size="l" />
        <Divider {...args} size="m" />
        <Divider {...args} size="s" />
      </>
    );
  },
};
