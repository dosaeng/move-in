import type { Meta, StoryObj } from '@storybook/react';

import ProductSuggestionRequestModal from './ProductSuggestionRequestModal';
import { IonApp, IonContent, IonPage } from '@ionic/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ProductSuggestionRequestModal,
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
} satisfies Meta<typeof ProductSuggestionRequestModal>;

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
        <ProductSuggestionRequestModal
          {...args}
          onDidDismiss={(agree) => {
            alert(agree ? '네, 제안해주세요' : '다음에 이어할게요');
          }}
        />
      </>
    );
  },
};
