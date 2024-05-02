/* eslint-disable storybook/prefer-pascal-case */
import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { getProductUsageListEndpoint } from '@/features/product/hooks/useProductUsageList';
import { IonApp } from '@ionic/react';
import { HttpResponse, http } from 'msw';
import UsageSelectPage from './UsageSelectPage';
import { SearchFormContextProvider } from '../hooks/useSearchFormContext';

const meta = {
  component: UsageSelectPage,
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
} satisfies Meta<typeof UsageSelectPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <UsageSelectPage key={'data'} {...args} />;
  },
  parameters: {
    msw: [
      http.get(getProductUsageListEndpoint, async () => {
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

export const 데이터_없음: Story = {
  render: (args) => {
    return <UsageSelectPage key={'empty'} {...args} />;
  },
  parameters: {
    msw: [
      http.get(getProductUsageListEndpoint, async () => {
        return HttpResponse.json([]);
      }),
    ],
  },
};
