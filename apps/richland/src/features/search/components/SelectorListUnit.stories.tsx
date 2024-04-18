import type { Meta, StoryObj } from '@storybook/react';
import SelectorListUnit from './SelectorListUnit';

const meta = {
  component: SelectorListUnit,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SelectorListUnit>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Title',
    suffix: 'NNN,NNN',
    isChecked: false,
    isDisabled: false,
    onClick: () => {
      alert('Clicked');
    },
  },
  render: (args) => {
    return (
      <>
        <SelectorListUnit {...args} />
        <SelectorListUnit {...args} isChecked />
        <SelectorListUnit {...args} isDisabled />
        <SelectorListUnit {...args} isChecked isDisabled />
      </>
    );
  },
};
