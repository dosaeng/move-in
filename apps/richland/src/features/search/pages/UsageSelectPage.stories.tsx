/* eslint-disable storybook/prefer-pascal-case */
import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { IonApp } from '@ionic/react';
import UsageSelectPage from './UsageSelectPage';
import { HttpResponse, delay, http } from 'msw';
import { getProductUsageListEndpoint } from '@/features/product/hooks/useProductUsageList';

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
          <Story />
        </IonApp>
      );
    },
  ],
} satisfies Meta<typeof UsageSelectPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <UsageSelectPage {...args} />;
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

export const 데이터_없음: Story = {
  render: (args) => {
    return <UsageSelectPage {...args} />;
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
