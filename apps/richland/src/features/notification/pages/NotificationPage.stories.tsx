import type { Meta, StoryObj } from '@storybook/react';
import { HttpResponse, http } from 'msw';
import { withRouter } from 'storybook-addon-react-router-v6';

import { IonApp } from '@ionic/react';
import { getNotificationListEndpoint } from '../hooks/useNotificationList';
import NotificationPage from './NotificationPage';

const meta = {
  component: NotificationPage,
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
} satisfies Meta<typeof NotificationPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <NotificationPage {...args} />
      </>
    );
  },
  parameters: {
    msw: [
      http.get(getNotificationListEndpoint, ({ request }) => {
        const maxLength = 100;
        const parsedUrl = new URL(request.url);
        const page = Number(parsedUrl.searchParams.get('page'));
        const size = Number(parsedUrl.searchParams.get('size'));

        if ((page + 1) * size > maxLength) {
          return HttpResponse.json({
            total_count: maxLength,
            list: [],
          });
        }

        const list = Array.from({ length: size }).map((_, index) => {
          const id = `${page * size}-${index}`;

          return {
            id,
            title: `Title ${id}`,
            content: `Content ${id}`,
            thumbnail_url: `https://via.placeholder.com/150?text=${id}`,
            created_at: new Date(),
          };
        });

        return HttpResponse.json({
          total_count: maxLength,
          list,
        });
      }),
    ],
  },
};

export const Empty: Story = {
  render: (args) => {
    return (
      <>
        <NotificationPage {...args} />
      </>
    );
  },
  parameters: {
    msw: [
      http.get(getNotificationListEndpoint, () => {
        return HttpResponse.json({
          total_count: 0,
          list: [],
        });
      }),
    ],
  },
};
