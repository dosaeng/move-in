import type { Meta, StoryObj } from '@storybook/react';
import Chip from './Chip';

const meta = {
  component: Chip,
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
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Label',
    onClickDelete: () => {
      alert('Clicked');
    },
  },
  render: (args) => {
    return (
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        <Chip {...args} />
        <Chip {...args} />
        <Chip {...args} />
        <Chip {...args} />
      </div>
    );
  },
};
