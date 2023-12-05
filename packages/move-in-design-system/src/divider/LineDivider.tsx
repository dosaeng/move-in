import React from 'react';
import { cva } from '@move-in/styled-system/css';

const dividerStyle = cva({
  base: {
    width: '100%',
    height: '1px',
    border: 'none',
    borderBottom: '1px solid',
  },
  variants: {
    dashed: {
      true: {
        borderBottom: '1px dashed',
      },
    },
    color: {
      stroke_2: {
        borderColor: 'stroke.light.02',
      },
      stroke_3: {
        borderColor: 'fill.light.03',
      },
    },
  },
});

interface LineDividerProps {
  dashed?: boolean;
  color?: 'stroke_2' | 'stroke_3';
}

export const LineDivider: React.FC<LineDividerProps> = ({ dashed, color }) => {
  return <hr className={dividerStyle({ dashed, color })} />;
};
