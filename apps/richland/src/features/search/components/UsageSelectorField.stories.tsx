import type { Meta, StoryObj } from '@storybook/react';
import UsageSelectorField from './UsageSelectorField';

const meta = {
  component: UsageSelectorField,
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
} satisfies Meta<typeof UsageSelectorField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedItems: Array.from({ length: 2 }, (_, i) => ({
      id: i,
      name: `Label ${i}`,
    })),
    onClickHeader: () => {
      alert('Clicked Header');
    },
    onClickDelete: (item) => {
      alert(`Clicked ${JSON.stringify(item)}`);
    },
  },
  render: (args) => {
    return <UsageSelectorField {...args} />;
  },
};

export const Empty: Story = {
  args: {
    selectedItems: [],
    onClickHeader: () => {
      alert('Clicked Header');
    },
    onClickDelete: (item) => {
      alert(`Clicked ${JSON.stringify(item)}`);
    },
  },
  render: (args) => {
    return <UsageSelectorField {...args} />;
  },
};
