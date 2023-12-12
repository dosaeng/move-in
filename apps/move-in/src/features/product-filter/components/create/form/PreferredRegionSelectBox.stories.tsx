import type { Meta, StoryObj } from '@storybook/react';

import PreferredRegionSelectBox from './PreferredRegionSelectBox';
import { IonApp, IonContent, IonPage } from '@ionic/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: PreferredRegionSelectBox,
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
} satisfies Meta<typeof PreferredRegionSelectBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <PreferredRegionSelectBox
          {...args}
          onChange={(value) => {
            alert(value);
          }}
        />
      </>
    );
  },
};
