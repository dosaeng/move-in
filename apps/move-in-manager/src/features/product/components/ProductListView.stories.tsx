import type { Meta, StoryObj } from '@storybook/react';

import ProductListView from './ProductListView';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ProductListView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '16px', border: '1px solid black', background: 'white' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductListView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <ProductListView {...args} onClick={(item) => {
      alert(JSON.stringify(item));
    }}/>;
  },
};
