import type { Meta, StoryObj } from '@storybook/react';

import { IonApp } from '@ionic/react';
import FindIdExistPopup from './FindIdExistPopup';
import { SignUpType } from '../sign-up';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: FindIdExistPopup,
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
} satisfies Meta<typeof FindIdExistPopup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (props) => {
    return (
      <FindIdExistPopup
        {...props}
        onConfirm={() => {
          alert('confirm');
        }}
      />
    );
  },
  args: {
    isOpen: true,
    email: 'test@test.com',
    signUpType: SignUpType.kakao,
  },
  argTypes: {
    signUpType: {
      control: 'select',
      options: [SignUpType.apple, SignUpType.kakao],
    }
  }
};
