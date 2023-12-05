import React from 'react';
import { cva } from '@move-in/styled-system/css';

const dividerStyle = cva({
  base: {
    width: '100%',
    border: 'none',
  },
  variants: {
    size: {
      s: {
        height: '8px',
      },
      m: {
        height: '16px',
      },
      l: {
        height: '24px',
      },
    },
    color: {
      fill_2: {
        backgroundColor: 'fill.light.02',
      },
      fill_3: {
        backgroundColor: 'fill.light.03',
      },
    },
  },
});

interface DividerProps {
  size?: 's' | 'm' | 'l';
  color?: 'fill_2' | 'fill_3';
}

export const Divider: React.FC<DividerProps> = ({ size = 's', color = 'fill_2' }) => {
  return <hr className={dividerStyle({ size, color })} />;
};
