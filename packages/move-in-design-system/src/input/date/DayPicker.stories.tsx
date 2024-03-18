import type { Meta, StoryObj } from '@storybook/react';
import DayPicker from './DayPicker';
import React from 'react';
import { Button } from '../../buttons/Button';
import { css } from '@move-in/styled-system/css';

const meta = {
  component: DayPicker,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '320px',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DayPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = React.useState<Date | undefined>(
      new Date()
    );

    return (
      <>
        <DayPicker
          {...args}
          selectedValue={selectedValue}
          onClick={setSelectedValue}
        />
      </>
    );
  },
};

export const Footer: Story = {
  render: (args) => {
    const [selectedValue, setSelectedValue] = React.useState<Date | undefined>(
      new Date()
    );

    return (
      <>
        <DayPicker
          {...args}
          selectedValue={selectedValue}
          onClick={setSelectedValue}
          footer={
            <div
              className={css({
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              })}
            >
              <Button
                className={css({
                  textStyle: 'body-12-m',
                })}
                shape="outline"
                theme="neutral"
                size="s"
                label="직접 입력하기"
                onClick={() => {
                  alert('직접 입력하기');
                }}
              />
            </div>
          }
        />
      </>
    );
  },
};
