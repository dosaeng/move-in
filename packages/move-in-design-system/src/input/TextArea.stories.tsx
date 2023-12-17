import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { TextArea } from './TextArea';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: TextArea,
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <div style={{ width: '360px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <TextArea {...args} />
        <TextArea {...args} defaultValue={'Default Value'} />
      </>
    );
  },
};

export const Placeholder: Story = {
  args: {
    placeholder: 'Helper Label',
  },
  render: (args) => {
    return (
      <>
        <TextArea {...args} />
        <TextArea {...args} defaultValue={'Default Value'} />
      </>
    );
  },
};

export const MaxLength: Story = {
  args: {
    placeholder: 'Helper Label',
    maxLength: 100,
  },
  render: (args) => {
    return (
      <>
        <TextArea {...args} />
        <TextArea {...args} defaultValue={'Default Value'} />
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
        <TextArea {...args} />
        <TextArea {...args} defaultValue={'Default Value'} />
      </>
    );
  },
};
