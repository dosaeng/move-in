import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { IonApp, IonContent, IonPage, IonToast, useIonToast } from '@ionic/react';
import { Button } from '../buttons/Button';
import useToast from './useToast';
import { Toast } from './Toast';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: () => <></>,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(34, 34, 34, 0.30)',
          padding: '24px',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<{ message: string; duration: number }>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Interaction: Story = {
  args: {
    message: 'Hello',
    duration: 0,
  },
  render: (args) => {
    const { present, dismiss } = useToast();

    return (
      <div
        style={{
          position: 'relative',
          width: '360px',
          height: '780px',
        }}
      >
        <IonApp>
          <IonPage>
            <IonContent className="ion-padding">
              <Button
                label="Open Toast"
                onClick={async () => {
                  await dismiss();

                  await present(args.message, args.duration);
                }}
              />
            </IonContent>
          </IonPage>
        </IonApp>
      </div>
    );
  },
};
