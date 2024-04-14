/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import ChipList from './ChipList';
import { useState } from 'react';

const meta = {
  component: ChipList,
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
} satisfies Meta<typeof ChipList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: Array.from({ length: 200 }, (_, i) => ({
      label: `Label ${i}`,
    })),
    labelGetter: (item) => (item as { label: string }).label,
    onClickDelete: (item) => {
      alert(`Clicked ${JSON.stringify(item)}`);
    },
  },
  render: (args) => {
    return <ChipList {...args} />;
  },
};

// eslint-disable-next-line storybook/prefer-pascal-case
export const 아이템_삭제: StoryObj = {
  render: () => {
    const [items, setItems] = useState(
      Array.from({ length: 2 }, (_, i) => ({
        label: `Label ${i}`,
      }))
    );

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '80px',
        }}
      >
        <ChipList
          items={items}
          labelGetter={(item) => (item as { label: string }).label}
          onClickDelete={(item) => {
            setItems(items.filter((i) => i !== item));
          }}
        />
        <button
          onClick={() => {
            setItems([
              ...items,
              {
                label: `Label ${items.length}`,
              },
            ]);
          }}
        >
          아이템 추가
        </button>
      </div>
    );
  },
};
