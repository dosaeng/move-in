import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { IonApp, IonPage } from '@ionic/react';
import NotificationStopConfirmPopup from './NotificationStopConfirmPopup';

const meta = {
  component: NotificationStopConfirmPopup,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    withRouter,
    (Story) => {
      return (
        <IonApp>
          <IonPage>
            <Story />
          </IonPage>
        </IonApp>
      );
    },
  ],
} satisfies Meta<typeof NotificationStopConfirmPopup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
  render: (args) => {
    return (
      <>
        <NotificationStopConfirmPopup {...args} />
      </>
    );
  },
};
