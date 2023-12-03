import { css } from '@move-in/styled-system/css';
import { token } from '@move-in/styled-system/tokens';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: () => <></>,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: '24px',
          background: '#F1F2F5',
          width: '100%',
          padding: '24px',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const ShadowCard: React.FC<{ name: string; className: string }> = ({ name, className }) => {
  return (
    <div
      className={className}
      style={{
        width: '318px',
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '8px',
        background: 'white',
      }}
    >
      {name}
    </div>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Shadow: Story = {
  render: ({}) => {
    return (
      <>
        <ShadowCard name="None" className={css({ mdsShadow: 'none' })} />
        <ShadowCard name="Shadow01" className={css({ mdsShadow: '01' })} />
        <ShadowCard name="Shadow02" className={css({ mdsShadow: '02' })} />
        <ShadowCard name="Shadow03" className={css({ mdsShadow: '03' })} />
      </>
    );
  },
};
