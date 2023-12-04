import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import React from 'react';
import { CTAButtonBlock } from './CTAButtonBlock';
import { IconButton } from './IconButton';
import { IconHeart } from '@tabler/icons-react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: CTAButtonBlock,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    floating: false,
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#404040',
          padding: '24px',
        }}
      >
        <div style={{ width: '100%', maxWidth: '360px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof CTAButtonBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    children: <Button size="l" label="Button" onClick={() => alert('Clicked!')} />,
  },
};

export const Twin: Story = {
  args: {
    children: [
      <Button size="l" label="Button" theme="neutral" shape="outline" onClick={() => alert('Clicked!')} />,
      <Button size="l" label="Button" onClick={() => alert('Clicked!')} />,
    ],
  },
};

export const TwinIcon: Story = {
  args: {
    children: [
      <IconButton size="l" theme="neutral" shape="outline" icon={<IconHeart />} onClick={() => alert('Clicked!')} />,
      <Button size="l" label="Button" onClick={() => alert('Clicked!')} />,
    ],
  },
};
