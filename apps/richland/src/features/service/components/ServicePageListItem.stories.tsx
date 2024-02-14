import type { Meta, StoryObj } from '@storybook/react';
import ServicePageListItem from './ServicePageListItem';

const meta = {
  component: ServicePageListItem,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      return (
        <div style={{ width: '100%', padding: '20px' }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof ServicePageListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <ServicePageListItem
          {...args}
          onClick={() => {
            alert('Clicked');
          }}
        />
      </>
    );
  },
  args: {
    title: 'Title',
  },
};
