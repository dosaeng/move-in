import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { SelectBox } from './SelectBox';
import { IonApp, IonContent, IonPage } from '@ionic/react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: SelectBox,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {
    placeholder: '눌러서 선택해주세요',
    modalTitle: (
      <>
        집이 얼마나 컸으면 하나요?
        <br />
        최소 조건을 입력해주세요.
      </>
    ),
    options: [
      { key: 1, value: '싱글 라이프' },
      { key: 2, value: '신혼 부부' },
      { key: 3, value: '아기가 있는 집' },
    ],
  },
  decorators: [
    (Story) => {
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <Story />
                </div>
              </IonContent>
            </IonPage>
          </IonApp>
        </div>
      );
    },
  ],
} satisfies Meta<typeof SelectBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <SelectBox {...args} />
        <SelectBox {...args} defaultValue={{ key: 1, value: '싱글 라이프' }} />
      </>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => {
    return (
      <>
        <SelectBox {...args} />
        <SelectBox {...args} defaultValue={{ key: 1, value: '싱글 라이프' }} />
      </>
    );
  },
};
