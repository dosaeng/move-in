import type { Meta, StoryObj } from '@storybook/react';

import SignUpTermsModal from './SignUpTermsModal';
import { IonApp, IonContent, IonPage } from '@ionic/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: SignUpTermsModal,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      return (
        <IonApp>
          <IonPage>
            <IonContent className="ion-padding">
              <Story />
            </IonContent>
          </IonPage>
        </IonApp>
      );
    },
  ],
} satisfies Meta<typeof SignUpTermsModal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
  },
  render: (args) => {
    return (
      <>
        <SignUpTermsModal
          {...args}
          onDidDismiss={(agree) => {
            alert(agree ? '동의' : '비동의');
          }}
        />
      </>
    );
  },
};
