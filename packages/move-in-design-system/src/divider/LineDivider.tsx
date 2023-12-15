import React from 'react';
import { cx, cva } from '@move-in/styled-system/css';

const dividerStyle = cva({
  base: {
    width: '100%',
    height: '1px',
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottomColor: 'stroke.light.02',
  },
  variants: {
    dashed: {
      true: {
        borderBottomStyle: 'dashed',
      },
    },
    color: {
      stroke_2: {
        borderBottomColor: 'stroke.light.02',
      },
      stroke_3: {
        borderBottomColor: 'fill.light.03',
      },
    },
  },
});

interface LineDividerProps {
  className?: string;
  dashed?: boolean;
  color?: 'stroke_2' | 'stroke_3';
}

export const LineDivider: React.FC<LineDividerProps> = ({ className, dashed, color }) => {
  return <hr className={cx(dividerStyle({ dashed, color }), className)} />;
};
