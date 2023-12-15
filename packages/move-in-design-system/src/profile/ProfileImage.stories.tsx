import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { ProfileImage } from './ProfileImage';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ProfileImage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    src: 'https://placehold.co/300x300?text=profile',
    alt: '프로필 이미지',
  },
} satisfies Meta<typeof ProfileImage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <ProfileImage {...args} />;
  },
};
