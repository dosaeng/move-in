import type { Meta, StoryObj } from '@storybook/react';
import { withRouter } from 'storybook-addon-react-router-v6';

import { IonApp, IonPage } from '@ionic/react';
import NotificationStateChangeDonePopup from './NotificationStateChangeDonePopup';

const meta = {
  component: NotificationStateChangeDonePopup,
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
} satisfies Meta<typeof NotificationStateChangeDonePopup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isAgreed: true,
    isOpen: true,
  },
  render: (args) => {
    return (
      <>
        <NotificationStateChangeDonePopup {...args} />
      </>
    );
  },
};
