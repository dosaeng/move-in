import type { Meta, StoryObj } from '@storybook/react';

import EmptyView from './EmptyView';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: EmptyView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          maxWidth: '375px',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '아직 요청을 하지 않았어요',
  },
  render: (args) => {
    return <EmptyView {...args} />;
  },
};
