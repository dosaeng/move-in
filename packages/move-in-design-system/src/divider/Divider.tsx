import React from 'react';
import { cx, cva } from '@move-in/styled-system/css';

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
  className?: string;
  size?: 's' | 'm' | 'l';
  color?: 'fill_2' | 'fill_3';
}

export const Divider: React.FC<DividerProps> = ({ className, size = 's', color = 'fill_2' }) => {
  return <hr className={cx(dividerStyle({ size, color }), className)} />;
};
