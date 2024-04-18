import type { Meta, StoryObj } from '@storybook/react';
import {
  withRouter
} from 'storybook-addon-react-router-v6';

import { IonApp } from '@ionic/react';
import SearchPage from './SearchPage';

const meta = {
  component: SearchPage,
  parameters: {
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
} satisfies Meta<typeof SearchPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <SearchPage {...args} />
      </>
    );
  },
};
