import type { Meta, StoryObj } from '@storybook/react';

import { IonApp } from '@ionic/react';
import ProductFilterDetailPage from './ProductFilterDetailPage';
import { RouteComponentProps } from 'react-router-dom';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ProductFilterDetailPage,
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
} satisfies Meta<typeof ProductFilterDetailPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    match: {
      params: {
        id: '1',
      },
    },
  } as RouteComponentProps<{ id: string }>,
  render: (args) => {
    return <ProductFilterDetailPage {...args} />;
  },
};
