import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { Modal, ModalView } from './Modal';
import { IonApp, IonContent, IonModal, IonPage } from '@ionic/react';
import { Button } from '../buttons/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ModalView,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
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
} satisfies Meta<typeof ModalView>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <ModalView {...args} />;
  },
};

export const Interaction: Story = {
  render: (args) => {
    const modal = React.useRef<HTMLIonModalElement>(null);

    function dismiss() {
      modal.current?.dismiss();
    }

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
              <Button id="open-custom-modal" label="Open Modal" />
              <Modal id="example-modal" ref={modal} trigger="open-custom-modal">
                <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  Modal Body
                </div>
              </Modal>
            </IonContent>
          </IonPage>
        </IonApp>
      </div>
    );
  },
};
