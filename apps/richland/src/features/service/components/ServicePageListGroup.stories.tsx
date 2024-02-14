import type { Meta, StoryObj } from '@storybook/react';
import ServicePageListGroup from './ServicePageListGroup';
import ServicePageListItem from './ServicePageListItem';

const meta = {
  component: ServicePageListGroup,
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
} satisfies Meta<typeof ServicePageListGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return (
      <>
        <ServicePageListGroup {...args} />
      </>
    );
  },
  args: {
    title: '고객 지원',
    children: (
      <>
        <ServicePageListItem title="고객센터"/>
        <ServicePageListItem title="스토어 리뷰하기"/>
        <ServicePageListItem title="제안하기"/>
      </>
    ),
  },
};
