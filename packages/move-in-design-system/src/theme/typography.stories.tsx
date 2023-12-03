import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  component: ({ text: string }) => <></>,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  args: {
    text: '이제 불필요한 비용은 줄이고,\n고객 만족도를 높여보세요',
  },
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', rowGap: '24px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<{ text: string }>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Header: Story = {
  render: ({ text }) => {
    return (
      <>
        {[
          { name: '28B (132%)', className: 'text-header-28-b' },
          { name: '26B (132%)', className: 'text-header-26-b' },
          { name: '24SB (132%)', className: 'text-header-24-sb' },
          { name: '20SB (132%)', className: 'text-header-20-sb' },
          { name: '18SB (132%)', className: 'text-header-18-sb' },
        ].map(({ name, className }) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'center', columnGap: '52px', color: '#111' }}>
              <div style={{ flex: '0 0 100px' }}>{name}</div>
              <h1 className={className} style={{ flex: 1 }}>
                {text.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </h1>
            </div>
          );
        })}
      </>
    );
  },
};

export const Body: Story = {
  render: ({ text }) => {
    return (
      <>
        {[
          { name: '18M (140%)', className: 'text-body-18-m' },
          { name: '16M (140%)', className: 'text-body-16-m' },
          { name: '14SB (140%)', className: 'text-body-14-sb' },
          { name: '14M (140%)', className: 'text-body-14-m' },
          { name: '14R (140%)', className: 'text-body-14-r' },
          { name: '12M (140%)', className: 'text-body-12-m' },
          { name: '12R (140%)', className: 'text-body-12-r' },
          { name: '10R (140%)', className: 'text-body-10-r' },
        ].map(({ name, className }) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'center', columnGap: '52px', color: '#111' }}>
              <div style={{ flex: '0 0 100px' }}>{name}</div>
              <div className={className} style={{ flex: 1 }}>
                {text.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          );
        })}
      </>
    );
  },
};

export const Paragraph: Story = {
  args: {
    text: `코스닥시장에서는 개인과 기관이 각각 804억 원, 28억 원을 순매수했다. 외국인은 802억 원을 순매도했다. 시총 상위권에서는 에코프로비(247540)(-0.21%)과 셀트리온헬스케어(091990 x1.01%), HLB(028300)(-1.18%), 카카오게임 (293490) (-0.25%) 등이 하락세다. 상위 10위권에서 에코프로(0.50%)와 JYP Ent.(1.94%)만 오르고 있다.
지난 26일(현지시간) 미국 뉴욕증시에서는 다우존스30산업평균지수(-0.68%)와 스탠더드앤드푸어스(S&P) 500지수(-0.38%), 기술주 중심의 나스닥지수(0.47%)가 혼조세를 보였다.`,
  },
  render: ({ text }) => {
    return (
      <>
        {[
          { name: '16R (172%, 12px)', className: 'text-paragraph-16-r' },
          { name: '14R (180%, 10px)', className: 'text-paragraph-14-r' },
          { name: '12R (188%, 8px)', className: 'text-paragraph-12-r' },
        ].map(({ name, className }) => {
          return (
            <div style={{ display: 'flex', justifyContent: 'center', columnGap: '52px', color: '#484848' }}>
              <div style={{ flex: '0 0 100px', whiteSpace: 'nowrap' }}>{name}</div>
              <p className={className} style={{ flex: 1 }}>
                {text.split('\n').map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </p>
            </div>
          );
        })}
      </>
    );
  },
};
