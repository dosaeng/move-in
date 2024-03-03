import type { Meta, StoryObj } from '@storybook/react';
import TermsListItem from './TermsListItem';

const meta = {
  component: TermsListItem,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div
        style={{ width: '375px', padding: '16px', border: '1px solid black' }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TermsListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: '개인정보 처리방침',
    onClick: () => {
      alert('clicked');
    }
  },
  render: (args) => {
    return (
      <>
        <TermsListItem {...args} />
        <TermsListItem {...args} />
      </>
    );
  },
};
