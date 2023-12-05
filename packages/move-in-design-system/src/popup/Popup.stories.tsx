import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { Popup, PopupButton } from './Popup';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: Popup,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  argTypes: {
    textAlign: { control: 'radio', options: ['left', 'center'] },
    actionsFlow: { control: 'radio', options: ['row', 'column'] },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(34, 34, 34, 0.30)',
          padding: '24px',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '여기에는 팝업 헤더 텍스트가 들어가겠지요 아마도',
    description:
      '캐치나우로 대박 나서 포르쉐를 뽑고 싶어요. 그때까지는 모르쉐로 열심히 달려야지요. 이왕이면 포르쉐 911 GTS 모델이면 좋겠네요.',
    actions: (
      <>
        <PopupButton shape="fill" label="버튼 텍스트를 입력해주세요" onClick={() => alert('Clicked!')} />
      </>
    ),
  },
  render: (args) => {
    return <Popup {...args} />;
  },
};

export const WithoutDescription: Story = {
  args: {
    title: '여기에는 팝업 헤더 텍스트가 들어가겠지요 아마도',
    actions: (
      <>
        <PopupButton shape="fill" label="버튼 텍스트를 입력해주세요" onClick={() => alert('Clicked!')} />
      </>
    ),
  },
  render: (args) => {
    return <Popup {...args} />;
  },
};

export const TwoActionHorizontal: Story = {
  args: {
    title: '여기에는 팝업 헤더 텍스트가 들어가겠지요 아마도',
    actionsFlow: 'column',
    actions: (
      <>
        <PopupButton shape="fill" label="버튼 텍스트를 입력해주세요" onClick={() => alert('Clicked!')} />
        <PopupButton shape="clear" label="버튼 텍스트를 입력해주세요" onClick={() => alert('Clicked!')} />
      </>
    ),
  },
  render: (args) => {
    return <Popup {...args} />;
  },
};

export const TwoActionVertical: Story = {
  args: {
    title: '여기에는 팝업 헤더 텍스트가 들어가겠지요 아마도',
    actionsFlow: 'row',
    actions: (
      <>
        <PopupButton shape="fill" label="버튼 텍스트를 입력해주세요" onClick={() => alert('Clicked!')} />
        <PopupButton shape="clear" label="버튼 텍스트를 입력해주세요" onClick={() => alert('Clicked!')} />
      </>
    ),
  },
  render: (args) => {
    return <Popup {...args} />;
  },
};

export const MultipleActionHorizontal: Story = {
  args: {
    title: '여기에는 팝업 헤더 텍스트가 들어가겠지요 아마도',
    actionsFlow: 'column',
    actions: (
      <>
        <PopupButton shape="fill" theme="positive" label="버튼 텍스트를 입력해주세요" onClick={() => alert('Clicked!')} />{' '}
        <PopupButton shape="fill" theme="negative" label="버튼 텍스트를 입력해주세요" onClick={() => alert('Clicked!')} />
        <PopupButton shape="clear" label="버튼 텍스트를 입력해주세요" onClick={() => alert('Clicked!')} />
      </>
    ),
  },
  render: (args) => {
    return <Popup {...args} />;
  },
};
