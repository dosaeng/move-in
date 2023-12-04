import type { Meta, StoryObj } from '@storybook/react';

import { IconButton } from './IconButton';
import React from 'react';
import { IconHeart } from '../icons/icons';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: IconButton,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interaction: Story = {
  args: {
    size: 'l',
    icon: <IconHeart />,
    onClick: () => alert('Clicked!'),
  },
};

const SizeVariantsTemplate = (args) => {
  return (
    <div style={{ display: 'flex', flexFlow: 'column wrap', gap: '8px' }}>
      {['fill', 'outline', 'clear'].map((shape) => {
        return (
          <div style={{ display: 'flex', flexFlow: 'row wrap', gap: '8px' }}>
            <IconButton {...args} shape={shape} theme="neutral" />
            <IconButton {...args} shape={shape} theme="brand" />
            <IconButton {...args} shape={shape} theme="neutral" disabled />
            <IconButton {...args} shape={shape} theme="brand" disabled />
            {shape !== 'clear' && (
              <>
                <IconButton {...args} shape={shape} theme="neutral" rounded />
                <IconButton {...args} shape={shape} theme="brand" rounded />
                <IconButton {...args} shape={shape} theme="neutral" disabled rounded />
                <IconButton {...args} shape={shape} theme="brand" disabled rounded />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const L: Story = {
  args: {
    size: 'l',
    icon: <IconHeart size={24} />,
    onClick: () => alert('Clicked!'),
  },
  render: SizeVariantsTemplate,
};

export const M: Story = {
  args: {
    size: 'm',
    icon: <IconHeart size={24} />,
    onClick: () => alert('Clicked!'),
  },
  render: SizeVariantsTemplate,
};

export const S: Story = {
  args: {
    size: 's',
    icon: <IconHeart size={20} />,
    onClick: () => alert('Clicked!'),
  },
  render: SizeVariantsTemplate,
};

export const XS: Story = {
  args: {
    size: 'xs',
    icon: <IconHeart size={16} />,
    onClick: () => alert('Clicked!'),
  },
  render: SizeVariantsTemplate,
};
