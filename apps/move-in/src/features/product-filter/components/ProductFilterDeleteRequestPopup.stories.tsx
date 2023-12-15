import type { Meta, StoryObj } from '@storybook/react';

import ProductFilterDeleteRequestPopup from './ProductFilterDeleteRequestPopup';
import { IonApp, IonContent, IonPage } from '@ionic/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ProductFilterDeleteRequestPopup,
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
} satisfies Meta<typeof ProductFilterDeleteRequestPopup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    filterName: '필터01(23.12.12)',
    isOpen: true,
  },
  render: (args) => {
    return (
      <>
        <ProductFilterDeleteRequestPopup
          {...args}
          onDidDismiss={(agree) => {
            alert(agree ? '네, 삭제할게요' : '다음에 할께요');
          }}
        />
      </>
    );
  },
};
