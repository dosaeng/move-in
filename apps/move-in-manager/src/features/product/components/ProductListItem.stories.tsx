import type { Meta, StoryObj } from '@storybook/react';

import ProductListItem, { ProductListItemSkeleton } from './ProductListItem';
import { addDays } from 'date-fns';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ProductListItem,
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
} satisfies Meta<typeof ProductListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      id: 2,
      thumbnail: 'https://picsum.photos/200/300',
      name: '힐스테이트 레이크 마운틴 아파트 2',
      address: '경기 동탄시',
      dedicatedArea: 10,
      supplyArea: 20,
      roomCount: 3,
      bathroomCount: 1,
      floor: 12,
      deposit: 55800000,
      monthlyRent: 1200000,
      minimumMoveInDate: addDays(new Date(), 2),
    },
  },
  render: (args) => {
    return <ProductListItem {...args} />;
  },
};

export const Skeleton: StoryObj = {
  render: (args) => {
    return <ProductListItemSkeleton {...args} />;
  },
};
