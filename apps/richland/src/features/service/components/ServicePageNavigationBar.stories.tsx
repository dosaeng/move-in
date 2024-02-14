import type { Meta, StoryObj } from '@storybook/react';
import ServicePageNavigationBar from './ServicePageNavigationBar';

const meta = {
  component: ServicePageNavigationBar,
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
} satisfies Meta<typeof ServicePageNavigationBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <ServicePageNavigationBar {...args} />
      </>
    );
  },
};
