import type { Meta, StoryObj } from '@storybook/react';
import NotificationListItem from './NotificationListItem';

const meta = {
  component: NotificationListItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof NotificationListItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    data: {
      id: '1',
      title: 'Notification title',
      content: 'Notification content',
      thumbnailUrl: 'https://via.placeholder.com/150',
      link: new URL('https://naver.com'),
      createdAt: new Date(),
    },
    onClick: () => {
      alert('clicked');
    },
  },
  render: (args) => {
    return (
      <>
        <NotificationListItem {...args} />
      </>
    );
  },
};

export const LongText: Story = {
  args: {
    data: {
      id: '1',
      title:
        '인디메이커를 위한 2024년 목표 설정 프레임워크 3가지 및 2023년 회고',
      content:
        'GPT 스토어에는 ‘GPT 빌더’를 통해 제작된 커스텀 챗봇이 판매될 예정입니다. GPT 빌더는 지난해 11월 출시된 오픈AI의 챗봇 제작 툴로, 챗GPT에 탑재된 유료 기능입니다. 코딩 지식 없이 대화만으로 원하는 챗봇을 만들 수 있는데요.',
      thumbnailUrl: 'https://via.placeholder.com/150',
      link: new URL('https://naver.com'),
      createdAt: new Date(),
    },
    onClick: () => {
      alert('clicked');
    },
  },
  render: (args) => {
    return (
      <>
        <NotificationListItem {...args} />
      </>
    );
  },
};
