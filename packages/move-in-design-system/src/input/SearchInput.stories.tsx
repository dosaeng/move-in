import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { SearchInput } from './SearchInput';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: SearchInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    placeholder: '관심 동네를 검색해주세요 (ex-도담동)',
  },
  argTypes: {
    theme: {
      control: 'select',
      options: ['neutral', 'brand'],
    },
  },
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
} satisfies Meta<typeof SearchInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <SearchInput {...args} />
        <SearchInput {...args} defaultValue={'Default Value'} />
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
        <SearchInput {...args} />
        <SearchInput {...args} defaultValue={'Default Value'} />
      </>
    );
  },
};
