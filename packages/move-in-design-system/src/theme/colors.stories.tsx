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
          background: '#FCFCFC',
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

const ColorCard: React.FC<{ name: string; className: string }> = ({ name, className }) => {
  return (
    <div
      className={className}
      style={{ width: '318px', height: '60px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      {name}
    </div>
  );
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const TextColor: Story = {
  render: ({}) => {
    return (
      <>
        {[
          { name: 'Light01 (#FFFFFF)', className: css({ bg: 'text.light.01' }) },
          { name: 'Light02 (#EEEEEE)', className: css({ bg: 'text.light.02' }) },
          { name: 'Light03 (#DDDDDD)', className: css({ bg: 'text.light.03' }) },
          { name: 'Light04 (#CCCCCC)', className: css({ bg: 'text.light.04' }) },
          { name: 'Dark01 (#888888)', className: css({ bg: 'text.dark.01', color: 'white' }) },
          { name: 'Dark02 (#666666)', className: css({ bg: 'text.dark.02', color: 'white' }) },
          { name: 'Dark03 (#444444)', className: css({ bg: 'text.dark.03', color: 'white' }) },
          { name: 'Dark04 (#111111)', className: css({ bg: 'text.dark.04', color: 'white' }) },
        ].map(({ name, className }) => {
          return <ColorCard name={name} className={className} />;
        })}
      </>
    );
  },
};

export const FillColor: Story = {
  render: ({}) => {
    return (
      <>
        {[
          { name: 'Light 01 (#FFFFFF)', className: css({ bg: 'fill.light.01' }) },
          { name: 'Light 02 (#F6F6F6)', className: css({ bg: 'fill.light.02' }) },
          { name: 'Light 03 (#E6E6E6)', className: css({ bg: 'fill.light.03' }) },
          { name: 'Dark 01 (#2B2B2B)', className: css({ bg: 'fill.dark.01', color: 'white' }) },
        ].map(({ name, className }) => {
          return <ColorCard name={name} className={className} />;
        })}
      </>
    );
  },
};

export const StrokeColor: Story = {
  render: ({}) => {
    return (
      <>
        {[
          { name: 'Light 01 (#F4F4F4)', className: css({ bg: 'stroke.light.01' }) },
          { name: 'Light 02 (#E4E4E4)', className: css({ bg: 'stroke.light.02' }) },
          { name: 'Light 03 (#D4D4D4)', className: css({ bg: 'stroke.light.03' }) },
          { name: 'Dark 01 (#111111)', className: css({ bg: 'stroke.dark.01', color: 'white' }) },
        ].map(({ name, className }) => {
          return <ColorCard name={name} className={className} />;
        })}
      </>
    );
  },
};

export const SuccessColor: Story = {
  render: ({}) => {
    return (
      <>
        {[
          { name: 'Green 01 (#C1F9BD)', className: css({ bg: 'success.green.01' }) },
          { name: 'Green 02 (#8AE582)', className: css({ bg: 'success.green.02' }) },
          { name: 'Green 03 (#11D300)', className: css({ bg: 'success.green.03', color: 'white' }) },
          { name: 'Green 04 (#19A70D)', className: css({ bg: 'success.green.04', color: 'white' }) },
        ].map(({ name, className }) => {
          return <ColorCard name={name} className={className} />;
        })}
      </>
    );
  },
};

export const WarningColor: Story = {
  render: ({}) => {
    return (
      <>
        {[
          { name: 'Yellow 01 (#FFEBA4)', className: css({ bg: 'warning.yellow.01' }) },
          { name: 'Yellow 02 (#FFDF6F)', className: css({ bg: 'warning.yellow.02' }) },
          { name: 'Yellow 03 (#FFD233)', className: css({ bg: 'warning.yellow.03', color: 'white' }) },
          { name: 'Yellow 04 (#E9B500)', className: css({ bg: 'warning.yellow.04', color: 'white' }) },
        ].map(({ name, className }) => {
          return <ColorCard name={name} className={className} />;
        })}
      </>
    );
  },
};

export const ErrorColor: Story = {
  render: ({}) => {
    return (
      <>
        {[
          { name: 'Red 01 (#FFC7C7)', className: css({ bg: 'error.red.01' }) },
          { name: 'Red 02 (#FF9797)', className: css({ bg: 'error.red.02' }) },
          { name: 'Red 03 (#F54F4C)', className: css({ bg: 'error.red.03', color: 'white' }) },
          { name: 'Red 04 (#BC0300)', className: css({ bg: 'error.red.04', color: 'white' }) },
        ].map(({ name, className }) => {
          return <ColorCard name={name} className={className} />;
        })}
      </>
    );
  },
};

export const BrandColor: Story = {
  render: ({}) => {
    return (
      <>
        {[
          { name: 'Purple 01 (#E2C8FC)', className: css({ bg: 'brand.purple.01' }) },
          { name: 'Purple 02 (#BC8AEE)', className: css({ bg: 'brand.purple.02' }) },
          { name: 'Purple 03 (#874AC5)', className: css({ bg: 'brand.purple.03', color: 'white' }) },
          { name: 'Purple 04 (#58278A)', className: css({ bg: 'brand.purple.04', color: 'white' }) },
        ].map(({ name, className }) => {
          return <ColorCard name={name} className={className} />;
        })}
      </>
    );
  },
};
