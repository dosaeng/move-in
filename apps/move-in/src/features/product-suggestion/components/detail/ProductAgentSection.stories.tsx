import type { Meta, StoryObj } from '@storybook/react';

import ProductAgentSection from './ProductAgentSection';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ProductAgentSection,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  args: {
    id: 1,
    filterId: 1,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '375px', paddingTop: '16px', paddingBottom: '16px', border: '1px solid black' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProductAgentSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <ProductAgentSection {...args} />;
  },
};
