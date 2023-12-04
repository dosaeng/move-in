import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interaction: Story = {
  args: {
    size: 'l',
    label: 'Button',
    onClick: () => alert('Clicked!'),
  },
  argTypes: {
    leftIcon: { control: 'check', options: ['👈'] },
    rightIcon: { control: 'check', options: ['👉'] },
  },
};

const SizeVariantsTemplate = (args) => {
  return (
    <div style={{ display: 'flex', flexFlow: 'column wrap', gap: '8px' }}>
      {['fill', 'outline', 'clear'].map((shape) => {
        return (
          <div style={{ display: 'flex', flexFlow: 'row wrap', gap: '8px' }}>
            <Button {...args} shape={shape} theme="brand" />
            <Button {...args} shape={shape} theme="positive" />
            <Button {...args} shape={shape} theme="negative" />
            <Button {...args} shape={shape} theme="brand" disabled />
            <Button {...args} shape={shape} theme="positive" disabled />
            <Button {...args} shape={shape} theme="negative" disabled />
            <Button {...args} shape={shape} theme="brand" rounded />
            <Button {...args} shape={shape} theme="positive" rounded />
            <Button {...args} shape={shape} theme="negative" rounded />
            <Button {...args} shape={shape} theme="brand" disabled rounded />
            <Button {...args} shape={shape} theme="positive" disabled rounded />
            <Button {...args} shape={shape} theme="negative" disabled rounded />
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
    label: 'Button',
    leftIcon: '👈',
    rightIcon: '👉',
    onClick: () => alert('Clicked!'),
  },
  render: SizeVariantsTemplate,
};

export const M: Story = {
  args: {
    size: 'm',
    label: 'Button',
    leftIcon: '👈',
    rightIcon: '👉',
    onClick: () => alert('Clicked!'),
  },
  render: SizeVariantsTemplate,
};

export const S: Story = {
  args: {
    size: 's',
    label: 'Button',
    leftIcon: '👈',
    rightIcon: '👉',
    onClick: () => alert('Clicked!'),
  },
  render: SizeVariantsTemplate,
};

export const XS: Story = {
  args: {
    size: 'xs',
    label: 'Button',
    leftIcon: '👈',
    rightIcon: '👉',
    onClick: () => alert('Clicked!'),
  },
  render: SizeVariantsTemplate,
};
