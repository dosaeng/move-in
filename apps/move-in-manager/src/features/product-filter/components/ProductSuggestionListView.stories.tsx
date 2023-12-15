import type { Meta, StoryObj } from '@storybook/react';

import ProductSuggestionListView from './ProductSuggestionListView';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ProductSuggestionListView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    filterId: 1,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '16px', border: '1px solid black' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductSuggestionListView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <ProductSuggestionListView {...args} />;
  },
};
