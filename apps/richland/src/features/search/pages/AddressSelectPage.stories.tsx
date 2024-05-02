import type { Meta, StoryObj } from '@storybook/react';
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

import { IonApp } from '@ionic/react';
import AddressSelectPage from './AddressSelectPage';
import { SearchFormContextProvider } from '../hooks/useSearchFormContext';
import { delay, http } from 'msw';
import {
  getMockProductAddressList,
  getProductAddressListEndpoint,
} from '@/features/product/hooks/useProductAddressList';

const meta = {
  component: AddressSelectPage,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    withRouter,
    (Story) => {
      return (
        <IonApp>
          <SearchFormContextProvider>
            <Story />
          </SearchFormContextProvider>
        </IonApp>
      );
    },
  ],
} satisfies Meta<typeof AddressSelectPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <AddressSelectPage {...args} />;
  },
  parameters: {
    msw: [
      http.get(getProductAddressListEndpoint, async ({ request }) => {
        await delay(1000);

        return getMockProductAddressList(request.url);
      }),
    ],
    reactRouter: reactRouterParameters({
      location: {
        searchParams: {
          parentId: '1100000000',
        },
      },
    }),
  },
};
