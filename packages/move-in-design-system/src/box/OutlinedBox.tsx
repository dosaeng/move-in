import { cva, cx } from '@move-in/styled-system/css';
import React from 'react';

export interface OutlinedBoxProps {
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const OutlinedBox: React.FC<
  React.PropsWithChildren<OutlinedBoxProps>
> = ({ className, disabled, onClick, children }) => {
  return (
    <div
      className={cx(
        className,
        cva({
          base: {
            color: 'text.dark.04',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'stroke.light.03',
            borderRadius: '12px',
            paddingX: '12px',
            paddingY: '14px',
            boxSizing: 'border-box',
            textStyle: 'body-16-m',
            backgroundColor: 'fill.light.01',
            minH: '52px',
          },
          variants: {
            disabled: {
              true: {
                backgroundColor: 'fill.light.02',
                color: 'text.light.04',
              },
            },
          },
        })({ disabled })
      )}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </div>
  );
};
