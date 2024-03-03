import type { Meta, StoryObj } from '@storybook/react';

import CheckTermsListItem from './CheckTermsListItem';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: CheckTermsListItem,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    label: '(필수) 개인정보 처리방침 동의',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px', padding: '16px', border: '1px solid black' }}>
        <Story />
      </div>
    ),
  ]
} satisfies Meta<typeof CheckTermsListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <CheckTermsListItem {...args} id="terms1" />
        <CheckTermsListItem {...args} id="terms2" checked={true} />
      </>
    );
  },
};
