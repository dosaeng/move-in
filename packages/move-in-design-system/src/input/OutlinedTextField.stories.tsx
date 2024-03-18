import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { OutlinedTextField } from './OutlinedTextField';
import { IconSearch } from '@tabler/icons-react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: OutlinedTextField,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    hasError: false,
    placeholder: 'Placeholder',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          width: '320px',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OutlinedTextField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <OutlinedTextField {...args} />
        <OutlinedTextField
          {...args}
          defaultValue={'Default Value'}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
      </>
    );
  },
};

export const Error: Story = {
  args: {
    hasError: true,
  },
  render: (args) => {
    return (
      <>
        <OutlinedTextField {...args} />
        <OutlinedTextField {...args} defaultValue={'Default Value'} />
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
        <OutlinedTextField {...args} />
        <OutlinedTextField {...args} defaultValue={'Default Value'} />
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
        <OutlinedTextField {...args} />
        <OutlinedTextField {...args} defaultValue={'Default Value'} />
      </>
    );
  },
};

export const SuffixIcon: Story = {
  args: {
    suffixIcon: <IconSearch size={20} color="#CCCCCC" />,
  },
  render: (args) => {
    return (
      <>
        <OutlinedTextField {...args} />
        <OutlinedTextField {...args} defaultValue={'Default Value'} />
      </>
    );
  },
};
