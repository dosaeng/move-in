import type { Meta, StoryObj } from '@storybook/react';

import { IonApp } from '@ionic/react';
import ProductConsultingListPage from './ProductConsultingListPage';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ProductConsultingListPage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    (Story) => {
      return (
        <IonApp>
          <Story />
        </IonApp>
      );
    },
  ],
} satisfies Meta<typeof ProductConsultingListPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <ProductConsultingListPage {...args} />
      </>
    );
  },
};