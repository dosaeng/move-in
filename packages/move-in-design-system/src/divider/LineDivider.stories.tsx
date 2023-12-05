import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { Divider } from './Divider';
import { LineDivider } from './LineDivider';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: LineDivider,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    dashed: { control: 'boolean' },
    color: { control: 'radio', options: ['stroke_2', 'stroke_3'] },
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
} satisfies Meta<typeof LineDivider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interaction: Story = {
  render: (args) => {
    return <LineDivider {...args} />;
  },
};

export const Line: Story = {
  args: {
    dashed: false,
  },
  render: (args) => {
    return (
      <>
        <LineDivider {...args} color="stroke_2" />
        <LineDivider {...args} color="stroke_3" />
      </>
    );
  },
};

export const Dashed: Story = {
  args: {
    dashed: true,
  },
  render: (args) => {
    return (
      <>
        <LineDivider {...args} color="stroke_2" />
        <LineDivider {...args} color="stroke_3" />
      </>
    );
  },
};
