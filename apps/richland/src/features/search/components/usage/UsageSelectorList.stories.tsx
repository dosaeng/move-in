/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import UsageSelectorList from './UsageSelectorList';
import { HttpResponse, delay, http } from 'msw';
import { getProductUsageListEndpoint } from '@/features/product/hooks/useProductUsageList';
import { useState } from 'react';
import { ProductUsage } from '@/features/product/product';

const meta = {
  component: UsageSelectorList,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof UsageSelectorList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [selectedItems, setSelectedItems] = useState<ProductUsage[]>([]);

    return (
      <UsageSelectorList
        {...args}
        selectedItems={selectedItems}
        onClickItem={(item) => {
          const isSelected = selectedItems.some((i) => i.id === item.id);

          if (isSelected) {
            setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
            return;
          }

          setSelectedItems([...selectedItems, item]);
        }}
      />
    );
  },
  parameters: {
    msw: [
      http.get(getProductUsageListEndpoint, () => {
        return HttpResponse.json(
          Array.from({ length: 100 }, (_, i) => ({
            id: i,
            name: `용도 ${i}`,
            count: Math.floor(Math.random() * 100),
          }))
        );
      }),
    ],
  },
};

// eslint-disable-next-line storybook/prefer-pascal-case
export const 데이터_없음: Story = {
  render: (args) => {
    return <UsageSelectorList {...args} />;
  },
  parameters: {
    msw: [
      http.get(getProductUsageListEndpoint, () => {
        delay(5000);

        return HttpResponse.json([]);
      }),
    ],
  },
};
