import type { Meta, StoryObj } from '@storybook/react';
import AddressSelectorField from './AddressSelectorField';

const meta = {
  component: AddressSelectorField,
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
} satisfies Meta<typeof AddressSelectorField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedItems: [
      {
        id: '1111000000',
        levelOneName: '서울특별시',
        levelTwoName: '종로구',
        levelThreeName: '',
        level: 2,
      },
      {
        id: '1114000000',
        levelOneName: '서울특별시',
        levelTwoName: '중구',
        levelThreeName: '',
        level: 2,
      },
      {
        id: '4205000000',
        levelOneName: '강원도',
        levelTwoName: '울진군',
        levelThreeName: '',
        level: 2,
      },
      {
        id: '4900000000',
        levelOneName: '제주도',
        levelTwoName: '',
        levelThreeName: '',
        level: 1,
      },
    ],
    onClickHeader: () => {
      alert('Clicked Header');
    },
    onClickGroupHeader: (item) => {
      alert(`Clicked Group ${JSON.stringify(item)}`);
    },
    onClickDelete: (item) => {
      alert(`Clicked ${JSON.stringify(item)}`);
    },
  },
  render: (args) => {
    return <AddressSelectorField {...args} />;
  },
};

export const Empty: Story = {
  args: {
    selectedItems: [],
    onClickHeader: () => {
      alert('Clicked Header');
    },
    onClickGroupHeader: (item) => {
      alert(`Clicked Group ${JSON.stringify(item)}`);
    },
    onClickDelete: (item) => {
      alert(`Clicked ${JSON.stringify(item)}`);
    },
  },
  render: (args) => {
    return <AddressSelectorField {...args} />;
  },
};
