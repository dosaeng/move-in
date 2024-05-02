import type { Meta, StoryObj } from '@storybook/react';
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';

import { IonApp } from '@ionic/react';
import SearchFormPage from './SearchFormPage';
import SearchPage from './SearchPage';
import UsageSelectPage from './UsageSelectPage';
import { getProductUsageListEndpoint } from '@/features/product/hooks/useProductUsageList';
import { HttpResponse, http } from 'msw';

const meta = {
  component: SearchPage,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    withRouter,
    (Story) => {
      return (
        <IonApp>
          <Story />
        </IonApp>
      );
    },
  ],
} satisfies Meta<typeof SearchPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <SearchPage {...args} />;
  },
  parameters: {
    reactRouter: reactRouterParameters({
      routing: {
        path: '/search',
        useStoryElement: true,
        children: [
          {
            path: '',
            element: <SearchFormPage />,
          },
          {
            path: 'usage-select',
            element: <UsageSelectPage />,
          },
        ],
      },
    }),
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
