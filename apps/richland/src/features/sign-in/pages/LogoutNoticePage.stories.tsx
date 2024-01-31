import type { Meta, StoryObj } from '@storybook/react';

import { IonApp } from '@ionic/react';
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';
import LogoutNoticePage from './LogoutNoticePage';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: LogoutNoticePage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
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
} satisfies Meta<typeof LogoutNoticePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TimeoutSession: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: { errorCode: '001' },
      },
    }),
  },
  render: () => {
    return <LogoutNoticePage />;
  },
};

export const DuplicateSession: Story = {
  parameters: {
    reactRouter: reactRouterParameters({
      location: {
        searchParams: { errorCode: '002' },
      },
    }),
  },
  render: () => {
    return <LogoutNoticePage />;
  },
};
