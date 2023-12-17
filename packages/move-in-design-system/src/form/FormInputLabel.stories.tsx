import type { Meta, StoryObj } from '@storybook/react';

import React from 'react';
import { FormInputLabel } from './FormInputLabel';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: FormInputLabel,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid black',
          padding: '24px',
        }}
      >
        <div style={{ width: '360px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof FormInputLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prefix: '01-B',
    label: '해당 매물이 만족하는 사항을 골라주세요',
  },
  render: (args) => {
    return <FormInputLabel {...args} />;
  },
};
