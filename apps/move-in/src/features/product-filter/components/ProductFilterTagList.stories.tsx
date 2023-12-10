import type { Meta, StoryObj } from '@storybook/react';

import ProductFilterTagList from './ProductFilterTagList';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ProductFilterTagList,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    tags: ['경기도 고양시 마두동', '오피스텔 · 아파트', '싱글라이프', '1억 4천 · 월 90-120'],
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '16px', border: '1px solid black' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductFilterTagList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <ProductFilterTagList {...args} />
      </>
    );
  },
};
