import type { Meta, StoryObj } from '@storybook/react';

import ExtraOptionSelectBox from './ExtraOptionSelectBox';
import { IonApp, IonContent, IonPage } from '@ionic/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ExtraOptionSelectBox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },

  decorators: [
    (Story) => (
      <IonApp>
        <IonPage>
          <IonContent className="ion-padding">
            <Story />
          </IonContent>
        </IonPage>
      </IonApp>
    ),
  ],
} satisfies Meta<typeof ExtraOptionSelectBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <ExtraOptionSelectBox
          {...args}
          onChange={(value) => {
            alert(value);
          }}
        />
      </>
    );
  },
};
