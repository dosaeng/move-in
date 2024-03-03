import type { Meta, StoryObj } from '@storybook/react';
import { OutlinedFieldContainer } from './OutlinedFieldContainer';
import React from 'react';
import { OutlinedTextField } from './OutlinedTextField';

const meta = {
  component: OutlinedFieldContainer,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Label',
  },
  tags: ['autodocs'],
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
} satisfies Meta<typeof OutlinedFieldContainer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <OutlinedFieldContainer {...args}>
          <OutlinedTextField {...args} />
        </OutlinedFieldContainer>
      </>
    );
  },
};

export const ErrorLabel: Story = {
  args: {
    errorText: 'Error Label',
  },
  render: (args) => {
    return (
      <>
        <OutlinedFieldContainer {...args}>
          <OutlinedTextField {...args} hasError />
        </OutlinedFieldContainer>
      </>
    );
  },
};
