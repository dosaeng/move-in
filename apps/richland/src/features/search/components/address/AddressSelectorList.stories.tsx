import type { Meta, StoryObj } from '@storybook/react';
import AddressSelectorList from './AddressSelectorList';
import { HttpResponse, delay, http } from 'msw';
import {
  getMockProductAddressList,
  getProductAddressListEndpoint,
} from '@/features/product/hooks/useProductAddressList';

const meta = {
  component: AddressSelectorList,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof AddressSelectorList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    parentId: '1100000000',
  },
  render: (args) => {
    return <AddressSelectorList {...args} />;
  },
  parameters: {
    msw: [
      http.get(getProductAddressListEndpoint, async ({ request }) => {
        await delay(1000);

        return getMockProductAddressList(request.url);
      }),
    ],
  },
};

export const Empty: Story = {
  args: {
    parentId: '1100000000',
  },
  render: (args) => {
    return <AddressSelectorList {...args} />;
  },
  parameters: {
    msw: [
      http.get(getProductAddressListEndpoint, () => {
        return HttpResponse.json({
          totalCount: 0,
          list: [],
        });
      }),
    ],
  },
};
