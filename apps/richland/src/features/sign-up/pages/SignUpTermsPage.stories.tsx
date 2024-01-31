import type { Meta, StoryObj } from '@storybook/react';

import { IonApp } from '@ionic/react';
import {
  reactRouterParameters,
  withRouter,
} from 'storybook-addon-react-router-v6';
import SignUpTermsPage from './SignUpTermsPage';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: SignUpTermsPage,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  decorators: [
    withRouter,
    (Story) => {
      return (
        <IonApp>
          <Story />
        </IonApp>
      );
    },
  ],
} satisfies Meta<typeof SignUpTermsPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    reactRouter: reactRouterParameters({}),
  },
  render: () => {
    return <SignUpTermsPage />;
  },
};
