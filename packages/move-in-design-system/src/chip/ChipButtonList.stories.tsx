import type { Meta, StoryObj } from '@storybook/react';

import { ChipButtonList } from './ChipButtonList';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ChipButtonList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    options: [
      {
        key: 1,
        value: '경기도 고양시 마두동',
      },
      {
        key: 2,
        value: '오피스텔 · 아파트',
      },
      {
        key: 3,
        value: '싱글라이프',
      },
      {
        key: 4,
        value: '1억 4천 · 월 90-120',
      },
    ],
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '16px', border: '1px solid black' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ChipButtonList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <ChipButtonList {...args} />;
  },
};

export const DefaultValue: Story = {
  args: {
    value: [
      {
        key: 1,
        value: '경기도 고양시 마두동',
      },
      {
        key: 2,
        value: '오피스텔 · 아파트',
      },
    ],
  },
  render: (args) => {
    return <ChipButtonList {...args} />;
  },
};

export const EmptyValue: Story = {
  args: {
    value: [],
    readOnly: true,
  },
  render: (args) => {
    return <ChipButtonList {...args} />;
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
  render: (args) => {
    return <ChipButtonList {...args} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    return <ChipButtonList {...args} />;
  },
};
