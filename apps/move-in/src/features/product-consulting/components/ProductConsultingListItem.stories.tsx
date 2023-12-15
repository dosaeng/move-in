import type { Meta, StoryObj } from '@storybook/react';

import { ProductConsultingState } from '../hooks/useProductConsultingList';
import ProductConsultingListItem, { ProductConsultingListItemSkeleton } from './ProductConsultingListItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ProductConsultingListItem,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '16px', border: '1px solid black' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductConsultingListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      id: 1,
      state: ProductConsultingState.WAITING,
      productId: 1,
      name: '테스트 상품 1',
      thumbnail: 'https://picsum.photos/200',
      deposit: 590000000,
      monthlyRent: 100000,
      address: '서울시 강남구 테헤란로 427',
      minimumMoveInDate: new Date(),
      consultingRequestDate: new Date(),
      agentId: 1,
      agentName: '홍길동',
      agentRating: 4.5,
    },
  },
  render: (args) => {
    return <ProductConsultingListItem {...args} />;
  },
};

export const Skeleton: StoryObj = {
  render: (args) => {
    return <ProductConsultingListItemSkeleton {...args} />;
  },
};
