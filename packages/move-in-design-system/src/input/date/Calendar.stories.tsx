import type { Meta, StoryObj } from '@storybook/react';
import Calendar from './Calendar';
import React from 'react';

const meta = {
  component: Calendar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Calendar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedValue: new Date(),
  },
  render: (args) => {
    const [selectedValue, setSelectedValue] = React.useState<Date | undefined>(
      new Date()
    );
    
    return (
      <>
        <Calendar
          {...args}
          selectedValue={selectedValue}
          onClick={setSelectedValue}
        />
      </>
    );
  },
};
