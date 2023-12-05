import type { Meta, StoryObj } from '@storybook/react';

import { PageHeader, PageHeaderBackButton, PageHeaderCloseButton } from './PageHeader';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: PageHeader,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    title: 'Page Title',
  },
  argTypes: {
    theme: { control: 'radio', options: ['default', 'clearWhite', 'clearBlack'] },
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
        <div style={{ width: '360px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    theme: 'default',
    title: 'Page Title',
  },
  render: (args) => {
    return (
      <>
        <PageHeader {...args} left={<PageHeaderBackButton />} />
        <PageHeader {...args} right={<PageHeaderCloseButton />} />
        <PageHeader {...args} left={<PageHeaderBackButton />} right={<PageHeaderCloseButton />} />
      </>
    );
  },
};

export const ClearWhite: Story = {
  args: {
    theme: 'clearWhite',
    title: 'Page Title',
  },
  render: (args) => {
    return (
      <>
        <PageHeader {...args} left={<PageHeaderBackButton />} />
        <PageHeader {...args} right={<PageHeaderCloseButton />} />
        <PageHeader {...args} left={<PageHeaderBackButton />} right={<PageHeaderCloseButton />} />
      </>
    );
  },
};

export const ClearBlack: Story = {
  args: {
    theme: 'clearBlack',
    title: 'Page Title',
  },
  render: (args) => {
    return (
      <>
        <PageHeader {...args} left={<PageHeaderBackButton />} />
        <PageHeader {...args} right={<PageHeaderCloseButton />} />
        <PageHeader {...args} left={<PageHeaderBackButton />} right={<PageHeaderCloseButton />} />
      </>
    );
  },
};
