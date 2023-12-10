import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { DateInput } from './DateInput';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: DateInput,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  args: {},
} satisfies Meta<typeof DateInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    const [value1, setValue1] = React.useState<Date | undefined>(undefined);

    return (
      <>
        <div>
          <DateInput {...args} id="date1" onChange={setValue1} />
          {value1?.toString()}
        </div>
        <DateInput {...args} id="date2" defaultValue={new Date()} />
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
        <DateInput {...args} id="date3" />
        <DateInput {...args} id="date4" defaultValue={new Date()} />
      </>
    );
  },
};
