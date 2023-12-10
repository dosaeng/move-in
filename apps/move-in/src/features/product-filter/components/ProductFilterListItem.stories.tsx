import type { Meta, StoryObj } from '@storybook/react';

import { subDays } from 'date-fns';
import { ProductFilterState } from '../hooks/useProductFilterList';
import ProductFilterListItem from './ProductFilterListItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ProductFilterListItem,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '16px', border: '1px solid black', background: 'lightgrey' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductFilterListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      id: 1,
      name: '신사 영끌 신혼집 1',
      dueDate: subDays(new Date(), 1),
      filterList: ['경기도 고양시 마두동', '오피스텔 · 아파트', '싱글라이프', '1억 4천 · 월 90-120'],
      state: ProductFilterState.EXPIRED,
      suggestionCount: 0,
      hasNewSuggestion: false,
    },
  },
  render: (args) => {
    return <ProductFilterListItem {...args} />;
  },
};
