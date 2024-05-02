import {
  getMockProductAddressList,
  getProductAddressListEndpoint,
} from '@/features/product/hooks/useProductAddressList';
import { ProductAddress } from '@/features/product/product';
import type { Meta, StoryObj } from '@storybook/react';
import { http } from 'msw';
import { useState } from 'react';
import AddressLevelOneModal from './AddressLevelOneModal';
import { IonApp } from '@ionic/react';

const meta = {
  component: AddressLevelOneModal,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      return (
        <IonApp>
          <Story />
        </IonApp>
      );
    },
  ],
} satisfies Meta<typeof AddressLevelOneModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onDidDismiss: () => {
      alert('onDidDismiss');
    },
  },
  render: (args) => {
    const [selectedItems, setSelectedItems] = useState<ProductAddress[]>([]);

    return (
      <AddressLevelOneModal
        {...args}
        selectedItems={selectedItems}
        onClickItem={(item) => {
          setSelectedItems((items) => {
            return items.includes(item)
              ? items.filter((i) => i !== item)
              : [...items, item];
          });
        }}
      />
    );
  },
  parameters: {
    msw: [
      http.get(getProductAddressListEndpoint, ({ request }) => {
        return getMockProductAddressList(request.url);
      }),
    ],
  },
};
